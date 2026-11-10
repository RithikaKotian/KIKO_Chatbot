
import { useEffect, useMemo, useRef, useState } from "react";
import "./LearningPages.css";

/* =====================================================
   KIKO LEARNING: ENGLISH | KANNADA | HINDI
   Learn → Practice → Challenge
===================================================== */

const VOICE = { en: "en-IN", kn: "kn-IN", hi: "hi-IN" };

const UI = {
  en: {
    heading: "KIKO Learning World", tagline: "Little steps, big discoveries!",
    ask: "What shall we learn today? 🌈", choose: "Choose a subject and start exploring.",
    back: "Back to Adventure", subjects: "All subjects", explore: "Explore →",
    hint: "Tap a card to learn.", repeat: "🔊 Say it again",
    learn: "Learn", practice: "Writing Practice", challenge: "Challenge",
    clear: "Clear", undo: "Undo", next: "Next", done: "Done",
    trace: "Trace the example below.", write: "Now write it yourself!",
    correct: "Correct!", tryAgain: "Try again!", score: "Your score",
    question: "Choose the correct answer.", quizDone: "Well done!",
    letters: "Letters", numbers: "Numbers", select: "Choose what to practise",
    draw: "Use your finger, stylus or mouse to write.",
    answer: "Choose your answer", quiz: "Knowledge Challenge",
    years: "years", example: "Example"
  },
  kn: {
    heading: "KIKO ಕಲಿಕಾ ಲೋಕ", tagline: "ಚಿಕ್ಕ ಹೆಜ್ಜೆಗಳು, ದೊಡ್ಡ ಅನ್ವೇಷಣೆಗಳು!",
    ask: "ಇಂದು ಏನು ಕಲಿಯೋಣ? 🌈", choose: "ಒಂದು ವಿಷಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    back: "ಸಾಹಸಕ್ಕೆ ಹಿಂತಿರುಗಿ", subjects: "ಎಲ್ಲಾ ವಿಷಯಗಳು", explore: "ಕಲಿಯೋಣ →",
    hint: "ಕಲಿಯಲು ಒಂದು ಕಾರ್ಡ್ ಆಯ್ಕೆಮಾಡಿ.", repeat: "🔊 ಮತ್ತೊಮ್ಮೆ ಹೇಳಿ",
    learn: "ಕಲಿಯಿರಿ", practice: "ಬರೆಯುವ ಅಭ್ಯಾಸ", challenge: "ಸವಾಲು",
    clear: "ಅಳಿಸಿ", undo: "ಹಿಂದಕ್ಕೆ", next: "ಮುಂದೆ", done: "ಮುಗಿದಿದೆ",
    trace: "ಕೆಳಗಿನ ಅಕ್ಷರವನ್ನು ಅನುಸರಿಸಿ ಬರೆಯಿರಿ.", write: "ಈಗ ನೀವೇ ಬರೆಯಿರಿ!",
    correct: "ಸರಿಯಾದ ಉತ್ತರ!", tryAgain: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ!", score: "ನಿಮ್ಮ ಅಂಕಗಳು",
    question: "ಸರಿಯಾದ ಉತ್ತರವನ್ನು ಆಯ್ಕೆಮಾಡಿ.", quizDone: "ಅದ್ಭುತ!",
    letters: "ಅಕ್ಷರಗಳು", numbers: "ಸಂಖ್ಯೆಗಳು", select: "ಅಭ್ಯಾಸ ಮಾಡಲು ಆಯ್ಕೆಮಾಡಿ",
    draw: "ಬೆರಳು, ಸ್ಟೈಲಸ್ ಅಥವಾ ಮೌಸ್ ಬಳಸಿ ಬರೆಯಿರಿ.",
    answer: "ನಿಮ್ಮ ಉತ್ತರವನ್ನು ಆಯ್ಕೆಮಾಡಿ", quiz: "ಜ್ಞಾನ ಸವಾಲು",
    years: "ವರ್ಷಗಳು", example: "ಉದಾಹರಣೆ"
  },
  hi: {
    heading: "KIKO की सीखने की दुनिया", tagline: "छोटे कदम, बड़ी खोजें!",
    ask: "आज हम क्या सीखें? 🌈", choose: "एक विषय चुनें और सीखना शुरू करें।",
    back: "वापस जाएँ", subjects: "सभी विषय", explore: "सीखें →",
    hint: "सीखने के लिए एक कार्ड चुनें।", repeat: "🔊 फिर से सुनें",
    learn: "सीखें", practice: "लिखने का अभ्यास", challenge: "चुनौती",
    clear: "मिटाएँ", undo: "वापस", next: "आगे", done: "पूरा हुआ",
    trace: "नीचे दिए अक्षर को देखकर लिखें।", write: "अब खुद लिखें!",
    correct: "सही जवाब!", tryAgain: "फिर कोशिश करें!", score: "आपके अंक",
    question: "सही उत्तर चुनें।", quizDone: "शाबाश!",
    letters: "अक्षर", numbers: "संख्याएँ", select: "अभ्यास चुनें",
    draw: "उंगली, स्टाइलस या माउस से लिखें।",
    answer: "अपना उत्तर चुनें", quiz: "ज्ञान चुनौती",
    years: "वर्ष", example: "उदाहरण"
  }
};

const AGE_LABELS = {
  en: { "1-3": "1–3 years", "4-6": "4–6 years", "7-10": "7–10 years" },
  kn: { "1-3": "1–3 ವರ್ಷಗಳು", "4-6": "4–6 ವರ್ಷಗಳು", "7-10": "7–10 ವರ್ಷಗಳು" },
  hi: { "1-3": "1–3 वर्ष", "4-6": "4–6 वर्ष", "7-10": "7–10 वर्ष" }
};

function speak(text, language = "en", slow = false) {
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      String(text).replace(/[🌈🎨🔢🐼🍎🧍💬🔤📚➗📝🔬🌍💻🧩]/gu, "")
    );
    utterance.lang = VOICE[language] || "en-IN";
    utterance.rate = slow ? 0.78 : 0.92;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  } catch {}
}

function stopSpeech() {
  try { window.speechSynthesis.cancel(); } catch {}
}

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);
const item = (emoji, word, note = word) => ({
  label: word, big: `${emoji}\n${word}`, say: word, note
});

/* =====================================================
   NUMBER NAMES AND SYMBOLS
===================================================== */

const NUMBERS = {
  en: {
    digits: "0123456789",
    names: [
      "Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine",
      "Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen",
      "Seventeen","Eighteen","Nineteen","Twenty"
    ]
  },
  kn: {
    digits: "೦೧೨೩೪೫೬೭೮೯",
    names: [
      "ಸೊನ್ನೆ","ಒಂದು","ಎರಡು","ಮೂರು","ನಾಲ್ಕು","ಐದು","ಆರು","ಏಳು","ಎಂಟು",
      "ಒಂಬತ್ತು","ಹತ್ತು","ಹನ್ನೊಂದು","ಹನ್ನೆರಡು","ಹದಿಮೂರು","ಹದಿನಾಲ್ಕು",
      "ಹದಿನೈದು","ಹದಿನಾರು","ಹದಿನೇಳು","ಹದಿನೆಂಟು","ಹತ್ತೊಂಬತ್ತು","ಇಪ್ಪತ್ತು"
    ]
  },
  hi: {
    digits: "०१२३४५६७८९",
    names: [
      "शून्य","एक","दो","तीन","चार","पाँच","छह","सात","आठ","नौ",
      "दस","ग्यारह","बारह","तेरह","चौदह","पंद्रह","सोलह","सत्रह",
      "अठारह","उन्नीस","बीस"
    ]
  }
};

const NUMBER_TENS = {
  kn: {30:"ಮೂವತ್ತು",40:"ನಲವತ್ತು",50:"ಐವತ್ತು",60:"ಅರವತ್ತು",70:"ಎಪ್ಪತ್ತು",80:"ಎಂಬತ್ತು",90:"ತೊಂಬತ್ತು",100:"ನೂರು"},
  hi: {30:"तीस",40:"चालीस",50:"पचास",60:"साठ",70:"सत्तर",80:"अस्सी",90:"नब्बे",100:"सौ"}
};

function numberName(n, language) {
  const data = NUMBERS[language];
  if (!data) return String(n);
  if (n <= 20) return data.names[n];

  const tens = Math.floor(n / 10) * 10;
  const ones = n % 10;

  if (ones === 0) return NUMBER_TENS[language]?.[n] || String(n);

  // The compound forms beyond 20 need a verified language-specific
  // spelling. Show the numeric symbol rather than inventing a word.
  return String(n);
}

function localDigits(n, language) {
  const digits = NUMBERS[language]?.digits || NUMBERS.en.digits;
  return String(n).replace(/[0-9]/g, (digit) => digits[Number(digit)]);
}

function numberCards(count, language) {
  return Array.from({ length: count }, (_, index) => {
    const n = index + 1;
    const symbol = localDigits(n, language);
    const name = numberName(n, language);
    return {
      label: symbol,
      big: `${symbol}\n${name}`,
      say: name,
      note: name,
      numberValue: n
    };
  });
}

/* =====================================================
   ALPHABET CONTENT
===================================================== */

