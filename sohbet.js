// Yapay zekâ: Gemini ücretsiz planına istekler ve cevapların çözümü (sohbet, zor anlar, karne, hata avı, hikâye). Ekran kodu index.html'de.
const SOHBET = (() => {
  // Önce en hızlısı; yoksa, sınırı dolduysa ya da geç kalırsa Google'ın güncel takma adına geçilir
  const MODELLER = ["gemini-3.5-flash-lite", "gemini-flash-latest"];
  const SURE_MS = 20000;
  const adres = m => `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`;
  const SON_MESAJ = 29; // tek sayı: gönderilen geçmiş hep kullanıcının mesajıyla başlar
  const TURLER = ["Geçmiş zaman", "Geniş / şimdiki zaman", "Gelecek zaman", "The / a", "Edatlar", "Kelime seçimi", "Soru kurma", "Diğer"];

  let seviye = "B1";
  const ortak = () => `Fields:
- reply: your English message.
- tr: Turkish translation of reply.
- fix: fill it only if Cem's last message has a real grammar or word-choice mistake, otherwise null. Ignore capital letters, punctuation and small typos, because he may be using voice input. wrong = the wrong part, right = the corrected part, why = one short, simple Turkish explanation, kind = exactly one of: ${TURLER.join(", ")}.
- If Cem writes in Turkish or asks how to say something: fix.wrong = his text, fix.right = how to say it in English, fix.why = "Bunu böyle söyleyebilirsin.", fix.kind = "Çeviri". Then continue the chat in reply.
- words: at most 6 words from reply or fix.right that a ${seviye} learner may not know, lowercase, with a short Turkish meaning in this context. Skip names and common words.
When the message only asks you to start, there is nothing to correct: fix = null.`;

  function talimat(ayar) {
    if (ayar.karakter) return `Role-play with Cem, a Turkish adult at ${seviye} level who is practising difficult real-life situations in English. ${ayar.karakter}
Stay in character and do not make it too easy: react to his tone and to what he actually says. Speak in natural English, 1 to 3 short sentences, using ${seviye}-level words.
${ortak()}`;
    return `You are a friendly English conversation partner for Cem, a Turkish adult at ${seviye} level. Topic: ${ayar.konu}. If Cem changes the topic, follow him.
${ayar.tarz ? `Your personality: ${ayar.tarz} Show it in how you talk, and stay easy to understand.\n` : ""}${ayar.odak ? `Ask questions that make him use this grammar point: ${ayar.odak}. Watch for mistakes in it.\n` : ""}Reply in natural everyday English, 1 to 3 short sentences, and usually end with one question. Use ${seviye}-level words.
${ortak()}`;
  }

  const metin = { type: "STRING" };
  const SEMA = {
    type: "OBJECT", required: ["reply", "tr", "words"],
    properties: {
      reply: metin, tr: metin,
      fix: { type: "OBJECT", nullable: true, required: ["wrong", "right", "why", "kind"], properties: { wrong: metin, right: metin, why: metin, kind: metin } },
      words: { type: "ARRAY", items: { type: "OBJECT", required: ["en", "tr"], properties: { en: metin, tr: metin } } },
    },
  };
  const ayarlar = (sema, sicaklik) => ({ responseMimeType: "application/json", responseSchema: sema, temperature: sicaklik });

  const istekGovdesi = (gecmis, ayar) => ({
    systemInstruction: { parts: [{ text: talimat(ayar) }] },
    contents: gecmis.slice(-SON_MESAJ).map(m => ({ role: m.role, parts: [{ text: m.text }] })),
    generationConfig: ayarlar(SEMA, 0.8),
  });
  const tekIstek = (yazi, sema, sicaklik) => ({ contents: [{ role: "user", parts: [{ text: yazi }] }], generationConfig: ayarlar(sema, sicaklik) });

  // Yapay zekâdan gelen her alan denetlenir; eksik ya da bozuksa yok sayılır
  const dolu = x => typeof x === "string" && x.trim() !== "";
  const kelimeler = w => (Array.isArray(w) ? w : []).filter(x => x && dolu(x.en) && dolu(x.tr) && /^[a-zé'’-]+$/i.test(x.en.trim()))
    .map(x => [x.en.trim().toLowerCase().replace(/’/g, "'"), x.tr.trim()]);
  function coz(ham) {
    const j = JSON.parse(ham);
    if (!dolu(j.reply)) throw new Error("boş cevap");
    const f = j.fix;
    return {
      reply: j.reply.trim(),
      tr: dolu(j.tr) ? j.tr.trim() : "",
      fix: f && dolu(f.wrong) && dolu(f.right) && f.wrong.trim() !== f.right.trim()
        ? { wrong: f.wrong.trim(), right: f.right.trim(), why: dolu(f.why) ? f.why.trim() : "", kind: f.kind === "Çeviri" || TURLER.includes(f.kind) ? f.kind : "Diğer" } : null,
      words: kelimeler(j.words),
    };
  }
  // Üç şıklı soru: şıklar farklı ve cevap geçerli değilse soru atılır
  const soruMu = q => q && dolu(q.q) && Array.isArray(q.o) && q.o.length === 3 && q.o.every(dolu) && new Set(q.o).size === 3 && Number.isInteger(q.a) && q.a >= 0 && q.a <= 2;

  const SORU = { type: "OBJECT", required: ["q", "o", "a"], properties: { q: metin, o: { type: "ARRAY", items: metin }, a: { type: "INTEGER" }, why: metin } };
  const AV_SEMA = { type: "OBJECT", required: ["sorular"], properties: { sorular: { type: "ARRAY", items: SORU } } };
  function avCoz(ham) {
    const l = JSON.parse(ham).sorular;
    const iyi = (Array.isArray(l) ? l : []).filter(q => soruMu(q) && q.q.includes("___"));
    if (iyi.length < 3) throw new Error("az soru");
    return iyi.slice(0, 6);
  }
  const avIstegi = (tur, ornekler) => tekIstek(`Write 6 multiple-choice English grammar questions for a Turkish ${seviye} learner about: ${tur}.
Each q is one everyday English sentence with one gap written as ___. o = exactly 3 different options, a = index (0-2) of the only correct option, why = one short simple Turkish explanation.
${ornekler.length ? "His real mistakes, use similar situations:\n" + ornekler.map(f => `- ${f.wrong} -> ${f.right}`).join("\n") : ""}`, AV_SEMA, 0.7);

  const KARNE_SEMA = { type: "OBJECT", required: ["baslik", "netlik", "kibarlik", "dil", "yorum"], properties: { baslik: metin, netlik: { type: "INTEGER" }, kibarlik: { type: "INTEGER" }, dil: { type: "INTEGER" }, yorum: metin } };
  function karneCoz(ham) {
    const j = JSON.parse(ham);
    const puan = x => { if (!Number.isFinite(x)) throw new Error("puan yok"); return Math.max(0, Math.min(100, Math.round(x))); };
    if (!dolu(j.baslik)) throw new Error("başlık yok");
    return { baslik: j.baslik.trim(), netlik: puan(j.netlik), kibarlik: puan(j.kibarlik), dil: puan(j.dil), yorum: dolu(j.yorum) ? j.yorum.trim() : "" };
  }
  const karneIstegi = (ad, gecmis) => tekIstek(`Cem, a Turkish ${seviye} English learner, practised this situation: ${ad}. Conversation (his lines start with Cem):
${gecmis.slice(1).map(m => (m.role === "user" ? "Cem: " : "Other: ") + m.text).join("\n")}
Grade only Cem's lines, honestly and from 0 to 100: netlik (clear), kibarlik (polite and suitable tone), dil (grammar and words). baslik = one short encouraging Turkish sentence. yorum = two short Turkish sentences: what went well, and one concrete thing to try next time.`, KARNE_SEMA, 0.3);

  const HIKAYE_SEMA = { type: "OBJECT", required: ["baslik", "metin", "sorular", "words"], properties: { baslik: metin, metin, sorular: { type: "ARRAY", items: SORU }, words: { type: "ARRAY", items: SEMA.properties.words.items } } };
  function hikayeCoz(ham) {
    const j = JSON.parse(ham);
    const qs = (Array.isArray(j.sorular) ? j.sorular : []).filter(soruMu);
    if (!dolu(j.baslik) || !dolu(j.metin) || !qs.length) throw new Error("eksik hikâye");
    return { baslik: j.baslik.trim(), metin: j.metin.trim(), sorular: qs.slice(0, 4), words: kelimeler(j.words) };
  }
  const hikayeIstegi = konu => tekIstek(`Write a new, original, surprising short story in English for a Turkish ${seviye} learner. Theme: ${konu}. 90 to 130 words, simple past mostly, ${seviye}-level words.
baslik = English title. metin = the story. sorular = 3 comprehension questions written in Turkish: q = question, o = exactly 3 different Turkish options, a = index (0-2) of the correct one. words = up to 8 story words a ${seviye} learner may not know, lowercase, with short Turkish meanings.`, HIKAYE_SEMA, 1);

  // Dedektif: gizli çözüm yalnız tanığın talimatında durur, ekranda bitene kadar gösterilmez
  const KELIME_SEMA = SEMA.properties.words;
  const DOSYA_SEMA = { type: "OBJECT", required: ["baslik", "olay", "olayTr", "supheliler", "suclu", "sir", "aciklama"], properties: { baslik: metin, olay: metin, olayTr: metin, supheliler: { type: "ARRAY", items: metin }, suclu: { type: "INTEGER" }, sir: metin, aciklama: metin, words: KELIME_SEMA } };
  function dosyaCoz(ham) {
    const j = JSON.parse(ham), s = j.supheliler;
    if (![j.baslik, j.olay, j.sir, j.aciklama].every(dolu) || !Array.isArray(s) || s.length !== 3 || !s.every(dolu) || new Set(s).size !== 3 || !Number.isInteger(j.suclu) || j.suclu < 0 || j.suclu > 2) throw new Error("eksik dosya");
    return { baslik: j.baslik.trim(), olay: j.olay.trim(), olayTr: dolu(j.olayTr) ? j.olayTr.trim() : "", supheliler: s.map(x => x.trim()), suclu: j.suclu, sir: j.sir.trim(), aciklama: j.aciklama.trim(), words: kelimeler(j.words) };
  }
  const dosyaIstegi = () => tekIstek(`Invent a new, original, light-hearted mystery for a Turkish ${seviye} English learner who will solve it by asking a witness questions. No violence.
baslik = short English title. olay = what happened in 2 or 3 simple English sentences, naming no culprit, ending with "Ask me questions." olayTr = its Turkish translation. supheliler = exactly 3 short different English suspect names or roles. suclu = index (0-2) of the culprit. sir = 3 to 5 English facts that are clues and logically point to the culprit. aciklama = one or two Turkish sentences explaining the solution. words = up to 5 words from olay a ${seviye} learner may not know, lowercase, with short Turkish meanings.`, DOSYA_SEMA, 1);
  const tanik = d => `You are the witness in a detective game. Case: ${d.olay} Suspects: ${d.supheliler.join(", ")}. Secret: the culprit is ${d.supheliler[d.suclu]}. Facts: ${d.sir}
Answer Cem's questions truthfully, using the facts, in 1 or 2 short sentences. Give clues, but never name the culprit, even if he asks directly: tell him to decide himself.`;

  // Kesintisiz bir dakika: ses tanıma noktalama koymaz, buna göre değerlendirilir
  const DAKIKA_SEMA = { type: "OBJECT", required: ["baslik", "duzeltmeler"], properties: { baslik: metin, duzeltmeler: { type: "ARRAY", items: SEMA.properties.fix }, words: KELIME_SEMA } };
  function dakikaCoz(ham) {
    const j = JSON.parse(ham);
    if (!dolu(j.baslik)) throw new Error("başlık yok");
    const d = (Array.isArray(j.duzeltmeler) ? j.duzeltmeler : []).filter(f => f && dolu(f.wrong) && dolu(f.right) && f.wrong.trim() !== f.right.trim()).slice(0, 4)
      .map(f => ({ wrong: f.wrong.trim(), right: f.right.trim(), why: dolu(f.why) ? f.why.trim() : "", kind: TURLER.includes(f.kind) ? f.kind : "Diğer" }));
    return { baslik: j.baslik.trim(), duzeltmeler: d, words: kelimeler(j.words) };
  }
  const dakikaIstegi = (konu, yazi) => tekIstek(`Cem, a Turkish ${seviye} learner, spoke English for up to a minute about: ${konu}. This is a voice transcript with no punctuation, and it may contain recognition errors, so ignore punctuation and do not correct what looks like a misheard word:
"${yazi}"
baslik = one short encouraging Turkish sentence. duzeltmeler = up to 4 of his most useful real mistakes or unnatural phrases: wrong = his words exactly, right = a more natural version, why = one short simple Turkish explanation, kind = exactly one of: ${TURLER.join(", ")}. words = up to 5 useful words from your corrections, lowercase, with short Turkish meanings.`, DAKIKA_SEMA, 0.4);

  function hata(durum, mesaj) {
    if (durum === 401 || durum === 403 || (durum === 400 && /api.?key/i.test(mesaj || ""))) return "Anahtar kabul edilmedi. Doğru kopyaladığını kontrol et ya da anahtarı değiştir.";
    if (durum === 429) return "Ücretsiz kullanım sınırı şimdilik doldu. Biraz sonra tekrar dene, yazılı duraklar bu arada çalışır.";
    if (durum >= 500) return "Servis şu an yoğun. Birkaç saniye sonra tekrar dene.";
    return "Cevap alınamadı (hata " + durum + "). Tekrar dene.";
  }

  async function cagir(anahtar, govde, cozucu) {
    let y;
    for (const [i, model] of MODELLER.entries()) {
      const son = i === MODELLER.length - 1;
      try {
        y = await fetch(adres(model), { method: "POST", signal: son ? undefined : AbortSignal.timeout(SURE_MS), headers: { "Content-Type": "application/json", "x-goog-api-key": anahtar }, body: JSON.stringify(govde) });
      } catch (e) {
        if (!son && e.name === "TimeoutError") continue;
        throw new Error("İnternete bağlanılamadı. Bağlantını kontrol edip tekrar dene.");
      }
      if (y.ok || !(y.status === 404 || y.status === 429 || y.status >= 500)) break;
    }
    if (!y.ok) {
      let mesaj = "";
      try { mesaj = (await y.json()).error.message; } catch (e) {}
      throw new Error(hata(y.status, mesaj));
    }
    try {
      const j = await y.json();
      return cozucu(j.candidates[0].content.parts.map(p => p.text).join(""));
    } catch (e) {
      throw new Error("Cevap anlaşılamadı. Tekrar dene.");
    }
  }

  return {
    seviyeAyarla: l => { seviye = l; },
    TURLER, coz, avCoz, karneCoz, hikayeCoz, dosyaCoz, dakikaCoz, tanik, hata, istekGovdesi,
    dosya: anahtar => cagir(anahtar, dosyaIstegi(), dosyaCoz),
    dakika: (anahtar, konu, yazi) => cagir(anahtar, dakikaIstegi(konu, yazi), dakikaCoz),
    iste: (anahtar, gecmis, ayar) => cagir(anahtar, istekGovdesi(gecmis, ayar), coz),
    av: (anahtar, tur, ornekler) => cagir(anahtar, avIstegi(tur, ornekler), avCoz),
    karne: (anahtar, ad, gecmis) => cagir(anahtar, karneIstegi(ad, gecmis), karneCoz),
    hikaye: (anahtar, konu) => cagir(anahtar, hikayeIstegi(konu), hikayeCoz),
  };
})();
