// Scenes for the other emergencies, in the same style: helper in blue, the person who needs help in amber, actions in red.
const W = { water: '#8FCBEA', waterD: '#5AAED8', metal: '#A9B3BF', metalD: '#7D8794', cloth: '#FFFFFF', clothL: '#C9D0D8', ice: '#CFEAF7', iceD: '#7FB9D6', burn: '#E8735A', gold: '#E2B23B', pillow: '#E6E9EF', blanket: '#5FB3A0', blanketD: '#4A9785', gray: '#9AA0A8', wood: '#C89B6D', woodD: '#A97C50' };
const VP = PAL.vic, RP = PAL.res;
const OLD = { ...PAL.vic, hair: '#C9CDD2' };

const clock = (x, y, r, label) => dot(x, y, r, '#fff', `stroke="${K.ink}" stroke-width="${r * 0.12}"`) +
  line([[x, y], [x, y - r * 0.6]], K.ink, r * 0.1) + line([[x, y], [x + r * 0.42, y + r * 0.2]], K.ink, r * 0.1) + dot(x, y, r * 0.09, K.ink) +
  (label ? txt(x, y + r + 20, label, 14, K.ink, 'middle', 800) : '');
const noSign = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${K.act}" stroke-width="${r * 0.16}"/>` + line([[x - r * 0.68, y + r * 0.68], [x + r * 0.68, y - r * 0.68]], K.act, r * 0.16);
const okSign = (x, y, r) => dot(x, y, r, K.green) + `<path d="M${x - r * 0.45},${y} l${r * 0.3},${r * 0.32} l${r * 0.55},${-r * 0.62}" stroke="#fff" stroke-width="${r * 0.22}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const faucet = (x, y) => `<rect x="${x - 120}" y="${y - 12}" width="128" height="24" rx="10" fill="${W.metal}"/><rect x="${x - 14}" y="${y - 12}" width="28" height="40" rx="10" fill="${W.metalD}"/><rect x="${x - 34}" y="${y - 30}" width="40" height="14" rx="7" fill="${W.metalD}"/>`;
const stream = (x, y1, y2, w = 20) => `<rect x="${x - w / 2}" y="${y1}" width="${w}" height="${y2 - y1}" rx="${w / 2}" fill="${W.water}" opacity=".9"/>` + line([[x - 3, y1 + 8], [x - 3, y2 - 10]], '#fff', 3).replace('<polyline', '<polyline opacity=".7"') + [[-26, -4], [24, -8], [-16, 10], [18, 8]].map(([dx, dy]) => dot(x + dx, y2 + dy, 4, W.waterD)).join('');
const coldPack = (x, y, w, h, rot = 0) => `<g transform="rotate(${rot} ${x + w / 2} ${y + h / 2})"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${W.ice}" stroke="${W.iceD}" stroke-width="3"/>` +
  `<path d="M${x + w / 2},${y + h * 0.25} V${y + h * 0.75} M${x + w / 2 - h * 0.22},${y + h * 0.37} L${x + w / 2 + h * 0.22},${y + h * 0.63} M${x + w / 2 + h * 0.22},${y + h * 0.37} L${x + w / 2 - h * 0.22},${y + h * 0.63}" stroke="${W.iceD}" stroke-width="3.5" stroke-linecap="round"/></g>`;
// A forearm seen from the side, sleeve on the left, hand on the right.
const forearmSide = (x1, y1, x2, y2, w, pal) => line([[x1 - 60, y1 + (y1 - y2) * 0.2], [x1 + 30, y1]], pal.shirt, w + 10) + line([[x1, y1], [x2, y2]], pal.skin, w) +
  `<g transform="translate(${x2},${y2}) rotate(${Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI})"><rect x="-6" y="${-w * 0.55}" width="${w * 1.5}" height="${w * 1.1}" rx="${w * 0.5}" fill="${pal.skin}"/><path d="M${w * 0.2},${-w * 0.5} l${w * 0.5},${-w * 0.35}" stroke="${pal.skin}" stroke-width="${w * 0.36}" stroke-linecap="round"/></g>`;
const phoneMini = (x, y, s = 1, label = '911') => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-34" y="-62" width="68" height="124" rx="13" fill="${K.ink}"/><rect x="-27" y="-50" width="54" height="94" rx="7" fill="#EAF1FF"/>` +
  txt(0, -4, label, label.length > 4 ? 13 : 22, K.ink, 'middle', 900) + dot(0, 26, 11, K.green) + `</g>`;
