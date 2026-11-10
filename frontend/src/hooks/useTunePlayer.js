import { useCallback, useEffect, useRef, useState } from "react";
import { NOTE_HZ } from "../data/tunes";

function ping(ac, freq, time, dur) {
  const o1 = ac.createOscillator();
  const o2 = ac.createOscillator();
  const g = ac.createGain();
  o1.type = "triangle";
  o1.frequency.value = freq;
  o2.type = "sine";
  o2.frequency.value = freq * 2;
  g.gain.setValueAtTime(0, time);
  g.gain.linearRampToValueAtTime(0.3, time + 0.02);
  g.gain.exponentialRampToValueAtTime(0.001, time + dur * 0.95);
  o1.connect(g);
  o2.connect(g);
  g.connect(ac.destination);
  [o1, o2].forEach((o) => { o.start(time); o.stop(time + dur); });
}

/* Three ways to "play" a rhyme, one set of controls:
   - playAudio : a recorded mp3 (sung or read by a real person). Best quality, works on every device.
   - playTune  : the familiar melody generated from notes (works with no files at all).
   - speakLines: the device's text-to-speech voice (needs that language installed). */
export function useTunePlayer() {
  const [status, setStatus] = useState("idle"); // idle | playing | paused
  const [activeLine, setActiveLine] = useState(-1);
  const acRef = useRef(null);
  const audioRef = useRef(null);
  const rafRef = useRef(0);
  const runRef = useRef(0);
  const kindRef = useRef(null);

  const stop = useCallback(() => {
    runRef.current += 1;
    cancelAnimationFrame(rafRef.current);
    if (acRef.current) { acRef.current.close().catch(() => {}); acRef.current = null; }
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    try { window.speechSynthesis.cancel(); } catch { /* unsupported */ }
    kindRef.current = null;
    setActiveLine(-1);
    setStatus("idle");
  }, []);

  useEffect(() => stop, [stop]);

  /* recorded file. onError runs if the file is missing, so the page can fall back */
  const playAudio = useCallback(({ src, lineCount, speed = 1, loop = false, onError }) => {
    stop();
    const run = runRef.current + 1;
    runRef.current = run;
    const a = new Audio(src);
    a.playbackRate = speed;
    a.loop = loop;
    audioRef.current = a;
    kindRef.current = "audio";
    a.onplay = () => setStatus("playing");
    a.ontimeupdate = () => {
      if (runRef.current !== run || !a.duration) return;
      setActiveLine(Math.min(lineCount - 1, Math.floor((a.currentTime / a.duration) * lineCount)));
    };
    a.onended = () => { if (runRef.current === run) stop(); };
    a.onerror = () => { if (runRef.current === run) { stop(); onError?.(); } };
    a.play().catch(() => { if (runRef.current === run) { stop(); onError?.(); } });
  }, [stop]);

  const playTune = useCallback(({ tune, lineCount, speed = 1, loop = false }) => {
    stop();
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx || !tune) return;
    const run = runRef.current + 1;
    runRef.current = run;
    const ac = new Ctx();
    acRef.current = ac;
    kindRef.current = "tune";

    const beat = tune.beat / speed;
    const reps = Math.max(1, Math.round(lineCount / tune.lines.length)); // 3 verses = tune x3
    let t = ac.currentTime + 0.15;
    const t0 = t;
    for (let r = 0; r < reps; r += 1) {
      tune.lines.forEach((line) => line.split(" ").forEach((tok) => {
        const m = tok.match(/^([A-Ga-g])([\d.]*)$/);
        if (!m) return;
        const d = (parseFloat(m[2]) || 1) * beat;
        ping(ac, NOTE_HZ[m[1]], t, d);
        t += d;
      }));
    }
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
      if (runRef.current !== run || !acRef.current) return;
      const now = acRef.current.currentTime;
      if (now >= end) {
        if (loop) playTune({ tune, lineCount, speed, loop });
        else stop();
        return;
      }
      const p = (now - t0) / (end - t0);
      setActiveLine(now < t0 ? -1 : Math.min(lineCount - 1, Math.floor(p * lineCount)));
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();
  }, [stop]);

  const speakLines = useCallback(({ lines, lang, speed = 1, loop = false }) => {
    stop();
    if (!("speechSynthesis" in window) || !lines.length) return;
    const run = runRef.current + 1;
    runRef.current = run;
    kindRef.current = "speech";
    setStatus("playing");
    const next = (i) => {
      if (runRef.current !== run) return;
      if (i >= lines.length) { if (loop) next(0); else stop(); return; }
      setActiveLine(i);
      const u = new SpeechSynthesisUtterance(lines[i]);
      u.lang = lang;
      u.rate = 0.8 * speed;
      u.pitch = 1.15;
      u.onend = () => next(i + 1);
      u.onerror = () => next(i + 1);
      window.speechSynthesis.speak(u);
    };
    next(0);
  }, [stop]);

  const pause = useCallback(() => {
    const k = kindRef.current;
    if (k === "tune") acRef.current?.suspend();
    else if (k === "audio") audioRef.current?.pause();
    else if (k === "speech") window.speechSynthesis.pause();
    else return;
    setStatus("paused");
  }, []);

  const resume = useCallback(() => {
    const k = kindRef.current;
    if (k === "tune") acRef.current?.resume();
    else if (k === "audio") audioRef.current?.play();
    else if (k === "speech") window.speechSynthesis.resume();
    else return;
    setStatus("playing");
  }, []);

  return { status, activeLine, playAudio, playTune, speakLines, pause, resume, stop };
}
