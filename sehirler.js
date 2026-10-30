// Bölgeler: her durak tam bir bölgede. Bütün şehirleri bitince üç bölümlü final açılır.
const BOLGELER = [
  { ad: "Britanya ve İrlanda", kod: "BRT", g: ["#274B6D", "#8FB3C9"], kodlar: ["LON", "DUB", "EDI", "GLA", "BRS", "CWL", "LPL", "BFS", "LBA", "MAN", "BHX", "NCL", "ABZ", "OXF", "GWY", "CBG"],
    final: { baslik: "Yeni iş, Londra", ozet: "Londra'da yeni bir işe başlıyorsun: müdürle ilk gün, ev sahibiyle sorun, pub'da iş arkadaşları.", bolumler: [
      { who: "Müdür", k: "You are a British manager on Cem's first day at a new job in London. Welcome him, ask about his experience and explain his first tasks." },
      { who: "Ev sahibi", k: "You are a British landlord. Cem's flat has a leaking ceiling and you keep delaying the repair. Agree only when he is polite and firm." },
      { who: "İş arkadaşı", k: "You are a friendly colleague in a London pub after work. Make small talk about football, weather and weekend plans, and use a few common British expressions." } ] } },
  { ad: "ABD", kod: "ABD", g: ["#3B2C5E", "#E08A6B"], kodlar: ["NYC", "LAX", "CHI", "BOS", "SEA", "MIA", "ATL", "DEN", "HOU", "DFW", "SFO", "PHL", "LAS", "MCO", "DCA", "SLC", "PDX", "MSY", "PHX", "HNL"],
    final: { baslik: "Yol hikâyesi, New York'tan Los Angeles'a", ozet: "Amerika'yı baştan başa geçiyorsun: araba kiralama, yolda bozulma, yeni tanışılan bir aile.", bolumler: [
      { who: "Kiralama görevlisi", k: "You are an American car rental agent in New York who keeps trying to sell Cem extra insurance. Answer his questions about the car and the price." },
      { who: "Tamirci", k: "You are a mechanic in a small town in Texas. Cem's rental car broke down. Explain the problem, the cost and the time, and be open to negotiation." },
      { who: "Ev sahibi aile", k: "You are a friendly host in Los Angeles having dinner with Cem. Ask about his trip and about life in Turkey, and share your own stories." } ] } },
  { ad: "Kanada", kod: "CAN", g: ["#8E2B2B", "#E7B7A0"], kodlar: ["TOR", "YVR", "YOW", "YUL", "YYC", "YHZ", "YWG"],
    final: { baslik: "Yeni hayat, Toronto", ozet: "Kanada'ya yerleşiyorsun: işe başlıyor, ev arkadaşınla sorun çözüyor, komşunla tanışıyorsun.", bolumler: [
      { who: "İş arkadaşı", k: "You are a friendly Canadian colleague in Toronto. Welcome Cem to the team and ask about his first week and where he lives." },
      { who: "Ev arkadaşı", k: "You are Cem's flatmate. You disagree about noise, cleaning and bills. Find a fair solution together." },
      { who: "Komşu", k: "You are Cem's new neighbour, polite and curious, and you invite him to a local event. Ask about him and tell him about the area." } ] } },
  { ad: "Okyanusya", kod: "OKY", g: ["#0E6C8C", "#7ED0D6"], kodlar: ["SYD", "MEL", "AKL", "PER", "WLG", "BNE", "ADL", "CHC", "CBR"],
    final: { baslik: "Macera, Sidney'den Auckland'a", ozet: "Okyanusya turundasın: tur rehberi, kayıp eşya ve doğa yürüyüşünde yeni arkadaşlar.", bolumler: [
      { who: "Tur rehberi", k: "You are an Australian tour guide in Sydney. Explain tomorrow's trip and answer Cem's questions about times, prices and what to bring." },
      { who: "Havayolu görevlisi", k: "You are an airline employee at Auckland airport. Cem's bag is lost. Ask for details, explain the process and try to calm him down." },
      { who: "Yürüyüş arkadaşı", k: "You are a friendly New Zealander on a long nature walk with Cem. Chat about nature, travel and life at home." } ] } },
  { ad: "Afrika ve Asya", kod: "AFA", g: ["#1F6F60", "#B7DDB0"], kodlar: ["CPT", "SIN", "DEL", "JNB", "NBO", "MNL"],
    final: { baslik: "İş gezisi, Cape Town'dan Singapur'a", ozet: "Uluslararası bir iş gezisindesin: müşteri toplantısı, yanlış otel rezervasyonu ve veda yemeği.", bolumler: [
      { who: "Müşteri", k: "You are a business client in Cape Town meeting Cem for the first time. Ask what his company offers and discuss the price and the schedule." },
      { who: "Otel görevlisi", k: "You are a hotel employee in Singapore. There is no record of Cem's booking and the hotel is nearly full. Help him find a solution." },
      { who: "İş ortağı", k: "You are a business partner at a farewell dinner in Delhi. Thank Cem, talk about food and culture, and discuss working together again." } ] } },
];
const bolgeOf = kod => BOLGELER.findIndex(b => b.kodlar.includes(kod));

