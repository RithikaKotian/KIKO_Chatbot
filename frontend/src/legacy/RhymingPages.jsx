import { useCallback, useEffect, useRef, useState } from "react";
import "./RhymingPages.css";

/* ---------- Rhyme data (all public domain) ----------
   Note format: letter + beats, e.g. "C1" = note C for 1 beat, "G2" = 2 beats,
   "D.5" = half a beat. Capital letters = middle octave, lowercase = octave above. */
const FREQ = { C: 261.63, D: 293.66, E: 329.63, F: 349.23, G: 392, A: 440, B: 493.88, c: 523.25, d: 587.33, e: 659.25 };

const TW = "C1 C1 G1 G1 A1 A1 G2";
const TX = "F1 F1 E1 E1 D1 D1 C2";
const TY = "G1 G1 F1 F1 E1 E1 D2";
const TRAD = "Traditional · Public domain";

export const RHYMES = {
  "1-3": [
    { id: "twinkle", title: "Twinkle, Twinkle, Little Star", emoji: "⭐", beat: 0.6,
      source: "Words: Jane Taylor (1806) · Tune: French folk melody · Public domain",
      lines: [["Twinkle, twinkle, little star,", TW], ["How I wonder what you are!", TX], ["Up above the world so high,", TY], ["Like a diamond in the sky.", TY], ["Twinkle, twinkle, little star,", TW], ["How I wonder what you are!", TX]] },
    { id: "baa", title: "Baa, Baa, Black Sheep", emoji: "🐑", beat: 0.6, source: TRAD,
      lines: [["Baa, baa, black sheep,", TW], ["Have you any wool?", TX], ["Yes sir, yes sir,", TY], ["Three bags full!", TY], ["One for the master,", TW], ["One for the dame.", TX]] },
  ],
  "4-6": [
    { id: "macdonald", title: "Old MacDonald Had a Farm", emoji: "🚜", beat: 0.5, source: TRAD,
      lines: [["Old MacDonald had a farm,", TW], ["E-I-E-I-O!", "E1 E1 D1 D1 C2"], ["And on his farm he had a cow,", "G1 C1 C1 C1 G1 A1 A1 G2"], ["E-I-E-I-O!", "E1 E1 D1 D1 C2"]] },
    { id: "mary", title: "Mary Had a Little Lamb", emoji: "🐏", beat: 0.5,
      source: "Words: Sarah Josepha Hale (1830) · Public domain",
      lines: [["Mary had a little lamb,", "E1 D1 C1 D1 E1 E1 E2"], ["Little lamb, little lamb,", "D1 D1 D2 E1 G1 G2"], ["Mary had a little lamb,", "E1 D1 C1 D1 E1 E1 E2"], ["Its fleece was white as snow.", "D1 D1 E1 D1 C4"]] },
  ],
  "7-10": [
    { id: "row", title: "Row, Row, Row Your Boat", emoji: "🚣", beat: 0.4,
      source: TRAD + " · Try singing it as a round with friends!",
      lines: [["Row, row, row your boat,", "C1 C1 C1.5 D.5 E2"], ["Gently down the stream,", "E1.5 D.5 E1.5 F.5 G2"], ["Merrily, merrily, merrily, merrily,", "c1 c1 c1 G1 G1 G1 E1 E1 E1 C1 C1 C1"], ["Life is but a dream.", "G1.5 F.5 E1.5 D.5 C3"]] },
    { id: "jingle", title: "Jingle Bells (chorus)", emoji: "🔔", beat: 0.4,
      source: "James Lord Pierpont (1857) · Public domain",
      lines: [["Jingle bells, jingle bells,", "E1 E1 E2 E1 E1 E2"], ["Jingle all the way!", "E1 G1 C1.5 D.5 E4"]] },
  ],
};

/* ---------- Soft xylophone/flute-like synth ---------- */
function playNote(ac, freq, time, dur) {
  const o1 = ac.createOscillator();
  const o2 = ac.createOscillator();
  const gain = ac.createGain();
  o1.type = "triangle";
  o1.frequency.value = freq;
  o2.type = "sine";
  o2.frequency.value = freq * 2;
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.3, time + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, time + dur * 0.95);
  o1.connect(gain);
  o2.connect(gain);
  gain.connect(ac.destination);
  [o1, o2].forEach((o) => { o.start(time); o.stop(time + dur); });
}

/* ---------- Component ----------
   Props:
   - ageGroup: "1-3" | "4-6" | "7-10"
   - onBack: called when the child taps Back on the rhyme list (go to Home) */