const ENGLISH_LETTERS = [
  ["A","Apple","🍎"],["B","Ball","⚽"],["C","Cat","🐱"],
  ["D","Dog","🐶"],["E","Elephant","🐘"],["F","Fish","🐟"],
  ["G","Grapes","🍇"],["H","House","🏠"],["I","Ice cream","🍦"],
  ["J","Juice","🧃"],["K","Kite","🪁"],["L","Lion","🦁"],
  ["M","Mango","🥭"],["N","Nest","🪺"],["O","Orange","🍊"],
  ["P","Parrot","🦜"],["Q","Queen","👑"],["R","Rainbow","🌈"],
  ["S","Sun","☀️"],["T","Tiger","🐯"],["U","Umbrella","☂️"],
  ["V","Violin","🎻"],["W","Watermelon","🍉"],["X","Xylophone","🎶"],
  ["Y","Yak","🐃"],["Z","Zebra","🦓"]
];

const KANNADA_LETTERS = [
  "ಅ","ಆ","ಇ","ಈ","ಉ","ಊ","ಋ","ಎ","ಏ","ಐ","ಒ","ಓ","ಔ",
  "ಅಂ","ಅಃ",
  "ಕ","ಖ","ಗ","ಘ","ಙ","ಚ","ಛ","ಜ","ಝ","ಞ","ಟ","ಠ","ಡ","ಢ","ಣ",
  "ತ","ಥ","ದ","ಧ","ನ","ಪ","ಫ","ಬ","ಭ","ಮ","ಯ","ರ","ಲ","ವ",
  "ಶ","ಷ","ಸ","ಹ","ಳ","ಕ್ಷ","ಜ್ಞ"
];

const HINDI_LETTERS = [
  "अ","आ","इ","ई","उ","ऊ","ऋ","ए","ऐ","ओ","औ","अं","अः",
  "क","ख","ग","घ","ङ","च","छ","ज","झ","ञ","ट","ठ","ड","ढ","ण",
  "त","थ","द","ध","न","प","फ","ब","भ","म","य","र","ल","व",
  "श","ष","स","ह","क्ष","त्र","ज्ञ"
];

const KANNADA_EXAMPLES = {
  "ಅ":"ಅನಾನಸ್","ಆ":"ಆನೆ","ಇ":"ಇಲಿ","ಈ":"ಈಗೆ","ಉ":"ಉಡುಗೊರೆ",
  "ಊ":"ಊಟ","ಋ":"ಋಷಿ","ಎ":"ಎಲೆ","ಏ":"ಏಣಿ","ಐ":"ಐದು",
  "ಒ":"ಒಂಟೆ","ಓ":"ಓಲೆ","ಔ":"ಔಷಧಿ","ಕ":"ಕಮಲ","ಗ":"ಗಡಿಯಾರ",
  "ಚ":"ಚಮಚ","ಜ":"ಜಿಂಕೆ","ಟ":"ಟೊಮೇಟೊ","ತ":"ತಾರೆ","ದ":"ದನ",
  "ನ":"ನಕ್ಷತ್ರ","ಪ":"ಪಾರಿವಾಳ","ಬ":"ಬಾಳೆಹಣ್ಣು","ಮ":"ಮಾವು",
  "ಯ":"ಯಕ್ಷ","ರ":"ರಥ","ಲ":"ಲಡ್ಡು","ವ":"ವನ","ಶ":"ಶಂಖ",
  "ಸ":"ಸೇಬು","ಹ":"ಹಣ್ಣು"
};

const HINDI_EXAMPLES = {
  "अ":"अनार","आ":"आम","इ":"इमली","ई":"ईख","उ":"उल्लू",
  "ऊ":"ऊन","ऋ":"ऋषि","ए":"एक","ऐ":"ऐनक","ओ":"ओखली",
  "औ":"औषधि","अं":"अंगूर","क":"कमल","ख":"खरगोश",
  "ग":"गमला","घ":"घर","च":"चम्मच","छ":"छाता","ज":"जहाज",
  "ट":"टमाटर","ड":"डमरू","त":"तरबूज","द":"दवात","न":"नल",
  "प":"पतंग","फ":"फल","ब":"बतख","भ":"भालू","म":"मछली",
  "य":"योग","र":"रथ","ल":"लड्डू","व":"वन","श":"शेर",
  "स":"सेब","ह":"हाथी"
};

function alphabetCards(language) {
  if (language === "kn") {
    return KANNADA_LETTERS.map((letter) => ({
      label: letter,
      big: `${letter}\n${KANNADA_EXAMPLES[letter] || ""}`,
      say: `${letter} ${KANNADA_EXAMPLES[letter] || ""}`,
      note: KANNADA_EXAMPLES[letter] || letter
    }));
  }

  if (language === "hi") {
    return HINDI_LETTERS.map((letter) => ({
      label: letter,
      big: `${letter}\n${HINDI_EXAMPLES[letter] || ""}`,
      say: `${letter} ${HINDI_EXAMPLES[letter] || ""}`,
      note: HINDI_EXAMPLES[letter] || letter
    }));
  }

  return ENGLISH_LETTERS.map(([letter, word, emoji]) => ({
    label: letter,
    big: `${letter} ${letter.toLowerCase()}\n${emoji} ${word}`,
    say: `${letter} for ${word}`,
    note: `${letter} is for ${word}`
  }));
}

/* =====================================================
   FLASHCARD SUBJECT DATA
===================================================== */

const WORDS = {
  kn: {
    "Colours":"ಬಣ್ಣಗಳು","Shapes":"ಆಕಾರಗಳು","First Numbers":"ಮೊದಲ ಸಂಖ್ಯೆಗಳು",
    "Numbers 1–100":"ಸಂಖ್ಯೆಗಳು 1–100","Animals":"ಪ್ರಾಣಿಗಳು",
    "Fruits and Vegetables":"ಹಣ್ಣುಗಳು ಮತ್ತು ತರಕಾರಿಗಳು","My Body":"ನನ್ನ ದೇಹ",
    "Human Body":"ಮಾನವ ದೇಹ","First Words":"ಮೊದಲ ಪದಗಳು",
    "Everyday Vocabulary":"ದೈನಂದಿನ ಪದಗಳು","Mathematics":"ಗಣಿತ",
    "English Grammar":"ಇಂಗ್ಲಿಷ್ ವ್ಯಾಕರಣ","Science":"ವಿಜ್ಞಾನ",
    "Geography":"ಭೂಗೋಳಶಾಸ್ತ್ರ","Computer Basics":"ಕಂಪ್ಯೂಟರ್ ಮೂಲಭೂತ ವಿಷಯಗಳು",
    "Logical Reasoning":"ತಾರ್ಕಿಕ ಚಿಂತನೆ",
    "Red":"ಕೆಂಪು","Blue":"ನೀಲಿ","Yellow":"ಹಳದಿ","Green":"ಹಸಿರು",
    "Orange":"ಕಿತ್ತಳೆ","Purple":"ನೇರಳೆ","Black":"ಕಪ್ಪು","White":"ಬಿಳಿ",
    "Pink":"ಗುಲಾಬಿ","Brown":"ಕಂದು","Grey":"ಬೂದು",
    "Circle":"ವೃತ್ತ","Square":"ಚೌಕ","Triangle":"ತ್ರಿಕೋನ",
    "Rectangle":"ಆಯತ","Star":"ನಕ್ಷತ್ರ","Heart":"ಹೃದಯ",
    "Dog":"ನಾಯಿ","Cat":"ಬೆಕ್ಕು","Cow":"ಹಸು","Sheep":"ಕುರಿ",
    "Lion":"ಸಿಂಹ","Bird":"ಹಕ್ಕಿ","Elephant":"ಆನೆ","Tiger":"ಹುಲಿ",
    "Monkey":"ಕೋತಿ","Fish":"ಮೀನು","Tortoise":"ಆಮೆ","Parrot":"ಗಿಳಿ",
    "Apple":"ಸೇಬು","Banana":"ಬಾಳೆಹಣ್ಣು","Mango":"ಮಾವು","Grapes":"ದ್ರಾಕ್ಷಿ",
    "Orange":"ಕಿತ್ತಳೆ","Carrot":"ಕ್ಯಾರೆಟ್","Tomato":"ಟೊಮೇಟೊ",
    "Potato":"ಆಲೂಗಡ್ಡೆ","Brinjal":"ಬದನೆಕಾಯಿ",
    "Eyes":"ಕಣ್ಣುಗಳು","Ears":"ಕಿವಿಗಳು","Nose":"ಮೂಗು","Mouth":"ಬಾಯಿ",
    "Tongue":"ನಾಲಿಗೆ","Hands":"ಕೈಗಳು","Feet":"ಪಾದಗಳು","Heart":"ಹೃದಯ",
    "Brain":"ಮೆದುಳು","Teeth":"ಹಲ್ಲುಗಳು","Skin":"ಚರ್ಮ",
    "Milk":"ಹಾಲು","Bed":"ಹಾಸಿಗೆ","Chair":"ಕುರ್ಚಿ","Ball":"ಚೆಂಡು",
    "Car":"ಕಾರು","Book":"ಪುಸ್ತಕ","House":"ಮನೆ","School":"ಶಾಲೆ",
    "Water":"ನೀರು","Pencil":"ಪೆನ್ಸಿಲ್","Bag":"ಚೀಲ","Door":"ಬಾಗಿಲು",
    "Noun":"ನಾಮಪದ","Verb":"ಕ್ರಿಯಾಪದ","Adjective":"ವಿಶೇಷಣ",
    "Pronoun":"ಸರ್ವನಾಮ","Sentence":"ವಾಕ್ಯ","Photosynthesis":"ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ",
    "Water cycle":"ಜಲಚಕ್ರ","Magnets":"ಆಯಸ್ಕಾಂತಗಳು","Earth":"ಭೂಮಿ",
    "Sound":"ಶಬ್ದ","Light":"ಬೆಳಕು","Continents":"ಖಂಡಗಳು",
    "Oceans":"ಸಾಗರಗಳು","India":"ಭಾರತ","Karnataka":"ಕರ್ನಾಟಕ",
    "Hardware":"ಯಂತ್ರಾಂಶ","Software":"ತಂತ್ರಾಂಶ","Input":"ಇನ್‌ಪುಟ್",
    "Output":"ಔಟ್‌ಪುಟ್","Passwords":"ಗುಪ್ತಪದಗಳು"
  },
  hi: {
    "Colours":"रंग","Shapes":"आकार","First Numbers":"पहली संख्याएँ",
    "Numbers 1–100":"संख्याएँ 1–100","Animals":"जानवर",
    "Fruits and Vegetables":"फल और सब्ज़ियाँ","My Body":"मेरा शरीर",
    "Human Body":"मानव शरीर","First Words":"पहले शब्द",
    "Everyday Vocabulary":"रोज़मर्रा के शब्द","Mathematics":"गणित",
    "English Grammar":"अंग्रेज़ी व्याकरण","Science":"विज्ञान",
    "Geography":"भूगोल","Computer Basics":"कंप्यूटर की मूल बातें",
    "Logical Reasoning":"तार्किक सोच",
    "Red":"लाल","Blue":"नीला","Yellow":"पीला","Green":"हरा",
    "Orange":"नारंगी","Purple":"बैंगनी","Black":"काला","White":"सफेद",
    "Pink":"गुलाबी","Brown":"भूरा","Grey":"धूसर",
    "Circle":"वृत्त","Square":"वर्ग","Triangle":"त्रिभुज",
    "Rectangle":"आयत","Star":"तारा","Heart":"दिल",
    "Dog":"कुत्ता","Cat":"बिल्ली","Cow":"गाय","Sheep":"भेड़",
    "Lion":"शेर","Bird":"पक्षी","Elephant":"हाथी","Tiger":"बाघ",
    "Monkey":"बंदर","Fish":"मछली","Tortoise":"कछुआ","Parrot":"तोता",
    "Apple":"सेब","Banana":"केला","Mango":"आम","Grapes":"अंगूर",
    "Orange":"संतरा","Carrot":"गाजर","Tomato":"टमाटर",
    "Potato":"आलू","Brinjal":"बैंगन",
    "Eyes":"आँखें","Ears":"कान","Nose":"नाक","Mouth":"मुँह",
    "Tongue":"जीभ","Hands":"हाथ","Feet":"पैर","Heart":"हृदय",
    "Brain":"मस्तिष्क","Teeth":"दाँत","Skin":"त्वचा",
    "Milk":"दूध","Bed":"बिस्तर","Chair":"कुर्सी","Ball":"गेंद",
    "Car":"कार","Book":"किताब","House":"घर","School":"स्कूल",
    "Water":"पानी","Pencil":"पेंसिल","Bag":"बैग","Door":"दरवाज़ा",
    "Noun":"संज्ञा","Verb":"क्रिया","Adjective":"विशेषण",
    "Pronoun":"सर्वनाम","Sentence":"वाक्य","Photosynthesis":"प्रकाश संश्लेषण",
    "Water cycle":"जल चक्र","Magnets":"चुंबक","Earth":"पृथ्वी",
    "Sound":"ध्वनि","Light":"प्रकाश","Continents":"महाद्वीप",
    "Oceans":"महासागर","India":"भारत","Karnataka":"कर्नाटक",
    "Hardware":"हार्डवेयर","Software":"सॉफ्टवेयर","Input":"इनपुट",
    "Output":"आउटपुट","Passwords":"पासवर्ड"
  }
};

