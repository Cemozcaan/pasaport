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
const ic = SOHBET.istekGovdesi(uzun, { konu: "Yemek" }).contents;
// Zor an ve odak talimata girer
assert.ok(/sinirli/.test(SOHBET.istekGovdesi(uzun, { karakter: "sinirli" }).systemInstruction.parts[0].text));
assert.ok(/Edatlar/.test(SOHBET.istekGovdesi(uzun, { konu: "x", odak: "Edatlar" }).systemInstruction.parts[0].text));
// Düzeltme türü: bilinmeyen tür Diğer olur, çeviri korunur
assert.strictEqual(SOHBET.coz(JSON.stringify({ reply: "Hi", fix: { wrong: "a", right: "b", why: "", kind: "Uydurma" } })).fix.kind, "Diğer");
assert.strictEqual(SOHBET.coz(JSON.stringify({ reply: "Hi", fix: { wrong: "a", right: "b", why: "", kind: "Çeviri" } })).fix.kind, "Çeviri");
// Hata avı: bozuk sorular atılır, çok azsa hata verir
const soru = (q, o, a) => ({ q, o, a });
const iyiSoru = soru("I ___ it.", ["a", "b", "c"], 1);
assert.strictEqual(SOHBET.avCoz(JSON.stringify({ sorular: [iyiSoru, iyiSoru, iyiSoru, soru("boşluk yok", ["a", "b", "c"], 1), soru("x ___", ["a", "a", "c"], 1), soru("x ___", ["a", "b", "c"], 3)] })).length, 3);
assert.throws(() => SOHBET.avCoz(JSON.stringify({ sorular: [iyiSoru] })));
// Karne: puan 0-100 arasına çekilir, eksik puan kabul edilmez
const krn = SOHBET.karneCoz(JSON.stringify({ baslik: "İyi", netlik: 120, kibarlik: -4, dil: 70.4, yorum: "x" }));
assert.strictEqual(krn.netlik, 100); assert.strictEqual(krn.kibarlik, 0); assert.strictEqual(krn.dil, 70);
assert.throws(() => SOHBET.karneCoz(JSON.stringify({ baslik: "İyi", netlik: 1, kibarlik: 1 })));
// Hikâye: sorusuz hikâye kabul edilmez
assert.strictEqual(SOHBET.hikayeCoz(JSON.stringify({ baslik: "T", metin: "M", sorular: [soru("s", ["a", "b", "c"], 0)], words: [{ en: "Whale", tr: "balina" }] })).words[0][0], "whale");
assert.throws(() => SOHBET.hikayeCoz(JSON.stringify({ baslik: "T", metin: "M", sorular: [] })));

// Defter: tekrar sırası, kutular, şıklar, hata haritası, bozuk kayıt
const DEFTER = vm.runInContext("DEFTER", ctx);
const G = 86400000, t0 = 1e12, d0 = DEFTER.bos();
DEFTER.kelimeEkle(d0, "refund", "para iadesi", t0);
DEFTER.kelimeEkle(d0, "delay", "gecikme", t0);
DEFTER.kelimeEkle(d0, "refund", "başka", t0); // var olan kelime bozulmaz
assert.strictEqual(d0.words.refund.tr, "para iadesi");
DEFTER.kelimeEkle(d0, "constructor", "yapıcı", t0); // nesnenin gizli alanlarıyla karışmaz
assert.strictEqual(d0.words.constructor.tr, "yapıcı");
delete d0.words.constructor;
assert.strictEqual(DEFTER.bekleyen(d0, t0).length, 2);
DEFTER.cevapla(d0, "refund", true, t0);
assert.strictEqual(d0.words.refund.box, 1);
assert.strictEqual(d0.words.refund.due, t0 + G);
assert.strictEqual(DEFTER.bekleyen(d0, t0).length, 1);
assert.strictEqual(DEFTER.tekrarListesi(d0, t0, 10)[0], "delay"); // vakti gelen önce
assert.strictEqual(DEFTER.tekrarListesi(d0, t0, 10).length, 2); // vakti gelmeyen de sona eklenir: bekleme yok
DEFTER.cevapla(d0, "refund", false, t0);
assert.strictEqual(d0.words.refund.box, 0); // bilemezse başa döner
assert.strictEqual(d0.words.refund.due, t0);
const sk = DEFTER.siklar(d0, "refund", ["ev", "araba", "para iadesi"], Math.random);
assert.strictEqual(new Set(sk).size, 3); assert.ok(sk.includes("para iadesi"));
["Edatlar", "Edatlar", "The / a", "Çeviri"].forEach(kind => DEFTER.hataEkle(d0, { wrong: "a", right: "b", kind }));
const hr = DEFTER.hataHaritasi(d0);
assert.strictEqual(hr.length, 2); assert.strictEqual(hr[0][0], "Edatlar"); assert.strictEqual(hr[0][1], 2);
for (let i = 0; i < 210; i++) DEFTER.hataEkle(d0, { wrong: "a", right: "b", kind: "Diğer" });
assert.strictEqual(d0.fixes.length, 200);
for (let i = 0; i < 7; i++) DEFTER.hikayeEkle(d0, { metin: String(i), sorular: [] });
assert.strictEqual(d0.stories.length, 5); assert.strictEqual(d0.stories[0].metin, "6");
const dy = DEFTER.yukle({ words: { a: { tr: "x", box: 99, due: "kötü" }, b: { box: 1 } }, fixes: [{ wrong: "a", right: "b" }, 5], stories: "x", chats: 3 });
assert.strictEqual(dy.words.a.box, 4); assert.strictEqual(dy.words.a.due, 0); assert.strictEqual(dy.words.b, undefined);
assert.strictEqual(dy.fixes.length, 1); assert.strictEqual(dy.stories.length, 0); assert.strictEqual(dy.chats, 3);
assert.strictEqual(Object.keys(DEFTER.yukle(null).words).length, 0);
assert.strictEqual(ic[0].role, "user"); // Gemini geçmişin kullanıcıyla başlamasını ister
assert.strictEqual(ic[ic.length - 1].parts[0].text, "40");
assert.ok(/Anahtar/.test(SOHBET.hata(400, "API key not valid")));
assert.ok(/Anahtar/.test(SOHBET.hata(403, "")));
assert.ok(/sınır/.test(SOHBET.hata(429, "")));
assert.ok(/yoğun/.test(SOHBET.hata(503, "")));

// Yedek model: 429'da ikincisine geçer, anahtar hatasında geçmez
(async () => {
  const dene = async durumlar => {
    let adet = 0;
    ctx.AbortSignal = AbortSignal;
    ctx.fetch = async () => { const d = durumlar[adet++]; return { ok: d === 200, status: d, json: async () => d === 200 ? { candidates: [{ content: { parts: [{ text: '{"reply":"Hi"}' }] } }] } : { error: { message: "API key not valid" } } }; };
    const r = await SOHBET.iste("k", [{ role: "user", text: "x" }], "t").catch(e => e.message);
    return { adet, r };
  };
  const a = await dene([429, 200]);
  assert.strictEqual(a.adet, 2); assert.strictEqual(a.r.reply, "Hi");
  const b = await dene([400]);
  assert.strictEqual(b.adet, 1); assert.ok(/Anahtar/.test(b.r));
  const c = await dene([429, 429]);
  assert.strictEqual(c.adet, 2); assert.ok(/sınır/.test(c.r));
  console.log(`Tamam: ${SCENES.length} durak, ${Object.keys(DICT).length} kelime.`);
})().catch(e => { console.error(e); process.exit(1); });
