// Serbest Sohbet: Gemini ücretsiz planına istek ve cevabın çözümü. Ekran kodu index.html'de.
const SOHBET = (() => {
  // Önce en hızlısı; yoksa, sınırı dolduysa ya da geç kalırsa Google'ın güncel takma adına geçilir
  const MODELLER = ["gemini-3.5-flash-lite", "gemini-flash-latest"];
  const SURE_MS = 20000;
  const adres = m => `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`;
  const SON_MESAJ = 29; // tek sayı: gönderilen geçmiş hep kullanıcının mesajıyla başlar

  const talimat = konu => `You are a friendly English conversation partner for Cem, a Turkish adult at B1 (intermediate) level. Topic: ${konu}. If Cem changes the topic, follow him.
Reply in natural everyday English, 1 to 3 short sentences, and usually end with one question. Use B1-level words.
Fields:
- reply: your English message.
- tr: Turkish translation of reply.
- fix: fill it only if Cem's last message has a real grammar or word-choice mistake, otherwise null. Ignore capital letters, punctuation and small typos, because he may be using voice input. wrong = the wrong part, right = the corrected part, why = one short, simple Turkish explanation.
- If Cem writes in Turkish or asks how to say something: fix.wrong = his text, fix.right = how to say it in English, fix.why = "Bunu böyle söyleyebilirsin." Then continue the chat in reply.
- words: at most 6 words from reply or fix.right that a B1 learner may not know, lowercase, with a short Turkish meaning in this context. Skip names and common words.
On the very first message there is nothing to correct: fix = null.`;

  const SEMA = {
    type: "OBJECT", required: ["reply", "tr", "words"],
    properties: {
      reply: { type: "STRING" }, tr: { type: "STRING" },
      fix: { type: "OBJECT", nullable: true, required: ["wrong", "right", "why"], properties: { wrong: { type: "STRING" }, right: { type: "STRING" }, why: { type: "STRING" } } },
      words: { type: "ARRAY", items: { type: "OBJECT", required: ["en", "tr"], properties: { en: { type: "STRING" }, tr: { type: "STRING" } } } },
    },
  };

  const istekGovdesi = (gecmis, konu) => ({
    systemInstruction: { parts: [{ text: talimat(konu) }] },
    contents: gecmis.slice(-SON_MESAJ).map(m => ({ role: m.role, parts: [{ text: m.text }] })),
    generationConfig: { responseMimeType: "application/json", responseSchema: SEMA, temperature: 0.8 },
  });

  // Yapay zekâdan gelen her alan denetlenir; eksik ya da bozuksa yok sayılır
  const dolu = x => typeof x === "string" && x.trim() !== "";
  function coz(ham) {
    const j = JSON.parse(ham);
    if (!dolu(j.reply)) throw new Error("boş cevap");
    const f = j.fix;
    return {
      reply: j.reply.trim(),
      tr: dolu(j.tr) ? j.tr.trim() : "",
      fix: f && dolu(f.wrong) && dolu(f.right) && f.wrong.trim() !== f.right.trim() ? { wrong: f.wrong.trim(), right: f.right.trim(), why: dolu(f.why) ? f.why.trim() : "" } : null,
      words: (Array.isArray(j.words) ? j.words : []).filter(w => w && dolu(w.en) && dolu(w.tr) && /^[a-zé'’-]+$/i.test(w.en.trim()))
        .map(w => [w.en.trim().toLowerCase().replace(/’/g, "'"), w.tr.trim()]),
    };
  }

  function hata(durum, mesaj) {
    if (durum === 401 || durum === 403 || (durum === 400 && /api.?key/i.test(mesaj || ""))) return "Anahtar kabul edilmedi. Doğru kopyaladığını kontrol et ya da anahtarı değiştir.";
    if (durum === 429) return "Ücretsiz kullanım sınırı şimdilik doldu. Biraz sonra tekrar dene, yazılı duraklar bu arada çalışır.";
    if (durum >= 500) return "Servis şu an yoğun. Birkaç saniye sonra tekrar dene.";
    return "Cevap alınamadı (hata " + durum + "). Tekrar dene.";
  }

  async function iste(anahtar, gecmis, konu) {
    let y;
    for (const [i, model] of MODELLER.entries()) {
      const son = i === MODELLER.length - 1;
      try {
        y = await fetch(adres(model), { method: "POST", signal: son ? undefined : AbortSignal.timeout(SURE_MS), headers: { "Content-Type": "application/json", "x-goog-api-key": anahtar }, body: JSON.stringify(istekGovdesi(gecmis, konu)) });
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
      return coz(j.candidates[0].content.parts.map(p => p.text).join(""));
    } catch (e) {
      throw new Error("Cevap anlaşılamadı. Tekrar dene.");
    }
  }

  return { iste, coz, hata, istekGovdesi };
})();
