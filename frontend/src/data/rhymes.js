
/* ==========================================
   KIKO RHYMES DATA

   Languages:
   en = English
   hi = Hindi
   kn = Kannada

   All lyrics have child-friendly adaptations.
   They are written to sound natural when sung,
   rather than translated word for word.

   Existing song IDs, tune keys, age groups and
   audio file paths are preserved.
========================================== */

const audio = (id, langs = []) =>
  Object.fromEntries(
    langs.map((language) => [
      language,
      {
        sung: `/audio/rhymes/${id}-${language}-sung.mp3`,
        read: `/audio/rhymes/${id}-${language}-read.mp3`,
      },
    ])
  );

export const RHYMES = [
  // 1. TWINKLE TWINKLE LITTLE STAR
  {
    id: "twinkle",
    symbol: "⭐",
    category: {
      en: "Lullaby",
      hi: "लोरी",
      kn: "ಜೋಗುಳ",
    },
    ageGroups: ["1-3", "4-6"],
    tune: "twinkle",
    audio: audio("twinkle", []),

    title: {
      en: "Twinkle, Twinkle, Little Star",
      hi: "चमको, चमको, नन्हे तारे",
      kn: "ಮಿನುಗು ಮಿನುಗು ಪುಟ್ಟ ನಕ್ಷತ್ರವೇ",
    },

    source: {
      en: "Words: Jane Taylor (1806) · Tune: French folk melody · Public domain",
      hi: "मूल कविता: Jane Taylor (1806) · पारंपरिक धुन",
      kn: "ಮೂಲ ಕವಿತೆ: Jane Taylor (1806) · ಸಾಂಪ್ರದಾಯಿಕ ಧುನಿ",
    },

    lyrics: {
      en: [
        "Twinkle, twinkle, little star,",
        "How I wonder what you are!",
        "Up above the world so high,",
        "Like a diamond in the sky.",
        "Twinkle, twinkle, little star,",
        "How I wonder what you are!",
      ],

      hi: [
        "चमको, चमको, नन्हे तारे,",
        "लगते हो तुम कितने प्यारे!",
        "आसमान में ऊपर रहते,",
        "हीरे जैसे चमकते रहते।",
        "चमको, चमको, नन्हे तारे,",
        "लगते हो तुम कितने प्यारे!",
      ],

      kn: [
        "ಮಿನುಗು ಮಿನುಗು ಪುಟ್ಟ ನಕ್ಷತ್ರವೇ,",
        "ಎಷ್ಟು ಚೆಂದ ನೀನು ನಕ್ಷತ್ರವೇ!",
        "ಆಕಾಶದಲಿ ಎತ್ತರದಲ್ಲಿ,",
        "ವಜ್ರದಂತೆ ಹೊಳೆಯುವೆ ನೀನು!",
        "ಮಿನುಗು ಮಿನುಗು ಪುಟ್ಟ ನಕ್ಷತ್ರವೇ,",
        "ಎಷ್ಟು ಚೆಂದ ನೀನು ನಕ್ಷತ್ರವೇ!",
      ],
    },
  },

  // 2. BAA BAA BLACK SHEEP
  {
    id: "baa",
    symbol: "🐑",
    category: {
      en: "Animals",
      hi: "जानवर",
      kn: "ಪ್ರಾಣಿಗಳು",
    },
    ageGroups: ["1-3", "4-6"],
    tune: "baa",
    audio: audio("baa", []),

    title: {
      en: "Baa, Baa, Black Sheep",
      hi: "में में करती काली भेड़",
      kn: "ಮೇ ಮೇ ಎನ್ನುವ ಕಪ್ಪು ಕುರಿ",
    },

    source: {
      en: "Traditional · Public domain",
      hi: "पारंपरिक बाल कविता",
      kn: "ಸಾಂಪ್ರದಾಯಿಕ ಮಕ್ಕಳ ಹಾಡು",
    },

    lyrics: {
      en: [
        "Baa, baa, black sheep,",
        "Have you any wool?",
        "Yes sir, yes sir,",
        "Three bags full!",
        "One for the master,",
        "One for the dame.",
      ],

      hi: [
        "में में करती काली भेड़,",
        "ऊन तुम्हारे पास है ढेर?",
        "हाँ जी हाँ जी, बहुत है,",
        "तीन थैले भरकर है!",
        "एक मालिक के लिए,",
        "एक मालकिन के लिए।",
      ],

      kn: [
        "ಮೇ ಮೇ ಎನ್ನುವ ಕಪ್ಪು ಕುರಿ,",
        "ನಿನ್ನ ಬಳಿ ಉಣ್ಣೆ ಇದೆಯೇ?",
        "ಹೌದು ಹೌದು, ಉಣ್ಣೆಯಿದೆ,",
        "ಮೂರು ಚೀಲ ತುಂಬಾ ಉಣ್ಣೆಯಿದೆ!",
        "ಒಂದು ಯಜಮಾನನಿಗೆ,",
        "ಒಂದು ಯಜಮಾನಿಗೆ.",
      ],
    },
  },

  // 3. OLD MACDONALD HAD A FARM
  {
    id: "macdonald",
    symbol: "🚜",
    category: {
      en: "Farm",
      hi: "खेत",
      kn: "ಕೃಷಿ ತೋಟ",
    },
    ageGroups: ["4-6"],
    tune: "macdonald",
    audio: audio("macdonald", []),

    title: {
      en: "Old MacDonald Had a Farm",
      hi: "मैकडोनाल्ड का खेत",
      kn: "ಮ್ಯಾಕ್‌ಡೊನಾಲ್ಡ್ ಅವರ ಕೃಷಿ ತೋಟ",
    },

    source: {
      en: "Traditional · Public domain",
      hi: "पारंपरिक बाल गीत",
      kn: "ಸಾಂಪ್ರದಾಯಿಕ ಮಕ್ಕಳ ಹಾಡು",
    },

    lyrics: {
      en: [
        "Old MacDonald had a farm,",
        "E-I-E-I-O!",
        "And on his farm he had a cow,",
        "E-I-E-I-O!",
      ],

      hi: [
        "मैकडोनाल्ड का एक खेत था,",
        "ई-आई-ई-आई-ओ!",
        "उस खेत में एक गाय थी,",
        "ई-आई-ई-आई-ओ!",
      ],

      kn: [
        "ಮ್ಯಾಕ್‌ಡೊನಾಲ್ಡ್ ಅವರಿಗೆ ತೋಟವಿತ್ತು,",
        "ಈ-ಐ-ಈ-ಐ-ಓ!",
        "ಆ ತೋಟದಲ್ಲಿ ಒಂದು ಹಸುವಿತ್ತು,",
        "ಈ-ಐ-ಈ-ಐ-ಓ!",
      ],
    },
  },

  // 4. MARY HAD A LITTLE LAMB
  {
    id: "mary",
    symbol: "🐏",
    category: {
      en: "Story rhyme",
      hi: "कहानी गीत",
      kn: "ಕಥೆಯ ಹಾಡು",
    },
    ageGroups: ["4-6", "7-10"],
    tune: "mary",
    audio: audio("mary", []),

    title: {
      en: "Mary Had a Little Lamb",
      hi: "मैरी का नन्हा मेमना",
      kn: "ಮೇರಿಯ ಪುಟ್ಟ ಕುರಿಮರಿ",
    },

    source: {
      en: "Words: Sarah Josepha Hale (1830) · Public domain",
      hi: "मूल कविता: Sarah Josepha Hale (1830)",
      kn: "ಮೂಲ ಕವಿತೆ: Sarah Josepha Hale (1830)",
    },

    lyrics: {
      en: [
        "Mary had a little lamb,",
        "Little lamb, little lamb,",
        "Mary had a little lamb,",
        "Its fleece was white as snow.",
      ],

      hi: [
        "मैरी के पास नन्हा मेमना,",
        "नन्हा मेमना, प्यारा मेमना,",
        "मैरी के पास नन्हा मेमना,",
        "जिसका रंग बर्फ़ सा सफ़ेद था।",
      ],

      kn: [
        "ಮೇರಿಯ ಬಳಿ ಪುಟ್ಟ ಕುರಿಮರಿ,",
        "ಪುಟ್ಟ ಕುರಿಮರಿ, ಮುದ್ದು ಕುರಿಮರಿ,",
        "ಮೇರಿಯ ಬಳಿ ಪುಟ್ಟ ಕುರಿಮರಿ,",
        "ಅದರ ಮೈ ಬಿಳಿ ಹಿಮದಂತೆ!",
      ],
    },
  },

  // 5. LONDON BRIDGE
  {
    id: "londonbridge",
    symbol: "🌉",
    category: {
      en: "Singing game",
      hi: "गाने का खेल",
      kn: "ಹಾಡಿನ ಆಟ",
    },
    ageGroups: ["4-6", "7-10"],
    tune: "londonbridge",
    audio: audio("londonbridge", []),

    title: {
      en: "London Bridge Is Falling Down",
      hi: "लंदन का पुल गिर रहा है",
      kn: "ಲಂಡನ್ ಸೇತುವೆ ಕುಸಿಯುತ್ತಿದೆ",
    },

    source: {
      en: "Traditional · Public domain",
      hi: "पारंपरिक बाल गीत",
      kn: "ಸಾಂಪ್ರದಾಯಿಕ ಮಕ್ಕಳ ಹಾಡು",
    },

    lyrics: {
      en: [
        "London Bridge is falling down,",
        "Falling down, falling down.",
        "London Bridge is falling down,",
        "My fair lady.",
        "Build it up with bricks and mortar,",
        "Bricks and mortar, bricks and mortar.",
        "Build it up with bricks and mortar,",
        "My fair lady.",
        "Bricks and mortar will not stay,",
        "Will not stay, will not stay.",
        "Bricks and mortar will not stay,",
        "My fair lady.",
      ],

      hi: [
        "लंदन का पुल गिरता जाए,",
        "गिरता जाए, गिरता जाए।",
        "लंदन का पुल गिरता जाए,",
        "मेरी प्यारी रानी।",
        "ईंट और गारे से बनाओ,",
        "ईंट और गारे से बनाओ।",
        "ईंट और गारे से बनाओ,",
        "मेरी प्यारी रानी।",
        "ईंट और गारा टिक न पाए,",
        "टिक न पाए, टिक न पाए।",
        "ईंट और गारा टिक न पाए,",
        "मेरी प्यारी रानी।",
      ],

      kn: [
        "ಲಂಡನ್ ಸೇತುವೆ ಕುಸಿಯುತ್ತಿದೆ,",
        "ಕುಸಿಯುತ್ತಿದೆ, ಕುಸಿಯುತ್ತಿದೆ.",
        "ಲಂಡನ್ ಸೇತುವೆ ಕುಸಿಯುತ್ತಿದೆ,",
        "ನನ್ನ ಮುದ್ದಿನ ರಾಣಿಯೇ.",
        "ಇಟ್ಟಿಗೆ ಗಾರೆಯಿಂದ ಕಟ್ಟಿರಿ,",
        "ಇಟ್ಟಿಗೆ ಗಾರೆಯಿಂದ ಕಟ್ಟಿರಿ.",
        "ಇಟ್ಟಿಗೆ ಗಾರೆಯಿಂದ ಕಟ್ಟಿರಿ,",
        "ನನ್ನ ಮುದ್ದಿನ ರಾಣಿಯೇ.",
        "ಇಟ್ಟಿಗೆ ಗಾರೆ ನಿಲ್ಲುವುದಿಲ್ಲ,",
        "ನಿಲ್ಲುವುದಿಲ್ಲ, ನಿಲ್ಲುವುದಿಲ್ಲ.",
        "ಇಟ್ಟಿಗೆ ಗಾರೆ ನಿಲ್ಲುವುದಿಲ್ಲ,",
        "ನನ್ನ ಮುದ್ದಿನ ರಾಣಿಯೇ.",
      ],
    },
  },

  // 6. ROW ROW ROW YOUR BOAT
  {
    id: "rowboat",
    symbol: "🚣",
    category: {
      en: "Round",
      hi: "लय वाला गीत",
      kn: "ತಾಳದ ಹಾಡು",
    },
    ageGroups: ["7-10"],
    tune: "rowboat",
    audio: audio("rowboat", []),

    title: {
      en: "Row, Row, Row Your Boat",
      hi: "नाव चलाओ",
      kn: "ದೋಣಿಯನ್ನು ಹುಟ್ಟು ಹಾಕಿ",
    },

    source: {
      en: "Traditional · Public domain · Try singing it as a round!",
      hi: "पारंपरिक गीत · इसे समूह में गाकर देखें!",
      kn: "ಸಾಂಪ್ರದಾಯಿಕ ಹಾಡು · ಗುಂಪಾಗಿ ಹಾಡಿ ನೋಡಿ!",
    },

    lyrics: {
      en: [
        "Row, row, row your boat,",
        "Gently down the stream,",
        "Merrily, merrily, merrily, merrily,",
        "Life is but a dream.",
      ],

      hi: [
        "नाव चलाओ, नाव चलाओ,",
        "धीरे-धीरे धार में,",
        "हँसते-गाते, खुशियाँ मनाते,",
        "जीवन है एक सुंदर सपना।",
      ],

      kn: [
        "ದೋಣಿ ಹುಟ್ಟು, ದೋಣಿ ಹುಟ್ಟು,",
        "ನದಿಯಲಿ ಮೆಲ್ಲನೆ ಸಾಗು,",
        "ನಲಿಯುತ್ತಾ, ನಲಿಯುತ್ತಾ,",
        "ಬಾಳು ಒಂದು ಸುಂದರ ಕನಸು.",
      ],
    },
  },

  // 7. JINGLE BELLS
  {
    id: "jingle",
    symbol: "🔔",
    category: {
      en: "Festive",
      hi: "त्योहार",
      kn: "ಹಬ್ಬದ ಹಾಡು",
    },
    ageGroups: ["7-10"],
    tune: "jingle",
    audio: audio("jingle", []),

    title: {
      en: "Jingle Bells (chorus)",
      hi: "झन झन बजती घंटियाँ",
      kn: "ಜಣ ಜಣ ಮೊಳಗುವ ಗಂಟೆಗಳು",
    },

    source: {
      en: "James Lord Pierpont (1857) · Public domain",
      hi: "मूल गीत: James Lord Pierpont (1857)",
      kn: "ಮೂಲ ಹಾಡು: James Lord Pierpont (1857)",
    },

    lyrics: {
      en: [
        "Jingle bells, jingle bells,",
        "Jingle all the way!",
      ],

      hi: [
        "झन झन घंटियाँ बजती जाएँ,",
        "खुशियाँ लाएँ हर दिन!",
      ],

      kn: [
        "ಜಣ ಜಣ ಗಂಟೆಗಳು ಮೊಳಗಲಿ,",
        "ಸಂತಸ ತುಂಬಲಿ ಎಲ್ಲೆಡೆ!",
      ],
    },
  },
];

/* Get rhymes for the selected age group */
export function getSongsFor(ageGroupId) {
  return RHYMES.filter((rhyme) =>
    rhyme.ageGroups.includes(ageGroupId)
  );
}

/* Get one rhyme using its ID */
export function getSongById(songId) {
  return RHYMES.find((rhyme) => rhyme.id === songId);
}