export default function RhymingPages({ ageGroup = "4-6", onBack }) {
  const rhymes = RHYMES[ageGroup] ?? RHYMES["4-6"];
  const [current, setCurrent] = useState(null);
  const [activeLine, setActiveLine] = useState(-1);
  const [status, setStatus] = useState("idle"); // idle | playing | paused
  const acRef = useRef(null);
  const rafRef = useRef(0);

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    if (acRef.current) {
      acRef.current.close().catch(() => {});
      acRef.current = null;
    }
    setActiveLine(-1);
    setStatus("idle");
  }, []);

  // Stop audio when leaving the page or switching age group
  useEffect(() => () => stop(), [stop]);
  useEffect(() => { stop(); setCurrent(null); }, [ageGroup, stop]);

  const play = (rhyme) => {
    stop();
    setCurrent(rhyme);
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ac = new Ctx();
    acRef.current = ac;

    let t = ac.currentTime + 0.15;
    const t0 = t;
    const starts = [];
    rhyme.lines.forEach(([, notes]) => {
      starts.push(t);
      notes.split(" ").forEach((tok) => {
        const m = tok.match(/^([A-Ga-g])([\d.]*)$/);
        if (!m) return;
        const dur = (parseFloat(m[2]) || 1) * rhyme.beat;
        playNote(ac, FREQ[m[1]], t, dur);
        t += dur;
      });
    });

    // gentle drone (tanpura-like) under the melody
    const drone = ac.createOscillator();
    const dg = ac.createGain();
    drone.frequency.value = 130.8;
    dg.gain.value = 0.04;
    drone.connect(dg);
    dg.connect(ac.destination);
    drone.start(t0);
    drone.stop(t);

    const end = t;
    setStatus("playing");
    const tick = () => {
      if (!acRef.current) return;
      const now = acRef.current.currentTime;
      let idx = -1;
      starts.forEach((s, i) => { if (now >= s) idx = i; });
      setActiveLine(idx);
      if (now > end) { stop(); return; }
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();
  };

  const togglePause = () => {
    const ac = acRef.current;
    if (!ac) return;
    if (status === "playing") { ac.suspend(); setStatus("paused"); }
    else if (status === "paused") { ac.resume(); setStatus("playing"); }
  };

  const goBack = () => {
    if (current) { stop(); setCurrent(null); }
    else onBack?.();
  };

  return (
    <section className={`rp rp--${ageGroup}`} aria-label="Rhymes and songs">
      <button className="rp-btn rp-btn--yellow rp-back" onClick={goBack} aria-label="Back">
        ⬅️ {current ? "🎵" : "🏠"}
      </button>
      <h2 className="rp-title">🎵 Rhymes &amp; Songs</h2>

      {!current && (
        <div className="rp-list">
          {rhymes.map((r) => (
            <button key={r.id} className="rp-card" onClick={() => play(r)}>
              <span className="rp-emoji" aria-hidden="true">{r.emoji}</span>
              <span className="rp-card-text">
                <strong>{r.title}</strong>
                <small>{r.source}</small>
              </span>
              <span className="rp-play" aria-hidden="true">▶</span>
            </button>
          ))}
        </div>
      )}

      {current && (
        <div className="rp-player">
          <div className="rp-now">
            <span className="rp-emoji rp-emoji--big" aria-hidden="true">{current.emoji}</span>
            <div>
              <strong>{current.title}</strong>
              <small>{current.source}</small>
            </div>
          </div>

          <div className="rp-controls">
            <button className="rp-btn rp-btn--blue" onClick={() => play(current)}>▶ Replay</button>
            <button className="rp-btn rp-btn--yellow" onClick={togglePause} disabled={status === "idle"}>
              {status === "paused" ? "▶ Resume" : "⏸ Pause"}
            </button>
            <button className="rp-btn rp-btn--coral" onClick={stop} disabled={status === "idle"}>⏹ Stop</button>
          </div>

          <div className="rp-lyrics" aria-live="polite">
            {current.lines.map(([text], i) => (
              <p key={i} className={`rp-line${i === activeLine ? " is-active" : ""}`}>{text}</p>
            ))}
          </div>

          <p className="rp-note">
            Demo sound: the familiar tune on a soft xylophone-flute with a gentle drone.
            Replace with licensed flute, veena and tabla recordings when available.
          </p>
        </div>
      )}
    </section>
  );
}
