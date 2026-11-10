
import { useEffect, useState } from "react";
import PageShell from "../components/PageShell";
import { rnd, shuffle, speak, stopSpeech } from "../utils/speech";

// ==================================================
// TRANSLATIONS
// ==================================================

const TEXT = {
  en: {
    title: "Fun & Games",
    allGames: "All games",
    back: "Back to Adventure",
    more: "More games",
    choose: "Choose a game",
    score: "Score",
    moves: "Moves",
    pairs: "Find the matching pairs",
    completed: "All pairs found!",
    hooray: "Hooray! You did it!",
    done: "Done",
    correct: "🎉 Correct! Well done!",
    wrong: "😊 Oops! That's not correct. Try again!",
    tryAgain: "Try Again",
    next: "Next Question",
    finish: "See My Score",
    finalScore: "Your Final Score",
    points: "points",
    playAgain: "Play Again",
    match: "Match Pairs",
    memory: "Memory Challenge",
    sounds: "Animal Sounds",
    count: "Count the Objects",
    colour: "Find the Colour",
    counting: "Counting Fun",
    shapes: "Shape Finder",
    animals: "Animal Quiz",
    maths: "Maths Sprint",
    patterns: "Number Patterns",
    science: "Science Quiz"
  },

  kn: {
    title: "ಮೋಜಿನ ಆಟಗಳು",
    allGames: "ಎಲ್ಲಾ ಆಟಗಳು",
    back: "ಸಾಹಸಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    more: "ಇನ್ನಷ್ಟು ಆಟಗಳು",
    choose: "ಒಂದು ಆಟವನ್ನು ಆರಿಸಿ",
    score: "ಅಂಕಗಳು",
    moves: "ಚಲನೆಗಳು",
    pairs: "ಒಂದೇ ರೀತಿಯ ಜೋಡಿಗಳನ್ನು ಹುಡುಕಿ",
    completed: "ಎಲ್ಲಾ ಜೋಡಿಗಳು ಸಿಕ್ಕಿವೆ!",
    hooray: "ಅದ್ಭುತ! ನೀವು ಸಾಧಿಸಿದ್ದೀರಿ!",
    done: "ಮುಗಿದಿದೆ",
    correct: "🎉 ಸರಿಯಾದ ಉತ್ತರ! ಚೆನ್ನಾಗಿದೆ!",
    wrong: "😊 ಅಯ್ಯೋ! ಉತ್ತರ ಸರಿಯಿಲ್ಲ. ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ!",
    tryAgain: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    next: "ಮುಂದಿನ ಪ್ರಶ್ನೆ",
    finish: "ನನ್ನ ಅಂಕಗಳನ್ನು ನೋಡಿ",
    finalScore: "ನಿಮ್ಮ ಅಂತಿಮ ಅಂಕಗಳು",
    points: "ಅಂಕಗಳು",
    playAgain: "ಮತ್ತೆ ಆಟವಾಡಿ",
    match: "ಜೋಡಿಗಳನ್ನು ಹೊಂದಿಸಿ",
    memory: "ನೆನಪಿನ ಸವಾಲು",
    sounds: "ಪ್ರಾಣಿಗಳ ಶಬ್ದಗಳು",
    count: "ವಸ್ತುಗಳನ್ನು ಎಣಿಸಿ",
    colour: "ಬಣ್ಣವನ್ನು ಹುಡುಕಿ",
    counting: "ಎಣಿಕೆಯ ಆಟ",
    shapes: "ಆಕಾರಗಳನ್ನು ಹುಡುಕಿ",
    animals: "ಪ್ರಾಣಿಗಳ ರಸಪ್ರಶ್ನೆ",
    maths: "ಗಣಿತದ ಆಟ",
    patterns: "ಸಂಖ್ಯೆಗಳ ಮಾದರಿಗಳು",
    science: "ವಿಜ್ಞಾನ ರಸಪ್ರಶ್ನೆ"
  },

  hi: {
    title: "मज़ेदार खेल",
    allGames: "सभी खेल",
    back: "वापस जाएँ",
    more: "और खेल",
    choose: "एक खेल चुनो",
    score: "स्कोर",
    moves: "चालें",
    pairs: "एक जैसे जोड़े ढूँढो",
    completed: "सभी जोड़े मिल गए!",
    hooray: "शाबाश! तुमने कर दिखाया!",
    done: "पूरा हुआ",
    correct: "🎉 सही जवाब! बहुत बढ़िया!",
    wrong: "😊 ओह! यह सही जवाब नहीं है। फिर कोशिश करो!",
    tryAgain: "फिर कोशिश करो",
    next: "अगला सवाल",
    finish: "मेरा स्कोर देखो",
    finalScore: "तुम्हारा अंतिम स्कोर",
    points: "अंक",
    playAgain: "फिर से खेलो",
    match: "जोड़े मिलाओ",
    memory: "याददाश्त की चुनौती",
    sounds: "जानवरों की आवाज़ें",
    count: "वस्तुएँ गिनो",
    colour: "रंग पहचानो",
    counting: "गिनती का खेल",
    shapes: "आकार पहचानो",
    animals: "जानवरों की प्रश्नोत्तरी",
    maths: "गणित की दौड़",
    patterns: "संख्या के पैटर्न",
    science: "विज्ञान प्रश्नोत्तरी"
  }
};

