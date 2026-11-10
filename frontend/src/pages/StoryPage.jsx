
import { useEffect, useRef, useState } from "react";
import PageShell from "../components/PageShell";
import Quiz from "../components/Quiz";
import { ST } from "../data/stories";
import { VOICE } from "../utils/speech";
import "./StoryPage.css";

const LABELS = {
  en: {
    choose: "Choose a story!",
    open: "📖 Read this story",
    ready: "🎧 Ready to listen?",
    telling: "🔊 KIKO is telling the story...",
    paused: "⏸ Story paused",
    finished: "🌟 The story is complete!",
    play: "▶ Play story",
    replay: "🔁 Replay",
    pause: "⏸ Pause",
    resume: "▶ Resume",
    readAlong: "Listen and read along",
    question: "❓ Answer a question",
    complete: "🎉 Well done! You finished the story.",
    back: "All stories",
    home: "Back to Adventure",
    language: "Story language",
    audioError: "Audio narration is not supported in this browser.",
    moralTitle: "🌟 Moral of the Story"
  },

  kn: {
    choose: "ಒಂದು ಕಥೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ!",
    open: "📖 ಕಥೆಯನ್ನು ಓದಿ",
    ready: "🎧 ಕಥೆ ಕೇಳಲು ಸಿದ್ಧರಾಗಿ!",
    telling: "🔊 ಕಿಕೋ ಕಥೆ ಹೇಳುತ್ತಿದೆ...",
    paused: "⏸ ಕಥೆ ವಿರಾಮದಲ್ಲಿದೆ",
    finished: "🌟 ಕಥೆ ಮುಗಿದಿದೆ!",
    play: "▶ ಕಥೆ ಕೇಳಿ",
    replay: "🔁 ಮತ್ತೆ ಕೇಳಿ",
    pause: "⏸ ವಿರಾಮ",
    resume: "▶ ಮುಂದುವರಿಸಿ",
    readAlong: "ಕೇಳಿ ಮತ್ತು ಓದಿ",
    question: "❓ ಪ್ರಶ್ನೆಗೆ ಉತ್ತರಿಸಿ",
    complete: "🎉 ಅದ್ಭುತ! ನೀವು ಕಥೆ ಮುಗಿಸಿದ್ದೀರಿ.",
    back: "ಎಲ್ಲಾ ಕಥೆಗಳು",
    home: "ಹಿಂದಕ್ಕೆ",
    language: "ಕಥೆಯ ಭಾಷೆ",
    audioError: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಲಭ್ಯವಿಲ್ಲ.",
    moralTitle: "🌟 ಕಥೆಯ ನೀತಿ"
  },

  hi: {
    choose: "एक कहानी चुनें!",
    open: "📖 कहानी पढ़ें",
    ready: "🎧 कहानी सुनने के लिए तैयार हैं?",
    telling: "🔊 किको कहानी सुना रहा है...",
    paused: "⏸ कहानी रुकी हुई है",
    finished: "🌟 कहानी पूरी हो गई!",
    play: "▶ कहानी सुनें",
    replay: "🔁 फिर से सुनें",
    pause: "⏸ रोकें",
    resume: "▶ जारी रखें",
    readAlong: "सुनें और साथ में पढ़ें",
    question: "❓ सवाल का जवाब दें",
    complete: "🎉 शाबाश! आपने कहानी पूरी कर ली।",
    back: "सभी कहानियाँ",
    home: "वापस जाएँ",
    language: "कहानी की भाषा",
    audioError: "इस ब्राउज़र में ऑडियो उपलब्ध नहीं है।",
    moralTitle: "🌟 कहानी की सीख"
  }
};

// Supports both old string data and translated objects.
function getText(value, language) {
  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object") {
    return value[language] || value.en || "";
  }

  return "";
}

// Prepare the quiz in the selected language.
function getQuiz(story, language) {
  if (!story?.q) return null;

  const question = story.q;

  return [
    getText(question[0], language),

    question[1].map((option) =>
      getText(option, language)
    ),

    question[2],

    question[3]
      ? getText(question[3], language)
      : ""
  ];
}