function translate(text, language) {
  if (language === "en" || text == null) return text;
  const dict = WORDS[language] || {};
  const value = String(text);
  if (dict[value]) return dict[value];
  return value.split("\n").map((line) => dict[line] || line).join("\n");
}

function localizeItem(entry, language) {
  if (entry.numberValue) return entry;
  return {
    ...entry,
    label: translate(entry.label, language),
    big: translate(entry.big, language),
    say: translate(entry.say, language),
    note: translate(entry.note, language)
  };
}

const COLOURS = [
  ["🔴","Red"],["🔵","Blue"],["🟡","Yellow"],["🟢","Green"],
  ["🟠","Orange"],["🟣","Purple"],["⚫","Black"],["⚪","White"],
  ["🩷","Pink"],["🟤","Brown"],["🩶","Grey"]
];

const SHAPES = [
  ["⚫","Circle"],["🟥","Square"],["🔺","Triangle"],
  ["▭","Rectangle"],["⭐","Star"],["❤️","Heart"],
  ["🔷","Diamond"],["⬟","Pentagon"],["⬢","Hexagon"]
];

const ANIMALS = [
  ["🐶","Dog","A dog says woof!"],["🐱","Cat","A cat says meow!"],
  ["🐮","Cow","A cow says moo!"],["🐑","Sheep","A sheep says baa!"],
  ["🐸","Frog","A frog says ribbit!"],["🦁","Lion","A lion roars."],
  ["🐘","Elephant","An elephant has a long trunk."],
  ["🐯","Tiger","A tiger has stripes."],["🦚","Peacock","The peacock is India's national bird."],
  ["🐒","Monkey","Monkeys climb trees."],["🐟","Fish","Fish live in water."],
  ["🐢","Tortoise","A tortoise has a hard shell."],
  ["🦜","Parrot","A parrot can copy sounds."],["🐝","Bee","Bees make honey."]
];

const FOODS = [
  ["🍎","Apple","Apples are crunchy fruits."],
  ["🍌","Banana","Bananas are soft and sweet."],
  ["🥭","Mango","Mango is often called the king of fruits in India."],
  ["🍇","Grapes","Grapes grow in bunches."],
  ["🍊","Orange","Oranges are juicy fruits."],
  ["🥕","Carrot","Carrots are orange vegetables."],
  ["🍅","Tomato","Tomatoes are used in many dishes."],
  ["🥔","Potato","Potatoes grow underground."],
  ["🍆","Brinjal","Brinjal is a purple vegetable."]
];

const BODY = [
  ["👀","Eyes","We see with our eyes."],["👂","Ears","We hear with our ears."],
  ["👃","Nose","We smell with our nose."],["👅","Tongue","We taste with our tongue."],
  ["✋","Hands","We hold things with our hands."],["🦶","Feet","We walk with our feet."],
  ["🫀","Heart","The heart pumps blood around the body."],
  ["🧠","Brain","The brain helps us think and learn."],
  ["🦷","Teeth","Teeth help us chew food."],["🖐️","Skin","Our skin helps us feel touch."]
];

const EVERYDAY = [
  ["🥛","Milk"],["🛏️","Bed"],["🪑","Chair"],["⚽","Ball"],
  ["🚗","Car"],["📖","Book"],["🥣","Bowl"],["🧸","Teddy"],
  ["🏠","House"],["🏫","School"],["🚌","Bus"],["💧","Water"],
  ["✏️","Pencil"],["🎒","Bag"],["🚪","Door"],["🪟","Window"]
];

const TABLES = [2,3,4,5,6,7,8,9,10,11,12].map((n) => ({
  label: String(n),
  big: `${n} times table`,
  say: Array.from({length:10},(_,i)=>`${n} times ${i+1} is ${n*(i+1)}`).join(", "),
  note: Array.from({length:10},(_,i)=>`${n} × ${i+1} = ${n*(i+1)}`).join("\n")
}));