// Big face seen from the front. droop = the left side of the face (viewer's right) droops.
function frontFace(cx, cy, r, pal, o = {}) {
  let s = dot(cx - r * 0.98, cy + r * 0.05, r * 0.2, pal.skinF) + dot(cx + r * 0.98, cy + r * 0.05, r * 0.2, pal.skinF);
  s += dot(cx, cy, r, pal.skin) + `<path d="M${cx - r * 0.98},${cy - r * 0.08} a${r * 0.98},${r * 0.98} 0 0 1 ${r * 1.96},0 q${-r * 0.2},${-r * 0.52} ${-r * 0.98},${-r * 0.52} q${-r * 0.78},0 ${-r * 0.98},${r * 0.52} z" fill="${pal.hair}"/>`;
  const ey = cy - r * 0.08, el = cx - r * 0.38, er = cx + r * 0.38;
  s += line([[el - r * 0.16, ey - r * 0.22], [el + r * 0.16, ey - r * 0.24]], '#6B4A35', r * 0.07);
  s += dot(el, ey, r * 0.085, '#2A1E17');
  if (o.droop) s += line([[er - r * 0.16, ey - r * 0.2], [er + r * 0.16, ey - r * 0.12]], '#6B4A35', r * 0.07) + `<path d="M${er - r * 0.14},${ey + r * 0.02} q${r * 0.14},${r * 0.1} ${r * 0.28},${r * 0.04}" stroke="#2A1E17" stroke-width="${r * 0.07}" fill="none" stroke-linecap="round"/>`;
  else s += line([[er - r * 0.16, ey - r * 0.24], [er + r * 0.16, ey - r * 0.22]], '#6B4A35', r * 0.07) + dot(er, ey, r * 0.085, '#2A1E17');
  s += `<path d="M${cx},${cy - r * 0.02} q${-r * 0.1},${r * 0.24} ${r * 0.06},${r * 0.26}" stroke="${pal.skinF}" stroke-width="${r * 0.07}" fill="none" stroke-linecap="round"/>`;
  if (o.droop) s += `<path d="M${cx - r * 0.34},${cy + r * 0.42} q${r * 0.2},${r * 0.14} ${r * 0.38},${r * 0.08} q${r * 0.18},${r * 0.04} ${r * 0.3},${r * 0.2}" stroke="#8A3B2E" stroke-width="${r * 0.08}" fill="none" stroke-linecap="round"/>`;
  else if (o.mouth === 'open') s += `<ellipse cx="${cx}" cy="${cy + r * 0.48}" rx="${r * 0.16}" ry="${r * 0.12}" fill="#8A3B2E"/>`;
  else s += `<path d="M${cx - r * 0.3},${cy + r * 0.42} q${r * 0.3},${r * 0.2} ${r * 0.6},0" stroke="#8A3B2E" stroke-width="${r * 0.08}" fill="none" stroke-linecap="round"/>`;
  return s;
}
const shoulders = (cx, y, w, pal) => `<path d="M${cx - w / 2},262 L${cx - w / 2},${y + 30} Q${cx - w / 2},${y} ${cx - w / 2 + 40},${y} L${cx + w / 2 - 40},${y} Q${cx + w / 2},${y} ${cx + w / 2},${y + 30} L${cx + w / 2},262 Z" fill="${pal.shirt}"/>` + `<rect x="${cx - 16}" y="${y - 24}" width="32" height="32" fill="${pal.skin}"/>`;
const pillow = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${W.pillow}" stroke="${W.clothL}" stroke-width="2"/>`;

