
import { useState, useRef, useEffect } from "react";
import "./ChatPage.css";
import { speak, VOICE } from "../utils/speech";

const API_URL = "http://127.0.0.1:8000/api/chat";
const TRANSLATE_URL = "http://127.0.0.1:8000/api/translate-chat";

const LANGUAGES = [
  { id: "en", label: "English", voice: "en-IN" },
  { id: "kn", label: "ಕನ್ನಡ", voice: "kn-IN" },
  { id: "hi", label: "हिन्दी", voice: "hi-IN" },
];

const WELCOME = {
  en: "Hello! I'm KIKO. Ask me anything. We can learn, explore and have fun together!",
  kn: "ನಮಸ್ಕಾರ! ನಾನು KIKO. ಏನು ಬೇಕಾದರೂ ಕೇಳಿ. ನಾವು ಒಟ್ಟಿಗೆ ಕಲಿಯೋಣ!",
  hi: "नमस्ते! मैं KIKO हूँ। मुझसे कुछ भी पूछो। चलो साथ में सीखते हैं!",
};

const SUGGESTIONS = {
  en: [
    "Tell me about butterflies",
    "Why is the sky blue?",
    "What is the solar system?",
    "Teach me something new",
  ],

  kn: [
    "ಚಿಟ್ಟೆಗಳ ಬಗ್ಗೆ ಹೇಳು",
    "ಆಕಾಶ ನೀಲಿಯಾಗಿರುವುದೇಕೆ?",
    "ಸೌರಮಂಡಲದ ಬಗ್ಗೆ ಹೇಳು",
  ],

  hi: [
    "तितलियों के बारे में बताओ",
    "आसमान नीला क्यों है?",
    "सौरमंडल के बारे में बताओ",
  ],
};


// ==================================================
// CLEAN SPEECH TEXT
// ==================================================

