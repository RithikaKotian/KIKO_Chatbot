
import { useState } from "react";
import "./App.css";

import StoryPage from "./pages/StoryPage";
import RhymesPage from "./pages/RhymesPage";
import LearningPages from "./pages/LearningPages";
import GKPage from "./pages/GKPage";
import PlayPage from "./pages/PlayPage";
import GamesPage from "./pages/GamesPage";
import ChatPage from "./pages/ChatPage";

const AGES = {
  en: [
    { id: "1-3", emoji: "🐣", label: "1–3 years", name: "Tiny Tots", tone: "#ffc93c" },
    { id: "4-6", emoji: "🌱", label: "4–6 years", name: "Little Learners", tone: "#3ccb9f" },
    { id: "7-10", emoji: "🚀", label: "7–10 years", name: "Young Explorers", tone: "#5aa9f6" },
  ],
  kn: [
    { id: "1-3", emoji: "🐣", label: "1–3 ವರ್ಷ", name: "ಪುಟ್ಟ ಮಕ್ಕಳು", tone: "#ffc93c" },
    { id: "4-6", emoji: "🌱", label: "4–6 ವರ್ಷ", name: "ಪುಟ್ಟ ಕಲಿಯುವವರು", tone: "#3ccb9f" },
    { id: "7-10", emoji: "🚀", label: "7–10 ವರ್ಷ", name: "ಯುವ ಅನ್ವೇಷಕರು", tone: "#5aa9f6" },
  ],
  hi: [
    { id: "1-3", emoji: "🐣", label: "1–3 वर्ष", name: "नन्हे बच्चे", tone: "#ffc93c" },
    { id: "4-6", emoji: "🌱", label: "4–6 वर्ष", name: "छोटे सीखने वाले", tone: "#3ccb9f" },
    { id: "7-10", emoji: "🚀", label: "7–10 वर्ष", name: "युवा खोजकर्ता", tone: "#5aa9f6" },
  ],
};

const TILES = {
  en: [
    "Story Time",
    "Rhymes & Songs",
    "Learn & Explore",
    "General Knowledge",
    "Play & Create",
    "Fun & Games",
    "Chat with KIKO",
  ],
  kn: [
    "ಕಥೆ ಸಮಯ",
    "ಪದ್ಯ ಮತ್ತು ಹಾಡುಗಳು",
    "ಕಲಿಯೋಣ",
    "ಸಾಮಾನ್ಯ ಜ್ಞಾನ",
    "ಆಟ ಮತ್ತು ರಚನೆ",
    "ಮೋಜಿನ ಆಟಗಳು",
    "KIKO ಜೊತೆ ಚಾಟ್",
  ],
  hi: [
    "कहानी का समय",
    "कविताएँ और गाने",
    "सीखें और जानें",
    "सामान्य ज्ञान",
    "खेलें और बनाएँ",
    "मज़ेदार खेल",
    "KIKO से बात करें",
  ],
};

const ACTIVITIES = [
  ["story", "📖"],
  ["rhymes", "🎵"],
  ["learn", "🌈"],
  ["gk", "🌍"],
  ["play", "🎨"],
  ["games", "🐼"],
  ["chat", "💬"],
];

const LANGS = [
  ["en", "English"],
  ["kn", "ಕನ್ನಡ"],
  ["hi", "हिन्दी"],
];

const HOME_TEXT = {
  en: {
    ageQuestion: "Who is playing today?",
    activityQuestion: "What would you like to explore today?",
    language: "Language",
    changeAge: "Change age",
  },
  kn: {
    ageQuestion: "ಯಾರು ಆಡುತ್ತಿದ್ದಾರೆ?",
    activityQuestion: "ಇಂದು ಏನನ್ನು ಅನ್ವೇಷಿಸೋಣ?",
    language: "ಭಾಷೆ",
    changeAge: "ವಯಸ್ಸನ್ನು ಬದಲಾಯಿಸಿ",
  },
  hi: {
    ageQuestion: "कौन खेल रहा है?",
    activityQuestion: "आज आप क्या सीखना चाहेंगे?",
    language: "भाषा",
    changeAge: "उम्र बदलें",
  },
};

export default function App() {
  const [age, setAge] = useState(null);
  const [screen, setScreen] = useState("home");
  const [lang, setLang] = useState("en");

  const home = () => setScreen("home");

  const currentAges = AGES[lang];
  const text = HOME_TEXT[lang];

  // Shared props: every activity receives the same selected language.
  const pageProps = {
    ageGroup: age,
    ageGroupId: age,
    language: lang,
    lang: lang,
    onBack: home,
  };

  if (age && screen === "chat") {
    return (
      <ChatPage
        age={age}
        lang={lang}
        language={lang}
        onBack={home}
        onNavigate={setScreen}
      />
    );
  }

  if (age && screen === "story") {
    return <StoryPage {...pageProps} />;
  }

  if (age && screen === "rhymes") {
    return <RhymesPage {...pageProps} />;
  }

  if (age && screen === "learn") {
    return <LearningPages {...pageProps} />;
  }

  if (age && screen === "gk") {
    return <GKPage {...pageProps} />;
  }

  if (age && screen === "play") {
    return <PlayPage {...pageProps} />;
  }

  if (age && screen === "games") {
    return <GamesPage {...pageProps} />;
  }

  return (
    <div className="app">
      <main className="app-sheet">

        <div className="app-top">
          <h1 className="app-logo">🐼 KIKO</h1>

          <div
            className="app-langs"
            role="group"
            aria-label={text.language}
          >
            {LANGS.map(([id, label]) => (
              <button
                key={id}
                className={`app-chip ${lang === id ? "on" : ""}`}
                onClick={() => setLang(id)}
              >
                {label}
              </button>
            ))}

            {age && (
              <button
                className="app-chip"
                onClick={() => {
                  setAge(null);
                  home();
                }}
              >
                🔄 {currentAges.find((a) => a.id === age)?.label}
              </button>
            )}
          </div>
        </div>

        {!age ? (
          <>
            <h2>{text.ageQuestion}</h2>

            <div className="age-picker">
              {currentAges.map((item) => (
                <button
                  key={item.id}
                  style={{ background: item.tone }}
                  onClick={() => setAge(item.id)}
                >
                  <span aria-hidden="true">
                    {item.emoji}
                  </span>

                  {item.label}

                  <small>{item.name}</small>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2>{text.activityQuestion}</h2>

            <div className="tiles">
              {ACTIVITIES.map(([id, emoji], index) => (
                <button
                  key={id}
                  className={`tile ${
                    id === "chat" ? "chat-home-tile" : ""
                  }`}
                  onClick={() => setScreen(id)}
                >
                  <span aria-hidden="true">
                    {emoji}
                  </span>

                  {TILES[lang][index]}
                </button>
              ))}
            </div>
          </>
        )}

      </main>
    </div>
  );
}