const SUBJECTS = {
  "1-3": [
    {id:"col",icon:"🎨",title:"Colours",desc:"Recognise and name colours.",items:COLOURS.slice(0,8).map(([e,w])=>item(e,w))},
    {id:"shp",icon:"🔷",title:"Shapes",desc:"Discover simple shapes.",items:SHAPES.slice(0,6).map(([e,w])=>item(e,w))},
    {id:"num",icon:"🔢",title:"First Numbers",desc:"Count from 1 to 10.",numberLesson:true,items:numberCards(10,"en")},
    {id:"ani",icon:"🐼",title:"Animals",desc:"Meet animals and learn their sounds.",items:ANIMALS.slice(0,8).map(([e,w,s])=>item(e,w,s))},
    {id:"fru",icon:"🍎",title:"Fruits and Vegetables",desc:"Discover familiar foods.",items:FOODS.slice(0,8).map(([e,w,s])=>item(e,w,s))},
    {id:"bod",icon:"🧍",title:"My Body",desc:"Learn about body parts and senses.",items:BODY.slice(0,6).map(([e,w,s])=>item(e,w,s))},
    {id:"wrd",icon:"💬",title:"First Words",desc:"Learn everyday object names.",items:EVERYDAY.slice(0,8).map(([e,w])=>item(e,w))}
  ],
  "4-6": [
    {id:"abc",icon:"🔤",title:"ABC and Phonics",desc:"Learn letters and their sounds.",alphabet:true,items:alphabetCards("en")},
    {id:"num",icon:"🔢",title:"Numbers 1–100",desc:"Recognise, read and count numbers.",numberLesson:true,items:numberCards(100,"en")},
    {id:"col",icon:"🎨",title:"Colours",desc:"Recognise and compare colours.",items:COLOURS.map(([e,w])=>item(e,w))},
    {id:"shp",icon:"🔷",title:"Shapes",desc:"Learn basic and advanced shapes.",items:SHAPES.map(([e,w])=>item(e,w))},
    {id:"ani",icon:"🐼",title:"Animals",desc:"Explore animals and their features.",items:ANIMALS.map(([e,w,s])=>item(e,w,s))},
    {id:"fru",icon:"🍎",title:"Fruits and Vegetables",desc:"Learn about common foods.",items:FOODS.map(([e,w,s])=>item(e,w,s))},
    {id:"bod",icon:"🧍",title:"Human Body",desc:"Discover body parts and senses.",items:BODY.map(([e,w,s])=>item(e,w,s))},
    {id:"voc",icon:"📚",title:"Everyday Vocabulary",desc:"Learn useful everyday words.",items:EVERYDAY.map(([e,w])=>item(e,w))}
  ],
  "7-10": [
    {id:"mat",icon:"➗",title:"Mathematics",desc:"Explore arithmetic and mathematical thinking.",items:TABLES},
    {id:"gra",icon:"📝",title:"English Grammar",desc:"Learn important grammar concepts.",items:[
      item("🏷️","Noun","A noun names a person, place or thing."),
      item("🏃","Verb","A verb is an action word, like run, eat or sing."),
      item("🌈","Adjective","An adjective describes a noun."),
      item("🐢","Adverb","An adverb tells how, when or where something happens."),
      item("🙋","Pronoun","A pronoun takes the place of a noun."),
      item("📍","Preposition","A preposition shows position."),
      item("🔗","Conjunction","A conjunction joins words or sentences."),
      item("✍️","Sentence","A sentence expresses a complete thought.")
    ]},
    {id:"sci",icon:"🔬",title:"Science",desc:"Discover the natural and physical world.",items:[
      item("🌱","Photosynthesis","Plants make food using sunlight, water and carbon dioxide."),
      item("💧","Water cycle","Water evaporates, forms clouds and falls as rain."),
      item("🧲","Magnets","Magnets attract materials such as iron."),
      item("🌍","Earth","Earth spins once a day and travels around the Sun once a year."),
      item("🔊","Sound","Sound is made by vibrations."),
      item("💡","Light","Light travels in straight lines."),
      item("🧊","States of matter","Matter can be solid, liquid or gas.")
    ]},
    {id:"geo",icon:"🌍",title:"Geography",desc:"Explore Earth, India and the world.",items:[
      item("🌏","Continents","There are seven continents."),
      item("🌊","Oceans","There are five oceans."),
      item("🇮🇳","India","India's capital is New Delhi."),
      item("🌴","Karnataka","Bengaluru is the capital of Karnataka."),
      item("🏔️","Himalayas","The Himalayas are the highest mountain range."),
      item("🧭","Directions","The four main directions are north, south, east and west.")
    ]},
    {id:"com",icon:"💻",title:"Computer Basics",desc:"Understand computers and safe technology use.",items:[
      item("🖥️","Hardware","Hardware includes computer parts you can touch."),
      item("🧩","Software","Software is a set of programs that tells a computer what to do."),
      item("⌨️","Input","Input devices send information to a computer."),
      item("🖨️","Output","Output devices show results from a computer."),
      item("🔑","Passwords","Keep your password secret."),
      item("🛡️","Staying safe","Tell a trusted adult if something online makes you uncomfortable.")
    ]},
    {id:"log",icon:"🧩",title:"Logical Reasoning",desc:"Practise patterns and problem-solving.",items:[
      item("🔢","Number patterns","Find the rule in a sequence."),
      item("🧐","Odd one out","Find the item that does not belong."),
      item("2️⃣","Even and odd","Even numbers end in 0, 2, 4, 6 or 8.")
    ]}
  ]
};

/* =====================================================
   LANGUAGE-SPECIFIC KNOWLEDGE QUIZZES
===================================================== */

