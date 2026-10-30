// Ek duraklar. Yeni durak: D(kod, şehir, aksan, başlık, kişi, açıklama, konuşma, veda, dinleme, kelimeler)
// konuşma adımı: [söz, Türkçesi, cevap, cevap, [yanlış cevap, doğrusu, neden]]
// dinleme: [doğru cümle, Türkçesi, yanlış1, yanlış2]; kelime: [İngilizce, Türkçe, okunuş]
const EK = [];
const SOZLUK_EK = {};
function D(code, city, lang, title, who, desc, turns, bye, ears, words) {
  const prev = EK[EK.length - 1];
  EK.push({
    code, city, lang, title, who, desc, from: prev ? prev.to : "ORD", to: code,
    dialog: turns.map(([them, tr, ...opts]) => ({ them, tr, opts: opts.map(o => typeof o === "string" ? { t: o } : { t: o[0], fix: o[1], why: o[2] }) })),
    bye: { them: bye[0], tr: bye[1] },
    // doğru cevap her soruda aynı sırada durmasın
    ear: ears.map(([say, tr, a, b], i) => ({ say, tr, opts: i % 3 === 0 ? [say, a, b] : i % 3 === 1 ? [a, say, b] : [a, b, say] })),
    words
  });
}