const FACES = ["🐘", "🦁", "🦚", "🐯", "🐒", "🦜", "🐢", "🐟"];

// ==================================================
// QUESTION HELPER
// ==================================================

const makeQuestion = (prompt, options, correct, explanation = "") => [
  prompt,
  options,
  correct,
  explanation
];

// ==================================================
// QUESTION GENERATORS
// ==================================================

const GEN = {

  // Animal sounds: each animal is used exactly once
  // as the correct answer during a five-question round.
  sounds: (lang) => {
    const animals = [
      {
        emoji: "🐶",
        sound: { en: "Woof", kn: "ಬೌ ಬೌ", hi: "भौं भौं" },
        name: { en: "Dog", kn: "ನಾಯಿ", hi: "कुत्ता" }
      },
      {
        emoji: "🐱",
        sound: { en: "Meow", kn: "ಮಿಯಾಂವ್", hi: "म्याऊँ" },
        name: { en: "Cat", kn: "ಬೆಕ್ಕು", hi: "बिल्ली" }
      },
      {
        emoji: "🐮",
        sound: { en: "Moo", kn: "ಅಂಬಾ", hi: "माँ" },
        name: { en: "Cow", kn: "ಹಸು", hi: "गाय" }
      },
      {
        emoji: "🐑",
        sound: { en: "Baa", kn: "ಮೇ ಮೇ", hi: "में में" },
        name: { en: "Sheep", kn: "ಕುರಿ", hi: "भेड़" }
      },
      {
        emoji: "🦁",
        sound: { en: "Roar", kn: "ಘರ್ಜನೆ", hi: "दहाड़" },
        name: { en: "Lion", kn: "ಸಿಂಹ", hi: "शेर" }
      }
    ];

    const selectedAnimals = shuffle(animals);

    return selectedAnimals.map(answer => {
      const options = shuffle([
        answer,
        ...shuffle(animals.filter(animal => animal !== answer)).slice(0, 2)
      ]);

      return makeQuestion(
        {
          en: `Who says ${answer.sound.en}?`,
          kn: `${answer.sound.kn} ಎಂದು ಯಾವ ಪ್ರಾಣಿ ಕೂಗುತ್ತದೆ?`,
          hi: `${answer.sound.hi} कौन-सा जानवर करता है?`
        }[lang],
        options.map(animal => animal.emoji),
        options.findIndex(animal => animal === answer),
        {
          en: `Yes! This is a ${answer.name.en}.`,
          kn: `ಹೌದು! ಇದು ${answer.name.kn}.`,
          hi: `हाँ! यह ${answer.name.hi} है।`
        }[lang]
      );
    });
  },

  // Counting
  count: (lang) => Array.from({ length: 5 }, () => {
    const n = 2 + rnd(8);

    return makeQuestion(
      {
        en: `How many apples? ${"🍎".repeat(n)}`,
        kn: `ಎಷ್ಟು ಸೇಬುಗಳಿವೆ? ${"🍎".repeat(n)}`,
        hi: `कितने सेब हैं? ${"🍎".repeat(n)}`
      }[lang],
      [String(n), String(n + 1), String(n - 1)],
      0,
      {
        en: `There are ${n} apples.`,
        kn: `ಇಲ್ಲಿ ${n} ಸೇಬುಗಳಿವೆ.`,
        hi: `यहाँ ${n} सेब हैं।`
      }[lang]
    );
  }),

  // Colours
  colour: (lang) => {
    const colours = [
      { emoji: "🔴", name: { en: "Red", kn: "ಕೆಂಪು", hi: "लाल" } },
      { emoji: "🔵", name: { en: "Blue", kn: "ನೀಲಿ", hi: "नीला" } },
      { emoji: "🟡", name: { en: "Yellow", kn: "ಹಳದಿ", hi: "पीला" } },
      { emoji: "🟢", name: { en: "Green", kn: "ಹಸಿರು", hi: "हरा" } },
      { emoji: "🟠", name: { en: "Orange", kn: "ಕಿತ್ತಳೆ", hi: "नारंगी" } }
    ];

    return Array.from({ length: 5 }, () => {
      const selected = shuffle(colours).slice(0, 3);
      const answer = selected[0];

      return makeQuestion(
        {
          en: `Find ${answer.name.en}!`,
          kn: `${answer.name.kn} ಬಣ್ಣವನ್ನು ಹುಡುಕಿ!`,
          hi: `${answer.name.hi} रंग ढूँढो!`
        }[lang],
        selected.map(c => c.emoji),
        0
      );
    });
  },

  // Shapes
  shapes: (lang) => {
    const shapes = [
      { emoji: "⚫", name: { en: "Circle", kn: "ವೃತ್ತ", hi: "गोला" } },
      { emoji: "🟥", name: { en: "Square", kn: "ಚೌಕ", hi: "वर्ग" } },
      { emoji: "🔺", name: { en: "Triangle", kn: "ತ್ರಿಕೋನ", hi: "त्रिभुज" } },
      { emoji: "⭐", name: { en: "Star", kn: "ನಕ್ಷತ್ರ", hi: "तारा" } }
    ];

    return Array.from({ length: 5 }, () => {
      const selected = shuffle(shapes).slice(0, 3);
      const answer = selected[0];

      return makeQuestion(
        {
          en: `Find the ${answer.name.en}!`,
          kn: `${answer.name.kn}ವನ್ನು ಹುಡುಕಿ!`,
          hi: `${answer.name.hi} ढूँढो!`
        }[lang],
        selected.map(s => s.emoji),
        0
      );
    });
  },

  // Animal quiz
  animals: (lang) => {
    const data = [
      {
        q: {
          en: "Which animal gives us milk?",
          kn: "ನಮಗೆ ಹಾಲು ನೀಡುವ ಪ್ರಾಣಿ ಯಾವುದು?",
          hi: "हमें दूध कौन-सा जानवर देता है?"
        },
        a: [
          { en: "Cow", kn: "ಹಸು", hi: "गाय" },
          { en: "Lion", kn: "ಸಿಂಹ", hi: "शेर" },
          { en: "Tiger", kn: "ಹುಲಿ", hi: "बाघ" }
        ],
        correct: 0
      },
      {
        q: {
          en: "Which animal is known as the king of the jungle?",
          kn: "ಕಾಡಿನ ರಾಜ ಎಂದು ಯಾವ ಪ್ರಾಣಿಯನ್ನು ಕರೆಯುತ್ತಾರೆ?",
          hi: "जंगल का राजा किस जानवर को कहा जाता है?"
        },
        a: [
          { en: "Lion", kn: "ಸಿಂಹ", hi: "शेर" },
          { en: "Rabbit", kn: "ಮೊಲ", hi: "खरगोश" },
          { en: "Deer", kn: "ಜಿಂಕೆ", hi: "हिरण" }
        ],
        correct: 0
      },
      {
        q: {
          en: "Which bird can repeat human words?",
          kn: "ಮನುಷ್ಯರ ಮಾತುಗಳನ್ನು ಅನುಕರಿಸುವ ಪಕ್ಷಿ ಯಾವುದು?",
          hi: "कौन-सा पक्षी इंसानों की बातें दोहरा सकता है?"
        },
        a: [
          { en: "Parrot", kn: "ಗಿಳಿ", hi: "तोता" },
          { en: "Crow", kn: "ಕಾಗೆ", hi: "कौआ" },
          { en: "Pigeon", kn: "ಪಾರಿವಾಳ", hi: "कबूतर" }
        ],
        correct: 0
      },
      {
        q: {
          en: "Which animal has a long trunk?",
          kn: "ಉದ್ದವಾದ ಸೊಂಡಿಲನ್ನು ಹೊಂದಿರುವ ಪ್ರಾಣಿ ಯಾವುದು?",
          hi: "किस जानवर की लंबी सूँड़ होती है?"
        },
        a: [
          { en: "Elephant", kn: "ಆನೆ", hi: "हाथी" },
          { en: "Dog", kn: "ನಾಯಿ", hi: "कुत्ता" },
          { en: "Cat", kn: "ಬೆಕ್ಕು", hi: "बिल्ली" }
        ],
        correct: 0
      },
      {
        q: {
          en: "Which animal lives both on land and in water?",
          kn: "ನೆಲ ಮತ್ತು ನೀರಿನಲ್ಲಿ ಎರಡೂ ಕಡೆ ವಾಸಿಸುವ ಪ್ರಾಣಿ ಯಾವುದು?",
          hi: "कौन-सा जानवर जमीन और पानी दोनों में रहता है?"
        },
        a: [
          { en: "Frog", kn: "ಕಪ್ಪೆ", hi: "मेंढक" },
          { en: "Horse", kn: "ಕುದುರೆ", hi: "घोड़ा" },
          { en: "Camel", kn: "ಒಂಟೆ", hi: "ऊँट" }
        ],
        correct: 0
      }
    ];

    return shuffle(data).map(item => [
      item.q[lang],
      item.a.map(a => a[lang]),
      item.correct
    ]);
  },

  // Maths sprint
  maths: (lang) => Array.from({ length: 6 }, () => {
    const a = 2 + rnd(8);
    const b = 2 + rnd(8);
    const answer = a * b;

    return makeQuestion(
      `${a} × ${b} = ?`,
      [String(answer), String(answer + a), String(answer - b)],
      0,
      `${a} × ${b} = ${answer}`
    );
  }),

  // Number patterns
  pattern: (lang) => Array.from({ length: 5 }, () => {
    const start = 1 + rnd(9);
    const difference = 2 + rnd(7);
    const answer = start + 3 * difference;

    return makeQuestion(
      {
        en: `Find the next number: ${start}, ${start + difference}, ${start + 2 * difference}, ?`,
        kn: `ಮುಂದಿನ ಸಂಖ್ಯೆ ಯಾವುದು? ${start}, ${start + difference}, ${start + 2 * difference}, ?`,
        hi: `अगली संख्या बताओ: ${start}, ${start + difference}, ${start + 2 * difference}, ?`
      }[lang],
      [String(answer), String(answer + 1), String(answer - 1)],
      0,
      {
        en: `The numbers increase by ${difference}.`,
        kn: `ಪ್ರತಿ ಬಾರಿ ${difference} ರಷ್ಟು ಹೆಚ್ಚಾಗುತ್ತದೆ.`,
        hi: `हर बार ${difference} की वृद्धि होती है।`
      }[lang]
    );
  }),

  // Science quiz
  science: (lang) => {
    const data = [
      {
        q: {
          en: "Which planet do we live on?",
          kn: "ನಾವು ಯಾವ ಗ್ರಹದಲ್ಲಿ ವಾಸಿಸುತ್ತೇವೆ?",
          hi: "हम किस ग्रह पर रहते हैं?"
        },
        a: [
          { en: "Earth", kn: "ಭೂಮಿ", hi: "पृथ्वी" },
          { en: "Mars", kn: "ಮಂಗಳ", hi: "मंगल" },
          { en: "Jupiter", kn: "ಗುರು", hi: "बृहस्पति" }
        ]
      },
      {
        q: {
          en: "What do plants need to grow?",
          kn: "ಸಸ್ಯಗಳು ಬೆಳೆಯಲು ಏನು ಬೇಕು?",
          hi: "पौधों को बढ़ने के लिए क्या चाहिए?"
        },
        a: [
          { en: "Sunlight and water", kn: "ಸೂರ್ಯನ ಬೆಳಕು ಮತ್ತು ನೀರು", hi: "धूप और पानी" },
          { en: "Only toys", kn: "ಆಟಿಕೆಗಳು ಮಾತ್ರ", hi: "केवल खिलौने" },
          { en: "Only stones", kn: "ಕಲ್ಲುಗಳು ಮಾತ್ರ", hi: "केवल पत्थर" }
        ]
      },
      {
        q: {
          en: "Which organ helps us breathe?",
          kn: "ನಮಗೆ ಉಸಿರಾಡಲು ಸಹಾಯ ಮಾಡುವ ಅಂಗ ಯಾವುದು?",
          hi: "साँस लेने में कौन-सा अंग मदद करता है?"
        },
        a: [
          { en: "Lungs", kn: "ಶ್ವಾಸಕೋಶಗಳು", hi: "फेफड़े" },
          { en: "Stomach", kn: "ಹೊಟ್ಟೆ", hi: "पेट" },
          { en: "Hands", kn: "ಕೈಗಳು", hi: "हाथ" }
        ]
      },
      {
        q: {
          en: "What is the closest star to Earth?",
          kn: "ಭೂಮಿಗೆ ಅತ್ಯಂತ ಹತ್ತಿರದ ನಕ್ಷತ್ರ ಯಾವುದು?",
          hi: "पृथ्वी के सबसे पास कौन-सा तारा है?"
        },
        a: [
          { en: "Sun", kn: "ಸೂರ್ಯ", hi: "सूरज" },
          { en: "Sirius", kn: "ಸಿರಿಯಸ್", hi: "सीरियस" },
          { en: "Polaris", kn: "ಧ್ರುವ ನಕ್ಷತ್ರ", hi: "ध्रुव तारा" }
        ]
      },
      {
        q: {
          en: "What is water made of?",
          kn: "ನೀರು ಯಾವುದರಿಂದ ರಚನೆಯಾಗಿದೆ?",
          hi: "पानी किन तत्वों से बना है?"
        },
        a: [
          { en: "Hydrogen and oxygen", kn: "ಹೈಡ್ರೋಜನ್ ಮತ್ತು ಆಮ್ಲಜನಕ", hi: "हाइड्रोजन और ऑक्सीजन" },
          { en: "Iron and gold", kn: "ಕಬ್ಬಿಣ ಮತ್ತು ಚಿನ್ನ", hi: "लोहा और सोना" },
          { en: "Only oxygen", kn: "ಆಮ್ಲಜನಕ ಮಾತ್ರ", hi: "केवल ऑक्सीजन" }
        ]
      }
    ];

    return shuffle(data).map(item => [
      item.q[lang],
      item.a.map(a => a[lang]),
      0
    ]);
  }
};

