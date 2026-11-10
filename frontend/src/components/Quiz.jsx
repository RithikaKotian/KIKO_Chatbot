
import { useEffect, useMemo, useState } from "react";
import { shuffle, speak } from "../utils/speech";

const QUIZ_TEXT = {
  en: {
    great: "⭐ Great job! ⭐",
    score: (score, total) => `You scored ${score} / ${total}`,
    tryAgain: "Try again!",
    yes: "Yes!",
    niceTry: "Nice try!",
    next: "Next →",
    done: "Done",
  },

  kn: {
    great: "⭐ ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ! ⭐",
    score: (score, total) => `ನಿಮ್ಮ ಅಂಕಗಳು ${score} / ${total}`,
    tryAgain: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ!",
    yes: "ಹೌದು! ",
    niceTry: "ಒಳ್ಳೆಯ ಪ್ರಯತ್ನ! ",
    next: "ಮುಂದೆ →",
    done: "ಮುಗಿದಿದೆ",
  },

  hi: {
    great: "⭐ बहुत अच्छा! ⭐",
    score: (score, total) => `आपका स्कोर ${score} / ${total}`,
    tryAgain: "फिर से कोशिश करें!",
    yes: "हाँ! ",
    niceTry: "अच्छी कोशिश! ",
    next: "अगला →",
    done: "पूरा हुआ",
  },
};

export default function Quiz({
  qs,
  tiny = false,
  onExit,
  exitLabel,
  language = "en",
  lang,
}) {
  const selectedLanguage = lang || language || "en";

  const text =
    QUIZ_TEXT[selectedLanguage] || QUIZ_TEXT.en;

  const items = useMemo(
    () =>
      qs.map(([prompt, options, answer, explanation = ""]) => {
        const correctAnswer = options[answer];
        const shuffledOptions = shuffle(options);

        return {
          p: prompt,
          o: shuffledOptions,
          a: shuffledOptions.indexOf(correctAnswer),
          e: explanation,
        };
      }),
    [qs]
  );

  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);

  const q = items[i];

  useEffect(() => {
    if (q) {
      speak(q.p, {
        lang: selectedLanguage,
        slow: tiny,
      });
    }

    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [i, selectedLanguage]); // eslint-disable-line

  if (!q) {
    return (
      <div className="kp-card kp-center">
        <div className="kp-big">🎉</div>

        <h3>
          {tiny
            ? text.great
            : text.score(score, items.length)}
        </h3>

        <button className="kp-btn" onClick={onExit}>
          {exitLabel || text.done}
        </button>
      </div>
    );
  }

  const choose = (j) => {
    if (picked !== null) return;

    const right = j === q.a;

    if (!right && tiny) {
      speak(text.tryAgain, {
        lang: selectedLanguage,
        slow: true,
      });
      return;
    }

    setPicked(j);

    if (right) {
      setScore((previous) => previous + 1);
    }

    const feedback = right
      ? text.yes
      : text.niceTry;

    speak(feedback + q.e, {
      lang: selectedLanguage,
      slow: tiny,
    });
  };

  const feedback =
    picked === q.a ? text.yes : text.niceTry;

  return (
    <div className="kp-card">
      <p className="kp-q">{q.p}</p>

      <div className={`kp-opts${tiny ? " kp-opts--pic" : ""}`}>
        {q.o.map((option, j) => (
          <button
            key={j}
            className={[
              "kp-opt",
              picked !== null && j === q.a ? "is-right" : "",
              picked === j && j !== q.a ? "is-wrong" : "",
            ].filter(Boolean).join(" ")}
            onClick={() => choose(j)}
            disabled={picked !== null}
          >
            {option}
          </button>
        ))}
      </div>

      {picked !== null && (
        <div style={{ marginTop: 12 }}>
          <p style={{ margin: "0 0 8px", fontWeight: 700 }}>
            {feedback}
            {q.e}
          </p>

          <button
            className="kp-btn alt"
            onClick={() => {
              setPicked(null);
              setI((previous) => previous + 1);
            }}
          >
            {text.next}
          </button>
        </div>
      )}
    </div>
  );
}
