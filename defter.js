// Defter: sohbet ve hikâyelerden kalan kelimeler, düzeltmeler ve tekrar sırası. Saf işlevler; saklama index.html'de.
const DEFTER = (() => {
  const GUN = 86400000;
  const ARALIK = [0, 1, 3, 7, 21]; // kutuya göre gün: bildikçe seyrek, bilemeyince hemen
  const SON_HATA = 30; // hata haritası son düzeltmelere bakar, düzeldikçe çubuk kısalır
  const HATA_SINIR = 200;

  const SOHBET_SINIR = 20;
  const bos = () => ({ words: {}, fixes: [], stories: [], chats: 0, dkSon: 0, dkEn: 0, sohbetler: [], silinen: [] });
  function yukle(j) {
    const d = bos();
    if (!j || typeof j !== "object") return d;
    if (j.words && typeof j.words === "object") Object.entries(j.words).forEach(([en, w]) => {
      if (w && typeof w.tr === "string") d.words[en] = { tr: w.tr, box: Number.isInteger(w.box) ? Math.min(Math.max(w.box, 0), ARALIK.length - 1) : 0, due: Number.isFinite(w.due) ? w.due : 0, bildi: w.bildi === true };
    });
    if (Array.isArray(j.silinen)) d.silinen = j.silinen.filter(x => typeof x === "string");
    if (Array.isArray(j.fixes)) d.fixes = j.fixes.filter(f => f && typeof f.wrong === "string" && typeof f.right === "string");
    if (Array.isArray(j.stories)) d.stories = j.stories.filter(s => s && typeof s.metin === "string" && Array.isArray(s.sorular));
    if (Array.isArray(j.sohbetler)) d.sohbetler = j.sohbetler.filter(s => s && Array.isArray(s.chat) && Array.isArray(s.hist) && typeof s.topic === "string");
    if (Number.isInteger(j.chats)) d.chats = j.chats;
    if (Number.isInteger(j.dkSon)) d.dkSon = j.dkSon;
    if (Number.isInteger(j.dkEn)) d.dkEn = j.dkEn;
    return d;
  }
  const kelimeEkle = (d, en, tr, simdi) => { if (!Object.hasOwn(d.words, en) && !d.silinen.includes(en)) d.words[en] = { tr, box: 0, due: simdi, bildi: false }; };
  // Silinen kelime hatırlanır: sohbet ya da durak onu kendiliğinden geri getirmesin. Elle eklenirse silinenden çıkar.
  function kelimeSil(d, en) { delete d.words[en]; if (!d.silinen.includes(en)) d.silinen.push(en); }
  function kelimeGeriAl(d, en) { d.silinen = d.silinen.filter(x => x !== en); }
  function kelimeAnlam(d, en, tr) { if (Object.hasOwn(d.words, en) && tr.trim()) d.words[en].tr = tr.trim(); }
  function kelimeBildi(d, en, bildi) { if (Object.hasOwn(d.words, en)) d.words[en].bildi = bildi; }
  function hataEkle(d, f) { d.fixes.push(f); if (d.fixes.length > HATA_SINIR) d.fixes.shift(); }
  function hikayeEkle(d, s) { d.stories.unshift(s); d.stories.length = Math.min(d.stories.length, 5); }

  // Aynı sohbet güncellenir ve başa gelir; en eski sohbetler silinir
  function sohbetKaydet(d, k) {
    d.sohbetler = [k, ...d.sohbetler.filter(s => s.id !== k.id)].slice(0, SOHBET_SINIR);
  }
  const sohbetSil = (d, id) => { d.sohbetler = d.sohbetler.filter(s => s.id !== id); };
  const bekleyen = (d, simdi) => Object.keys(d.words).filter(en => !d.words[en].bildi && d.words[en].due <= simdi);
  // Önce vakti gelenler, en düşük kutudan; bekleme yok: vakti gelen azsa en yakın vadeliler eklenir
  function tekrarListesi(d, simdi, adet) {
    return Object.keys(d.words).filter(en => !d.words[en].bildi).sort((a, b) => {
      const A = d.words[a], B = d.words[b], ga = A.due <= simdi, gb = B.due <= simdi;
      return ga !== gb ? (ga ? -1 : 1) : ga ? A.box - B.box : A.due - B.due;
    }).slice(0, adet);
  }
  function cevapla(d, en, dogru, simdi) {
    const w = d.words[en]; if (!w) return;
    w.box = dogru ? Math.min(w.box + 1, ARALIK.length - 1) : 0;
    w.due = dogru ? simdi + ARALIK[w.box] * GUN : simdi;
  }
  // Yanlış şıklar: önce defterin, eksikse yedek anlamlardan
  function siklar(d, en, yedek, rastgele) {
    const dogru = d.words[en].tr;
    const havuz = [...new Set([...Object.values(d.words).map(w => w.tr), ...yedek])].filter(t => t !== dogru);
    const secilen = [];
    while (secilen.length < 2 && havuz.length) secilen.push(havuz.splice(Math.floor(rastgele() * havuz.length), 1)[0]);
    return [dogru, ...secilen].map(t => [rastgele(), t]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
  }
  function hataHaritasi(d) {
    const say = {};
    d.fixes.slice(-SON_HATA).forEach(f => { if (f.kind && f.kind !== "Çeviri") say[f.kind] = (say[f.kind] || 0) + 1; });
    return Object.entries(say).sort((a, b) => b[1] - a[1]);
  }
  // Yedek kodu: damgalar + kelimeler + düzeltmeler. Anahtar ve hikâyeler girmez (kod kısa ve dışarı verilebilir kalsın).
  const ON_EK = "PSP1-";
  function kodla(d, damgalar, finaller) {
    const yazi = JSON.stringify({ s: damgalar, g: finaller || [], w: d.words, f: d.fixes, c: d.chats, n: d.dkSon, e: d.dkEn });
    return ON_EK + btoa(Array.from(new TextEncoder().encode(yazi), b => String.fromCharCode(b)).join(""));
  }
  function kodCoz(kod) {
    const k = String(kod).replace(/\s+/g, "");
    if (!k.startsWith(ON_EK)) throw new Error("kod değil");
    const j = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(k.slice(ON_EK.length)), c => c.charCodeAt(0))));
    const d = yukle({ words: j.w, fixes: j.f, chats: j.c, dkSon: j.n, dkEn: j.e });
    return { defter: d, damgalar: Array.isArray(j.s) ? j.s.filter(Number.isInteger) : [], finaller: Array.isArray(j.g) ? j.g.filter(Number.isInteger) : [] };
  }
  // Birleştirme hiçbir şey silmez: yerel kelimenin tekrar durumu korunur, eksikler eklenir
  function birlestir(d, gelen) {
    let kelime = 0, hataSay = 0;
    Object.entries(gelen.words).forEach(([en, w]) => { if (!Object.hasOwn(d.words, en) && !d.silinen.includes(en)) { d.words[en] = w; kelime++; } });
    const var_ = new Set(d.fixes.map(f => f.wrong + "|" + f.right));
    gelen.fixes.forEach(f => { if (!var_.has(f.wrong + "|" + f.right)) { hataEkle(d, f); hataSay++; } });
    d.chats = Math.max(d.chats, gelen.chats);
    d.dkEn = Math.max(d.dkEn, gelen.dkEn);
    if (!d.dkSon) d.dkSon = gelen.dkSon;
    return { kelime, hata: hataSay };
  }
  return { kelimeSil, kelimeGeriAl, kelimeAnlam, kelimeBildi, sohbetSil, sohbetKaydet, kodla, kodCoz, birlestir, bos, yukle, kelimeEkle, hataEkle, hikayeEkle, bekleyen, tekrarListesi, cevapla, siklar, hataHaritasi };
})();
