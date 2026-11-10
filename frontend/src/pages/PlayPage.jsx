
import { useEffect, useRef, useState } from "react";
import PageShell from "../components/PageShell";

const CFG = {
  "1-3": {
    c: ["#FF7A59", "#FFC93C", "#3CCB9F", "#5AA9F6", "#B58CFF"],
    s: [30],
    st: [],
    ideas: {
      en: ["Draw a happy sun ☀️", "Draw a colourful flower 🌸", "Draw a big balloon 🎈"],
      kn: ["ಸಂತೋಷದ ಸೂರ್ಯನನ್ನು ಬಿಡಿಸಿ ☀️", "ಬಣ್ಣದ ಹೂವನ್ನು ಬಿಡಿಸಿ 🌸", "ದೊಡ್ಡ ಬಲೂನನ್ನು ಬಿಡಿಸಿ 🎈"],
      hi: ["खुश सूरज बनाओ ☀️", "रंगीन फूल बनाओ 🌸", "बड़ा गुब्बारा बनाओ 🎈"]
    }
  },

  "4-6": {
    c: ["#26275A", "#FF7A59", "#FFC93C", "#3CCB9F", "#5AA9F6", "#B58CFF"],
    s: [8],
    st: ["🌳", "🏠", "☀️", "🐘", "🦋", "🌸", "🚗", "⭐"],
    ideas: {
      en: ["Draw your favourite animal", "Draw a beautiful garden", "Draw your dream house", "Draw a sunny day"],
      kn: ["ನಿಮ್ಮ ಇಷ್ಟದ ಪ್ರಾಣಿಯನ್ನು ಬಿಡಿಸಿ", "ಸುಂದರವಾದ ಉದ್ಯಾನವನವನ್ನು ಬಿಡಿಸಿ", "ನಿಮ್ಮ ಕನಸಿನ ಮನೆಯನ್ನು ಬಿಡಿಸಿ", "ಬಿಸಿಲಿನ ದಿನವನ್ನು ಬಿಡಿಸಿ"],
      hi: ["अपना पसंदीदा जानवर बनाओ", "सुंदर बगीचा बनाओ", "अपने सपनों का घर बनाओ", "धूप वाला दिन बनाओ"]
    }
  },

  "7-10": {
    c: ["#26275A", "#FF7A59", "#FFC93C", "#3CCB9F", "#5AA9F6", "#B58CFF", "#FF6FA5", "#8B5A2B"],
    s: [3, 8, 18],
    st: [],
    ideas: {
      en: [
        "Draw a village market",
        "Draw your dream school",
        "Draw a rainy day in Karnataka",
        "Draw an animal nobody has seen",
        "Draw your favourite festival"
      ],
      kn: [
        "ಹಳ್ಳಿಯ ಮಾರುಕಟ್ಟೆಯನ್ನು ಬಿಡಿಸಿ",
        "ನಿಮ್ಮ ಕನಸಿನ ಶಾಲೆಯನ್ನು ಬಿಡಿಸಿ",
        "ಕರ್ನಾಟಕದ ಮಳೆಯ ದಿನವನ್ನು ಬಿಡಿಸಿ",
        "ಯಾರೂ ನೋಡದ ಒಂದು ಪ್ರಾಣಿಯನ್ನು ಬಿಡಿಸಿ",
        "ನಿಮ್ಮ ಇಷ್ಟದ ಹಬ್ಬವನ್ನು ಬಿಡಿಸಿ"
      ],
      hi: [
        "गाँव का बाज़ार बनाओ",
        "अपने सपनों का स्कूल बनाओ",
        "कर्नाटक में बारिश का दिन बनाओ",
        "ऐसा जानवर बनाओ जिसे किसी ने नहीं देखा",
        "अपना पसंदीदा त्योहार बनाओ"
      ]
    }
  }
};

