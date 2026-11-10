
import { useEffect, useState } from "react";
import "./RhymesPage.css";

import { getSongsFor, getSongById } from "../data/rhymes";
import { getTune } from "../data/tunes";
import { useTunePlayer } from "../hooks/useTunePlayer";
import { useVoiceCheck } from "../hooks/useVoiceCheck";

const API = "http://127.0.0.1:8000/api/translate-chat";

const LANGS = [
  { id: "en", label: "English", voice: "en-IN" },
  { id: "hi", label: "हिन्दी", voice: "hi-IN" },
  { id: "kn", label: "ಕನ್ನಡ", voice: "kn-IN" },
];

const TEXT = {
  en: {
    heading: "Sing, Listen and Learn",
    description: "Familiar tunes with gentle instruments, picked for your age.",
    age: "Age group",
    language: "Lyrics language",
    choose: "Choose a rhyme",
    chooseDescription: "Tap a rhyme to hear its familiar tune.",
    empty: "No rhymes for this age yet. More are coming soon!",
    open: "Open →",
    back: "← Back",
    backRhymes: "← Back to Rhymes",
    sing: "Sing Along",
    learn: "Learn the Words",
    music: "Music Only",
    lyrics: "Lyrics",
    play: "▶ Play",
    replay: "↺ Replay",
    pause: "⏸ Pause",
    resume: "▶ Resume",
    stop: "⏹ Stop",
    slow: "Slow",
    normal: "Normal",
    fast: "Fast",
    speed: "Speed",
    repeat: "Repeat",
    voiceMissing: (language) =>
      `This device does not have a ${language} voice installed. Install the ${language} voice in your device's text-to-speech settings.`,
    fallback: (language) =>
      `Lyrics are being translated into ${language}.`,
    loading: "Preparing your rhyme...",
    error: "Could not translate this rhyme. Please try again.",
    retry: "Retry",
    note: "Sing Along plays the tune with the words lighting up. Learn the Words reads each line slowly. Music Only plays just the tune.",
    recorded: "Recorded instruments can be added later.",
  },

  kn: {
    heading: "ಹಾಡಿ, ಕೇಳಿ ಮತ್ತು ಕಲಿಯಿರಿ",
    description: "ನಿಮ್ಮ ವಯಸ್ಸಿಗೆ ತಕ್ಕ ಮಧುರ ಸಂಗೀತ ಮತ್ತು ಹಾಡುಗಳು.",
    age: "ವಯಸ್ಸಿನ ಗುಂಪು",
    language: "ಹಾಡಿನ ಭಾಷೆ",
    choose: "ಒಂದು ಹಾಡನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    chooseDescription: "ಹಾಡನ್ನು ಕೇಳಲು ಅದರ ಮೇಲೆ ಒತ್ತಿರಿ.",
    empty: "ಈ ವಯಸ್ಸಿಗೆ ಇನ್ನೂ ಹಾಡುಗಳಿಲ್ಲ. ಹೊಸ ಹಾಡುಗಳು ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತವೆ!",
    open: "ತೆರೆಯಿರಿ →",
    back: "← ಹಿಂದಕ್ಕೆ",
    backRhymes: "← ಹಾಡುಗಳಿಗೆ ಹಿಂದಿರುಗಿ",
    sing: "ಜೊತೆಯಲ್ಲಿ ಹಾಡಿ",
    learn: "ಪದಗಳನ್ನು ಕಲಿಯಿರಿ",
    music: "ಸಂಗೀತ ಮಾತ್ರ",
    lyrics: "ಹಾಡಿನ ಸಾಹಿತ್ಯ",
    play: "▶ ಪ್ಲೇ",
    replay: "↺ ಮತ್ತೆ ಕೇಳಿ",
    pause: "⏸ ವಿರಾಮ",
    resume: "▶ ಮುಂದುವರಿಸಿ",
    stop: "⏹ ನಿಲ್ಲಿಸಿ",
    slow: "ನಿಧಾನ",
    normal: "ಸಾಮಾನ್ಯ",
    fast: "ವೇಗ",
    speed: "ವೇಗ",
    repeat: "ಮತ್ತೆ ಮತ್ತೆ ಕೇಳಿ",
    voiceMissing: (language) =>
      `ಈ ಸಾಧನದಲ್ಲಿ ${language} ಧ್ವನಿ ಲಭ್ಯವಿಲ್ಲ. ಸಾಧನದ ಪಠ್ಯದಿಂದ ಧ್ವನಿ ಸೆಟ್ಟಿಂಗ್‌ಗಳಲ್ಲಿ ಈ ಭಾಷೆಯ ಧ್ವನಿಯನ್ನು ಸ್ಥಾಪಿಸಿ.`,
    fallback: (language) =>
      `ಹಾಡನ್ನು ${language} ಭಾಷೆಗೆ ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ.`,
    loading: "ನಿಮ್ಮ ಹಾಡನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...",
    error: "ಹಾಡನ್ನು ಅನುವಾದಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    retry: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    note: "ಜೊತೆಯಲ್ಲಿ ಹಾಡಿ ಆಯ್ಕೆಯಲ್ಲಿ ಸಂಗೀತದೊಂದಿಗೆ ಪದಗಳು ತೋರಿಸುತ್ತವೆ. ಪದಗಳನ್ನು ಕಲಿಯಿರಿ ಆಯ್ಕೆಯಲ್ಲಿ ಪ್ರತಿಯೊಂದು ಸಾಲನ್ನೂ ನಿಧಾನವಾಗಿ ಓದಲಾಗುತ್ತದೆ. ಸಂಗೀತ ಮಾತ್ರ ಆಯ್ಕೆಯಲ್ಲಿ ಸಂಗೀತವನ್ನು ಮಾತ್ರ ಕೇಳಬಹುದು.",
    recorded: "ಮುಂದೆ ಧ್ವನಿಮುದ್ರಿತ ವಾದ್ಯ ಸಂಗೀತವನ್ನು ಸೇರಿಸಬಹುದು.",
  },

  hi: {
    heading: "गाएँ, सुनें और सीखें",
    description: "आपकी उम्र के अनुसार चुनी गई मधुर धुनें और गाने।",
    age: "आयु समूह",
    language: "गीत की भाषा",
    choose: "एक कविता चुनें",
    chooseDescription: "धुन सुनने के लिए कविता पर टैप करें।",
    empty: "इस आयु के लिए अभी कोई कविता नहीं है। नई कविताएँ जल्द आएँगी!",
    open: "खोलें →",
    back: "← वापस",
    backRhymes: "← कविताओं पर वापस जाएँ",
    sing: "साथ में गाएँ",
    learn: "शब्द सीखें",
    music: "केवल संगीत",
    lyrics: "गीत के बोल",
    play: "▶ चलाएँ",
    replay: "↺ फिर से चलाएँ",
    pause: "⏸ रोकें",
    resume: "▶ जारी रखें",
    stop: "⏹ बंद करें",
    slow: "धीमा",
    normal: "सामान्य",
    fast: "तेज़",
    speed: "गति",
    repeat: "दोहराएँ",
    voiceMissing: (language) =>
      `इस डिवाइस में ${language} की आवाज़ इंस्टॉल नहीं है। टेक्स्ट-टू-स्पीच सेटिंग में इस भाषा की आवाज़ इंस्टॉल करें।`,
    fallback: (language) =>
      `गीत का ${language} में अनुवाद किया जा रहा है।`,
    loading: "आपका गीत तैयार हो रहा है...",
    error: "गीत का अनुवाद नहीं हो पाया। कृपया फिर कोशिश करें।",
    retry: "फिर कोशिश करें",
    note: "साथ में गाएँ विकल्प में धुन के साथ शब्द दिखते हैं। शब्द सीखें विकल्प में हर पंक्ति धीरे पढ़ी जाती है। केवल संगीत विकल्प में सिर्फ धुन बजती है।",
    recorded: "रिकॉर्ड किए गए वाद्य संगीत बाद में जोड़े जा सकते हैं।",
  },
};

