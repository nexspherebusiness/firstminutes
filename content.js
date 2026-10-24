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

  burns: {
    title: 'Burns', sub: 'Hot water, fire, stove, chemicals', icon: 'burnCool', keys: 'burn burned burnt scald scalded hot water stove oven fire flame iron grease boiling steam chemical burn',
    all: {
      steps: [
        { art: 'burnCool', t: 'Cool it with running water', d: 'Hold the burn under cool running water right away, for 5 to 20 minutes. Cool, not ice cold. Keep the rest of the body warm, especially a child.', more: 'Chemical on the skin? Brush off any powder first, then rinse with running water for at least 15 minutes.' },
        { art: 'burnRing', t: 'Take off rings and tight things', d: 'Gently remove rings, watches, belts or tight clothes near the burn before it swells. Don’t pull off anything stuck to the skin.' },
        { art: 'burnCover', t: 'Cover it loosely', d: 'Cover with a clean, dry cloth or plastic wrap laid on loosely. No butter, oil, toothpaste or ice. Don’t pop blisters.' },
        { art: 'burnPalm', t: 'Bigger than their palm? Get help', d: 'Call 911 for a large or deep burn, trouble breathing, or an electrical burn. See a doctor today for a burn bigger than their palm or on the face, hands, feet or private parts.' },
      ],
    },
  },

  fainting: {
    title: 'Fainting', sub: 'Dizzy, pale, passed out', icon: 'faintLegs', keys: 'faint fainted fainting passed out dizzy lightheaded light headed blacked out collapsed pale woozy',
    all: {
      steps: [
        { art: 'faintLower', t: 'Help them lie down', d: 'Feeling faint? Help them sit or lie on the floor right away so they can’t fall and get hurt.' },
        { art: 'faintLegs', t: 'Raise their legs', d: 'If they didn’t fall or get hurt, lay them flat and raise their feet about 6 to 12 inches. Loosen anything tight around the neck.' },
        { art: 'cprCheck', t: 'Check that they wake up', d: 'Most people wake up within a minute. Not breathing normally? Start CPR now.', cta: { label: 'Not breathing? Start CPR', go: '#/f/cpr' } },
        { art: 'call911If', t: 'Call 911 if...', d: 'They don’t feel better within 1 to 2 minutes, faint again, got hurt, have chest pain or trouble breathing, or are pregnant or diabetic.' },
      ],
    },
  },

  seizure: {
    title: 'Seizure', sub: 'Shaking, jerking, staring', icon: 'seizureSafe', keys: 'seizure seizures convulsion convulsing shaking jerking fit epilepsy epileptic twitching',
    all: {
      steps: [
        { art: 'seizureSafe', t: 'Keep them safe', d: 'Help them to the floor. Move hard and sharp things away. Put something soft under their head.' },
        { art: 'seizureTime', t: 'Time it. Don’t hold them down.', d: 'Note the time it started. Don’t hold them down and don’t put anything in their mouth. No food, drink or pills.' },
        { art: 'recovery', t: 'Roll them on their side', d: 'When the shaking stops, or if they vomit, roll them onto their side. Stay with them until they are fully awake.' },
        { art: 'call911If', t: 'Call 911 if...', d: 'It’s their first seizure, it lasts more than 5 minutes, another one follows, it happens in water, they’re hurt, pregnant or a baby under 6 months, they have trouble breathing, or they aren’t back to normal within 5 to 10 minutes.' },
      ],
    },
  },

  stroke: {
    title: 'Stroke', sub: 'Face drooping, weak arm, slurred speech', icon: 'strokeFace', keys: 'stroke face drooping droop slurred speech weak arm numb numbness one side confused can’t talk cant talk mini stroke tia',
    all: {
      steps: [
        { art: 'strokeFace', t: 'Face: ask them to smile', d: 'Does one side of the face droop?' },
        { art: 'strokeArms', t: 'Arms: raise both arms', d: 'Does one arm drift down or feel weak or numb?' },
        { art: 'strokeSpeech', t: 'Speech: repeat a short sentence', d: 'Is the speech slurred, strange, or are they unable to speak?' },
        { art: 'strokeTime', t: 'Time: call 911 now', d: 'Any one of these signs? Call 911 right away, even if it goes away. Note the time it started. Don’t give food, drink or medicine.' },
        { art: 'recovery', t: 'Stay with them', d: 'Keep them calm and comfortable. If they stop responding but are breathing, roll them on their side. Not breathing normally? Start CPR.', cta: { label: 'Not breathing? Start CPR', go: '#/f/cpr' } },
      ],
    },
  },

  heart: {
    title: 'Heart attack', sub: 'Chest pain or pressure', icon: 'heartSigns', keys: 'heart attack chest pain chest pressure chest tightness squeezing arm pain jaw pain cardiac angina',
    all: {
      steps: [
        { art: 'heartSigns', t: 'Know the signs', d: 'Pain, pressure or squeezing in the chest. Pain in the arm, jaw, neck, back or stomach. Short of breath, cold sweat, nausea or lightheaded. Women often have the less obvious signs.' },
        { art: 'call911', t: 'Call 911 now', d: 'Don’t drive them to the hospital yourself and don’t wait to see if it passes. Call 911.' },
        { art: 'heartRest', t: 'Help them rest', d: 'Help them sit in the most comfortable position, often sitting up against a wall. Loosen tight clothing. Stay calm and stay with them.' },
        { art: 'aspirin', t: 'Aspirin, only if it’s safe', d: 'If they are alert, not allergic to aspirin and no doctor told them to avoid it: have them chew 1 regular aspirin (325 mg) or 2 to 4 low dose aspirin (81 mg). If you’re not sure, wait for 911.' },
        { art: 'collapse', t: 'If they collapse, start CPR', d: 'Not responding and not breathing normally? Start CPR and send someone for an AED.', cta: { label: 'Start CPR now', go: '#/f/cpr/adult/1' } },
      ],
    },
  },

  allergy: {
    title: 'Allergic reaction', sub: 'Swelling, hives, trouble breathing', icon: 'epiThigh', keys: 'allergy allergic reaction anaphylaxis anaphylactic swelling swollen lips tongue throat hives rash itching epipen epinephrine auto injector bee sting wasp peanut nut food allergy',
    all: {
      steps: [
        { art: 'allergySigns', t: 'Spot a severe reaction', d: 'Trouble breathing or swallowing, swelling of the lips, tongue or throat, wheezing, hives all over, vomiting, dizziness or fainting after a food, a sting or a medicine.', more: 'Only mild hives or itching, and breathing is fine? Watch them closely. An allergy pill may help. Any trouble breathing: use epinephrine.' },
        { art: 'epiThigh', t: 'Use their epinephrine auto injector', d: 'Help them use their EpiPen or other auto injector. Follow the steps printed on it: press the tip firmly into the outer thigh until it clicks and hold it there. It works through clothing.' },
        { art: 'call911', t: 'Call 911', d: 'Always call 911, even if they feel better. Note the time of the injection.' },
        { art: 'allergyRest', t: 'Sit up or lie down, then watch', d: 'Breathing is hard? Let them sit up. Feeling faint? Lay them down with legs raised. No better after 5 to 10 minutes and help isn’t there yet? A second dose may be given if they have one.' },
      ],
    },
  },

  poisoning: {
    title: 'Poisoning', sub: 'Swallowed pills, chemicals, overdose', icon: 'poisonCall', keys: 'poison poisoning poisoned swallowed pills medicine overdose bleach cleaner detergent pod chemical drank ate battery button battery mushroom plant naloxone narcan opioid',
    all: {
      steps: [
        { art: 'poisonCall', t: 'Call Poison Control', d: 'Swallowed something that could be harmful? Call Poison Control at 1 800 222 1222. It’s free, 24 hours a day. Call 911 instead if they aren’t awake, can’t breathe well or have a seizure.' },
        { art: 'poisonNoVomit', t: 'Don’t make them vomit', d: 'Don’t give anything to eat or drink unless Poison Control tells you to. Keep the container or the pills to show them.' },
        { art: 'rinseSkin', t: 'On the skin or in the eyes', d: 'Take off soiled clothes and rinse the skin with running water for at least 15 minutes. In the eyes: rinse with lukewarm water for 15 minutes.' },
        { art: 'naloxone', t: 'Overdose: give naloxone', d: 'Not responding and not breathing normally after drugs or pills? Call 911, start CPR and give naloxone (Narcan) if you have it.', cta: { label: 'Start CPR now', go: '#/f/cpr' } },
      ],
    },
  },

  head: {
    title: 'Head injury', sub: 'A fall or a hit to the head', icon: 'headStill', keys: 'head injury hit head bumped head fell fall concussion bump on head knocked out head',
    all: {
      steps: [
        { art: 'headStill', t: 'Keep them still', d: 'After a hard fall or a hit to the head, keep them still. Don’t move the head or neck unless they are in danger.' },
        { art: 'call911If', t: 'Call 911 for danger signs', d: 'They passed out, are confused or very sleepy, keep vomiting, have a seizure, a worsening headache, trouble seeing or speaking, or blood or clear fluid from the nose or ears. Also call for a baby or anyone on blood thinners.' },
        { art: 'coldHead', t: 'Cold pack for a bump', d: 'For a simple bump, hold a cold pack wrapped in a cloth on it for up to 20 minutes.' },
        { art: 'watch24', t: 'Watch them for 24 hours', d: 'Don’t leave them alone. After a fall in sports or play, no more activity until a doctor checks them. Get help the same day if anything seems off.' },
      ],
    },
  },

  bone: {
    title: 'Broken bone', sub: 'Fall, twisted ankle, can’t move it', icon: 'boneStill', keys: 'broken bone fracture broke break sprain twisted ankle wrist arm leg dislocated fell fall can’t move',
    all: {
      steps: [
        { art: 'boneStill', t: 'Don’t move it', d: 'Keep the injured part still, in the position you found it. Don’t try to straighten it.' },
        { art: 'boneCold', t: 'Support it and cool it', d: 'Support it with a pillow or a rolled towel. Put a cold pack wrapped in a cloth on it for up to 20 minutes.' },
        { art: 'call911If', t: 'Call 911 if...', d: 'The bone is through the skin, there is heavy bleeding, the limb is blue, purple or pale, or the hip, thigh, back, neck or head may be hurt. Otherwise, get to urgent care.', more: 'Bleeding wound with the break? Follow Heavy bleeding first.' },
      ],
    },
  },

  nosebleed: {
    title: 'Nosebleed', sub: 'Bleeding from the nose', icon: 'nosePinch', keys: 'nosebleed nose bleed bloody nose bleeding nose',
    all: {
      steps: [
        { art: 'noseLean', t: 'Sit up and lean forward', d: 'Sit up and lean slightly forward, not back, so blood doesn’t run down the throat.' },
        { art: 'nosePinch', t: 'Pinch for 10 to 15 minutes', d: 'Pinch the soft part of the nose firmly and keep pinching for 10 to 15 minutes without letting go. Breathe through the mouth and spit out blood.' },
        { art: 'call911If', t: 'Get help if...', d: 'It’s still bleeding after 15 minutes of pressure, they feel faint, it started after a hit to the head or face, or they take blood thinners.' },
      ],
    },
  },

  heat: {
    title: 'Heat stroke', sub: 'Too hot, confused, fainting', icon: 'heatTub', keys: 'heat stroke heatstroke heat exhaustion overheated overheating too hot hot car sun sunstroke dehydrated',
    all: {
      steps: [
        { art: 'heatSigns', t: 'Spot heat stroke', d: 'In the heat: very hot skin, confusion, strange behavior, fainting or a seizure. This is an emergency. Call 911.', more: 'Sweaty, tired and dizzy but thinking clearly? That’s heat exhaustion: move to a cool place, rest, and sip water or a sports drink.' },
        { art: 'heatTub', t: 'Cool them fast', d: 'Move them somewhere cool and take off extra clothing. Best: put them in cool or cold water up to the neck for 15 minutes, or until they think clearly again.' },
        { art: 'heatIce', t: 'No tub? Cool any way you can', d: 'Cold shower, ice packs or cold wet towels on the neck, armpits and groin, and a fan.' },
        { art: 'heatDrink', t: 'Drinks only if they’re awake', d: 'Give cool water only if they are fully awake and can swallow. Stay with them until help arrives.' },
      ],
    },
  },

  drowning: {
    title: 'Drowning', sub: 'Pool, lake, bathtub', icon: 'drownReach', keys: 'drowning drowned drown pool water swimming lake bathtub underwater',
    all: {
      steps: [
        { art: 'drownReach', t: 'Reach or throw, don’t go', d: 'Reach with a pole or towel, or throw something that floats. Only go in the water if you are trained. Shout for help.' },
        { art: 'call911', t: 'Get them out and call 911', d: 'Once they are out of the water, call 911 on speaker.' },
        { art: 'collapse', t: 'Not breathing? CPR with breaths', d: 'Drowning is a breathing emergency. Start CPR and give breaths if you know how.', cta: { label: 'Start CPR now', go: '#/f/cpr' } },
        { art: 'drownAfter', t: 'Even if they seem fine', d: 'Coughing, trouble breathing, or acting very sleepy or confused after being in the water? Get medical care right away. Keep them warm.' },
      ],
    },
  },

  electric: {
    title: 'Electric shock', sub: 'Outlet, cord, power line', icon: 'elecOff', keys: 'electric shock electrocuted electrocution shock outlet socket cord wire power line lightning',
    all: {
      steps: [
        { art: 'elecOff', t: 'Turn off the power first', d: 'Don’t touch them while they still touch the source. Unplug it or switch off the power at the breaker.' },
        { art: 'elecLine', t: 'Power line down? Stay away', d: 'Stay far away, keep others back and call 911. Never try to move a power line yourself.' },
        { art: 'collapse', t: 'Check breathing', d: 'Once it’s safe: not breathing normally? Start CPR. Every electric shock needs a doctor, even if they seem fine.', cta: { label: 'Not breathing? Start CPR', go: '#/f/cpr' } },
        { art: 'burnCover', t: 'Cover any burns', d: 'Cover burns loosely with a clean, dry cloth. Keep them warm and still until help arrives.' },
      ],
    },
  },

  asthma: {
    title: 'Asthma attack', sub: 'Wheezing, can’t catch their breath', icon: 'inhaler', keys: 'asthma attack wheezing wheeze inhaler puffer short of breath can’t breathe cant breathe breathing problem',
    all: {
      steps: [
        { art: 'asthmaSit', t: 'Sit them up, stay calm', d: 'Help them sit up and lean slightly forward. Loosen tight clothing. Speak calmly.' },
        { art: 'inhaler', t: 'Help with their inhaler', d: 'Help them use their own reliever inhaler, with a spacer if they have one, the way their doctor told them.' },
        { art: 'call911If', t: 'Call 911 if...', d: 'They have no inhaler, it doesn’t help, they can’t speak in full sentences, their lips or nails turn blue, or they get very sleepy.' },
      ],
    },
  },

  sugar: {
    title: 'Low blood sugar', sub: 'Diabetes: shaky, sweaty, confused', icon: 'sugarJuice', keys: 'low blood sugar hypoglycemia diabetic diabetes insulin shaky sweaty sugar confused low sugar',
    all: {
      steps: [
        { art: 'sugarSigns', t: 'Spot it', d: 'Someone with diabetes who is shaky, sweaty, pale, confused, cranky or acting drunk may have low blood sugar.' },
        { art: 'sugarJuice', t: 'Give sugar if they can swallow', d: 'Awake and able to swallow? Give glucose tablets if they have them, or half a cup of juice or regular soda, or a spoonful of sugar or honey.' },
        { art: 'sugarWait', t: 'Not better in 10 minutes? Call 911', d: 'Feeling better? Give them a snack. Not better within 10 minutes? Call 911.' },
        { art: 'recovery', t: 'Can’t swallow? Nothing by mouth', d: 'Not awake, can’t swallow, or having a seizure: call 911, roll them on their side and give nothing by mouth.' },
      ],
    },
  },

  bite: {
    title: 'Dog bite', sub: 'Dog, cat or other animal', icon: 'dogAway', keys: 'dog bite bitten bite animal bite cat bite cat scratch rabies dog',
    all: {
      steps: [
        { art: 'dogAway', t: 'Get safe first', d: 'Move away from the animal. Don’t try to grab or hold it.' },
        { art: 'washWound', t: 'Wash it well', d: 'Wash the bite with soap and running water for several minutes.' },
        { art: 'bandage', t: 'Stop the bleeding and cover it', d: 'Press with a clean cloth if it’s bleeding, then cover with a clean bandage. Heavy bleeding? Follow Heavy bleeding.' },
        { art: 'doctor', t: 'See a doctor today', d: 'Any bite that breaks the skin needs a medical check for infection, tetanus and rabies. Find out if the animal’s shots are up to date.' },
      ],
    },
  },

  eye: {
    title: 'Eye injury', sub: 'Chemical, object, or a hit', icon: 'eyeRinse', keys: 'eye injury chemical in eye something in eye poked eye scratched eye object eye splash',
    all: {
      steps: [
        { art: 'eyeRinse', t: 'Chemical in the eye: rinse now', d: 'Rinse with lots of lukewarm water for 15 minutes, holding the eye open. Keep the water away from the other eye. Then call Poison Control at 1 800 222 1222, or 911 if it’s serious.' },
        { art: 'eyeCup', t: 'Object stuck in the eye: don’t pull', d: 'Don’t rub or press. Cover the eye with a paper cup taped in place and get emergency care.' },
        { art: 'eyeBlink', t: 'Dust or an eyelash', d: 'Blink and rinse with clean water. Still feels like something is there? See a doctor.' },
        { art: 'eyeCold', t: 'Hit in the eye', d: 'Hold a cold pack wrapped in a cloth near the eye, with no pressure on it. Get care for vision changes, blood in the eye or a lot of pain.' },
      ],
    },
  },

  cold: {
    title: 'Hypothermia', sub: 'Very cold, shivering, confused', icon: 'hypoWrap', keys: 'hypothermia cold freezing frozen shivering frostbite exposure cold water winter',
    all: {
      steps: [
        { art: 'hypoWarm', t: 'Get them out of the cold', d: 'Move them somewhere warm. Gently take off wet clothes.' },
        { art: 'hypoWrap', t: 'Wrap them up', d: 'Cover them with dry blankets, including the head and neck. Stuck outside? Put something under them and block the wind.' },
        { art: 'hotDrink', t: 'Warm sweet drinks if alert', d: 'Only if they are fully awake and can swallow. No alcohol. Don’t rub their arms and legs.' },
        { art: 'call911If', t: 'Call 911 if...', d: 'They are confused, very sleepy or mumbling, have stopped shivering, or their skin is pale or blue. Handle them gently. Not breathing normally? Start CPR.' },
      ],
    },
  },
};

const COMING = [];
