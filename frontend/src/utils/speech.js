
export const VOICE = {
  en: "en-IN",
  kn: "kn-IN",
  hi: "hi-IN",
};

export const AGE_INDEX = {
  "1-3": 0,
  "4-6": 1,
  "7-10": 2,
};

export const rnd = (n) =>
  Math.floor(Math.random() * n);

export const shuffle = (array) =>
  [...array].sort(() => Math.random() - 0.5);

export function speak(
  text,
  { lang = "en", slow = false } = {}
) {
  try {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = VOICE[lang] || "en-IN";
    utterance.rate = slow ? 0.78 : 0.92;
    utterance.pitch = 1.15;

    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.error("Speech error:", error);
  }
}

export const stopSpeech = () => {
  try {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  } catch (error) {
    console.error("Unable to stop speech:", error);
  }
};
