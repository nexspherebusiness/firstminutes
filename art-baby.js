// Detailed scenes with real hands and a real baby. The person who needs help wears amber, the helper's sleeves are blue.
const B = { skin: '#F7CFAE', skinF: '#E9B48C', adult: '#E9B98F', adultF: '#D29A6C', onesie: '#F2A541', onesieF: '#D98A2B', diaper: '#FFFFFF', diaperLine: '#D5DBE3', hair: '#8A5A3B', hairDark: '#3E2A20', face: '#6B3F2A', blush: '#F3A39A', hand: '#C98A5E', handF: '#A9703F', sleeve: '#2F6FED', sleeveF: '#1D4BAF' };

const paw = (x, y, r, c) => dot(x, y, r, c);

// Baby lying along the x axis, head centre at (0,0), feet towards +x.
// pose 'down' = face down (we see the back of the head), 'up' = face up (we see the face).
function baby(pose) {
  let o = '';
  if (pose === 'down') {
    o += line([[150, 14], [176, 46], [164, 74]], B.skinF, 20) + paw(164, 76, 10, B.skinF);
    o += line([[44, 18], [36, 54]], B.skinF, 16) + paw(35, 58, 9, B.skinF);
    o += `<rect x="22" y="-26" width="120" height="58" rx="28" fill="${B.onesie}"/>`;
    o += `<rect x="118" y="-24" width="52" height="54" rx="24" fill="${B.diaper}" stroke="${B.diaperLine}" stroke-width="3"/>`;
    o += line([[146, 18], [168, 56], [152, 84]], B.skin, 22) + `<ellipse cx="146" cy="88" rx="13" ry="9" fill="${B.skin}"/>`;
    o += line([[52, 20], [48, 62]], B.skin, 17) + paw(48, 66, 10, B.skin);
    o += dot(0, 0, 36, B.skin);
    o += `<path d="M-8,-35 q12,-14 26,-2 q-9,0 -12,9 z" fill="${B.hair}"/><path d="M10,-36 q16,-6 24,10" stroke="${B.hair}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    o += `<ellipse cx="10" cy="2" rx="7" ry="9" fill="${B.skinF}"/>`;
    o += `<path d="M-24,14 q6,6 12,2" stroke="${B.face}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    o += dot(-16, 24, 6, B.blush, 'opacity=".7"');
  } else {
    o += line([[150, -6], [178, -38], [200, -22]], B.skinF, 20) + paw(204, -20, 10, B.skinF);
    o += `<rect x="22" y="-26" width="120" height="58" rx="28" fill="${B.onesie}"/>`;
    o += `<rect x="118" y="-24" width="52" height="54" rx="24" fill="${B.diaper}" stroke="${B.diaperLine}" stroke-width="3"/>`;
    o += line([[150, 0], [170, -36], [194, -30]], B.skin, 22) + `<ellipse cx="200" cy="-30" rx="12" ry="9" fill="${B.skin}"/>`;
    o += line([[40, -16], [22, -46]], B.skin, 17) + paw(19, -50, 10, B.skin);
    o += dot(0, 0, 36, B.skin);
    o += `<path d="M-2,34 q-26,2 -34,-18" stroke="${B.hair}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    o += `<ellipse cx="12" cy="4" rx="7" ry="9" fill="${B.skinF}"/>`;
    o += `<path d="M-20,-14 q6,5 12,0" stroke="${B.face}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    o += `<path d="M-30,-30 q-6,-6 -2,-12" stroke="${B.skinF}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
    o += `<path d="M-31,-9 q4,4 8,2" stroke="${B.face}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    o += dot(-6, -4, 6, B.blush, 'opacity=".7"');
  }
  return o;
}

// The helper's arm: blue sleeve from (sx,sy) to the elbow, bare forearm to the wrist.
const forearm = (ex, ey, wx, wy, sx, sy) => line([[sx, sy], [ex, ey]], B.sleeve, 40) + line([[ex, ey], [wx, wy]], B.hand, 28);
// A flat hand seen from the side: palm and fingers in one shape, fingers pointing at angle a (degrees), thumb on top.
const mitten = (x, y, a, c = B.hand) => `<g transform="translate(${x},${y}) rotate(${a})"><rect x="-20" y="-14" width="50" height="28" rx="14" fill="${c}"/><path d="M-6,-10 L10,-22" stroke="${c}" stroke-width="11" stroke-linecap="round"/></g>`;

// Baby held along the helper's forearm, head lower than the chest.
const onForearm = (pose, under) => `<g transform="translate(70,172) rotate(-20)">` +
  line([[300, 64], [470, 64]], B.sleeve, 42) + line([[40, 64], [300, 64]], B.hand, 30) +
  `<g transform="translate(40,20)">${baby(pose)}</g>` + under + `</g>`;

Object.assign(ART, {
  babyBack: () =>
    onForearm('down', `<ellipse cx="22" cy="62" rx="24" ry="14" fill="${B.hand}"/>` + line([[26, 52], [10, 36]], B.hand, 11)) +
    forearm(244, 34, 196, 92, 330, -26) + mitten(178, 108, 160) +
    hits(176, 84) + badge(322, 118, '5x') + chip(12, 12, 'FACE DOWN, HEAD LOW'),

  babyChest: () =>
    onForearm('up', `<ellipse cx="30" cy="60" rx="26" ry="14" fill="${B.hand}"/>`) +
    forearm(244, 30, 194, 92, 330, -30) + mitten(174, 110, 160) +
    arrow(118, 52, 142, 96) + badge(322, 118, '5x') + chip(12, 12, 'FACE UP, HEAD LOW'),

  cprPushBaby: () =>
    `<rect x="20" y="214" width="320" height="18" rx="7" fill="${K.floor}"/>` +
    `<g transform="translate(92,166)">${baby('up')}</g>` +
    forearm(232, 52, 184, 112, 336, -16) + mitten(164, 126, 180) +
    arrow(112, 70, 132, 112) + txt(96, 62, '1.5 in', 17, K.act) + chip(14, 14, 'HEEL OF ONE HAND', K.ink),

  babyCheck: () =>
    `<rect x="20" y="214" width="320" height="18" rx="7" fill="${K.floor}"/>` +
    `<g transform="translate(92,166)">${baby('up')}</g>` +
    forearm(346, 40, 322, 100, 380, -20) + mitten(306, 118, 120) + hits(300, 104) +
    bubble(14, 18, 160, 'Baby? Baby?', 96, 72),

  babyBreaths: () =>
    `<rect x="20" y="214" width="320" height="18" rx="7" fill="${K.floor}"/>` +
    `<g transform="translate(160,170)">${baby('up')}</g>` +
    line([[40, 300], [70, 170]], B.sleeve, 56) +
    dot(102, 112, 32, B.adult) + `<path d="M74,98 a32,32 0 0 1 52,-14 q-24,-4 -30,14 z" fill="${B.hairDark}"/>` +
    `<ellipse cx="124" cy="132" rx="10" ry="7" fill="${B.adultF}"/>` +
    curve(250, 132, 236, 112, 228, 96, K.act, 5) + txt(262, 92, 'chest rises', 14, K.act, 'start') +
    badge(316, 46, '2x') + chip(14, 14, 'COVER MOUTH AND NOSE', K.ink),

  whoBaby: () => `<g transform="translate(100,160)">${baby('up')}</g>` + `<rect x="50" y="216" width="260" height="12" rx="6" fill="${K.floor}"/>`,

  // Seen from above, as you kneel beside them: both hands stacked on the exact center of the chest.
  cprHands: () => {
    const cx = 168, cy = 122;
    return dot(44, 122, 36, B.adult) + `<path d="M16,100 a36,36 0 0 0 0,44 q10,-22 0,-44 z" fill="${B.hairDark}"/>` +
      `<rect x="70" y="108" width="30" height="28" fill="${B.adult}"/>` +
      `<rect x="88" y="40" width="252" height="164" rx="54" fill="${B.adult}"/>` +
      `<rect x="292" y="40" width="80" height="164" rx="10" fill="${K.vic}"/>` +
      `<path d="M104,${cy} H236" stroke="${B.adultF}" stroke-width="4" stroke-dasharray="2 9" stroke-linecap="round"/>` +
      `<path d="M${cx},62 V182" stroke="${B.adultF}" stroke-width="4" stroke-dasharray="2 9" stroke-linecap="round"/>` +
      dot(cx, 70, 6, B.adultF) + dot(cx, 174, 6, B.adultF) +
      line([[cx - 30, 290], [cx - 12, 168]], B.sleeve, 34) + line([[cx + 30, 290], [cx + 12, 168]], B.sleeveF, 34) +
      line([[cx - 22, 236], [cx - 8, 150]], B.hand, 26) + line([[cx + 22, 236], [cx + 8, 150]], B.handF, 26) +
      [-14, 0, 14].map(d => line([[cx + d + 7, cy - 4], [cx + d + 7, cy - 44]], B.handF, 11)).join('') +
      `<rect x="${cx - 32}" y="${cy - 22}" width="64" height="52" rx="24" fill="${B.handF}"/>` +
      `<rect x="${cx - 30}" y="${cy - 26}" width="60" height="48" rx="22" fill="${B.hand}"/>` +
      [-21, -7, 7, 21].map(d => line([[cx + d, cy - 18], [cx + d, cy - 50]], B.hand, 11)).join('') +
      line([[cx - 26, cy - 8], [cx - 40, cy - 26]], B.hand, 11) +
      `<circle cx="${cx}" cy="${cy}" r="64" fill="none" stroke="${K.act}" stroke-width="4" stroke-dasharray="10 8"/>` +
      chip(12, 12, 'CENTER OF THE CHEST', K.act) + txt(218, 240, 'between the nipples', 15, K.act, 'start');
  },
});
