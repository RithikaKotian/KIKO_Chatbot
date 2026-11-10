
import { useState } from "react";
import { speak, VOICE } from "../utils/speech";

const API_URL = "http://127.0.0.1:8000/api/chat";

const INTENTS = [
  [/stor|tale|ಕಥೆ|कहानी/i, "story"],
  [/rhym|song|sing|twinkle|ಹಾಡು|ಪದ್ಯ|गाना|गाने|कविता/i, "rhymes"],
  [/alphabet|abc|letter|number|count|learn|ಅಕ್ಷರ|ಕಲಿ|सीख|गिन/i, "learn"],
  [/\bgk\b|knowledge|quiz|ಜ್ಞಾನ|ज्ञान/i, "gk"],
  [/draw|colou?r|paint|ಚಿತ್ರ|चित्र/i, "play"],
  [/game|memory|play|ಆಟ|खेल/i, "games"],
];

const GO = {
  en: "Let’s go!",
  kn: "ಹೋಗೋಣ!",
  hi: "चलो!",
};

const OFFLINE = {
  en: "I can't reach my AI right now. Please try again, or choose one of the activities!",
  kn: "ಈಗ ನನ್ನ AI ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ!",
  hi: "अभी मैं अपने AI से जुड़ नहीं पा रहा हूँ। कृपया फिर कोशिश करें!",
};

const WELCOME = {
  en: "Hello there! I'm KIKO, and I'm happy to help you learn something new.",
  kn: "ನಮಸ್ಕಾರ! ನಾನು KIKO. ನಿಮ್ಮೊಂದಿಗೆ ಹೊಸ ವಿಷಯಗಳನ್ನು ಕಲಿಯಲು ನನಗೆ ಸಂತೋಷ!",
  hi: "नमस्ते! मैं KIKO हूँ। चलो मिलकर कुछ नया सीखते हैं!",
};

export default function AskKiko({
  age,
  lang = "en",
  onNavigate,
  greeting,
}) {
  const [text, setText] = useState("");
  const [bubble, setBubble] = useState(
    greeting || WELCOME[lang] || WELCOME.en
  );
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const say = (message) => {
    setBubble(message);

    try {
      speak(message, { lang });
    } catch (error) {
      console.error("Speech error:", error);
    }
  };

  const send = async (raw) => {
    const question = raw.trim();

    if (!question || loading) return;

    setText("");

    // Open KIKO activities directly for recognised commands.
    const matchedIntent = INTENTS.find(([pattern]) =>
      pattern.test(question)
    );

    if (matchedIntent) {
      say(GO[lang] || GO.en);

      if (onNavigate) {
        onNavigate(matchedIntent[1]);
      }

      return;
    }

    setLoading(true);
    setBubble("KIKO is thinking... 💭");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: question,
          age_group: age || "4-6",
          language: lang,
          history,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Backend error: ${response.status}`
        );
      }

      const data = await response.json();

      if (!data.reply) {
        throw new Error("No reply received from KIKO");
      }

      // Save the conversation for follow-up questions.
      setHistory((previous) =>
        [
          ...previous,
          {
            role: "user",
            content: question,
          },
          {
            role: "assistant",
            content: data.reply,
          },
        ].slice(-8)
      );

      say(data.reply);

      // Navigate when the backend returns an activity.
      if (data.navigate && onNavigate) {
        onNavigate(data.navigate);
      }

      console.log("KIKO AI source:", data.source);

    } catch (error) {
      console.error("KIKO chat error:", error);
      say(OFFLINE[lang] || OFFLINE.en);

    } finally {
      setLoading(false);
    }
  };

  const listen = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setBubble(
        "Voice input isn't supported in this browser. Please type your question."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = VOICE[lang] || "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript;

      setText(transcript);
      send(transcript);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);

      setListening(false);

      setBubble(
        "I couldn't hear that. Please try again or type your question."
      );
    };

    setListening(true);

    try {
      recognition.start();
    } catch (error) {
      console.error(error);
      setListening(false);
    }
  };

  return (
    <div className="ask">

      <div className="ask-hero">

        <span
          className="ask-panda"
          aria-hidden="true"
        >
          🐼
        </span>

        <div
          className="ask-bubble"
          aria-live="polite"
        >
          {bubble}
        </div>

      </div>

      <div className="ask-bar">

        <button
          type="button"
          className={`ask-mic${listening ? " on" : ""}`}
          onClick={listen}
          disabled={loading}
          aria-label="Talk to KIKO"
        >
          {listening ? "🔴" : "🎤"}
        </button>

        <input
          value={text}
          onChange={(event) =>
            setText(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              send(text);
            }
          }}
          placeholder="Say or type: story, rhyme, game..."
          aria-label="Ask KIKO"
          disabled={loading}
        />

        <button
          type="button"
          className="ask-go"
          onClick={() => send(text)}
          disabled={loading || !text.trim()}
        >
          {loading ? "..." : "Ask"}
        </button>

      </div>

    </div>
  );
}
