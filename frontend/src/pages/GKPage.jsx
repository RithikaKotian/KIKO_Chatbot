
import { useEffect, useState } from "react";
import PageShell from "../components/PageShell";
import Quiz from "../components/Quiz";
import { GK } from "../data/gk";
import { AGE_INDEX, stopSpeech } from "../utils/speech";

const TONES = [
  "#fdf0d0",
  "#e4f2fc",
  "#e1f3e8",
  "#ede6fb",
  "#fbe6e3",
  "#ffffff"
];

const TEXT = {
  en: {
    title: "General Knowledge",
    allTopics: "All topics",
    back: "Back to Adventure",
    more: "More topics"
  },
  kn: {
    title: "ಸಾಮಾನ್ಯ ಜ್ಞಾನ",
    allTopics: "ಎಲ್ಲಾ ವಿಷಯಗಳು",
    back: "ಸಾಹಸಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    more: "ಇನ್ನಷ್ಟು ವಿಷಯಗಳು"
  },
  hi: {
    title: "सामान्य ज्ञान",
    allTopics: "सभी विषय",
    back: "वापस जाएँ",
    more: "और विषय"
  }
};

export default function GKPage({
  ageGroup = "4-6",
  language = "en",
  lang,
  onBack
}) {
  const selectedLanguage = lang || language || "en";

  const cats = GK[AGE_INDEX[ageGroup]] ?? GK[1];

  const [cat, setCat] = useState(null);

  const labels = TEXT[selectedLanguage] || TEXT.en;

  useEffect(() => {
    setCat(null);
    stopSpeech();
  }, [ageGroup, selectedLanguage]);

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  const handleBack = () => {
    stopSpeech();

    if (cat) {
      setCat(null);
    } else {
      onBack?.();
    }
  };

  return (
    <PageShell
      ageGroup={ageGroup}
      language={selectedLanguage}
      icon="🌍"
      title={labels.title}
      onBack={handleBack}
      backLabel={cat ? labels.allTopics : labels.back}
    >
      {!cat ? (
        <div className="kp-grid">
          {cats.map((c, i) => (
            <button
              key={c.n.en}
              className="kp-tile"
              style={{ "--t": TONES[i % TONES.length] }}
              onClick={() => {
                stopSpeech();
                setCat(c);
              }}
            >
              <span>{c.e}</span>
              {c.n[selectedLanguage] || c.n.en}
            </button>
          ))}
        </div>
      ) : (
        <Quiz
          qs={cat.q.map((q) => {
            const [question, options, correct, explanation] = q;

            return [
              typeof question === "object"
                ? question[selectedLanguage] || question.en
                : question,

              options.map((option) =>
                typeof option === "object"
                  ? option[selectedLanguage] || option.en
                  : option
              ),

              correct,

              typeof explanation === "object"
                ? explanation[selectedLanguage] || explanation.en
                : explanation
            ];
          })}
          tiny={ageGroup === "1-3"}
          language={selectedLanguage}
          onExit={() => {
            stopSpeech();
            setCat(null);
          }}
          exitLabel={labels.more}
        />
      )}
    </PageShell>
  );
}
