
import "../styles/kiko.css";

const PAGE_TRANSLATIONS = {
  en: {
    "Story Time": "Story Time",
    "Rhymes & Songs": "Rhymes & Songs",
    "Learn & Explore": "Learn & Explore",
    "General Knowledge": "General Knowledge",
    "Play & Create": "Play & Create",
    "Fun & Games": "Fun & Games",
    "Chat with KIKO": "Chat with KIKO",
    "Back to Adventure": "Back to Adventure",
    "All stories": "All stories",
    "Done": "Done",
  },

  kn: {
    "Story Time": "ಕಥೆ ಸಮಯ",
    "Rhymes & Songs": "ಪದ್ಯ ಮತ್ತು ಹಾಡುಗಳು",
    "Learn & Explore": "ಕಲಿಯೋಣ ಮತ್ತು ಅನ್ವೇಷಿಸೋಣ",
    "General Knowledge": "ಸಾಮಾನ್ಯ ಜ್ಞಾನ",
    "Play & Create": "ಆಟ ಮತ್ತು ರಚನೆ",
    "Fun & Games": "ಮೋಜಿನ ಆಟಗಳು",
    "Chat with KIKO": "KIKO ಜೊತೆ ಚಾಟ್",
    "Back to Adventure": "ಹಿಂದಕ್ಕೆ ಹೋಗಿ",
    "All stories": "ಎಲ್ಲಾ ಕಥೆಗಳು",
    "Done": "ಮುಗಿದಿದೆ",
  },

  hi: {
    "Story Time": "कहानी का समय",
    "Rhymes & Songs": "कविताएँ और गाने",
    "Learn & Explore": "सीखें और जानें",
    "General Knowledge": "सामान्य ज्ञान",
    "Play & Create": "खेलें और बनाएँ",
    "Fun & Games": "मज़ेदार खेल",
    "Chat with KIKO": "KIKO से बात करें",
    "Back to Adventure": "वापस जाएँ",
    "All stories": "सभी कहानियाँ",
    "Done": "पूरा हुआ",
  },
};

export default function PageShell({
  ageGroup,
  language = "en",
  lang,
  title,
  icon,
  onBack,
  backLabel = "Back to Adventure",
  children,
}) {
  const selectedLanguage = lang || language || "en";
  const translations =
    PAGE_TRANSLATIONS[selectedLanguage] || PAGE_TRANSLATIONS.en;

  const translatedTitle = translations[title] || title;
  const translatedBack = translations[backLabel] || backLabel;

  return (
    <div className={`kp kp--${ageGroup}`}>
      <button className="kp-back" onClick={onBack}>
        ← {translatedBack}
      </button>

      <main className="kp-sheet">
        <h1 className="kp-title">
          {icon} {translatedTitle}
        </h1>

        {children}
      </main>
    </div>
  );
}