const QUIZ = {
  col: {
    en: [
      ["Which colour do red and yellow make?","Orange","Green","Purple","Red and yellow make orange."],
      ["What is the colour of grass?","Green","Blue","Pink","Grass is usually green."],
      ["Which colour is a clear daytime sky?","Blue","Brown","Black","A clear daytime sky usually looks blue."]
    ],
    kn: [
      ["ಕೆಂಪು ಮತ್ತು ಹಳದಿ ಬಣ್ಣಗಳನ್ನು ಬೆರೆಸಿದರೆ ಯಾವ ಬಣ್ಣ ಸಿಗುತ್ತದೆ?","ಕಿತ್ತಳೆ","ಹಸಿರು","ನೇರಳೆ","ಕೆಂಪು ಮತ್ತು ಹಳದಿ ಬಣ್ಣಗಳಿಂದ ಕಿತ್ತಳೆ ಬಣ್ಣ ಸಿಗುತ್ತದೆ."],
      ["ಹುಲ್ಲಿನ ಬಣ್ಣ ಯಾವುದು?","ಹಸಿರು","ನೀಲಿ","ಗುಲಾಬಿ","ಹುಲ್ಲು ಸಾಮಾನ್ಯವಾಗಿ ಹಸಿರು ಬಣ್ಣದಲ್ಲಿರುತ್ತದೆ."],
      ["ಹಗಲಿನ ಸ್ವಚ್ಛ ಆಕಾಶದ ಬಣ್ಣ ಯಾವುದು?","ನೀಲಿ","ಕಂದು","ಕಪ್ಪು","ಸ್ವಚ್ಛ ಆಕಾಶ ಸಾಮಾನ್ಯವಾಗಿ ನೀಲಿ ಬಣ್ಣದಲ್ಲಿರುತ್ತದೆ."]
    ],
    hi: [
      ["लाल और पीला रंग मिलाने से कौन-सा रंग बनता है?","नारंगी","हरा","बैंगनी","लाल और पीला मिलकर नारंगी बनाते हैं।"],
      ["घास का रंग कैसा होता है?","हरा","नीला","गुलाबी","घास आमतौर पर हरी होती है।"],
      ["साफ़ दिन में आसमान कैसा दिखता है?","नीला","भूरा","काला","साफ़ दिन में आसमान आमतौर पर नीला दिखता है।"]
    ]
  },
  shp: {
    en: [
      ["How many sides does a triangle have?","Three","Four","Five","A triangle has three sides."],
      ["Which shape has no corners?","Circle","Square","Rectangle","A circle has no corners."],
      ["How many sides does a hexagon have?","Six","Five","Eight","A hexagon has six sides."]
    ],
    kn: [
      ["ತ್ರಿಕೋನಕ್ಕೆ ಎಷ್ಟು ಬದಿಗಳಿವೆ?","ಮೂರು","ನಾಲ್ಕು","ಐದು","ತ್ರಿಕೋನಕ್ಕೆ ಮೂರು ಬದಿಗಳಿವೆ."],
      ["ಯಾವ ಆಕಾರಕ್ಕೆ ಮೂಲೆಗಳಿಲ್ಲ?","ವೃತ್ತ","ಚೌಕ","ಆಯತ","ವೃತ್ತಕ್ಕೆ ಮೂಲೆಗಳಿಲ್ಲ."],
      ["ಷಡ್ಭುಜಕ್ಕೆ ಎಷ್ಟು ಬದಿಗಳಿವೆ?","ಆರು","ಐದು","ಎಂಟು","ಷಡ್ಭುಜಕ್ಕೆ ಆರು ಬದಿಗಳಿವೆ."]
    ],
    hi: [
      ["त्रिभुज की कितनी भुजाएँ होती हैं?","तीन","चार","पाँच","त्रिभुज की तीन भुजाएँ होती हैं।"],
      ["किस आकार का कोई कोना नहीं होता?","वृत्त","वर्ग","आयत","वृत्त का कोई कोना नहीं होता।"],
      ["षट्भुज की कितनी भुजाएँ होती हैं?","छह","पाँच","आठ","षट्भुज की छह भुजाएँ होती हैं।"]
    ]
  },
  ani: {
    en: [
      ["Which animal has a long trunk?","Elephant","Lion","Monkey","An elephant has a long trunk."],
      ["Which animal gives us wool?","Sheep","Dog","Tiger","Sheep provide wool."],
      ["Which insect makes honey?","Bee","Butterfly","Ant","Bees make honey."]
    ],
    kn: [
      ["ಯಾವ ಪ್ರಾಣಿಗೆ ಉದ್ದವಾದ ಸೊಂಡಿಲಿದೆ?","ಆನೆ","ಸಿಂಹ","ಕೋತಿ","ಆನೆಗೆ ಉದ್ದವಾದ ಸೊಂಡಿಲಿದೆ."],
      ["ಯಾವ ಪ್ರಾಣಿಯಿಂದ ಉಣ್ಣೆ ಸಿಗುತ್ತದೆ?","ಕುರಿ","ನಾಯಿ","ಹುಲಿ","ಕುರಿಯಿಂದ ಉಣ್ಣೆ ಸಿಗುತ್ತದೆ."],
      ["ಜೇನುತುಪ್ಪವನ್ನು ತಯಾರಿಸುವ ಕೀಟ ಯಾವುದು?","ಜೇನುನೊಣ","ಚಿಟ್ಟೆ","ಇರುವೆ","ಜೇನುನೊಣಗಳು ಜೇನುತುಪ್ಪ ತಯಾರಿಸುತ್ತವೆ."]
    ],
    hi: [
      ["किस जानवर की सूँड़ लंबी होती है?","हाथी","शेर","बंदर","हाथी की सूँड़ लंबी होती है।"],
      ["किस जानवर से ऊन मिलती है?","भेड़","कुत्ता","बाघ","भेड़ से ऊन मिलती है।"],
      ["शहद कौन बनाता है?","मधुमक्खी","तितली","चींटी","मधुमक्खियाँ शहद बनाती हैं।"]
    ]
  },
  fru: {
    en: [
      ["Which fruit is called the king of fruits in India?","Mango","Apple","Banana","Mango is often called the king of fruits."],
      ["Which vegetable grows underground?","Potato","Tomato","Brinjal","Potatoes grow underground."],
      ["Which fruit grows in bunches?","Grapes","Mango","Apple","Grapes grow in bunches."]
    ],
    kn: [
      ["ಭಾರತದಲ್ಲಿ ಹಣ್ಣುಗಳ ರಾಜ ಎಂದು ಯಾವ ಹಣ್ಣನ್ನು ಕರೆಯುತ್ತಾರೆ?","ಮಾವು","ಸೇಬು","ಬಾಳೆಹಣ್ಣು","ಮಾವನ್ನು ಹಣ್ಣುಗಳ ರಾಜ ಎಂದು ಕರೆಯುತ್ತಾರೆ."],
      ["ನೆಲದೊಳಗೆ ಬೆಳೆಯುವ ತರಕಾರಿ ಯಾವುದು?","ಆಲೂಗಡ್ಡೆ","ಟೊಮೇಟೊ","ಬದನೆಕಾಯಿ","ಆಲೂಗಡ್ಡೆ ನೆಲದೊಳಗೆ ಬೆಳೆಯುತ್ತದೆ."],
      ["ಗುಚ್ಛವಾಗಿ ಬೆಳೆಯುವ ಹಣ್ಣು ಯಾವುದು?","ದ್ರಾಕ್ಷಿ","ಮಾವು","ಸೇಬು","ದ್ರಾಕ್ಷಿಗಳು ಗುಚ್ಛವಾಗಿ ಬೆಳೆಯುತ್ತವೆ."]
    ],
    hi: [
      ["भारत में फलों का राजा किसे कहा जाता है?","आम","सेब","केला","आम को फलों का राजा कहा जाता है।"],
      ["कौन-सी सब्ज़ी ज़मीन के नीचे उगती है?","आलू","टमाटर","बैंगन","आलू ज़मीन के नीचे उगता है।"],
      ["कौन-सा फल गुच्छों में उगता है?","अंगूर","आम","सेब","अंगूर गुच्छों में उगते हैं।"]
    ]
  },
  bod: {
    en: [
      ["Which body part helps us smell?","Nose","Eyes","Ears","We smell with our nose."],
      ["Which body part helps us see?","Eyes","Ears","Hands","We see with our eyes."],
      ["Which body part helps us hear?","Ears","Nose","Feet","We hear with our ears."],
      ["Which body part helps us taste food?","Tongue","Teeth","Nose","Our tongue helps us taste food."],
      ["Which organ pumps blood?","Heart","Brain","Stomach","The heart pumps blood around the body."]
    ],
    kn: [
      ["ವಾಸನೆಯನ್ನು ಗ್ರಹಿಸಲು ಯಾವ ಅಂಗ ಸಹಾಯ ಮಾಡುತ್ತದೆ?","ಮೂಗು","ಕಣ್ಣುಗಳು","ಕಿವಿಗಳು","ನಾವು ಮೂಗಿನ ಮೂಲಕ ವಾಸನೆಯನ್ನು ಗ್ರಹಿಸುತ್ತೇವೆ."],
      ["ನೋಡಲು ಯಾವ ಅಂಗ ಸಹಾಯ ಮಾಡುತ್ತದೆ?","ಕಣ್ಣುಗಳು","ಕಿವಿಗಳು","ಕೈಗಳು","ನಮ್ಮ ಕಣ್ಣುಗಳು ನೋಡಲು ಸಹಾಯ ಮಾಡುತ್ತವೆ."],
      ["ಕೇಳಲು ಯಾವ ಅಂಗ ಸಹಾಯ ಮಾಡುತ್ತದೆ?","ಕಿವಿಗಳು","ಮೂಗು","ಪಾದಗಳು","ನಾವು ಕಿವಿಗಳ ಮೂಲಕ ಶಬ್ದಗಳನ್ನು ಕೇಳುತ್ತೇವೆ."],
      ["ಆಹಾರದ ರುಚಿ ತಿಳಿಯಲು ಯಾವ ಅಂಗ ಸಹಾಯ ಮಾಡುತ್ತದೆ?","ನಾಲಿಗೆ","ಹಲ್ಲುಗಳು","ಮೂಗು","ನಮ್ಮ ನಾಲಿಗೆ ರುಚಿಯನ್ನು ತಿಳಿಯಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ."],
      ["ರಕ್ತವನ್ನು ಪಂಪ್ ಮಾಡುವ ಅಂಗ ಯಾವುದು?","ಹೃದಯ","ಮೆದುಳು","ಹೊಟ್ಟೆ","ಹೃದಯವು ದೇಹದಾದ್ಯಂತ ರಕ್ತವನ್ನು ಪಂಪ್ ಮಾಡುತ್ತದೆ."]
    ],
    hi: [
      ["सूँघने में कौन-सा अंग मदद करता है?","नाक","आँखें","कान","हम अपनी नाक से सूँघते हैं।"],
      ["देखने में कौन-सा अंग मदद करता है?","आँखें","कान","हाथ","हम अपनी आँखों से देखते हैं।"],
      ["सुनने में कौन-सा अंग मदद करता है?","कान","नाक","पैर","हम अपने कानों से सुनते हैं।"],
      ["खाने का स्वाद चखने में कौन-सा अंग मदद करता है?","जीभ","दाँत","नाक","हमारी जीभ स्वाद पहचानती है।"],
      ["खून पंप करने वाला अंग कौन-सा है?","हृदय","मस्तिष्क","पेट","हृदय पूरे शरीर में खून पहुँचाता है।"]
    ]
  },
  wrd: {
    en: [
      ["What do we use to read a story?","Book","Chair","Ball","We read stories in books."],
      ["What do we use to write?","Pencil","Bowl","Bed","A pencil helps us write."],
      ["Where do children go to learn?","School","Hospital","Market","Children go to school to learn."]
    ],
    kn: [
      ["ಕಥೆ ಓದಲು ಯಾವುದನ್ನು ಬಳಸುತ್ತೇವೆ?","ಪುಸ್ತಕ","ಕುರ್ಚಿ","ಚೆಂಡು","ನಾವು ಪುಸ್ತಕದಲ್ಲಿ ಕಥೆಗಳನ್ನು ಓದುತ್ತೇವೆ."],
      ["ಬರೆಯಲು ಯಾವುದನ್ನು ಬಳಸುತ್ತೇವೆ?","ಪೆನ್ಸಿಲ್","ಬಟ್ಟಲು","ಹಾಸಿಗೆ","ಪೆನ್ಸಿಲ್ ಬರೆಯಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ."],
      ["ಮಕ್ಕಳು ಕಲಿಯಲು ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತಾರೆ?","ಶಾಲೆ","ಆಸ್ಪತ್ರೆ","ಮಾರುಕಟ್ಟೆ","ಮಕ್ಕಳು ಕಲಿಯಲು ಶಾಲೆಗೆ ಹೋಗುತ್ತಾರೆ."]
    ],
    hi: [
      ["कहानी पढ़ने के लिए क्या उपयोग करते हैं?","किताब","कुर्सी","गेंद","हम किताबों में कहानियाँ पढ़ते हैं।"],
      ["लिखने के लिए क्या उपयोग करते हैं?","पेंसिल","कटोरा","बिस्तर","पेंसिल लिखने में मदद करती है।"],
      ["बच्चे सीखने के लिए कहाँ जाते हैं?","स्कूल","अस्पताल","बाज़ार","बच्चे सीखने के लिए स्कूल जाते हैं।"]
    ]
  },
  abc: {
    en: [
      ["Which letter comes after A?","B","C","D","B comes after A."],
      ["Which letter begins Apple?","A","B","C","Apple begins with A."],
      ["Which letter comes before D?","C","E","B","C comes before D."]
    ],
    kn: [
      ["ಕನ್ನಡ ವರ್ಣಮಾಲೆಯ ಮೊದಲ ಸ್ವರ ಯಾವುದು?","ಅ","ಆ","ಇ","ಅ ಕನ್ನಡದ ಮೊದಲ ಸ್ವರವಾಗಿದೆ."],
      ["ಅಕ್ಷರ 'ಕ' ನಂತರ ಯಾವ ಅಕ್ಷರ ಬರುತ್ತದೆ?","ಖ","ಗ","ಚ","ಕ ನಂತರ ಖ ಬರುತ್ತದೆ."],
      ["ಕನ್ನಡದ ಮೊದಲ ವ್ಯಂಜನ ಯಾವುದು?","ಕ","ಅ","ಆ","ಕ ಕನ್ನಡದ ಮೊದಲ ವ್ಯಂಜನವಾಗಿದೆ."]
    ],
    hi: [
      ["हिंदी वर्णमाला का पहला स्वर कौन-सा है?","अ","आ","इ","अ हिंदी का पहला स्वर है।"],
      ["क के बाद कौन-सा अक्षर आता है?","ख","ग","च","क के बाद ख आता है।"],
      ["हिंदी का पहला व्यंजन कौन-सा है?","क","अ","आ","क हिंदी का पहला व्यंजन है।"]
    ]
  },
  num: {
    en: [
      ["What number comes after 9?","10","8","11","10 comes after 9."],
      ["What is 5 + 3?","8","7","9","Five plus three equals eight."],
      ["Which is bigger, 12 or 8?","12","8","Both equal","12 is greater than 8."]
    ],
    kn: [
      ["9ರ ನಂತರ ಯಾವ ಸಂಖ್ಯೆ ಬರುತ್ತದೆ?","೧೦","೮","೧೧","9ರ ನಂತರ 10 ಬರುತ್ತದೆ."],
      ["5 + 3 ಎಷ್ಟು?","೮","೭","೯","ಐದು ಮತ್ತು ಮೂರು ಸೇರಿಸಿದರೆ ಎಂಟು."],
      ["12 ಮತ್ತು 8ರಲ್ಲಿ ದೊಡ್ಡದು ಯಾವುದು?","೧೨","೮","ಎರಡೂ ಸಮಾನ","12, 8ಕ್ಕಿಂತ ದೊಡ್ಡದು."]
    ],
    hi: [
      ["9 के बाद कौन-सी संख्या आती है?","१०","८","११","9 के बाद 10 आता है।"],
      ["5 + 3 कितना होता है?","८","७","९","पाँच और तीन मिलकर आठ होते हैं।"],
      ["12 और 8 में बड़ी संख्या कौन-सी है?","१२","८","दोनों बराबर","12, 8 से बड़ी है।"]
    ]
  },
  mat: {
    en: [
      ["What is 7 × 8?","56","54","64","Seven multiplied by eight equals 56."],
      ["What is 144 ÷ 12?","12","10","14","144 divided by 12 equals 12."],
      ["What is half of 80?","40","20","60","Half of 80 is 40."]
    ],
    kn: [
      ["7 × 8 ಎಷ್ಟು?","56","54","64","ಏಳನ್ನು ಎಂಟರಿಂದ ಗುಣಿಸಿದರೆ 56."],
      ["144 ÷ 12 ಎಷ್ಟು?","12","10","14","144 ಅನ್ನು 12ರಿಂದ ಭಾಗಿಸಿದರೆ 12."],
      ["80ರ ಅರ್ಧ ಎಷ್ಟು?","40","20","60","80ರ ಅರ್ಧ 40."]
    ],
    hi: [
      ["7 × 8 कितना होता है?","56","54","64","सात गुणा आठ छप्पन होता है।"],
      ["144 ÷ 12 कितना होता है?","12","10","14","144 को 12 से भाग देने पर 12 मिलता है।"],
      ["80 का आधा कितना है?","40","20","60","80 का आधा 40 है।"]
    ]
  },
  gra: {
    en: [
      ["Which word is an action word?","Run","Beautiful","Table","A verb is an action word."],
      ["Which word is a noun?","Teacher","Quickly","Run","A noun names a person, place or thing."],
      ["Which word is an adjective?","Beautiful","Jump","Slowly","An adjective describes a noun."]
    ],
    kn: [
      ["ಕ್ರಿಯೆಯನ್ನು ಸೂಚಿಸುವ ಪದ ಯಾವುದು?","ಓಡು","ಸುಂದರ","ಮೇಜು","ಕ್ರಿಯಾಪದವು ಒಂದು ಕ್ರಿಯೆಯನ್ನು ಸೂಚಿಸುತ್ತದೆ."],
      ["ನಾಮಪದ ಯಾವುದು?","ಶಿಕ್ಷಕ","ಬೇಗನೆ","ಓಡು","ನಾಮಪದವು ವ್ಯಕ್ತಿ, ಸ್ಥಳ ಅಥವಾ ವಸ್ತುವಿನ ಹೆಸರನ್ನು ಸೂಚಿಸುತ್ತದೆ."],
      ["ವಿಶೇಷಣ ಯಾವುದು?","ಸುಂದರ","ಜಿಗಿ","ನಿಧಾನವಾಗಿ","ವಿಶೇಷಣವು ನಾಮಪದದ ಗುಣವನ್ನು ವಿವರಿಸುತ್ತದೆ."]
    ],
    hi: [
      ["कौन-सा शब्द क्रिया बताता है?","दौड़ना","सुंदर","मेज़","क्रिया किसी काम को बताती है।"],
      ["संज्ञा कौन-सा शब्द है?","शिक्षक","जल्दी","दौड़ना","संज्ञा व्यक्ति, स्थान या वस्तु का नाम बताती है।"],
      ["विशेषण कौन-सा शब्द है?","सुंदर","कूदना","धीरे","विशेषण संज्ञा की विशेषता बताता है।"]
    ]
  },
  sci: {
    en: [
      ["What do plants need to make food?","Sunlight","Plastic","Sand only","Plants use sunlight, water and carbon dioxide."],
      ["Which part absorbs water?","Roots","Flowers","Fruits","Roots absorb water from soil."],
      ["What is the freezing point of water?","0°C","10°C","100°C","Water freezes at 0°C."]
    ],
    kn: [
      ["ಸಸ್ಯಗಳು ಆಹಾರ ತಯಾರಿಸಲು ಯಾವುದರ ಅಗತ್ಯವಿದೆ?","ಸೂರ್ಯನ ಬೆಳಕು","ಪ್ಲಾಸ್ಟಿಕ್","ಮರಳು","ಸಸ್ಯಗಳು ಸೂರ್ಯನ ಬೆಳಕು, ನೀರು ಮತ್ತು ಇಂಗಾಲದ ಡೈಆಕ್ಸೈಡ್ ಬಳಸುತ್ತವೆ."],
      ["ಸಸ್ಯದ ಯಾವ ಭಾಗ ನೀರನ್ನು ಹೀರಿಕೊಳ್ಳುತ್ತದೆ?","ಬೇರುಗಳು","ಹೂವುಗಳು","ಹಣ್ಣುಗಳು","ಬೇರುಗಳು ಮಣ್ಣಿನಿಂದ ನೀರನ್ನು ಹೀರಿಕೊಳ್ಳುತ್ತವೆ."],
      ["ನೀರಿನ ಘನೀಭವನ ಬಿಂದು ಎಷ್ಟು?","0°C","10°C","100°C","ನೀರು 0°Cನಲ್ಲಿ ಮಂಜುಗಡ್ಡೆಯಾಗುತ್ತದೆ."]
    ],
    hi: [
      ["पौधों को भोजन बनाने के लिए किसकी ज़रूरत होती है?","सूर्य का प्रकाश","प्लास्टिक","केवल रेत","पौधे सूर्य के प्रकाश, पानी और कार्बन डाइऑक्साइड का उपयोग करते हैं।"],
      ["पौधे का कौन-सा भाग पानी सोखता है?","जड़ें","फूल","फल","जड़ें मिट्टी से पानी सोखती हैं।"],
      ["पानी का हिमांक कितना है?","0°C","10°C","100°C","पानी 0°C पर जमता है।"]
    ]
  },
  geo: {
    en: [
      ["What is the capital of India?","New Delhi","Mumbai","Bengaluru","New Delhi is the capital of India."],
      ["Which is the largest continent?","Asia","Europe","Australia","Asia is the largest continent."],
      ["What is the capital of Karnataka?","Bengaluru","Mysuru","Mangaluru","Bengaluru is the capital of Karnataka."]
    ],
    kn: [
      ["ಭಾರತದ ರಾಜಧಾನಿ ಯಾವುದು?","ನವದೆಹಲಿ","ಮುಂಬೈ","ಬೆಂಗಳೂರು","ನವದೆಹಲಿ ಭಾರತದ ರಾಜಧಾನಿಯಾಗಿದೆ."],
      ["ಅತಿ ದೊಡ್ಡ ಖಂಡ ಯಾವುದು?","ಏಷ್ಯಾ","ಯುರೋಪ್","ಆಸ್ಟ್ರೇಲಿಯಾ","ಏಷ್ಯಾ ಅತಿ ದೊಡ್ಡ ಖಂಡವಾಗಿದೆ."],
      ["ಕರ್ನಾಟಕದ ರಾಜಧಾನಿ ಯಾವುದು?","ಬೆಂಗಳೂರು","ಮೈಸೂರು","ಮಂಗಳೂರು","ಬೆಂಗಳೂರು ಕರ್ನಾಟಕದ ರಾಜಧಾನಿಯಾಗಿದೆ."]
    ],
    hi: [
      ["भारत की राजधानी क्या है?","नई दिल्ली","मुंबई","बेंगलुरु","नई दिल्ली भारत की राजधानी है।"],
      ["सबसे बड़ा महाद्वीप कौन-सा है?","एशिया","यूरोप","ऑस्ट्रेलिया","एशिया सबसे बड़ा महाद्वीप है।"],
      ["कर्नाटक की राजधानी क्या है?","बेंगलुरु","मैसूरु","मंगलुरु","बेंगलुरु कर्नाटक की राजधानी है।"]
    ]
  },
  com: {
    en: [
      ["Which device is used to type?","Keyboard","Monitor","Speaker","A keyboard is used to type."],
      ["Which device displays pictures?","Monitor","Mouse","Microphone","A monitor displays pictures and text."],
      ["Should you share your password with strangers?","No","Yes","Always","Keep your password private."]
    ],
    kn: [
      ["ಟೈಪ್ ಮಾಡಲು ಯಾವ ಸಾಧನ ಬಳಸುತ್ತೇವೆ?","ಕೀಬೋರ್ಡ್","ಮಾನಿಟರ್","ಸ್ಪೀಕರ್","ಟೈಪ್ ಮಾಡಲು ಕೀಬೋರ್ಡ್ ಬಳಸುತ್ತೇವೆ."],
      ["ಚಿತ್ರಗಳನ್ನು ತೋರಿಸುವ ಸಾಧನ ಯಾವುದು?","ಮಾನಿಟರ್","ಮೌಸ್","ಮೈಕ್ರೋಫೋನ್","ಮಾನಿಟರ್ ಚಿತ್ರಗಳನ್ನು ತೋರಿಸುತ್ತದೆ."],
      ["ಗುಪ್ತಪದವನ್ನು ಅಪರಿಚಿತರೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಬೇಕೇ?","ಇಲ್ಲ","ಹೌದು","ಯಾವಾಗಲೂ","ನಿಮ್ಮ ಗುಪ್ತಪದವನ್ನು ಖಾಸಗಿಯಾಗಿ ಇಡಿ."]
    ],
    hi: [
      ["टाइप करने के लिए किस उपकरण का उपयोग होता है?","कीबोर्ड","मॉनिटर","स्पीकर","टाइप करने के लिए कीबोर्ड का उपयोग होता है।"],
      ["चित्र कौन-सा उपकरण दिखाता है?","मॉनिटर","माउस","माइक्रोफ़ोन","मॉनिटर चित्र और लिखावट दिखाता है।"],
      ["क्या पासवर्ड अनजान लोगों को बताना चाहिए?","नहीं","हाँ","हमेशा","अपना पासवर्ड गुप्त रखें।"]
    ]
  },
  log: {
    en: [
      ["What comes next: 2, 4, 6, 8, ...?","10","9","12","The numbers increase by 2."],
      ["Which does not belong: cat, dog, cow, table?","Table","Cat","Dog","A table is not an animal."],
      ["Which number is even?","18","15","21","18 is divisible by 2."]
    ],
    kn: [
      ["ಮುಂದಿನ ಸಂಖ್ಯೆ ಯಾವುದು: 2, 4, 6, 8, ...?","10","9","12","ಪ್ರತಿ ಬಾರಿ ಸಂಖ್ಯೆ 2ರಷ್ಟು ಹೆಚ್ಚಾಗುತ್ತದೆ."],
      ["ಇವುಗಳಲ್ಲಿ ಸೇರದಿರುವುದು ಯಾವುದು: ಬೆಕ್ಕು, ನಾಯಿ, ಹಸು, ಮೇಜು?","ಮೇಜು","ಬೆಕ್ಕು","ನಾಯಿ","ಮೇಜು ಪ್ರಾಣಿಯಲ್ಲ."],
      ["ಸಮ ಸಂಖ್ಯೆ ಯಾವುದು?","18","15","21","18 ಅನ್ನು 2ರಿಂದ ಭಾಗಿಸಬಹುದು."]
    ],
    hi: [
      ["अगली संख्या क्या होगी: 2, 4, 6, 8, ...?","10","9","12","हर बार संख्या 2 से बढ़ती है।"],
      ["इनमें अलग कौन है: बिल्ली, कुत्ता, गाय, मेज़?","मेज़","बिल्ली","कुत्ता","मेज़ कोई जानवर नहीं है।"],
      ["सम संख्या कौन-सी है?","18","15","21","18 को 2 से पूरा भाग दिया जा सकता है।"]
    ]
  }
};

