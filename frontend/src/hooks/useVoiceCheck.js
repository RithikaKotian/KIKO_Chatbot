import { useEffect, useState } from "react";

/* Tells the page which speech languages this device can actually speak.
   has("kn-IN") -> true only if a Kannada voice is installed. */
export function useVoiceCheck() {
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;
  const [langs, setLangs] = useState([]);

  useEffect(() => {
    if (!supported) return undefined;
    const synth = window.speechSynthesis;
    const read = () => setLangs(synth.getVoices().map((v) => v.lang.toLowerCase().replace("_", "-")));
    read();
    synth.addEventListener?.("voiceschanged", read); // voices load late in many browsers
    return () => synth.removeEventListener?.("voiceschanged", read);
  }, [supported]);

  return {
    supported,
    ready: langs.length > 0,
    has: (code) => langs.some((l) => l.startsWith(code.toLowerCase().split("-")[0])),
  };
}
