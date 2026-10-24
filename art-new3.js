// More scenes: nosebleed, heat, drowning, electric shock, asthma, low blood sugar, bites, eyes, cold.
const chair = (x, y) => `<rect x="${x}" y="${y}" width="66" height="12" rx="5" fill="${W.wood}"/><rect x="${x + 56}" y="${y - 70}" width="12" height="82" rx="5" fill="${W.woodD}"/>` + line([[x + 6, y + 10], [x + 6, 236]], W.woodD, 8) + line([[x + 60, y + 10], [x + 60, 236]], W.wood, 8);
const sun = (x, y) => dot(x, y, 26, '#F6B93B') + [0, 45, 90, 135, 180, 225, 270, 315].map(a => { const d = a * Math.PI / 180; return line([[x + Math.cos(d) * 34, y + Math.sin(d) * 34], [x + Math.cos(d) * 46, y + Math.sin(d) * 46]], '#F6B93B', 5); }).join('');
const spiral = (x, y) => `<path d="M${x},${y} q-12,-10 0,-20 q14,-10 26,4" stroke="${K.act}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
const shake = (x, y) => `<path d="M${x},${y} l-6,6 l6,6 M${x + 10},${y - 4} l-6,6 l6,6" stroke="${K.ink}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const blanketPal = { ...PAL.vic, shirt: W.blanket, shirtF: W.blanketD };
const DOC = { shirt: '#FFFFFF', shirtF: '#E3E7EE', pants: '#2E3E5C', pantsF: '#222F47', skin: '#B97A52', skinF: '#9C6440', hair: '#2A1E17' };
const glass = (x, y, fill, h = 70) => `<path d="M${x - 24},${y - h} h48 l-6,${h} h-36 z" fill="#EEF7FC" stroke="${K.ink}" stroke-width="3" stroke-linejoin="round"/><path d="M${x - 21},${y - h * 0.6} h42 l-4,${h * 0.6 - 3} h-34 z" fill="${fill}"/>`;
const bigEye = (x, y, w) => `<path d="M${x - w},${y} Q${x},${y - w * 0.75} ${x + w},${y} Q${x},${y + w * 0.75} ${x - w},${y} z" fill="#fff" stroke="${K.ink}" stroke-width="4"/>` + dot(x, y, w * 0.34, '#6B8FB5') + dot(x, y, w * 0.16, '#1B2433') + dot(x + w * 0.1, y - w * 0.1, w * 0.06, '#fff');