/* =====================================================
   SUBJECT LOCALIZATION AND QUIZ BUILDERS
===================================================== */

function localizeSubject(subject, language) {
  let items;

  if (subject.alphabet) {
    items = alphabetCards(language);
  } else if (subject.numberLesson) {
    items = numberCards(subject.items.length, language);
  } else {
    items = subject.items.map((entry) => ({
      ...entry,
      label: translate(entry.label, language),
      big: translate(entry.big, language),
      say: translate(entry.say, language),
      note: translate(entry.note, language)
    }));
  }

  return {
    ...subject,
    title: subject.alphabet
      ? language === "kn" ? "ಕನ್ನಡ ವರ್ಣಮಾಲೆ"
        : language === "hi" ? "हिंदी वर्णमाला"
        : "English Alphabet"
      : translate(subject.title, language),
    desc: translate(subject.desc, language),
    items
  };
}

function makeQuestion(row) {
  const [p, answer, wrong1, wrong2, explanation] = row;
  const options = shuffle([answer, wrong1, wrong2]);
  return { p, o: options, a: options.indexOf(answer), e: explanation };
}

function makeQuiz(subjectId, language) {
  if (subjectId === "mat") {
    const bank = {
      en: [
        ["What is 7 × 8?","56","54","64","Seven multiplied by eight equals 56."],
        ["What is 144 ÷ 12?","12","10","14","144 divided by 12 equals 12."],
        ["What is 25 + 37?","62","52","72","25 plus 37 equals 62."]
      ],
      kn: [
        ["7 × 8 ಎಷ್ಟು?","56","54","64","ಏಳನ್ನು ಎಂಟರಿಂದ ಗುಣಿಸಿದರೆ 56."],
        ["144 ÷ 12 ಎಷ್ಟು?","12","10","14","144 ಅನ್ನು 12ರಿಂದ ಭಾಗಿಸಿದರೆ 12."],
        ["25 + 37 ಎಷ್ಟು?","62","52","72","25 ಮತ್ತು 37 ಸೇರಿಸಿದರೆ 62."]
      ],
      hi: [
        ["7 × 8 कितना होता है?","56","54","64","सात गुणा आठ छप्पन होता है।"],
        ["144 ÷ 12 कितना होता है?","12","10","14","144 को 12 से भाग देने पर 12 मिलता है।"],
        ["25 + 37 कितना होता है?","62","52","72","25 और 37 मिलकर 62 होते हैं।"]
      ]
    };
    return shuffle(bank[language] || bank.en).map(makeQuestion);
  }

  const bank = QUIZ[subjectId]?.[language] || QUIZ[subjectId]?.en;
  if (bank) return shuffle(bank).slice(0, 6).map(makeQuestion);

  return [];
}

