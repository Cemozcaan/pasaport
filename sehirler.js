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

  // Ortak sahne kurucu: gökyüzü, güneş/ay, bulutlar, arka plan, yansıyan anıt, su, ön plan
  function sahne(o) {
    const y = o.yer;
    return {
      defs: gok("gk", o.g) + (o.su ? gok("sv", [[0, o.su[0]], [1, o.su[1]]]) : "") + (o.gun ? parilti("gun", o.gun[3]) : "") + (o.defs || ""),
      ciz: `<rect width="${W}" height="${H}" fill="url(#gk)"/>${o.ust || ""}${o.gun ? `<circle cx="${o.gun[0]}" cy="${o.gun[1]}" r="${o.gun[2]}" fill="url(#gun)"/>${o.gun[4] ? `<circle cx="${o.gun[0]}" cy="${o.gun[1]}" r="${o.gun[4]}" fill="${o.gun[5] || "#FFF4C8"}"/>` : ""}` : ""}${(o.bulut || []).map(b => bulut(...b)).join("")}${o.arka || ""}<g id="anit">${o.anit || ""}</g>${o.su ? su(y, "sv", o.suCizgi || "#FFFFFF", o.suAdet || 36) + yansima("anit", y) : ""}${o.on || ""}`,
    };
  }
  const yildizlar = (adet, yMax) => Array.from({ length: adet }, () => `<circle cx="${n(r() * W)}" cy="${n(r() * yMax)}" r="${n(.4 + r() * .8)}" fill="#FFFFFF" opacity="${n(.3 + r() * .6)}"/>`).join("");
  const dagB = (d, c, o) => `<path d="${d}" fill="${c}"${o ? ` opacity="${o}"` : ""}/>`;
  const pencereler = (x, y, g, h, ax, ay, c, oran) => { let s = ""; for (let wy = y; wy < y + h; wy += ay) for (let wx = x; wx < x + g; wx += ax) if (r() < oran) s += `<rect x="${n(wx)}" y="${n(wy)}" width="${n(ax * .55)}" height="${n(ay * .6)}" fill="${c}" opacity="${n(.55 + r() * .45)}"/>`; return s; };
  const siperler = (x, y, g, c, a = 7) => { let s = ""; for (let i = 0; i < g; i += a) s += `<rect x="${x + i}" y="${y - 4}" width="${a * .58}" height="5" fill="${c}"/>`; return s; };
  const agacKume = (x, y, R, renk) => Array.from({ length: 16 }, () => `<circle cx="${n(x + (r() - .5) * R * 2)}" cy="${n(y + (r() - .6) * R * 1.3)}" r="${n(R * .24 + r() * R * .24)}" fill="${renk[Math.floor(r() * renk.length)]}"/>`).join("");
  const palmS = (x, y, h, o, c) => { let s = `<path d="M${x - 2 * o} ${y}Q${x + 1} ${n(y - h * .5)} ${x} ${y - h}h${n(2.4 * o)}Q${x + 4} ${n(y - h * .5)} ${n(x + 3 * o)} ${y}z" fill="${c}"/>`; for (const [dx, dy] of [[-24, 5], [-20, -8], [-11, -14], [2, -16], [13, -12], [22, -6], [25, 6], [-14, 12], [15, 12]]) s += `<path d="M${x + 1} ${y - h}Q${n(x + dx * o * .55)} ${n(y - h + dy * o - 4 * o)} ${n(x + dx * o)} ${n(y - h + dy * o + 6 * o)}Q${n(x + dx * o * .45)} ${n(y - h + dy * o * .6)} ${x + 1} ${y - h}z" fill="${c}"/>`; return s; };
  const saatY = (x, y, R) => `<circle cx="${x}" cy="${y}" r="${R}" fill="#FFF3CC" stroke="#3B2C18" stroke-width="1.4"/><path d="M${x} ${y}V${n(y - R * .75)}M${x} ${y}L${n(x + R * .5)} ${n(y + R * .2)}" stroke="#2A1F0D" stroke-width="1.2" stroke-linecap="round"/>`;
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
    BRS() {
      // Clifton asma köprüsü, yeşil boğaz, sıcak hava balonu
      const k = x => `<path d="M${x - 11} 150V70h22v80z" fill="#B7A78B"/><path d="M${x - 5} 150V92a5 7 0 0 1 10 0v58z" fill="#6E8B6C"/><rect x="${x - 13}" y="66" width="26" height="6" fill="#8F8069"/>`;
      let ask = ""; for (let i = 1; i < 30; i++) { const x = 170 + i * 10, y = 70 + 76 * (1 - ((i - 15) / 15) ** 2); ask += `<line x1="${x}" y1="${n(y)}" x2="${x}" y2="146" stroke="#3B3A3F" stroke-width=".7"/>`; }
      return sahne({ yer: 240, g: [[0, "#6FA8D0"], [.6, "#C5E0E2"], [1, "#F5E6C0"]], su: ["#7B9A7C", "#2E4A48"], gun: [80, 50, 90, "#FFF6D2"], bulut: [[300, 40, 220, "#FFFFFF", .7]],
        ust: `<g transform="translate(520 70)"><path d="M-26 0a26 30 0 0 1 52 0c0 14-16 26-20 34h-12c-4-8-20-20-20-34z" fill="#D9503F"/><path d="M-9 -29c-8 10-8 50-3 63h6M9 -29c8 10 8 50 3 63h-6" fill="#F0C14B"/><rect x="-6" y="38" width="12" height="8" fill="#6A4A30"/></g>`,
        arka: `${dagB("M0 240V120Q60 130 120 150L180 240z", "#3E6E48")}${dagB("M640 240V112Q580 124 520 150L470 240z", "#3A6644")}${Array.from({ length: 70 }, () => { const s = r() > .5, x = s ? r() * 170 : 480 + r() * 160; return `<circle cx="${n(x)}" cy="${n(150 + r() * 80)}" r="${n(5 + r() * 8)}" fill="${["#4E8353", "#5F9860", "#3F6F48"][Math.floor(r() * 3)]}"/>`; }).join("")}`,
        anit: `<path d="M170 70Q320 222 470 70" fill="none" stroke="#3B3A3F" stroke-width="2.6"/>${ask}<rect x="0" y="146" width="${W}" height="6" fill="#4E4B50"/>${k(170)}${k(470)}` });
    },
    SEA() {
      const cx = 200, igne = `<path d="M${cx - 10} 240L${cx - 4} 92h8L${cx + 10} 240z" fill="#C8D2DA"/><path d="M${cx - 18} 240L${cx - 3} 100M${cx + 18} 240L${cx + 3} 100" stroke="#8E9CA9" stroke-width="3"/>
        <ellipse cx="${cx}" cy="88" rx="40" ry="9" fill="#E4EBF0"/><ellipse cx="${cx}" cy="80" rx="30" ry="7" fill="#F2A23C"/><rect x="${cx - 26}" y="80" width="52" height="7" fill="#33495C"/>${[-20, -10, 0, 10, 20].map(d => `<rect x="${cx + d - 2}" y="81" width="4" height="4" fill="#FFE29A"/>`).join("")}<path d="M${cx - 12} 74L${cx} 60L${cx + 12} 74z" fill="#E4EBF0"/><path d="M${cx - 1} 60L${cx} 18L${cx + 1} 60z" fill="#C8D2DA"/>`;
      return sahne({ yer: 240, g: [[0, "#2C5F8A"], [.6, "#E8A58A"], [1, "#FBD9A5"]], su: ["#6C8BA0", "#123148"], suCizgi: "#FFDDA8", gun: [120, 170, 100, "#FFE4AE"],
        arka: `${dagB("M300 240L410 118L470 70L500 56L540 84L600 150L640 180V240z", "#6B7E97")}${dagB("M470 70L500 56L540 84L525 96L510 86L492 100L478 86z", "#F6F8FB")}${dagB("M0 240Q100 196 240 216T640 208V240z", "#32506A", .8)}`,
        anit: `<g opacity=".9">${sehir(240, W, 240, 30, 92, 16, 32, "#2F4861", "#FFD98A", .3)}</g>${sehir(0, 170, 240, 16, 50, 18, 34, "#1F3347", "#FFD98A", .25)}${igne}` });
    },
    SIN() {
      // Marina Bay Sands: üç kule ve gemi çatı, gece mavisi
      const kule = x => `<path d="M${x} 216L${x + 8} 66h34L${x + 44} 216z" fill="#7C8FA6"/><path d="M${x + 20} 216L${x + 24} 66h18L${x + 44} 216z" fill="#5A6B82"/>${pencereler(x + 8, 74, 30, 138, 4, 5, "#FFE9B0", .48)}`;
      return sahne({ yer: 216, g: [[0, "#121B47"], [.6, "#4E2F78"], [.85, "#C5507F"], [1, "#F59A6B"]], su: ["#4D3B73", "#0B0F2E"], suCizgi: "#FFC98A", suAdet: 44, ust: yildizlar(40, 90),
        arka: `<g opacity=".65">${sehir(0, 240, 216, 40, 130, 16, 30, "#3A3567", "#FFD98A", .22)}${sehir(440, W, 216, 40, 120, 16, 30, "#3A3567", "#FFD98A", .22)}</g>`,
        anit: `${kule(240)}${kule(298)}${kule(356)}<path d="M214 62Q320 50 430 64L442 52L446 62L430 72Q320 62 218 70z" fill="#D5DFE9"/><path d="M60 216Q70 170 100 180Q90 150 130 168Q140 150 160 176Q190 170 190 216z" fill="#E7E3EF"/><path d="M84 216Q94 184 112 190M120 216Q126 176 140 186M152 216Q158 186 172 194" stroke="#8F88A8" stroke-width="1" fill="none"/>${sehir(450, W, 216, 20, 66, 18, 34, "#16173D", "#FFD98A", .36)}`,
        on: Array.from({ length: 6 }, (_, i) => `<path d="M${n(290 + i * 12)} 56l-${60 - i * 8} -56" stroke="#7FE6FF" stroke-width="1" opacity=".3"/>`).join("") });
    },
    DEL() {
      // India Gate, sis, kırmızı kumtaşı
      const cx = 320;
      const kapi = `<rect x="${cx - 70}" y="96" width="140" height="150" fill="#C9A987"/><rect x="${cx - 76}" y="88" width="152" height="10" fill="#D8BC99"/><rect x="${cx - 62}" y="72" width="124" height="16" fill="#BE9D7B"/><path d="M${cx - 40} 72Q${cx} 46 ${cx + 40} 72z" fill="#AD8C6B"/><rect x="${cx - 74}" y="238" width="148" height="10" fill="#A8866A"/>
        <path d="M${cx - 34} 246V146a34 34 0 0 1 68 0v100z" fill="#4C3A34"/><path d="M${cx - 26} 246V148a26 26 0 0 1 52 0v98z" fill="#F4C78A" opacity=".55"/><path d="M${cx - 62} 246V190a10 12 0 0 1 20 0v56zM${cx + 42} 246V190a10 12 0 0 1 20 0v56z" fill="#6A5146"/>
        ${[-56, -36, -16, 4, 24, 44].map(d => `<rect x="${cx + d}" y="106" width="12" height="4" fill="#A8866A"/>`).join("")}<rect x="${cx - 8}" y="52" width="16" height="6" fill="#8A6C52"/><ellipse cx="${cx}" cy="50" rx="7" ry="3" fill="#FFB95C" opacity=".9"/>`;
      const agaclar = [60, 130, 210, 430, 510, 590].map(x => agacKume(x, 214, 28, ["#6F8F58", "#587A48", "#7F9A62"])).join("");
      return sahne({ yer: 246, g: [[0, "#C47E5C"], [.42, "#EBA777"], [.78, "#F7D29C"], [1, "#FBE6C0"]], gun: [120, 90, 96, "#FFF0C4", 22], bulut: [[360, 60, 240, "#FBDDB6", .35]],
        arka: `${agaclar}<rect y="228" width="${W}" height="60" fill="#F7E2BC" opacity=".3"/>`, anit: kapi,
        on: `<rect y="246" width="${W}" height="34" fill="#8E7E62"/><path d="M${cx - 80} 280L${cx - 40} 246H${cx + 40}L${cx + 80} 280z" fill="#C7B79A"/>` });
    },
    MIA() {
      // Ocean Drive: pastel art deco oteller, palmiyeler, kumsal
      const ot = (x, g, h, c, s) => `<rect x="${x}" y="${206 - h}" width="${g}" height="${h}" fill="${c}"/><rect x="${x + g * .42}" y="${200 - h}" width="${g * .16}" height="8" fill="${s}"/><path d="M${x + g * .46} ${200 - h}v-14h${g * .08}v14z" fill="${s}"/>${Array.from({ length: Math.floor(h / 22) }, (_, i) => `<rect x="${x}" y="${212 - h + i * 22}" width="${g}" height="2.5" fill="${s}"/>${pencereler(x + 8, 216 - h + i * 22, g - 14, 12, 12, 16, "#3C5C72", .85)}`).join("")}<rect x="${x + g * .25}" y="186" width="${g * .5}" height="4" fill="${s}"/><rect x="${x + g * .35}" y="190" width="${g * .3}" height="16" fill="#2E4A5A"/>`;
      return sahne({ yer: 228, g: [[0, "#2E8BC0"], [.65, "#8ED5DE"], [1, "#FFE3C4"]], gun: [570, 42, 84, "#FFF9D8", 18], bulut: [[60, 40, 240, "#FFFFFF", .75]],
        anit: `${ot(10, 96, 84, "#F7B9C4", "#3FB6B2")}${ot(112, 82, 116, "#BDE4D7", "#F08A7A")}${ot(200, 110, 72, "#FFE29A", "#E0746B")}${ot(316, 90, 106, "#C8C2EE", "#3FB6B2")}${ot(412, 104, 88, "#F5A6A6", "#FFF3D2")}${ot(522, 112, 110, "#A8E0E6", "#F07F91")}<rect y="206" width="${W}" height="22" fill="#E3D6B6"/><rect y="206" width="${W}" height="3" fill="#8A7E68"/>`,
        on: `<rect y="228" width="${W}" height="20" fill="#F3DFAF"/><rect y="244" width="${W}" height="36" fill="#2CA4B4"/>${Array.from({ length: 12 }, (_, i) => `<path d="M${n(r() * 560)} ${250 + i * 2.4}q40 -4 90 0" stroke="#FFFFFF" fill="none" opacity=".55"/>`).join("")}${[[50, 246, 150, 1], [186, 248, 110, .8], [470, 248, 130, .9], [610, 246, 164, 1.05]].map(p => palmS(...p, "#1D4A3B")).join("")}<g transform="translate(300 232)"><path d="M0 0a18 8 0 0 1 36 0z" fill="#E7553F"/><rect x="17" y="0" width="1.6" height="12" fill="#6A4A30"/></g>` });
    },
    CWL() {
      // Galler: kale surları, stadyum direkleri, kırmızı ejder bayrağı
      const stad = `<path d="M330 214Q470 150 620 214z" fill="#D6DEE5"/><path d="M350 214Q470 164 600 214" stroke="#8A97A3" fill="none"/>${[372, 568, 410, 530].map((x, i) => `<path d="M${x} 214L${x + (i % 2 ? -6 : 6)} ${i < 2 ? 112 : 136}" stroke="#E9EDF1" stroke-width="4"/><path d="M${x - 14} ${i < 2 ? 116 : 140}L${x + 14} ${i < 2 ? 106 : 130}" stroke="#E9EDF1" stroke-width="2"/>`).join("")}`;
      const kale = `<rect x="20" y="150" width="280" height="64" fill="#A99F8E"/>${siperler(20, 150, 280, "#A99F8E", 9)}<rect x="52" y="100" width="56" height="114" fill="#B7AD9B"/>${siperler(52, 100, 56, "#B7AD9B")}<rect x="176" y="84" width="66" height="130" fill="#BDB3A1"/>${siperler(176, 84, 66, "#BDB3A1")}<path d="M176 84l33-28 33 28z" fill="#5C6B73"/><rect x="208" y="14" width="1.6" height="44" fill="#333"/><path d="M210 16h36v22h-36z" fill="#F4F4F0"/><path d="M210 27h36v11h-36z" fill="#3F8F4E"/><path d="M216 32q8-10 14-4t10-2q-2 8-8 8t-16-2z" fill="#C8352E"/>${pencereler(190, 100, 40, 90, 14, 22, "#2C2A30", 1)}${pencereler(62, 118, 36, 70, 14, 22, "#2C2A30", 1)}<path d="M130 214v-30a16 16 0 0 1 32 0v30z" fill="#3B3A3A"/>`;
      return sahne({ yer: 214, g: [[0, "#5D7E9E"], [.62, "#B7CED6"], [1, "#EEE7CC"]], su: ["#6D8A8C", "#20394A"], gun: [470, 46, 90, "#FFF6D2"], bulut: [[30, 40, 200, "#F5F6F2", .8], [340, 30, 250, "#E9ECE9", .7]],
        arka: `${dagB("M0 214Q160 150 300 180T640 160V214z", "#6C8B6C", .8)}`, anit: `${stad}${sehir(290, 340, 214, 20, 50, 14, 22, "#6B7A82", "#FFE7A8", .3)}${kale}` });
    },
    PER() {
      // Swan Nehri, cam çan kulesi, kara kuğular
      const can = `<path d="M90 214V120Q96 62 122 26Q148 62 154 120V214z" fill="#7FC4D8"/><path d="M122 26Q148 62 154 120V214H122z" fill="#5AA0B8"/>${[60, 90, 120, 150, 180].map(y => `<path d="M${y < 100 ? 110 : 92} ${y}H${y < 100 ? 134 : 152}" stroke="#D4EEF4" stroke-width="1"/>`).join("")}${[-16, 0, 16].map(d => `<path d="M${122 + d} 34V214" stroke="#D4EEF4" stroke-width=".7" opacity=".7"/>`).join("")}<rect x="84" y="196" width="76" height="18" fill="#D7C9AD"/>${pencereler(94, 150, 54, 36, 11, 14, "#FFEAB2", .6)}`;
      const kugu = (x, y, o) => `<g transform="translate(${x} ${y}) scale(${o})"><path d="M-22 0Q-20 -14 6 -12Q22 -12 24 -2Q10 8 -8 6z" fill="#14161C"/><path d="M20 -6Q32 -22 24 -34Q18 -40 12 -34" fill="none" stroke="#14161C" stroke-width="4" stroke-linecap="round"/><path d="M12 -34L4 -32" stroke="#D4372E" stroke-width="3" stroke-linecap="round"/></g>`;
      return sahne({ yer: 214, g: [[0, "#2A87B8"], [.62, "#A0D9E4"], [1, "#FFEAC2"]], su: ["#3EA4BC", "#0D4D68"], gun: [520, 48, 92, "#FFF9D8", 20], bulut: [[220, 54, 180, "#FFFFFF", .55]],
        arka: `<g opacity=".65">${sehir(180, W, 214, 34, 136, 18, 34, "#6FA4BA", "#EEF8FB", .2)}</g>`, anit: `${sehir(170, W, 214, 22, 88, 20, 38, "#35586C", "#FFF0C0", .3)}${can}`,
        on: `${kugu(180, 250, 1.2)}${kugu(300, 262, .9)}${kugu(420, 244, .75)}` });
    },
    YOW() {
      // Parlamento Tepesi: Barış Kulesi, yeşil çatı, nehir
      const cx = 320, kule = `<rect x="${cx - 22}" y="58" width="44" height="148" fill="#BDB09B"/><path d="M${cx - 22} 58L${cx - 14} 26H${cx + 14}L${cx + 22} 58z" fill="#5F9184"/><rect x="${cx - 1}" y="2" width="2" height="26" fill="#333"/><path d="M${cx + 1} 4h20v12h-20z" fill="#D5332F"/><path d="M${cx + 7} 4h8v12h-8z" fill="#FFFFFF"/>${saatY(cx, 74, 12)}<path d="M${cx - 12} 140v-30a12 14 0 0 1 24 0v30z" fill="#7E8B8E"/>${[-18, 12].map(d => `<rect x="${cx + d}" y="96" width="6" height="96" fill="#A69983"/>`).join("")}`;
      const bina = `<rect x="80" y="130" width="480" height="76" fill="#C4B7A1"/><path d="M80 130L100 108H540L560 130z" fill="#5F9184"/>${Array.from({ length: 9 }, (_, i) => `<path d="M${112 + i * 50} 108l6-18 6 18z" fill="#4C7B6F"/>`).join("")}${pencereler(92, 142, 456, 54, 14, 26, "#46514F", .9)}<path d="M60 206V110l10-18 10 18v96zM560 206V110l10-18 10 18v96z" fill="#AEA08A"/>`;
      return sahne({ yer: 222, g: [[0, "#3C6E9E"], [.6, "#BBD4DC"], [1, "#F4E4C0"]], su: ["#6A92A4", "#183B55"], gun: [120, 48, 90, "#FFF7D4"], bulut: [[350, 34, 240, "#FFFFFF", .7]],
        anit: `${bina}${kule}${dagB("M0 222V206Q110 192 320 200T640 202V222z", "#3E6E48")}${Array.from({ length: 34 }, () => `<circle cx="${n(r() * W)}" cy="${n(198 + r() * 18)}" r="${n(5 + r() * 7)}" fill="${["#E58A2E", "#D0512C", "#E9B93F", "#55803F"][Math.floor(r() * 4)]}"/>`).join("")}` });
    },
    LPL() {
      // Üç Güzeller: Royal Liver Building, liver kuşları, Mersey
      const liver = `<rect x="330" y="86" width="210" height="130" fill="#B7B0A0"/>${pencereler(340, 96, 190, 112, 11, 16, "#3F4A52", .86)}${[350, 490].map(x => `<rect x="${x}" y="46" width="40" height="44" fill="#A39C8C"/>${saatY(x + 20, 66, 13)}<path d="M${x + 2} 46Q${x + 20} 12 ${x + 38} 46z" fill="#5C9385"/><rect x="${x + 19}" y="18" width="2" height="8" fill="#2A2A2A"/><path d="M${x + 12} 18q4-8 8-3q4-5 8 3l-8 3z" fill="#2F6E60"/>`).join("")}`;
      const cunard = `<rect x="200" y="124" width="120" height="92" fill="#C2BBAA"/>${pencereler(208, 132, 104, 76, 11, 14, "#3F4A52", .85)}`;
      const dock = `<rect x="70" y="118" width="120" height="98" fill="#AAA392"/><path d="M104 118Q130 76 156 118z" fill="#5C9385"/>${pencereler(78, 126, 104, 82, 11, 14, "#3F4A52", .8)}`;
      return sahne({ yer: 216, g: [[0, "#374565"], [.55, "#9C8CA0"], [.85, "#E8B28C"], [1, "#F7D3A0"]], su: ["#7B7A8C", "#1A2238"], suCizgi: "#FFDEB0", gun: [600, 150, 96, "#FFDCA0"],
        arka: `<g opacity=".5">${sehir(0, W, 216, 30, 110, 18, 34, "#5B607C", "#FFE0A8", .15)}</g>`, anit: `${dock}${cunard}${liver}${sehir(545, W, 216, 24, 70, 20, 36, "#39405A", "#FFE0A8", .3)}`,
        on: `<g transform="translate(100 244)"><path d="M0 0H100L88 14H10z" fill="#ECE7D8"/><rect x="24" y="-12" width="52" height="12" fill="#E7DFCB"/><rect x="44" y="-26" width="12" height="14" fill="#D5332F"/></g>` });
    },
    ATL() {
      // Bank of America kulesi (altın tepe), dönme dolap, şeftali gün batımı
      const cx = 400, boa = `<path d="M${cx - 26} 232V70H${cx + 26}V232z" fill="#2C3048"/><path d="M${cx - 22} 70L${cx - 12} 40H${cx + 12}L${cx + 22} 70z" fill="#E0A83C"/><path d="M${cx - 12} 40L${cx} 20L${cx + 12} 40z" fill="#F2C65F"/><rect x="${cx - 1}" y="2" width="2" height="18" fill="#E0A83C"/>${pencereler(cx - 22, 76, 44, 150, 7, 7, "#FFE0A0", .5)}`;
      let cark = ""; for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8; cark += `<line x1="150" y1="170" x2="${n(150 + Math.cos(a) * 52)}" y2="${n(170 + Math.sin(a) * 52)}" stroke="#EDEFF3" stroke-width=".8"/><rect x="${n(146 + Math.cos(a) * 52)}" y="${n(167 + Math.sin(a) * 52)}" width="8" height="7" rx="2" fill="${["#E7553F", "#F2C65F", "#3F88C5"][i % 3]}"/>`; }
      return sahne({ yer: 232, g: [[0, "#3A3268"], [.5, "#C2577F"], [.8, "#F9976A"], [1, "#FFCF8C"]], su: ["#6F4B6E", "#17132E"], suCizgi: "#FFC890", gun: [270, 180, 100, "#FFDCA0", 24],
        arka: `<g opacity=".55">${sehir(0, W, 232, 40, 130, 18, 34, "#5A3F75", "#FFD98A", .15)}</g>`,
        anit: `${sehir(220, W, 232, 34, 114, 20, 38, "#2C2748", "#FFD98A", .32)}${boa}<circle cx="150" cy="170" r="52" fill="none" stroke="#EDEFF3" stroke-width="2.4"/>${cark}<path d="M150 170L116 232M150 170L184 232" stroke="#D5D9E2" stroke-width="3"/>${agacKume(40, 214, 34, ["#2F4A3D", "#264036"])}${agacKume(240, 216, 26, ["#2F4A3D", "#264036"])}` });
    },
    BFS() {
      // Titanic Belfast (yıldız gövde), sarı Samson ve Goliath vinçleri
      const vinc = (x, o) => `<g transform="translate(${x} 0) scale(${o} 1)"><rect x="-4" y="32" width="150" height="22" fill="#F0C330"/><path d="M0 54L12 214h12L14 54zM130 54L120 214h-12L116 54z" fill="#F0C330"/><path d="M12 150h108" stroke="#D9AC22" stroke-width="5"/>${Array.from({ length: 10 }, (_, i) => `<path d="M${6 + i * 14} 54v-22" stroke="#C39A1D" stroke-width="1"/>`).join("")}<text x="72" y="49" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="12" fill="#2B2B2B">H&amp;W</text></g>`;
      const titanik = `<path d="M90 214L60 112L150 150L180 92L240 150L270 96L300 214z" fill="#A9B8C4"/><path d="M60 112L150 150L180 92L150 214zM240 150L270 96L300 214z" fill="#7F93A3"/>${Array.from({ length: 22 }, (_, i) => `<path d="M${70 + i * 10} 214L${70 + i * 10} 110" stroke="#5E7283" stroke-width=".6" opacity=".6"/>`).join("")}`;
      return sahne({ yer: 214, g: [[0, "#465A70"], [.6, "#AFC2CB"], [1, "#E8E5D2"]], su: ["#6A8796", "#16303F"], bulut: [[60, 40, 260, "#E6EAEC", .85], [360, 26, 260, "#D4DBDF", .85]],
        arka: dagB("M0 214Q120 136 280 168T640 122V214z", "#5E7A72", .75), anit: `${sehir(300, 640, 214, 14, 44, 18, 34, "#54666F", "#FFE3A8", .25)}${vinc(350, 1.1)}${vinc(380, .75)}${titanik}` });
    },
    WLG() {
      // Kırmızı teleferik, tepelerdeki renkli evler, liman
      const evler = Array.from({ length: 120 }, () => { const x = r() * W, y = 90 + r() * 110, g = 8 + r() * 10; return `<g><rect x="${n(x)}" y="${n(y)}" width="${n(g)}" height="${n(g * .7)}" fill="${["#F4EEDF", "#E0815D", "#83B2C4", "#F2C65F", "#EDE1CD", "#C95C4C"][Math.floor(r() * 6)]}"/><path d="M${n(x - 1)} ${n(y)}l${n(g * .55)} -5l${n(g * .55)} 5z" fill="#5C4A44"/></g>`; }).join("");
      const teleferik = `<path d="M0 214L640 56" stroke="#2F2A28" stroke-width="2"/><g transform="translate(340 136) rotate(-14)"><rect x="-58" y="0" width="116" height="44" rx="6" fill="#C9302C"/><rect x="-58" y="28" width="116" height="16" fill="#8E1F1E"/>${[-46, -22, 2, 26].map(d => `<rect x="${d}" y="7" width="18" height="16" fill="#FDECC0"/>`).join("")}<rect x="-1" y="-10" width="2" height="10" fill="#222"/></g>`;
      return sahne({ yer: 226, g: [[0, "#2C8CBA"], [.65, "#ABDDE4"], [1, "#FCEEC7"]], su: ["#2E9FB3", "#0B4A66"], gun: [86, 44, 84, "#FFF9D8", 18], bulut: [[360, 32, 220, "#FFFFFF", .75]],
        arka: `${dagB("M0 226V96Q100 58 240 86T470 66T640 96V226z", "#4D8A62")}${evler}${Array.from({ length: 44 }, () => `<circle cx="${n(r() * W)}" cy="${n(92 + r() * 118)}" r="${n(4 + r() * 6)}" fill="#3A7350" opacity=".85"/>`).join("")}`,
        anit: `${sehir(30, 240, 226, 12, 40, 18, 30, "#35586C", "#FFF0C0", .3)}`, on: teleferik });
    },
    DEN() {
      // Rocky Dağları, altın kubbeli meclis binası
      const cx = 320, bina = `<rect x="160" y="150" width="320" height="66" fill="#D9CFBC"/>${pencereler(170, 160, 300, 48, 14, 24, "#5A5F68", .9)}<path d="M${cx - 60} 150L${cx} 124L${cx + 60} 150z" fill="#C7BCA7"/><rect x="${cx - 40}" y="150" width="80" height="66" fill="#E4DAC6"/>${[-30, -14, 2, 18].map(d => `<rect x="${cx + d}" y="154" width="6" height="58" fill="#BDB29D"/>`).join("")}<rect x="${cx - 28}" y="86" width="56" height="42" fill="#D9CFBC"/>${[-22, -8, 6, 18].map(d => `<rect x="${cx + d}" y="90" width="4" height="34" fill="#A99E89"/>`).join("")}<path d="M${cx - 26} 86Q${cx} 32 ${cx + 26} 86z" fill="#EFC24B"/><path d="M${cx} 40Q${cx + 22} 58 ${cx + 26} 86H${cx}z" fill="#C8972F"/><rect x="${cx - 2}" y="22" width="4" height="18" fill="#EFC24B"/>`;
      return sahne({ yer: 236, g: [[0, "#2C6BA5"], [.65, "#ABD5EA"], [1, "#FFE9C7"]], gun: [540, 46, 86, "#FFF8D2", 18], bulut: [[60, 34, 220, "#FFFFFF", .7]],
        arka: `${dagB("M0 196L80 120L130 148L220 62L280 118L360 50L440 120L510 80L580 130L640 104V236H0z", "#6E7E9A")}${dagB("M220 62L196 88L212 84L224 100L238 82L256 94zM360 50L332 80L350 76L364 96L380 76L398 88zM510 80L492 96L506 94L516 106L528 92L540 100zM80 120L64 134L76 132L86 144L98 130z", "#F6F9FC")}${dagB("M0 216Q200 170 340 196T640 180V236H0z", "#3C5F4C")}`,
        anit: `${agacKume(90, 206, 40, ["#4A7A4E", "#3D6C46", "#E0A83C"])}${agacKume(556, 206, 40, ["#4A7A4E", "#3D6C46", "#E0A83C"])}${bina}`, on: `<rect y="216" width="${W}" height="64" fill="#7CA85E"/><path d="M270 280L300 216H340L370 280z" fill="#D5C8AE"/>` });
    },
    JNB() {
      // Hillbrow Kulesi, Nelson Mandela Köprüsü, altın gün batımı
      const cx = 470, kule = `<rect x="${cx - 7}" y="58" width="14" height="178" fill="#B4AAA1"/><rect x="${cx - 16}" y="62" width="32" height="18" fill="#6C7079"/><rect x="${cx - 14}" y="84" width="28" height="10" fill="#E4DDD2"/>${pencereler(cx - 13, 65, 26, 14, 5, 7, "#FFE9B0", .8)}<rect x="${cx - 1}" y="12" width="2" height="46" fill="#D5332F"/><rect x="${cx - 4}" y="40" width="8" height="4" fill="#E4DDD2"/>`;
      let ask = ""; [[150, 60], [300, 60]].forEach(([x]) => { for (let i = 1; i <= 7; i++) { ask += `<line x1="${x}" y1="${50 + i * 10}" x2="${x - i * 17}" y2="186" stroke="#F0EEE8" stroke-width=".9"/><line x1="${x}" y1="${50 + i * 10}" x2="${x + i * 17}" y2="186" stroke="#F0EEE8" stroke-width=".9"/>`; } });
      return sahne({ yer: 236, g: [[0, "#3A2F5E"], [.45, "#B8527A"], [.78, "#F5935C"], [1, "#FFD07E"]], gun: [90, 176, 100, "#FFDFA0", 26], bulut: [[320, 54, 240, "#F8A98A", .32]],
        arka: `<g opacity=".55">${sehir(0, W, 236, 30, 120, 20, 40, "#5B4070", "#FFD98A", .16)}</g>`, anit: `${sehir(0, W, 236, 22, 90, 22, 42, "#2A2345", "#FFD98A", .3)}${kule}${ask}<rect x="10" y="186" width="430" height="5" fill="#E8E5DE"/>${[150, 300].map(x => `<path d="M${x - 5} 236L${x - 2} 46h4L${x + 5} 236z" fill="#E8E5DE"/>`).join("")}`,
        on: `<rect y="236" width="${W}" height="44" fill="#1A1630"/>${Array.from({ length: 30 }, () => `<circle cx="${n(r() * W)}" cy="${n(240 + r() * 34)}" r="1.1" fill="#FFCC80" opacity=".8"/>`).join("")}` });
    },
    HOU() {
      // Uzay merkezi: dev roket, kule, ışık hüzmeleri; arkada şehir
      const cx = 430, roket = `<linearGradient id="rk" x1="0" x2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#AFB9C5"/></linearGradient><path d="M${cx - 15} 240V96H${cx + 15}V240z" fill="url(#rk)"/><path d="M${cx - 15} 96L${cx - 10} 70H${cx + 10}L${cx + 15} 96z" fill="url(#rk)"/><path d="M${cx - 10} 70L${cx - 6} 42H${cx + 6}L${cx + 10} 70z" fill="#E6EAEE"/><path d="M${cx - 6} 42L${cx} 12L${cx + 6} 42z" fill="#D5332F"/><rect x="${cx - 15}" y="146" width="30" height="16" fill="#1F2733"/><rect x="${cx - 15}" y="200" width="30" height="12" fill="#1F2733"/><path d="M${cx - 15} 240L${cx - 30} 256V240zM${cx + 15} 240L${cx + 30} 256V240z" fill="#2F3947"/><rect x="${cx - 4}" y="110" width="8" height="26" fill="#1E5FA8"/>`;
      const kule = `<rect x="470" y="50" width="26" height="206" fill="none" stroke="#C9553A" stroke-width="3"/>${Array.from({ length: 12 }, (_, i) => `<path d="M470 ${50 + i * 17}l26 17m0 -17l-26 17" stroke="#C9553A" stroke-width="1"/>`).join("")}<rect x="447" y="100" width="24" height="4" fill="#C9553A"/>`;
      return sahne({ yer: 256, g: [[0, "#0D1538"], [.6, "#243C74"], [.86, "#7A5A86"], [1, "#E9976A"]], ust: yildizlar(90, 170), gun: [120, 56, 60, "#EDF2FF", 13, "#F4F6FF"],
        arka: `${[-40, 40].map(d => `<path d="M${cx + d * .3} 256L${cx + d * 4} 0H${cx + d * 2.8}z" fill="#BFD8FF" opacity=".09"/>`).join("")}<g opacity=".9">${sehir(0, 340, 256, 30, 120, 20, 34, "#1C2950", "#FFD98A", .3)}</g>`, anit: `${kule}${roket}`,
        on: `<rect y="256" width="${W}" height="24" fill="#121A33"/><path d="M0 256H${W}" stroke="#4A5A7C"/>` });
    },
    LBA() {
      // Leeds Belediye Binası: kubbeli saat kulesi, taş cephe, aslan heykeli
      const cx = 320, bina = `<rect x="120" y="124" width="400" height="104" fill="#BCA887"/><rect x="112" y="118" width="416" height="8" fill="#A69273"/>${Array.from({ length: 21 }, (_, i) => `<rect x="${126 + i * 19}" y="130" width="10" height="84" fill="#A18D6E"/>`).join("")}${pencereler(137, 138, 380, 70, 19, 26, "#3F3B38", .95)}<rect x="104" y="220" width="432" height="8" fill="#8F7D60"/><rect x="${cx - 28}" y="68" width="56" height="56" fill="#C1AD8C"/>${saatY(cx, 96, 14)}${[[cx - 28], [cx + 22]].map(([x]) => `<rect x="${x}" y="68" width="6" height="56" fill="#A69273"/>`).join("")}<path d="M${cx - 24} 68Q${cx - 24} 40 ${cx} 34Q${cx + 24} 40 ${cx + 24} 68z" fill="#5C6C71"/><path d="M${cx} 34V8" stroke="#3F4A4E" stroke-width="2.4"/><circle cx="${cx}" cy="8" r="2.4" fill="#E0B44A"/>`;
      const merdiven = Array.from({ length: 5 }, (_, i) => `<rect x="${200 - i * 16}" y="${228 + i * 6}" width="${240 + i * 32}" height="6" fill="${i % 2 ? "#A69273" : "#B7A382"}"/>`).join("");
      const aslan = x => `<g transform="translate(${x} 214)"><rect x="-16" y="0" width="32" height="14" fill="#8F7D60"/><path d="M-14 0Q-14 -14 2 -14Q4 -24 12 -22Q18 -18 16 -8L14 0z" fill="#E7DCC4"/></g>`;
      return sahne({ yer: 258, g: [[0, "#4B6484"], [.6, "#BBC9CF"], [1, "#EEE3C8"]], gun: [120, 48, 80, "#FFF5D0"], bulut: [[300, 36, 260, "#EEF0EE", .7]],
        arka: `<g opacity=".5">${sehir(0, W, 200, 30, 120, 20, 38, "#7C8A96", "#FFEAB0", .12)}</g>`, anit: `${bina}${merdiven}${aslan(150)}${aslan(490)}`, on: `<rect y="258" width="${W}" height="22" fill="#6E665A"/>` });
    },
    DFW() {
      // Reunion Tower: ışıklı küre, Bank of America silueti, gece
      const cx = 210, top = `<rect x="${cx - 4}" y="88" width="8" height="150" fill="#6E7788"/><rect x="${cx - 12}" y="92" width="4" height="146" fill="#8A93A4"/><rect x="${cx + 8}" y="92" width="4" height="146" fill="#8A93A4"/><circle cx="${cx}" cy="62" r="30" fill="#172040"/>`;
      let isik = ""; for (let i = -6; i <= 6; i++) for (let j = -6; j <= 6; j++) if (i * i + j * j <= 34) isik += `<circle cx="${cx + i * 4.6}" cy="${62 + j * 4.6}" r="1.5" fill="${(i + j) % 2 ? "#FFE29A" : "#8FD6FF"}"/>`;
      const zigzag = x => `<path d="M${x} 238V70L${x + 22} 44L${x + 44} 70V238z" fill="#1F2A4A"/><path d="M${x} 70L${x + 22} 44L${x + 44} 70" fill="none" stroke="#53E0B6" stroke-width="2"/><path d="M${x + 1} 238V70M${x + 43} 238V70" stroke="#53E0B6" stroke-width="1.2"/>${pencereler(x + 5, 78, 34, 150, 6, 7, "#FFE29A", .42)}`;
      return sahne({ yer: 238, g: [[0, "#0E1433"], [.62, "#2B2A68"], [.88, "#8C4A82"], [1, "#E58A6C"]], su: ["#3E2F60", "#090C22"], suCizgi: "#9CCFFF", suAdet: 44, ust: yildizlar(60, 110),
        arka: `<g opacity=".65">${sehir(0, W, 238, 40, 124, 20, 36, "#2A2F60", "#FFD98A", .16)}</g>`, anit: `${sehir(0, W, 238, 26, 88, 22, 40, "#141A3B", "#FFD98A", .34)}${zigzag(350)}${top}${isik}` });
    },
    PHL() {
      // Belediye Sarayı kulesi ve Penn heykeli, Özgürlük Çanı
      const cx = 200, kule = `<rect x="${cx - 30}" y="86" width="60" height="150" fill="#D5C9B0"/>${pencereler(cx - 24, 118, 48, 110, 12, 18, "#54575E", .9)}<rect x="${cx - 34}" y="84" width="68" height="4" fill="#B8AB92"/>${saatY(cx, 104, 13)}<path d="M${cx - 24} 84L${cx - 18} 54H${cx + 18}L${cx + 24} 84z" fill="#C1B59C"/><path d="M${cx - 14} 54Q${cx} 26 ${cx + 14} 54z" fill="#7C8A7E"/><path d="M${cx - 3} 30V12L${cx} 4L${cx + 3} 12V30z" fill="#5E5238"/><circle cx="${cx}" cy="4" r="2.4" fill="#5E5238"/><rect x="60" y="154" width="280" height="82" fill="#C7BBA2"/>${pencereler(68, 164, 264, 64, 14, 22, "#54575E", .9)}`;
      const can = `<g transform="translate(486 150)"><path d="M0 0Q-8 0 -12 18Q-14 40 -38 62H38Q14 40 12 18Q8 0 0 0z" fill="#8A6A3C"/><path d="M0 0Q8 0 12 18Q14 40 38 62H4Q10 30 0 0z" fill="#6A4F2A"/><rect x="-8" y="-12" width="16" height="12" fill="#3E2F1C"/><path d="M-30 62H30V66H-30z" fill="#5A4426"/><path d="M6 28l-6 12 5 6-4 16" stroke="#2A1E10" stroke-width="1.8" fill="none"/></g><rect x="432" y="216" width="108" height="10" fill="#6A4F2A"/>`;
      return sahne({ yer: 236, g: [[0, "#3A6AA0"], [.62, "#B5D4E2"], [1, "#FBE7C5"]], gun: [590, 48, 80, "#FFF7D2"], bulut: [[300, 40, 230, "#FFFFFF", .7]],
        arka: `<g opacity=".55">${sehir(260, W, 236, 40, 130, 20, 34, "#7E97AE", "#F4F8FA", .14)}</g>${sehir(330, 640, 236, 20, 66, 22, 38, "#BB6F52", "#FFEAB0", .25)}`, anit: `${kule}${can}`,
        on: `<rect y="236" width="${W}" height="44" fill="#6E6A60"/><rect y="244" width="${W}" height="2" fill="#A7A192"/>` });
    },
    MAN() {
      // Kanal, kırmızı tuğla fabrikalar, Beetham kulesi
      const fab = (x, g, h) => `<rect x="${x}" y="${222 - h}" width="${g}" height="${h}" fill="#8E3F2F"/><rect x="${x}" y="${222 - h}" width="${g}" height="4" fill="#5A2820"/>${pencereler(x + 7, 230 - h, g - 12, h - 18, 13, 16, "#3C3838", .95)}`;
      const baca = x => `<path d="M${x - 8} 222L${x - 5} 60h10L${x + 8} 222z" fill="#6E3226"/><rect x="${x - 7}" y="58" width="14" height="5" fill="#3F211A"/>`;
      const kopru = `<path d="M210 222V196A70 70 0 0 1 350 196V222H380V186H180V222z" fill="#6A3024"/><path d="M180 186H380" stroke="#3F211A" stroke-width="3"/>${[192, 368].map(x => `<rect x="${x - 2}" y="168" width="4" height="18" fill="#2F2C2C"/><circle cx="${x}" cy="166" r="4" fill="#FFD98A"/>`).join("")}`;
      const beetham = `<path d="M540 222V40l28 0v182z" fill="#7F93A5"/><path d="M554 40h14v182h-14z" fill="#5C6E80"/>${pencereler(544, 46, 24, 170, 6, 7, "#D9E8F2", .6)}`;
      return sahne({ yer: 222, g: [[0, "#4A5668"], [.6, "#A9A5A8"], [.88, "#E2B590"], [1, "#F4CE9E"]], su: ["#6F665E", "#1B1E22"], suCizgi: "#FFDBA8", gun: [460, 128, 90, "#FFD9A0"], bulut: [[20, 40, 280, "#7E8A96", .55], [300, 26, 280, "#737F8C", .6]],
        arka: `<g opacity=".55">${sehir(0, W, 222, 30, 104, 22, 40, "#6F7782", "#FFE0A8", .14)}</g>`, anit: `${beetham}${baca(90)}${fab(0, 170, 112)}${fab(380, 150, 92)}${fab(528, 112, 72)}${kopru}` });
    },
    BNE() {
      // Story Bridge, nehir, jakaranda
      const kk = (t) => [120 + 400 * t, 142 - 96 * (1 - ((t - .5) / .5) ** 2)];
      let kf = ""; for (let i = 0; i <= 26; i++) { const [x, y] = kk(i / 26), [x2, y2] = kk((i + 1) / 26), alt = y + 8 + Math.abs(i - 13) * 1.4; if (i < 26) kf += `<line x1="${n(x)}" y1="${n(y)}" x2="${n(x2)}" y2="${n(y2)}" stroke="#3B4B58" stroke-width="2.2"/><line x1="${n(x)}" y1="${n(y)}" x2="${n(x2)}" y2="${n(y2 + 8 + Math.abs(i + 1 - 13) * 1.4)}" stroke="#57697A" stroke-width=".8"/>`; kf += `<line x1="${n(x)}" y1="${n(y)}" x2="${n(x)}" y2="168" stroke="#57697A" stroke-width=".8"/>`; }
      const kopru = `${kf}<rect y="168" width="${W}" height="5" fill="#3B4B58"/>${[120, 520].map(x => `<rect x="${x - 7}" y="118" width="14" height="110" fill="#6E8294"/>`).join("")}`;
      return sahne({ yer: 228, g: [[0, "#2B4B8E"], [.5, "#8C6CA8"], [.82, "#F39C7C"], [1, "#FBD092"]], su: ["#7D5F92", "#102445"], suCizgi: "#FFCFA0", gun: [80, 170, 92, "#FFE0A8", 22],
        arka: `<g opacity=".7">${sehir(170, 500, 228, 40, 122, 18, 32, "#3D4A82", "#FFE1A8", .34)}</g>`, anit: `${kopru}${agacKume(40, 214, 34, ["#8C6FD0", "#A58AE0", "#6F56B0"])}${agacKume(600, 212, 38, ["#8C6FD0", "#A58AE0", "#6F56B0"])}` });
    },
    YUL() {
      // Olimpiyat Stadyumu'nun eğik kulesi, Mont Royal, kış sabahı
      const kule = `<path d="M330 214Q356 134 452 22L478 40Q404 130 400 214z" fill="#DDE3E8"/><path d="M452 22L478 40L474 50L446 32z" fill="#7E8E9E"/>${pencereler(378, 96, 60, 80, 6, 6, "#7FA8C2", .22)}<path d="M430 66L350 182M452 82L388 196" stroke="#6D7F90" stroke-width=".9"/>`;
      const stad = `<path d="M100 214Q230 120 390 214z" fill="#EBEFF2"/><path d="M130 214Q230 138 360 214" fill="none" stroke="#A7B3BE" stroke-width="1.6"/>${Array.from({ length: 18 }, (_, i) => `<path d="M${112 + i * 15} 214Q${150 + i * 8} ${166 - Math.abs(i - 9) * .4} 240 142" stroke="#B9C4CD" stroke-width=".7" fill="none"/>`).join("")}<path d="M240 142L430 62" stroke="#6D7F90" stroke-width=".8"/><path d="M240 142L400 92" stroke="#6D7F90" stroke-width=".8"/>`;
      const kar = Array.from({ length: 90 }, () => `<circle cx="${n(r() * W)}" cy="${n(r() * H)}" r="${n(.7 + r() * 1.3)}" fill="#FFFFFF" opacity="${n(.45 + r() * .5)}"/>`).join("");
      return sahne({ yer: 214, g: [[0, "#6F93B5"], [.65, "#C7DAE3"], [1, "#F5EAD8"]], gun: [90, 50, 86, "#FFF6DB"], bulut: [[300, 40, 230, "#FFFFFF", .6]],
        arka: `${dagB("M0 214Q120 150 260 176T640 158V214z", "#7D9098", .8)}<g opacity=".6">${sehir(430, W, 214, 26, 100, 18, 32, "#8399AA", "#F4F8FA", .1)}</g>`, anit: `${stad}${kule}`,
        on: `<rect y="214" width="${W}" height="66" fill="#EEF3F6"/>${Array.from({ length: 12 }, () => { const x = r() * W; return `<path d="M${n(x)} 248l10-34 10 34z" fill="#3E5A58"/><path d="M${n(x + 4)} 228l6-14 6 14z" fill="#F8FBFC"/>`; }).join("")}${kar}` });
    },
    BHX() {
      // Selfridges'in disk kaplı gövdesi, kütüphanenin altın halkaları
      const yuvarlak = (x, y, rr) => { let c = `<ellipse cx="${x}" cy="${y}" rx="${rr}" ry="${rr * .72}" fill="#3C4D7E"/>`; for (let i = 0; i < 280; i++) { const a = r() * 6.28, d = Math.sqrt(r()), dx = Math.cos(a) * d * rr, dy = Math.sin(a) * d * rr * .72; c += `<circle cx="${n(x + dx)}" cy="${n(y + dy)}" r="2.4" fill="${r() > .6 ? "#D8E3F0" : "#9DB2CE"}"/>`; } return c; };
      const halka = (x, y, g, h) => { let s = `<rect x="${x}" y="${y}" width="${g}" height="${h}" fill="#20303F"/>`; for (let a = 0; a < g; a += 22) for (let b = 0; b < h; b += 22) s += `<circle cx="${x + a + 11}" cy="${y + b + 11}" r="10" fill="none" stroke="#EFC24B" stroke-width="1.8"/>`; return s; };
      return sahne({ yer: 234, g: [[0, "#2F5FA0"], [.65, "#A8D0E4"], [1, "#FBE8C5"]], gun: [120, 44, 84, "#FFF8D2"], bulut: [[320, 34, 220, "#FFFFFF", .7]],
        arka: `<g opacity=".55">${sehir(0, W, 234, 40, 120, 20, 36, "#7E97AE", "#F4F8FA", .14)}</g>`,
        anit: `${yuvarlak(170, 168, 124)}<rect x="46" y="222" width="250" height="12" fill="#26324F"/><rect x="396" y="174" width="176" height="60" fill="#E8E2D2"/>${halka(410, 112, 148, 62)}${halka(428, 66, 110, 44)}<rect x="478" y="42" width="24" height="22" fill="#EFC24B"/>${pencereler(404, 184, 160, 40, 14, 18, "#6F7D84", .9)}`,
        on: `<rect y="234" width="${W}" height="46" fill="#5F5E5E"/>${Array.from({ length: 16 }, (_, i) => `<rect x="${i * 42}" y="256" width="20" height="2" fill="#E0E0D8"/>`).join("")}` });
    },
    ADL() {
      // Aziz Petrus Katedrali, üzüm bağları, tepeler
      const cx = 400, kat = `<rect x="${cx - 42}" y="120" width="84" height="104" fill="#D8C8A8"/>${[-44, 22].map(d => `<rect x="${cx + d}" y="70" width="22" height="154" fill="#CFBE9C"/><path d="M${cx + d - 2} 72L${cx + d + 11} 22L${cx + d + 24} 72z" fill="#6E5F4C"/><path d="M${cx + d + 7} 110v-16a4 6 0 0 1 8 0v16z" fill="#4A4038"/>`).join("")}<path d="M${cx - 14} 180v-30a14 16 0 0 1 28 0v30z" fill="#3F4C72"/>${[-1, 0, 1].map(s => `<path d="M${cx + s * 8} 180V148" stroke="#D8C8A8" stroke-width=".9"/>`).join("")}<path d="M${cx - 42} 120L${cx} 92L${cx + 42} 120z" fill="#A6957B"/><path d="M${cx - 8} 224v-26a8 10 0 0 1 16 0v26z" fill="#463B32"/><rect x="${cx + 44}" y="150" width="104" height="74" fill="#CFBE9C"/><path d="M${cx + 44} 150L${cx + 96} 126L${cx + 148} 150z" fill="#8E7D64"/>${pencereler(cx + 52, 160, 90, 50, 18, 26, "#4A4038", .9)}`;
      const bag = Array.from({ length: 9 }, (_, i) => `<path d="M-20 ${228 + i * 7}Q300 ${216 + i * 8} 660 ${232 + i * 6}" fill="none" stroke="#3F6E3A" stroke-width="${2 + i * .5}" stroke-dasharray="4 ${3 + i}"/>`).join("");
      return sahne({ yer: 224, g: [[0, "#2F7CB4"], [.62, "#B0DCE6"], [1, "#FBEBC5"]], gun: [120, 46, 86, "#FFF9D2", 18], bulut: [[400, 40, 200, "#FFFFFF", .6]],
        arka: `${dagB("M0 224Q130 156 280 186T640 160V224z", "#7EA26E")}${agacKume(120, 204, 34, ["#4F7F46", "#3F6E3E"])}${agacKume(250, 208, 26, ["#4F7F46", "#3F6E3E"])}`, anit: kat,
        on: `<rect y="224" width="${W}" height="56" fill="#A5B865"/>${bag}` });
    },
    LAS() {
      // Gece Strip: neon tabela, cam piramit, ışık hüzmesi, kule
      const pir = `<path d="M60 236L170 86L280 236z" fill="#1B1C33"/><path d="M170 86L280 236H170z" fill="#2B2C4C"/>${Array.from({ length: 11 }, (_, i) => `<path d="M${72 + i * 10} ${222 - i * 13}H${268 - i * 10}" stroke="#4A4C7A" stroke-width=".7"/>`).join("")}<path d="M170 86L176 0H164z" fill="#E8F3FF" opacity=".55"/>`;
      const eyfel = `<path d="M420 236Q440 170 448 100L454 40L460 100Q468 170 488 236H470Q464 190 454 176Q444 190 438 236z" fill="#A47A3C"/><path d="M440 150H468M446 100H462" stroke="#C69A54" stroke-width="3"/>${pencereler(440, 104, 28, 120, 6, 8, "#FFD76E", .4)}`;
      const tabela = `<g transform="translate(556 150)"><rect x="-3" y="30" width="6" height="56" fill="#6B6F80"/><path d="M-44 0L0 -32L44 0L0 30z" fill="#F4F2E8" stroke="#E23D5A" stroke-width="4"/><text x="0" y="-5" text-anchor="middle" font-family="Georgia, serif" font-size="8" font-weight="700" fill="#C8352E">WELCOME</text><text x="0" y="9" text-anchor="middle" font-family="Georgia, serif" font-size="11" font-weight="700" fill="#1E5FA8">VEGAS</text><path d="M0 -44l3 8 8 0-6 5 2 8-7-5-7 5 2-8-6-5 8 0z" fill="#E23D5A"/></g>`;
      const neon = Array.from({ length: 70 }, () => `<rect x="${n(r() * W)}" y="${n(200 + r() * 34)}" width="${n(4 + r() * 16)}" height="2" fill="${["#FF4F8B", "#4FE3FF", "#FFD24F", "#7CFF9B", "#C46CFF"][Math.floor(r() * 5)]}" opacity="${n(.55 + r() * .45)}"/>`).join("");
      return sahne({ yer: 236, g: [[0, "#080A24"], [.65, "#20174E"], [.88, "#6B2A74"], [1, "#F4737A"]], ust: yildizlar(70, 130), arka: `${dagB("M0 236L120 180L240 206L380 166L520 204L640 176V236z", "#2A1F52")}${sehir(0, W, 236, 40, 124, 22, 40, "#191A3E", "#FFE08A", .3)}`,
        anit: `${pir}${eyfel}${tabela}${neon}`, on: `<rect y="236" width="${W}" height="44" fill="#0B0B20"/>${Array.from({ length: 40 }, () => `<rect x="${n(r() * W)}" y="${n(240 + r() * 34)}" width="${n(4 + r() * 12)}" height="1.6" fill="${["#FF4F8B", "#4FE3FF", "#FFD24F"][Math.floor(r() * 3)]}" opacity=".55"/>`).join("")}` });
    },
    YYC() {
      // Calgary Tower, karlı Rocky, kovboy şapkalı siluet, altın çayır
      const cx = 280, kule = `<path d="M${cx - 14} 224L${cx - 7} 76H${cx + 7}L${cx + 14} 224z" fill="#C7CED6"/><ellipse cx="${cx}" cy="72" rx="26" ry="8" fill="#D5332F"/><rect x="${cx - 24}" y="60" width="48" height="12" fill="#2F3C4C"/>${[-18, -8, 2, 12].map(d => `<rect x="${cx + d}" y="62" width="6" height="7" fill="#FFE29A"/>`).join("")}<ellipse cx="${cx}" cy="60" rx="24" ry="6" fill="#E9E5DC"/><path d="M${cx - 3} 54H${cx + 3}L${cx + 1} 24H${cx - 1}z" fill="#B5BCC4"/>`;
      return sahne({ yer: 224, g: [[0, "#4A7EA8"], [.6, "#C0D6DD"], [.86, "#F8D7A8"], [1, "#FBC58C"]], gun: [530, 160, 96, "#FFE7B0", 22],
        arka: `${dagB("M0 178L60 130L110 156L190 86L250 142L330 78L400 150L470 92L540 150L640 110V224H0z", "#5D6E8C")}${dagB("M190 86L168 110L184 106L194 122L206 104L222 114zM330 78L306 102L322 98L334 116L350 98L366 110zM470 92L450 110L464 108L474 120L486 106L500 114z", "#F4F8FB")}<g opacity=".9">${sehir(180, 460, 224, 26, 96, 18, 32, "#3F5070", "#FFE1A8", .3)}</g>`,
        anit: kule, on: `<rect y="224" width="${W}" height="56" fill="#D1A44A"/>${Array.from({ length: 170 }, () => { const x = r() * W, y = 226 + r() * 54; return `<path d="M${n(x)} ${n(y + 10)}l${n(-1 + r() * 3)} -10" stroke="#8F6E2A" stroke-width="1" opacity=".7"/>`; }).join("")}<g transform="translate(90 240)"><path d="M-22 -18Q0 -30 22 -18Q14 -14 10 -14Q8 -26 0 -26Q-8 -26 -10 -14Q-14 -14 -22 -18z" fill="#3A2415"/><path d="M-7 -14Q0 -12 7 -14L12 40H-12z" fill="#3A2415"/></g>` });
    },
    NCL() {
      // Tyne Köprüsü ve Millennium Köprüsü, Sage kabukları
      const tt = t => [130 + 380 * t, 158 - 112 * (1 - ((t - .5) / .5) ** 2)];
      let ty = ""; for (let i = 0; i <= 24; i++) { const [x, y] = tt(i / 24), [x2, y2] = tt((i + 1) / 24), alt = y + 8 + Math.abs(i - 12) * .9; if (i < 24) ty += `<line x1="${n(x)}" y1="${n(y)}" x2="${n(x2)}" y2="${n(y2)}" stroke="#2F6E5F" stroke-width="2.6"/><line x1="${n(x)}" y1="${n(y)}" x2="${n(x2)}" y2="${n(y2 + 8 + Math.abs(i + 1 - 12) * .9)}" stroke="#3F8877" stroke-width=".9"/>`; ty += `<line x1="${n(x)}" y1="${n(y)}" x2="${n(x)}" y2="${n(Math.max(alt, 152))}" stroke="#3F8877" stroke-width=".9"/>`; }
      const tyne = `${ty}<rect y="150" width="${W}" height="5" fill="#2F6E5F"/>${[130, 510].map(x => `<rect x="${x - 16}" y="100" width="32" height="126" fill="#C8BCA3"/><rect x="${x - 19}" y="96" width="38" height="5" fill="#A4977D"/>${pencereler(x - 10, 108, 20, 100, 10, 18, "#4E5457", .8)}`).join("")}`;
      const mil = `<path d="M40 226Q140 186 240 226" fill="none" stroke="#F2F4F5" stroke-width="2.4"/><path d="M40 226Q140 146 240 226" fill="none" stroke="#F2F4F5" stroke-width="2.4"/>${Array.from({ length: 9 }, (_, i) => `<line x1="${60 + i * 20}" y1="${n(226 - 80 * .5 * (1 - ((i - 4) / 5) ** 2) * 1)}" x2="${60 + i * 20}" y2="${n(226 - 40 * .5 * (1 - ((i - 4) / 5) ** 2) * 1)}" stroke="#F2F4F5" stroke-width=".6"/>`).join("")}`;
      const sage = `<path d="M540 226Q540 176 590 170Q620 168 640 180V226z" fill="#C4D1D8"/><path d="M558 226Q566 190 610 186Q626 186 640 192" fill="none" stroke="#8C9AA3"/>`;
      return sahne({ yer: 226, g: [[0, "#3A4A70"], [.55, "#9C7F9A"], [.85, "#EAAE8A"], [1, "#F8D19E"]], su: ["#7C6D82", "#18233B"], suCizgi: "#FFDBAE", gun: [320, 152, 110, "#FFE0A8", 24], bulut: [[30, 48, 240, "#C497A0", .4]],
        arka: `<g opacity=".65">${sehir(0, W, 226, 26, 86, 22, 38, "#4F5475", "#FFE0A8", .24)}</g>`, anit: `${tyne}${mil}${sage}` });
    },
    MCO() {
      // Tema parkı: masal şatosu, havai fişekler, roller coaster
      const kule = (x, y, g, c) => `<rect x="${x}" y="${y}" width="${g}" height="${236 - y}" fill="#F2E7F0"/><path d="M${x + g * .5} ${y - g * 1.6}L${x - 3} ${y}H${x + g + 3}z" fill="${c}"/><rect x="${x + g * .5 - .7}" y="${y - g * 2}" width="1.4" height="${g * .5}" fill="#333"/>${pencereler(x + g * .25, y + 8, g * .55, 236 - y - 16, g * .28, 18, "#FFE29A", .85)}`;
      const sato = `${kule(270, 112, 20, "#5A67D8")}${kule(358, 116, 18, "#D65AA8")}${kule(304, 84, 22, "#7C5AD8")}${kule(334, 70, 18, "#5A67D8")}${kule(250, 150, 22, "#D65AA8")}${kule(388, 150, 22, "#5A67D8")}<rect x="256" y="170" width="150" height="66" fill="#F9EEF6"/>${siperler(256, 170, 150, "#F9EEF6", 9)}<path d="M314 236v-34a18 20 0 0 1 36 0v34z" fill="#5A3E7A"/>`;
      const fisek = (x, y, R, c) => Array.from({ length: 22 }, (_, i) => { const a = i * Math.PI / 11, b = R * (.5 + r() * .55); return `<path d="M${x} ${y}L${n(x + Math.cos(a) * b)} ${n(y + Math.sin(a) * b)}" stroke="${c}" stroke-width="1.2" opacity=".8"/><circle cx="${n(x + Math.cos(a) * b)}" cy="${n(y + Math.sin(a) * b)}" r="1.4" fill="#FFFFFF"/>`; }).join("");
      let coaster = `<path d="M430 236Q450 130 490 150T540 200T590 120T640 170" fill="none" stroke="#FF6B6B" stroke-width="3"/>`; for (let i = 0; i < 12; i++) { const x = 440 + i * 17; coaster += `<path d="M${x} 236V${n(146 + 40 * Math.sin(i * .9) + 20)}" stroke="#E7D0D7" stroke-width="1"/>`; }
      return sahne({ yer: 236, g: [[0, "#120D3D"], [.6, "#3B2478"], [.88, "#A0448E"], [1, "#F08A7A"]], ust: yildizlar(70, 150), arka: `${fisek(120, 76, 56, "#FF7AB6")}${fisek(520, 58, 46, "#6BE0FF")}${fisek(210, 44, 34, "#FFE16B")}${fisek(420, 34, 30, "#9CFF9C")}`,
        anit: `${coaster}${agacKume(60, 216, 38, ["#1F3A3E", "#2A4A4C"])}${agacKume(190, 220, 26, ["#1F3A3E", "#2A4A4C"])}${sato}`, on: `<rect y="236" width="${W}" height="44" fill="#1C1538"/>${Array.from({ length: 40 }, () => `<circle cx="${n(r() * W)}" cy="${n(240 + r() * 34)}" r="1.2" fill="#FFE29A" opacity=".75"/>`).join("")}` });
    },
    DCA() {
      // Capitol kubbesi, Washington Anıtı, yansıma havuzu, kiraz çiçeği
      const cx = 330, cap = `<rect x="130" y="150" width="400" height="66" fill="#F1EDE3"/><rect x="${cx - 62}" y="134" width="124" height="82" fill="#F7F4EB"/><path d="M${cx - 64} 134L${cx} 118L${cx + 64} 134z" fill="#E1DCCD"/>${Array.from({ length: 14 }, (_, i) => `<rect x="${cx - 58 + i * 8.7}" y="140" width="3.4" height="72" fill="#CFC8B5"/>`).join("")}${pencereler(138, 158, 110, 50, 12, 22, "#7C8590", .9)}${pencereler(420, 158, 104, 50, 12, 22, "#7C8590", .9)}<rect x="${cx - 40}" y="100" width="80" height="18" fill="#F1EDE3"/>${Array.from({ length: 13 }, (_, i) => `<rect x="${cx - 38 + i * 6.2}" y="102" width="2.2" height="14" fill="#BDB6A2"/>`).join("")}<rect x="${cx - 30}" y="82" width="60" height="18" fill="#F7F4EB"/>${Array.from({ length: 10 }, (_, i) => `<rect x="${cx - 28 + i * 6}" y="84" width="2" height="14" fill="#BDB6A2"/>`).join("")}<path d="M${cx - 28} 82Q${cx} 28 ${cx + 28} 82z" fill="#F1EDE3"/><path d="M${cx} 40Q${cx + 22} 50 ${cx + 28} 82H${cx}z" fill="#CFC8B5"/>${[-16, -8, 8, 16].map(d => `<path d="M${cx + d} 82Q${cx + d * .6} 54 ${cx} 40" stroke="#BDB6A2" fill="none" stroke-width=".7"/>`).join("")}<rect x="${cx - 4}" y="26" width="8" height="14" fill="#E7E3D7"/><path d="M${cx - 2} 26L${cx} 12L${cx + 2} 26z" fill="#6D6A5E"/>`;
      const anit = `<path d="M70 216L76 44L82 26L88 44L94 216z" fill="#EEE9DD"/><path d="M82 26L88 44L94 216H82z" fill="#CFC8B5"/>`;
      const kiraz = x => agacKume(x, 200, 30, ["#FBC3D6", "#F7A6C1", "#FDD9E5"]);
      return sahne({ yer: 216, g: [[0, "#3F7EB6"], [.62, "#BCDDE8"], [1, "#FDEBCB"]], su: ["#87B8CA", "#2A5D7C"], gun: [560, 42, 80, "#FFF9D6"], bulut: [[150, 34, 220, "#FFFFFF", .7]], arka: anit,
        anit: `${cap}${kiraz(30)}${kiraz(120)}${kiraz(540)}${kiraz(610)}` });
    },
    CHC() {
      // Avon Nehri, kayıkçı, söğütler, taş üniversite binası
      const yapi = `<rect x="330" y="96" width="250" height="118" fill="#B8B09C"/>${siperler(330, 96, 250, "#B8B09C")}${pencereler(342, 110, 226, 84, 18, 28, "#47505A", .9)}<rect x="424" y="50" width="48" height="164" fill="#AFA792"/>${siperler(424, 50, 48, "#AFA792")}${saatY(448, 76, 12)}<path d="M436 214v-30a12 14 0 0 1 24 0v30z" fill="#3F3A34"/>`;
      const sogut = (x, y) => { let c = `<path d="M${x - 5} 226Q${x} 180 ${x - 3} ${y}H${x + 5}Q${x + 4} 180 ${x + 6} 226z" fill="#4C3A28"/>`; for (let i = 0; i < 34; i++) { const a = -2.8 + r() * 2.6, R = 34 + r() * 24, bx = x + Math.cos(a) * R, by = y + Math.sin(a) * R * .6; c += `<path d="M${n(bx)} ${n(by)}q${n(-3 + r() * 6)} ${n(26 + r() * 22)} ${n(-2 + r() * 4)} ${n(50 + r() * 34)}" fill="none" stroke="${["#7EA850", "#92BB5E", "#6A9446"][Math.floor(r() * 3)]}" stroke-width="${n(1.6 + r() * 2)}" stroke-linecap="round"/>`; } return c; };
      const kayik = `<g transform="translate(250 246)"><path d="M-70 0H70L58 11H-58z" fill="#7A4E2A"/><path d="M-60 2H60" stroke="#C49A5C" stroke-width="2"/><path d="M36 -44V-4M28 -8h16" stroke="#F4F2E8" stroke-width="5" stroke-linecap="round"/><circle cx="36" cy="-50" r="5" fill="#EAC29A"/><path d="M26 -54H46L36 -60z" fill="#E9D69A"/><path d="M40 -36L60 12" stroke="#4A3220" stroke-width="2"/><circle cx="-24" cy="-6" r="5" fill="#EAC29A"/><path d="M-30 0Q-24 -14 -18 0z" fill="#D5532F"/></g>`;
      return sahne({ yer: 226, g: [[0, "#3B86BA"], [.65, "#B8E0E2"], [1, "#FBEBC2"]], su: ["#6FA88E", "#1E5A62"], suCizgi: "#EAF7D4", gun: [90, 46, 80, "#FFF8D2"], bulut: [[220, 32, 220, "#FFFFFF", .7]],
        arka: dagB("M0 226Q160 150 330 186T640 176V226z", "#7AA46A", .8), anit: `${yapi}${sogut(110, 96)}${sogut(590, 110)}`, on: kayik });
    },
    ABZ() {
      // Gri granit Marischal, liman ve kırmızı gemi
      const gr = `<rect x="140" y="104" width="280" height="124" fill="#A9AEB4"/>${Array.from({ length: 19 }, (_, i) => `<rect x="${146 + i * 15}" y="94" width="6" height="134" fill="#BCC1C6"/><path d="M${146 + i * 15} 94l3 -14l3 14z" fill="#BCC1C6"/>`).join("")}${pencereler(154, 120, 256, 92, 15, 26, "#3F4852", .85)}<rect x="248" y="42" width="60" height="186" fill="#B4B9BF"/>${[0, 18, 36, 54].map(d => `<rect x="${248 + d}" y="32" width="6" height="30" fill="#CCD0D4"/><path d="M${248 + d} 32l3 -18l3 18z" fill="#CCD0D4"/>`).join("")}<path d="M262 228v-52a16 20 0 0 1 32 0v52z" fill="#384048"/>`;
      const gemi = `<g transform="translate(500 228)"><path d="M-110 -14H110L92 16H-92z" fill="#C8352E"/><path d="M-110 -14H110L106 -6H-106z" fill="#F4F4F0"/><rect x="-14" y="-52" width="72" height="38" fill="#F4F4F0"/>${pencereler(-8, -46, 60, 26, 10, 12, "#35485A", .95)}<rect x="10" y="-70" width="14" height="18" fill="#1E5FA8"/><rect x="-80" y="-30" width="56" height="16" fill="#E0A83C"/><path d="M-60 -30L-74 -66M-74 -66L-30 -52" stroke="#4A4A4A" stroke-width="2"/></g>`;
      return sahne({ yer: 228, g: [[0, "#4B6682"], [.62, "#AFC6CE"], [1, "#ECE7D4"]], su: ["#5B8290", "#142E40"], gun: [80, 44, 80, "#FFF6D6"], bulut: [[300, 34, 260, "#E8ECEC", .8]],
        arka: `<g opacity=".55">${sehir(0, W, 228, 26, 96, 20, 36, "#7E8C96", "#F6F0D6", .12)}</g>`, anit: `${sehir(0, 140, 228, 20, 62, 22, 38, "#596670", "#FFE6A8", .25)}${gr}${gemi}` });
    },
    SLC() {
      // Altı kuleli Tapınak ve karlı Wasatch
      const cx = 320, kule = (x, y, g) => `<rect x="${x}" y="${y}" width="${g}" height="${232 - y}" fill="#DAD6CA"/>${siperler(x - 1, y, g + 2, "#DAD6CA", 4)}<path d="M${x} ${y}L${x + g / 2} ${y - g * 2.2}L${x + g} ${y}z" fill="#BFB9A9"/>${pencereler(x + g * .3, y + 12, g * .45, 232 - y - 24, g, 26, "#5A616B", 1)}`;
      const tap = `<rect x="${cx - 104}" y="140" width="208" height="92" fill="#E4E0D4"/>${pencereler(cx - 92, 150, 186, 70, 20, 32, "#5A616B", .95)}${kule(cx - 118, 98, 26)}${kule(cx - 78, 84, 22)}${kule(cx - 34, 60, 30)}${kule(cx + 8, 60, 30)}${kule(cx + 56, 84, 22)}${kule(cx + 92, 98, 26)}<circle cx="${cx - 19}" cy="28" r="2.4" fill="#EFC24B"/><path d="M${cx + 23} 26V8" stroke="#EFC24B" stroke-width="2"/>`;
      return sahne({ yer: 232, g: [[0, "#3C6EA5"], [.6, "#BBD8E4"], [1, "#FBE8C7"]], gun: [90, 48, 84, "#FFF8D2", 18],
        arka: `${dagB("M0 170L90 92L150 130L240 56L310 122L400 46L480 124L560 74L640 128V232H0z", "#6A7C96")}${dagB("M90 92L72 110L86 108L96 120L108 106zM240 56L214 84L232 78L244 98L262 76L280 90zM400 46L372 76L390 70L404 92L424 70L444 84zM560 74L540 92L554 90L564 104L578 88L592 98z", "#F7FAFC")}${dagB("M0 222Q240 180 420 206T640 190V232H0z", "#3D6650")}`,
        anit: `${agacKume(90, 216, 34, ["#47724C", "#3A6443"])}${agacKume(560, 214, 40, ["#47724C", "#3A6443"])}${tap}`, on: `<rect y="232" width="${W}" height="48" fill="#73A05C"/><rect x="${cx - 16}" y="232" width="32" height="48" fill="#D5C8AE"/>` });
    },
    PDX() {
      // St. Johns Köprüsü'nün gotik kuleleri, Mt. Hood, köknar
      const k = x => `<path d="M${x - 16} 214L${x - 10} 62h20L${x + 16} 214z" fill="#2F6F5E"/><path d="M${x - 8} 214L${x - 4} 96h8L${x + 8} 214z" fill="#BCD8CF" opacity=".55"/><path d="M${x - 11} 62L${x} 22L${x + 11} 62z" fill="#245648"/>${[-12, -5, 5, 12].map(d => `<path d="M${x + d} 62v-14" stroke="#2F6F5E" stroke-width="2"/>`).join("")}<path d="M${x - 14} 120h28M${x - 15} 168h30" stroke="#245648" stroke-width="3"/>`;
      let ask = ""; for (let i = 1; i < 40; i++) { const x = 170 + i * 7.5, y = 32 + 108 * (1 - ((i - 20) / 20) ** 2); ask += `<line x1="${x}" y1="${n(y)}" x2="${x}" y2="146" stroke="#3F8878" stroke-width=".7"/>`; }
      return sahne({ yer: 214, g: [[0, "#4F7FA8"], [.6, "#C8DBDC"], [1, "#FBE3BE"]], su: ["#6F9A98", "#14374A"], gun: [100, 66, 90, "#FFF3C8"],
        arka: `${dagB("M300 214L420 110L470 62L494 42L520 66L574 124L640 170V214z", "#778CA4")}${dagB("M470 62L494 42L520 66L532 80L512 74L498 90L482 76L460 84z", "#F8FBFC")}${dagB("M0 214Q200 166 340 188T640 186V214z", "#2C5A46")}${Array.from({ length: 70 }, () => { const x = r() * W, y = 170 + r() * 34, h = 10 + r() * 16; return `<path d="M${n(x)} ${n(y)}l${n(h * .35)} ${n(h)}h${n(-h * .7)}z" fill="#1E4638"/>`; }).join("")}`,
        anit: `<path d="M170 32Q320 248 470 32" fill="none" stroke="#2F6F5E" stroke-width="3"/>${ask}<path d="M-40 90Q60 80 170 32M470 32Q580 80 680 90" fill="none" stroke="#2F6F5E" stroke-width="2.6"/><rect y="146" width="${W}" height="6" fill="#245648"/>${k(170)}${k(470)}` });
    },
    YHZ() {
      // Peggy's Cove: kayalar üstünde deniz feneri, balıkçı kulübeleri
      const fener = `<path d="M440 196L450 74h34L494 196z" fill="#FAFAF5"/><path d="M467 74h17L494 196H467z" fill="#DDE1DF"/><rect x="444" y="64" width="46" height="10" fill="#C8352E"/><rect x="452" y="42" width="30" height="22" fill="#FFF0A8" stroke="#C8352E" stroke-width="3"/><path d="M448 42L467 24L486 42z" fill="#C8352E"/><rect x="466" y="14" width="2" height="12" fill="#2A2A2A"/><rect x="462" y="110" width="10" height="16" fill="#33475A"/><rect x="460" y="160" width="14" height="36" fill="#7A2B26"/>`;
      const kaya = `<path d="M240 ${H}V230L300 206L360 214L420 186L520 184L580 210L640 204V${H}z" fill="#8C8F92"/>${Array.from({ length: 34 }, () => { const x = 250 + r() * 390, y = 200 + r() * 70; return `<path d="M${n(x)} ${n(y)}l${n(14 + r() * 26)} ${n(-4 + r() * 12)}l${n(-10 + r() * 6)} ${n(8 + r() * 12)}z" fill="${["#A3A6A8", "#747679", "#5F6265", "#B6B6B3"][Math.floor(r() * 4)]}"/>`; }).join("")}`;
      const kulube = (x, y, c) => `<rect x="${x}" y="${y}" width="46" height="26" fill="${c}"/><path d="M${x - 4} ${y}L${x + 23} ${y - 16}L${x + 50} ${y}z" fill="#3B3430"/><rect x="${x + 18}" y="${y + 8}" width="11" height="18" fill="#2E3A44"/>`;
      return sahne({ yer: 220, g: [[0, "#2F6F9E"], [.6, "#A8D4DE"], [1, "#F8E8C5"]], su: ["#2F8FA5", "#0B3C58"], gun: [120, 56, 94, "#FFF8D2", 20], bulut: [[300, 36, 220, "#FFFFFF", .7]],
        anit: "", on: `${Array.from({ length: 12 }, () => { const x = r() * 260, y = 234 + r() * 34; return `<path d="M${n(x)} ${n(y)}q20 -8 40 0" stroke="#FFFFFF" fill="none" opacity=".75"/>`; }).join("")}${kaya}${fener}${kulube(280, 196, "#D5533F")}${kulube(350, 188, "#F2C65F")}${kulube(556, 190, "#4C86A8")}<g transform="translate(130 246)"><path d="M-44 0H44L34 14H-34z" fill="#F4F4F0"/><path d="M-44 0H44L42 4H-42z" fill="#C8352E"/><rect x="-8" y="-18" width="26" height="18" fill="#F4F4F0"/><rect x="24" y="-40" width="2" height="40" fill="#333"/></g>` });
    },
    MSY() {
      // French Quarter: ferforje balkonlu evler, yeşil tramvay, caz
      const ev = (x, g, c, h) => { let s = `<rect x="${x}" y="${232 - h}" width="${g}" height="${h}" fill="${c}"/><rect x="${x}" y="${228 - h}" width="${g}" height="5" fill="#3A2F2C"/>`; [0, 1].forEach(k => { const by = 232 - h + 10 + k * (h / 2 - 2); s += pencereler(x + 10, by, g - 16, h / 2 - 22, g / 3.2, h / 2, "#2E3C3E", 1); const a = by + h / 2 - 22; s += `<rect x="${x - 2}" y="${a}" width="${g + 4}" height="3" fill="#2A2A2A"/>`; for (let i = 0; i <= g; i += 6) s += `<path d="M${x + i} ${a}v-13" stroke="#2A2A2A" stroke-width="1"/>`; s += `<path d="M${x - 2} ${a - 13}H${x + g + 2}" stroke="#2A2A2A" stroke-width="1.6"/>`; for (let i = 3; i < g; i += 12) s += `<path d="M${x + i} ${a - 13}q4 -3 8 0q-4 6 -8 0" fill="#5D9C4F"/>`; }); return s; };
      const tram = `<g transform="translate(240 206)"><rect width="200" height="42" rx="7" fill="#2F7A4E"/><path d="M-4 -8H204L196 0H4z" fill="#8C2F2F"/>${Array.from({ length: 8 }, (_, i) => `<rect x="${8 + i * 24}" y="6" width="19" height="18" rx="4" fill="#FFE29A"/>`).join("")}<rect y="30" width="200" height="3" fill="#E3B447"/><rect x="99" y="-24" width="2" height="16" fill="#222"/><circle cx="36" cy="44" r="6" fill="#111"/><circle cx="164" cy="44" r="6" fill="#111"/><circle cx="198" cy="26" r="3" fill="#FFF2B0"/></g>`;
      const trompet = `<g transform="translate(70 248)"><path d="M-8 -36Q0 -46 8 -36L12 24H-12z" fill="#1E1A28"/><circle cx="0" cy="-44" r="7" fill="#6B4A36"/><path d="M6 -40H36l10 -8v16l-10 -8" fill="#E3B447" stroke="#B48A2C" stroke-width="1"/></g>`;
      return sahne({ yer: 232, g: [[0, "#2A2558"], [.5, "#8C4F86"], [.82, "#EF8D74"], [1, "#FBC58A"]], gun: [570, 110, 90, "#FFD9A0"],
        anit: `${ev(0, 118, "#E08A6B", 170)}${ev(120, 104, "#E3C766", 148)}${ev(226, 118, "#6FAFA8", 176)}${ev(346, 100, "#D66B7F", 152)}${ev(448, 112, "#8C9ED8", 170)}${ev(562, 90, "#E9A865", 150)}`,
        on: `<rect y="232" width="${W}" height="48" fill="#26222E"/><path d="M0 258H640M0 268H640" stroke="#6D6A75"/>${tram}${trompet}` });
    },
    OXF() {
      // Radcliffe Camera ve Rüya Kuleleri, altın taş
      const cx = 320, tas = "#D9BC82", kam = `<rect x="${cx - 84}" y="168" width="168" height="56" fill="#CCAE74"/>${pencereler(cx - 76, 178, 154, 36, 22, 40, "#4B3F2C", 1)}<rect x="${cx - 74}" y="110" width="148" height="58" fill="${tas}"/>${Array.from({ length: 12 }, (_, i) => `<rect x="${cx - 72 + i * 12.6}" y="112" width="4" height="54" fill="#B89A60"/>`).join("")}${pencereler(cx - 66, 124, 136, 30, 12.6, 40, "#4B3F2C", 1)}<rect x="${cx - 80}" y="104" width="160" height="7" fill="#B89A60"/><rect x="${cx - 54}" y="84" width="108" height="20" fill="#CCAE74"/><path d="M${cx - 50} 84Q${cx} 16 ${cx + 50} 84z" fill="#78868A"/>${[-34, -18, 0, 18, 34].map(d => `<path d="M${cx + d} 84Q${cx + d * .55} 48 ${cx} 34" stroke="#5F6C70" fill="none"/>`).join("")}<rect x="${cx - 7}" y="24" width="14" height="12" fill="${tas}"/><path d="M${cx - 8} 24Q${cx} 6 ${cx + 8} 24z" fill="#5F6C70"/>`;
      const sivri = (x, y, g) => `<rect x="${x}" y="${y}" width="${g}" height="${224 - y}" fill="#C7A86C"/><path d="M${x - 1} ${y}L${x + g / 2} ${y - g * 3}L${x + g + 1} ${y}z" fill="#A98A52"/>${siperler(x - 2, y, g + 4, "#C7A86C", 4)}${pencereler(x + g * .3, y + 10, g * .45, 224 - y - 20, g, 30, "#4B3F2C", 1)}`;
      return sahne({ yer: 224, g: [[0, "#3F6490"], [.55, "#B0B9C5"], [.85, "#F4CFA0"], [1, "#FBDDA8"]], gun: [580, 130, 92, "#FFE7B0"], bulut: [[20, 44, 250, "#F2EAE0", .6]],
        arka: `${sivri(60, 92, 20)}${sivri(130, 72, 24)}${sivri(480, 82, 22)}${sivri(556, 104, 18)}<rect y="166" width="${W}" height="58" fill="#BFA167"/>${pencereler(6, 176, 628, 34, 22, 40, "#4B3F2C", .9)}`, anit: kam,
        on: `<rect y="224" width="${W}" height="56" fill="#7FA65C"/>${Array.from({ length: 10 }, (_, i) => `<path d="M0 ${228 + i * 5}H${W}" stroke="#6F9650" opacity=".5"/>`).join("")}<g transform="translate(120 236)"><rect x="0" y="0" width="2" height="16" fill="#222"/><circle cx="-6" cy="16" r="7" fill="none" stroke="#222"/><circle cx="20" cy="16" r="7" fill="none" stroke="#222"/><path d="M-6 16L6 4H16L20 16M6 4L10 16" stroke="#C8352E" fill="none" stroke-width="1.6"/></g>` });
    },
    CBR() {
      // Telstra Kulesi tepede, Parlamento'nun dört ayaklı direği, gölde jet su
      const k = `<rect x="486" y="58" width="12" height="96" fill="#D5D9DD"/><path d="M480 96H504L500 138H484z" fill="#AEB6BE"/><rect x="474" y="88" width="36" height="9" fill="#58646E"/><rect x="491" y="14" width="2" height="44" fill="#C8352E"/>`;
      const direk = `<g transform="translate(180 0)"><path d="M-30 196L0 44L30 196M-14 196L0 44L14 196" stroke="#E6E9EC" stroke-width="3" fill="none"/><rect x="-1" y="20" width="2" height="26" fill="#BCC2C8"/><path d="M1 22h22v12h-22z" fill="#1E3A7A"/><path d="M1 22h10v6H1z" fill="#C8352E"/><path d="M-90 196Q0 176 90 196V212H-90z" fill="#C5C9BE"/><rect x="-62" y="184" width="124" height="12" fill="#E8E5DA"/><rect x="-16" y="172" width="32" height="12" fill="#F4F2E8"/></g>`;
      const jet = `<g transform="translate(330 214)"><path d="M0 0Q-6 -70 0 -118Q6 -70 0 0z" fill="#FFFFFF" opacity=".92"/>${Array.from({ length: 34 }, () => `<circle cx="${n((r() - .5) * 26)}" cy="${n(-r() * 120)}" r="${n(1 + r() * 2)}" fill="#FFFFFF" opacity="${n(.45 + r() * .5)}"/>`).join("")}</g>`;
      return sahne({ yer: 214, g: [[0, "#3A84BE"], [.62, "#B7E0E8"], [1, "#FBEAC2"]], su: ["#3D93AC", "#0C4661"], gun: [80, 44, 84, "#FFF8D2", 18], bulut: [[300, 30, 220, "#FFFFFF", .7]],
        arka: `${dagB("M0 214Q90 170 240 192T430 154T580 150T640 180V214z", "#5D8B6A")}${k}${agacKume(480, 168, 24, ["#3F7355", "#4C8060"])}${agacKume(530, 172, 22, ["#3F7355", "#4C8060"])}`,
        anit: `${direk}${agacKume(360, 196, 28, ["#517E5A", "#E7A33C", "#3F7355"])}${agacKume(610, 198, 34, ["#517E5A", "#E7A33C", "#3F7355"])}${agacKume(40, 200, 30, ["#517E5A", "#3F7355"])}`, on: jet });
    },
    YWG() {
      // İnsan Hakları Müzesi'nin cam kulesi, kışın donmuş nehir, buğday
      const m = `<path d="M210 214Q240 142 300 130L360 138Q430 150 460 214z" fill="#8EA0AE"/><path d="M226 214Q262 150 320 142Q392 150 436 214z" fill="#C7DDE7"/>${Array.from({ length: 10 }, (_, i) => `<path d="M${230 + i * 22} 214Q${280 + i * 8} 170 ${320 + i * 2} 142" stroke="#8EA8B8" stroke-width=".8" fill="none"/>`).join("")}<path d="M300 130L322 28L338 6L344 28L352 136z" fill="#A9CCDC"/><path d="M322 28L338 6L344 28L352 136H326z" fill="#D5E9F1"/>${Array.from({ length: 11 }, (_, i) => `<path d="M${304 + i * .4} ${48 + i * 8}H${348 - i * .1}" stroke="#7E9CB0" stroke-width=".6"/>`).join("")}<rect x="326" y="2" width="1.6" height="26" fill="#E7E9EA"/>`;
      const kar = Array.from({ length: 80 }, () => `<circle cx="${n(r() * W)}" cy="${n(r() * 210)}" r="${n(.6 + r() * 1.2)}" fill="#FFFFFF" opacity="${n(.4 + r() * .5)}"/>`).join("");
      return sahne({ yer: 214, g: [[0, "#4F76A8"], [.58, "#B7CCE0"], [.86, "#F6D5C0"], [1, "#FBD8A8"]], gun: [536, 120, 90, "#FFE8BE", 20],
        arka: `<g opacity=".6">${sehir(380, W, 214, 26, 92, 18, 34, "#7990A8", "#FFF0C4", .14)}${sehir(0, 240, 214, 18, 72, 18, 34, "#7990A8", "#FFF0C4", .14)}</g>`, anit: m,
        on: `<rect y="214" width="${W}" height="66" fill="#EAF1F5"/><path d="M0 240Q200 226 340 244T640 232V256Q480 266 320 254T0 262z" fill="#BCD4E0"/>${[[60, 248], [430, 246]].map(([x, y]) => `<g transform="translate(${x} ${y})"><circle cx="0" cy="-16" r="4.5" fill="#E9B592"/><path d="M-4 -12H4L6 4H-6z" fill="#C8352E"/><path d="M-5 4L-9 14M5 4L10 14M-11 14H-3M6 14H14" stroke="#222" stroke-width="1.6"/></g>`).join("")}${kar}` });
    },
    GWY() {
      // Claddagh: renkli sıra evler, kuğular, Galway Hooker tekneleri
      const renk = ["#D85C4A", "#2E7A9A", "#F0C14B", "#3F8C6A", "#E78A3C", "#7A5CA8"];
      let ev = ""; for (let x = 0, i = 0; x < W; i++) { const g = 54 + r() * 18, h = 70 + r() * 26, y = 218 - h; ev += `<rect x="${n(x)}" y="${n(y)}" width="${n(g)}" height="${n(h)}" fill="${renk[i % 6]}"/><path d="M${n(x - 2)} ${n(y)}L${n(x + g / 2)} ${n(y - 14)}L${n(x + g + 2)} ${n(y)}z" fill="#3A302E"/>${pencereler(x + 8, y + 10, g - 14, h - 34, 14, 20, "#F7F3E8", .95)}<path d="M${n(x + g / 2 - 7)} 218v-20a7 8 0 0 1 14 0v20z" fill="#2B2B2B"/>`; x += g + .5; }
      const tekne = (x, y, o, c) => `<g transform="translate(${x} ${y}) scale(${o})"><path d="M-42 0H42L28 16H-30z" fill="#1E1E24"/><rect x="-2" y="-78" width="2.4" height="78" fill="#2A2A2A"/><path d="M0 -74Q42 -44 46 -4H0z" fill="${c}"/><path d="M-3 -66Q-30 -40 -38 -4H-3z" fill="${c}"/></g>`;
      const kugu = (x, y) => `<g transform="translate(${x} ${y})"><path d="M-16 0Q-14 -10 4 -9Q16 -9 18 -2Q8 6 -6 4z" fill="#FFFFFF"/><path d="M15 -4Q24 -16 18 -24Q14 -28 9 -24" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/><path d="M9 -24L4 -22" stroke="#E08A2E" stroke-width="2.4"/></g>`;
      return sahne({ yer: 218, g: [[0, "#5C7FA6"], [.6, "#C2D3D6"], [1, "#F4E7C8"]], su: ["#5B8590", "#14323F"], gun: [530, 54, 90, "#FFF4CC"], bulut: [[40, 36, 260, "#F2F2EC", .85], [340, 26, 200, "#E2E6E4", .7]],
        anit: `${ev}<rect y="218" width="${W}" height="3" fill="#2F2A28"/>`, on: `${tekne(150, 240, 1, "#6A2C20")}${tekne(450, 250, 1.15, "#7A3A24")}${kugu(290, 262)}${kugu(350, 272)}` });
    },
    NBO() {
      // KICC kulesi, akasya, zürafalar, savana gün batımı
      const k = `<rect x="360" y="66" width="44" height="156" fill="#D9A96A"/>${pencereler(366, 76, 34, 138, 7, 8, "#3F2F20", .85)}<ellipse cx="382" cy="62" rx="30" ry="8" fill="#B8824A"/><rect x="352" y="48" width="60" height="14" fill="#E4C08A"/><path d="M356 48L382 28L408 48z" fill="#8F5A30"/><path d="M330 222Q350 180 410 180Q440 180 450 222z" fill="#B8824A"/>`;
      const akasya = (x, y, o) => `<g transform="translate(${x} ${y}) scale(${o})"><path d="M-3 0Q-2 -30 -18 -48M-3 0Q2 -34 20 -50M0 -20Q4 -38 0 -54" fill="none" stroke="#1E140E" stroke-width="3.4"/><ellipse cx="0" cy="-58" rx="60" ry="13" fill="#1E140E"/><ellipse cx="-30" cy="-54" rx="28" ry="8" fill="#1E140E"/><ellipse cx="32" cy="-54" rx="26" ry="8" fill="#1E140E"/></g>`;
      const zurafa = (x, y, o) => `<g transform="translate(${x} ${y}) scale(${o})" fill="#1E140E"><path d="M-22 -40Q0 -48 22 -36L24 -26Q0 -22 -22 -26z"/><path d="M18 -34L30 -92L38 -90L34 -28z"/><path d="M28 -96Q40 -104 50 -92L46 -86Q36 -88 30 -86z"/><path d="M32 -100v-6M38 -100v-6" stroke="#1E140E" stroke-width="1.6"/><path d="M-20 -28L-22 2h4L-14 -26zM-8 -24L-8 2h4L-3 -24zM12 -24L12 2h4L18 -24zM20 -26L24 2h4L26 -28z"/><path d="M-22 -36Q-30 -30 -30 -16" fill="none" stroke="#1E140E" stroke-width="1.4"/></g>`;
      return sahne({ yer: 222, g: [[0, "#5A2E6E"], [.4, "#C4507A"], [.7, "#F68C4F"], [1, "#FFD07A"]], gun: [190, 190, 118, "#FFE2A0", 40, "#FFEAB0"], bulut: [[320, 50, 240, "#F8A08A", .3]],
        arka: `<g opacity=".7">${sehir(290, 560, 222, 22, 92, 18, 34, "#6A3A58", "#FFD98A", .24)}</g>`, anit: k,
        on: `<path d="M0 ${H}V226Q320 212 640 228V${H}z" fill="#3A2214"/>${Array.from({ length: 120 }, () => { const x = r() * W, y = 230 + r() * 50; return `<path d="M${n(x)} ${n(y)}l${n(-1 + r() * 3)} -7" stroke="#1E140E" stroke-width=".9" opacity=".7"/>`; }).join("")}${akasya(90, 240, 1.3)}${akasya(560, 244, 1.05)}${zurafa(230, 256, 1)}${zurafa(320, 260, .78)}` });
    },
    MNL() {
      // Manila Körfezi gün batımı, renkli jeepney, palmiyeler
      const jeep = `<g transform="translate(180 192)"><rect x="-6" y="-24" width="246" height="8" rx="3" fill="#C8352E"/><path d="M180 -16H234Q244 -14 246 12V44H180z" fill="#E7B738"/><rect x="186" y="-10" width="44" height="22" fill="#CDE7F2"/><rect x="0" y="-16" width="180" height="60" fill="#2E7A9A"/>${Array.from({ length: 6 }, (_, i) => `<rect x="${8 + i * 28}" y="-10" width="24" height="20" fill="#1E3040"/>`).join("")}<rect y="14" x="0" width="246" height="7" fill="#F4F0DE"/><path d="M6 32q14-10 28 0t28 0t28 0t28 0t28 0t28 0" fill="none" stroke="#FFD24F" stroke-width="2.4"/><circle cx="46" cy="46" r="13" fill="#1A1A20"/><circle cx="46" cy="46" r="5" fill="#C9CDD2"/><circle cx="200" cy="46" r="13" fill="#1A1A20"/><circle cx="200" cy="46" r="5" fill="#C9CDD2"/><path d="M246 -24l14 -6v10z" fill="#C9CDD2"/><path d="M200 -32l6 -16 6 16z" fill="#C8352E"/><path d="M90 -32q6 -14 12 0" fill="#FFD24F"/><circle cx="244" cy="30" r="4" fill="#FFF2B0"/></g>`;
      return sahne({ yer: 218, g: [[0, "#3F2A78"], [.38, "#D34E7C"], [.68, "#FB8E55"], [.9, "#FFCB72"], [1, "#FFE1A0"]], su: ["#FB9F68", "#27305E"], suCizgi: "#FFE3AE", gun: [430, 192, 120, "#FFE6A8", 42, "#FFEFB8"], bulut: [[40, 52, 240, "#FF9F8C", .38], [370, 80, 220, "#FFA58C", .3]],
        anit: `<g opacity=".65">${sehir(0, 340, 218, 18, 84, 16, 32, "#6A3A68", "#FFD98A", .2)}</g><path d="M520 218l38 -30h8l38 30z" fill="#3D2A58"/><rect x="540" y="196" width="50" height="4" fill="#3D2A58"/>`,
        on: `<rect y="246" width="${W}" height="34" fill="#2B2438"/><rect y="244" width="${W}" height="3" fill="#6C6079"/><path d="M0 260H${W}" stroke="#E7C27A" stroke-dasharray="14 12"/>${palmS(46, 250, 158, 1.15, "#1A1630")}${palmS(120, 250, 106, .8, "#1A1630")}${palmS(596, 250, 178, 1.25, "#1A1630")}${jeep}` });
    },
    PHX() {
      // Sonoran çölü: saguaro kaktüsleri, Camelback, turuncu gök
      const sag = (x, y, h, o, c) => `<g transform="translate(${x} ${y}) scale(${o})" fill="${c}"><rect x="-7" y="${-h}" width="14" height="${h}" rx="7"/><path d="M-7 ${-h * .42}H-24Q-30 ${-h * .42} -30 ${-h * .5}V${-h * .78}a5 5 0 0 1 10 0V${-h * .52}H-7z"/><path d="M7 ${-h * .56}H24Q30 ${-h * .56} 30 ${-h * .64}V${-h * .9}a5 5 0 0 0 -10 0V${-h * .66}H7z"/>${[-3, 2].map(d => `<path d="M${d} ${-h + 6}V-2" stroke="#000" stroke-opacity=".18" stroke-width="1.2"/>`).join("")}</g>`;
      return sahne({ yer: 226, g: [[0, "#34306E"], [.42, "#B6507C"], [.72, "#F58D54"], [1, "#FFD07E"]], gun: [190, 166, 110, "#FFE3A8", 32, "#FFF0C0"], bulut: [[300, 48, 260, "#F8A68E", .32]],
        arka: `${dagB("M0 226L0 180Q60 160 110 170T200 170T320 196T440 150Q470 122 510 128T570 164T640 182V226z", "#6E3E5E")}${dagB("M0 226Q120 192 300 208T640 198V226z", "#4A2E4A")}<g opacity=".65">${sehir(40, 300, 226, 8, 40, 14, 28, "#3A2542", "#FFD98A", .35)}</g>`,
        on: `<path d="M0 ${H}V230Q300 214 640 232V${H}z" fill="#8E5A3C"/>${Array.from({ length: 70 }, () => `<circle cx="${n(r() * W)}" cy="${n(236 + r() * 44)}" r="${n(1 + r() * 2.4)}" fill="#5F3A28"/>`).join("")}${sag(88, 258, 130, 1, "#1E3A30")}${sag(556, 262, 170, 1, "#1B332C")}${sag(444, 248, 70, .8, "#23473A")}${sag(236, 250, 56, .7, "#23473A")}${Array.from({ length: 14 }, () => { const x = r() * W, y = 244 + r() * 30; return `<path d="M${n(x)} ${n(y)}l-6 -9M${n(x)} ${n(y)}l0 -11M${n(x)} ${n(y)}l6 -9" stroke="#3A4A30" stroke-width="1.4"/>`; }).join("")}` });
    },
    CBG() {
      // King's College Şapeli, Cam Nehri, kayık, söğüt
      const sap = `<rect x="150" y="92" width="360" height="130" fill="#D9C79E"/>${Array.from({ length: 11 }, (_, i) => `<rect x="${156 + i * 33}" y="92" width="6" height="130" fill="#BEAA7C"/><path d="M${154 + i * 33} 92l5 -22l5 22z" fill="#BEAA7C"/><path d="M${166 + i * 33} 212V124a10 28 0 0 1 20 0v88z" fill="#586B86"/><path d="M${176 + i * 33} 212V98" stroke="#BEAA7C" stroke-width="1.2"/>${[140, 170, 196].map(y => `<path d="M${166 + i * 33} ${y}h20" stroke="#BEAA7C" stroke-width=".9"/>`).join("")}`).join("")}${[150, 496].map(x => `<rect x="${x - 8}" y="52" width="26" height="170" fill="#CCB98F"/><path d="M${x - 10} 52L${x + 5} 8L${x + 20} 52z" fill="#A89668"/>${siperler(x - 8, 52, 26, "#CCB98F", 5)}`).join("")}<rect x="150" y="88" width="360" height="5" fill="#BEAA7C"/>`;
      const ca = `<rect y="222" width="${W}" height="10" fill="#7BA65C"/>`;
      const punt = `<g transform="translate(380 252)"><path d="M-82 0H82L70 12H-70z" fill="#6A4426"/><path d="M60 -56V-4" stroke="#F4F0E2" stroke-width="5" stroke-linecap="round"/><circle cx="60" cy="-62" r="5" fill="#EAC29A"/><path d="M50 -66H70L60 -72z" fill="#E9D69A"/><path d="M65 -46L92 20" stroke="#3F2A18" stroke-width="2"/><circle cx="-30" cy="-6" r="5" fill="#EAC29A"/><path d="M-36 0Q-30 -14 -24 0z" fill="#1E5FA8"/><circle cx="-6" cy="-6" r="5" fill="#EAC29A"/><path d="M-12 0Q-6 -14 0 0z" fill="#C8352E"/></g>`;
      const sogut = (x, y) => { let c = `<path d="M${x - 5} 234Q${x} 180 ${x - 3} ${y}H${x + 5}Q${x + 4} 180 ${x + 6} 234z" fill="#4C3A28"/>`; for (let i = 0; i < 30; i++) { const a = -2.8 + r() * 2.6, R = 30 + r() * 24, bx = x + Math.cos(a) * R, by = y + Math.sin(a) * R * .6; c += `<path d="M${n(bx)} ${n(by)}q${n(-3 + r() * 6)} ${n(26 + r() * 22)} ${n(-2 + r() * 4)} ${n(46 + r() * 36)}" fill="none" stroke="${["#7EA850", "#92BB5E", "#6A9446"][Math.floor(r() * 3)]}" stroke-width="${n(1.5 + r() * 2)}" stroke-linecap="round"/>`; } return c; };
      return sahne({ yer: 232, g: [[0, "#4874A6"], [.6, "#BFD3DA"], [1, "#FBE6BC"]], su: ["#6F9E8A", "#1E4A5A"], suCizgi: "#F4F4D6", gun: [90, 54, 86, "#FFF6CC"], bulut: [[280, 30, 250, "#FFFFFF", .7]],
        anit: `${sap}${ca}${sogut(70, 110)}${sogut(586, 118)}`, on: punt });
    },
  };
  if (!Object.hasOwn(CIZIM, kod)) return "";
  const c = CIZIM[kod]();
  return `<svg class="city-art" viewBox="0 0 ${W} ${H}" role="img" aria-label="${ad} manzarası"><defs>${c.defs}</defs>${c.ciz}</svg>`;
}
