// Pasaport denetimi: node kontrol.js
// Betik sözdizimi, sözlükte eksik kelime, tekrarlanan sözlük anahtarı, dinleme sorularının doğru cevabı.
const fs = require("fs"), vm = require("vm"), assert = require("assert");
const html = fs.readFileSync(__dirname + "/index.html", "utf8");
const src = html.match(/<script>([\s\S]*)<\/script>/)[1];
new vm.Script(src); // sözdizimi hatası varsa burada durur

const dictSrc = src.match(/const DICT = (\{[\s\S]*?\n\});/)[1];
const keys = [...dictSrc.matchAll(/(?:^|[,{]\s*)("?[a-z'-]+"?):/gm)].map(m => m[1].replace(/"/g, ""));
const dup = keys.filter((k, i) => keys.indexOf(k) !== i);
assert.deepStrictEqual(dup, [], "sözlükte iki kez yazılan: " + dup.join(", "));

const DICT = vm.runInNewContext("(" + dictSrc + ")");
const SCENES = vm.runInNewContext(src.match(/const SCENES = (\[[\s\S]*?\n\]);/)[1]);
// Ek duraklar index.html'in sırayla yüklediği dosyalardan gelir
const ctx = vm.createContext({});
[...html.matchAll(/<script src="([^"]+)"/g)].forEach(m => vm.runInContext(fs.readFileSync(__dirname + "/" + m[1], "utf8"), ctx, { filename: m[1] }));
SCENES.push(...vm.runInContext("EK", ctx));
Object.assign(DICT, vm.runInContext("SOZLUK_EK", ctx));
const kodlar = SCENES.map(s => s.code);
assert.strictEqual(new Set(kodlar).size, kodlar.length, "aynı durak kodu iki kez var");
assert.ok(SCENES.length >= 58, "en az 58 durak olmalı");
SCENES.slice(8).forEach(s => assert.ok(s.dialog.length >= 6, `${s.code}: en az 6 konuşma adımı olmalı`));
SCENES.forEach(s => s.dialog.forEach(d => assert.ok(d.opts.length >= 2 && d.opts.every(o => o.t), `${s.code}: eksik cevap: ${d.them}`)));
SCENES.forEach(s => {
  s.ear.forEach(e => assert.strictEqual(new Set(e.opts).size, 3, `${s.code}: aynı dinleme seçeneği: ${e.say}`));
  assert.strictEqual(new Set(s.words.map(w => w[1])).size, s.words.length, `${s.code}: aynı Türkçe karşılık iki kez`);
});
const ad = new Set(["randevu", "c", "hudson", "emily", "cem", "karen", "ali", "mark", "ozcan", "c-e-m", "riverside", "midlands", "supplies", "lone", "star", "homes", "dubai", "india", "boston", "adana", "turkey", "seattle", "new", "zealand", "australian", "cappadocia", "menemen", "aloha", "tui", "main", "demirspor", "safari", "lodge", "june", "may", "march", "friday", "thursday", "tuesday", "monday", "wednesday", "saturday", "sunday", "turkish", "english", "french", "coke", "x-ray"]); // özel isimler
const eksik = new Set();
const metin = [];
SCENES.forEach(s => {
  s.dialog.forEach(d => { metin.push(d.them); d.opts.forEach(o => { metin.push(o.t); if (o.fix) metin.push(o.fix); }); });
  metin.push(s.bye.them);
  s.ear.forEach(e => {
    assert.ok(e.opts.includes(e.say), `${s.code}: "${e.say}" seçeneklerde yok`);
    metin.push(...e.opts);
  });
  assert.strictEqual(s.words.length, 6, `${s.code}: 6 kelime olmalı`);
});
metin.join(" ").split(/\s+/).forEach(t => {
  const w = (t.match(/[A-Za-zé'’-]+/) || [""])[0].toLowerCase();
  if (w && !DICT[w] && !ad.has(w)) eksik.add(w);
});
assert.deepStrictEqual([...eksik], [], "sözlükte yok: " + [...eksik].join(", "));

// Ses seçimi: Türkçe ses asla seçilmez, aksan sırası doğru
const pickVoice = vm.runInNewContext("(" + src.match(/function pickVoice[\s\S]*?\n\}/)[0] + ")");
const v = (name, lang) => ({ name, lang });
const tr = v("Tolga", "tr-TR"), us = v("Zira", "en-US"), gb = v("Hazel", "en-GB"), au = v("Karen", "en_AU"), gus = v("Google US English", "en-US");
assert.strictEqual(pickVoice([tr], "en-GB"), null);
assert.strictEqual(pickVoice([], "en-GB"), null);
assert.strictEqual(pickVoice([tr, us], "en-GB"), us);
assert.strictEqual(pickVoice([tr, us, gb], "en-IE"), gb);
assert.strictEqual(pickVoice([tr, us, au], "en-AU"), au);
assert.strictEqual(pickVoice([us, gus], "en-US"), gus);

// Serbest Sohbet: yapay zekâ cevabının çözümü, geçmiş sınırı, hata mesajları
const SOHBET = vm.runInContext("SOHBET", ctx);
const iyi = SOHBET.coz(JSON.stringify({ reply: " Hi! ", tr: "Selam!", fix: { wrong: "I go", right: "I went", why: "Geçmiş" }, words: [{ en: "Hi", tr: "selam" }, { en: "<img>", tr: "x" }, { en: "ok" }] }));
assert.strictEqual(iyi.reply, "Hi!");
assert.strictEqual(iyi.fix.right, "I went");
assert.strictEqual(iyi.words.length, 1); // bozuk kelimeler atılır
assert.strictEqual(iyi.words[0][0], "hi");
assert.strictEqual(SOHBET.coz(JSON.stringify({ reply: "Hi", fix: { wrong: "a", right: "a", why: "" } })).fix, null); // aynı metin düzeltme değildir
assert.strictEqual(SOHBET.coz(JSON.stringify({ reply: "Hi", fix: null })).words.length, 0);
assert.throws(() => SOHBET.coz(JSON.stringify({ tr: "x" })));
assert.throws(() => SOHBET.coz("bozuk"));
const uzun = Array.from({ length: 41 }, (_, i) => ({ role: i % 2 ? "model" : "user", text: String(i) }));
const ic = SOHBET.istekGovdesi(uzun, "Yemek").contents;
assert.strictEqual(ic[0].role, "user"); // Gemini geçmişin kullanıcıyla başlamasını ister
assert.strictEqual(ic[ic.length - 1].parts[0].text, "40");
assert.ok(/Anahtar/.test(SOHBET.hata(400, "API key not valid")));
assert.ok(/Anahtar/.test(SOHBET.hata(403, "")));
assert.ok(/sınır/.test(SOHBET.hata(429, "")));
assert.ok(/yoğun/.test(SOHBET.hata(503, "")));

console.log(`Tamam:${SCENES.length} durak, ${Object.keys(DICT).length} kelime.`);
