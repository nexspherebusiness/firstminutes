// First Minutes illustrations: flat pictograms on a 360x260 canvas.
// Blue = the helper, amber = the person who needs help, red = what you do.
const K = { res: '#2F6FED', resF: '#1D4BAF', vic: '#F2A541', vicF: '#C97F22', act: '#E5322D', ink: '#1B2433', floor: '#D5DBE3', cloth: '#FFFFFF', clothLine: '#9AA4B2', green: '#14935F', skin: '#F7CF94' };

const P = pts => pts.map(p => p.join(',')).join(' ');
const line = (pts, c, w) => `<polyline points="${P(pts)}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const dot = (x, y, r, c, extra = '') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" ${extra}/>`;
const txt = (x, y, s, size = 16, c = K.ink, anchor = 'middle', weight = 800) => `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${c}" text-anchor="${anchor}" font-family="system-ui,-apple-system,'Segoe UI',Roboto,sans-serif">${s}</text>`;
const floor = (y = 248, x1 = 16, x2 = 344) => line([[x1, y], [x2, y]], K.floor, 6);

function head(end, from, c, w) {
  const a = Math.atan2(end[1] - from[1], end[0] - from[0]), L = 18, W = 0.55;
  const tip = [end[0] + 6 * Math.cos(a), end[1] + 6 * Math.sin(a)];
  return `<polygon points="${P([tip, [tip[0] - L * Math.cos(a - W), tip[1] - L * Math.sin(a - W)], [tip[0] - L * Math.cos(a + W), tip[1] - L * Math.sin(a + W)]])}" fill="${c}"/>`;
}
const arrow = (x1, y1, x2, y2, c = K.act, w = 7) => `<path d="M${x1},${y1} L${x2},${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" fill="none"/>` + head([x2, y2], [x1, y1], c, w);
const curve = (x1, y1, cx, cy, x2, y2, c = K.act, w = 7) => `<path d="M${x1},${y1} Q${cx},${cy} ${x2},${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" fill="none"/>` + head([x2, y2], [cx, cy], c, w);
const badge = (x, y, t) => dot(x, y, 25, K.act) + txt(x, y + 8, t, 22, '#fff', 'middle', 900);
const chip = (x, y, t, c = K.ink) => { const w = t.length * 8.4 + 24; return `<rect x="${x}" y="${y}" width="${w}" height="28" rx="14" fill="${c}"/>` + txt(x + w / 2, y + 19, t, 13, '#fff', 'middle', 800); };
const bubble = (x, y, w, t, tx, ty) => `<polygon points="${P([[tx - 10, y + 34], [tx + 6, y + 34], [tx, ty]])}" fill="#fff" stroke="${K.ink}" stroke-width="3" stroke-linejoin="round"/><rect x="${x}" y="${y}" width="${w}" height="38" rx="19" fill="#fff" stroke="${K.ink}" stroke-width="3"/><rect x="${tx - 9}" y="${y + 30}" width="14" height="6" fill="#fff"/>` + txt(x + w / 2, y + 25, t, 16);
const hits = (x, y) => line([[x - 22, y - 16], [x - 30, y - 24]], K.act, 5) + line([[x, y - 24], [x, y - 36]], K.act, 5) + line([[x + 22, y - 16], [x + 30, y - 24]], K.act, 5);

