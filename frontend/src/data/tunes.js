/* ==========================================
   KIKO TUNES
   One melody per familiar tune. Lyrics (any language) are matched to the tune
   by position, so Hindi and Kannada verses sing to the same melody.

   Note format: letter + beats. "C1" = C for 1 beat, "G2" = 2 beats, "D.5" = half a beat.
   Capital = middle octave, lowercase = octave above.
========================================== */
export const NOTE_HZ = { C: 261.63, D: 293.66, E: 329.63, F: 349.23, G: 392, A: 440, B: 493.88, c: 523.25, d: 587.33, e: 659.25 };

const TW = "C1 C1 G1 G1 A1 A1 G2";
const TX = "F1 F1 E1 E1 D1 D1 C2";
const TY = "G1 G1 F1 F1 E1 E1 D2";

export const TUNES = {
  twinkle: { beat: 0.6, lines: [TW, TX, TY, TY, TW, TX] },
  baa: { beat: 0.6, lines: [TW, TX, TY, TY, TW, TX] },
  macdonald: { beat: 0.5, lines: [TW, "E1 E1 D1 D1 C2", "G1 C1 C1 C1 G1 A1 A1 G2", "E1 E1 D1 D1 C2"] },
  mary: { beat: 0.5, lines: ["E1 D1 C1 D1 E1 E1 E2", "D1 D1 D2 E1 G1 G2", "E1 D1 C1 D1 E1 E1 E2", "D1 D1 E1 D1 C4"] },
  rowboat: { beat: 0.4, lines: ["C1 C1 C1.5 D.5 E2", "E1.5 D.5 E1.5 F.5 G2", "c1 c1 c1 G1 G1 G1 E1 E1 E1 C1 C1 C1", "G1.5 F.5 E1.5 D.5 C3"] },
  jingle: { beat: 0.4, lines: ["E1 E1 E2 E1 E1 E2", "E1 G1 C1.5 D.5 E4"] },
  londonbridge: { beat: 0.5, lines: ["G1.5 A.5 G1 F1 E1 F1 G1", "D1 E1 F2 E1 F1 G2", "G1.5 A.5 G1 F1 E1 F1 G1", "D2 G2 E1 C3"] },
};

export const getTune = (id) => TUNES[id];