Object.assign(ART, {
  // Nosebleed
  noseLean: () => floor(236) + chair(160, 178) +
    V({ fa: 160, head: [148, 82], neck: [160, 110], hip: [190, 176], legN: [[186, 180], [138, 184], [136, 234]], legF: [[194, 178], [146, 178], [146, 232]],
      back: [[[166, 122], [150, 154], [140, 176]]], front: [[[158, 122], [124, 132], [124, 96]]] }) +
    `<path d="M128,104 q-4,10 2,18" stroke="#C23B32" stroke-width="5" fill="none" stroke-linecap="round"/>` +
    `<g transform="translate(286,110)">${V({ s: .55, fa: -60, head: [-10, -30], neck: [0, -12], hip: [8, 30] })}${noSign(0, 0, 40)}</g>` + txt(286, 168, 'not back', 14, K.act) +
    chip(14, 14, 'LEAN FORWARD', K.green),

  nosePinch: () => `<path d="M150,262 L150,214 Q150,196 170,196 L290,196 Q312,196 312,214 L312,262 Z" fill="${VP.shirt}"/>` + line([[210, 196], [214, 150]], VP.skin, 46) +
    face(186, 130, 214, 170, 64, 190, VP, false) +
    line([[60, 262], [86, 176]], VP.shirt, 40) + line([[86, 190], [102, 138]], VP.skin, 30) + line([[100, 142], [116, 126]], VP.skin, 14) + line([[108, 150], [134, 146]], VP.skin, 14) +
    clock(318, 52, 24) + txt(318, 96, '10 to 15', 14, K.ink) + txt(318, 112, 'minutes', 14, K.ink) + chip(14, 14, 'PINCH THE SOFT PART', K.ink),

  // Heat
  heatSigns: () => floor(246) + sun(58, 56) +
    V({ fa: 200, head: [184, 64], neck: [180, 96], hip: [184, 172], legF: [[190, 172], [200, 208], [200, 244]], legN: [[178, 172], [168, 208], [160, 244]],
      back: [[[184, 108], [206, 142], [208, 170]]], front: [[[178, 108], [162, 140], [170, 170]]] }) +
    spiral(206, 36) + drops([[160, 54], [214, 70]]) +
    [0, 1, 2].map(i => `<path d="M${120 + i * 14},120 q6,-10 0,-20 q-6,-10 0,-20" stroke="#E8752A" stroke-width="3.5" fill="none" stroke-linecap="round"/>`).join('') +
    chip(222, 120, 'CALL 911', K.act) + txt(290, 176, 'hot skin', 14, K.ink) + txt(290, 196, 'confused', 14, K.ink),

  heatTub: () => `<rect x="30" y="120" width="300" height="100" rx="40" fill="#fff" stroke="${K.ink}" stroke-width="4"/>` +
    `<rect x="36" y="140" width="288" height="74" rx="34" fill="${W.water}"/>` +
    V({ fa: 30, closed: true, head: [92, 112], neck: [104, 138], hip: [190, 168] }) +
    `<rect x="36" y="146" width="288" height="68" rx="32" fill="${W.water}" opacity=".85"/>` + `<path d="M50,150 q20,-8 40,0 t40,0 t40,0 t40,0 t40,0 t40,0" stroke="#fff" stroke-width="3" fill="none"/>` +
    line([[60, 220], [60, 246]], K.ink, 8) + line([[300, 220], [300, 246]], K.ink, 8) +
    clock(306, 58, 26) + txt(306, 104, '15 min', 14, K.ink) + chip(14, 14, 'COLD WATER UP TO THE NECK', K.ink),

  heatIce: () => floor(232) + lying() +
    coldPack(90, 178, 44, 26, 0) + coldPack(138, 196, 40, 24, 0) + coldPack(190, 194, 40, 24, 0) +
    `<g transform="translate(296,92)"><circle r="40" fill="#fff" stroke="${K.ink}" stroke-width="4"/>${[0, 120, 240].map(a => `<ellipse rx="10" ry="30" fill="#9CC9E6" transform="rotate(${a}) translate(0,-16)"/>`).join('')}<circle r="7" fill="${K.ink}"/>${line([[0, 40], [0, 100]], K.ink, 8)}</g>` +
    chip(14, 14, 'NECK, ARMPITS, GROIN', K.ink),

  heatDrink: () => floor(236) + chair(150, 178) +
    V({ fa: 180, head: [168, 82], neck: [172, 112], hip: [180, 176], legN: [[178, 180], [130, 184], [128, 234]], legF: [[186, 178], [138, 178], [138, 232]],
      back: [[[176, 124], [160, 156], [150, 172]]], front: [[[170, 124], [140, 140], [122, 120]]] }) +
    glass(118, 122, '#BFE3F5', 44) + okSign(292, 90, 26) + txt(292, 140, 'only if fully awake', 14, K.ink) + txt(292, 158, 'and can swallow', 14, K.ink),

  // Drowning
  drownReach: () => `<rect x="0" y="150" width="360" height="110" fill="${W.water}"/><path d="M0,156 q20,-8 40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0" stroke="#fff" stroke-width="3" fill="none"/>` +
    `<rect x="0" y="120" width="150" height="34" fill="#D9CDB8"/>` +
    R({ fa: 0, head: [74, 66], neck: [70, 96], hip: [56, 120], legN: [[56, 120], [30, 124]], back: [[[76, 106], [100, 116], [120, 122]]], front: [[[74, 106], [104, 104], [128, 104]]] }) +
    line([[124, 104], [256, 152]], W.wood, 8) +
    `<g>${dot(268, 160, 17, VP.skin)}${dot(264, 150, 17, VP.hair)}${dot(268, 160, 17, VP.skin)}</g>` + line([[288, 172], [304, 128]], VP.skin, 12) + dot(304, 126, 9, VP.skin) +
    `<rect x="230" y="166" width="80" height="20" fill="${W.water}"/><path d="M228,170 q12,-6 24,0 t24,0 t24,0 t24,0" stroke="#fff" stroke-width="3" fill="none"/>` +
    chip(170, 14, 'REACH OR THROW', K.green) + txt(258, 70, 'don’t go in', 15, K.act, 'middle', 900),

  drownAfter: () => floor(236) +
    V({ fa: 0, head: [130, 92], neck: [126, 122], hip: [130, 196], legN: [[132, 200], [182, 204], [208, 234]], legF: [[136, 196], [186, 192], [214, 222]], back: [[[128, 134], [152, 166], [176, 176]]], front: [[[126, 136], [148, 150], [158, 118]]] }) +
    `<path d="M92,120 Q100,90 128,82 Q156,84 160,118 L170,206 L84,210 Z" fill="${W.blanket}" opacity=".95"/>` + dot(130, 92, 18, VP.skin) + face(130, 92, 126, 122, 18, 0, VP, false) +
    curve(166, 96, 188, 86, 206, 98, K.ink, 3) + curve(168, 110, 192, 108, 212, 120, K.ink, 3) +
    chip(196, 14, 'GET CHECKED', K.act) + txt(278, 150, 'coughing,', 14, K.ink) + txt(278, 168, 'sleepy, confused', 14, K.ink),

  // Electric shock
  elecOff: () => `<rect x="70" y="40" width="110" height="160" rx="14" fill="#fff" stroke="${K.ink}" stroke-width="4"/>` +
    [90, 150].map(y => `<rect x="104" y="${y - 22}" width="42" height="40" rx="12" fill="#EEF1F5" stroke="${K.ink}" stroke-width="3"/><rect x="114" y="${y - 12}" width="6" height="14" rx="2" fill="${K.ink}"/><rect x="130" y="${y - 12}" width="6" height="14" rx="2" fill="${K.ink}"/>`).join('') +
    `<rect x="196" y="72" width="40" height="34" rx="8" fill="#4B5565"/>` + line([[236, 90], [300, 70], [360, 80]], '#4B5565', 8) + line([[198, 82], [178, 82]], '#9AA3AE', 4) + line([[198, 96], [178, 96]], '#9AA3AE', 4) +
    forearm(330, 160, 258, 116, 380, 220) + mitten(234, 96, 180) + arrow(250, 50, 300, 50, K.act, 5) +
    `<path d="M40,118 l14,-24 h-10 l8,-20 l-18,28 h10 z" fill="#F2C94C" stroke="${K.ink}" stroke-width="2"/>` + chip(14, 214, 'POWER OFF FIRST', K.act),

  elecLine: () => floor(236) + `<rect x="40" y="30" width="14" height="206" fill="${W.woodD}"/><rect x="20" y="40" width="54" height="10" rx="4" fill="${W.woodD}"/>` +
    `<path d="M70,44 Q120,120 136,226 Q150,236 190,230" stroke="${K.ink}" stroke-width="5" fill="none"/>` +
    `<path d="M186,214 l8,-14 l4,12 l8,-10" stroke="#F2C94C" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
    R({ fa: 180, head: [300, 70], neck: [300, 100], hip: [302, 170], legN: [[298, 170], [292, 206], [288, 234]], legF: [[306, 170], [312, 206], [316, 234]], back: [[[304, 112], [330, 134], [344, 154]]], front: [[[296, 112], [270, 108], [246, 104]]] }) +
    arrow(232, 150, 262, 150, K.act, 5) + chip(186, 14, 'STAY FAR AWAY', K.act),

  // Asthma
  asthmaSit: () => floor(236) + chair(160, 178) +
    V({ fa: 165, head: [150, 84], neck: [162, 112], hip: [190, 176], legN: [[186, 180], [138, 184], [136, 234]], legF: [[194, 178], [146, 178], [146, 232]],
      back: [[[168, 124], [158, 154], [150, 178]]], front: [[[160, 124], [146, 156], [138, 182]]] }) +
    curve(118, 84, 98, 76, 84, 88, K.ink, 3) + curve(116, 98, 96, 98, 80, 110, K.ink, 3) +
    chip(150, 14, 'SIT UP, LEAN FORWARD', K.green),

  inhaler: () => `<path d="M170,262 L170,214 Q170,196 190,196 L300,196 Q322,196 322,214 L322,262 Z" fill="${VP.shirt}"/>` + line([[226, 196], [230, 150]], VP.skin, 46) +
    face(216, 116, 246, 160, 76, 180, VP, false) +
    `<rect x="60" y="112" width="90" height="40" rx="18" fill="#DDEBF7" stroke="${K.ink}" stroke-width="3"/>` +
    `<rect x="36" y="96" width="30" height="62" rx="9" fill="#3E7BD6"/><rect x="40" y="70" width="22" height="30" rx="6" fill="#2B5DA8"/>` +
    line([[60, 262], [56, 170]], VP.skin, 26) + chip(186, 14, 'THEIR OWN INHALER', K.ink) + txt(96, 188, 'spacer', 14, K.ink),

  // Low blood sugar
  sugarSigns: () => floor(246) +
    V({ fa: 180, head: [170, 64], neck: [172, 96], hip: [176, 172], legF: [[182, 172], [188, 208], [192, 244]], legN: [[170, 172], [164, 208], [160, 244]],
      back: [[[178, 108], [196, 140], [200, 170]]], front: [[[170, 108], [148, 140], [150, 170]]] }) +
    shake(120, 120) + shake(220, 120) + drops([[140, 54], [204, 56]]) + spiral(192, 30) +
    chip(222, 14, 'DIABETES?', K.ink) + txt(290, 150, 'shaky, sweaty', 14, K.ink) + txt(290, 170, 'confused', 14, K.ink),

  sugarJuice: () => glass(60, 170, '#F5A623') + txt(60, 198, '1/2 cup', 13, K.ink) + txt(60, 214, 'juice', 13, K.ink) +
    `<rect x="122" y="96" width="44" height="74" rx="10" fill="#D93A3A"/><rect x="122" y="112" width="44" height="16" fill="#fff" opacity=".85"/>` + txt(144, 198, 'regular', 13, K.ink) + txt(144, 214, 'soda', 13, K.ink) +
    [[214, 120], [238, 120], [226, 144]].map(([x, y]) => `<rect x="${x - 10}" y="${y - 10}" width="20" height="20" rx="6" fill="#fff" stroke="${K.ink}" stroke-width="2.5"/>`).join('') + txt(226, 198, 'glucose', 13, K.ink) + txt(226, 214, 'tablets', 13, K.ink) +
    `<ellipse cx="310" cy="150" rx="26" ry="12" fill="#D7DCE3" stroke="${K.ink}" stroke-width="3"/><path d="M296,146 q14,-12 28,0" fill="#fff"/>` + line([[334, 146], [356, 118]], '#9AA3AE', 7) + txt(310, 198, 'sugar', 13, K.ink) + txt(310, 214, 'or honey', 13, K.ink) +
    chip(14, 14, 'ONLY IF THEY CAN SWALLOW', K.act),

  sugarWait: () => clock(80, 110, 56) + txt(80, 196, '10 minutes', 16, K.ink) +
    `<g transform="translate(236,70)"><rect x="-34" y="-20" width="68" height="44" rx="8" fill="#E9C77B" stroke="${K.ink}" stroke-width="3"/>${[-18, 0, 18].map(x => dot(x, 2, 3, '#A8823A')).join('')}</g>` + okSign(286, 44, 16) + txt(236, 122, 'better: a snack', 14, K.ink) +
    phoneMini(236, 186, .55) + txt(300, 194, 'not better:', 13, K.act, 'middle', 800) + txt(300, 212, 'call 911', 13, K.act, 'middle', 800),

  // Bites
  dogAway: () => floor(236) +
    `<g transform="translate(96,170)"><ellipse cx="0" cy="0" rx="52" ry="26" fill="#A87C5A"/><circle cx="-52" cy="-26" r="24" fill="#A87C5A"/><ellipse cx="-62" cy="-48" rx="9" ry="16" fill="#7A5638" transform="rotate(-20 -62 -48)"/><ellipse cx="-74" cy="-22" rx="14" ry="10" fill="#A87C5A"/><circle cx="-84" cy="-24" r="5" fill="${K.ink}"/><circle cx="-56" cy="-32" r="3.5" fill="${K.ink}"/>` +
    [-34, -14, 18, 36].map(x => line([[x, 16], [x, 64]], '#8E6646', 12)).join('') + line([[48, -10], [72, -34]], '#A87C5A', 10) + `</g>` +
    R({ fa: 180, head: [262, 66], neck: [266, 96], hip: [272, 170], legN: [[268, 170], [256, 204], [250, 234]], legF: [[276, 170], [296, 204], [308, 232]], back: [[[270, 108], [292, 136], [300, 162]]], front: [[[264, 108], [240, 120], [222, 112]]] }) +
    arrow(300, 46, 342, 46, K.act, 5) + chip(14, 14, 'GET AWAY FIRST', K.ink),

  washWound: () => faucet(126, 42) + stream(126, 70, 152, 22) + forearmSide(40, 172, 262, 156, 44, VP) + stream(126, 70, 146, 22) +
    `<rect x="196" y="96" width="50" height="30" rx="12" fill="#F8C8D8"/>` + [[188, 82, 8], [206, 72, 6], [222, 84, 7], [250, 90, 5]].map(([x, y, r]) => dot(x, y, r, '#fff', `stroke="#9CC9E6" stroke-width="2"`)).join('') +
    chip(150, 214, 'SOAP AND RUNNING WATER', K.ink),

  bandage: () => forearmSide(36, 150, 262, 138, 44, VP) +
    `<rect x="110" y="114" width="96" height="52" rx="10" fill="#fff" stroke="${W.clothL}" stroke-width="3"/>` + [126, 146, 166, 186].map(x => line([[x, 118], [x, 162]], '#E3E7EE', 3)).join('') +
    chip(14, 14, 'CLEAN BANDAGE', K.green),

  doctor: () => floor(246) +
    fig({ pal: DOC, fa: 180, head: [200, 62], neck: [200, 94], hip: [202, 170], legF: [[208, 170], [212, 208], [214, 244]], legN: [[196, 170], [192, 208], [190, 244]], back: [[[206, 106], [224, 138], [228, 168]]], front: [[[196, 106], [176, 132], [160, 124]]] }) +
    `<rect x="140" y="104" width="34" height="44" rx="5" fill="${W.wood}"/><rect x="146" y="112" width="22" height="30" fill="#fff"/>` + line([[192, 98], [198, 130]], '#4B5565', 4) +
    `<g transform="translate(80,110)"><rect x="-34" y="-34" width="68" height="68" rx="16" fill="${K.green}"/><path d="M-8,-22 h16 v14 h14 v16 h-14 v14 h-16 v-14 h-14 v-16 h14 z" fill="#fff"/></g>` +
    chip(176, 14, 'SEE A DOCTOR TODAY', K.ink) + txt(80, 182, 'infection, tetanus,', 13, K.ink) + txt(80, 200, 'rabies', 13, K.ink),

  // Eyes
  eyeRinse: () => shoulders(150, 222, 200, VP) + frontFace(150, 140, 76, VP) +
    `<g transform="rotate(-38 236 56)"><path d="M212,26 h48 l-6,62 h-36 z" fill="#EEF7FC" stroke="${K.ink}" stroke-width="3" stroke-linejoin="round"/><path d="M215,50 h42 l-4,36 h-34 z" fill="${W.water}"/></g>` +
    `<path d="M214,84 Q196,104 184,128" stroke="${W.water}" stroke-width="12" fill="none" stroke-linecap="round"/>` + drops([[214, 150], [226, 172], [208, 186]]) +
    line([[60, 262], [92, 170]], VP.skin, 22) + line([[92, 170], [160, 116]], VP.skin, 9) +
    clock(316, 140, 24) + txt(316, 182, '15 min', 14, K.ink) + chip(14, 14, 'RINSE IT, HOLD IT OPEN', K.ink),

  eyeCup: () => shoulders(150, 214, 200, VP) + frontFace(150, 120, 80, VP) +
    `<path d="M178,88 h56 l-8,60 h-40 z" fill="#fff" stroke="${K.ink}" stroke-width="3" transform="rotate(8 206 118)"/>` +
    `<rect x="160" y="80" width="90" height="10" rx="3" fill="#E9D9A6" transform="rotate(-20 205 85)"/>` +
    chip(196, 214, 'DON’T PULL IT OUT', K.act),

  eyeBlink: () => bigEye(150, 130, 110) + [[96, 70], [118, 58], [206, 64]].map(([x, y]) => `<path d="M${x},${y - 12} q8,10 0,16 q-8,-6 0,-16 z" fill="${W.waterD}"/>`).join('') +
    chip(14, 14, 'BLINK AND RINSE', K.green),

  eyeCold: () => shoulders(150, 214, 200, VP) + frontFace(150, 120, 80, VP) + `<path d="M170,104 q18,-6 34,4" stroke="#B9706A" stroke-width="6" fill="none" stroke-linecap="round"/>` +
    coldPack(226, 70, 70, 44, 18) + line([[300, 262], [298, 170], [276, 116]], VP.skin, 24) + chip(14, 14, 'NO PRESSURE ON THE EYE', K.ink),

  // Cold
  hypoWarm: () => floor(236) + [[30, 40], [70, 80], [40, 130], [96, 30]].map(([x, y]) => `<path d="M${x - 8},${y} h16 M${x},${y - 8} v16 M${x - 6},${y - 6} l12,12 M${x + 6},${y - 6} l-12,12" stroke="#9CC9E6" stroke-width="3" stroke-linecap="round"/>`).join('') +
    `<path d="M220,236 V120 L280,76 L340,120 V236 Z" fill="#E9C77B"/><rect x="262" y="170" width="38" height="66" rx="4" fill="#A97C50"/>` +
    V({ fa: 0, head: [120, 70], neck: [118, 100], hip: [120, 174], legF: [[126, 174], [138, 208], [146, 236]], legN: [[114, 174], [104, 208], [98, 236]], back: [[[122, 112], [146, 138], [168, 140]]] }) +
    R({ fa: 0, head: [170, 66], neck: [168, 96], hip: [170, 172], legF: [[176, 172], [188, 206], [196, 236]], legN: [[164, 172], [154, 206], [148, 236]], front: [[[164, 108], [140, 120], [124, 124]]] }) +
    drops([[104, 150], [132, 160]]) + arrow(108, 26, 168, 26, K.act, 5) + chip(196, 14, 'SOMEWHERE WARM', K.green),

  hypoWrap: () => floor(232) + `<rect x="30" y="218" width="300" height="12" rx="6" fill="#B9A58A"/>` + lying() +
    `<path d="M40,206 Q38,176 66,170 Q92,170 104,186 L300,186 Q326,190 322,226 L44,228 Z" fill="${W.blanket}"/>` + face(66, 206, 94, 210, 17, -90, VP, true) +
    `<path d="M48,196 Q50,176 70,176" stroke="${W.blanketD}" stroke-width="10" fill="none" stroke-linecap="round"/>` +
    chip(14, 14, 'COVER THE HEAD AND NECK TOO', K.green),

  hotDrink: () => `<g transform="translate(110,150)"><rect x="-40" y="-50" width="80" height="84" rx="14" fill="#fff" stroke="${K.ink}" stroke-width="4"/><path d="M40,-30 q30,0 30,24 q0,24 -30,24" stroke="${K.ink}" stroke-width="6" fill="none"/>` +
    [-16, 0, 16].map(x => `<path d="M${x},-62 q-8,-12 0,-24 q8,-12 0,-24" stroke="#C9CFD8" stroke-width="4" fill="none" stroke-linecap="round"/>`).join('') + `</g>` + okSign(160, 104, 18) +
    `<g transform="translate(270,130)"><rect x="-14" y="-40" width="28" height="72" rx="8" fill="#8C5A2E"/><rect x="-7" y="-58" width="14" height="22" rx="4" fill="#8C5A2E"/>${noSign(0, -4, 44)}</g>` +
    chip(14, 214, 'WARM AND SWEET, NO ALCOHOL', K.ink),
});

// Bleeding scenes redrawn with real hands: the helper presses with both hands, sleeves in blue.
const pressHands = (cx, top, y) =>
  line([[cx - 46, top], [cx - 30, y - 50]], B.sleeve, 34) + line([[cx + 52, top], [cx + 34, y - 50]], B.sleeveF, 34) +
  line([[cx - 30, y - 50], [cx - 20, y - 16]], B.hand, 26) + line([[cx + 34, y - 50], [cx + 24, y - 16]], B.handF, 26) +
  `<rect x="${cx - 50}" y="${y - 22}" width="104" height="40" rx="18" fill="${B.handF}"/><rect x="${cx - 54}" y="${y - 32}" width="100" height="38" rx="18" fill="${B.hand}"/>` +
  [-30, -12, 6, 24].map(d => line([[cx + d, y - 26], [cx + d, y - 4]], '#B97A50', 3)).join('');
Object.assign(ART, {
  bleedPress: () => forearmSide(30, 200, 300, 186, 72, VP) + `<path d="M150,196 l40,-6" stroke="${K.act}" stroke-width="7" stroke-linecap="round"/>` +
    `<rect x="112" y="150" width="136" height="50" rx="10" fill="#fff" stroke="${W.clothL}" stroke-width="3"/>` + pressHands(178, -30, 150) +
    arrow(84, 70, 84, 130) + arrow(282, 70, 282, 130) + chip(12, 12, 'PRESS HARD, BOTH HANDS', K.act),
  bleedMore: () => forearmSide(30, 200, 300, 186, 72, VP) +
    `<rect x="112" y="150" width="136" height="50" rx="10" fill="#fff" stroke="${W.clothL}" stroke-width="3"/>` + dot(176, 186, 13, K.act) + dot(194, 190, 8, K.act) +
    `<rect x="108" y="128" width="144" height="32" rx="10" fill="#fff" stroke="${W.clothL}" stroke-width="3"/><rect x="116" y="108" width="128" height="30" rx="10" fill="#fff" stroke="${W.clothL}" stroke-width="3"/>` +
    pressHands(180, -40, 108) + chip(12, 226, 'SOAKED? ADD MORE ON TOP', K.ink) + chip(236, 12, 'DON’T LIFT', K.act),
});