/* =====================================================
   DIGITAL WRITING SLATE
===================================================== */

function WritingPad({ target, language, ageGroup, onNext, ui }) {
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const lastRef = useRef(null);
  const historyRef = useRef([]);
  const [hasDrawing, setHasDrawing] = useState(false);
  const [independent, setIndependent] = useState(false);

  const saveSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    historyRef.current.push(canvas.toDataURL());
    if (historyRef.current.length > 15) historyRef.current.shift();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;

    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;

    const context = canvas.getContext("2d");
    context.scale(ratio, ratio);
    context.lineWidth = 5;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "#493b78";

    historyRef.current = [];
    setHasDrawing(false);
  }, [target, independent]);

  const position = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const startDraw = (event) => {
    event.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    saveSnapshot();
    canvas.setPointerCapture?.(event.pointerId);
    drawingRef.current = true;
    lastRef.current = position(event);
    setHasDrawing(true);
  };

  const draw = (event) => {
    if (!drawingRef.current) return;
    event.preventDefault();

    const context = canvasRef.current.getContext("2d");
    const current = position(event);
    context.beginPath();
    context.moveTo(lastRef.current.x, lastRef.current.y);
    context.lineTo(current.x, current.y);
    context.stroke();
    lastRef.current = current;
  };

  const stopDraw = () => {
    drawingRef.current = false;
    lastRef.current = null;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    historyRef.current = [];
    setHasDrawing(false);
  };

  const undo = () => {
    const canvas = canvasRef.current;
    const previous = historyRef.current.pop();
    if (!canvas || !previous) return;

    const image = new Image();
    image.onload = () => {
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    image.src = previous;
    setHasDrawing(historyRef.current.length > 0);
  };

  return (
    <section className="lp-writing">
      <div className="lp-writing-prompt">
        <p>{independent ? ui.write : ui.trace}</p>
        <div className="lp-writing-example">
          {independent ? "✏️" : target}
        </div>
        <small>{ui.draw}</small>
      </div>

      <div className="lp-writing-canvas-wrap">
        <canvas
          ref={canvasRef}
          className="lp-writing-canvas"
          onPointerDown={startDraw}
          onPointerMove={draw}
          onPointerUp={stopDraw}
          onPointerCancel={stopDraw}
          onPointerLeave={stopDraw}
        />
      </div>

      <div className="lp-writing-actions">
        <button className="lp-btn lp-btn--ghost" onClick={undo}>
          ↶ {ui.undo}
        </button>
        <button className="lp-btn lp-btn--ghost" onClick={clear}>
          🧹 {ui.clear}
        </button>
        {ageGroup !== "1-3" && !independent && (
          <button className="lp-btn" onClick={() => {
            clear();
            setIndependent(true);
          }}>
            {ui.write}
          </button>
        )}
        <button className="lp-btn" onClick={() => {
          clear();
          setIndependent(false);
          onNext();
        }}>
          {ui.next}
        </button>
      </div>
    </section>
  );
}

/* =====================================================
   QUIZ COMPONENT
===================================================== */