// Çizim dili: gökyüzü + uzak hava katmanı + şehir + ön plandaki ışıklı simge + suda yansıma
function sehirCiz(kod, ad) {
  const W = 640, H = 280;
  let tohum = [...kod].reduce((a, c) => a * 31 + c.charCodeAt(0), 7);
  const r = () => (tohum = (tohum * 9301 + 49297) % 233280) / 233280;
  const n = x => +x.toFixed(1);
  const gok = (id, renkler) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${renkler.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join("")}</linearGradient>`;
  const parilti = (id, c) => `<radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity=".95"/><stop offset=".35" stop-color="${c}" stop-opacity=".35"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;
  const bulut = (x, y, g, c, o) => `<g fill="${c}" opacity="${o}">${Array.from({ length: 5 }, (_, i) => `<ellipse cx="${n(x + i * g * .22)}" cy="${n(y + (i % 2) * 2)}" rx="${n(g * (.18 + r() * .14))}" ry="${n(3 + r() * 5)}"/>`).join("")}</g>`;
  // Binalar: katlı tepe, anten, ışıklı pencereler
  function sehir(x0, x1, zemin, hMin, hMax, gMin, gMax, renk, pencere, oran) {
    let c = "";
    for (let x = x0; x < x1;) {
      const g = gMin + r() * (gMax - gMin), h = hMin + r() * (hMax - hMin), y = zemin - h;
      c += `<rect x="${n(x)}" y="${n(y)}" width="${n(g)}" height="${n(h)}" fill="${renk}"/>`;
      if (g > 14 && r() > .55) c += `<rect x="${n(x + g * .2)}" y="${n(y - 7)}" width="${n(g * .6)}" height="8" fill="${renk}"/>`;
      if (r() > .8) c += `<rect x="${n(x + g / 2)}" y="${n(y - 20)}" width="1.2" height="20" fill="${renk}"/>`;
      if (pencere) for (let wy = y + 4; wy < zemin - 3; wy += 5) for (let wx = x + 2.5; wx < x + g - 3; wx += 4) if (r() < oran) c += `<rect x="${n(wx)}" y="${n(wy)}" width="1.8" height="2.6" fill="${pencere}" opacity="${n(.45 + r() * .55)}"/>`;
      x += g + r() * 1.5;
    }
    return c;
  }
  const su = (y, id, cizgi, adet) => `<rect y="${y}" width="${W}" height="${H - y}" fill="url(#${id})"/>` + Array.from({ length: adet }, () => { const yy = y + 3 + r() * (H - y - 4), g = 12 + r() * 60; return `<rect x="${n(r() * W)}" y="${n(yy)}" width="${n(g)}" height="1" fill="${cizgi}" opacity="${n(.12 + r() * .3)}"/>`; }).join("");
  const yansima = (id, y) => `<use href="#${id}" transform="translate(0 ${y * 2}) scale(1 -1)" opacity=".28"/>`;

  const CIZIM = {
    LON() {
      // Alacakaranlıkta Westminster: Big Ben, parlamento cephesi, Thames
      const yer = 214;
      let saray = "";
      for (let x = 92; x < 440; x += 19) {
        const bay = (x - 92) / 19, kuleli = bay % 4 === 0, t = kuleli ? 30 : 12, ust = yer - (kuleli ? 74 : 62);
        saray += `<rect x="${x}" y="${ust}" width="19.5" height="${yer - ust}" fill="#2C2A3C"/><rect x="${x}" y="${ust}" width="1" height="${yer - ust}" fill="#4B4560"/>`;
        saray += `<path d="M${x} ${ust}l2.5-${t}l2.5 ${t}zM${x + 14.5} ${ust}l2.5-${t}l2.5 ${t}z" fill="#3A3650"/>`;
        if (!kuleli) saray += `<path d="M${x + 5} ${ust}l4.5-7l5 7z" fill="#383349"/>`;
        for (const wy of [yer - 52, yer - 36, yer - 20]) saray += `<path d="M${x + 7} ${wy + 12}v-8l2.5-4l2.5 4v8z" fill="#F4C56F" opacity="${n(.4 + r() * .6)}"/>`;
      }
      const vt = `<path d="M46 ${yer}V96h4l4-16 2 16h12l2-16 4 16h4V${yer}z" fill="#2C2A3C"/><path d="M64 96V60" stroke="#2C2A3C" stroke-width="2"/>` + Array.from({ length: 7 }, (_, i) => `<path d="M58 ${112 + i * 14}v-7l2-3 2 3v7zM68 ${112 + i * 14}v-7l2-3 2 3v7z" fill="#F4C56F" opacity=".7"/>`).join("");
      const cx = 498, kule = Array.from({ length: 9 }, (_, i) => `<rect x="${cx - 21 + i * 5.2}" y="120" width="1" height="${yer - 120}" fill="#1B1A29" opacity=".55"/>`).join("") + Array.from({ length: 10 }, (_, i) => `<rect x="${cx - 23}" y="${128 + i * 9}" width="46" height="1" fill="#1B1A29" opacity=".45"/>`).join("");
      const ticks = Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<line x1="${n(cx + Math.sin(a) * 16)}" y1="${n(94 - Math.cos(a) * 16)}" x2="${n(cx + Math.sin(a) * 19)}" y2="${n(94 - Math.cos(a) * 19)}" stroke="#3A2C14" stroke-width="1.4"/>`; }).join("");
      const bigben = `<linearGradient id="tas" x1="0" x2="1"><stop offset="0" stop-color="#6E6079"/><stop offset=".55" stop-color="#3D3650"/><stop offset="1" stop-color="#262335"/></linearGradient>
        <path d="M${cx - 8} 62 L${cx} 10 L${cx + 8} 62z" fill="#262335"/><path d="M${cx - 8} 62L${cx} 10v52z" fill="#4C4460"/><circle cx="${cx}" cy="9" r="2" fill="#F0C65A"/>
        <path d="M${cx - 18} 66l3-12 3 12zM${cx + 12} 66l3-12 3 12z" fill="#3D3650"/><rect x="${cx - 18}" y="60" width="36" height="12" fill="#3D3650"/>
        ${[-10, -3.5, 3, 9.5].map(d => `<path d="M${cx + d - 1.5} 72v-8l1.5-3 1.5 3v8z" fill="#F4C56F" opacity=".9"/>`).join("")}
        <rect x="${cx - 25}" y="70" width="50" height="50" fill="url(#tas)"/><rect x="${cx - 25}" y="70" width="50" height="3" fill="#81738D"/><rect x="${cx - 25}" y="117" width="50" height="3" fill="#81738D"/>
        <rect x="${cx - 23}" y="120" width="46" height="${yer - 120}" fill="url(#tas)"/>${kule}
        <circle cx="${cx}" cy="94" r="24" fill="url(#saat)"/><circle cx="${cx}" cy="94" r="21.5" fill="#FFF0BE" stroke="#B48A3C" stroke-width="2"/>${ticks}
        <line x1="${cx}" y1="94" x2="${cx + 10}" y2="87" stroke="#2A1F0D" stroke-width="2.2" stroke-linecap="round"/><line x1="${cx}" y1="94" x2="${cx - 3}" y2="78" stroke="#2A1F0D" stroke-width="1.5" stroke-linecap="round"/>`;
      return { defs: gok("gk", [[0, "#1D2448"], [.45, "#5B4A78"], [.74, "#D9866C"], [1, "#F7C47E"]]) + gok("sv", [[0, "#7A5A6C"], [1, "#171B30"]]) + parilti("gun", "#FFD79A") + parilti("saat", "#FFE6A6"),
        ciz: `<rect width="${W}" height="${H}" fill="url(#gk)"/><circle cx="210" cy="176" r="90" fill="url(#gun)"/>${bulut(30, 70, 190, "#F2B58E", .35)}${bulut(330, 48, 200, "#E79F8C", .28)}
          <g fill="#6D5470" opacity=".55">${sehir(0, W, yer, 26, 66, 16, 34, "#6D5470")}</g>
          <g id="anit">${saray}${vt}${bigben}</g><rect y="${yer}" width="${W}" height="3" fill="#191828"/>${su(yer + 3, "sv", "#FFD9A0", 34)}${yansima("anit", yer + 3)}` };
    },
    NYC() {
      const yer = 236, cx = 300;
      const esb = [[60, 118], [44, 96], [30, 72], [20, 52], [11, 34]];
      let kule = "", y = yer - 90;
      kule += `<rect x="${cx - 44}" y="${y}" width="88" height="90" fill="url(#cephe)"/>`;
      esb.forEach(([g, h]) => { y -= h * .3; kule += `<rect x="${cx - g / 2}" y="${n(y)}" width="${g}" height="${n(h * .3 + 1)}" fill="url(#cephe)"/>`; });
      kule += `<path d="M${cx - 2} ${n(y)}L${cx} ${n(y - 34)}L${cx + 2} ${n(y)}z" fill="#E7D2C0"/>`;
      const ust = y;
      for (let wx = cx - 42; wx < cx + 42; wx += 4) for (let wy = n(ust + 6); wy < yer - 4; wy += 6) {
        const yar = wy < yer - 90 ? 26 * (1 - (yer - 90 - wy) / (yer - 90 - ust)) + 5 : 44;
        if (Math.abs(wx - cx) < yar && r() < .62) kule += `<rect x="${wx}" y="${n(wy)}" width="2" height="3" fill="#FFD98A" opacity="${n(.5 + r() * .5)}"/>`;
      }
      const krysler = `<g transform="translate(452 0)"><rect x="-24" y="120" width="48" height="${yer - 120}" fill="url(#cephe2)"/><path d="M-20 120Q-20 98 0 34Q20 98 20 120z" fill="#CBB9B0"/>${[0, 1, 2, 3, 4].map(i => `<path d="M${-16 + i * 2} ${112 - i * 15}Q0 ${84 - i * 15} ${16 - i * 2} ${112 - i * 15}" fill="none" stroke="#6C5E79" stroke-width="1.4"/>`).join("")}<path d="M0 34L1 4L-1 4z" fill="#EFE1D6"/>${sehir(-22, 22, yer, 110, 110, 44, 44, "transparent", "#FFD98A", .5)}</g>`;
      return { defs: gok("gk", [[0, "#231A4A"], [.5, "#6F3F7E"], [.78, "#E47C62"], [1, "#FBC47C"]]) + gok("cephe", [[0, "#3E3158"], [1, "#1E1833"]]) + gok("cephe2", [[0, "#40305A"], [1, "#1E1833"]]) + gok("sv", [[0, "#5F3D66"], [1, "#120E24"]]) + parilti("gun", "#FFC88A"),
        ciz: `<rect width="${W}" height="${H}" fill="url(#gk)"/><circle cx="120" cy="196" r="110" fill="url(#gun)"/>${bulut(380, 56, 220, "#F4A68A", .25)}${bulut(40, 88, 170, "#F4A68A", .22)}
          <g opacity=".5">${sehir(0, W, yer, 50, 120, 16, 34, "#7A4E7E")}</g><g opacity=".85">${sehir(0, W, yer, 34, 104, 18, 36, "#42305F", "#FFD98A", .25)}</g>
          <g id="anit">${kule}${krysler}${sehir(0, W, yer, 22, 74, 20, 40, "#1C1730", "#FFC873", .34)}</g>${su(yer, "sv", "#FFC88A", 30)}${yansima("anit", yer)}` };
    },
    SYD() {
      const yer = 216;
      const kabuk = (x, g, h, koyu, ac) => {
        const u = x + g * .72, t = yer - 12 - h;
        const kaburga = Array.from({ length: 7 }, (_, i) => { const f = (i + 1) / 8; return `<path d="M${n(x + g * f * .85)} ${yer - 12}Q${n(u - g * .14 * (1 - f))} ${n(t + h * .4 * f)} ${n(u)} ${n(t + 1)}" fill="none" stroke="${koyu}" stroke-width=".7" opacity=".55"/>`; }).join("");
        return `<path d="M${x} ${yer - 12}Q${n(x + g * .32)} ${n(t + h * .2)} ${n(u)} ${n(t)}Q${n(x + g * .88)} ${n(t + h * .5)} ${n(x + g)} ${yer - 12}z" fill="url(#kabuk)"/><path d="M${n(u)} ${n(t)}Q${n(x + g * .88)} ${n(t + h * .5)} ${n(x + g)} ${yer - 12}L${n(x + g * .78)} ${yer - 12}Q${n(u - 2)} ${n(t + h * .5)} ${n(u)} ${n(t)}z" fill="${ac}"/>${kaburga}`;
      };
      const opera = kabuk(376, 74, 62, "#7E9AAB", "#B7CBD5") + kabuk(420, 66, 74, "#7E9AAB", "#BFD1DA") + kabuk(468, 60, 60, "#7E9AAB", "#B7CBD5") + kabuk(512, 50, 44, "#7E9AAB", "#C3D3DB") + kabuk(300, 54, 40, "#7E9AAB", "#B7CBD5") + kabuk(336, 50, 50, "#7E9AAB", "#B7CBD5");
      const taban = `<path d="M286 ${yer - 12}H590l24 12H262z" fill="#BE9F86"/><rect x="262" y="${yer}" width="352" height="4" fill="#7E6653"/>` + Array.from({ length: 28 }, (_, i) => `<rect x="${296 + i * 10.4}" y="${yer - 9}" width="6" height="5" fill="#5D4E47" opacity=".6"/>`).join("");
      // Harbour Bridge: kafes kemer
      const ay = 150, bx = 8, bg = 250, kemer = t => [bx + bg * t, 70 + 300 * (t - .5) ** 2 * .9];
      let kafes = "";
      for (let i = 0; i <= 20; i++) {
        const [x, y] = kemer(i / 20), [x2, y2] = kemer((i + 1) / 20), alt = y + 14 + Math.abs(i - 10) * 1.2;
        if (i < 20) kafes += `<line x1="${n(x)}" y1="${n(y)}" x2="${n(x2)}" y2="${n(y2)}" stroke="#4E5F6E" stroke-width="2.4"/><line x1="${n(x)}" y1="${n(y)}" x2="${n(x2)}" y2="${n(y2 + 14 + Math.abs(i + 1 - 10) * 1.2)}" stroke="#5F7181" stroke-width=".8"/>`;
        kafes += `<line x1="${n(x)}" y1="${n(y)}" x2="${n(x)}" y2="${n(alt)}" stroke="#5F7181" stroke-width="1"/>`;
        if (y < ay) kafes += `<line x1="${n(x)}" y1="${n(alt)}" x2="${n(x)}" y2="${ay}" stroke="#6D7F8E" stroke-width=".8"/>`;
      }
      const kopru = `${kafes}<rect x="-10" y="${ay}" width="${bg + 40}" height="5" fill="#44535F"/><rect x="${bx - 8}" y="${ay - 22}" width="15" height="${yer - ay + 22}" fill="#8A7A6B"/><rect x="${bx + bg - 8}" y="${ay - 22}" width="15" height="${yer - ay + 22}" fill="#8A7A6B"/>`;
      return { defs: gok("gk", [[0, "#2B7EAE"], [.6, "#8CCCDC"], [1, "#F8E3BC"]]) + gok("sv", [[0, "#3B9BB5"], [1, "#0C4E70"]]) + gok("kabuk", [[0, "#FFFFFF"], [1, "#DCE6EA"]]) + parilti("gun", "#FFF6D6"),
        ciz: `<rect width="${W}" height="${H}" fill="url(#gk)"/><circle cx="560" cy="48" r="90" fill="url(#gun)"/>${bulut(80, 40, 200, "#FFFFFF", .55)}${bulut(330, 66, 150, "#FFFFFF", .4)}
          <g opacity=".55">${sehir(150, 420, yer - 2, 30, 96, 16, 30, "#6E9FB5", "#E9F6F7", .12)}</g>
          <path d="M0 ${yer}Q120 ${yer - 22} 300 ${yer - 6}L300 ${yer}z" fill="#3F7A6A" opacity=".85"/>
          <g id="anit">${kopru}${taban}${opera}</g>${su(yer + 4, "sv", "#E6FAFF", 46)}${yansima("anit", yer + 4)}` };
    },
    SFO() {
      const yer = 222, tv = 96, ty = 26, cx1 = 170, cx2 = 500;
      const kule = x => {
        let k = `<rect x="${x - 14}" y="${ty}" width="9" height="${yer - ty}" fill="url(#kule)"/><rect x="${x + 5}" y="${ty}" width="9" height="${yer - ty}" fill="url(#kule)"/>`;
        [ty + 2, ty + 28, ty + 56, ty + 86, ty + 122, ty + 158].forEach((y, i) => { k += `<rect x="${x - 14}" y="${y}" width="28" height="${7 - i * .4}" fill="#B23F1E"/><rect x="${x - 11}" y="${y + 8}" width="22" height="1.5" fill="#7F2A12"/>`; });
        k += `<rect x="${x - 16}" y="${ty - 7}" width="32" height="8" fill="#D2552B"/><rect x="${x - 2}" y="${ty - 17}" width="4" height="11" fill="#8D2F15"/>`;
        return k;
      };
      const kablo = (x1, x2, y1, y2, dip) => { const t0 = `M${x1} ${y1}Q${(x1 + x2) / 2} ${dip * 2 - (y1 + y2) / 2} ${x2} ${y2}`; let a = "", ad = 34; for (let i = 1; i < ad; i++) { const t = i / ad, x = x1 + (x2 - x1) * t, y = (1 - t) ** 2 * y1 + 2 * (1 - t) * t * (dip * 2 - (y1 + y2) / 2) + t ** 2 * y2; a += `<line x1="${n(x)}" y1="${n(y)}" x2="${n(x)}" y2="${tv + 42}" stroke="#D2552B" stroke-width=".7" opacity=".85"/>`; } return `<path d="${t0}" fill="none" stroke="#A83B1B" stroke-width="2.4"/>${a}`; };
      const kopru = kablo(cx1, cx2, ty, ty, tv + 36) + kablo(-90, cx1, ty + 80, ty, ty + 62) + kablo(cx2, 730, ty, ty + 80, ty + 62) + `<rect x="-5" y="${tv + 40}" width="${W + 10}" height="7" fill="#C94E26"/><rect x="-5" y="${tv + 47}" width="${W + 10}" height="4" fill="#7F2A12"/>` + Array.from({ length: 80 }, (_, i) => `<line x1="${i * 8}" y1="${tv + 47}" x2="${i * 8 + 4}" y2="${tv + 51}" stroke="#D2552B" stroke-width=".7"/>`).join("") + kule(cx1) + kule(cx2);
      const sis = (y, o) => `<ellipse cx="${n(r() * W)}" cy="${y}" rx="${n(150 + r() * 130)}" ry="${n(9 + r() * 7)}" fill="#FFF0DF" opacity="${o}"/>`;
      return { defs: gok("gk", [[0, "#3C4A7A"], [.42, "#C76C6C"], [.72, "#F4A765"], [1, "#FBDDA0"]]) + gok("kule", [[0, "#E2602F"], [1, "#9A3517"]]) + gok("sv", [[0, "#C98068"], [1, "#2A3556"]]) + parilti("gun", "#FFE3A0"),
        ciz: `<rect width="${W}" height="${H}" fill="url(#gk)"/><circle cx="340" cy="178" r="118" fill="url(#gun)"/><circle cx="340" cy="178" r="26" fill="#FFF0C4"/>${bulut(30, 52, 240, "#FFD3AE", .3)}
          <path d="M0 196Q90 142 200 176T400 170T640 148V${yer}H0z" fill="#5B5A7E" opacity=".7"/><path d="M0 210Q120 170 260 200T640 178V${yer}H0z" fill="#3E4265"/>
          ${[188, 200, 176].map((y, i) => sis(y, .35 - i * .06)).join("")}<g id="anit">${kopru}</g>${sis(170, .32)}${sis(204, .4)}${su(yer, "sv", "#FFDFAE", 38)}${yansima("anit", yer)}` };
    },
    CPT() {
      const yer = 228;
      const dag = `M0 190L70 164L128 128L150 112L168 92L190 76L206 74L430 72L456 80L478 104L520 132L568 150L640 172V${yer}H0z`;
      const siyrik = Array.from({ length: 34 }, () => { const x = 196 + r() * 250, y = 80 + r() * 30, h = 40 + r() * 70; return `<path d="M${n(x)} ${n(y)}l${n(-5 + r() * 10)} ${n(h * .5)}l${n(-5 + r() * 10)} ${n(h * .5)}" fill="none" stroke="#2F5A58" stroke-width="${n(1 + r() * 3)}" stroke-linecap="round" opacity="${n(.1 + r() * .2)}"/>`; }).join("");
      const orman = Array.from({ length: 120 }, () => { const x = r() * W, y = 186 + r() * 36; return `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(4 + r() * 6)}" ry="${n(2 + r() * 3)}" fill="#2E6A55" opacity="${n(.4 + r() * .5)}"/>`; }).join("");
      const ev = Array.from({ length: 150 }, () => { const x = r() * W, y = 208 + r() * 20, g = 3 + r() * 7; return `<rect x="${n(x)}" y="${n(y)}" width="${n(g)}" height="${n(2 + r() * 5)}" fill="${["#F4EEDF", "#E9D7BE", "#D8C3A5", "#C9A98B"][Math.floor(r() * 4)]}"/>`; }).join("");
      const ortu = Array.from({ length: 22 }, (_, i) => `<ellipse cx="${n(205 + i * 11)}" cy="${n(70 + r() * 6)}" rx="${n(13 + r() * 12)}" ry="${n(5 + r() * 5)}" fill="#FFFFFF" opacity=".92"/>`).join("") + Array.from({ length: 9 }, () => `<ellipse cx="${n(210 + r() * 220)}" cy="${n(84 + r() * 14)}" rx="${n(7 + r() * 10)}" ry="${n(4 + r() * 8)}" fill="#FFFFFF" opacity=".55"/>`).join("");
      return { defs: gok("gk", [[0, "#4A9CC7"], [.6, "#A6DCE0"], [1, "#FBEBC8"]]) + gok("dag", [[0, "#7A9F93"], [.5, "#467B72"], [1, "#2A5F54"]]) + gok("sv", [[0, "#5FB7BE"], [1, "#0F5C76"]]) + parilti("gun", "#FFF5D0"),
        ciz: `<rect width="${W}" height="${H}" fill="url(#gk)"/><circle cx="80" cy="46" r="86" fill="url(#gun)"/>${bulut(450, 44, 150, "#FFFFFF", .6)}
          <path d="M360 190L460 118L520 96L556 120L640 106V${yer}H360z" fill="#7BAFB0" opacity=".6"/><path d="${dag}" fill="url(#dag)"/>${siyrik}<path d="M190 76L206 74L430 72L456 80L448 92L196 92z" fill="#9CBCB2" opacity=".55"/>${ortu}${orman}
          <g id="anit">${ev}${[60, 150, 300, 520].map(x => `<rect x="${x}" y="${192 + r() * 12}" width="9" height="34" fill="#E9E4D8"/>`).join("")}</g>${su(yer, "sv", "#E6FBFF", 34)}${Array.from({ length: 3 }, (_, i) => `<path d="M${120 + i * 180} ${248 + i * 6}l8-16v16zM${122 + i * 180} ${249 + i * 6}h14l-3 4h-9z" fill="#FFFFFF"/>`).join("")}` };
    },
    HNL() {
      const yer = 196;
      const palmiye = (x, y, h, k, olcek) => {
        const tepeX = x + k, tepeY = y - h;
        let c = `<path d="M${x - 5 * olcek} ${y}Q${x + k * .2} ${n(y - h * .55)} ${tepeX - 2 * olcek} ${tepeY}L${tepeX + 2 * olcek} ${tepeY}Q${x + k * .35} ${n(y - h * .55)} ${x + 5 * olcek} ${y}z" fill="#3A2318"/>`;
        for (let i = 1; i < 12; i++) { const t = i / 12; const xx = x * (1 - t) ** 2 + 2 * (1 - t) * t * (x + k * .25) + t ** 2 * tepeX, yy = y - h * t; c += `<path d="M${n(xx - 4 * olcek * (1 - t * .6))} ${n(yy)}h${n(8 * olcek * (1 - t * .6))}" stroke="#20120C" stroke-width="1"/>`; }
        for (const [a, u] of [[-168, 60], [-140, 66], [-112, 56], [-78, 54], [-44, 62], [-14, 66], [14, 56], [172, 52]]) {
          const R = u * olcek, rad = a * Math.PI / 180, ux = tepeX + Math.cos(rad) * R, uy = tepeY + Math.sin(rad) * R * .55 + R * .4, ox = tepeX + Math.cos(rad) * R * .55, oy = tepeY + Math.sin(rad) * R * .8 - 6 * olcek;
          c += `<path d="M${tepeX} ${tepeY}Q${n(ox)} ${n(oy)} ${n(ux)} ${n(uy)}" fill="none" stroke="#173A28" stroke-width="${n(3.4 * olcek)}" stroke-linecap="round"/>`;
          for (let i = 2; i < 11; i++) { const t = i / 11, px = (1 - t) ** 2 * tepeX + 2 * (1 - t) * t * ox + t ** 2 * ux, py = (1 - t) ** 2 * tepeY + 2 * (1 - t) * t * oy + t ** 2 * uy, boy = 15 * olcek * (1 - t * .55); c += `<path d="M${n(px)} ${n(py)}l${n(Math.cos(rad) * boy * .45 - 3)} ${n(boy)}M${n(px)} ${n(py)}l${n(Math.cos(rad) * boy * .45 + 3)} ${n(boy * .9)}" stroke="#1F4D34" stroke-width="${n(1.5 * olcek)}"/>`; }
        }
        return c + `<circle cx="${tepeX - 3}" cy="${tepeY + 3}" r="${3 * olcek}" fill="#20120C"/><circle cx="${tepeX + 3}" cy="${tepeY + 4}" r="${3 * olcek}" fill="#20120C"/>`;
      };
      const krater = `<path d="M170 ${yer}Q196 150 242 126Q262 112 286 112Q300 108 312 116Q334 110 356 124Q404 148 452 ${yer}z" fill="url(#dag)"/>` + Array.from({ length: 16 }, (_, i) => { const x = 212 + i * 14, ty = 124 + Math.abs(i - 7) * 3.4; return `<path d="M${x} ${n(ty)}q${n(-6 + r() * 8)} ${n((yer - ty) * .45)} ${n(-12 + i * 1.5)} ${n(yer - ty)}" fill="none" stroke="#5B5D43" stroke-width="1.4" opacity=".55"/>`; }).join("");
      const dalgalar = Array.from({ length: 9 }, (_, i) => `<path d="M${n(-20 + r() * 100)} ${n(208 + i * 5)}q${n(120 + r() * 120)} ${-6 - r() * 3} ${n(300 + r() * 360)} 2" fill="none" stroke="#FFFFFF" stroke-width="${n(.9 + i * .1)}" opacity="${n(.2 + r() * .3)}"/>`).join("");
      return { defs: gok("gk", [[0, "#5B3B7E"], [.38, "#D1647D"], [.68, "#F7935F"], [1, "#FFD48A"]]) + gok("dag", [[0, "#A08F62"], [1, "#55663F"]]) + gok("sv", [[0, "#FBB079"], [.3, "#3D8FA1"], [1, "#0F4D69"]]) + gok("kum", [[0, "#F4CE94"], [1, "#C5914F"]]) + parilti("gun", "#FFEFB0"),
        ciz: `<rect width="${W}" height="${H}" fill="url(#gk)"/><circle cx="230" cy="176" r="120" fill="url(#gun)"/><circle cx="230" cy="176" r="30" fill="#FFF3BE"/>${bulut(20, 60, 200, "#FFC49B", .4)}${bulut(330, 90, 230, "#FFB08F", .32)}
          ${krater}<g opacity=".75">${sehir(380, 540, yer, 12, 42, 10, 18, "#65506D", "#FFE3A0", .35)}</g>
          ${su(yer, "sv", "#FFE3B8", 30)}${dalgalar}${Array.from({ length: 12 }, (_, i) => { const g = 44 - i * 2.4 + r() * 16; return `<rect x="${n(230 - g / 2 + (r() - .5) * 6)}" y="${yer + 2 + i * 3.4}" width="${n(g)}" height="1.6" fill="#FFF0BC" opacity="${n(.75 - i * .05)}"/>`; }).join("")}
          <path d="M340 ${H}Q440 226 ${W} 214V${H}z" fill="url(#kum)"/>
          ${palmiye(556, 262, 196, -18, 1.25)}${palmiye(606, 268, 136, 12, .95)}${palmiye(492, 262, 104, -14, .7)}` };
    },
    DUB() {
      // Liffey kıyısı: renkli Georgian evler, Ha'penny köprüsü, Custom House kubbesi
      const yer = 196, renk = ["#B8533F", "#3F6E7C", "#D2A23F", "#6C7F4F", "#8E4A5E", "#C7714A", "#4C5F8A"];
      let evler = "";
      for (let x = 0, i = 0; x < W; i++) {
        const g = 44 + r() * 20, h = 62 + r() * 34, y = yer - h, c = renk[i % renk.length];
        evler += `<rect x="${n(x)}" y="${n(y)}" width="${n(g)}" height="${n(h)}" fill="${c}"/><rect x="${n(x)}" y="${n(y - 5)}" width="${n(g)}" height="5" fill="#3A2F2C"/>`;
        evler += `<rect x="${n(x + g * .15)}" y="${n(y - 12)}" width="7" height="8" fill="#4A3B36"/><rect x="${n(x + g * .68)}" y="${n(y - 12)}" width="7" height="8" fill="#4A3B36"/>`;
        for (let wy = y + 8; wy < yer - 24; wy += 17) for (let wx = x + 7; wx < x + g - 9; wx += 13) evler += `<rect x="${n(wx)}" y="${n(wy)}" width="7" height="11" fill="${r() > .55 ? "#FFE3A0" : "#E7ECEA"}" opacity=".92"/><rect x="${n(wx + 3)}" y="${n(wy)}" width="1" height="11" fill="#3A2F2C" opacity=".5"/>`;
        evler += `<path d="M${n(x + g / 2 - 6)} ${yer}v-16a6 6 0 0 1 12 0v16z" fill="${renk[(i + 3) % renk.length]}"/><rect x="${n(x + g + .5)}" y="${n(y)}" width="1" height="${n(h)}" fill="#2B2422" opacity=".4"/>`;
        x += g + 1;
      }
      const kubbe = `<g transform="translate(90 0)"><rect x="-72" y="118" width="144" height="34" fill="#D9D3C2" opacity=".85"/><rect x="-16" y="84" width="32" height="34" fill="#D9D3C2" opacity=".9"/><path d="M-14 84Q0 54 14 84z" fill="#6E9C91"/><rect x="-1" y="42" width="2" height="24" fill="#6E9C91"/></g>`;
      let kemer = "";
      for (let i = 0; i <= 26; i++) { const x = 170 + i * 12, y = 196 - 58 * (1 - ((i - 13) / 13) ** 2); kemer += `<line x1="${x}" y1="${n(y)}" x2="${x}" y2="${n(y - 14)}" stroke="#F4F1E6" stroke-width="1.2"/>`; if (i % 3 === 0) kemer += `<circle cx="${x}" cy="${n(y - 17)}" r="1.8" fill="#F4F1E6"/>`; }
      const kopru = `<path d="M170 196Q326 80 482 196" fill="none" stroke="#F4F1E6" stroke-width="5"/><path d="M170 190Q326 66 482 190" fill="none" stroke="#F4F1E6" stroke-width="2.4"/>${kemer}<path d="M156 198h340" stroke="#CFCBBB" stroke-width="5"/>${[170, 482].map(x => `<rect x="${x - 7}" y="176" width="14" height="24" fill="#EDE9DB"/><circle cx="${x}" cy="170" r="5" fill="#FFE3A0"/>`).join("")}`;
      return { defs: gok("gk", [[0, "#6F8FA3"], [.55, "#B8CBC8"], [1, "#EAD9B8"]]) + gok("sv", [[0, "#6E8F7C"], [1, "#1F3B3C"]]) + parilti("gun", "#FFF2CE"),
        ciz: `<rect width="${W}" height="${H}" fill="url(#gk)"/><circle cx="430" cy="66" r="110" fill="url(#gun)"/>${bulut(60, 34, 240, "#F3F2EA", .75)}${bulut(370, 46, 220, "#FBFAF2", .6)}${bulut(210, 70, 170, "#E7E8DF", .5)}
          ${kubbe}<g id="anit"><g opacity=".97">${evler}</g><rect y="${yer}" width="${W}" height="4" fill="#3A332D"/>${kopru}</g>${su(yer + 4, "sv", "#EAF3E4", 42)}${yansima("anit", yer + 4)}` };
    },
    TOR() {
      // Gece: CN Tower, Rogers Centre, Ontario Gölü
      const yer = 226, cx = 230;
      const kule = `<linearGradient id="beton" x1="0" x2="1"><stop offset="0" stop-color="#C9D3DE"/><stop offset=".5" stop-color="#8E9CAD"/><stop offset="1" stop-color="#4C5A6D"/></linearGradient>
        <path d="M${cx - 15} ${yer}L${cx - 4} 92H${cx + 4}L${cx + 15} ${yer}z" fill="url(#beton)"/><path d="M${cx - 24} ${yer}L${cx - 6} 138L${cx - 3} 138L${cx - 9} ${yer}zM${cx + 24} ${yer}L${cx + 6} 138L${cx + 3} 138L${cx + 9} ${yer}z" fill="#6D7B8E"/>
        <path d="M${cx - 2.5} 92V40h5v52z" fill="#A9B5C3"/><path d="M${cx - 1} 40L${cx} 6L${cx + 1} 40z" fill="#D5DDE6"/><circle cx="${cx}" cy="8" r="2" fill="#FF6E6E"/>
        <ellipse cx="${cx}" cy="92" rx="23" ry="9" fill="url(#beton)"/><rect x="${cx - 23}" y="83" width="46" height="9" fill="url(#beton)"/><ellipse cx="${cx}" cy="83" rx="23" ry="6" fill="#B8C3D0"/>
        ${[-18, -12, -6, 0, 6, 12, 18].map(d => `<rect x="${cx + d - 1.4}" y="85" width="2.8" height="5" fill="#FFE29A"/>`).join("")}<ellipse cx="${cx}" cy="58" rx="9" ry="3.6" fill="#A9B5C3"/>
        ${Array.from({ length: 12 }, (_, i) => `<rect x="${cx - 1 - i * .55}" y="${100 + i * 10}" width="${2 + i * 1.1}" height="1" fill="#FFD27A" opacity=".55"/>`).join("")}`;
      const kubbe = `<path d="M320 ${yer}V198Q384 158 448 198V${yer}z" fill="#39475C"/><path d="M320 198Q384 158 448 198" fill="none" stroke="#C5D2E0" stroke-width="2"/>${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${336 + i * 16} ${yer}V${n(198 - 34 * (1 - ((i - 3) / 4.2) ** 2))}" stroke="#55657C" stroke-width="1"/>`).join("")}`;
      const yildiz = Array.from({ length: 70 }, () => `<circle cx="${n(r() * W)}" cy="${n(r() * 120)}" r="${n(.4 + r() * .7)}" fill="#FFFFFF" opacity="${n(.3 + r() * .6)}"/>`).join("");
      return { defs: gok("gk", [[0, "#0B1A3A"], [.62, "#1E3E6E"], [.88, "#3F6A8F"], [1, "#E08A5F"]]) + gok("sv", [[0, "#2C3F60"], [1, "#050D1F"]]) + parilti("ay", "#EAF0FF"),
        ciz: `<rect width="${W}" height="${H}" fill="url(#gk)"/>${yildiz}<circle cx="530" cy="52" r="60" fill="url(#ay)"/><circle cx="530" cy="52" r="15" fill="#F2F5FF"/>
          <g opacity=".6">${sehir(0, W, yer, 40, 120, 16, 34, "#2A3E5F", "#FFD98A", .12)}</g><g id="anit"><g>${sehir(0, W, yer, 26, 88, 18, 36, "#142440", "#FFD98A", .36)}</g>${kule}${kubbe}${sehir(470, W, yer, 30, 100, 20, 34, "#0F1C33", "#FFD98A", .4)}</g>${su(yer, "sv", "#FFD98A", 40)}${yansima("anit", yer)}` };
    },
    EDI() {
      // Alacakaranlıkta kaya üstünde Edinburgh Kalesi
      const kaya = `M0 ${H}V236L70 226L140 198L196 178L236 142L262 134L420 128L452 150L488 186L560 216L640 232V${H}z`;
      const catlak = Array.from({ length: 40 }, () => { const x = 170 + r() * 320, y = 150 + r() * 60; return `<path d="M${n(x)} ${n(y)}l${n(-7 + r() * 14)} ${n(14 + r() * 24)}l${n(-6 + r() * 12)} ${n(10 + r() * 24)}" fill="none" stroke="#4A4560" stroke-width="${n(1.5 + r() * 3)}" stroke-linecap="round" opacity="${n(.12 + r() * .18)}"/>`; }).join("");
      const dis = (x, y, g, h, c) => { let d = `<rect x="${x}" y="${y}" width="${g}" height="${h}" fill="${c}"/>`; for (let i = 0; i < g; i += 7) d += `<rect x="${x + i}" y="${y - 4}" width="4" height="5" fill="${c}"/>`; return d; };
      const pencere = (x, y, g, h) => Array.from({ length: Math.floor(g / 11) }, (_, i) => `<path d="M${x + 5 + i * 11} ${y + h}v-${h - 3}l2-3 2 3v${h - 3}z" fill="#F7C873" opacity="${n(.5 + r() * .5)}"/>`).join("");
      const kale = dis(246, 110, 186, 30, "#3B3650") + pencere(246, 118, 186, 13) + dis(262, 78, 58, 34, "#454059") + pencere(262, 86, 58, 13) + dis(344, 66, 64, 46, "#3F3A54") + pencere(344, 76, 64, 13) + pencere(344, 96, 64, 11)
        + `<path d="M344 66l10-14 10 14zM388 66l10-14 10 14z" fill="#2A2740"/><rect x="314" y="52" width="16" height="60" fill="#4B4560"/><path d="M314 52l8-16 8 16z" fill="#2F2B45"/><rect x="321" y="16" width="1.4" height="22" fill="#2A2740"/><path d="M322 18l14 4-14 5z" fill="#3B6EA8"/>` + dis(226, 134, 44, 22, "#37334B") + dis(420, 130, 40, 26, "#37334B");
      const tepe = `<path d="M0 214Q100 170 190 200T360 190T640 176V${H}H0z" fill="#3B3B5B" opacity=".55"/><path d="M430 200L500 150L546 128L590 160L640 150V${H}H430z" fill="#2E2F4D" opacity=".7"/>`;
      const sehirIsik = Array.from({ length: 90 }, () => `<rect x="${n(r() * W)}" y="${n(236 + r() * 40)}" width="2" height="2.4" fill="#FFD48A" opacity="${n(.35 + r() * .6)}"/>`).join("");
      return { defs: gok("gk", [[0, "#1F2146"], [.48, "#4F3F72"], [.76, "#B56A78"], [1, "#F2A977"]]) + gok("kaya", [[0, "#3A3550"], [1, "#14141F"]]) + parilti("gun", "#FFC790"),
        ciz: `<rect width="${W}" height="${H}" fill="url(#gk)"/><circle cx="120" cy="196" r="120" fill="url(#gun)"/>${bulut(350, 50, 240, "#D18C8C", .3)}${bulut(40, 90, 220, "#E39A85", .28)}${tepe}<path d="${kaya}" fill="url(#kaya)"/>${catlak}${kale}${sehirIsik}` };
    },
    LAX() {
      // Gün batımı: Hollywood yazısı, palmiye sırası, alçak şehir
      const palm = (x, y, h, o) => { let c = `<path d="M${x - 2 * o} ${y}Q${x + 1} ${y - h * .5} ${x} ${y - h}h${2.4 * o}Q${x + 4} ${y - h * .5} ${x + 3 * o} ${y}z" fill="#15112A"/>`; for (const [dx, dy] of [[-24, 5], [-20, -8], [-11, -14], [2, -16], [13, -12], [22, -6], [25, 6], [-14, 12], [15, 12]]) c += `<path d="M${x + 1} ${y - h}Q${n(x + dx * o * .55)} ${n(y - h + dy * o - 4 * o)} ${n(x + dx * o)} ${n(y - h + dy * o + 6 * o)}Q${n(x + dx * o * .45)} ${n(y - h + dy * o * .6)} ${x + 1} ${y - h}z" fill="#15112A"/>`; return c; };
      const harf = (t, x, y) => `<text x="${x}" y="${y}" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="30" fill="#FFF8E6" stroke="#6E4A5C" stroke-width=".6" transform="translate(${x * .0} 0) skewX(-3)">${t}</text>`;
      const tepe1 = `M0 170Q70 118 150 136T300 104T430 128T640 96V238H0z`, tepe2 = `M0 196Q110 158 240 188T470 168T640 178V238H0z`;
      const cali = Array.from({ length: 80 }, () => { const x = r() * W, y = 150 + r() * 70; return `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(3 + r() * 7)}" ry="${n(1.5 + r() * 3)}" fill="#2E2A4A" opacity="${n(.25 + r() * .3)}"/>`; }).join("");
      const ev = sehir(0, W, 240, 8, 34, 16, 42, "#241C3C", "#FFD08A", .3);
      const yol = `<path d="M0 ${H}V240H${W}V${H}z" fill="#12102A"/>` + Array.from({ length: 34 }, (_, i) => `<rect x="${i * 19 + 4}" y="256" width="9" height="1.6" fill="#E4C27C" opacity=".6"/>`).join("") + Array.from({ length: 26 }, () => `<circle cx="${n(r() * W)}" cy="${n(247 + r() * 5)}" r="1.1" fill="#FF8870"/>`).join("");
      return { defs: gok("gk", [[0, "#3B2B6E"], [.36, "#C4507F"], [.62, "#FB8B57"], [.86, "#FFCF7A"], [1, "#FFE3A8"]]) + parilti("gun", "#FFE7A8"),
        ciz: `<rect width="${W}" height="${H}" fill="url(#gk)"/><circle cx="500" cy="168" r="120" fill="url(#gun)"/><circle cx="500" cy="168" r="30" fill="#FFF3C4"/>${bulut(30, 62, 280, "#FFB28F", .35)}${bulut(330, 84, 240, "#FF9A85", .3)}
          <path d="${tepe1}" fill="#5B3D6C"/>${cali}<g transform="translate(150 96) rotate(-3)">${"HOLLYWOOD".split("").map((h, i) => harf(h, i * 34, 40 + (i % 2) * 2)).join("")}</g><path d="${tepe2}" fill="#3A2B55"/>${ev}${yol}
          ${[[34, 252, 150, 1.1], [92, 254, 120, .85], [566, 252, 170, 1.2], [612, 254, 124, .85], [510, 254, 96, .7], [140, 254, 86, .6]].map(p => palm(...p)).join("")}` };
    },
    CHI() {
      // Sabah: Willis Tower, gökdelenler, göl kıyısı ve yansıyan "Cloud Gate"
      const yer = 216, cx = 372;
      const kat = (x, y, g, h) => `<rect x="${x}" y="${y}" width="${g}" height="${h}" fill="url(#cam)"/>`;
      const willis = kat(cx - 34, 88, 68, yer - 88) + kat(cx - 34, 60, 46, 28) + kat(cx - 12, 36, 34, 52) + kat(cx - 24, 16, 22, 24)
        + `<rect x="${cx - 17}" y="-6" width="2" height="22" fill="#1B2533"/><rect x="${cx - 10}" y="-6" width="2" height="22" fill="#1B2533"/>`
        + Array.from({ length: 14 }, (_, i) => `<rect x="${cx - 34}" y="${60 + i * 12}" width="68" height="1" fill="#0D1520" opacity=".5"/>`).join("") + Array.from({ length: 6 }, (_, i) => `<rect x="${cx - 34 + i * 13.6}" y="88" width="1" height="${yer - 88}" fill="#0D1520" opacity=".35"/>`).join("");
      const hancock = `<path d="M170 ${yer}L184 58H224L238 ${yer}z" fill="#2A3545"/><rect x="194" y="30" width="2" height="30" fill="#2A3545"/><rect x="212" y="30" width="2" height="30" fill="#2A3545"/>` + Array.from({ length: 5 }, (_, i) => `<path d="M${176 + i} ${yer - i * 30}L${232 - i} ${yer - 30 - i * 30}M${232 - i} ${yer - i * 30}L${176 + i} ${yer - 30 - i * 30}" stroke="#596A7E" stroke-width="1.3"/>`).join("");
      const fasulye = `<linearGradient id="krom" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E8F2FA"/><stop offset=".42" stop-color="#7E96AC"/><stop offset=".6" stop-color="#2C3B4E"/><stop offset=".78" stop-color="#C4D2DE"/><stop offset="1" stop-color="#6C7E90"/></linearGradient>
        <path d="M34 262Q30 224 76 218Q104 210 136 218Q176 224 172 262Q150 248 103 250Q56 248 34 262z" fill="url(#krom)"/>`;
      return { defs: gok("gk", [[0, "#3C7DB8"], [.62, "#A7D2E6"], [1, "#FBE3C0"]]) + gok("cam", [[0, "#3C4A5E"], [1, "#16202D"]]) + gok("sv", [[0, "#5CA2BE"], [1, "#16506C"]]) + parilti("gun", "#FFF3CF"),
        ciz: `<rect width="${W}" height="${H}" fill="url(#gk)"/><circle cx="560" cy="60" r="100" fill="url(#gun)"/>${bulut(50, 38, 230, "#FFFFFF", .6)}${bulut(420, 90, 170, "#FFFFFF", .4)}
          <g opacity=".5">${sehir(0, W, yer, 50, 150, 18, 36, "#6C8BA6", "#E9F6FB", .14)}</g>
          <g id="anit">${sehir(0, W, yer, 40, 118, 20, 38, "#3C4D62", "#FFE7A8", .22)}${hancock}${willis}${sehir(430, W, yer, 34, 96, 22, 38, "#26323F", "#FFE7A8", .28)}${sehir(0, 170, yer, 24, 76, 22, 38, "#26323F", "#FFE7A8", .28)}</g>
          ${su(yer, "sv", "#EAF9FF", 40)}${yansima("anit", yer)}<path d="M0 ${H}V258H220Q210 268 240 ${H}z" fill="#BFAE93"/>${fasulye}` };
    },
    BOS() {
      // Sonbahar: tuğla sıra evler, Zakim köprüsü
      const yer = 236;
      const kule = x => `<path d="M${x - 9} ${yer - 40}L${x - 4} 34H${x + 4}L${x + 9} ${yer - 40}z" fill="#E7EDF2"/><path d="M${x - 2} 34L${x} 14L${x + 2} 34z" fill="#CFD8DF"/><rect x="${x - 10}" y="${yer - 90}" width="20" height="4" fill="#BFCAD2"/>`;
      const halat = Array.from({ length: 11 }, (_, i) => [260 + i * 16, 470 - i * 16].map((x2, s) => `<line x1="${s ? 490 : 240}" y1="${48 + i * 4}" x2="${s ? 490 + 18 + i * 16 : 240 - 18 - i * 16}" y2="146" stroke="#EEF3F6" stroke-width=".9"/><line x1="${s ? 490 : 240}" y1="${48 + i * 4}" x2="${s ? 490 - 18 - i * 16 : 240 + 18 + i * 16}" y2="146" stroke="#F7FAFB" stroke-width=".9"/>`).join("")).join("");
      const kopru = `${halat}<rect y="146" width="${W}" height="5" fill="#D8E0E6"/>${kule(240)}${kule(490)}`;
      let evler = "";
      for (let x = -4, i = 0; x < W; i++) {
        const g = 56 + r() * 16, h = 64 + r() * 24, y = yer - h, c = ["#8C3F2E", "#7A3627", "#9B4A36", "#83402F"][i % 4];
        evler += `<rect x="${n(x)}" y="${n(y)}" width="${n(g)}" height="${n(h)}" fill="${c}"/><rect x="${n(x)}" y="${n(y - 6)}" width="${n(g)}" height="6" fill="#2A2523"/><rect x="${n(x + g - 13)}" y="${n(y - 16)}" width="9" height="10" fill="#54332A"/>`;
        for (let wy = y + 8; wy < yer - 22; wy += 18) for (let wx = x + 7; wx < x + g - 10; wx += 15) evler += `<rect x="${n(wx - 1)}" y="${n(wy - 1)}" width="10" height="14" fill="#E6DCC8"/><rect x="${n(wx)}" y="${n(wy)}" width="8" height="12" fill="${r() > .5 ? "#F8D88C" : "#3D4A58"}"/>`;
        evler += `<path d="M${n(x + g / 2 - 7)} ${yer}v-15a7 7 0 0 1 14 0v15z" fill="#1F2A24"/><rect x="${n(x + g / 2 - 12)}" y="${yer - 4}" width="24" height="4" fill="#B9AFA0"/>`;
        x += g + .6;
      }
      const agac = (x, y, R, c) => `<rect x="${x - 3}" y="${y}" width="6" height="${H - y}" fill="#2F211B"/>` + Array.from({ length: 22 }, () => `<circle cx="${n(x + (r() - .5) * R * 2)}" cy="${n(y + (r() - .6) * R * 1.4)}" r="${n(R * .22 + r() * R * .22)}" fill="${c[Math.floor(r() * c.length)]}"/>`).join("");
      const son = ["#D9742B", "#E9A030", "#C8492B", "#F0BE4B", "#A83C26"];
      return { defs: gok("gk", [[0, "#5D93BE"], [.6, "#BBD8DF"], [1, "#FBE7C5"]]) + parilti("gun", "#FFF2CC"),
        ciz: `<rect width="${W}" height="${H}" fill="url(#gk)"/><circle cx="110" cy="46" r="90" fill="url(#gun)"/>${bulut(300, 30, 230, "#FFFFFF", .65)}${bulut(40, 88, 150, "#FFFFFF", .4)}
          <g opacity=".5">${sehir(0, W, 200, 40, 118, 18, 36, "#7C9AB3", "#F2F7F8", .14)}</g>${kopru}${evler}<rect y="${yer}" width="${W}" height="${H - yer}" fill="#4B4640"/><rect y="${yer + 8}" width="${W}" height="2" fill="#8D8678"/>
          ${agac(70, 226, 42, son)}${agac(330, 232, 36, son)}${agac(580, 222, 46, son)}` };
    },
    MEL() {
      // Akşam: Flinders Street İstasyonu ve tramvay
      const yer = 232, san = "#E3B447", koyu = "#B6803A";
      const kemerler = (x0, x1, y, g, h) => { let c = ""; for (let x = x0; x < x1; x += g + 5) c += `<path d="M${x} ${y + h}v-${h - g / 2}a${g / 2} ${g / 2} 0 0 1 ${g} 0v${h - g / 2}z" fill="#FFD98E" opacity="${n(.6 + r() * .4)}"/>`; return c; };
      const bina = `<rect x="0" y="108" width="${W}" height="${yer - 108}" fill="${san}"/><rect y="104" width="${W}" height="6" fill="${koyu}"/><rect y="158" width="${W}" height="4" fill="${koyu}"/><rect y="200" width="${W}" height="5" fill="${koyu}"/>
        ${kemerler(6, 240, 116, 16, 34)}${kemerler(400, W, 116, 16, 34)}${kemerler(6, 240, 168, 18, 28)}${kemerler(400, W, 168, 18, 28)}
        <rect x="244" y="74" width="152" height="${yer - 74}" fill="#EDC465"/><path d="M252 74A68 68 0 0 1 388 74z" fill="#3F8F7C"/><path d="M252 74A68 68 0 0 1 388 74" fill="none" stroke="#2C6B5C" stroke-width="2"/>
        ${[-48, -24, 0, 24, 48].map(d => `<path d="M320 8Q${320 + d} 34 ${320 + d * 1.35} 74" fill="none" stroke="#2C6B5C" stroke-width="1.2"/>`).join("")}<rect x="316" y="-2" width="8" height="10" fill="#E3B447"/>
        <path d="M264 ${yer}v-68a56 56 0 0 1 112 0v68z" fill="#6A3E23"/><path d="M272 ${yer}v-68a48 48 0 0 1 96 0v68z" fill="#FFD98E" opacity=".82"/>
        ${[286, 306, 334, 354].map(x => `<circle cx="${x}" cy="92" r="9" fill="#FFF7DD" stroke="#5A3B20" stroke-width="1.6"/><path d="M${x} 92v-6M${x} 92l4 3" stroke="#2F2010" stroke-width="1.2"/>`).join("")}
        ${[0, 244, 396, 628].map(x => `<rect x="${x}" y="64" width="12" height="${yer - 64}" fill="#CFA240"/><path d="M${x - 2} 64a8 10 0 0 1 16 0z" fill="#3F8F7C"/>`).join("")}`;
      const tramvay = `<g transform="translate(66 200)"><rect width="224" height="50" rx="9" fill="#2E8F4E"/><rect y="28" width="224" height="11" fill="#F6F1D8"/><rect x="0" y="39" width="224" height="11" rx="4" fill="#1E6135"/>${Array.from({ length: 8 }, (_, i) => `<rect x="${10 + i * 26}" y="7" width="20" height="18" rx="2" fill="#FFE7A3"/>`).join("")}<rect x="104" y="-14" width="2" height="14" fill="#1A1A22"/><path d="M90 -22L120 -14" stroke="#1A1A22" stroke-width="1.6"/><circle cx="40" cy="52" r="6" fill="#111"/><circle cx="184" cy="52" r="6" fill="#111"/><circle cx="218" cy="42" r="3" fill="#FFF2B0"/></g>`;
      const raylar = `<rect y="${yer}" width="${W}" height="${H - yer}" fill="#2E2C33"/><path d="M0 256H640M0 266H640" stroke="#6B6A73" stroke-width="1.2"/>` + Array.from({ length: 14 }, () => `<rect x="${n(r() * W)}" y="${n(238 + r() * 34)}" width="${n(10 + r() * 30)}" height="1.4" fill="#FFD98E" opacity=".28"/>`).join("");
      return { defs: gok("gk", [[0, "#26325F"], [.5, "#7D5A8E"], [.82, "#F09A72"], [1, "#FBC988"]]) + parilti("gun", "#FFD9A0"),
        ciz: `<rect width="${W}" height="${H}" fill="url(#gk)"/><circle cx="510" cy="90" r="110" fill="url(#gun)"/>${bulut(20, 32, 220, "#EDA58E", .35)}${bulut(420, 44, 200, "#F4B79A", .3)}<g opacity=".55">${sehir(0, W, 108, 16, 56, 16, 34, "#3D3F6E", "#FFDFA0", .22)}</g>${bina}${raylar}${tramvay}` };
    },
    GLA() {
      // Yağmurlu Clyde: Finnieston Vinci, Armadillo, Hydro
      const yer = 206;
      const vinc = `<g fill="#1E2730">${Array.from({ length: 2 }, (_, i) => `<path d="M${470 + i * 50} ${yer}L${478 + i * 34} 76h6L${476 + i * 50} ${yer}z"/>`).join("")}<rect x="380" y="58" width="240" height="11"/><rect x="476" y="36" width="44" height="22"/><rect x="396" y="69" width="6" height="52"/><rect x="380" y="121" width="38" height="16"/></g>
        ${Array.from({ length: 22 }, (_, i) => `<path d="M${384 + i * 10.6} 69l5 -11" stroke="#44525F" stroke-width="1"/>`).join("")}${Array.from({ length: 7 }, (_, i) => `<path d="M${480 - i * .4} ${88 + i * 17}h${38 - i * .3}" stroke="#44525F" stroke-width="1.2"/>`).join("")}`;
      const kabuk = (x, g, h, c) => `<path d="M${x} ${yer}Q${x + g * .15} ${yer - h} ${x + g} ${yer - h * .4}L${x + g} ${yer}z" fill="${c}"/><path d="M${x + g * .1} ${yer}Q${x + g * .25} ${yer - h * .86} ${x + g} ${yer - h * .4}" fill="none" stroke="#7E8D99" stroke-width="1"/>`;
      const armadillo = [0, 1, 2, 3, 4, 5, 6, 7].map(i => kabuk(100 + i * 24, 110 - i * 8, 86 - i * 7, ["#C7D1D9", "#B9C5CE", "#ABB8C2"][i % 3])).join("");
      const hydro = `<ellipse cx="300" cy="${yer - 18}" rx="56" ry="26" fill="#5A7D9A"/><ellipse cx="300" cy="${yer - 24}" rx="44" ry="17" fill="#79A2C2" opacity=".6"/>${[-30, -14, 0, 14, 30].map(d => `<path d="M${300 + d} ${yer - 43}Q${300 + d * 1.5} ${yer - 18} ${300 + d} ${yer}" stroke="#3E5C75" stroke-width="1" fill="none"/>`).join("")}`;
      const yagmur = Array.from({ length: 150 }, () => { const x = r() * W, y = r() * H, b = 8 + r() * 12; return `<line x1="${n(x)}" y1="${n(y)}" x2="${n(x - b * .25)}" y2="${n(y + b)}" stroke="#DCE6EC" stroke-width=".7" opacity="${n(.16 + r() * .3)}"/>`; }).join("");
      return { defs: gok("gk", [[0, "#4C5966"], [.6, "#8A99A4"], [1, "#C6CEC8"]]) + gok("sv", [[0, "#6B7D88"], [1, "#212D36"]]),
        ciz: `<rect width="${W}" height="${H}" fill="url(#gk)"/>${bulut(0, 32, 300, "#5D6A77", .75)}${bulut(260, 22, 340, "#566370", .8)}${bulut(120, 60, 280, "#6C7986", .5)}${bulut(420, 74, 240, "#6F7C89", .45)}
          <g opacity=".55">${sehir(0, W, yer, 26, 98, 18, 34, "#65747F", "#FFE4A8", .18)}</g><g id="anit">${sehir(0, W, yer, 16, 52, 22, 42, "#39454F", "#FFE0A0", .3)}${hydro}${armadillo}${vinc}</g><rect y="${yer}" width="${W}" height="3" fill="#2B343C"/>${su(yer + 3, "sv", "#DCE6EA", 44)}${yansima("anit", yer + 3)}${yagmur}` };
    },
    YVR() {
      // Karlı dağlar, cam kuleler, Canada Place yelkenleri, deniz uçağı
      const yer = 214;
      const dag = (d, c) => `<path d="${d}" fill="${c}"/>`;
      const uzak = "M0 150L70 96L118 118L190 58L250 106L320 44L392 104L470 62L540 112L600 80L640 104V214H0z";
      const kar = "M190 58L168 76L182 74L192 88L204 72L218 80zM320 44L296 66L312 62L322 78L336 62L350 72zM470 62L450 78L464 76L474 90L486 74L500 82zM70 96L54 110L68 108L76 118L86 106z";
      const orta = "M0 180L90 138L170 164L270 126L370 166L470 134L560 168L640 146V214H0z";
      const yelken = `<g transform="translate(70 0)">${[0, 26, 52, 78, 104].map((d, i) => `<path d="M${d} ${yer - 12}L${d + 15} ${yer - 62 + (i % 2) * 8}L${d + 28} ${yer - 12}z" fill="${i % 2 ? "#E4ECF1" : "#FFFFFF"}"/><path d="M${d + 15} ${yer - 62 + (i % 2) * 8}L${d + 28} ${yer - 12}L${d + 19} ${yer - 12}z" fill="#BFCFD9"/>`).join("")}<rect x="-14" y="${yer - 14}" width="160" height="14" fill="#7E6F60"/><rect x="-14" y="${yer - 18}" width="160" height="4" fill="#C6B9A8"/></g>`;
      const ucak = `<g transform="translate(430 ${yer + 18})"><path d="M0 0Q30 -9 62 -3l10 -11 4 13q-30 9 -68 3z" fill="#FFFFFF"/><rect x="12" y="-14" width="44" height="3" fill="#C8352E"/><rect x="33" y="-12" width="1.5" height="9" fill="#333"/><path d="M6 7h56" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/><path d="M18 2v4M46 2v4" stroke="#555" stroke-width="1.2"/></g>`;
      const orman = Array.from({ length: 130 }, () => { const x = r() * W, y = 160 + r() * 44, h = 6 + r() * 11; return `<path d="M${n(x)} ${n(y)}l${n(h * .35)} ${n(h)}h${n(-h * .7)}z" fill="#14473F" opacity="${n(.45 + r() * .5)}"/>`; }).join("");
      return { defs: gok("gk", [[0, "#2A6FA8"], [.65, "#99CEE3"], [1, "#EEF1D9"]]) + gok("sv", [[0, "#4A99B0"], [1, "#0D3B57"]]) + gok("kule", [[0, "#7FAFC8"], [1, "#2F5D74"]]) + parilti("gun", "#FFF6D8"),
        ciz: `<rect width="${W}" height="${H}" fill="url(#gk)"/><circle cx="90" cy="48" r="90" fill="url(#gun)"/>${bulut(380, 26, 220, "#FFFFFF", .6)}${dag(uzak, "#5F7E97")}${dag(kar, "#F4F8FB")}${dag(orta, "#2B5E58")}${orman}
          <g id="anit">${sehir(200, W, yer, 44, 118, 18, 30, "url(#kule)", "#E8F6FB", .3)}${yelken}</g>${su(yer, "sv", "#F0FBFF", 40)}${yansima("anit", yer)}${ucak}` };
    },
    AKL() {
      // Sky Tower, liman köprüsü, yelkenliler, Rangitoto volkanı
      const yer = 212, cx = 250;
      const kule = `<linearGradient id="beton" x1="0" x2="1"><stop offset="0" stop-color="#EBF0F3"/><stop offset=".55" stop-color="#AEBBC4"/><stop offset="1" stop-color="#6E7D88"/></linearGradient>
        <rect x="${cx - 10}" y="84" width="20" height="${yer - 84}" fill="url(#beton)"/><path d="M${cx - 18} 92L${cx - 20} 64H${cx + 20}L${cx + 18} 92z" fill="url(#beton)"/><rect x="${cx - 21}" y="70" width="42" height="9" fill="#27424F"/>${[-16, -8, 0, 8, 16].map(d => `<rect x="${cx + d - 1.6}" y="72" width="3.2" height="5" fill="#BEE3F0"/>`).join("")}
        <path d="M${cx - 12} 64L${cx - 7} 48H${cx + 7}L${cx + 12} 64z" fill="#8F9EA9"/><path d="M${cx - 2} 48L${cx} 2L${cx + 2} 48z" fill="#C7D1D8"/>${[-1, 1].map(s => `<rect x="${cx + s * 12 - 2}" y="104" width="4" height="${yer - 104}" fill="#94A4AE"/>`).join("")}`;
      const kopru = (() => { let k = `<rect x="350" y="150" width="290" height="5" fill="#5D6B76"/><path d="M430 150Q510 92 590 150" fill="none" stroke="#5D6B76" stroke-width="4"/>`; for (let i = 0; i <= 16; i++) { const x = 430 + i * 10, y = 150 - 58 * (1 - ((i - 8) / 8) ** 2); k += `<line x1="${x}" y1="${n(y)}" x2="${x}" y2="150" stroke="#6E7D88" stroke-width="1"/>`; if (i < 16) k += `<line x1="${x}" y1="${n(y)}" x2="${x + 10}" y2="150" stroke="#83919B" stroke-width=".7"/>`; } [370, 430, 590].forEach(x => { k += `<rect x="${x - 4}" y="150" width="8" height="${yer - 150}" fill="#808F9A"/>`; }); return k; })();
      const volkan = `<path d="M330 ${yer}Q420 158 482 150Q510 146 538 150Q600 158 640 186V${yer}z" fill="#527E74" opacity=".78"/><path d="M482 150Q510 146 538 150L524 158L496 158z" fill="#45695F" opacity=".7"/>`;
      const yelkenli = (x, y, o, c) => `<g transform="translate(${x} ${y}) scale(${o})"><path d="M2 -46L2 -2L30 -2z" fill="#FFFFFF"/><path d="M0 -40L0 -2L-18 -2z" fill="${c}"/><path d="M-20 0H34L26 9H-14z" fill="#1E3A4A"/><rect x="0" y="-48" width="1.4" height="48" fill="#2E3A44"/></g>`;
      return { defs: gok("gk", [[0, "#1E7FB0"], [.62, "#8FD3DD"], [1, "#F4EBC6"]]) + gok("sv", [[0, "#2E9EB0"], [1, "#0A4664"]]) + parilti("gun", "#FFF8D8"),
        ciz: `<rect width="${W}" height="${H}" fill="url(#gk)"/><circle cx="540" cy="46" r="100" fill="url(#gun)"/>${bulut(30, 40, 250, "#FFFFFF", .75)}${bulut(330, 70, 180, "#FFFFFF", .5)}${volkan}
          <g id="anit"><g opacity=".65">${sehir(60, 400, yer, 28, 94, 16, 30, "#7AA3B5", "#F0FAFD", .16)}</g>${sehir(0, 370, yer, 18, 66, 18, 34, "#3B6072", "#FFF3C4", .25)}${kule}${kopru}</g>${su(yer, "sv", "#EFFCFF", 44)}${yansima("anit", yer)}${yelkenli(90, 246, 1, "#E7553F")}${yelkenli(190, 258, .8, "#F3B13D")}${yelkenli(390, 244, .95, "#3F88C5")}${yelkenli(540, 262, 1.15, "#FFFFFF")}` };
    },
  };
  if (!Object.hasOwn(CIZIM, kod)) return "";
  const c = CIZIM[kod]();
  return `<svg class="city-art" viewBox="0 0 ${W} ${H}" role="img" aria-label="${ad} manzarası"><defs>${c.defs}</defs>${c.ciz}</svg>`;
}
