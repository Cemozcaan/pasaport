// Defter: sohbet ve hikâyelerden kalan kelimeler, düzeltmeler ve tekrar sırası. Saf işlevler; saklama index.html'de.
const DEFTER = (() => {
  const GUN = 86400000;
  const ARALIK = [0, 1, 3, 7, 21]; // kutuya göre gün: bildikçe seyrek, bilemeyince hemen
  const SON_HATA = 30; // hata haritası son düzeltmelere bakar, düzeldikçe çubuk kısalır
  const HATA_SINIR = 200;

  const bos = () => ({ words: {}, fixes: [], stories: [], chats: 0 });
  function yukle(j) {
    const d = bos();
    if (!j || typeof j !== "object") return d;
    if (j.words && typeof j.words === "object") Object.entries(j.words).forEach(([en, w]) => {
      if (w && typeof w.tr === "string") d.words[en] = { tr: w.tr, box: Number.isInteger(w.box) ? Math.min(Math.max(w.box, 0), ARALIK.length - 1) : 0, due: Number.isFinite(w.due) ? w.due : 0 };
    });
    if (Array.isArray(j.fixes)) d.fixes = j.fixes.filter(f => f && typeof f.wrong === "string" && typeof f.right === "string");
    if (Array.isArray(j.stories)) d.stories = j.stories.filter(s => s && typeof s.metin === "string" && Array.isArray(s.sorular));
    if (Number.isInteger(j.chats)) d.chats = j.chats;
    return d;
  }
  const kelimeEkle = (d, en, tr, simdi) => { if (!Object.hasOwn(d.words, en)) d.words[en] = { tr, box: 0, due: simdi }; };
  function hataEkle(d, f) { d.fixes.push(f); if (d.fixes.length > HATA_SINIR) d.fixes.shift(); }
  function hikayeEkle(d, s) { d.stories.unshift(s); d.stories.length = Math.min(d.stories.length, 5); }

  const bekleyen = (d, simdi) => Object.keys(d.words).filter(en => d.words[en].due <= simdi);
  // Önce vakti gelenler, en düşük kutudan; bekleme yok: vakti gelen azsa en yakın vadeliler eklenir
  function tekrarListesi(d, simdi, adet) {
    return Object.keys(d.words).sort((a, b) => {
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
  return { bos, yukle, kelimeEkle, hataEkle, hikayeEkle, bekleyen, tekrarListesi, cevapla, siklar, hataHaritasi };
})();
