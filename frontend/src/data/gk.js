
/*
  GK by age group, then category.

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

  if (explanation) {
    q.push(explanation);
  }

  return q;
};

const makeCat = (emoji, names, questions) => ({
  e: emoji,
  n: names,
  q: questions
});

export const GK = [

  // --------------------------------------------------
  // AGE GROUP 1–3
  // Picture recognition
  // --------------------------------------------------

  [
    makeCat("🐶",
      {
        en: "Animals",
        kn: "ಪ್ರಾಣಿಗಳು",
        hi: "जानवर"
      },
      [
        makeQ(
          "Where is the cat?",
          "ಬೆಕ್ಕು ಎಲ್ಲಿದೆ?",
          "बिल्ली कहाँ है?",
          ["🐶", "🐱", "🐮"],
          1,
          {
            en: "Yes! This is a cat.",
            kn: "ಹೌದು! ಇದು ಬೆಕ್ಕು.",
            hi: "हाँ! यह बिल्ली है।"
          }
        ),
        makeQ(
          "Where is the cow?",
          "ಹಸು ಎಲ್ಲಿದೆ?",
          "गाय कहाँ है?",
          ["🐮", "🐸", "🐑"],
          0,
          {
            en: "Yes! This is a cow.",
            kn: "ಹೌದು! ಇದು ಹಸು.",
            hi: "हाँ! यह गाय है।"
          }
        ),
        makeQ(
          "Where is the elephant?",
          "ಆನೆ ಎಲ್ಲಿದೆ?",
          "हाथी कहाँ है?",
          ["🦁", "🐘", "🐦"],
          1,
          {
            en: "Yes! This is an elephant.",
            kn: "ಹೌದು! ಇದು ಆನೆ.",
            hi: "हाँ! यह हाथी है।"
          }
        )
      ]
    ),

    makeCat("🎨",
      {
        en: "Colours",
        kn: "ಬಣ್ಣಗಳು",
        hi: "रंग"
      },
      [
        makeQ(
          "Find red!",
          "ಕೆಂಪು ಬಣ್ಣವನ್ನು ಹುಡುಕಿ!",
          "लाल रंग ढूँढो!",
          ["🔵", "🔴", "🟡"],
          1
        ),
        makeQ(
          "Find blue!",
          "ನೀಲಿ ಬಣ್ಣವನ್ನು ಹುಡುಕಿ!",
          "नीला रंग ढूँढो!",
          ["🟢", "🔵", "🟠"],
          1
        ),
        makeQ(
          "Find yellow!",
          "ಹಳದಿ ಬಣ್ಣವನ್ನು ಹುಡುಕಿ!",
          "पीला रंग ढूँढो!",
          ["🟡", "🟣", "🔴"],
          0
        )
      ]
    ),

    makeCat("🍎",
      {
        en: "Fruits",
        kn: "ಹಣ್ಣುಗಳು",
        hi: "फल"
      },
      [
        makeQ(
          "Find the banana!",
          "ಬಾಳೆಹಣ್ಣನ್ನು ಹುಡುಕಿ!",
          "केला ढूँढो!",
          ["🍎", "🍌", "🍇"],
          1
        ),
        makeQ(
          "Find the apple!",
          "ಸೇಬನ್ನು ಹುಡುಕಿ!",
          "सेब ढूँढो!",
          ["🍎", "🥭", "🍌"],
          0
        ),
        makeQ(
          "Find the mango!",
          "ಮಾವಿನಹಣ್ಣನ್ನು ಹುಡುಕಿ!",
          "आम ढूँढो!",
          ["🍇", "🍌", "🥭"],
          2
        )
      ]
    ),

    makeCat("🧍",
      {
        en: "My Body",
        kn: "ನನ್ನ ದೇಹ",
        hi: "मेरा शरीर"
      },
      [
        makeQ(
          "Where are your eyes?",
          "ನಿನ್ನ ಕಣ್ಣುಗಳು ಎಲ್ಲಿವೆ?",
          "तुम्हारी आँखें कहाँ हैं?",
          ["👂", "👀", "👃"],
          1
        ),
        makeQ(
          "Where are your ears?",
          "ನಿನ್ನ ಕಿವಿಗಳು ಎಲ್ಲಿವೆ?",
          "तुम्हारे कान कहाँ हैं?",
          ["👂", "👄", "👃"],
          0
        ),
        makeQ(
          "Where is your nose?",
          "ನಿನ್ನ ಮೂಗು ಎಲ್ಲಿದೆ?",
          "तुम्हारी नाक कहाँ है?",
          ["👃", "🦶", "✋"],
          0
        )
      ]
    ),

    makeCat("⭐",
      {
        en: "Shapes",
        kn: "ಆಕಾರಗಳು",
        hi: "आकार"
      },
      [
        makeQ(
          "Find the star!",
          "ನಕ್ಷತ್ರವನ್ನು ಹುಡುಕಿ!",
          "तारा ढूँढो!",
          ["⭐", "🔺", "❤️"],
          0
        ),
        makeQ(
          "Find the heart!",
          "ಹೃದಯದ ಆಕಾರವನ್ನು ಹುಡುಕಿ!",
          "दिल का आकार ढूँढो!",
          ["❤️", "⭐", "⚫"],
          0
        ),
        makeQ(
          "Find the circle!",
          "ವೃತ್ತವನ್ನು ಹುಡುಕಿ!",
          "गोल आकार ढूँढो!",
          ["🟥", "⚫", "🔺"],
          1
        )
      ]
    )
  ],

  // --------------------------------------------------
  // AGE GROUP 4–6
  // --------------------------------------------------

  [
    makeCat("🦁",
      {
        en: "Animals & Birds",
        kn: "ಪ್ರಾಣಿಗಳು ಮತ್ತು ಪಕ್ಷಿಗಳು",
        hi: "जानवर और पक्षी"
      },
      [
        makeQ(
          "Which animal gives us milk?",
          "ನಮಗೆ ಹಾಲು ನೀಡುವ ಪ್ರಾಣಿ ಯಾವುದು?",
          "हमें दूध कौन-सा जानवर देता है?",
          [
            { en: "Cow", kn: "ಹಸು", hi: "गाय" },
            { en: "Lion", kn: "ಸಿಂಹ", hi: "शेर" },
            { en: "Frog", kn: "ಕಪ್ಪೆ", hi: "मेंढक" }
          ],
          0
        ),
        makeQ(
          "Which is the biggest animal on land?",
          "ಭೂಮಿಯ ಮೇಲಿನ ಅತಿ ದೊಡ್ಡ ಪ್ರಾಣಿ ಯಾವುದು?",
          "ज़मीन पर सबसे बड़ा जानवर कौन-सा है?",
          [
            { en: "Elephant", kn: "ಆನೆ", hi: "हाथी" },
            { en: "Cat", kn: "ಬೆಕ್ಕು", hi: "बिल्ली" },
            { en: "Dog", kn: "ನಾಯಿ", hi: "कुत्ता" }
          ],
          0,
          {
            en: "Elephants are the biggest land animals.",
            kn: "ಆನೆಗಳು ಭೂಮಿಯ ಮೇಲಿನ ಅತಿ ದೊಡ್ಡ ಪ್ರಾಣಿಗಳು.",
            hi: "हाथी ज़मीन पर रहने वाले सबसे बड़े जानवर हैं।"
          }
        )
      ]
    ),

    makeCat("🇮🇳",
      {
        en: "My India",
        kn: "ನನ್ನ ಭಾರತ",
        hi: "मेरा भारत"
      },
      [
        makeQ(
          "What is India's national bird?",
          "ಭಾರತದ ರಾಷ್ಟ್ರೀಯ ಪಕ್ಷಿ ಯಾವುದು?",
          "भारत का राष्ट्रीय पक्षी कौन-सा है?",
          [
            { en: "Peacock", kn: "ನವಿಲು", hi: "मोर" },
            { en: "Crow", kn: "ಕಾಗೆ", hi: "कौआ" },
            { en: "Parrot", kn: "ಗಿಳಿ", hi: "तोता" }
          ],
          0
        ),
        makeQ(
          "What colours are in India's flag?",
          "ಭಾರತದ ಧ್ವಜದಲ್ಲಿ ಯಾವ ಬಣ್ಣಗಳಿವೆ?",
          "भारत के झंडे में कौन-से रंग हैं?",
          [
            {
              en: "Saffron, white, green",
              kn: "ಕೇಸರಿ, ಬಿಳಿ, ಹಸಿರು",
              hi: "केसरिया, सफेद, हरा"
            },
            {
              en: "Red, black, pink",
              kn: "ಕೆಂಪು, ಕಪ್ಪು, ಗುಲಾಬಿ",
              hi: "लाल, काला, गुलाबी"
            },
            {
              en: "Blue, grey, brown",
              kn: "ನೀಲಿ, ಬೂದು, ಕಂದು",
              hi: "नीला, स्लेटी, भूरा"
            }
          ],
          0,
          {
            en: "There is also a blue wheel in the middle.",
            kn: "ಧ್ವಜದ ಮಧ್ಯದಲ್ಲಿ ನೀಲಿ ಬಣ್ಣದ ಚಕ್ರವೂ ಇದೆ.",
            hi: "झंडे के बीच में एक नीला चक्र भी है।"
          }
        )
      ]
    ),

    makeCat("🌴",
      {
        en: "Karnataka",
        kn: "ಕರ್ನಾಟಕ",
        hi: "कर्नाटक"
      },
      [
        makeQ(
          "What is the capital of Karnataka?",
          "ಕರ್ನಾಟಕದ ರಾಜಧಾನಿ ಯಾವುದು?",
          "कर्नाटक की राजधानी क्या है?",
          [
            { en: "Bengaluru", kn: "ಬೆಂಗಳೂರು", hi: "बेंगलुरु" },
            { en: "Mysuru", kn: "ಮೈಸೂರು", hi: "मैसूर" },
            { en: "Delhi", kn: "ದೆಹಲಿ", hi: "दिल्ली" }
          ],
          0
        ),
        makeQ(
          "Which animal is Karnataka's state animal?",
          "ಕರ್ನಾಟಕದ ರಾಜ್ಯ ಪ್ರಾಣಿ ಯಾವುದು?",
          "कर्नाटक का राज्य पशु कौन-सा है?",
          [
            { en: "Tiger", kn: "ಹುಲಿ", hi: "बाघ" },
            { en: "Elephant", kn: "ಆನೆ", hi: "हाथी" },
            { en: "Peacock", kn: "ನವಿಲು", hi: "मोर" }
          ],
          1
        )
      ]
    ),

    makeCat("🌳",
      {
        en: "Nature",
        kn: "ಪ್ರಕೃತಿ",
        hi: "प्रकृति"
      },
      [
        makeQ(
          "What do plants need to grow?",
          "ಸಸ್ಯಗಳು ಬೆಳೆಯಲು ಏನು ಬೇಕು?",
          "पौधों को बढ़ने के लिए क्या चाहिए?",
          [
            {
              en: "Sunlight and water",
              kn: "ಸೂರ್ಯನ ಬೆಳಕು ಮತ್ತು ನೀರು",
              hi: "धूप और पानी"
            },
            {
              en: "Only toys",
              kn: "ಆಟಿಕೆಗಳು ಮಾತ್ರ",
              hi: "केवल खिलौने"
            },
            {
              en: "Only sand",
              kn: "ಮಣ್ಣು ಮಾತ್ರ",
              hi: "केवल रेत"
            }
          ],
          0
        ),
        makeQ(
          "Which season brings lots of rain?",
          "ಹೆಚ್ಚು ಮಳೆ ತರುವ ಋತು ಯಾವುದು?",
          "किस मौसम में बहुत बारिश होती है?",
          [
            { en: "Monsoon", kn: "ಮಳೆಗಾಲ", hi: "बरसात का मौसम" },
            { en: "Summer", kn: "ಬೇಸಿಗೆ", hi: "गर्मी" },
            { en: "Winter", kn: "ಚಳಿಗಾಲ", hi: "सर्दी" }
          ],
          0
        )
      ]
    ),

    makeCat("🚀",
      {
        en: "Space",
        kn: "ಬಾಹ್ಯಾಕಾಶ",
        hi: "अंतरिक्ष"
      },
      [
        makeQ(
          "Which star gives us light in the day?",
          "ಹಗಲಿನಲ್ಲಿ ನಮಗೆ ಬೆಳಕು ನೀಡುವ ನಕ್ಷತ್ರ ಯಾವುದು?",
          "दिन में हमें रोशनी देने वाला तारा कौन-सा है?",
          [
            { en: "Sun", kn: "ಸೂರ್ಯ", hi: "सूरज" },
            { en: "Moon", kn: "ಚಂದ್ರ", hi: "चाँद" },
            { en: "Mars", kn: "ಮಂಗಳ", hi: "मंगल" }
          ],
          0
        ),
        makeQ(
          "What goes around the Earth?",
          "ಭೂಮಿಯ ಸುತ್ತ ಸುತ್ತುವುದು ಯಾವುದು?",
          "पृथ्वी के चारों ओर क्या घूमता है?",
          [
            { en: "The Moon", kn: "ಚಂದ್ರ", hi: "चाँद" },
            { en: "A kite", kn: "ಗಾಳಿಪಟ", hi: "पतंग" },
            { en: "A cloud", kn: "ಮೋಡ", hi: "बादल" }
          ],
          0
        )
      ]
    )
  ],

  // --------------------------------------------------
  // AGE GROUP 7–10
  // --------------------------------------------------

  [
    makeCat("🇮🇳",
      {
        en: "India",
        kn: "ಭಾರತ",
        hi: "भारत"
      },
      [
        makeQ(
          "How many states are in India?",
          "ಭಾರತದಲ್ಲಿ ಎಷ್ಟು ರಾಜ್ಯಗಳಿವೆ?",
          "भारत में कितने राज्य हैं?",
          ["28", "25", "30"],
          0,
          {
            en: "India has 28 states and 8 union territories.",
            kn: "ಭಾರತದಲ್ಲಿ 28 ರಾಜ್ಯಗಳು ಮತ್ತು 8 ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶಗಳಿವೆ.",
            hi: "भारत में 28 राज्य और 8 केंद्र शासित प्रदेश हैं।"
          }
        ),
        makeQ(
          "Who is called the Father of the Nation?",
          "ರಾಷ್ಟ್ರಪಿತ ಎಂದು ಯಾರನ್ನು ಕರೆಯುತ್ತಾರೆ?",
          "राष्ट्रपिता किसे कहा जाता है?",
          [
            {
              en: "Mahatma Gandhi",
              kn: "ಮಹಾತ್ಮ ಗಾಂಧಿ",
              hi: "महात्मा गांधी"
            },
            { en: "Nehru", kn: "ನೆಹರು", hi: "नेहरू" },
            { en: "Tagore", kn: "ಟಾಗೋರ್", hi: "टैगोर" }
          ],
          0
        )
      ]
    ),

    makeCat("🌴",
      {
        en: "Karnataka",
        kn: "ಕರ್ನಾಟಕ",
        hi: "कर्नाटक"
      },
      [
        makeQ(
          "Which famous waterfall is on the Sharavathi river?",
          "ಶರಾವತಿ ನದಿಯ ಮೇಲಿರುವ ಪ್ರಸಿದ್ಧ ಜಲಪಾತ ಯಾವುದು?",
          "शरावती नदी पर स्थित प्रसिद्ध जलप्रपात कौन-सा है?",
          [
            { en: "Jog Falls", kn: "ಜೋಗ ಜಲಪಾತ", hi: "जोग जलप्रपात" },
            { en: "Niagara", kn: "ನಯಾಗರ", hi: "नियाग्रा" },
            {
              en: "Athirappilly",
              kn: "ಅತಿರಪಳ್ಳಿ",
              hi: "अथिरापल्ली"
            }
          ],
          0
        ),
        makeQ(
          "Hampi was the capital of which empire?",
          "ಹಂಪಿ ಯಾವ ಸಾಮ್ರಾಜ್ಯದ ರಾಜಧಾನಿಯಾಗಿತ್ತು?",
          "हम्पी किस साम्राज्य की राजधानी थी?",
          [
            {
              en: "Vijayanagara",
              kn: "ವಿಜಯನಗರ",
              hi: "विजयनगर"
            },
            { en: "Maurya", kn: "ಮೌರ್ಯ", hi: "मौर्य" },
            { en: "Mughal", kn: "ಮೊಘಲ್", hi: "मुगल" }
          ],
          0
        )
      ]
    ),

    makeCat("🔬",
      {
        en: "Science",
        kn: "ವಿಜ್ಞಾನ",
        hi: "विज्ञान"
      },
      [
        makeQ(
          "At what temperature does water boil at sea level?",
          "ಸಮುದ್ರ ಮಟ್ಟದಲ್ಲಿ ನೀರು ಎಷ್ಟು ತಾಪಮಾನದಲ್ಲಿ ಕುದಿಯುತ್ತದೆ?",
          "समुद्र तल पर पानी किस तापमान पर उबलता है?",
          ["100°C", "50°C", "0°C"],
          0
        ),
        makeQ(
          "What lets plants make their own food?",
          "ಸಸ್ಯಗಳು ತಮ್ಮ ಆಹಾರವನ್ನು ತಯಾರಿಸಲು ಸಹಾಯ ಮಾಡುವ ಪ್ರಕ್ರಿಯೆ ಯಾವುದು?",
          "पौधों को अपना भोजन बनाने में कौन-सी प्रक्रिया मदद करती है?",
          [
            {
              en: "Photosynthesis",
              kn: "ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ",
              hi: "प्रकाश संश्लेषण"
            },
            {
              en: "Digestion",
              kn: "ಜೀರ್ಣಕ್ರಿಯೆ",
              hi: "पाचन"
            },
            {
              en: "Evaporation",
              kn: "ಆವಿಯಾಗುವಿಕೆ",
              hi: "वाष्पीकरण"
            }
          ],
          0
        )
      ]
    ),

    makeCat("🪐",
      {
        en: "Space",
        kn: "ಬಾಹ್ಯಾಕಾಶ",
        hi: "अंतरिक्ष"
      },
      [
        makeQ(
          "Which is the largest planet?",
          "ಅತಿದೊಡ್ಡ ಗ್ರಹ ಯಾವುದು?",
          "सबसे बड़ा ग्रह कौन-सा है?",
          [
            { en: "Jupiter", kn: "ಗುರು", hi: "बृहस्पति" },
            { en: "Earth", kn: "ಭೂಮಿ", hi: "पृथ्वी" },
            { en: "Mars", kn: "ಮಂಗಳ", hi: "मंगल" }
          ],
          0
        ),
        makeQ(
          "Chandrayaan-3 landed near which part of the Moon?",
          "ಚಂದ್ರಯಾನ-3 ಚಂದ್ರನ ಯಾವ ಭಾಗದ ಸಮೀಪ ಇಳಿಯಿತು?",
          "चंद्रयान-3 चाँद के किस भाग के पास उतरा था?",
          [
            {
              en: "South pole",
              kn: "ದಕ್ಷಿಣ ಧ್ರುವ",
              hi: "दक्षिणी ध्रुव"
            },
            {
              en: "Equator",
              kn: "ಸಮಭಾಜಕ ರೇಖೆ",
              hi: "भूमध्य रेखा"
            },
            {
              en: "North pole",
              kn: "ಉತ್ತರ ಧ್ರುವ",
              hi: "उत्तरी ध्रुव"
            }
          ],
          0,
          {
            en: "In 2023, India became the first country to land near the Moon's south polar region.",
            kn: "2023ರಲ್ಲಿ ಚಂದ್ರನ ದಕ್ಷಿಣ ಧ್ರುವ ಪ್ರದೇಶದ ಸಮೀಪ ಇಳಿದ ಮೊದಲ ದೇಶ ಭಾರತವಾಯಿತು.",
            hi: "2023 में चाँद के दक्षिणी ध्रुवीय क्षेत्र के पास उतरने वाला भारत पहला देश बना।"
          }
        )
      ]
    ),

    makeCat("🌏",
      {
        en: "World",
        kn: "ಜಗತ್ತು",
        hi: "विश्व"
      },
      [
        makeQ(
          "What is the capital of Japan?",
          "ಜಪಾನ್ ದೇಶದ ರಾಜಧಾನಿ ಯಾವುದು?",
          "जापान की राजधानी क्या है?",
          [
            { en: "Tokyo", kn: "ಟೋಕಿಯೋ", hi: "टोक्यो" },
            { en: "Beijing", kn: "ಬೀಜಿಂಗ್", hi: "बीजिंग" },
            { en: "Seoul", kn: "ಸಿಯೋಲ್", hi: "सियोल" }
          ],
          0
        ),
        makeQ(
          "Which is the largest ocean?",
          "ಅತಿದೊಡ್ಡ ಮಹಾಸಾಗರ ಯಾವುದು?",
          "सबसे बड़ा महासागर कौन-सा है?",
          [
            { en: "Pacific", kn: "ಪೆಸಿಫಿಕ್", hi: "प्रशांत महासागर" },
            { en: "Atlantic", kn: "ಅಟ್ಲಾಂಟಿಕ್", hi: "अटलांटिक महासागर" },
            { en: "Indian", kn: "ಹಿಂದೂ ಮಹಾಸಾಗರ", hi: "हिंद महासागर" }
          ],
          0
        )
      ]
    ),

    makeCat("💡",
      {
        en: "Inventors",
        kn: "ಆವಿಷ್ಕಾರಕರು",
        hi: "आविष्कारक"
      },
      [
        makeQ(
          "Who invented the telephone?",
          "ದೂರವಾಣಿಯನ್ನು ಕಂಡುಹಿಡಿದವರು ಯಾರು?",
          "टेलीफोन का आविष्कार किसने किया?",
          [
            {
              en: "Alexander Graham Bell",
              kn: "ಅಲೆಕ್ಸಾಂಡರ್ ಗ್ರಹಾಂ ಬೆಲ್",
              hi: "अलेक्जेंडर ग्राहम बेल"
            },
            { en: "Edison", kn: "ಎಡಿಸನ್", hi: "एडिसन" },
            { en: "Newton", kn: "ನ್ಯೂಟನ್", hi: "न्यूटन" }
          ],
          0
        ),
        makeQ(
          "Which Indian won the Nobel Prize in Physics in 1930?",
          "1930ರಲ್ಲಿ ಭೌತಶಾಸ್ತ್ರದ ನೋಬೆಲ್ ಪ್ರಶಸ್ತಿ ಗೆದ್ದ ಭಾರತೀಯರು ಯಾರು?",
          "1930 में भौतिकी का नोबेल पुरस्कार जीतने वाले भारतीय कौन थे?",
          [
            {
              en: "C. V. Raman",
              kn: "ಸಿ. ವಿ. ರಾಮನ್",
              hi: "सी. वी. रमन"
            },
            {
              en: "Homi Bhabha",
              kn: "ಹೋಮಿ ಭಾಭಾ",
              hi: "होमी भाभा"
            },
            {
              en: "Vikram Sarabhai",
              kn: "ವಿಕ್ರಮ್ ಸಾರಾಭಾಯಿ",
              hi: "विक्रम साराभाई"
            }
          ],
          0
        )
      ]
    )
  ]
];
