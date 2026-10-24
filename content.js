// What to do, step by step. Based on the 2025 American Heart Association guidelines,
// American Red Cross first aid and Stop the Bleed. Customer facing text: no dashes.
const FLOWS = {
  choking: {
    title: 'Choking', sub: 'Can’t breathe, cough or talk', icon: 'chokeSign', keys: 'choking choke choked food stuck swallowed something gagging heimlich can’t breathe cant breathe throat object toy coin grape',
    who: [
      { id: 'adult', label: 'Adult or child', sub: '1 year and older', art: 'whoAdultChild' },
      { id: 'baby', label: 'Baby', sub: 'Under 1 year', art: 'whoBaby' },
    ],
    adult: {
      check: { q: 'Can they cough, talk or breathe?', yes: 'Yes, coughing hard', no: 'No, or only a weak cough' },
      cough: { art: 'cough', t: 'Let them keep coughing', d: 'A strong cough is the best way to get it out. Stay with them and don’t hit their back while they can cough. If the cough gets weak or they can’t breathe, start the steps.', cta: { label: 'They can’t breathe now', go: '#/f/choking/adult/1' } },
      steps: [
        { art: 'chokeSign', t: 'Ask: “Are you choking?”', d: 'If they nod and can’t talk, act now. Tell someone to call 911.', more: 'Alone and choking yourself? Call 911 and leave the line open. Then press your fist hard into your belly, or throw your belly against the back of a chair.' },
        { art: 'backBlows', t: 'Give 5 back blows', d: 'Stand to the side, a little behind. Hold their chest with one hand and lean them forward. Hit hard between the shoulder blades with the heel of your other hand, 5 times.' },
        { art: 'bellyThrusts', t: 'Give 5 belly thrusts', d: 'Stand behind and wrap your arms around their waist. Make a fist just above the belly button, grab it with your other hand, and pull in and up, hard, 5 times.', more: 'Pregnant or a very large person? Put your fist on the center of the chest instead and pull straight back. A child? Kneel down to their height.' },
        { art: 'repeatCycle', t: 'Repeat: 5 and 5', d: 'Keep switching between 5 back blows and 5 belly thrusts until the object comes out, they can breathe, or they pass out.' },
        { art: 'collapse', t: 'If they pass out, start CPR', d: 'Lower them gently to the floor. Call 911 if no one has. Start CPR right away. Before each breath, look in the mouth and take the object out only if you can see it.', cta: { label: 'Start CPR now', go: '#/f/cpr' } },
      ],
    },
    baby: {
      check: { q: 'Can the baby cough, cry or breathe?', yes: 'Yes, coughing or crying', no: 'No sound, can’t breathe' },
      cough: { art: 'whoBaby', t: 'Let the baby cough', d: 'Keep the baby upright and watch closely. Don’t pat the back and don’t reach into the mouth. If the baby can’t cough, cry or breathe, start the steps. Call 911 if you are worried.', cta: { label: 'The baby can’t breathe now', go: '#/f/choking/baby/1' } },
      steps: [
        { art: 'babyBack', t: 'Face down: 5 back blows', d: 'Shout for someone to call 911. Lay the baby face down along your forearm, head lower than the chest, holding the jaw (not the throat). Rest your arm on your thigh. Give 5 firm back blows between the shoulder blades with the heel of your hand.' },
        { art: 'babyChest', t: 'Face up: 5 chest thrusts', d: 'Support the head and turn the baby face up on your other forearm, head still low. Put the heel of one hand in the center of the chest, just below the nipple line. Push down firmly, about 1.5 inches, 5 times.' },
        { art: 'babyCycle', t: 'Repeat: 5 and 5', d: 'Keep switching: 5 back blows, 5 chest thrusts. Never sweep the mouth with your finger. Only take out an object you can clearly see.' },
        { art: 'cprPushBaby', t: 'If the baby stops responding', d: 'Call 911 if no one has, and start baby CPR right away.', cta: { label: 'Start baby CPR', go: '#/f/cpr/baby/1' } },
      ],
    },
  },

  cpr: {
    title: 'Not breathing', sub: 'CPR, step by step', icon: 'cprPush', keys: 'cpr not breathing unconscious unresponsive collapsed passed out no pulse heart stopped cardiac arrest drowning drowned gasping lifeless won’t wake up',
    who: [
      { id: 'adult', label: 'Adult', sub: 'Teen or older', art: 'whoAdult' },
      { id: 'child', label: 'Child', sub: '1 year to puberty', art: 'whoChild' },
      { id: 'baby', label: 'Baby', sub: 'Under 1 year', art: 'whoBaby' },
    ],
    adult: {
      steps: [
        { art: 'cprCheck', t: 'Tap and shout', d: 'Tap their shoulders and shout “Are you OK?” Watch the chest for up to 10 seconds. Gasping or snoring sounds are NOT normal breathing.', branch: { label: 'They are breathing normally', go: '#/f/cpr/breathing' } },
        { art: 'cprCall', t: 'Call 911. Speaker on.', d: 'Put the phone on speaker next to you so the 911 dispatcher can coach you. Send someone to find an AED, the defibrillator found in stores, gyms and offices.' },
        { art: 'cprHands', t: 'Hands on the center of the chest', d: 'Kneel beside them. Put the heel of one hand on the center of the chest, between the nipples. Put your other hand on top.' },
        { art: 'cprPush', t: 'Push hard and fast', d: 'Arms straight, shoulders over your hands. Push down at least 2 inches, 100 to 120 times a minute. Let the chest come all the way back up. Use the beat below.', metro: 'adult' },
        { art: 'cprBreaths', t: 'Know how? Add 2 breaths', d: 'Only if you were trained and feel able: after every 30 pushes, tilt the head back, lift the chin, pinch the nose and give 2 breaths, 1 second each. Never trained, or not sure? Skip the breaths and keep pushing. For an adult, pushing matters most.', more: 'Drowning, drug overdose or a breathing problem? Breaths matter more here. Give them if you know how.' },
        { art: 'cprAed', t: 'When the AED arrives', d: 'Turn it on and do what it says. Put the pads on bare skin, as in the picture. Keep pushing until the AED tells you to stand clear.' },
        { art: 'cprPush', t: 'Don’t stop', d: 'Keep going until they start breathing, help takes over, or you are too tired to go on. If someone can help, switch every 2 minutes.', metro: 'adult' },
      ],
    },
    child: {
      steps: [
        { art: 'cprCheck', t: 'Tap and shout', d: 'Tap the shoulders and shout their name. Watch the chest for up to 10 seconds. Gasping is NOT normal breathing.', branch: { label: 'The child is breathing normally', go: '#/f/cpr/breathing' } },
        { art: 'cprCall', t: 'Call 911. Speaker on.', d: 'Put the phone on speaker and start. Alone with no phone? Do 2 minutes of CPR first, then go call 911. Send someone for an AED.' },
        { art: 'cprPushChild', t: 'Push hard and fast', d: 'One hand on the center of the chest (two hands for a big child). Push down about 2 inches, 100 to 120 times a minute. Let the chest come back up.', metro: 'child' },
        { art: 'cprBreaths', t: 'Know how? 2 breaths every 30 pushes', d: 'Children usually stop breathing first, so breaths help a lot. If you know how: tilt the head back, lift the chin, pinch the nose and give 2 gentle breaths. Don’t know how, or can’t? Skip them and keep pushing without stopping.' },
        { art: 'cprAed', t: 'Use the AED as soon as it arrives', d: 'Turn it on and follow its voice. Use child pads if it has them. If not, adult pads are fine.' },
        { art: 'cprPushChild', t: 'Don’t stop', d: 'Keep going until the child starts breathing or help takes over. If someone can help, switch every 2 minutes.', metro: 'child' },
      ],
    },
    baby: {
      steps: [
        { art: 'babyCheck', t: 'Tap the foot and shout', d: 'Tap the bottom of the foot and call the baby’s name. Watch the chest for up to 10 seconds.', branch: { label: 'The baby is breathing normally', go: '#/f/cpr/breathing' } },
        { art: 'call911', t: 'Call 911. Speaker on.', d: 'Put the phone on speaker and start. Alone with no phone? Do 2 minutes of CPR first, then call 911, carrying the baby with you.' },
        { art: 'cprPushBaby', t: 'Push with the heel of one hand', d: 'Baby on a firm, flat surface. Heel of one hand on the center of the chest, just below the nipple line. Push about 1.5 inches, 100 to 120 times a minute.', more: 'If your hands fit around the chest, you can wrap them around and push with both thumbs instead.', metro: 'baby' },
        { art: 'babyBreaths', t: 'Know how? 2 puffs every 30 pushes', d: 'If you know how: tilt the head back just a little, cover the baby’s mouth AND nose with your mouth, and give 2 gentle puffs, just enough to make the chest rise. Don’t know how, or can’t? Skip them and keep pushing without stopping.' },
        { art: 'cprPushBaby', t: 'Don’t stop', d: 'Keep going until the baby starts breathing or help takes over. If someone can help, switch every 2 minutes.', metro: 'baby' },
      ],
    },
    breathing: {
      steps: [
        { art: 'recovery', t: 'Roll them on their side', d: 'Call 911. Roll them onto their side, the left side if you can, so they can’t choke on vomit. Top knee bent, hand under the cheek. Stay and keep watching the breathing.', more: 'Pregnant? Always roll her onto her LEFT side. Think they hurt their neck or back in a fall or crash? Don’t move them unless they vomit or you must.', cta: { label: 'Breathing stopped: start CPR', go: '#/f/cpr' } },
      ],
    },
  },

  bleeding: {
    title: 'Heavy bleeding', sub: 'Blood won’t stop', icon: 'bleedPress', keys: 'bleeding blood bleed cut deep cut wound gash knife stab glass spurting hemorrhage tourniquet amputation lost a lot of blood',
    all: {
      steps: [
        { art: 'call911', t: 'Call 911', d: 'Blood spurting, pooling, or not slowing down? Call 911 now, speaker on. Put on gloves or slip a plastic bag over your hand if you have one.' },
        { art: 'bleedPress', t: 'Press hard on the wound', d: 'Put a clean cloth, gauze or a shirt right on the wound. Press down hard with both hands, using your body weight.' },
        { art: 'bleedMore', t: 'Keep pressing. Don’t lift.', d: 'Don’t lift to check. If blood soaks through, put more cloth on top and keep pressing until help arrives.', more: 'Deep wound in the neck, armpit or groin? Stuff cloth deep into the wound and press hard.' },
        { art: 'bleedTq', t: 'Arm or leg still bleeding? Tourniquet.', d: 'If you have a tourniquet, put it 2 to 3 inches above the wound, toward the body, never on a joint. Tighten until the bleeding stops and write down the time. It will hurt. That’s normal.' },
        { art: 'bleedWarm', t: 'Keep them lying down and warm', d: 'Cover them with a blanket or a jacket and stay with them until help arrives. Don’t give food or drink.' },
      ],
    },
  },
};

// Shown on the home screen as part of the full version.
const COMING = ['Burns', 'Fainting', 'Seizure', 'Stroke', 'Heart attack', 'Allergic reaction', 'Poisoning', 'Head injury', 'Broken bone', 'Nosebleed', 'Heat stroke', 'Drowning', 'Electric shock', 'Asthma attack', 'Low blood sugar', 'Dog bite', 'Eye injury', 'Hypothermia'];