Object.assign(ART, {
  call911If: () => phoneMini(108, 128, 1.5) +
    `<rect x="196" y="58" width="146" height="150" rx="16" fill="#fff" stroke="${K.ink}" stroke-width="3"/>` +
    [92, 130, 168].map(y => `<polygon points="214,${y + 8} 224,${y - 10} 234,${y + 8}" fill="${K.act}"/>` + line([[246, y], [322, y]], K.floor, 9)).join('') +
    chip(196, 18, 'CALL 911 IF...', K.act),

  // Burns
  burnCool: () => faucet(126, 42) + stream(126, 70, 152, 22) +
    forearmSide(40, 172, 262, 156, 44, VP) + `<ellipse cx="128" cy="160" rx="34" ry="14" fill="${W.burn}" opacity=".85"/>` + stream(126, 70, 146, 22) +
    clock(306, 66, 26) + chip(204, 214, '5 TO 20 MINUTES', K.ink) + txt(306, 116, 'cool, not ice', 13, K.ink),

  burnRing: () => {
    const sk = VP.skin, sf = VP.skinF;
    return line([[150, 300], [168, 196]], VP.shirt, 64) + line([[160, 262], [168, 176]], sk, 52) +
      `<rect x="128" y="96" width="92" height="96" rx="38" fill="${sk}"/>` +
      [[140, 104, 132, 46], [160, 98, 158, 30], [182, 100, 186, 34], [202, 108, 210, 52]].map(([x1, y1, x2, y2]) => line([[x1, y1], [x2, y2]], sk, 20)).join('') +
      line([[134, 150], [104, 118]], sk, 20) +
      `<rect x="148" y="58" width="22" height="11" rx="5" fill="${W.gold}" transform="rotate(-4 159 63)"/>` + arrow(159, 52, 159, 14, K.act, 5) +
      `<rect x="138" y="196" width="62" height="20" rx="6" fill="${K.ink}"/><rect x="156" y="190" width="26" height="32" rx="8" fill="#4B5565"/>` + arrow(206, 206, 250, 206, K.act, 5) +
      `<ellipse cx="150" cy="148" rx="20" ry="12" fill="${W.burn}" opacity=".8"/>` + chip(196, 14, 'BEFORE IT SWELLS', K.ink);
  },

  burnCover: () => forearmSide(36, 150, 262, 138, 44, VP) + `<ellipse cx="150" cy="142" rx="38" ry="14" fill="${W.burn}" opacity=".85"/>` +
    `<path d="M92,108 Q150,96 212,110 L214,170 Q150,182 90,168 Z" fill="#EAF6FF" opacity=".72" stroke="#9CC9E6" stroke-width="3"/>` +
    `<rect x="44" y="200" width="54" height="30" rx="6" fill="#F6D86B"/>` + noSign(71, 215, 30) +
    `<rect x="148" y="196" width="36" height="36" rx="7" fill="${W.ice}" stroke="${W.iceD}" stroke-width="3"/>` + noSign(166, 214, 30) +
    `<rect x="236" y="204" width="56" height="20" rx="8" fill="#EDEFF3" stroke="${W.clothL}" stroke-width="2"/><rect x="286" y="208" width="14" height="12" rx="3" fill="${K.act}"/>` + noSign(268, 214, 30) +
    chip(196, 18, 'LAY IT ON LOOSELY', K.green),

  burnPalm: () => forearmSide(30, 120, 300, 108, 70, VP) + `<ellipse cx="170" cy="114" rx="92" ry="26" fill="${W.burn}" opacity=".85"/>` +
    `<g transform="translate(70,204)" opacity=".9"><rect x="-24" y="-20" width="48" height="44" rx="18" fill="#DCE1E8"/>` +
    [[-17, -16, -20, -44], [-6, -18, -6, -50], [6, -18, 8, -48], [17, -14, 20, -38]].map(([a, b, c, d]) => line([[a, b], [c, d]], '#DCE1E8', 10)).join('') + line([[-20, 4], [-38, -14]], '#DCE1E8', 10) + `</g>` +
    txt(70, 246, 'their palm', 14, K.ink) + txt(214, 182, 'bigger?', 22, K.act, 'middle', 900) + phoneMini(310, 196, 0.62),

  // Fainting
  faintLower: () => floor(236) +
    V({ fa: 140, closed: true, head: [150, 126], neck: [160, 152], hip: [178, 214], legN: [[176, 218], [126, 210], [84, 226]], legF: [[184, 214], [134, 200], [92, 214]],
      back: [[[166, 162], [182, 192], [176, 222]]], front: [[[156, 164], [138, 194], [128, 222]]] }) +
    R({ fa: 180, head: [252, 104], neck: [244, 134], hip: [252, 196], legN: [[252, 196], [240, 236]], back: [[[246, 146], [214, 160], [176, 158]]], front: [[[242, 148], [212, 176], [182, 178]]] }) +
    `<path d="M118,90 q-14,-10 0,-20 q14,-10 26,4" stroke="${K.act}" stroke-width="4" fill="none" stroke-linecap="round"/>` + chip(14, 14, 'GET THEM DOWN SAFELY', K.ink),

  faintLegs: () => floor(232) + `<rect x="236" y="186" width="92" height="44" rx="14" fill="${W.pillow}" stroke="${W.clothL}" stroke-width="2"/>` +
    V({ fa: -90, closed: true, head: [66, 206], neck: [94, 210], hip: [198, 212], legF: [[198, 207], [252, 186], [310, 176]], legN: [[198, 214], [256, 192], [314, 182]], front: [[[104, 216], [146, 223], [184, 224]]] }) +
    arrow(286, 150, 286, 112) + chip(14, 14, 'FEET UP 6 TO 12 INCHES', K.ink),

  // Seizure
  seizureSafe: () => floor(232) + pillow(28, 210, 74, 22) +
    V({ fa: -90, closed: true, head: [64, 198], neck: [92, 204], hip: [198, 210], legF: [[198, 206], [250, 194], [304, 204]], legN: [[198, 214], [250, 222], [300, 214]], front: [[[102, 210], [140, 190], [168, 200]]] }) +
    [[150, 172], [262, 176], [300, 236]].map(([x, y]) => `<path d="M${x - 10},${y} l6,-8 l6,8 l6,-8" stroke="${K.act}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join('') +
    `<g transform="translate(250,60)"><rect x="0" y="0" width="44" height="10" rx="4" fill="${W.wood}"/><rect x="0" y="-44" width="10" height="54" rx="4" fill="${W.woodD}"/>` + line([[4, 10], [4, 54]], W.woodD, 8) + line([[40, 10], [40, 54]], W.wood, 8) + `</g>` + arrow(304, 86, 340, 86, K.act, 5) +
    chip(14, 14, 'SOFT UNDER THE HEAD', K.green),

  seizureTime: () => clock(86, 112, 62) + txt(86, 206, 'note the time', 16, K.ink) +
    `<g transform="translate(218,96)">${dot(0, 0, 44, '#fff')}<path d="M-20,-14 q20,-12 40,0 v22 q-20,16 -40,0 z" fill="${VP.skin}"/><path d="M-10,4 q10,6 20,0" stroke="#8A3B2E" stroke-width="4" fill="none" stroke-linecap="round"/><rect x="2" y="-4" width="40" height="7" rx="3" fill="${W.metalD}" transform="rotate(-20 2 -4)"/>${noSign(0, 0, 44)}</g>` + txt(218, 162, 'nothing in mouth', 13, K.ink) +
    `<g transform="translate(300,200)">${dot(0, 0, 40, '#fff')}<rect x="-26" y="-6" width="52" height="16" rx="8" fill="${VP.shirt}"/>${mitten(-12, -16, 90, B.hand)}${mitten(14, -16, 90, B.hand)}${noSign(0, 0, 40)}</g>` + txt(240, 252, 'don’t hold down', 13, K.ink, 'end'),

  // Stroke
  strokeFace: () => shoulders(150, 214, 200, OLD) + frontFace(150, 120, 80, OLD, { droop: true }) +
    arrow(270, 150, 214, 166, K.act, 5) + bubble(196, 18, 150, 'Smile for me', 230, 66) + chip(232, 214, 'DROOPING?', K.act),

  strokeArms: () => floor(246) +
    V({ pal: OLD, fa: 'front', head: [180, 62], neck: [180, 92], hip: [180, 168], legF: [[188, 168], [192, 208], [194, 244]], legN: [[172, 168], [168, 208], [166, 244]],
      front: [[[192, 104], [236, 92], [282, 82]], [[168, 104], [126, 116], [90, 136]]] }) +
    arrow(84, 106, 80, 156, K.act, 5) + chip(206, 14, 'ONE ARM DRIFTS?', K.act),

  strokeSpeech: () => shoulders(96, 208, 150, OLD) + frontFace(96, 128, 60, OLD, { mouth: 'open' }) +
    `<rect x="170" y="40" width="176" height="96" rx="26" fill="#fff" stroke="${K.ink}" stroke-width="3"/><polygon points="176,112 150,142 196,126" fill="#fff" stroke="${K.ink}" stroke-width="3" stroke-linejoin="round"/><rect x="178" y="110" width="22" height="14" fill="#fff"/>` +
    `<path d="M190,74 q12,-14 24,0 t24,0 t24,0 t24,0 t24,0" stroke="${K.ink}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M190,104 q10,10 20,0 t20,0 t20,0" stroke="${K.ink}" stroke-width="5" fill="none" stroke-linecap="round"/>` +
    txt(318, 112, '?', 30, K.act, 'middle', 900) + chip(196, 168, 'SLURRED SPEECH?', K.act),

  strokeTime: () => clock(96, 112, 66) + txt(96, 214, 'note the time', 16, K.ink) + phoneMini(258, 126, 1.25) + chip(196, 14, 'TIME TO CALL 911', K.act),
});