const TEXT = {
  en: {
    title: "Play & Create",
    idea: "Drawing idea",
    newIdea: "💡 New idea",
    brush: "🖌️ Brush",
    eraser: "🧽 Eraser",
    undo: "↩️ Undo",
    clear: "🗑️ Clear",
    save: "💾 Save drawing",
    size: "Brush size",
    colours: "Colours",
    stamps: "Stickers",
    shapes: "Shapes",
    canvas: "Your drawing space",
    circle: "Circle",
    square: "Square",
    triangle: "Triangle",
    rectangle: "Rectangle",
    star: "Star",
    heart: "Heart"
  },

  kn: {
    title: "ಆಟ ಮತ್ತು ರಚನೆ",
    idea: "ಚಿತ್ರ ಬಿಡಿಸುವ ಆಲೋಚನೆ",
    newIdea: "💡 ಹೊಸ ಆಲೋಚನೆ",
    brush: "🖌️ ಬ್ರಷ್",
    eraser: "🧽 ಅಳಿಸುವ ಸಾಧನ",
    undo: "↩️ ಹಿಂದಿನದು",
    clear: "🗑️ ಅಳಿಸಿ",
    save: "💾 ಚಿತ್ರ ಉಳಿಸಿ",
    size: "ಬ್ರಷ್ ಗಾತ್ರ",
    colours: "ಬಣ್ಣಗಳು",
    stamps: "ಸ್ಟಿಕ್ಕರ್‌ಗಳು",
    shapes: "ಆಕಾರಗಳು",
    canvas: "ನಿಮ್ಮ ಚಿತ್ರ ಬಿಡಿಸುವ ಸ್ಥಳ",
    circle: "ವೃತ್ತ",
    square: "ಚೌಕ",
    triangle: "ತ್ರಿಕೋನ",
    rectangle: "ಆಯತ",
    star: "ನಕ್ಷತ್ರ",
    heart: "ಹೃದಯ"
  },

  hi: {
    title: "खेलें और बनाएँ",
    idea: "चित्र बनाने का विचार",
    newIdea: "💡 नया विचार",
    brush: "🖌️ ब्रश",
    eraser: "🧽 मिटाने का साधन",
    undo: "↩️ वापस",
    clear: "🗑️ साफ़ करें",
    save: "💾 चित्र सेव करें",
    size: "ब्रश का आकार",
    colours: "रंग",
    stamps: "स्टिकर",
    shapes: "आकार",
    canvas: "आपकी चित्र बनाने की जगह",
    circle: "गोल",
    square: "वर्ग",
    triangle: "त्रिभुज",
    rectangle: "आयत",
    star: "तारा",
    heart: "दिल"
  }
};

const SHAPES = [
  { id: "circle", icon: "○" },
  { id: "square", icon: "□" },
  { id: "triangle", icon: "△" },
  { id: "rectangle", icon: "▭" },
  { id: "star", icon: "☆" },
  { id: "heart", icon: "♡" }
];