const AGE_LABELS = {
  en: { "1-3": "1–3 years", "4-6": "4–6 years", "7-10": "7–10 years" },
  kn: { "1-3": "1–3 ವರ್ಷ", "4-6": "4–6 ವರ್ಷ", "7-10": "7–10 ವರ್ಷ" },
  hi: { "1-3": "1–3 वर्ष", "4-6": "4–6 वर्ष", "7-10": "7–10 वर्ष" },
};

const SPEEDS = [
  { v: 0.75, key: "slow" },
  { v: 1, key: "normal" },
  { v: 1.25, key: "fast" },
];

const MODES = [
  { id: "sing", icon: "🎤", key: "sing" },
  { id: "learn", icon: "📖", key: "learn" },
  { id: "music", icon: "🎵", key: "music" },
];

const pick = (value, language) => {
  if (value && typeof value === "object") {
    return value[language] || value.en || "";
  }
  return value || "";
};

async function translateTexts(texts, language) {
  if (language === "en" || texts.length === 0) {
    return texts;
  }

  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language,
      messages: texts.map((content) => ({
        role: "assistant",
        content,
      })),
    }),
  });

  if (!response.ok) {
    throw new Error("Translation request failed");
  }

  const data = await response.json();

  if (
    !Array.isArray(data.messages) ||
    data.messages.length !== texts.length
  ) {
    throw new Error("Invalid translation response");
  }

  return data.messages.map((message) => message.content);
}