// ==================================================
// AGE-WISE GAMES
// ==================================================

const GAME_IDS = {
  "1-3": [
    { e: "🃏", id: "memory", mem: 3 },
    { e: "🔊", id: "sounds", gen: "sounds" },
    { e: "🍎", id: "count", gen: "count" },
    { e: "🎨", id: "colour", gen: "colour" }
  ],

  "4-6": [
    { e: "🃏", id: "match", mem: 6 },
    { e: "🍎", id: "counting", gen: "count" },
    { e: "🔺", id: "shapes", gen: "shapes" },
    { e: "🐯", id: "animals", gen: "animals" }
  ],

  "7-10": [
    { e: "🧠", id: "memory", mem: 8 },
    { e: "✖️", id: "maths", gen: "maths" },
    { e: "🔁", id: "patterns", gen: "pattern" },
    { e: "🔬", id: "science", gen: "science" }
  ]
};

// ==================================================
// GAME QUIZ WITH SCORE AND POPUPS
// ==================================================

function GameQuiz({ qs, language, onExit }) {
  const labels = TEXT[language] || TEXT.en;

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [popup, setPopup] = useState("");
  const [finished, setFinished] = useState(false);

  const current = qs[index];

  const chooseAnswer = (optionIndex) => {
    if (selected !== null || popup) return;

    if (optionIndex === current[2]) {
      setSelected(optionIndex);
      setScore(s => s + 10);
      setPopup("correct");
      speak(labels.correct, { lang: language });
    } else {
      setPopup("wrong");
      speak(labels.wrong, { lang: language });
    }
  };

  const retry = () => {
    setPopup("");
  };

  const nextQuestion = () => {
    stopSpeech();
    setPopup("");
    setSelected(null);

    if (index + 1 < qs.length) {
      setIndex(i => i + 1);
    } else {
      setFinished(true);
      speak(labels.finalScore, { lang: language });
    }
  };

  const playAgain = () => {
    stopSpeech();
    setIndex(0);
    setScore(0);
    setSelected(null);
    setPopup("");
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="game-result kp-card kp-center">
        <div className="kp-big">🏆</div>

        <h2>{labels.finalScore}</h2>

        <div className="game-final-score">
          {score} / {qs.length * 10}
        </div>

        <p>{labels.points}</p>

        <button className="kp-btn" onClick={playAgain}>
          🔄 {labels.playAgain}
        </button>

        <button className="kp-btn alt" onClick={onExit}>
          {labels.more}
        </button>
      </div>
    );
  }

  return (
    <div className="game-quiz">

      <div className="game-score-bar">
        <strong>🏆 {labels.score}: {score}</strong>
        <strong>{index + 1} / {qs.length}</strong>
      </div>

      <div className="game-progress">
        <div
          style={{
            width: `${((index + 1) / qs.length) * 100}%`
          }}
        />
      </div>

      <div className="kp-card game-question">
        <h3>{current[0]}</h3>
      </div>

      <div className="game-options">
        {current[1].map((option, i) => (
          <button
            key={i}
            className={`game-option ${
              selected === i ? "game-option-correct" : ""
            }`}
            onClick={() => chooseAnswer(i)}
            disabled={selected !== null || popup === "wrong"}
          >
            {option}
          </button>
        ))}
      </div>

      {popup === "correct" && (
        <div className="game-feedback game-feedback-correct">
          <h3>{labels.correct}</h3>

          {current[3] && <p>{current[3]}</p>}

          <button className="kp-btn" onClick={nextQuestion}>
            {index === qs.length - 1
              ? labels.finish
              : labels.next}
          </button>
        </div>
      )}

      {popup === "wrong" && (
        <div className="game-popup-overlay">
          <div className="game-popup">
            <div className="kp-big">💛</div>

            <h3>{labels.wrong}</h3>

            <p>{labels.tryAgain}</p>

            <button className="kp-btn" onClick={retry}>
              {labels.tryAgain}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

// ==================================================
// MEMORY GAME WITH SCORE
// ==================================================

function Memory({ pairs, language, onExit }) {
  const labels = TEXT[language] || TEXT.en;

  const [cards, setCards] = useState(() =>
    shuffle([
      ...Array.from({ length: pairs }, (_, i) => i),
      ...Array.from({ length: pairs }, (_, i) => i)
    ]).map(k => ({ k, s: 0 }))
  );

  const [open, setOpen] = useState([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [locked, setLocked] = useState(false);

  const done = cards.every(c => c.s === 2);

  const flip = (i) => {
    if (locked || cards[i].s !== 0 || open.length >= 2) return;

    const nextCards = cards.map((c, j) =>
      j === i ? { ...c, s: 1 } : c
    );

    const nextOpen = [...open, i];

    setCards(nextCards);

    if (nextOpen.length === 1) {
      setOpen(nextOpen);
      return;
    }

    setMoves(m => m + 1);

    const [a, b] = nextOpen;

    if (nextCards[a].k === nextCards[b].k) {
      setCards(nextCards.map((c, j) =>
        j === a || j === b ? { ...c, s: 2 } : c
      ));

      setScore(s => s + 10);
      setOpen([]);
    } else {
      setOpen(nextOpen);
      setLocked(true);

      setTimeout(() => {
        setCards(prev => prev.map((c, j) =>
          j === a || j === b ? { ...c, s: 0 } : c
        ));

        setOpen([]);
        setLocked(false);
      }, 900);
    }
  };

  useEffect(() => {
    if (done) {
      speak(labels.hooray, { lang: language });
    }
  }, [done, language]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="kp-card kp-center">
        <div className="game-score-bar">
          <strong>🏆 {labels.score}: {score}</strong>
          <strong>{labels.moves}: {moves}</strong>
        </div>

        {done ? (
          <>
            <div className="kp-big">🎉</div>
            <h3>{labels.completed}</h3>
            <h2>{score} / {pairs * 10}</h2>

            <button className="kp-btn" onClick={onExit}>
              {labels.done}
            </button>
          </>
        ) : (
          <b>{labels.pairs}</b>
        )}
      </div>

      <div
        className="kp-mem"
        style={{
          gridTemplateColumns: `repeat(${pairs === 3 ? 3 : 4}, 1fr)`
        }}
      >
        {cards.map((c, i) => (
          <button
            key={i}
            className={c.s === 2 ? "done" : c.s ? "up" : ""}
            onClick={() => flip(i)}
            aria-label="Memory card"
            disabled={c.s === 2}
          >
            {c.s ? FACES[c.k] : "❓"}
          </button>
        ))}
      </div>
    </>
  );
}

// ==================================================
// MAIN GAMES PAGE
// ==================================================

export default function GamesPage({
  ageGroup = "4-6",
  language = "en",
  lang,
  onBack
}) {
  const selectedLanguage = lang || language || "en";
  const labels = TEXT[selectedLanguage] || TEXT.en;

  const list = GAME_IDS[ageGroup] || GAME_IDS["4-6"];

  const [game, setGame] = useState(null);
  const [qs, setQs] = useState(null);

  useEffect(() => {
    setGame(null);
    setQs(null);
    stopSpeech();
  }, [ageGroup, selectedLanguage]);

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  const exit = () => {
    stopSpeech();
    setGame(null);
    setQs(null);
  };

  const start = (g) => {
    stopSpeech();
    setGame(g);

    if (g.gen) {
      setQs(GEN[g.gen](selectedLanguage));
    } else {
      setQs(null);
    }
  };

  const handleBack = () => {
    if (game) {
      exit();
    } else {
      stopSpeech();
      onBack?.();
    }
  };

  return (
    <PageShell
      ageGroup={ageGroup}
      language={selectedLanguage}
      icon="🐼"
      title={labels.title}
      onBack={handleBack}
      backLabel={game ? labels.allGames : labels.back}
    >

      {!game && (
        <>
          <p className="kp-hint">{labels.choose}</p>

          <div className="kp-grid">
            {list.map((g, i) => (
              <button
                key={g.id}
                className="kp-tile"
                style={{
                  "--t": [
                    "#e4f2fc",
                    "#fdf0d0",
                    "#e1f3e8",
                    "#ede6fb"
                  ][i % 4]
                }}
                onClick={() => start(g)}
              >
                <span>{g.e}</span>
                {labels[g.id]}
              </button>
            ))}
          </div>
        </>
      )}

      {game?.mem && (
        <Memory
          key={`${ageGroup}-${game.id}`}
          pairs={game.mem}
          language={selectedLanguage}
          onExit={exit}
        />
      )}

      {game?.gen && qs && (
        <GameQuiz
          key={`${ageGroup}-${game.id}-${selectedLanguage}`}
          qs={qs}
          language={selectedLanguage}
          onExit={exit}
        />
      )}

    </PageShell>
  );
}
