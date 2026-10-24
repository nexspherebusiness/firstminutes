// More scenes: heart attack, allergy, poisoning, head injury, broken bone.
const wall = (x) => `<rect x="${x}" y="0" width="22" height="236" fill="#DCD6CA"/>`;
const drops = (pts) => pts.map(([x, y]) => `<path d="M${x},${y - 8} q6,8 0,12 q-6,-4 0,-12 z" fill="${W.waterD}"/>`).join('');
const zig = (x, y) => `<path d="M${x - 10},${y} l6,-8 l6,8 l6,-8" stroke="${K.act}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const pen = (x, y, rot) => `<g transform="translate(${x},${y}) rotate(${rot})"><rect x="-11" y="-74" width="22" height="64" rx="8" fill="#F2C94C"/><rect x="-9" y="-92" width="18" height="20" rx="5" fill="#3E7BD6"/><rect x="-10" y="-14" width="20" height="16" rx="6" fill="#E8752A"/></g>`;
const bottle = (x, y, c = '#fff', cap = K.act) => `<rect x="${x - 22}" y="${y - 50}" width="44" height="64" rx="10" fill="${c}" stroke="${K.ink}" stroke-width="3"/><rect x="${x - 16}" y="${y - 64}" width="32" height="16" rx="5" fill="${cap}"/><rect x="${x - 14}" y="${y - 30}" width="28" height="22" rx="4" fill="#EEF1F5"/>`;

Object.assign(ART, {
  // Heart attack
  heartSigns: () => floor(246) +
    V({ pal: OLD, fa: 180, head: [168, 60], neck: [172, 92], hip: [178, 170], legF: [[184, 170], [188, 208], [192, 244]], legN: [[172, 170], [168, 208], [166, 244]],
      back: [[[180, 104], [196, 140], [200, 170]]], front: [[[168, 104], [146, 130], [166, 122]]] }) +
    `<path d="M128,112 l-14,-6 M128,126 l-18,0 M130,140 l-14,8" stroke="${K.act}" stroke-width="4" stroke-linecap="round"/>` + zig(160, 84) + zig(214, 136) + drops([[138, 52], [204, 58]]) +
    chip(196, 14, 'CHEST PAIN?', K.act) + txt(298, 112, 'arm, jaw, back', 14, K.ink) + txt(298, 132, 'short of breath', 14, K.ink) + txt(298, 152, 'cold sweat', 14, K.ink),

  heartRest: () => floor(236) + wall(14) +
    V({ pal: OLD, fa: 0, head: [74, 108], neck: [68, 138], hip: [70, 212], legF: [[76, 214], [126, 176], [146, 234]], legN: [[70, 218], [118, 186], [136, 236]],
      back: [[[70, 150], [100, 182], [124, 182]]], front: [[[66, 152], [92, 190], [118, 192]]] }) +
    R({ fa: 180, head: [222, 100], neck: [216, 130], hip: [232, 194], legN: [[232, 194], [222, 236]], back: [[[220, 142], [178, 160], [140, 168]]], front: [[[214, 142], [150, 140], [94, 142]]] }) +
    chip(196, 14, 'SIT AND REST', K.green),

  aspirin: () => bottle(70, 150, '#fff', '#E8EDF3') + txt(70, 136, 'aspirin', 11, K.ink) +
    dot(170, 96, 24, '#fff', `stroke="${K.ink}" stroke-width="3"`) + line([[156, 96], [184, 96]], K.floor, 3) + txt(170, 148, '1 × 325 mg', 16, K.ink) +
    txt(228, 104, 'or', 15, K.ink, 'middle', 700) +
    [[272, 84], [296, 84], [272, 108], [296, 108]].map(([x, y]) => dot(x, y, 10, '#FBE3B8', `stroke="${K.ink}" stroke-width="2.5"`)).join('') + txt(284, 148, '2 to 4 × 81 mg', 16, K.ink) +
    chip(14, 14, 'CHEW IT', K.ink) + txt(180, 206, 'Only if not allergic and no doctor said no', 14, K.act, 'middle', 800) + txt(180, 228, 'Not sure? Wait for 911.', 14, K.ink, 'middle', 700),

  // Allergic reaction
  allergySigns: () => shoulders(140, 214, 190, VP) + frontFace(140, 120, 78, VP, { mouth: 'open' }) +
    `<ellipse cx="140" cy="160" rx="30" ry="15" fill="#D9615A"/><ellipse cx="140" cy="160" rx="12" ry="5" fill="#8A3B2E"/>` +
    [[96, 132], [104, 146], [180, 130], [186, 146], [120, 214], [160, 220], [92, 120]].map(([x, y]) => dot(x, y, 5, '#E36B6B', 'opacity=".85"')).join('') +
    `<g transform="translate(286,150)"><ellipse cx="0" cy="0" rx="22" ry="15" fill="#F2C94C"/><path d="M-10,-14 v28 M2,-15 v30" stroke="${K.ink}" stroke-width="5"/><ellipse cx="-4" cy="-18" rx="12" ry="8" fill="#DDEBF7" opacity=".9"/><circle cx="22" cy="0" r="7" fill="${K.ink}"/></g>` +
    chip(206, 14, 'SWELLING? HIVES?', K.act) + txt(286, 206, 'after food,', 14, K.ink) + txt(286, 224, 'a sting or medicine', 14, K.ink),

  epiThigh: () => line([[300, 160], [330, 290]], VP.pantsF, 86) + line([[-30, 168], [300, 160]], VP.pants, 104) + line([[-30, 120], [300, 112]], '#6A7486', 6) +
    pen(176, 112, 0) + forearm(276, 30, 206, 62, 360, -10) + mitten(184, 56, 180) +
    arrow(132, 30, 132, 88) + txt(240, 112, 'click', 18, K.act, 'start', 900) + clock(310, 60, 22) + txt(310, 100, 'hold', 13, K.ink) +
    chip(14, 214, 'OUTER THIGH, THROUGH CLOTHES', K.ink),

  allergyRest: () => floor(236) + line([[180, 70], [180, 236]], K.floor, 3) +
    V({ fa: 0, head: [70, 116], neck: [66, 146], hip: [70, 212], legN: [[72, 216], [120, 214], [160, 228]], legF: [[76, 212], [124, 206], [164, 220]], back: [[[68, 156], [90, 186], [110, 196]]], front: [[[64, 158], [80, 192], [100, 204]]] }) +
    `<path d="M100,104 q12,-6 20,2 M104,92 q16,-8 26,4" stroke="${K.ink}" stroke-width="3" fill="none" stroke-linecap="round"/>` +
    `<g transform="translate(180,118) scale(.5)">` + `<rect x="236" y="186" width="92" height="44" rx="14" fill="${W.pillow}" stroke="${W.clothL}" stroke-width="2"/>` +
    V({ fa: -90, closed: true, head: [66, 206], neck: [94, 210], hip: [198, 212], legF: [[198, 207], [252, 186], [310, 176]], legN: [[198, 214], [256, 192], [314, 182]], front: [[[104, 216], [146, 223], [184, 224]]] }) + `</g>` +
    txt(90, 30, 'hard to breathe:', 13, K.ink) + txt(90, 50, 'sit up', 17, K.green, 'middle', 900) + txt(270, 30, 'feels faint:', 13, K.ink) + txt(270, 50, 'lie down, legs up', 17, K.green, 'middle', 900),

  // Poisoning
  poisonCall: () => `<g transform="translate(100,124) scale(1.5)"><rect x="-34" y="-62" width="68" height="124" rx="13" fill="${K.ink}"/><rect x="-27" y="-50" width="54" height="94" rx="7" fill="#EAF1FF"/>` +
    txt(0, -18, 'Poison', 12, K.ink, 'middle', 900) + txt(0, -4, 'Control', 12, K.ink, 'middle', 900) + dot(0, 24, 11, K.green) + `</g>` +
    bottle(250, 132, '#7FC4E8', '#F2F4F7') + bottle(310, 156, '#fff', K.act) +
    txt(240, 220, '1 800 222 1222', 24, K.ink, 'middle', 900) + chip(196, 14, 'FREE, 24 HOURS', K.green),

  poisonNoVomit: () => `<g transform="translate(90,116)"><path d="M-26,-40 h52 l-8,84 h-36 z" fill="#DDF0FA" stroke="${K.ink}" stroke-width="3" stroke-linejoin="round"/>${noSign(0, 0, 58)}</g>` +
    txt(90, 202, 'no food or drink', 15, K.ink) + txt(90, 222, 'unless told to', 15, K.ink) +
    bottle(266, 128, '#fff', K.act) + okSign(300, 82, 20) + txt(266, 202, 'keep the', 15, K.ink) + txt(266, 222, 'container', 15, K.ink) +
    chip(14, 14, 'DON’T MAKE THEM VOMIT', K.act),

  rinseSkin: () => faucet(126, 42) + stream(126, 70, 152, 22) + forearmSide(40, 172, 262, 156, 44, VP) + stream(126, 70, 146, 22) +
    clock(306, 66, 26) + chip(166, 214, 'AT LEAST 15 MINUTES', K.ink),

  naloxone: () => floor(232) + lying() +
    R({ fa: 150, head: [112, 104], neck: [130, 126], hip: [176, 172], legN: [[176, 172], [166, 222]], back: [[[134, 138], [112, 170], [90, 196]]] }) +
    `<g transform="translate(74,182) rotate(-30)"><rect x="-8" y="-28" width="16" height="30" rx="6" fill="#fff" stroke="${K.ink}" stroke-width="2.5"/><rect x="-4" y="-40" width="8" height="14" rx="3" fill="#F2F4F7" stroke="${K.ink}" stroke-width="2.5"/></g>` +
    line([[128, 140], [100, 168], [86, 176]], RP.skin, 13) + chip(166, 14, 'NALOXONE IN THE NOSE', K.ink) + txt(262, 66, 'then CPR', 16, K.act, 'middle', 900),

  // Head injury
  headStill: () => floor(232) + lying(1, 36) +
    R({ fa: 0, head: [36, 120], neck: [36, 150], hip: [34, 214], legN: [[34, 214], [24, 236]], back: [[[40, 160], [74, 186], [92, 196]]], front: [[[34, 162], [70, 214], [94, 224]]] }) +
    chip(124, 14, 'KEEP HEAD AND NECK STILL', K.ink),

  coldHead: () => shoulders(150, 214, 200, VP) + frontFace(150, 120, 80, VP) + `<ellipse cx="196" cy="74" rx="18" ry="12" fill="#E99A8A" opacity=".8"/>` +
    coldPack(176, 40, 74, 44, -14) + line([[250, 262], [268, 170], [236, 90]], VP.skin, 24) + chip(14, 14, 'UP TO 20 MINUTES', K.ink),

  watch24: () => `<rect x="40" y="150" width="240" height="70" rx="18" fill="#C9B79C"/><rect x="40" y="128" width="240" height="40" rx="14" fill="#D9C7AC"/>` +
    V({ fa: 'front', closed: true, head: [110, 84], neck: [110, 112], hip: [110, 166], legN: [[104, 168], [100, 206], [98, 236]], legF: [[116, 168], [120, 206], [122, 236]], front: [[[102, 122], [92, 152], [104, 168]], [[118, 122], [130, 152], [126, 168]]] }) +
    R({ fa: 'front', head: [210, 84], neck: [210, 112], hip: [210, 166], legN: [[204, 168], [200, 206], [198, 236]], legF: [[216, 168], [220, 206], [222, 236]], front: [[[202, 122], [170, 140], [136, 132]], [[218, 122], [230, 152], [226, 168]]] }) +
    clock(312, 70, 30) + txt(312, 122, '24 h', 18, K.ink, 'middle', 900) + chip(14, 14, 'DON’T LEAVE THEM ALONE', K.ink),

  // Broken bone
  boneStill: () => pillow(40, 150, 260, 60) +
    line([[-20, 150], [120, 140]], VP.shirt, 58) + line([[100, 140], [190, 150], [270, 132]], VP.skin, 44) +
    `<g transform="translate(270,132) rotate(-12)"><rect x="-6" y="-24" width="62" height="48" rx="22" fill="${VP.skin}"/></g>` +
    `<path d="M190,124 l-8,-10 M192,122 l2,-14 M196,124 l10,-10" stroke="${K.act}" stroke-width="4" stroke-linecap="round"/>` +
    `<g transform="translate(250,64)">${curve(-40, 10, 0, -26, 40, 10, K.ink, 5)}${noSign(0, 0, 34)}</g>` +
    chip(14, 14, 'KEEP IT AS YOU FOUND IT', K.ink),

  boneCold: () => pillow(30, 160, 300, 56) +
    line([[-20, 150], [200, 156]], VP.pants, 64) + line([[180, 156], [300, 150]], VP.skin, 40) +
    `<ellipse cx="318" cy="128" rx="20" ry="30" fill="${SHOE}"/>` + coldPack(214, 116, 72, 44, -4) +
    `<rect x="208" y="140" width="84" height="20" rx="8" fill="#fff" opacity=".7"/>` + chip(14, 14, 'UP TO 20 MINUTES', K.ink) + txt(240, 84, 'cold pack in a cloth', 15, K.ink),
});
