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
  };
  if (!Object.hasOwn(CIZIM, kod)) return "";
  const c = CIZIM[kod]();
  return `<svg class="city-art" viewBox="0 0 ${W} ${H}" role="img" aria-label="${ad} manzarası"><defs>${c.defs}</defs>${c.ciz}</svg>`;
}