// People: skin, hair, a shirt and trousers. The helper wears blue, the person who needs help wears amber.
// Far limbs use a darker shade and sit behind the body. fa = the direction the face looks, in degrees (0 right, 90 down, 180 left, -90 up), or 'front'.
const PAL = {
  res: { shirt: '#2F6FED', shirtF: '#1D4BAF', pants: '#2E3E5C', pantsF: '#222F47', skin: '#C98A5E', skinF: '#A9703F', hair: '#3E2A20' },
  vic: { shirt: '#F2A541', shirtF: '#D98A2B', pants: '#5B6577', pantsF: '#444C59', skin: '#EBBE95', skinF: '#D29A6C', hair: '#8B6A52' },
};
const SHOE = '#2B2F36';
const arm = (pts, shirt, skin, w) => line(pts.slice(0, 2), shirt, w) + (pts[2] ? line(pts.slice(1), skin, w * 0.84) + dot(pts[2][0], pts[2][1], w * 0.62, skin) : '');
function leg(pts, pants, w, fa) {
  let o = line(pts, pants, w);
  if (pts.length > 2) {
    const [x, y] = pts[pts.length - 1], d = (typeof fa === 'number' ? fa : 90) * Math.PI / 180;
    o += `<ellipse cx="${x + Math.cos(d) * w * 0.45}" cy="${y + Math.sin(d) * w * 0.45}" rx="${w * 0.85}" ry="${w * 0.48}" fill="${SHOE}" transform="rotate(${(typeof fa === 'number' ? fa : 0)} ${x + Math.cos(d) * w * 0.45} ${y + Math.sin(d) * w * 0.45})"/>`;
  }
  return o;
}
function face(hx, hy, nx, ny, r, fa, pal, closed) {
  let ux = hx - nx, uy = hy - ny; const L = Math.hypot(ux, uy) || 1; ux /= L; uy /= L; // up: neck to head
  if (fa === 'front') {
    let o = dot(hx + ux * r * 0.18, hy + uy * r * 0.18, r * 1.04, pal.hair) + dot(hx, hy, r, pal.skin);
    const px = -uy, py = ux;
    [-1, 1].forEach(k => {
      const ex = hx + px * r * 0.36 * k + ux * r * 0.05, ey = hy + py * r * 0.36 * k + uy * r * 0.05;
      o += closed ? `<path d="M${ex - r * 0.16},${ey} q${r * 0.16},${r * 0.14} ${r * 0.32},0" stroke="#4A3226" stroke-width="${r * 0.11}" fill="none" stroke-linecap="round"/>` : dot(ex, ey, r * 0.1, '#2A1E17');
    });
    return o;
  }
  const d = fa * Math.PI / 180, fx = Math.cos(d), fy = Math.sin(d);
  let o = dot(hx - fx * r * 0.2 + ux * r * 0.14, hy - fy * r * 0.2 + uy * r * 0.14, r * 1.02, pal.hair);
  o += dot(hx, hy, r, pal.skin);
  o += dot(hx + fx * r * 0.94 - ux * r * 0.06, hy + fy * r * 0.94 - uy * r * 0.06, r * 0.2, pal.skin);
  o += `<ellipse cx="${hx - fx * r * 0.14}" cy="${hy - fy * r * 0.14}" rx="${r * 0.17}" ry="${r * 0.22}" fill="${pal.skinF}"/>`;
  const ex = hx + fx * r * 0.52 + ux * r * 0.16, ey = hy + fy * r * 0.52 + uy * r * 0.16;
  o += closed ? `<path d="M${ex - fx * r * 0.15 - ux * r * 0.02},${ey - fy * r * 0.15 - uy * r * 0.02} q${fx * r * 0.15 - ux * r * 0.14},${fy * r * 0.15 - uy * r * 0.14} ${fx * r * 0.3},${fy * r * 0.3}" stroke="#4A3226" stroke-width="${r * 0.11}" fill="none" stroke-linecap="round"/>` : dot(ex, ey, r * 0.1, '#2A1E17');
  return o;
}
function fig(f) {
  const s = f.s || 1, lw = 15 * s, ll = 17 * s, tw = 32 * s, hr = 18 * s, p = f.pal, fa = f.fa === undefined ? 180 : f.fa;
  let o = '';
  (f.back || []).forEach(a => o += arm(a, p.shirtF, p.skinF, lw));
  if (f.legF) o += leg(f.legF, p.pantsF, ll, fa);
  o += line([f.neck, f.head], p.skin, hr * 0.6);
  o += line([f.neck, f.hip], p.shirt, tw);
  if (f.legN) o += leg(f.legN, p.pants, ll, fa);
  o += face(f.head[0], f.head[1], f.neck[0], f.neck[1], hr, fa, p, f.closed);
  (f.front || []).forEach(a => o += arm(a, p.shirt, p.skin, lw));
  return o;
}
const R = f => fig({ pal: PAL.res, ...f });
const V = f => fig({ pal: PAL.vic, ...f });