export default function PlayPage({
  ageGroup = "4-6",
  language = "en",
  lang,
  onBack
}) {
  const selectedLanguage = lang || language || "en";

  const cfg = CFG[ageGroup] || CFG["4-6"];
  const labels = TEXT[selectedLanguage] || TEXT.en;

  const ref = useRef(null);
  const drawing = useRef(false);
  const undoStack = useRef([]);

  const [col, setCol] = useState(cfg.c[0]);
  const [size, setSize] = useState(cfg.s[0]);
  const [tool, setTool] = useState("brush");
  const [idea, setIdea] = useState(0);

  const ideas = cfg.ideas[selectedLanguage] || cfg.ideas.en;

  // Clear the canvas.
  const clearCanvas = () => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // Save the previous drawing for undo.
  const saveSnapshot = () => {
    const canvas = ref.current;
    if (!canvas) return;

    undoStack.current.push(canvas.toDataURL("image/png"));

    if (undoStack.current.length > 30) {
      undoStack.current.shift();
    }
  };

  useEffect(() => {
    setCol(cfg.c[0]);
    setSize(cfg.s[0]);
    setTool("brush");
    setIdea(0);

    undoStack.current = [];
    clearCanvas();
  }, [ageGroup]); // eslint-disable-line react-hooks/exhaustive-deps

  // Convert pointer position into canvas position.
  const pos = (e) => {
    const canvas = ref.current;
    const rect = canvas.getBoundingClientRect();

    return [
      ((e.clientX - rect.left) * canvas.width) / rect.width,
      ((e.clientY - rect.top) * canvas.height) / rect.height
    ];
  };

  // Draw a selected shape.
  const drawShape = (ctx, shape, x, y) => {
    const s = 55;

    ctx.beginPath();
    ctx.strokeStyle = col;
    ctx.lineWidth = Math.max(size, 4);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    if (shape === "circle") {
      ctx.arc(x, y, s / 2, 0, Math.PI * 2);
    }

    if (shape === "square") {
      ctx.rect(x - s / 2, y - s / 2, s, s);
    }

    if (shape === "rectangle") {
      ctx.rect(x - s * 0.8, y - s / 2, s * 1.6, s);
    }

    if (shape === "triangle") {
      ctx.moveTo(x, y - s / 2);
      ctx.lineTo(x - s / 2, y + s / 2);
      ctx.lineTo(x + s / 2, y + s / 2);
      ctx.closePath();
    }

    if (shape === "star") {
      for (let i = 0; i < 10; i++) {
        const radius = i % 2 === 0 ? s / 2 : s / 4;
        const angle = (Math.PI / 5) * i - Math.PI / 2;

        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;

        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }

      ctx.closePath();
    }

    if (shape === "heart") {
      ctx.moveTo(x, y + s / 2);
      ctx.bezierCurveTo(
        x - s, y - s / 5,
        x - s / 2, y - s,
        x, y - s / 3
      );

      ctx.bezierCurveTo(
        x + s / 2, y - s,
        x + s, y - s / 5,
        x, y + s / 2
      );

      ctx.closePath();
    }

    ctx.stroke();
  };

  // Handle the beginning of a drawing action.
  const down = (e) => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const [x, y] = pos(e);

    saveSnapshot();

    // Draw selected shape.
    if (tool.startsWith("shape:")) {
      const shape = tool.split(":")[1];
      drawShape(ctx, shape, x, y);
      return;
    }

    // Draw selected sticker.
    if (tool.startsWith("stamp:")) {
      const stamp = tool.replace("stamp:", "");

      ctx.font = "72px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(stamp, x, y);
      return;
    }

    // Start brush or eraser.
    drawing.current = true;

    canvas.setPointerCapture(e.pointerId);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.strokeStyle = tool === "eraser" ? "#FFFFFF" : col;
    ctx.lineWidth = tool === "eraser"
      ? Math.max(size * 3, 30)
      : size;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 0.1, y + 0.1);
    ctx.stroke();
  };

  // Continue drawing.
  const move = (e) => {
    if (!drawing.current) return;

    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const [x, y] = pos(e);

    ctx.strokeStyle = tool === "eraser" ? "#FFFFFF" : col;
    ctx.lineWidth = tool === "eraser"
      ? Math.max(size * 3, 30)
      : size;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    drawing.current = false;
  };

  // Undo the last action.
  const undo = () => {
    const canvas = ref.current;

    if (!canvas || undoStack.current.length === 0) return;

    const previous = undoStack.current.pop();
    const img = new Image();

    img.onload = () => {
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };

    img.src = previous;
  };

  // Clear the complete drawing.
  const clear = () => {
    saveSnapshot();
    clearCanvas();
  };

  // Download artwork.
  const saveDrawing = () => {
    const canvas = ref.current;
    if (!canvas) return;

    const link = document.createElement("a");

    link.download = "kiko-my-artwork.png";
    link.href = canvas.toDataURL("image/png");

    link.click();
  };

  return (
    <PageShell
      ageGroup={ageGroup}
      language={selectedLanguage}
      icon="🎨"
      title={labels.title}
      onBack={onBack}
    >
      {/* Drawing idea */}
      {ideas.length > 0 && (
        <div className="kp-card">
          ✏️ <strong>{labels.idea}:</strong>

          <p>{ideas[idea % ideas.length]}</p>

          <button
            className="kp-btn alt"
            onClick={() => setIdea((idea + 1) % ideas.length)}
          >
            {labels.newIdea}
          </button>
        </div>
      )}

      <div className="play-toolbar">

        {/* Colours */}
        <h3>{labels.colours}</h3>

        <div className="kp-row">
          {cfg.c.map((c) => (
            <button
              key={c}
              className={`kp-sw ${col === c && tool === "brush" ? "selected" : ""}`}
              style={{ background: c }}
              aria-label={`Colour ${c}`}
              onClick={() => {
                setCol(c);
                setTool("brush");
              }}
            />
          ))}
        </div>

        {/* Brush size */}
        <h3>{labels.size}</h3>

        <div className="kp-row">
          {cfg.s.map((s) => (
            <button
              key={s}
              className="kp-btn alt"
              onClick={() => setSize(s)}
            >
              {s === size ? "✓ " : ""}● {s}
            </button>
          ))}
        </div>

        {/* Ready-made shapes */}
        <h3>{labels.shapes}</h3>

        <div className="kp-row">
          {SHAPES.map((shape) => (
            <button
              key={shape.id}
              className={`kp-btn alt ${tool === `shape:${shape.id}` ? "selected" : ""}`}
              onClick={() => setTool(`shape:${shape.id}`)}
              title={labels[shape.id]}
              aria-label={labels[shape.id]}
            >
              <span style={{ fontSize: "25px" }}>
                {shape.icon}
              </span>
              <span>{labels[shape.id]}</span>
            </button>
          ))}
        </div>

        {/* Stickers */}
        {cfg.st.length > 0 && (
          <>
            <h3>{labels.stamps}</h3>

            <div className="kp-row">
              {cfg.st.map((stamp) => (
                <button
                  key={stamp}
                  className={`kp-btn alt ${tool === `stamp:${stamp}` ? "selected" : ""}`}
                  onClick={() => setTool(`stamp:${stamp}`)}
                >
                  {stamp}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Drawing tools */}
        <div className="kp-row play-tools">

          <button
            className={`kp-btn alt ${tool === "brush" ? "selected" : ""}`}
            onClick={() => setTool("brush")}
          >
            {labels.brush}
          </button>

          <button
            className={`kp-btn alt ${tool === "eraser" ? "selected" : ""}`}
            onClick={() => setTool("eraser")}
          >
            {labels.eraser}
          </button>

          <button
            className="kp-btn alt"
            onClick={undo}
          >
            {labels.undo}
          </button>

          <button
            className="kp-btn alt"
            onClick={clear}
          >
            {labels.clear}
          </button>

          <button
            className="kp-btn"
            onClick={saveDrawing}
          >
            {labels.save}
          </button>

        </div>
      </div>

      {/* Drawing canvas */}
      <div className="play-canvas-section">
        <h3>{labels.canvas}</h3>

        <canvas
          ref={ref}
          width="800"
          height="480"
          className="play-canvas"
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={stopDrawing}
          onPointerCancel={stopDrawing}
        />
      </div>

    </PageShell>
  );
}