function getMissingTranslations(song, language) {
  const fields = [];
  const keys = [];

  const addField = (key, value) => {
    if (typeof value === "string" && value.trim()) {
      keys.push(key);
      fields.push(value);
    }
  };

  addField("title", pick(song.title, "en"));
  addField("category", pick(song.category, "en"));
  addField("source", pick(song.source, "en"));

  const englishLines = song.lyrics?.en || [];

  englishLines.forEach((line, index) => {
    addField(`line_${index}`, line);
  });

  return { keys, fields };
}

export default function RhymesPage({
  ageGroupId = "4-6",
  ageGroup,
  language = "en",
  lang,
  onBack,
}) {
  // The language selected on the Home page is the source of truth.
  const selectedLanguage = lang || language || "en";

  const t = TEXT[selectedLanguage] || TEXT.en;
  const langObj =
    LANGS.find((item) => item.id === selectedLanguage) || LANGS[0];

  const [songId, setSongId] = useState(null);
  const [mode, setMode] = useState("sing");
  const [speed, setSpeed] = useState(1);
  const [repeat, setRepeat] = useState(false);

  const [translatedSong, setTranslatedSong] = useState(null);
  const [translationLoading, setTranslationLoading] = useState(false);
  const [translationError, setTranslationError] = useState(false);
  const [translatedTitles, setTranslatedTitles] = useState({});

  const player = useTunePlayer();
  const voices = useVoiceCheck();

  const actualAge = ageGroupId || ageGroup || "4-6";
  const songs = getSongsFor(actualAge);
  const song = songId ? getSongById(songId) : null;

  const ageLabel =
    AGE_LABELS[selectedLanguage]?.[actualAge] || actualAge;

  // Translate song titles in the library when a language is missing.
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (selectedLanguage === "en") {
        setTranslatedTitles({});
        return;
      }

      const missing = songs.filter(
        (item) =>
          !pick(item.title, selectedLanguage) ||
          pick(item.title, selectedLanguage) === pick(item.title, "en")
      );

      if (missing.length === 0) {
        setTranslatedTitles({});
        return;
      }

      try {
        const translated = await translateTexts(
          missing.map((item) => pick(item.title, "en")),
          selectedLanguage
        );

        if (!cancelled) {
          const result = {};
          missing.forEach((item, index) => {
            result[item.id] = translated[index];
          });
          setTranslatedTitles(result);
        }
      } catch (error) {
        console.error("Rhyme title translation error:", error);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [selectedLanguage, actualAge]); // eslint-disable-line

  // Prepare the selected song in the Home page language.
  useEffect(() => {
    let cancelled = false;

    const prepareSong = async () => {
      player.stop();
      setTranslatedSong(null);
      setTranslationError(false);

      if (!song) {
        setTranslationLoading(false);
        return;
      }

      const existingLyrics = song.lyrics?.[selectedLanguage];

      const hasLyrics =
        Array.isArray(existingLyrics) && existingLyrics.length > 0;

      const hasLocalizedTitle =
        typeof song.title === "string" ||
        Boolean(song.title?.[selectedLanguage]);

      const hasLocalizedCategory =
        typeof song.category === "string" ||
        Boolean(song.category?.[selectedLanguage]);

      const hasLocalizedSource =
        typeof song.source === "string" ||
        Boolean(song.source?.[selectedLanguage]);

      const needsTranslation =
        selectedLanguage !== "en" &&
        (!hasLyrics ||
          !hasLocalizedTitle ||
          !hasLocalizedCategory ||
          !hasLocalizedSource);

      if (!needsTranslation) {
        setTranslatedSong({
          ...song,
          title: pick(song.title, selectedLanguage),
          category: pick(song.category, selectedLanguage),
          source: pick(song.source, selectedLanguage),
          lyrics: existingLyrics || song.lyrics?.en || [],
          translated: false,
        });
        setTranslationLoading(false);
        return;
      }

      setTranslationLoading(true);

      try {
        const { keys, fields } = getMissingTranslations(
          song,
          selectedLanguage
        );

        const translated = await translateTexts(
          fields,
          selectedLanguage
        );

        if (cancelled) return;

        const values = {};
        keys.forEach((key, index) => {
          values[key] = translated[index];
        });

        const originalLines =
          song.lyrics?.[selectedLanguage]?.length
            ? song.lyrics[selectedLanguage]
            : song.lyrics?.en || [];

        const lines = originalLines.map((line, index) => {
          if (song.lyrics?.[selectedLanguage]?.length) {
            return line;
          }
          return values[`line_${index}`] || line;
        });

        setTranslatedSong({
          ...song,
          title: pick(song.title, selectedLanguage) || values.title,
          category:
            pick(song.category, selectedLanguage) || values.category,
          source:
            pick(song.source, selectedLanguage) || values.source,
          lyrics: lines,
          translated: true,
        });
      } catch (error) {
        console.error("Rhyme translation error:", error);
        if (!cancelled) {
          setTranslationError(true);
        }
      } finally {
        if (!cancelled) {
          setTranslationLoading(false);
        }
      }
    };

    prepareSong();

    return () => {
      cancelled = true;
      player.stop();
    };
  }, [songId, selectedLanguage]); // eslint-disable-line

  const activeSong = translatedSong || song;

  const lines = translatedSong?.lyrics ||
    song?.lyrics?.[selectedLanguage] ||
    song?.lyrics?.en ||
    [];

  const rec = song?.audio?.[selectedLanguage];

  const usingFallback =
    selectedLanguage !== "en" &&
    !song?.lyrics?.[selectedLanguage]?.length;

  const useTuneFallback = () =>
    player.playTune({
      tune: getTune(song.tune),
      lineCount: lines.length,
      speed,
      loop: repeat,
    });

  const useVoiceFallback = () =>
    player.speakLines({
      lines,
      lang: langObj.voice,
      speed,
      loop: repeat,
    });

  const needsDeviceVoice = mode === "learn" && !rec?.read;

  const voiceMissing =
    needsDeviceVoice &&
    !voices.supported ||
    (
      needsDeviceVoice &&
      voices.ready &&
      !voices.has(langObj.voice)
    );

  const start = () => {
    if (!song || !lines.length) return;

    const base = {
      lineCount: lines.length,
      speed,
      loop: repeat,
    };

    if (mode === "learn") {
      if (rec?.read) {
        player.playAudio({
          ...base,
          src: rec.read,
          onError: useVoiceFallback,
        });
      } else {
        useVoiceFallback();
      }
    } else if (mode === "sing" && rec?.sung) {
      player.playAudio({
        ...base,
        src: rec.sung,
        onError: useTuneFallback,
      });
    } else {
      useTuneFallback();
    }
  };

  const changeMode = (nextMode) => {
    player.stop();
    setMode(nextMode);
  };

  const openSong = (id) => {
    player.stop();
    setSongId(id);
    setMode("sing");
  };

  const leaveSong = () => {
    player.stop();
    setSongId(null);
    setTranslatedSong(null);
  };

  const retryTranslation = () => {
    setTranslationError(false);
    setTranslatedSong(null);
    setSongId((current) => {
      const previous = current;
      setTimeout(() => setSongId(previous), 0);
      return null;
    });
  };

  const { status, activeLine } = player;

  return (
    <div className="rhymes-page">
      <header className="rhymes-header">
        <div>
          <p className="rhymes-tag">{t.heading.toUpperCase()}</p>
          <h1>{t.heading}</h1>
          <p>{t.description}</p>
        </div>

        <div className="rhymes-age">
          <span>{t.age}</span>
          <strong>{ageLabel}</strong>
        </div>
      </header>

      {!song && (
        <div className="rhyme-language-selector">
          <label htmlFor="rhyme-lang">{t.language}</label>
          <select
            id="rhyme-lang"
            value={selectedLanguage}
            disabled
            aria-label={t.language}
          >
            {LANGS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {!song && (
        <section className="rhymes-library">
          <h2>{t.choose}</h2>
          <p>{t.chooseDescription}</p>

          {songs.length === 0 && <p>{t.empty}</p>}

          <div className="rhymes-grid">
            {songs.map((item) => (
              <button
                key={item.id}
                className="rhyme-card"
                onClick={() => openSong(item.id)}
              >
                <span className="rhyme-symbol" aria-hidden="true">
                  {item.symbol}
                </span>

                <span className="rhyme-category">
                  {pick(item.category, selectedLanguage)}
                </span>

                <h3>
                  {pick(item.title, selectedLanguage) ||
                    translatedTitles[item.id] ||
                    pick(item.title, "en")}
                </h3>

                <span className="rhyme-open">{t.open}</span>
              </button>
            ))}
          </div>

          {onBack && (
            <button
              className="rhyme-back"
              style={{ marginTop: 24 }}
              onClick={onBack}
            >
              {t.back}
            </button>
          )}
        </section>
      )}

      {song && (
        <section className="rhyme-player">
          <button className="rhyme-back" onClick={leaveSong}>
            {t.backRhymes}
          </button>

          {translationLoading && (
            <div className="rhyme-player-card">
              <h2>{t.loading}</h2>
            </div>
          )}

          {translationError && (
            <div className="rhyme-player-card">
              <p>{t.error}</p>
              <button className="kp-btn" onClick={retryTranslation}>
                {t.retry}
              </button>
            </div>
          )}

          {activeSong && translatedSong && !translationLoading &&
            !translationError && (
            <div className="rhyme-player-card">
              <div className="rhyme-cover">
                <span aria-hidden="true">{song.symbol}</span>
                <p>{activeSong.category}</p>
                <h2>{activeSong.title}</h2>
                <small>{activeSong.source}</small>
              </div>

              <div className="rhyme-lyrics">
                <h3>{t.lyrics}</h3>

                <div
                  className={`karaoke-lyrics${
                    mode === "music" ? " karaoke-lyrics--dim" : ""
                  }`}
                  aria-live="polite"
                >
                  {lines.map((line, index) => (
                    <p
                      key={index}
                      className={`karaoke-line${
                        index === activeLine && mode !== "music"
                          ? " is-active"
                          : ""
                      }`}
                    >
                      {line}
                    </p>
                  ))}
                </div>

                {voiceMissing && (
                  <p className="rhyme-fallback">
                    {t.voiceMissing(langObj.label)}
                  </p>
                )}
              </div>

              <div className="rhyme-learning-modes">
                {MODES.map((item) => (
                  <button
                    key={item.id}
                    className={`learning-mode-button${
                      mode === item.id ? " active" : ""
                    }`}
                    onClick={() => changeMode(item.id)}
                  >
                    <span aria-hidden="true">{item.icon}</span>
                    {t[item.key]}
                  </button>
                ))}
              </div>

              <div className="rhyme-player-controls">
                <button onClick={start}>
                  {status === "idle" ? t.play : t.replay}
                </button>

                {status === "paused" ? (
                  <button onClick={player.resume}>
                    {t.resume}
                  </button>
                ) : (
                  <button
                    onClick={player.pause}
                    disabled={status !== "playing"}
                  >
                    {t.pause}
                  </button>
                )}

                <button
                  onClick={player.stop}
                  disabled={status === "idle"}
                >
                  {t.stop}
                </button>
              </div>

              <div className="rhyme-extra-controls">
                <label>
                  {t.speed}
                  <select
                    value={speed}
                    onChange={(event) => {
                      player.stop();
                      setSpeed(Number(event.target.value));
                    }}
                  >
                    {SPEEDS.map((item) => (
                      <option key={item.v} value={item.v}>
                        {t[item.key]}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="rhyme-repeat">
                  <input
                    type="checkbox"
                    checked={repeat}
                    onChange={(event) => setRepeat(event.target.checked)}
                  />
                  {t.repeat}
                </label>
              </div>

              <p className="rhyme-note">
                {t.note} {t.recorded}
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