// Lying person, head on the left, used by CPR and bleeding scenes.
const lying = (s = 1, x = 0) => V({ s, fa: -90, closed: true, head: [66 + x, 206], neck: [94 + x, 210], hip: [198, 212], legF: [[198, 208], [250, 206], [304, 204]], legN: [[198, 215], [250, 217], [304, 219]], front: [[[104 + x, 216], [146, 223], [184, 224]]] });

const ART = {
  chokeSign: () => floor() +
    V({ fa: 0, head: [125, 52], neck: [125, 86], hip: [125, 160], legF: [[130, 160], [136, 204], [140, 244]], legN: [[120, 160], [115, 204], [111, 244]],
      front: [[[118, 98], [94, 120], [119, 82]], [[132, 98], [156, 120], [131, 82]]] }) +
    line([[96, 34], [102, 40]], K.act, 5) + line([[125, 22], [125, 29]], K.act, 5) + line([[154, 34], [148, 40]], K.act, 5) +
    R({ head: [254, 62], neck: [254, 94], hip: [254, 166], legN: [[250, 166], [246, 206], [242, 244]], legF: [[258, 166], [264, 206], [268, 244]],
      back: [[[260, 104], [268, 136], [270, 166]]], front: [[[248, 104], [214, 124], [180, 112]]] }) +
    bubble(178, 4, 176, 'Are you choking?', 252, 44),

  cough: () => floor() +
    V({ head: [150, 60], neck: [150, 94], hip: [152, 168], legF: [[156, 168], [162, 208], [166, 244]], legN: [[148, 168], [143, 208], [139, 244]],
      back: [[[156, 104], [176, 138], [178, 168]]], front: [[[146, 104], [120, 104], [128, 66]]] }) +
    curve(110, 56, 92, 46, 76, 58, K.ink, 4) + curve(112, 72, 90, 70, 70, 84, K.ink, 4) +
    txt(70, 40, 'cough', 18, K.ink, 'middle', 800) + chip(204, 70, 'LET THEM COUGH', K.green),

  backBlows: () => floor() +
    R({ head: [258, 46], neck: [256, 80], hip: [258, 154], legN: [[254, 154], [250, 200], [246, 244]], legF: [[262, 154], [270, 200], [276, 244]],
      back: [[[252, 92], [212, 128], [150, 140]]] }) +
    V({ fa: 150, head: [102, 96], neck: [128, 106], hip: [188, 150], legN: [[184, 150], [180, 198], [176, 244]], legF: [[194, 150], [200, 198], [206, 244]],
      back: [[[142, 112], [148, 144], [148, 172]]], front: [[[136, 114], [130, 146], [128, 176]]] }) +
    dot(150, 141, 9, K.res) +
    line([[254, 92], [212, 64], [162, 96]], K.res, 14) + dot(160, 98, 10, K.res) +
    hits(160, 82) + badge(320, 40, '5x'),

  bellyThrusts: () => floor() +
    R({ head: [186, 48], neck: [182, 82], hip: [180, 158], legN: [[176, 158], [172, 202], [170, 244]], legF: [[186, 158], [194, 202], [200, 244]],
      back: [[[186, 94], [162, 124], [132, 122]]] }) +
    V({ head: [120, 52], neck: [128, 86], hip: [140, 158], legN: [[138, 158], [132, 202], [128, 244]], legF: [[146, 158], [152, 202], [156, 244]],
      back: [[[134, 98], [120, 132], [114, 162]]] }) +
    line([[178, 94], [152, 126], [124, 124]], K.res, 14) + dot(118, 123, 11, K.res, `stroke="#fff" stroke-width="3"`) +
    curve(56, 168, 100, 172, 108, 140) + txt(56, 200, 'in and up', 15, K.act) + badge(320, 40, '5x'),

  repeatCycle: () =>
    `<g transform="translate(2,36) scale(.48)">${ART.backBlows()}</g><g transform="translate(184,36) scale(.48)">${ART.bellyThrusts()}</g>` +
    curve(110, 30, 180, 4, 250, 30, K.ink, 5) + curve(250, 196, 180, 222, 110, 196, K.ink, 5) +
    txt(90, 186, '5 back blows', 15) + txt(272, 186, '5 belly thrusts', 15) + txt(180, 252, 'until it comes out', 15, K.act),

  collapse: () => floor(232) + lying() +
    R({ fa: 120, head: [119, 86], neck: [134, 104], hip: [182, 162], legN: [[182, 162], [174, 216]], back: [[[136, 108], [135, 150], [134, 188]]], front: [[[130, 110], [129, 150], [128, 190]]] }) +
    chip(214, 40, 'START CPR', K.act),

  babyBack: () =>
    line([[330, 134], [122, 178]], K.res, 32) + dot(104, 182, 17, K.res) +
    V({ s: .8, head: [124, 152], neck: [148, 140], hip: [244, 116], legF: [[246, 112], [270, 120], [282, 108]], legN: [[244, 120], [268, 146], [262, 172]],
      front: [[[160, 146], [154, 170], [150, 190]]] }) +
    dot(116, 168, 5, K.vic) +
    line([[350, 22], [270, 46], [176, 112]], K.res, 14) + dot(174, 114, 11, K.res) +
    hits(178, 96) + badge(322, 226 - 150, '5x') + chip(12, 12, 'FACE DOWN, HEAD LOW'),

  babyChest: () =>
    line([[330, 134], [122, 178]], K.res, 32) + dot(104, 182, 17, K.res) +
    V({ s: .8, head: [124, 152], neck: [148, 140], hip: [244, 116], legF: [[246, 112], [270, 120], [282, 108]], legN: [[244, 112], [266, 88], [286, 96]],
      front: [[[160, 136], [168, 112], [180, 100]]] }) +
    dot(118, 136, 5, K.vic) +
    line([[20, 30], [110, 52], [186, 106]], K.res, 14) + dot(190, 110, 11, K.res, `stroke="#fff" stroke-width="3"`) +
    arrow(232, 50, 212, 92) + badge(322, 76, '5x') + chip(12, 12, 'FACE UP, HEAD LOW'),

  cprCheck: () => floor(232) +
    R({ fa: 120, head: [134, 76], neck: [150, 98], hip: [182, 154], legN: [[182, 154], [174, 214]],
      back: [[[156, 106], [132, 148], [108, 196]]] }) + lying() +
    line([[150, 108], [122, 150], [98, 198]], K.res, 14) +
    bubble(10, 10, 140, 'Are you OK?', 112, 60) + chip(214, 40, 'BREATHING?', K.ink),

  recovery: () =>
    V({ fa: 200, closed: true, head: [70, 128], neck: [96, 130], hip: [206, 132], legF: [[206, 128], [262, 120], [320, 116]], legN: [[206, 136], [240, 190], [292, 174]],
      back: [[[104, 124], [112, 72], [152, 60]]], front: [[[108, 138], [112, 178], [80, 146]]] }) +
    chip(196, 20, 'ON THEIR SIDE', K.green) + txt(250, 236, 'top knee bent, hand under cheek', 14, K.ink, 'middle', 700),
  cprCall: () =>
    `<rect x="62" y="22" width="112" height="210" rx="20" fill="${K.ink}"/><rect x="72" y="40" width="92" height="160" rx="10" fill="#EAF1FF"/>` +
    txt(118, 104, '911', 38, K.ink, 'middle', 900) + dot(118, 152, 20, K.green) +
    `<path d="M109,146 q9,14 18,12 l3,-5 -7,-4 -3,3 q-5,-3 -8,-9 l3,-3 -4,-7 -5,3 z" fill="#fff"/>` +
    `<path d="M186,92 q14,26 0,52 M200,80 q22,38 0,76" stroke="${K.ink}" stroke-width="5" fill="none" stroke-linecap="round"/>` +
    txt(118, 252, 'speaker on', 15) +
    `<rect x="230" y="96" width="110" height="104" rx="16" fill="${K.green}"/>` +
    `<path d="M285,182 l-30,-30 a16,16 0 0 1 30,-18 a16,16 0 0 1 30,18 z" fill="#fff"/>` +
    `<path d="M290,122 l-12,20 h10 l-6,18 16,-24 h-10 l6,-14 z" fill="${K.green}"/>` +
    txt(285, 228, 'AED', 22, K.ink, 'middle', 900) + txt(285, 252, 'get one', 15),

  cprHands: () =>
    dot(180, 18, 40, K.vic) +
    `<path d="M48,262 L48,128 Q48,76 108,70 L252,70 Q312,76 312,128 L312,262 Z" fill="${K.skin}"/>` +
    line([[180, 78], [180, 212]], '#E2B06C', 4) + dot(128, 132, 6, '#D9A35F') + dot(232, 132, 6, '#D9A35F') +
    line([[30, 236], [174, 180]], K.resF, 30) + line([[30, 206], [170, 166]], K.res, 30) +
    [154, 166, 178, 190].map(y => line([[222, y - 2], [256, y - 6]], K.resF, 11)).join('') +
    `<rect x="164" y="148" width="66" height="50" rx="22" fill="${K.resF}"/>` +
    `<rect x="160" y="136" width="66" height="52" rx="22" fill="${K.res}"/>` +
    [146, 158, 170, 182].map(y => line([[218, y], [250, y + 2]], K.res, 11)).join('') + line([[186, 140], [208, 118]], K.res, 11) +
    chip(108, 222, 'CENTER OF THE CHEST', K.act),
  cprPush: () => floor(232) +
    R({ fa: 120, head: [119, 86], neck: [134, 104], hip: [182, 162], legN: [[182, 162], [174, 216]], back: [[[136, 108], [135, 150], [134, 188]]] }) +
    lying() + line([[130, 110], [129, 150], [128, 190]], K.res, 14) +
    arrow(88, 112, 88, 170) + txt(62, 150, '2 in', 18, K.act) + chip(188, 36, '100 TO 120 / MIN', K.act),

  cprPushChild: () => floor(232) +
    R({ fa: 120, head: [123, 86], neck: [138, 104], hip: [184, 162], legN: [[184, 162], [176, 216]], back: [[[142, 110], [118, 152], [96, 198]]] }) +
    V({ s: .75, fa: -90, closed: true, head: [92, 212], neck: [112, 214], hip: [186, 216], legF: [[186, 213], [222, 212], [258, 211]], legN: [[186, 219], [222, 221], [258, 223]], front: [[[118, 220], [148, 226], [174, 226]]] }) +
    line([[136, 110], [135, 150], [134, 196]], K.res, 14) +
    arrow(94, 112, 94, 166) + txt(64, 146, '2 in', 18, K.act) + chip(214, 36, '1 OR 2 HANDS', K.ink),
  cprPushBaby: () =>
    `<rect x="40" y="204" width="290" height="16" rx="6" fill="${K.floor}"/>` +
    V({ s: .75, head: [102, 182], neck: [122, 188], hip: [202, 190], legF: [[202, 186], [228, 168], [252, 184]], legN: [[202, 194], [230, 198], [258, 200]], front: [[[128, 194], [150, 200], [172, 200]]] }) +
    line([[330, 20], [250, 70], [156, 168]], K.res, 14) + dot(154, 172, 10, K.res, `stroke="#fff" stroke-width="3"`) +
    arrow(116, 104, 130, 152) + txt(96, 96, '1.5 in', 17, K.act) + chip(14, 14, 'HEEL OF ONE HAND', K.ink),
  cprBreaths: () =>
    `<rect x="196" y="146" width="200" height="96" rx="42" fill="${K.vic}"/>` + dot(160, 178, 54, K.vic) +
    dot(152, 120, 12, K.vic) + dot(110, 140, 14, K.vic) +
    line([[352, 64], [282, 92], [222, 134]], K.res, 14) + `<ellipse cx="212" cy="140" rx="22" ry="12" fill="${K.res}" transform="rotate(34 212 140)"/>` +
    line([[16, 252], [52, 214], [92, 166]], K.resF, 14) + dot(94, 162, 10, K.resF) +
    arrow(52, 150, 70, 120, K.act, 5) +
    curve(150, 40, 118, 64, 128, 110) + badge(300, 34, '2x') + chip(12, 12, 'TILT HEAD, LIFT CHIN', K.ink),
  cprAed: () =>
    dot(180, 18, 40, K.vic) +
    `<path d="M48,262 L48,128 Q48,76 108,70 L252,70 Q312,76 312,128 L312,262 Z" fill="${K.skin}"/>` +
    `<rect x="82" y="92" width="62" height="46" rx="8" fill="#fff" stroke="${K.ink}" stroke-width="3"/>` +
    `<g transform="rotate(-24 248 196)"><rect x="216" y="172" width="62" height="46" rx="8" fill="#fff" stroke="${K.ink}" stroke-width="3"/></g>` +
    `<path d="M112,138 Q120,232 200,250 M250,218 Q262,240 214,252" stroke="${K.ink}" stroke-width="4" fill="none"/>` +
    chip(150, 106, 'PADS ON BARE SKIN', K.green),

  bleedPress: () =>
    line([[-20, 196], [380, 184]], K.vic, 74) +
    line([[160, 192], [204, 186]], K.act, 8) +
    `<rect x="116" y="138" width="130" height="50" rx="10" fill="#fff" stroke="${K.clothLine}" stroke-width="3"/>` +
    line([[226, -20], [206, 90]], K.resF, 30) + line([[150, -20], [168, 92]], K.res, 30) +
    `<rect x="132" y="86" width="104" height="60" rx="26" fill="${K.resF}"/><rect x="128" y="74" width="100" height="56" rx="26" fill="${K.res}"/>` +
    arrow(90, 70, 90, 128) + arrow(274, 70, 274, 128) + chip(12, 12, 'PRESS HARD, BOTH HANDS', K.act),

  bleedMore: () =>
    line([[-20, 196], [380, 184]], K.vic, 74) +
    `<rect x="116" y="138" width="130" height="50" rx="10" fill="#fff" stroke="${K.clothLine}" stroke-width="3"/>` + dot(184, 172, 14, K.act) + dot(200, 178, 9, K.act) +
    `<rect x="112" y="116" width="138" height="34" rx="10" fill="#fff" stroke="${K.clothLine}" stroke-width="3"/>` +
    `<rect x="120" y="96" width="122" height="30" rx="10" fill="#fff" stroke="${K.clothLine}" stroke-width="3"/>` +
    line([[226, -20], [206, 50]], K.resF, 30) + line([[150, -20], [168, 52]], K.res, 30) +
    `<rect x="132" y="52" width="104" height="52" rx="24" fill="${K.resF}"/><rect x="128" y="40" width="100" height="50" rx="24" fill="${K.res}"/>` +
    chip(12, 226, 'SOAKED? ADD MORE ON TOP', K.ink) + chip(236, 12, 'DON’T LIFT', K.act),

  bleedTq: () =>
    line([[-20, 150], [380, 150]], PAL.vic.skin, 96) + line([[-40, 150], [40, 150]], PAL.vic.shirt, 108) +
    line([[262, 140], [300, 160]], K.act, 8) +
    `<rect x="150" y="94" width="34" height="112" rx="8" fill="${K.ink}"/><rect x="132" y="80" width="70" height="16" rx="8" fill="#4B5565"/>` +
    arrow(204, 226, 254, 226, K.act, 4) + arrow(250, 226, 200, 226, K.act, 4) + txt(228, 252, '2 to 3 in', 15, K.act) +
    arrow(110, 40, 40, 40, K.ink, 5) + txt(76, 24, 'body', 14) +
    dot(310, 42, 26, '#fff', `stroke="${K.ink}" stroke-width="4"`) + line([[310, 42], [310, 26]], K.ink, 4) + line([[310, 42], [322, 48]], K.ink, 4) + txt(310, 90, 'note the time', 14),

  bleedWarm: () => floor(232) + lying() +
    `<path d="M104,224 Q100,186 140,184 L300,186 Q326,188 322,226 Z" fill="#5FB3A0"/>` +
    chip(150, 40, 'LYING DOWN AND WARM', K.green),

  babyCycle: () =>
    `<g transform="translate(0,40) scale(.5)">${ART.babyBack()}</g><g transform="translate(180,40) scale(.5)">${ART.babyChest()}</g>` +
    curve(110, 34, 180, 8, 250, 34, K.ink, 5) + curve(250, 196, 180, 222, 110, 196, K.ink, 5) +
    txt(90, 184, '5 back blows', 15) + txt(270, 184, '5 chest thrusts', 15) + txt(180, 252, 'until it comes out', 15, K.act),

  babyCheck: () =>
    `<rect x="40" y="204" width="290" height="16" rx="6" fill="${K.floor}"/>` +
    V({ s: .75, head: [102, 182], neck: [122, 188], hip: [202, 190], legF: [[202, 186], [228, 168], [252, 184]], legN: [[202, 194], [230, 198], [258, 200]], front: [[[128, 194], [150, 200], [172, 200]]] }) +
    line([[340, 40], [300, 110], [266, 176]], K.res, 14) + dot(264, 180, 10, K.res) + hits(264, 166) +
    bubble(16, 20, 150, 'Baby? Baby?', 90, 70),

  babyBreaths: () =>
    `<rect x="40" y="204" width="290" height="16" rx="6" fill="${K.floor}"/>` +
    V({ s: .75, head: [132, 182], neck: [152, 188], hip: [232, 190], legF: [[232, 186], [258, 168], [282, 184]], legN: [[232, 194], [260, 198], [288, 200]], front: [[[158, 194], [180, 200], [202, 200]]] }) +
    dot(110, 150, 24, K.res) + line([[120, 168], [100, 220], [60, 252]], K.res, 26) +
    curve(150, 120, 140, 140, 132, 160, K.act, 5) + badge(300, 60, '2x') + chip(14, 14, 'COVER MOUTH AND NOSE', K.ink),

  call911: () =>
    `<rect x="124" y="22" width="112" height="210" rx="20" fill="${K.ink}"/><rect x="134" y="40" width="92" height="160" rx="10" fill="#EAF1FF"/>` +
    txt(180, 104, '911', 38, K.ink, 'middle', 900) + dot(180, 152, 20, K.green) +
    `<path d="M171,146 q9,14 18,12 l3,-5 -7,-4 -3,3 q-5,-3 -8,-9 l3,-3 -4,-7 -5,3 z" fill="#fff"/>` +
    `<path d="M248,92 q14,26 0,52 M262,80 q22,38 0,76" stroke="${K.ink}" stroke-width="5" fill="none" stroke-linecap="round"/>` +
    txt(180, 252, 'speaker on', 15),

  // Small figures for the "who needs help" buttons.
  whoAdult: () => V({ fa: 'front', head: [180, 52], neck: [180, 86], hip: [180, 162], legF: [[186, 162], [192, 206], [196, 246]], legN: [[174, 162], [168, 206], [164, 246]], back: [[[186, 98], [204, 136], [208, 168]]], front: [[[174, 98], [156, 136], [152, 168]]] }),
  whoAdultChild: () => V({ fa: 'front', head: [140, 52], neck: [140, 86], hip: [140, 162], legF: [[146, 162], [152, 206], [156, 246]], legN: [[134, 162], [128, 206], [124, 246]], back: [[[146, 98], [166, 134], [176, 150]]], front: [[[134, 98], [116, 136], [112, 168]]] }) +
    V({ s: .68, fa: 'front', head: [214, 124], neck: [214, 148], hip: [214, 198], legF: [[218, 198], [222, 222], [224, 246]], legN: [[210, 198], [206, 222], [204, 246]], back: [[[218, 156], [230, 182], [232, 200]]], front: [[[210, 156], [194, 160], [184, 152]]] }),
  whoChild: () => V({ s: .78, fa: 'front', head: [180, 92], neck: [180, 120], hip: [180, 180], legF: [[184, 180], [189, 214], [192, 246]], legN: [[176, 180], [171, 214], [168, 246]], back: [[[184, 128], [200, 158], [204, 184]]], front: [[[176, 128], [160, 158], [156, 184]]] }),
  whoBaby: () => V({ s: .62, head: [124, 170], neck: [140, 182], hip: [204, 194], legF: [[204, 190], [228, 176], [250, 188]], legN: [[204, 198], [222, 218], [246, 222]], back: [[[150, 182], [170, 166], [186, 160]]], front: [[[146, 190], [162, 212], [180, 218]]] }) + `<rect x="80" y="232" width="200" height="10" rx="5" fill="${K.floor}"/>`,
};

const art = (id) => `<svg viewBox="0 0 360 260" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${ART[id] ? ART[id]() : ''}</svg>`;
if (typeof module !== 'undefined') module.exports = { art, ART };