function cleanSpeechText(text) {

  return String(text || "")

    .replace(/```[\s\S]*?```/g, " ")

    .replace(/`([^`]+)`/g, "$1")

    .replace(/\*\*(.*?)\*\*/g, "$1")

    .replace(/\*(.*?)\*/g, "$1")

    .replace(/__(.*?)__/g, "$1")

    .replace(/_(.*?)_/g, "$1")

    .replace(/^#{1,6}\s*/gm, "")

    .replace(/!\[.*?\]\(.*?\)/g, "")

    .replace(/\[([^\]]+)\]\(.*?\)/g, "$1")

    .replace(/^\s*[-*+]\s+/gm, "")

    .replace(/^\s*\d+[.)]\s+/gm, "")

    .replace(/\p{Extended_Pictographic}/gu, "")

    .replace(/[\uFE0E\uFE0F\u200D]/g, "")

    .replace(/[★☆•◆◇■□▪▫►▶✓✔]/g, "")

    .replace(/\s+/g, " ")

    .trim();
}


// ==================================================
// CHAT PAGE
// ==================================================

export default function ChatPage({
  age = "4-6",
  lang = "en",
  onBack,
  onNavigate,
}) {

  const [language, setLanguage] = useState(lang);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: WELCOME[lang] || WELCOME.en,
    },
  ]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [listening, setListening] = useState(false);

  const bottomRef = useRef(null);

  const inputRef = useRef(null);

  const recognitionRef = useRef(null);


  // ==================================================
  // AUTO SCROLL
  // ==================================================

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, loading]);


  // ==================================================
  // CLEAN UP WHEN LEAVING PAGE
  // ==================================================

  useEffect(() => {

    return () => {

      window.speechSynthesis?.cancel();

      recognitionRef.current?.abort();

    };

  }, []);


  // ==================================================
  // AUTOMATICALLY TRANSLATE ENTIRE CONVERSATION
  // ==================================================

  const changeLanguage = async (nextLanguage) => {

    if (loading || nextLanguage === language) return;

    // Stop old speech
    window.speechSynthesis?.cancel();

    // Stop microphone
    recognitionRef.current?.abort();

    recognitionRef.current = null;

    setListening(false);

    const previousLanguage = language;

    // Show loading state
    setLoading(true);

    try {

      const response = await fetch(
        TRANSLATE_URL,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            messages: messages.map(
              ({ role, content }) => ({
                role,
                content,
              })
            ),

            language: nextLanguage,

          }),
        }
      );

      if (!response.ok) {

        throw new Error(
          `Translation failed: ${response.status}`
        );

      }

      const data = await response.json();

      if (!Array.isArray(data.messages)) {

        throw new Error("Invalid translation response");

      }

      // Change selected language
      setLanguage(nextLanguage);

      // Keep every translated message
      setMessages(data.messages);

      setInput("");

      // Speak the latest translated KIKO response
      const latestReply = [...data.messages]
        .reverse()
        .find(
          (message) => message.role === "assistant"
        );

      if (latestReply) {

        const speechText = cleanSpeechText(
          latestReply.content
        );

        if (speechText) {

          speak(speechText, {
            lang: nextLanguage,
          });

        }

      } else {

        // If there is no previous KIKO reply,
        // speak the welcome message
        speak(
          cleanSpeechText(
            WELCOME[nextLanguage] || WELCOME.en
          ),
          { lang: nextLanguage }
        );

      }

    } catch (error) {

      console.error(
        "Conversation translation error:",
        error
      );

      // Keep original conversation and language
      setLanguage(previousLanguage);

      alert(
        "KIKO couldn't translate the conversation right now. Your original chat is still available."
      );

    } finally {

      setLoading(false);

    }

  };


  // ==================================================
  // SEND MESSAGE
  // ==================================================

  const sendMessage = async (rawMessage) => {

    const question = rawMessage.trim();

    if (!question || loading) return;

    window.speechSynthesis?.cancel();

    const previousMessages = messages.filter(
      (message) =>
        message.role === "user" ||
        message.role === "assistant"
    );

    const updatedMessages = [
      ...previousMessages,
      {
        role: "user",
        content: question,
      },
    ];

    setMessages(updatedMessages);

    setInput("");

    setLoading(true);

    try {

      const response = await fetch(
        API_URL,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            message: question,

            age_group: age,

            language,

            history: previousMessages.slice(-8),

          }),
        }
      );

      if (!response.ok) {

        throw new Error(
          `Server error: ${response.status}`
        );

      }

      const data = await response.json();

      if (!data.reply) {

        throw new Error(
          "KIKO did not return a reply."
        );

      }

      setMessages((current) => [

        ...current,

        {
          role: "assistant",
          content: data.reply,
          source: data.source,
        },

      ]);

      // Automatically speak clean response
      const speechText = cleanSpeechText(data.reply);

      if (speechText) {

        speak(speechText, {
          lang: language,
        });

      }

      console.log("KIKO AI source:", data.source);

      if (data.navigate && onNavigate) {

        onNavigate(data.navigate);

      }

    } catch (error) {

      console.error("Chat error:", error);

      const errorMessage =
        language === "kn"
          ? "ಕ್ಷಮಿಸಿ! ಈಗ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."
          : language === "hi"
          ? "माफ़ करना! अभी जुड़ नहीं पा रहा हूँ। फिर कोशिश करो।"
          : "Sorry! I can't connect right now. Please try again.";

      setMessages((current) => [

        ...current,

        {
          role: "assistant",
          content: errorMessage,
        },

      ]);

      speak(
        cleanSpeechText(errorMessage),
        { lang: language }
      );

    } finally {

      setLoading(false);

      inputRef.current?.focus();

    }

  };


  // ==================================================
  // MICROPHONE INPUT
  // ==================================================

  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert(
        "Voice input is not supported in this browser. Please use Chrome or type your message."
      );

      return;

    }

    recognitionRef.current?.abort();

    const recognition = new SpeechRecognition();

    recognitionRef.current = recognition;

    recognition.lang =
      VOICE[language] ||
      LANGUAGES.find(
        (item) => item.id === language
      )?.voice ||
      "en-IN";

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.onstart = () => {

      setListening(true);

    };

    recognition.onresult = (event) => {

      const transcript =
        event.results[0][0].transcript;

      setInput(transcript);

      sendMessage(transcript);

    };

    recognition.onerror = (event) => {

      console.error(
        "Speech recognition error:",
        event.error
      );

      setListening(false);

    };

    recognition.onend = () => {

      setListening(false);

      recognitionRef.current = null;

    };

    try {

      recognition.start();

    } catch (error) {

      console.error(error);

      setListening(false);

    }

  };


  // ==================================================
  // LISTEN TO A MESSAGE AGAIN
  // ==================================================

  const readMessage = (message) => {

    window.speechSynthesis?.cancel();

    const speechText = cleanSpeechText(message);

    if (speechText) {

      speak(speechText, {
        lang: language,
      });

    }

  };


  // ==================================================
  // NEW CHAT
  // ==================================================

  const clearChat = () => {

    if (loading) return;

    window.speechSynthesis?.cancel();

    recognitionRef.current?.abort();

    setListening(false);

    setInput("");

    setMessages([
      {
        role: "assistant",
        content: WELCOME[language] || WELCOME.en,
      },
    ]);

  };


  // ==================================================
  // USER INTERFACE
  // ==================================================

  return (

    <main className="kiko-chat-page">

      {/* HEADER */}

      <header className="chat-topbar">

        <button
          className="chat-back-button"
          onClick={onBack}
          type="button"
        >
          ← Home
        </button>

        <div className="chat-brand">

          <span>🐼</span>

          <div>
            <h1>KIKO</h1>
            <small>Your learning friend</small>
          </div>

        </div>

        <div className="chat-top-actions">

          <select
            value={language}
            onChange={(event) =>
              changeLanguage(event.target.value)
            }
            disabled={loading}
            aria-label="Choose chat language"
          >

            {LANGUAGES.map((item) => (

              <option
                key={item.id}
                value={item.id}
              >
                {item.label}
              </option>

            ))}

          </select>

          <span className="chat-age">
            {age} years
          </span>

          <button
            type="button"
            className="chat-clear"
            onClick={clearChat}
            disabled={loading}
          >
            New chat
          </button>

        </div>

      </header>


      {/* CHAT AREA */}

      <div className="chat-layout">

        <section className="chat-main">

          <div className="chat-heading">

            <div>
              <h2>Chat with KIKO 💜</h2>

              <p>
                Ask questions, learn new things and have fun!
              </p>
            </div>

            <span className="chat-online">
              ● Ready to chat
            </span>

          </div>


          {/* MESSAGES */}

          <div
            className="chat-messages"
            aria-live="polite"
          >

            {messages.map((message, index) => (

              <div
                key={index}
                className={`chat-message ${
                  message.role === "user"
                    ? "user-message"
                    : "kiko-message"
                }`}
              >

                {message.role === "assistant" && (

                  <div className="chat-avatar">
                    🐼
                  </div>

                )}

                <div className="chat-message-content">

                  <div className="chat-message-name">

                    {message.role === "user"
                      ? "You"
                      : "KIKO"}

                  </div>

                  <div className="chat-message-bubble">
                    {message.content}
                  </div>

                  {message.role === "assistant" && (

                    <button
                      type="button"
                      className="chat-listen"
                      onClick={() =>
                        readMessage(message.content)
                      }
                    >
                      🔊 Listen
                    </button>

                  )}

                </div>

                {message.role === "user" && (

                  <div className="chat-user-avatar">
                    😊
                  </div>

                )}

              </div>

            ))}


            {loading && (

              <div className="chat-message kiko-message">

                <div className="chat-avatar">
                  🐼
                </div>

                <div className="chat-message-content">

                  <div className="chat-message-name">
                    KIKO
                  </div>

                  <div className="chat-message-bubble typing">
                    {language === "kn"
                      ? "ಯೋಚಿಸುತ್ತಿದ್ದೇನೆ..."
                      : language === "hi"
                      ? "सोच रहा हूँ..."
                      : "Thinking of an answer..."}
                  </div>

                </div>

              </div>

            )}

            <div ref={bottomRef} />

          </div>


          {/* SUGGESTIONS */}

          {messages.length <= 1 && (

            <div className="chat-suggestions">

              <p>
                {language === "kn"
                  ? "ಇದನ್ನು ಕೇಳಿ:"
                  : language === "hi"
                  ? "मुझसे यह पूछो:"
                  : "Try asking me:"}
              </p>

              <div>

                {(SUGGESTIONS[language] ||
                  SUGGESTIONS.en
                ).map((suggestion) => (

                  <button
                    key={suggestion}
                    type="button"
                    onClick={() =>
                      sendMessage(suggestion)
                    }
                    disabled={loading}
                  >
                    {suggestion}
                  </button>

                ))}

              </div>

            </div>

          )}


          {/* MESSAGE INPUT */}

          <form
            className="chat-input-area"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(input);
            }}
          >

            <button
              type="button"
              className={`chat-mic ${
                listening ? "listening" : ""
              }`}
              onClick={startListening}
              disabled={loading}
              aria-label="Speak to KIKO"
              title="Speak to KIKO"
            >
              🎤
            </button>

            <input
              ref={inputRef}
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              placeholder={
                language === "kn"
                  ? "KIKO ಗೆ ಏನಾದರೂ ಕೇಳಿ..."
                  : language === "hi"
                  ? "KIKO से कुछ पूछें..."
                  : "Ask KIKO anything..."
              }
              disabled={loading}
              aria-label="Your message"
            />

            <button
              type="submit"
              className="chat-send"
              disabled={loading || !input.trim()}
            >
              {loading ? "..." : "➤ Send"}
            </button>

          </form>


          <p className="chat-footer-note">
            KIKO is your friendly learning companion.
            Ask questions and explore safely! 🐼
          </p>

        </section>

      </div>

    </main>

  );

}