function Quiz({ questions, language, tiny, onExit }) {
  const ui = UI[language];
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);
  const question = questions[index];

  useEffect(() => {
    if (question) speak(question.p, language, tiny);
  }, [index, language]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!question) {
    return (
      <div className="lp-panel lp-center">
        <div className="lp-big">🎉</div>
        <h3>{ui.quizDone}</h3>
        <p>{ui.score}: {score}/{questions.length}</p>
        <button className="lp-btn" onClick={onExit}>{ui.done}</button>
      </div>
    );
  }

  const choose = (j) => {
    if (picked !== null) return;
    const right = j === question.a;

    if (!right && tiny) {
      speak(ui.tryAgain, language, true);
      return;
    }

    setPicked(j);
    if (right) setScore((value) => value + 1);
    speak(`${right ? ui.correct : ui.tryAgain} ${question.e}`, language, tiny);
  };

  return (
    <div className="lp-panel">
      <p className="lp-q">{question.p}</p>
      <div className="lp-opts">
        {question.o.map((option, j) => (
          <button
            key={j}
            className={`lp-opt${picked !== null && j === question.a ? " is-right" : ""}${picked === j && j !== question.a ? " is-wrong" : ""}`}
            onClick={() => choose(j)}
          >
            {option}
          </button>
        ))}
      </div>
      {picked !== null && (
        <div className="lp-feedback">
          <p>{picked === question.a ? ui.correct : ui.tryAgain} {question.e}</p>
          <button className="lp-btn" onClick={() => {
            setPicked(null);
            setIndex((value) => value + 1);
          }}>
            {ui.next}
          </button>
        </div>
      )}
    </div>
  );
}

/* =====================================================
   MAIN LEARNING PAGE
===================================================== */

export default function LearningPages({
  ageGroup = "4-6",
  language = "en",
  lang,
  onBack
}) {
  const selectedLanguage = ["en","kn","hi"].includes(lang || language)
    ? (lang || language)
    : "en";

  const ui = UI[selectedLanguage];
  const tiny = ageGroup === "1-3";

  const baseSubjects = SUBJECTS[ageGroup] || SUBJECTS["4-6"];

  const localizedSubjects = useMemo(
    () => baseSubjects.map((subject) => localizeSubject(subject, selectedLanguage)),
    [ageGroup, selectedLanguage]
  );

  const [subjectId, setSubjectId] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [stage, setStage] = useState("learn");
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [questions, setQuestions] = useState(null);

  const subject = localizedSubjects.find((entry) => entry.id === subjectId);
  const currentCard = subject?.items?.[cardIndex];

  useEffect(() => {
    setSubjectId(null);
    setCardIndex(0);
    setStage("learn");
    setPracticeIndex(0);
    setQuestions(null);
    stopSpeech();
  }, [ageGroup, selectedLanguage]);

  useEffect(() => () => stopSpeech(), []);

  const goBack = () => {
    stopSpeech();

    if (questions) {
      setQuestions(null);
      setStage("learn");
    } else if (stage !== "learn") {
      setStage("learn");
    } else if (subjectId) {
      setSubjectId(null);
      setCardIndex(0);
    } else {
      onBack?.();
    }
  };

  const openSubject = (entry) => {
    setSubjectId(entry.id);
    setCardIndex(0);
    setPracticeIndex(0);
    setStage("learn");
    setQuestions(null);
    if (tiny) speak(entry.title, selectedLanguage, true);
  };

  const selectCard = (index) => {
    setCardIndex(index);
    const entry = subject.items[index];
    speak(entry.say, selectedLanguage, tiny);
  };

  const beginPractice = () => {
    setPracticeIndex(0);
    setStage("practice");
    stopSpeech();
  };

  const startChallenge = () => {
    const bank = makeQuiz(subject.id, selectedLanguage);

    if (bank.length) {
      setQuestions(bank);
    } else {
      // Fallback for lessons without a dedicated question bank.
      const entries = subject.items;
      const fallback = shuffle(entries).slice(0, 5).map((entry) => {
        const wrong = shuffle(entries.filter((x) => x.label !== entry.label))
          .slice(0, 2)
          .map((x) => x.label);
        const options = shuffle([entry.label, ...wrong]);
        return {
          p: selectedLanguage === "kn"
            ? `ಸರಿಯಾದ ಉತ್ತರವನ್ನು ಆಯ್ಕೆಮಾಡಿ: ${entry.say}`
            : selectedLanguage === "hi"
              ? `सही उत्तर चुनें: ${entry.say}`
              : `Choose the correct answer: ${entry.say}`,
          o: options,
          a: options.indexOf(entry.label),
          e: entry.note || entry.say
        };
      });
      setQuestions(fallback);
    }

    setStage("challenge");
  };

  const isWritingLesson = subject?.alphabet || subject?.numberLesson;

  const writingTarget = isWritingLesson
    ? subject.items[practiceIndex % subject.items.length]?.label
    : subject?.items[practiceIndex % (subject?.items.length || 1)]?.label;

  return (
    <div className={`lp lp--${ageGroup}`}>
      <button className="lp-back" onClick={goBack}>
        ← {subjectId ? ui.subjects : ui.back}
      </button>

      <main className="lp-sheet">
        <header className="lp-head">
          <span className="lp-logo" aria-hidden="true">🌞</span>
          <div>
            <h1>{ui.heading}</h1>
            <p>{ui.tagline}</p>
          </div>
          <span className="lp-age">
            {AGE_LABELS[selectedLanguage][ageGroup]}
          </span>
        </header>

        {!subject && (
          <>
            <h2 className="lp-ask">{ui.ask}</h2>
            <p className="lp-sub">{ui.choose}</p>

            <div className="lp-grid">
              {localizedSubjects.map((entry, index) => (
                <button
                  key={entry.id}
                  className="lp-card"
                  style={{ background: ["#fff","#e4f2fc","#fdf0d0","#e1f3e8","#ede6fb","#fbe6e3"][index % 6] }}
                  onClick={() => openSubject(entry)}
                >
                  <span className="lp-icon">{entry.icon}</span>
                  <strong>{entry.title}</strong>
                  <small>{entry.desc}</small>
                  <b className="lp-go">{ui.explore}</b>
                </button>
              ))}
            </div>
          </>
        )}

        {subject && !questions && (
          <>
            <h2 className="lp-ask">{subject.icon} {subject.title}</h2>

            <div className="lp-actions">
              <button className={`lp-btn${stage === "learn" ? "" : " lp-btn--ghost"}`} onClick={() => setStage("learn")}>
                {ui.learn}
              </button>
              <button className={`lp-btn${stage === "practice" ? "" : " lp-btn--ghost"}`} onClick={beginPractice}>
                ✏️ {ui.practice}
              </button>
              <button className={`lp-btn${stage === "challenge" ? "" : " lp-btn--ghost"}`} onClick={startChallenge}>
                🧠 {ui.challenge}
              </button>
            </div>

            {stage === "learn" && (
              <>
                <div className="lp-panel lp-center lp-show">
                  {currentCard ? (
                    <>
                      <div className="lp-big">{currentCard.big}</div>
                      {currentCard.note && <p className="lp-note">{currentCard.note}</p>}
                      <button className="lp-btn lp-btn--ghost" onClick={() => speak(currentCard.say, selectedLanguage, tiny)}>
                        {ui.repeat}
                      </button>
                    </>
                  ) : <p className="lp-hint">{ui.hint}</p>}
                </div>

                <div className="lp-chips">
                  {subject.items.map((entry, index) => (
                    <button
                      key={`${entry.label}-${index}`}
                      className={`lp-chip${index === cardIndex ? " is-on" : ""}`}
                      onClick={() => selectCard(index)}
                    >
                      {entry.label}
                    </button>
                  ))}
                </div>
              </>
            )}

            {stage === "practice" && (
              <div className="lp-panel">
                {isWritingLesson && (
                  <div className="lp-chips">
                    <button className="lp-chip is-on">{ui.letters}</button>
                    <button className="lp-chip" onClick={() => {
                      const numberSubject = localizedSubjects.find((x) => x.id === "num");
                      if (numberSubject) {
                        setSubjectId("num");
                        setPracticeIndex(0);
                      }
                    }}>
                      {ui.numbers}
                    </button>
                  </div>
                )}

                <p className="lp-hint">{ui.trace}</p>

                <WritingPad
                  key={`${subject.id}-${practiceIndex}`}
                  target={writingTarget}
                  language={selectedLanguage}
                  ageGroup={ageGroup}
                  ui={ui}
                  onNext={() => {
                    setPracticeIndex((value) => (value + 1) % subject.items.length);
                  }}
                />

                <div className="lp-actions">
                  <button className="lp-btn lp-btn--ghost" onClick={() => {
                    setPracticeIndex((value) => Math.max(0, value - 1));
                  }}>
                    ←
                  </button>
                  <span>{practiceIndex + 1} / {subject.items.length}</span>
                  <button className="lp-btn" onClick={() => {
                    setPracticeIndex((value) => (value + 1) % subject.items.length);
                  }}>
                    {ui.next} →
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {subject && questions && (
          <>
            <h2 className="lp-ask">{subject.icon} {subject.title} — {ui.quiz}</h2>
            <Quiz
              questions={questions}
              language={selectedLanguage}
              tiny={tiny}
              onExit={() => {
                setQuestions(null);
                setStage("learn");
              }}
            />
          </>
        )}
      </main>
    </div>
  );
}
