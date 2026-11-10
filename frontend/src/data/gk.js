/*
  KIKO - General Knowledge Question Bank

  Age groups:
  1. 1-3 years
  2. 4-6 years
  3. 7-10 years

  Exactly 10 questions per category.

  Question format:
  [question, options, correctIndex, explanation?]

  Languages:
  en = English
  kn = Kannada
  hi = Hindi
*/

const makeQ = (en, kn, hi, options, correct, explanation = null) => {
  const q = [
    { en, kn, hi },
    options,
    correct
  ];

  if (explanation) q.push(explanation);

  return q;
};

const makeCat = (emoji, names, questions) => ({
  e: emoji,
  n: names,
  q: questions
});

const animal = (en, kn, hi) => ({ en, kn, hi });

export const GK = [

  // ==================================================
  // AGE GROUP 1-3
  // ==================================================

  [
    // ANIMALS
    makeCat("🐶",
      { en: "Animals", kn: "ಪ್ರಾಣಿಗಳು", hi: "जानवर" },
      [
        makeQ("Where is the cat?", "ಬೆಕ್ಕು ಎಲ್ಲಿದೆ?", "बिल्ली कहाँ है?",
          ["🐶", "🐱", "🐮"], 1),
        makeQ("Where is the cow?", "ಹಸು ಎಲ್ಲಿದೆ?", "गाय कहाँ है?",
          ["🐮", "🐸", "🐑"], 0),
        makeQ("Where is the elephant?", "ಆನೆ ಎಲ್ಲಿದೆ?", "हाथी कहाँ है?",
          ["🦁", "🐘", "🐦"], 1),
        makeQ("Where is the dog?", "ನಾಯಿ ಎಲ್ಲಿದೆ?", "कुत्ता कहाँ है?",
          ["🐱", "🐶", "🐰"], 1),
        makeQ("Where is the lion?", "ಸಿಂಹ ಎಲ್ಲಿದೆ?", "शेर कहाँ है?",
          ["🦁", "🐼", "🐮"], 0),
        makeQ("Where is the monkey?", "ಕೋತಿ ಎಲ್ಲಿದೆ?", "बंदर कहाँ है?",
          ["🐵", "🐸", "🐔"], 0),
        makeQ("Where is the fish?", "ಮೀನು ಎಲ್ಲಿದೆ?", "मछली कहाँ है?",
          ["🐦", "🐟", "🐶"], 1),
        makeQ("Where is the rabbit?", "ಮೊಲ ಎಲ್ಲಿದೆ?", "खरगोश कहाँ है?",
          ["🐰", "🐮", "🦁"], 0),
        makeQ("Where is the bird?", "ಪಕ್ಷಿ ಎಲ್ಲಿದೆ?", "पक्षी कहाँ है?",
          ["🐟", "🐦", "🐸"], 1),
        makeQ("Where is the butterfly?", "ಚಿಟ್ಟೆ ಎಲ್ಲಿದೆ?", "तितली कहाँ है?",
          ["🦋", "🐝", "🐢"], 0)
      ]
    ),

    // COLOURS
    makeCat("🎨",
      { en: "Colours", kn: "ಬಣ್ಣಗಳು", hi: "रंग" },
      [
        makeQ("Find red!", "ಕೆಂಪು ಬಣ್ಣವನ್ನು ಹುಡುಕಿ!", "लाल रंग ढूँढो!",
          ["🔵", "🔴", "🟡"], 1),
        makeQ("Find blue!", "ನೀಲಿ ಬಣ್ಣವನ್ನು ಹುಡುಕಿ!", "नीला रंग ढूँढो!",
          ["🟢", "🔵", "🟠"], 1),
        makeQ("Find yellow!", "ಹಳದಿ ಬಣ್ಣವನ್ನು ಹುಡುಕಿ!", "पीला रंग ढूँढो!",
          ["🟡", "🟣", "🔴"], 0),
        makeQ("Find green!", "ಹಸಿರು ಬಣ್ಣವನ್ನು ಹುಡುಕಿ!", "हरा रंग ढूँढो!",
          ["🟠", "🟢", "🔵"], 1),
        makeQ("Find pink!", "ಗುಲಾಬಿ ಬಣ್ಣವನ್ನು ಹುಡುಕಿ!", "गुलाबी रंग ढूँढो!",
          ["🩷", "🟡", "🟢"], 0),
        makeQ("Find orange!", "ಕಿತ್ತಳೆ ಬಣ್ಣವನ್ನು ಹುಡುಕಿ!", "नारंगी रंग ढूँढो!",
          ["🔵", "🟠", "🟣"], 1),
        makeQ("Find black!", "ಕಪ್ಪು ಬಣ್ಣವನ್ನು ಹುಡುಕಿ!", "काला रंग ढूँढो!",
          ["⚫", "⚪", "🔴"], 0),
        makeQ("Find white!", "ಬಿಳಿ ಬಣ್ಣವನ್ನು ಹುಡುಕಿ!", "सफेद रंग ढूँढो!",
          ["🟡", "⚪", "🟢"], 1),
        makeQ("Find purple!", "ನೇರಳೆ ಬಣ್ಣವನ್ನು ಹುಡುಕಿ!", "बैंगनी रंग ढूँढो!",
          ["🟣", "🔴", "🟠"], 0),
        makeQ("Find brown!", "ಕಂದು ಬಣ್ಣವನ್ನು ಹುಡುಕಿ!", "भूरा रंग ढूँढो!",
          ["🟢", "🟤", "🔵"], 1)
      ]
    ),

    // FRUITS
    makeCat("🍎",
      { en: "Fruits", kn: "ಹಣ್ಣುಗಳು", hi: "फल" },
      [
        makeQ("Find the banana!", "ಬಾಳೆಹಣ್ಣನ್ನು ಹುಡುಕಿ!", "केला ढूँढो!",
          ["🍎", "🍌", "🍇"], 1),
        makeQ("Find the apple!", "ಸೇಬನ್ನು ಹುಡುಕಿ!", "सेब ढूँढो!",
          ["🍎", "🥭", "🍌"], 0),
        makeQ("Find the mango!", "ಮಾವಿನಹಣ್ಣನ್ನು ಹುಡುಕಿ!", "आम ढूँढो!",
          ["🍇", "🍌", "🥭"], 2),
        makeQ("Find the grapes!", "ದ್ರಾಕ್ಷಿಯನ್ನು ಹುಡುಕಿ!", "अंगूर ढूँढो!",
          ["🍊", "🍇", "🍎"], 1),
        makeQ("Find the watermelon!", "ಕಲ್ಲಂಗಡಿ ಹಣ್ಣನ್ನು ಹುಡುಕಿ!", "तरबूज ढूँढो!",
          ["🍉", "🍌", "🍓"], 0),
        makeQ("Find the orange!", "ಕಿತ್ತಳೆ ಹಣ್ಣನ್ನು ಹುಡುಕಿ!", "संतरा ढूँढो!",
          ["🍐", "🍊", "🍇"], 1),
        makeQ("Find the strawberry!", "ಸ್ಟ್ರಾಬೆರಿ ಹಣ್ಣನ್ನು ಹುಡುಕಿ!", "स्ट्रॉबेरी ढूँढो!",
          ["🍓", "🍍", "🍎"], 0),
        makeQ("Find the pineapple!", "ಅನಾನಸ್ ಹಣ್ಣನ್ನು ಹುಡುಕಿ!", "अनानास ढूँढो!",
          ["🍌", "🍍", "🍉"], 1),
        makeQ("Find the pear!", "ಪೇರಳೆ ಹಣ್ಣನ್ನು ಹುಡುಕಿ!", "नाशपाती ढूँढो!",
          ["🍐", "🍊", "🥭"], 0),
        makeQ("Find the cherry!", "ಚೆರ್ರಿ ಹಣ್ಣನ್ನು ಹುಡುಕಿ!", "चेरी ढूँढो!",
          ["🍇", "🍒", "🍎"], 1)
      ]
    ),

    // MY BODY
    makeCat("🧍",
      { en: "My Body", kn: "ನನ್ನ ದೇಹ", hi: "मेरा शरीर" },
      [
        makeQ("Where are your eyes?", "ನಿನ್ನ ಕಣ್ಣುಗಳು ಎಲ್ಲಿವೆ?", "तुम्हारी आँखें कहाँ हैं?",
          ["👂", "👀", "👃"], 1),
        makeQ("Where are your ears?", "ನಿನ್ನ ಕಿವಿಗಳು ಎಲ್ಲಿವೆ?", "तुम्हारे कान कहाँ हैं?",
          ["👂", "👄", "👃"], 0),
        makeQ("Where is your nose?", "ನಿನ್ನ ಮೂಗು ಎಲ್ಲಿದೆ?", "तुम्हारी नाक कहाँ है?",
          ["👃", "🦶", "✋"], 0),
        makeQ("Where is your mouth?", "ನಿನ್ನ ಬಾಯಿ ಎಲ್ಲಿದೆ?", "तुम्हारा मुँह कहाँ है?",
          ["👀", "👄", "👂"], 1),
        makeQ("Where are your hands?", "ನಿನ್ನ ಕೈಗಳು ಎಲ್ಲಿವೆ?", "तुम्हारे हाथ कहाँ हैं?",
          ["🦶", "✋", "👃"], 1),
        makeQ("Where are your feet?", "ನಿನ್ನ ಪಾದಗಳು ಎಲ್ಲಿವೆ?", "तुम्हारे पैर कहाँ हैं?",
          ["🦶", "👂", "👀"], 0),
        makeQ("What do you use to see?", "ನೋಡಲು ಯಾವುದನ್ನು ಬಳಸುತ್ತೇವೆ?", "देखने के लिए किसका उपयोग करते हैं?",
          ["👀", "👂", "👃"], 0),
        makeQ("What do you use to hear?", "ಕೇಳಲು ಯಾವುದನ್ನು ಬಳಸುತ್ತೇವೆ?", "सुनने के लिए किसका उपयोग करते हैं?",
          ["👄", "👂", "✋"], 1),
        makeQ("What do you use to walk?", "ನಡೆಯಲು ಯಾವುದನ್ನು ಬಳಸುತ್ತೇವೆ?", "चलने के लिए किसका उपयोग करते हैं?",
          ["👀", "🦶", "👃"], 1),
        makeQ("What do you use to clap?", "ಚಪ್ಪಾಳೆ ತಟ್ಟಲು ಯಾವುದನ್ನು ಬಳಸುತ್ತೇವೆ?", "ताली बजाने के लिए किसका उपयोग करते हैं?",
          ["✋", "👂", "👃"], 0)
      ]
    ),

    // SHAPES
    makeCat("⭐",
      { en: "Shapes", kn: "ಆಕಾರಗಳು", hi: "आकार" },
      [
        makeQ("Find the star!", "ನಕ್ಷತ್ರವನ್ನು ಹುಡುಕಿ!", "तारा ढूँढो!",
          ["⭐", "🔺", "❤️"], 0),
        makeQ("Find the heart!", "ಹೃದಯದ ಆಕಾರವನ್ನು ಹುಡುಕಿ!", "दिल का आकार ढूँढो!",
          ["❤️", "⭐", "⚫"], 0),
        makeQ("Find the circle!", "ವೃತ್ತವನ್ನು ಹುಡುಕಿ!", "गोला ढूँढो!",
          ["🟥", "⚫", "🔺"], 1),
        makeQ("Find the square!", "ಚೌಕವನ್ನು ಹುಡುಕಿ!", "वर्ग ढूँढो!",
          ["🟥", "🔵", "⭐"], 0),
        makeQ("Find the triangle!", "ತ್ರಿಕೋನವನ್ನು ಹುಡುಕಿ!", "त्रिभुज ढूँढो!",
          ["⚫", "🔺", "❤️"], 1),
        makeQ("Find the diamond!", "ವಜ್ರದ ಆಕಾರವನ್ನು ಹುಡುಕಿ!", "हीरे का आकार ढूँढो!",
          ["🔶", "🟢", "⭐"], 0),
        makeQ("Find the rectangle!", "ಆಯತವನ್ನು ಹುಡುಕಿ!", "आयत ढूँढो!",
          ["🟠", "▭", "⚫"], 1),
        makeQ("Find the oval!", "ಅಂಡಾಕಾರವನ್ನು ಹುಡುಕಿ!", "अंडाकार ढूँढो!",
          ["🥚", "⭐", "🔺"], 0),
        makeQ("Find the moon!", "ಚಂದ್ರನ ಆಕಾರವನ್ನು ಹುಡುಕಿ!", "चाँद का आकार ढूँढो!",
          ["🌙", "☀️", "❤️"], 0),
        makeQ("Find the sun!", "ಸೂರ್ಯನನ್ನು ಹುಡುಕಿ!", "सूरज ढूँढो!",
          ["🌙", "⭐", "☀️"], 2)
      ]
    )
  ],

  // ==================================================
  // AGE GROUP 4-6
  // ==================================================

  [
    // ANIMALS AND BIRDS
    makeCat("🦁",
      { en: "Animals & Birds", kn: "ಪ್ರಾಣಿಗಳು ಮತ್ತು ಪಕ್ಷಿಗಳು", hi: "जानवर और पक्षी" },
      [
        makeQ("Which animal gives us milk?", "ನಮಗೆ ಹಾಲು ನೀಡುವ ಪ್ರಾಣಿ ಯಾವುದು?", "हमें दूध कौन-सा जानवर देता है?",
          [animal("Cow", "ಹಸು", "गाय"), animal("Lion", "ಸಿಂಹ", "शेर"), animal("Frog", "ಕಪ್ಪೆ", "मेंढक")], 0),
        makeQ("Which is the biggest land animal?", "ಭೂಮಿಯ ಮೇಲಿನ ಅತಿ ದೊಡ್ಡ ಪ್ರಾಣಿ ಯಾವುದು?", "ज़मीन पर सबसे बड़ा जानवर कौन-सा है?",
          [animal("Elephant", "ಆನೆ", "हाथी"), animal("Cat", "ಬೆಕ್ಕು", "बिल्ली"), animal("Dog", "ನಾಯಿ", "कुत्ता")], 0),
        makeQ("Which bird can talk like humans?", "ಮನುಷ್ಯರಂತೆ ಮಾತನಾಡಬಲ್ಲ ಪಕ್ಷಿ ಯಾವುದು?", "इंसानों की तरह बोलने वाला पक्षी कौन-सा है?",
          [animal("Parrot", "ಗಿಳಿ", "तोता"), animal("Crow", "ಕಾಗೆ", "कौआ"), animal("Duck", "ಬಾತುಕೋಳಿ", "बत्तख")], 0),
        makeQ("Which animal is called the king of the jungle?", "ಕಾಡಿನ ರಾಜ ಎಂದು ಕರೆಯಲ್ಪಡುವ ಪ್ರಾಣಿ ಯಾವುದು?", "जंगल का राजा किसे कहते हैं?",
          [animal("Lion", "ಸಿಂಹ", "शेर"), animal("Rabbit", "ಮೊಲ", "खरगोश"), animal("Goat", "ಮೇಕೆ", "बकरी")], 0),
        makeQ("Which animal has a long trunk?", "ಉದ್ದವಾದ ಸೊಂಡಿಲನ್ನು ಹೊಂದಿರುವ ಪ್ರಾಣಿ ಯಾವುದು?", "लंबी सूँड़ वाला जानवर कौन-सा है?",
          [animal("Elephant", "ಆನೆ", "हाथी"), animal("Horse", "ಕುದುರೆ", "घोड़ा"), animal("Dog", "ನಾಯಿ", "कुत्ता")], 0),
        makeQ("Which animal hops?", "ಜಿಗಿಯುವ ಪ್ರಾಣಿ ಯಾವುದು?", "कौन-सा जानवर उछलता है?",
          [animal("Rabbit", "ಮೊಲ", "खरगोश"), animal("Cow", "ಹಸು", "गाय"), animal("Fish", "ಮೀನು", "मछली")], 0),
        makeQ("Which bird lays eggs?", "ಮೊಟ್ಟೆ ಇಡುವ ಪಕ್ಷಿ ಯಾವುದು?", "अंडे देने वाला पक्षी कौन-सा है?",
          [animal("Hen", "ಕೋಳಿ", "मुर्गी"), animal("Cat", "ಬೆಕ್ಕು", "बिल्ली"), animal("Dog", "ನಾಯಿ", "कुत्ता")], 0),
        makeQ("Which animal lives in water?", "ನೀರಿನಲ್ಲಿ ವಾಸಿಸುವ ಪ್ರಾಣಿ ಯಾವುದು?", "पानी में रहने वाला जानवर कौन-सा है?",
          [animal("Fish", "ಮೀನು", "मछली"), animal("Lion", "ಸಿಂಹ", "शेर"), animal("Camel", "ಒಂಟೆ", "ऊँट")], 0),
        makeQ("Which animal has black and white stripes?", "ಕಪ್ಪು ಮತ್ತು ಬಿಳಿ ಪಟ್ಟೆಗಳನ್ನು ಹೊಂದಿರುವ ಪ್ರಾಣಿ ಯಾವುದು?", "काली और सफेद धारियों वाला जानवर कौन-सा है?",
          [animal("Zebra", "ಜೀಬ್ರಾ", "ज़ेब्रा"), animal("Cow", "ಹಸು", "गाय"), animal("Deer", "ಜಿಂಕೆ", "हिरण")], 0),
        makeQ("Which animal gives us wool?", "ನಮಗೆ ಉಣ್ಣೆ ನೀಡುವ ಪ್ರಾಣಿ ಯಾವುದು?", "हमें ऊन कौन-सा जानवर देता है?",
          [animal("Sheep", "ಕುರಿ", "भेड़"), animal("Tiger", "ಹುಲಿ", "बाघ"), animal("Monkey", "ಕೋತಿ", "बंदर")], 0)
      ]
    ),

    // MY INDIA
    makeCat("🇮🇳",
      { en: "My India", kn: "ನನ್ನ ಭಾರತ", hi: "मेरा भारत" },
      [
        makeQ("What is India's national bird?", "ಭಾರತದ ರಾಷ್ಟ್ರೀಯ ಪಕ್ಷಿ ಯಾವುದು?", "भारत का राष्ट्रीय पक्षी कौन-सा है?",
          [animal("Peacock", "ನವಿಲು", "मोर"), animal("Crow", "ಕಾಗೆ", "कौआ"), animal("Parrot", "ಗಿಳಿ", "तोता")], 0),
        makeQ("What is India's national animal?", "ಭಾರತದ ರಾಷ್ಟ್ರೀಯ ಪ್ರಾಣಿ ಯಾವುದು?", "भारत का राष्ट्रीय पशु कौन-सा है?",
          [animal("Tiger", "ಹುಲಿ", "बाघ"), animal("Lion", "ಸಿಂಹ", "शेर"), animal("Elephant", "ಆನೆ", "हाथी")], 0),
        makeQ("What is the capital of India?", "ಭಾರತದ ರಾಜಧಾನಿ ಯಾವುದು?", "भारत की राजधानी क्या है?",
          [animal("New Delhi", "ನವದೆಹಲಿ", "नई दिल्ली"), animal("Mumbai", "ಮುಂಬೈ", "मुंबई"), animal("Chennai", "ಚೆನ್ನೈ", "चेन्नई")], 0),
        makeQ("How many colours are in the Indian flag?", "ಭಾರತದ ಧ್ವಜದಲ್ಲಿ ಎಷ್ಟು ಬಣ್ಣಗಳಿವೆ?", "भारत के झंडे में कितने रंग हैं?",
          ["Three", "Two", "Five"], 0),
        makeQ("What is India's national flower?", "ಭಾರತದ ರಾಷ್ಟ್ರೀಯ ಹೂವು ಯಾವುದು?", "भारत का राष्ट्रीय फूल कौन-सा है?",
          [animal("Lotus", "ತಾವರೆ", "कमल"), animal("Rose", "ಗುಲಾಬಿ", "गुलाब"), animal("Sunflower", "ಸೂರ್ಯಕಾಂತಿ", "सूरजमुखी")], 0),
        makeQ("Which festival is called the festival of lights?", "ಬೆಳಕಿನ ಹಬ್ಬ ಎಂದು ಯಾವ ಹಬ್ಬವನ್ನು ಕರೆಯುತ್ತಾರೆ?", "रोशनी का त्योहार किसे कहते हैं?",
          [animal("Diwali", "ದೀಪಾವಳಿ", "दीवाली"), animal("Holi", "ಹೋಳಿ", "होली"), animal("Eid", "ಈದ್", "ईद")], 0),
        makeQ("What is India's national anthem?", "ಭಾರತದ ರಾಷ್ಟ್ರಗೀತೆ ಯಾವುದು?", "भारत का राष्ट्रगान कौन-सा है?",
          [animal("Jana Gana Mana", "ಜನ ಗಣ ಮನ", "जन गण मन"), animal("Vande Mataram", "ವಂದೇ ಮಾತರಂ", "वंदे मातरम्"), animal("Saare Jahan Se Achha", "ಸಾರೆ ಜಹಾಂ ಸೇ ಅಚ್ಛಾ", "सारे जहाँ से अच्छा")], 0),
        makeQ("Which animal is India's national aquatic animal?", "ಭಾರತದ ರಾಷ್ಟ್ರೀಯ ಜಲಚರ ಪ್ರಾಣಿ ಯಾವುದು?", "भारत का राष्ट्रीय जलीय जीव कौन-सा है?",
          [animal("Ganges River Dolphin", "ಗಂಗಾ ನದಿ ಡಾಲ್ಫಿನ್", "गंगा नदी डॉल्फिन"), animal("Shark", "ಶಾರ್ಕ್", "शार्क"), animal("Whale", "ತಿಮಿಂಗಿಲ", "व्हेल")], 0),
        makeQ("What is the currency of India?", "ಭಾರತದ ಕರೆನ್ಸಿ ಯಾವುದು?", "भारत की मुद्रा क्या है?",
          [animal("Rupee", "ರೂಪಾಯಿ", "रुपया"), animal("Dollar", "ಡಾಲರ್", "डॉलर"), animal("Euro", "ಯೂರೋ", "यूरो")], 0),
        makeQ("Which day is celebrated as Independence Day in India?", "ಭಾರತದಲ್ಲಿ ಸ್ವಾತಂತ್ರ್ಯ ದಿನವನ್ನು ಯಾವಾಗ ಆಚರಿಸುತ್ತಾರೆ?", "भारत में स्वतंत्रता दिवस कब मनाया जाता है?",
          ["15 August", "26 January", "2 October"], 0)
      ]
    ),

    // KARNATAKA
    makeCat("🌴",
      { en: "Karnataka", kn: "ಕರ್ನಾಟಕ", hi: "कर्नाटक" },
      [
        makeQ("What is the capital of Karnataka?", "ಕರ್ನಾಟಕದ ರಾಜಧಾನಿ ಯಾವುದು?", "कर्नाटक की राजधानी क्या है?",
          [animal("Bengaluru", "ಬೆಂಗಳೂರು", "बेंगलुरु"), animal("Mysuru", "ಮೈಸೂರು", "मैसूर"), animal("Delhi", "ದೆಹಲಿ", "दिल्ली")], 0),
        makeQ("Which is Karnataka's state animal?", "ಕರ್ನಾಟಕದ ರಾಜ್ಯ ಪ್ರಾಣಿ ಯಾವುದು?", "कर्नाटक का राज्य पशु कौन-सा है?",
          [animal("Elephant", "ಆನೆ", "हाथी"), animal("Tiger", "ಹುಲಿ", "बाघ"), animal("Peacock", "ನವಿಲು", "मोर")], 0),
        makeQ("Which is Karnataka's state bird?", "ಕರ್ನಾಟಕದ ರಾಜ್ಯ ಪಕ್ಷಿ ಯಾವುದು?", "कर्नाटक का राज्य पक्षी कौन-सा है?",
          [animal("Indian Roller", "ನೀಲಕಂಠ", "नीलकंठ"), animal("Crow", "ಕಾಗೆ", "कौआ"), animal("Parrot", "ಗಿಳಿ", "तोता")], 0),
        makeQ("What is the state flower of Karnataka?", "ಕರ್ನಾಟಕದ ರಾಜ್ಯ ಹೂವು ಯಾವುದು?", "कर्नाटक का राज्य फूल कौन-सा है?",
          [animal("Lotus", "ತಾವರೆ", "कमल"), animal("Rose", "ಗುಲಾಬಿ", "गुलाब"), animal("Jasmine", "ಮಲ್ಲಿಗೆ", "चमेली")], 0),
        makeQ("Which famous palace is in Mysuru?", "ಮೈಸೂರಿನ ಪ್ರಸಿದ್ಧ ಅರಮನೆ ಯಾವುದು?", "मैसूर में प्रसिद्ध महल कौन-सा है?",
          [animal("Mysore Palace", "ಮೈಸೂರು ಅರಮನೆ", "मैसूर महल"), animal("Red Fort", "ಕೆಂಪುಕೋಟೆ", "लाल किला"), animal("Taj Mahal", "ತಾಜ್ ಮಹಲ್", "ताजमहल")], 0),
        makeQ("Which language is widely spoken in Karnataka?", "ಕರ್ನಾಟಕದಲ್ಲಿ ವ್ಯಾಪಕವಾಗಿ ಮಾತನಾಡುವ ಭಾಷೆ ಯಾವುದು?", "कर्नाटक में व्यापक रूप से कौन-सी भाषा बोली जाती है?",
          [animal("Kannada", "ಕನ್ನಡ", "कन्नड़"), animal("Punjabi", "ಪಂಜಾಬಿ", "पंजाबी"), animal("Bengali", "ಬಂಗಾಳಿ", "बंगाली")], 0),
        makeQ("Which famous waterfall is in Karnataka?", "ಕರ್ನಾಟಕದ ಪ್ರಸಿದ್ಧ ಜಲಪಾತ ಯಾವುದು?", "कर्नाटक का प्रसिद्ध जलप्रपात कौन-सा है?",
          [animal("Jog Falls", "ಜೋಗ ಜಲಪಾತ", "जोग जलप्रपात"), animal("Niagara Falls", "ನಯಾಗರ ಜಲಪಾತ", "नियाग्रा जलप्रपात"), animal("Victoria Falls", "ವಿಕ್ಟೋರಿಯಾ ಜಲಪಾತ", "विक्टोरिया जलप्रपात")], 0),
        makeQ("Which city is famous for silk in Karnataka?", "ಕರ್ನಾಟಕದಲ್ಲಿ ರೇಷ್ಮೆಗೆ ಪ್ರಸಿದ್ಧವಾದ ನಗರ ಯಾವುದು?", "कर्नाटक का कौन-सा शहर रेशम के लिए प्रसिद्ध है?",
          [animal("Mysuru", "ಮೈಸೂರು", "मैसूर"), animal("Hubballi", "ಹುಬ್ಬಳ್ಳಿ", "हुबली"), animal("Ballari", "ಬಳ್ಳಾರಿ", "बल्लारी")], 0),
        makeQ("Hampi was the capital of which empire?", "ಹಂಪಿ ಯಾವ ಸಾಮ್ರಾಜ್ಯದ ರಾಜಧಾನಿಯಾಗಿತ್ತು?", "हम्पी किस साम्राज्य की राजधानी थी?",
          [animal("Vijayanagara", "ವಿಜಯನಗರ", "विजयनगर"), animal("Maurya", "ಮೌರ್ಯ", "मौर्य"), animal("Mughal", "ಮೊಘಲ್", "मुगल")], 0),
        makeQ("Which sea lies to the west of Karnataka?", "ಕರ್ನಾಟಕದ ಪಶ್ಚಿಮಕ್ಕೆ ಯಾವ ಸಮುದ್ರವಿದೆ?", "कर्नाटक के पश्चिम में कौन-सा सागर है?",
          [animal("Arabian Sea", "ಅರಬ್ಬೀ ಸಮುದ್ರ", "अरब सागर"), animal("Red Sea", "ಕೆಂಪು ಸಮುದ್ರ", "लाल सागर"), animal("Black Sea", "ಕಪ್ಪು ಸಮುದ್ರ", "काला सागर")], 0)
      ]
    ),

    // NATURE
    makeCat("🌳",
      { en: "Nature", kn: "ಪ್ರಕೃತಿ", hi: "प्रकृति" },
      [
        makeQ("What do plants need to grow?", "ಸಸ್ಯಗಳು ಬೆಳೆಯಲು ಏನು ಬೇಕು?", "पौधों को बढ़ने के लिए क्या चाहिए?",
          [animal("Sunlight and water", "ಸೂರ್ಯನ ಬೆಳಕು ಮತ್ತು ನೀರು", "धूप और पानी"), animal("Only toys", "ಆಟಿಕೆಗಳು ಮಾತ್ರ", "केवल खिलौने"), animal("Only sand", "ಮಣ್ಣು ಮಾತ್ರ", "केवल रेत")], 0),
        makeQ("Which season brings lots of rain?", "ಹೆಚ್ಚು ಮಳೆ ತರುವ ಋತು ಯಾವುದು?", "किस मौसम में बहुत बारिश होती है?",
          [animal("Monsoon", "ಮಳೆಗಾಲ", "बरसात"), animal("Summer", "ಬೇಸಿಗೆ", "गर्मी"), animal("Winter", "ಚಳಿಗಾಲ", "सर्दी")], 0),
        makeQ("Which part of a plant absorbs water?", "ಸಸ್ಯದ ಯಾವ ಭಾಗ ನೀರನ್ನು ಹೀರಿಕೊಳ್ಳುತ್ತದೆ?", "पौधे का कौन-सा भाग पानी सोखता है?",
          [animal("Roots", "ಬೇರುಗಳು", "जड़ें"), animal("Flowers", "ಹೂಗಳು", "फूल"), animal("Fruits", "ಹಣ್ಣುಗಳು", "फल")], 0),
        makeQ("What do bees collect from flowers?", "ಜೇನುನೊಣಗಳು ಹೂಗಳಿಂದ ಏನನ್ನು ಸಂಗ್ರಹಿಸುತ್ತವೆ?", "मधुमक्खियाँ फूलों से क्या इकट्ठा करती हैं?",
          [animal("Nectar", "ಮಕರಂದ", "रस"), animal("Sand", "ಮರಳು", "रेत"), animal("Leaves", "ಎಲೆಗಳು", "पत्तियाँ")], 0),
        makeQ("Which gas do humans breathe in?", "ಮನುಷ್ಯರು ಯಾವ ಅನಿಲವನ್ನು ಉಸಿರಾಡುತ್ತಾರೆ?", "मनुष्य कौन-सी गैस साँस में लेते हैं?",
          [animal("Oxygen", "ಆಮ್ಲಜನಕ", "ऑक्सीजन"), animal("Smoke", "ಹೊಗೆ", "धुआँ"), animal("Helium", "ಹೀಲಿಯಂ", "हीलियम")], 0),
        makeQ("What gives Earth light during the day?", "ಹಗಲಿನಲ್ಲಿ ಭೂಮಿಗೆ ಬೆಳಕು ನೀಡುವುದು ಯಾವುದು?", "दिन में पृथ्वी को रोशनी कौन देता है?",
          [animal("Sun", "ಸೂರ್ಯ", "सूरज"), animal("Moon", "ಚಂದ್ರ", "चाँद"), animal("Stars", "ನಕ್ಷತ್ರಗಳು", "तारे")], 0),
        makeQ("Where do fish live?", "ಮೀನುಗಳು ಎಲ್ಲಿ ವಾಸಿಸುತ್ತವೆ?", "मछलियाँ कहाँ रहती हैं?",
          [animal("Water", "ನೀರು", "पानी"), animal("Trees", "ಮರಗಳು", "पेड़"), animal("Desert", "ಮರುಭೂಮಿ", "रेगिस्तान")], 0),
        makeQ("What do we call frozen water?", "ಹೆಪ್ಪುಗಟ್ಟಿದ ನೀರನ್ನು ಏನೆಂದು ಕರೆಯುತ್ತಾರೆ?", "जमे हुए पानी को क्या कहते हैं?",
          [animal("Ice", "ಮಂಜುಗಡ್ಡೆ", "बर्फ"), animal("Steam", "ಹಬೆ", "भाप"), animal("Rain", "ಮಳೆ", "बारिश")], 0),
        makeQ("Which natural event causes thunder?", "ಗುಡುಗು ಯಾವುದರಿಂದ ಉಂಟಾಗುತ್ತದೆ?", "गरज किस प्राकृतिक घटना के साथ होती है?",
          [animal("Thunderstorm", "ಗುಡುಗು ಸಹಿತ ಮಳೆ", "आँधी-तूफान"), animal("Rainbow", "ಕಾಮನಬಿಲ್ಲು", "इंद्रधनुष"), animal("Snowfall", "ಹಿಮಪಾತ", "बर्फबारी")], 0),
        makeQ("What is a baby plant called?", "ಚಿಕ್ಕ ಸಸ್ಯವನ್ನು ಏನೆಂದು ಕರೆಯುತ್ತಾರೆ?", "छोटे पौधे को क्या कहते हैं?",
          [animal("Seedling", "ಸಸಿ", "नन्हा पौधा"), animal("Mountain", "ಪರ್ವತ", "पहाड़"), animal("Cloud", "ಮೋಡ", "बादल")], 0)
      ]
    ),

    // SPACE
    makeCat("🚀",
      { en: "Space", kn: "ಬಾಹ್ಯಾಕಾಶ", hi: "अंतरिक्ष" },
      [
        makeQ("Which star gives us light during the day?", "ಹಗಲಿನಲ್ಲಿ ಬೆಳಕು ನೀಡುವ ನಕ್ಷತ್ರ ಯಾವುದು?", "दिन में रोशनी देने वाला तारा कौन-सा है?",
          [animal("Sun", "ಸೂರ್ಯ", "सूरज"), animal("Moon", "ಚಂದ್ರ", "चाँद"), animal("Mars", "ಮಂಗಳ", "मंगल")], 0),
        makeQ("What goes around the Earth?", "ಭೂಮಿಯ ಸುತ್ತ ಸುತ್ತುವುದು ಯಾವುದು?", "पृथ्वी के चारों ओर क्या घूमता है?",
          [animal("Moon", "ಚಂದ್ರ", "चाँद"), animal("Kite", "ಗಾಳಿಪಟ", "पतंग"), animal("Cloud", "ಮೋಡ", "बादल")], 0),
        makeQ("Which planet do we live on?", "ನಾವು ಯಾವ ಗ್ರಹದಲ್ಲಿ ವಾಸಿಸುತ್ತೇವೆ?", "हम किस ग्रह पर रहते हैं?",
          [animal("Earth", "ಭೂಮಿ", "पृथ्वी"), animal("Mars", "ಮಂಗಳ", "मंगल"), animal("Jupiter", "ಗುರು", "बृहस्पति")], 0),
        makeQ("What can we see shining at night?", "ರಾತ್ರಿ ಹೊಳೆಯುವುದನ್ನು ಯಾವುದನ್ನು ನೋಡಬಹುದು?", "रात में चमकते हुए क्या दिखाई देता है?",
          [animal("Stars", "ನಕ್ಷತ್ರಗಳು", "तारे"), animal("Trees", "ಮರಗಳು", "पेड़"), animal("Fish", "ಮೀನುಗಳು", "मछलियाँ")], 0),
        makeQ("Which planet is called the Red Planet?", "ಕೆಂಪು ಗ್ರಹ ಎಂದು ಕರೆಯಲ್ಪಡುವ ಗ್ರಹ ಯಾವುದು?", "लाल ग्रह किसे कहते हैं?",
          [animal("Mars", "ಮಂಗಳ", "मंगल"), animal("Venus", "ಶುಕ್ರ", "शुक्र"), animal("Earth", "ಭೂಮಿ", "पृथ्वी")], 0),
        makeQ("What do astronauts travel in?", "ಬಾಹ್ಯಾಕಾಶ ಯಾತ್ರಿಕರು ಯಾವುದರಲ್ಲಿ ಪ್ರಯಾಣಿಸುತ್ತಾರೆ?", "अंतरिक्ष यात्री किसमें यात्रा करते हैं?",
          [animal("Spacecraft", "ಬಾಹ್ಯಾಕಾಶ ನೌಕೆ", "अंतरिक्ष यान"), animal("Bus", "ಬಸ್", "बस"), animal("Boat", "ದೋಣಿ", "नाव")], 0),
        makeQ("Is the Moon a planet?", "ಚಂದ್ರನು ಗ್ರಹವೇ?", "क्या चंद्रमा एक ग्रह है?",
          ["No, it is a natural satellite", "Yes", "It is a star"], 0),
        makeQ("Which planet has rings?", "ಉಂಗುರಗಳನ್ನು ಹೊಂದಿರುವ ಗ್ರಹ ಯಾವುದು?", "छल्लों वाला ग्रह कौन-सा है?",
          [animal("Saturn", "ಶನಿ", "शनि"), animal("Earth", "ಭೂಮಿ", "पृथ्वी"), animal("Mars", "ಮಂಗಳ", "मंगल")], 0),
        makeQ("What do we use to look at stars closely?", "ನಕ್ಷತ್ರಗಳನ್ನು ಹತ್ತಿರದಿಂದ ನೋಡಲು ಯಾವುದನ್ನು ಬಳಸುತ್ತೇವೆ?", "तारों को पास से देखने के लिए क्या उपयोग करते हैं?",
          [animal("Telescope", "ದೂರದರ್ಶಕ", "दूरबीन"), animal("Spoon", "ಚಮಚ", "चम्मच"), animal("Brush", "ಕುಂಚ", "ब्रश")], 0),
        makeQ("What is the shape of Earth?", "ಭೂಮಿಯ ಆಕಾರ ಯಾವುದು?", "पृथ्वी का आकार कैसा है?",
          [animal("Nearly spherical", "ಸುಮಾರು ಗೋಳಾಕಾರ", "लगभग गोलाकार"), animal("Square", "ಚೌಕ", "वर्ग"), animal("Triangle", "ತ್ರಿಕೋನ", "त्रिभुज")], 0)
      ]
    )
  ],

  // ==================================================
  // AGE GROUP 7-10
  // ==================================================

  [
    // INDIA
    makeCat("🇮🇳",
      { en: "India", kn: "ಭಾರತ", hi: "भारत" },
      [
        makeQ("How many states are in India?", "ಭಾರತದಲ್ಲಿ ಎಷ್ಟು ರಾಜ್ಯಗಳಿವೆ?", "भारत में कितने राज्य हैं?",
          ["28", "25", "30"], 0,
          { en: "India has 28 states and 8 union territories.", kn: "ಭಾರತದಲ್ಲಿ 28 ರಾಜ್ಯಗಳು ಮತ್ತು 8 ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶಗಳಿವೆ.", hi: "भारत में 28 राज्य और 8 केंद्र शासित प्रदेश हैं।" }),
        makeQ("Who is called the Father of the Nation?", "ರಾಷ್ಟ್ರಪಿತ ಎಂದು ಯಾರನ್ನು ಕರೆಯುತ್ತಾರೆ?", "राष्ट्रपिता किसे कहा जाता है?",
          [animal("Mahatma Gandhi", "ಮಹಾತ್ಮ ಗಾಂಧಿ", "महात्मा गांधी"), animal("Nehru", "ನೆಹರು", "नेहरू"), animal("Tagore", "ಟಾಗೋರ್", "टैगोर")], 0),
        makeQ("When did India become independent?", "ಭಾರತ ಯಾವಾಗ ಸ್ವಾತಂತ್ರ್ಯ ಪಡೆಯಿತು?", "भारत कब स्वतंत्र हुआ?",
          ["15 August 1947", "26 January 1950", "2 October 1947"], 0),
        makeQ("Who was the first Prime Minister of India?", "ಭಾರತದ ಮೊದಲ ಪ್ರಧಾನಮಂತ್ರಿ ಯಾರು?", "भारत के पहले प्रधानमंत्री कौन थे?",
          [animal("Jawaharlal Nehru", "ಜವಾಹರಲಾಲ್ ನೆಹರು", "जवाहरलाल नेहरू"), animal("Mahatma Gandhi", "ಮಹಾತ್ಮ ಗಾಂಧಿ", "महात्मा गांधी"), animal("Sardar Patel", "ಸರ್ದಾರ್ ಪಟೇಲ್", "सरदार पटेल")], 0),
        makeQ("What is India's national aquatic animal?", "ಭಾರತದ ರಾಷ್ಟ್ರೀಯ ಜಲಚರ ಪ್ರಾಣಿ ಯಾವುದು?", "भारत का राष्ट्रीय जलीय जीव कौन-सा है?",
          [animal("Ganges River Dolphin", "ಗಂಗಾ ನದಿ ಡಾಲ್ಫಿನ್", "गंगा नदी डॉल्फिन"), animal("Shark", "ಶಾರ್ಕ್", "शार्क"), animal("Whale", "ತಿಮಿಂಗಿಲ", "व्हेल")], 0),
        makeQ("Which is the national flower of India?", "ಭಾರತದ ರಾಷ್ಟ್ರೀಯ ಹೂವು ಯಾವುದು?", "भारत का राष्ट्रीय फूल कौन-सा है?",
          [animal("Lotus", "ತಾವರೆ", "कमल"), animal("Rose", "ಗುಲಾಬಿ", "गुलाब"), animal("Lily", "ಲಿಲಿ", "लिली")], 0),
        makeQ("How many spokes are there in the Ashoka Chakra?", "ಅಶೋಕ ಚಕ್ರದಲ್ಲಿ ಎಷ್ಟು ಕಡ್ಡಿಗಳಿವೆ?", "अशोक चक्र में कितनी तीलियाँ हैं?",
          ["24", "12", "30"], 0),
        makeQ("Which is India's national song?", "ಭಾರತದ ರಾಷ್ಟ್ರೀಯ ಗೀತೆ ಯಾವುದು?", "भारत का राष्ट्रीय गीत कौन-सा है?",
          [animal("Vande Mataram", "ವಂದೇ ಮಾತರಂ", "वंदे मातरम्"), animal("Jana Gana Mana", "ಜನ ಗಣ ಮನ", "जन गण मन"), animal("Saare Jahan Se Achha", "ಸಾರೆ ಜಹಾಂ ಸೇ ಅಚ್ಛಾ", "सारे जहाँ से अच्छा")], 0),
        makeQ("Who wrote the Indian national anthem?", "ಭಾರತದ ರಾಷ್ಟ್ರಗೀತೆಯನ್ನು ಬರೆದವರು ಯಾರು?", "भारत का राष्ट्रगान किसने लिखा?",
          [animal("Rabindranath Tagore", "ರವೀಂದ್ರನಾಥ ಟ್ಯಾಗೋರ್", "रवींद्रनाथ टैगोर"), animal("Mahatma Gandhi", "ಮಹಾತ್ಮ ಗಾಂಧಿ", "महात्मा गांधी"), animal("Bankim Chandra", "ಬಂಕಿಮ್ ಚಂದ್ರ", "बंकिम चंद्र")], 0),
        makeQ("When is Republic Day celebrated?", "ಗಣರಾಜ್ಯೋತ್ಸವವನ್ನು ಯಾವಾಗ ಆಚರಿಸುತ್ತಾರೆ?", "गणतंत्र दिवस कब मनाया जाता है?",
          ["26 January", "15 August", "14 November"], 0)
      ]
    ),

    // KARNATAKA
    makeCat("🌴",
      { en: "Karnataka", kn: "ಕರ್ನಾಟಕ", hi: "कर्नाटक" },
      [
        makeQ("Which famous waterfall is on the Sharavathi river?", "ಶರಾವತಿ ನದಿಯ ಮೇಲಿರುವ ಪ್ರಸಿದ್ಧ ಜಲಪಾತ ಯಾವುದು?", "शरावती नदी पर स्थित प्रसिद्ध जलप्रपात कौन-सा है?",
          [animal("Jog Falls", "ಜೋಗ ಜಲಪಾತ", "जोग जलप्रपात"), animal("Niagara", "ನಯಾಗರ", "नियाग्रा"), animal("Athirappilly", "ಅತಿರಪಳ್ಳಿ", "अथिरापल्ली")], 0),
        makeQ("Hampi was the capital of which empire?", "ಹಂಪಿ ಯಾವ ಸಾಮ್ರಾಜ್ಯದ ರಾಜಧಾನಿಯಾಗಿತ್ತು?", "हम्पी किस साम्राज्य की राजधानी थी?",
          [animal("Vijayanagara", "ವಿಜಯನಗರ", "विजयनगर"), animal("Maurya", "ಮೌರ್ಯ", "मौर्य"), animal("Mughal", "ಮೊಘಲ್", "मुगल")], 0),
        makeQ("What is the capital of Karnataka?", "ಕರ್ನಾಟಕದ ರಾಜಧಾನಿ ಯಾವುದು?", "कर्नाटक की राजधानी क्या है?",
          [animal("Bengaluru", "ಬೆಂಗಳೂರು", "बेंगलुरु"), animal("Mysuru", "ಮೈಸೂರು", "मैसूर"), animal("Mangaluru", "ಮಂಗಳೂರು", "मंगलुरु")], 0),
        makeQ("Which river flows through the city of Bengaluru?", "ಬೆಂಗಳೂರು ನಗರದ ಮೂಲಕ ಹರಿಯುವ ನದಿ ಯಾವುದು?", "बेंगलुरु शहर से होकर कौन-सी नदी बहती है?",
          [animal("Vrishabhavathi", "ವೃಷಭಾವತಿ", "वृषभवती"), animal("Ganga", "ಗಂಗಾ", "गंगा"), animal("Yamuna", "ಯಮುನಾ", "यमुना")], 0),
        makeQ("Which city is known as the cultural capital of Karnataka?", "ಕರ್ನಾಟಕದ ಸಾಂಸ್ಕೃತಿಕ ರಾಜಧಾನಿ ಎಂದು ಯಾವ ನಗರ ಪ್ರಸಿದ್ಧವಾಗಿದೆ?", "कर्नाटक की सांस्कृतिक राजधानी कौन-सा शहर है?",
          [animal("Mysuru", "ಮೈಸೂರು", "मैसूर"), animal("Delhi", "ದೆಹಲಿ", "दिल्ली"), animal("Pune", "ಪುಣೆ", "पुणे")], 0),
        makeQ("Which sea borders Karnataka?", "ಕರ್ನಾಟಕದ ಗಡಿಯಲ್ಲಿರುವ ಸಮುದ್ರ ಯಾವುದು?", "कर्नाटक की सीमा से लगा समुद्र कौन-सा है?",
          [animal("Arabian Sea", "ಅರಬ್ಬೀ ಸಮುದ್ರ", "अरब सागर"), animal("Bay of Bengal", "ಬಂಗಾಳ ಕೊಲ್ಲಿ", "बंगाल की खाड़ी"), animal("Red Sea", "ಕೆಂಪು ಸಮುದ್ರ", "लाल सागर")], 0),
        makeQ("What is the state tree of Karnataka?", "ಕರ್ನಾಟಕದ ರಾಜ್ಯ ಮರ ಯಾವುದು?", "कर्नाटक का राज्य वृक्ष कौन-सा है?",
          [animal("Sandalwood", "ಶ್ರೀಗಂಧ", "चंदन"), animal("Neem", "ಬೇವು", "नीम"), animal("Banyan", "ಆಲದ ಮರ", "बरगद")], 0),
        makeQ("Which festival is famous in Mysuru?", "ಮೈಸೂರಿನಲ್ಲಿ ಪ್ರಸಿದ್ಧವಾದ ಹಬ್ಬ ಯಾವುದು?", "मैसूर में कौन-सा त्योहार प्रसिद्ध है?",
          [animal("Dasara", "ದಸರಾ", "दशहरा"), animal("Onam", "ಓಣಂ", "ओणम"), animal("Pongal", "ಪೊಂಗಲ್", "पोंगल")], 0),
        makeQ("Which language is the official language of Karnataka?", "ಕರ್ನಾಟಕದ ಅಧಿಕೃತ ಭಾಷೆ ಯಾವುದು?", "कर्नाटक की आधिकारिक भाषा कौन-सी है?",
          [animal("Kannada", "ಕನ್ನಡ", "कन्नड़"), animal("Tamil", "ತಮಿಳು", "तमिल"), animal("Hindi", "ಹಿಂದಿ", "हिंदी")], 0),
        makeQ("Which famous temple town is in Karnataka?", "ಕರ್ನಾಟಕದಲ್ಲಿರುವ ಪ್ರಸಿದ್ಧ ದೇವಾಲಯ ಪಟ್ಟಣ ಯಾವುದು?", "कर्नाटक का प्रसिद्ध मंदिर नगर कौन-सा है?",
          [animal("Udupi", "ಉಡುಪಿ", "उडुपी"), animal("Agra", "ಆಗ್ರಾ", "आगरा"), animal("Jaipur", "ಜೈಪುರ", "जयपुर")], 0)
      ]
    ),

    // SCIENCE
    makeCat("🔬",
      { en: "Science", kn: "ವಿಜ್ಞಾನ", hi: "विज्ञान" },
      [
        makeQ("At what temperature does water boil at sea level?", "ಸಮುದ್ರ ಮಟ್ಟದಲ್ಲಿ ನೀರು ಎಷ್ಟು ತಾಪಮಾನದಲ್ಲಿ ಕುದಿಯುತ್ತದೆ?", "समुद्र तल पर पानी किस तापमान पर उबलता है?",
          ["100°C", "50°C", "0°C"], 0),
        makeQ("What lets plants make their own food?", "ಸಸ್ಯಗಳು ತಮ್ಮ ಆಹಾರವನ್ನು ತಯಾರಿಸಲು ಸಹಾಯ ಮಾಡುವ ಪ್ರಕ್ರಿಯೆ ಯಾವುದು?", "पौधों को अपना भोजन बनाने में कौन-सी प्रक्रिया मदद करती है?",
          [animal("Photosynthesis", "ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ", "प्रकाश संश्लेषण"), animal("Digestion", "ಜೀರ್ಣಕ್ರಿಯೆ", "पाचन"), animal("Evaporation", "ಆವಿಯಾಗುವಿಕೆ", "वाष्पीकरण")], 0),
        makeQ("Which organ pumps blood around the body?", "ದೇಹದಾದ್ಯಂತ ರಕ್ತವನ್ನು ಪಂಪ್ ಮಾಡುವ ಅಂಗ ಯಾವುದು?", "शरीर में रक्त पंप करने वाला अंग कौन-सा है?",
          [animal("Heart", "ಹೃದಯ", "हृदय"), animal("Lungs", "ಶ್ವಾಸಕೋಶ", "फेफड़े"), animal("Brain", "ಮೆದುಳು", "मस्तिष्क")], 0),
        makeQ("Which gas do plants absorb from the air?", "ಸಸ್ಯಗಳು ಗಾಳಿಯಿಂದ ಯಾವ ಅನಿಲವನ್ನು ಹೀರಿಕೊಳ್ಳುತ್ತವೆ?", "पौधे हवा से कौन-सी गैस लेते हैं?",
          [animal("Carbon dioxide", "ಕಾರ್ಬನ್ ಡೈಆಕ್ಸೈಡ್", "कार्बन डाइऑक्साइड"), animal("Oxygen", "ಆಮ್ಲಜನಕ", "ऑक्सीजन"), animal("Helium", "ಹೀಲಿಯಂ", "हीलियम")], 0),
        makeQ("How many legs does an insect have?", "ಕೀಟಕ್ಕೆ ಎಷ್ಟು ಕಾಲುಗಳಿರುತ್ತವೆ?", "कीड़े के कितने पैर होते हैं?",
          ["Six", "Four", "Eight"], 0),
        makeQ("Which part of the body helps us think?", "ಯೋಚಿಸಲು ದೇಹದ ಯಾವ ಭಾಗ ಸಹಾಯ ಮಾಡುತ್ತದೆ?", "सोचने में शरीर का कौन-सा भाग मदद करता है?",
          [animal("Brain", "ಮೆದುಳು", "मस्तिष्क"), animal("Heart", "ಹೃದಯ", "हृदय"), animal("Hand", "ಕೈ", "हाथ")], 0),
        makeQ("What is the hardest natural substance?", "ಅತ್ಯಂತ ಗಟ್ಟಿಯಾದ ನೈಸರ್ಗಿಕ ವಸ್ತು ಯಾವುದು?", "सबसे कठोर प्राकृतिक पदार्थ कौन-सा है?",
          [animal("Diamond", "ವಜ್ರ", "हीरा"), animal("Wood", "ಮರ", "लकड़ी"), animal("Gold", "ಚಿನ್ನ", "सोना")], 0),
        makeQ("What force pulls objects towards Earth?", "ವಸ್ತುಗಳನ್ನು ಭೂಮಿಯ ಕಡೆಗೆ ಎಳೆಯುವ ಬಲ ಯಾವುದು?", "वस्तुओं को पृथ्वी की ओर खींचने वाला बल कौन-सा है?",
          [animal("Gravity", "ಗುರುತ್ವಾಕರ್ಷಣೆ", "गुरुत्वाकर्षण"), animal("Friction", "ಘರ್ಷಣೆ", "घर्षण"), animal("Magnetism", "ಕಾಂತತ್ವ", "चुंबकत्व")], 0),
        makeQ("Which state of matter has a fixed shape?", "ಯಾವ ಸ್ಥಿತಿಯ ವಸ್ತುವಿಗೆ ನಿಗದಿತ ಆಕಾರವಿರುತ್ತದೆ?", "पदार्थ की किस अवस्था का आकार निश्चित होता है?",
          [animal("Solid", "ಘನ", "ठोस"), animal("Liquid", "ದ್ರವ", "तरल"), animal("Gas", "ಅನಿಲ", "गैस")], 0),
        makeQ("Which vitamin do we get from sunlight?", "ಸೂರ್ಯನ ಬೆಳಕಿನಿಂದ ಯಾವ ವಿಟಮಿನ್ ದೊರೆಯುತ್ತದೆ?", "सूरज की रोशनी से कौन-सा विटामिन मिलता है?",
          [animal("Vitamin D", "ವಿಟಮಿನ್ ಡಿ", "विटामिन डी"), animal("Vitamin C", "ವಿಟಮಿನ್ ಸಿ", "विटामिन सी"), animal("Vitamin B", "ವಿಟಮಿನ್ ಬಿ", "विटामिन बी")], 0)
      ]
    ),

    // SPACE
    makeCat("🪐",
      { en: "Space", kn: "ಬಾಹ್ಯಾಕಾಶ", hi: "अंतरिक्ष" },
      [
        makeQ("Which is the largest planet?", "ಅತಿದೊಡ್ಡ ಗ್ರಹ ಯಾವುದು?", "सबसे बड़ा ग्रह कौन-सा है?",
          [animal("Jupiter", "ಗುರು", "बृहस्पति"), animal("Earth", "ಭೂಮಿ", "पृथ्वी"), animal("Mars", "ಮಂಗಳ", "मंगल")], 0),
        makeQ("Chandrayaan-3 landed near which part of the Moon?", "ಚಂದ್ರಯಾನ-3 ಚಂದ್ರನ ಯಾವ ಭಾಗದ ಸಮೀಪ ಇಳಿಯಿತು?", "चंद्रयान-3 चाँद के किस भाग के पास उतरा था?",
          [animal("South pole", "ದಕ್ಷಿಣ ಧ್ರುವ", "दक्षिणी ध्रुव"), animal("Equator", "ಸಮಭಾಜಕ ರೇಖೆ", "भूमध्य रेखा"), animal("North pole", "ಉತ್ತರ ಧ್ರುವ", "उत्तरी ध्रुव")], 0),
        makeQ("Which planet is known as the Red Planet?", "ಕೆಂಪು ಗ್ರಹ ಎಂದು ಕರೆಯಲ್ಪಡುವ ಗ್ರಹ ಯಾವುದು?", "लाल ग्रह किसे कहते हैं?",
          [animal("Mars", "ಮಂಗಳ", "मंगल"), animal("Venus", "ಶುಕ್ರ", "शुक्र"), animal("Saturn", "ಶನಿ", "शनि")], 0),
        makeQ("Which planet is closest to the Sun?", "ಸೂರ್ಯನಿಗೆ ಅತ್ಯಂತ ಹತ್ತಿರವಿರುವ ಗ್ರಹ ಯಾವುದು?", "सूर्य के सबसे पास कौन-सा ग्रह है?",
          [animal("Mercury", "ಬುಧ", "बुध"), animal("Earth", "ಭೂಮಿ", "पृथ्वी"), animal("Neptune", "ವರುಣ", "वरुण")], 0),
        makeQ("How many planets are in our solar system?", "ನಮ್ಮ ಸೌರಮಂಡಲದಲ್ಲಿ ಎಷ್ಟು ಗ್ರಹಗಳಿವೆ?", "हमारे सौर मंडल में कितने ग्रह हैं?",
          ["Eight", "Nine", "Seven"], 0),
        makeQ("Which planet is famous for its rings?", "ಉಂಗುರಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾದ ಗ್ರಹ ಯಾವುದು?", "छल्लों के लिए प्रसिद्ध ग्रह कौन-सा है?",
          [animal("Saturn", "ಶನಿ", "शनि"), animal("Mars", "ಮಂಗಳ", "मंगल"), animal("Earth", "ಭೂಮಿ", "पृथ्वी")], 0),
        makeQ("What is the name of our galaxy?", "ನಮ್ಮ ನಕ್ಷತ್ರಪುಂಜದ ಹೆಸರು ಏನು?", "हमारी आकाशगंगा का नाम क्या है?",
          [animal("Milky Way", "ಕ್ಷೀರಪಥ", "आकाशगंगा"), animal("Andromeda", "ಆಂಡ್ರೊಮಿಡಾ", "एंड्रोमेडा"), animal("Orion", "ಓರಿಯನ್", "ओरायन")], 0),
        makeQ("Who was the first person to walk on the Moon?", "ಚಂದ್ರನ ಮೇಲೆ ನಡೆದ ಮೊದಲ ವ್ಯಕ್ತಿ ಯಾರು?", "चंद्रमा पर चलने वाले पहले व्यक्ति कौन थे?",
          [animal("Neil Armstrong", "ನೀಲ್ ಆರ್ಮ್‌ಸ್ಟ್ರಾಂಗ್", "नील आर्मस्ट्रांग"), animal("Rakesh Sharma", "ರಾಕೇಶ್ ಶರ್ಮಾ", "राकेश शर्मा"), animal("Yuri Gagarin", "ಯೂರಿ ಗಗಾರಿನ್", "यूरी गगारिन")], 0),
        makeQ("What is the Sun?", "ಸೂರ್ಯ ಎಂದರೇನು?", "सूर्य क्या है?",
          [animal("A star", "ನಕ್ಷತ್ರ", "एक तारा"), animal("A planet", "ಗ್ರಹ", "एक ग्रह"), animal("A moon", "ಉಪಗ್ರಹ", "एक चंद्रमा")], 0),
        makeQ("Which planet is known for supporting life?", "ಜೀವಿಗಳಿಗೆ ಅನುಕೂಲಕರವಾದ ಗ್ರಹ ಯಾವುದು?", "जीवन के लिए अनुकूल ग्रह कौन-सा है?",
          [animal("Earth", "ಭೂಮಿ", "पृथ्वी"), animal("Mars", "ಮಂಗಳ", "मंगल"), animal("Venus", "ಶುಕ್ರ", "शुक्र")], 0)
      ]
    ),

    // WORLD
    makeCat("🌏",
      { en: "World", kn: "ಜಗತ್ತು", hi: "विश्व" },
      [
        makeQ("What is the capital of Japan?", "ಜಪಾನ್ ದೇಶದ ರಾಜಧಾನಿ ಯಾವುದು?", "जापान की राजधानी क्या है?",
          [animal("Tokyo", "ಟೋಕಿಯೋ", "टोक्यो"), animal("Beijing", "ಬೀಜಿಂಗ್", "बीजिंग"), animal("Seoul", "ಸಿಯೋಲ್", "सियोल")], 0),
        makeQ("Which is the largest ocean?", "ಅತಿದೊಡ್ಡ ಮಹಾಸಾಗರ ಯಾವುದು?", "सबसे बड़ा महासागर कौन-सा है?",
          [animal("Pacific", "ಪೆಸಿಫಿಕ್", "प्रशांत महासागर"), animal("Atlantic", "ಅಟ್ಲಾಂಟಿಕ್", "अटलांटिक महासागर"), animal("Indian", "ಹಿಂದೂ ಮಹಾಸಾಗರ", "हिंद महासागर")], 0),
        makeQ("Which is the largest continent?", "ಅತಿದೊಡ್ಡ ಖಂಡ ಯಾವುದು?", "सबसे बड़ा महाद्वीप कौन-सा है?",
          [animal("Asia", "ಏಷ್ಯಾ", "एशिया"), animal("Africa", "ಆಫ್ರಿಕಾ", "अफ्रीका"), animal("Europe", "ಯುರೋಪ್", "यूरोप")], 0),
        makeQ("Which country is famous for the pyramids of Giza?", "ಗಿಜಾದ ಪಿರಮಿಡ್‌ಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾದ ದೇಶ ಯಾವುದು?", "गीज़ा के पिरामिड किस देश में हैं?",
          [animal("Egypt", "ಈಜಿಪ್ಟ್", "मिस्र"), animal("Japan", "ಜಪಾನ್", "जापान"), animal("Brazil", "ಬ್ರೆಜಿಲ್", "ब्राज़ील")], 0),
        makeQ("Which is the smallest continent?", "ಅತ್ಯಂತ ಚಿಕ್ಕ ಖಂಡ ಯಾವುದು?", "सबसे छोटा महाद्वीप कौन-सा है?",
          [animal("Australia", "ಆಸ್ಟ್ರೇಲಿಯಾ", "ऑस्ट्रेलिया"), animal("Asia", "ಏಷ್ಯಾ", "एशिया"), animal("Africa", "ಆಫ್ರಿಕಾ", "अफ्रीका")], 0),
        makeQ("Which country is shaped like a boot?", "ಬೂಟಿನ ಆಕಾರದಲ್ಲಿರುವ ದೇಶ ಯಾವುದು?", "बूट के आकार वाला देश कौन-सा है?",
          [animal("Italy", "ಇಟಲಿ", "इटली"), animal("India", "ಭಾರತ", "भारत"), animal("China", "ಚೀನಾ", "चीन")], 0),
        makeQ("What is the capital of France?", "ಫ್ರಾನ್ಸ್‌ನ ರಾಜಧಾನಿ ಯಾವುದು?", "फ्रांस की राजधानी क्या है?",
          [animal("Paris", "ಪ್ಯಾರಿಸ್", "पेरिस"), animal("London", "ಲಂಡನ್", "लंदन"), animal("Rome", "ರೋಮ್", "रोम")], 0),
        makeQ("Which is the coldest continent?", "ಅತ್ಯಂತ ಶೀತಲ ಖಂಡ ಯಾವುದು?", "सबसे ठंडा महाद्वीप कौन-सा है?",
          [animal("Antarctica", "ಅಂಟಾರ್ಕ್ಟಿಕಾ", "अंटार्कटिका"), animal("Africa", "ಆಫ್ರಿಕಾ", "अफ्रीका"), animal("Asia", "ಏಷ್ಯಾ", "एशिया")], 0),
        makeQ("Which country has the Great Wall?", "ಗ್ರೇಟ್ ವಾಲ್ ಇರುವ ದೇಶ ಯಾವುದು?", "महान दीवार किस देश में है?",
          [animal("China", "ಚೀನಾ", "चीन"), animal("India", "ಭಾರತ", "भारत"), animal("Canada", "ಕೆನಡಾ", "कनाडा")], 0),
        makeQ("Which is the highest mountain in the world?", "ವಿಶ್ವದ ಅತ್ಯಂತ ಎತ್ತರದ ಪರ್ವತ ಯಾವುದು?", "दुनिया का सबसे ऊँचा पर्वत कौन-सा है?",
          [animal("Mount Everest", "ಮೌಂಟ್ ಎವರೆಸ್ಟ್", "माउंट एवरेस्ट"), animal("K2", "ಕೆ2", "के2"), animal("Kilimanjaro", "ಕಿಲಿಮಂಜಾರೋ", "किलिमंजारो")], 0)
      ]
    ),

    // INVENTORS
    makeCat("💡",
      { en: "Inventors", kn: "ಆವಿಷ್ಕಾರಕರು", hi: "आविष्कारक" },
      [
        makeQ("Who is commonly credited with inventing the telephone?", "ದೂರವಾಣಿಯ ಆವಿಷ್ಕಾರಕ್ಕೆ ಸಾಮಾನ್ಯವಾಗಿ ಯಾರಿಗೆ ಮನ್ನಣೆ ನೀಡಲಾಗುತ್ತದೆ?", "टेलीफोन के आविष्कार का श्रेय आमतौर पर किसे दिया जाता है?",
          [animal("Alexander Graham Bell", "ಅಲೆಕ್ಸಾಂಡರ್ ಗ್ರಹಾಂ ಬೆಲ್", "अलेक्जेंडर ग्राहम बेल"), animal("Edison", "ಎಡಿಸನ್", "एडिसन"), animal("Newton", "ನ್ಯೂಟನ್", "न्यूटन")], 0),
        makeQ("Which Indian won the Nobel Prize in Physics in 1930?", "1930ರಲ್ಲಿ ಭೌತಶಾಸ್ತ್ರದ ನೋಬೆಲ್ ಪ್ರಶಸ್ತಿ ಗೆದ್ದ ಭಾರತೀಯರು ಯಾರು?", "1930 में भौतिकी का नोबेल पुरस्कार जीतने वाले भारतीय कौन थे?",
          [animal("C. V. Raman", "ಸಿ. ವಿ. ರಾಮನ್", "सी. वी. रमन"), animal("Homi Bhabha", "ಹೋಮಿ ಭಾಭಾ", "होमी भाभा"), animal("Vikram Sarabhai", "ವಿಕ್ರಮ್ ಸಾರಾಭಾಯಿ", "विक्रम साराभाई")], 0),
        makeQ("Who developed the practical electric light bulb?", "ಪ್ರಾಯೋಗಿಕ ವಿದ್ಯುತ್ ಬಲ್ಬ್ ಅಭಿವೃದ್ಧಿಪಡಿಸಿದವರು ಯಾರು?", "व्यावहारिक बिजली के बल्ब को विकसित करने का श्रेय किसे दिया जाता है?",
          [animal("Thomas Edison", "ಥಾಮಸ್ ಎಡಿಸನ್", "थॉमस एडिसन"), animal("Newton", "ನ್ಯೂಟನ್", "न्यूटन"), animal("Einstein", "ಐನ್‌ಸ್ಟೈನ್", "आइंस्टीन")], 0),
        makeQ("Who invented the printing press in Europe?", "ಯುರೋಪಿನಲ್ಲಿ ಮುದ್ರಣ ಯಂತ್ರವನ್ನು ಕಂಡುಹಿಡಿದವರು ಯಾರು?", "यूरोप में प्रिंटिंग प्रेस का आविष्कार किसने किया?",
          [animal("Johannes Gutenberg", "ಜೋಹಾನ್ಸ್ ಗುಟೆನ್‌ಬರ್ಗ್", "जोहान्स गुटेनबर्ग"), animal("Galileo", "ಗೆಲಿಲಿಯೋ", "गैलीलियो"), animal("Bell", "ಬೆಲ್", "बेल")], 0),
        makeQ("Who is associated with the discovery of gravity?", "ಗುರುತ್ವಾಕರ್ಷಣೆಯ ವಿವರಣೆಯೊಂದಿಗೆ ಸಂಬಂಧಿಸಿದ ವಿಜ್ಞಾನಿ ಯಾರು?", "गुरुत्वाकर्षण की व्याख्या से कौन-से वैज्ञानिक जुड़े हैं?",
          [animal("Isaac Newton", "ಐಸಾಕ್ ನ್ಯೂಟನ್", "आइज़ैक न्यूटन"), animal("Edison", "ಎಡಿಸನ್", "एडिसन"), animal("Darwin", "ಡಾರ್ವಿನ್", "डार्विन")], 0),
        makeQ("Who developed the theory of relativity?", "ಸಾಪೇಕ್ಷತಾ ಸಿದ್ಧಾಂತವನ್ನು ಅಭಿವೃದ್ಧಿಪಡಿಸಿದವರು ಯಾರು?", "सापेक्षता का सिद्धांत किसने दिया?",
          [animal("Albert Einstein", "ಆಲ್ಬರ್ಟ್ ಐನ್‌ಸ್ಟೈನ್", "अल्बर्ट आइंस्टीन"), animal("C. V. Raman", "ಸಿ. ವಿ. ರಾಮನ್", "सी. वी. रमन"), animal("Bell", "ಬೆಲ್", "बेल")], 0),
        makeQ("Who invented the World Wide Web?", "ವರ್ಲ್ಡ್ ವೈಡ್ ವೆಬ್ ಅನ್ನು ಕಂಡುಹಿಡಿದವರು ಯಾರು?", "वर्ल्ड वाइड वेब का आविष्कार किसने किया?",
          [animal("Tim Berners-Lee", "ಟಿಮ್ ಬರ್ನರ್ಸ್-ಲೀ", "टिम बर्नर्स-ली"), animal("Bill Gates", "ಬಿಲ್ ಗೇಟ್ಸ್", "बिल गेट्स"), animal("Steve Jobs", "ಸ್ಟೀವ್ ಜಾಬ್ಸ್", "स्टीव जॉब्स")], 0),
        makeQ("Who is associated with the invention of the airplane?", "ವಿಮಾನ ಆವಿಷ್ಕಾರದೊಂದಿಗೆ ಸಂಬಂಧಿಸಿದವರು ಯಾರು?", "हवाई जहाज़ के आविष्कार से कौन जुड़े हैं?",
          [animal("Wright brothers", "ರೈಟ್ ಸಹೋದರರು", "राइट बंधु"), animal("Lumière brothers", "ಲುಮಿಯೇರ್ ಸಹೋದರರು", "लुमिएर बंधु"), animal("Montgolfier brothers", "ಮಾಂಟ್‌ಗೋಲ್ಫಿಯರ್ ಸಹೋದರರು", "मोंटगोल्फियर बंधु")], 0),
        makeQ("Who discovered penicillin?", "ಪೆನಿಸಿಲಿನ್ ಕಂಡುಹಿಡಿದವರು ಯಾರು?", "पेनिसिलिन की खोज किसने की?",
          [animal("Alexander Fleming", "ಅಲೆಕ್ಸಾಂಡರ್ ಫ್ಲೆಮಿಂಗ್", "अलेक्जेंडर फ्लेमिंग"), animal("Newton", "ನ್ಯೂಟನ್", "न्यूटन"), animal("Einstein", "ಐನ್‌ಸ್ಟೈನ್", "आइंस्टीन")], 0),
        makeQ("Who is known for inventing the first successful mechanical computer design called the Analytical Engine?", "ಅನಾಲಿಟಿಕಲ್ ಎಂಜಿನ್ ಎಂಬ ಯಾಂತ್ರಿಕ ಕಂಪ್ಯೂಟರ್ ವಿನ್ಯಾಸಕ್ಕೆ ಹೆಸರಾದವರು ಯಾರು?", "एनालिटिकल इंजन नामक यांत्रिक कंप्यूटर की रूपरेखा किसने बनाई?",
          [animal("Charles Babbage", "ಚಾರ್ಲ್ಸ್ ಬ್ಯಾಬೇಜ್", "चार्ल्स बैबेज"), animal("Alan Turing", "ಅಲನ್ ಟ್ಯೂರಿಂಗ್", "एलन ट्यूरिंग"), animal("Edison", "ಎಡಿಸನ್", "एडिसन")], 0)
      ]
    )
  ]
];