export default function StoryPage({
  ageGroup = "4-6",
  language = "en",
  onBack
}) {
  const ageIndex = {
    "1-3": 0,
    "4-6": 1,
    "7-10": 2
  };

  const stories =
    ST[ageIndex[ageGroup] ?? 1] ?? ST[1];

  const [selectedLanguage, setSelectedLanguage] =
    useState(language);

  const [selectedStory, setSelectedStory] =
    useState(null);

  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const utteranceRef = useRef(null);

  const story =
    selectedStory === null
      ? null
      : stories[selectedStory];

  const labels =
    LABELS[selectedLanguage] || LABELS.en;

  // Get all story content in the selected language.
  const displayStory = story
    ? {
        ...story,

        t: getText(
          story.t,
          selectedLanguage
        ),

        fullText: getText(
          story.fullText,
          selectedLanguage
        ),

        m: getText(
          story.m,
          selectedLanguage
        ),

        q: getQuiz(
          story,
          selectedLanguage
        )
      }
    : null;

  // Stop current narration.
  const stopNarration = () => {
    window.speechSynthesis?.cancel();

    utteranceRef.current = null;

    setPlaying(false);
    setPaused(false);
  };

  // Change story language.
  const changeLanguage = (nextLanguage) => {
    stopNarration();

    setSelectedLanguage(nextLanguage);

    setFinished(false);
    setShowQuiz(false);
  };

  // Open a selected story.
  const openStory = (index) => {
    stopNarration();

    setSelectedStory(index);

    setFinished(false);
    setShowQuiz(false);
  };

  // Start or replay narration.
  const startNarration = () => {
    if (!displayStory?.fullText) return;

    if (!("speechSynthesis" in window)) {
      alert(labels.audioError);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        displayStory.fullText
      );

    utterance.lang =
      VOICE[selectedLanguage] || "en-IN";

    utterance.rate =
      ageGroup === "1-3"
        ? 0.78
        : ageGroup === "4-6"
          ? 0.88
          : 0.95;

    utterance.pitch = 1.12;

    utterance.onstart = () => {
      setPlaying(true);
      setPaused(false);
      setFinished(false);
    };

    utterance.onend = () => {
      utteranceRef.current = null;

      setPlaying(false);
      setPaused(false);
      setFinished(true);
    };

    utterance.onerror = () => {
      utteranceRef.current = null;

      setPlaying(false);
      setPaused(false);
    };

    utteranceRef.current = utterance;

    window.speechSynthesis.speak(utterance);
  };

  // Pause narration.
  const pauseNarration = () => {
    if (!window.speechSynthesis.speaking) return;

    window.speechSynthesis.pause();

    setPaused(true);
  };

  // Resume narration.
  const resumeNarration = () => {
    window.speechSynthesis.resume();

    setPaused(false);
  };

  // Back navigation.
  const back = () => {
    stopNarration();

    if (showQuiz) {
      setShowQuiz(false);
      return;
    }

    if (story) {
      setSelectedStory(null);
      setFinished(false);
      return;
    }

    onBack?.();
  };

  // Synchronize with Home screen language and age.
  useEffect(() => {
    stopNarration();

    setSelectedLanguage(language);
    setSelectedStory(null);
    setFinished(false);
    setShowQuiz(false);
  }, [language, ageGroup]);

  // Stop narration when leaving the page.
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  return (
    <PageShell
      ageGroup={ageGroup}
      language={selectedLanguage}
      icon="📖"
      title="Story Time"
      onBack={back}
      backLabel={story ? labels.back : labels.home}
    >

      {/* LANGUAGE SELECTOR */}

      <div className="story-language-selector">
        <label htmlFor="story-language">
          {labels.language}
        </label>

        <select
          id="story-language"
          value={selectedLanguage}
          onChange={(event) =>
            changeLanguage(event.target.value)
          }
        >
          <option value="en">English</option>
          <option value="kn">ಕನ್ನಡ</option>
          <option value="hi">हिन्दी</option>
        </select>
      </div>

      {/* STORY LIST */}

      {!story && (
        <div className="story-list">

          <h2>{labels.choose}</h2>

          {stories.map((item, index) => (
            <div
              className="kp-card story-list-card"
              key={`${index}-${getText(item.t, "en")}`}
            >

              <div className="story-list-illustration">
                {item.illustration}
              </div>

              <div className="story-list-info">

                <b>
                  {getText(
                    item.t,
                    selectedLanguage
                  )}
                </b>

                <button
                  className="kp-btn"
                  onClick={() => openStory(index)}
                >
                  {labels.open}
                </button>

              </div>
            </div>
          ))}

        </div>
      )}

      {/* SELECTED STORY */}

      {story && !showQuiz && (
        <div className="kp-card audio-story-card">

          <h2>{displayStory.t}</h2>

          {/* STORY ILLUSTRATION */}

          <div className="audio-story-illustration">
            <span>{story.illustration}</span>
          </div>

          {/* NARRATION STATUS */}

          <div className="audio-story-status">

            {playing && !paused && labels.telling}

            {paused && labels.paused}

            {finished && labels.finished}

            {!playing && !paused && !finished &&
              labels.ready}

          </div>

          {/* AUDIO CONTROLS */}

          <div className="audio-story-controls">

            {!playing && !paused && (
              <button
                className="kp-btn"
                onClick={startNarration}
              >
                {labels.play}
              </button>
            )}

            {playing && !paused && (
              <button
                className="kp-btn"
                onClick={pauseNarration}
              >
                {labels.pause}
              </button>
            )}

            {paused && (
              <button
                className="kp-btn"
                onClick={resumeNarration}
              >
                {labels.resume}
              </button>
            )}

            <button
              className="kp-btn alt"
              onClick={startNarration}
            >
              {labels.replay}
            </button>

          </div>

          {/* COMPLETE STORY TEXT */}

          <div className="audio-story-text">

            <h3>{labels.readAlong}</h3>

            <p>{displayStory.fullText}</p>

          </div>

          {/* MORAL OF THE STORY */}

          {finished && displayStory.m && (
            <div className="story-moral">

              <h3>{labels.moralTitle}</h3>

              <p>{displayStory.m}</p>

            </div>
          )}

          {/* QUIZ BUTTON */}

          {finished && displayStory.q && (
            <button
              className="kp-btn"
              onClick={() => setShowQuiz(true)}
            >
              {labels.question}
            </button>
          )}

          {/* STORY COMPLETION */}

          {finished && !displayStory.q && (
            <p className="story-finished-message">
              {labels.complete}
            </p>
          )}

        </div>
      )}

      {/* QUIZ */}

      {story && showQuiz && displayStory.q && (
        <Quiz
          qs={[displayStory.q]}
          tiny={ageGroup === "1-3"}
          language={selectedLanguage}
          onExit={() => setShowQuiz(false)}
          exitLabel={labels.back}
        />
      )}

    </PageShell>
  );
}
