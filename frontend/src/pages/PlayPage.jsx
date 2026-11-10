
import { useEffect, useRef, useState } from "react";
import PageShell from "../components/PageShell";

const CFG = {
  "1-3": {
    colors: ["#FF7A59", "#FFC93C", "#3CCB9F", "#5AA9F6", "#B58CFF"],
    sizes: [5, 10, 15, 20, 25, 30, 35, 40],
    stickers: ["☀️", "🌸", "❤️", "🌈"],
  },
  "4-6": {
    colors: ["#26275A", "#FF7A59", "#FFC93C", "#3CCB9F", "#5AA9F6", "#B58CFF"],
    sizes: [2, 5, 8, 12, 16, 20, 25, 30],
    stickers: ["🌳", "🏠", "☀️", "🐘", "🦋", "🌸", "🚗", "⭐"],
  },
  "7-10": {
    colors: ["#26275A", "#FF7A59", "#FFC93C", "#3CCB9F", "#5AA9F6", "#B58CFF", "#FF6FA5", "#8B5A2B"],
    sizes: [1, 3, 5, 8, 12, 16, 20, 25, 30, 40],
    stickers: ["🌍", "🚀", "🌈", "🌻", "🦋", "🐼", "⭐", "🎨"],
  },
};

const CHALLENGES = {
  "1-3": [
    { id: "sun", emoji: "☀️", title: { en: "Draw a happy sun", kn: "ಸಂತೋಷದ ಸೂರ್ಯನನ್ನು ಬಿಡಿಸಿ", hi: "एक खुश सूरज बनाओ" }, description: { en: "Draw a big, bright sun!", kn: "ದೊಡ್ಡ, ಪ್ರಕಾಶಮಾನವಾದ ಸೂರ್ಯನನ್ನು ಬಿಡಿಸಿ!", hi: "एक बड़ा, चमकदार सूरज बनाओ!" } },
    { id: "flower", emoji: "🌸", title: { en: "Draw a flower", kn: "ಒಂದು ಹೂವನ್ನು ಬಿಡಿಸಿ", hi: "एक फूल बनाओ" }, description: { en: "Draw a colourful flower.", kn: "ಬಣ್ಣದ ಹೂವನ್ನು ಬಿಡಿಸಿ.", hi: "एक रंगीन फूल बनाओ।" } },
    { id: "balloon", emoji: "🎈", title: { en: "Draw a balloon", kn: "ಬಲೂನನ್ನು ಬಿಡಿಸಿ", hi: "एक गुब्बारा बनाओ" }, description: { en: "Draw a beautiful balloon.", kn: "ಸುಂದರವಾದ ಬಲೂನನ್ನು ಬಿಡಿಸಿ.", hi: "एक सुंदर गुब्बारा बनाओ।" } },
  ],
  "4-6": [
    { id: "garden", emoji: "🌳", title: { en: "Draw a garden", kn: "ಉದ್ಯಾನವನವನ್ನು ಬಿಡಿಸಿ", hi: "एक बगीचा बनाओ" }, description: { en: "Include trees, flowers and a sun.", kn: "ಮರಗಳು, ಹೂಗಳು ಮತ್ತು ಸೂರ್ಯನನ್ನು ಸೇರಿಸಿ.", hi: "पेड़, फूल और सूरज बनाओ।" } },
    { id: "house", emoji: "🏠", title: { en: "Draw your dream house", kn: "ನಿಮ್ಮ ಕನಸಿನ ಮನೆಯನ್ನು ಬಿಡಿಸಿ", hi: "अपने सपनों का घर बनाओ" }, description: { en: "Add a door, windows and a roof.", kn: "ಬಾಗಿಲು, ಕಿಟಕಿಗಳು ಮತ್ತು ಛಾವಣಿಯನ್ನು ಸೇರಿಸಿ.", hi: "दरवाज़ा, खिड़कियाँ और छत बनाओ।" } },
    { id: "animal", emoji: "🐘", title: { en: "Draw your favourite animal", kn: "ನಿಮ್ಮ ಇಷ್ಟದ ಪ್ರಾಣಿಯನ್ನು ಬಿಡಿಸಿ", hi: "अपना पसंदीदा जानवर बनाओ" }, description: { en: "Draw an animal and add details.", kn: "ಒಂದು ಪ್ರಾಣಿಯನ್ನು ಬಿಡಿಸಿ.", hi: "एक जानवर बनाओ।" } },
    { id: "rainbow", emoji: "🌈", title: { en: "Draw a rainbow", kn: "ಮಳೆಬಿಲ್ಲನ್ನು ಬಿಡಿಸಿ", hi: "एक इंद्रधनुष बनाओ" }, description: { en: "Use different colours.", kn: "ವಿವಿಧ ಬಣ್ಣಗಳನ್ನು ಬಳಸಿ.", hi: "अलग-अलग रंगों का उपयोग करो।" } },
  ],
  "7-10": [
    { id: "village", emoji: "🏡", title: { en: "Draw a beautiful village", kn: "ಸುಂದರವಾದ ಹಳ್ಳಿಯನ್ನು ಬಿಡಿಸಿ", hi: "एक सुंदर गाँव बनाओ" }, description: { en: "Include houses, trees, roads and people.", kn: "ಮನೆಗಳು, ಮರಗಳು, ರಸ್ತೆಗಳು ಮತ್ತು ಜನರನ್ನು ಸೇರಿಸಿ.", hi: "घर, पेड़, सड़कें और लोग बनाओ।" } },
    { id: "school", emoji: "🏫", title: { en: "Draw your dream school", kn: "ನಿಮ್ಮ ಕನಸಿನ ಶಾಲೆಯನ್ನು ಬಿಡಿಸಿ", hi: "अपने सपनों का स्कूल बनाओ" }, description: { en: "Show classrooms and a playground.", kn: "ತರಗತಿಗಳು ಮತ್ತು ಆಟದ ಮೈದಾನವನ್ನು ತೋರಿಸಿ.", hi: "कक्षाएँ और खेल का मैदान बनाओ।" } },
    { id: "planet", emoji: "🌍", title: { en: "Draw a green planet", kn: "ಹಸಿರು ಗ್ರಹವನ್ನು ಬಿಡಿಸಿ", hi: "एक हरा ग्रह बनाओ" }, description: { en: "Show trees, water and animals.", kn: "ಮರಗಳು, ನೀರು ಮತ್ತು ಪ್ರಾಣಿಗಳನ್ನು ತೋರಿಸಿ.", hi: "पेड़, पानी और जानवर दिखाओ।" } },
    { id: "space", emoji: "🚀", title: { en: "Draw a space adventure", kn: "ಬಾಹ್ಯಾಕಾಶ ಸಾಹಸವನ್ನು ಬಿಡಿಸಿ", hi: "अंतरिक्ष का रोमांच बनाओ" }, description: { en: "Include planets, stars and a rocket.", kn: "ಗ್ರಹಗಳು, ನಕ್ಷತ್ರಗಳು ಮತ್ತು ರಾಕೆಟ್ ಸೇರಿಸಿ.", hi: "ग्रह, तारे और रॉकेट बनाओ।" } },
  ],
};

const WORDS = {
  en: {
    free: "Free Drawing", challenges: "Drawing Challenges", gallery: "My Art Gallery",
    task: "Your drawing task", colors: "Colours", size: "Brush size",
    shapes: "Shapes", stickers: "Stickers", brush: "🖌️ Brush",
    eraser: "🧽 Eraser", undo: "↩️ Undo", clear: "🗑️ Clear",
    save: "💾 Save to Gallery", download: "Download", done: "I'm Done! 🎉",
    back: "← Back", empty: "Your gallery is empty. Create your first drawing!",
    saved: "Your artwork has been saved!", encouragement: "Wonderful work! 🎉",
    challengeDone: "You completed your drawing challenge. Keep creating!",
    circle: "Circle", square: "Square", triangle: "Triangle",
    rectangle: "Rectangle", star: "Star", heart: "Heart",
    canvas: "Your drawing space", choose: "Choose a challenge",
    title: "Play & Create", freeDesc: "Draw anything you imagine!",
    stickerUnlocked: "You unlocked a new sticker!",
  },
  kn: {
    free: "ಸ್ವತಂತ್ರ ಚಿತ್ರಕಲೆ", challenges: "ಚಿತ್ರಕಲೆ ಸವಾಲುಗಳು", gallery: "ನನ್ನ ಚಿತ್ರಗಳು",
    task: "ನಿಮ್ಮ ಚಿತ್ರಕಲೆ ಕೆಲಸ", colors: "ಬಣ್ಣಗಳು", size: "ಬ್ರಷ್ ಗಾತ್ರ",
    shapes: "ಆಕಾರಗಳು", stickers: "ಸ್ಟಿಕ್ಕರ್‌ಗಳು", brush: "🖌️ ಬ್ರಷ್",
    eraser: "🧽 ಅಳಿಸುವ ಸಾಧನ", undo: "↩️ ಹಿಂದಿನದು", clear: "🗑️ ಅಳಿಸಿ",
    save: "💾 ಚಿತ್ರ ಉಳಿಸಿ", download: "ಡೌನ್‌ಲೋಡ್", done: "ಮುಗಿಸಿದ್ದೇನೆ! 🎉",
    back: "← ಹಿಂದೆ", empty: "ನಿಮ್ಮ ಗ್ಯಾಲರಿ ಖಾಲಿಯಾಗಿದೆ. ಮೊದಲ ಚಿತ್ರ ಬಿಡಿಸಿ!",
    saved: "ನಿಮ್ಮ ಚಿತ್ರವನ್ನು ಉಳಿಸಲಾಗಿದೆ!", encouragement: "ಅದ್ಭುತ ಕೆಲಸ! 🎉",
    challengeDone: "ನೀವು ಚಿತ್ರಕಲೆ ಸವಾಲನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ!",
    circle: "ವೃತ್ತ", square: "ಚೌಕ", triangle: "ತ್ರಿಕೋನ",
    rectangle: "ಆಯತ", star: "ನಕ್ಷತ್ರ", heart: "ಹೃದಯ",
    canvas: "ನಿಮ್ಮ ಚಿತ್ರ ಬಿಡಿಸುವ ಸ್ಥಳ", choose: "ಸವಾಲನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    title: "ಆಟ ಮತ್ತು ರಚನೆ", freeDesc: "ನಿಮ್ಮ ಕಲ್ಪನೆಯಂತೆ ಚಿತ್ರ ಬಿಡಿಸಿ!",
    stickerUnlocked: "ಹೊಸ ಸ್ಟಿಕ್ಕರ್ ನಿಮಗೆ ಸಿಕ್ಕಿದೆ!",
  },
  hi: {
    free: "मुफ़्त ड्राइंग", challenges: "ड्राइंग चुनौतियाँ", gallery: "मेरी आर्ट गैलरी",
    task: "तुम्हारा ड्राइंग कार्य", colors: "रंग", size: "ब्रश का आकार",
    shapes: "आकार", stickers: "स्टिकर", brush: "🖌️ ब्रश",
    eraser: "🧽 मिटाएँ", undo: "↩️ वापस", clear: "🗑️ साफ़ करें",
    save: "💾 गैलरी में सेव करें", download: "डाउनलोड", done: "मैंने पूरा किया! 🎉",
    back: "← वापस", empty: "तुम्हारी गैलरी खाली है। पहली ड्राइंग बनाओ!",
    saved: "तुम्हारी ड्राइंग सेव हो गई!", encouragement: "बहुत अच्छा काम! 🎉",
    challengeDone: "तुमने ड्राइंग चुनौती पूरी कर ली!",
    circle: "गोला", square: "वर्ग", triangle: "त्रिभुज",
    rectangle: "आयत", star: "तारा", heart: "दिल",
    canvas: "तुम्हारी चित्र बनाने की जगह", choose: "एक चुनौती चुनो",
    title: "खेलें और बनाएँ", freeDesc: "अपनी कल्पना से कुछ बनाओ!",
    stickerUnlocked: "तुमने एक नया स्टिकर अनलॉक किया!",
  },
};

const SHAPES = [
  { id: "circle", icon: "○" },
  { id: "square", icon: "□" },
  { id: "triangle", icon: "△" },
  { id: "rectangle", icon: "▭" },
  { id: "star", icon: "☆" },
  { id: "heart", icon: "♡" },
];

const GALLERY_KEY = "kiko-art-gallery";
const STICKER_KEY = "kiko-unlocked-stickers";

export default function PlayPage({
  ageGroup = "4-6",
  language = "en",
  lang,
  onBack,
}) {
  const selectedLanguage = lang || language || "en";
  const cfg = CFG[ageGroup] || CFG["4-6"];
  const labels = WORDS[selectedLanguage] || WORDS.en;
  const challenges = CHALLENGES[ageGroup] || CHALLENGES["4-6"];

  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const undoStack = useRef([]);

  const [screen, setScreen] = useState("free");
  const [mode, setMode] = useState("free");
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [color, setColor] = useState(cfg.colors[0]);
  const [size, setSize] = useState(cfg.sizes[0]);
  const [tool, setTool] = useState("brush");
  const [gallery, setGallery] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(GALLERY_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STICKER_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [notice, setNotice] = useState("");
  const [completed, setCompleted] = useState(false);
  const [preview, setPreview] = useState(null);

  const challenge = challenges[challengeIndex];

  useEffect(() => {
    setColor(cfg.colors[0]);
    setSize(cfg.sizes[0]);
    setTool("brush");
  }, [ageGroup]);

  useEffect(() => {
    localStorage.setItem(GALLERY_KEY, JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(STICKER_KEY, JSON.stringify(unlocked));
  }, [unlocked]);

  useEffect(() => {
    if (screen === "free" || screen === "drawing") {
      clearCanvas();
    }
  }, [screen]);

  function clearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function saveSnapshot() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    undoStack.current.push(canvas.toDataURL("image/png"));
    if (undoStack.current.length > 30) undoStack.current.shift();
  }

  function getPosition(e) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return [
      ((e.clientX - rect.left) * canvas.width) / rect.width,
      ((e.clientY - rect.top) * canvas.height) / rect.height,
    ];
  }

  function drawShape(ctx, shape, x, y) {
    const s = 55;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(size, 2);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    if (shape === "circle") ctx.arc(x, y, s / 2, 0, Math.PI * 2);
    if (shape === "square") ctx.rect(x - s / 2, y - s / 2, s, s);
    if (shape === "rectangle") ctx.rect(x - s * 0.8, y - s / 2, s * 1.6, s);

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
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    }

    if (shape === "heart") {
      ctx.moveTo(x, y + s / 2);
      ctx.bezierCurveTo(x - s, y - s / 5, x - s / 2, y - s, x, y - s / 3);
      ctx.bezierCurveTo(x + s / 2, y - s, x + s, y - s / 5, x, y + s / 2);
      ctx.closePath();
    }

    ctx.stroke();
  }

  function handlePointerDown(e) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const [x, y] = getPosition(e);
    saveSnapshot();

    if (tool.startsWith("shape:")) {
      drawShape(ctx, tool.split(":")[1], x, y);
      return;
    }

    if (tool.startsWith("stamp:")) {
      ctx.font = "72px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(tool.replace("stamp:", ""), x, y);
      return;
    }

    drawing.current = true;
    canvas.setPointerCapture(e.pointerId);
    ctx.strokeStyle = tool === "eraser" ? "#FFFFFF" : color;
    ctx.lineWidth = tool === "eraser" ? size * 3 : size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 0.1, y + 0.1);
    ctx.stroke();
  }

  function handlePointerMove(e) {
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const [x, y] = getPosition(e);
    ctx.strokeStyle = tool === "eraser" ? "#FFFFFF" : color;
    ctx.lineWidth = tool === "eraser" ? size * 3 : size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function undo() {
    const canvas = canvasRef.current;
    if (!canvas || !undoStack.current.length) return;
    const previous = undoStack.current.pop();
    const img = new Image();
    img.onload = () => {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = previous;
  }

  function clearDrawing() {
    saveSnapshot();
    clearCanvas();
  }

  function startFreeDrawing() {
    setMode("free");
    setCompleted(false);
    setNotice("");
    undoStack.current = [];
    setScreen("free");
  }

  function startChallenge(index) {
    setChallengeIndex(index);
    setMode("challenge");
    setCompleted(false);
    setNotice("");
    undoStack.current = [];
    setTool("brush");
    setScreen("drawing");
  }

  function saveToGallery() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const image = canvas.toDataURL("image/png");
    const item = {
      id: Date.now(),
      image,
      title: mode === "challenge"
        ? challenge.title[selectedLanguage] || challenge.title.en
        : "My Drawing",
      date: new Date().toLocaleDateString(),
    };

    setGallery((old) => [item, ...old]);
    setNotice(labels.saved);
  }

  function downloadDrawing() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "kiko-my-artwork.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function finishChallenge() {
    if (mode !== "challenge") return;
    setCompleted(true);
    setNotice(labels.challengeDone);

    // Unlock one sticker for completing a challenge.
    const available = cfg.stickers;
    const nextSticker = available.find((item) => !unlocked.includes(item));

    if (nextSticker) {
      setUnlocked((old) => [...old, nextSticker]);
      setNotice(`${labels.challengeDone} ${labels.stickerUnlocked} ${nextSticker}`);
    }
  }

  function deleteArtwork(id) {
    setGallery((old) => old.filter((item) => item.id !== id));
    setPreview(null);
  }

  const isCanvasScreen = screen === "free" || screen === "drawing";

  return (
    <PageShell
      ageGroup={ageGroup}
      language={selectedLanguage}
      icon="🎨"
      title={labels.title}
      onBack={onBack}
    >
      {/* HOME */}
      {screen === "free" && (
        <div className="play-home">
          <div className="kp-card challenge-intro">
            <div style={{ fontSize: 48, textAlign: "center" }}>🎨</div>
            <h2 style={{ textAlign: "center" }}>{labels.free}</h2>
            <p style={{ textAlign: "center" }}>{labels.freeDesc}</p>
          </div>

          <div className="kp-row play-home-actions">
            <button className="kp-btn" onClick={() => {
              setMode("free");
              setScreen("drawing");
            }}>
              🎨 {labels.free}
            </button>
            <button className="kp-btn alt" onClick={() => setScreen("challenges")}>
              🎯 {labels.challenges}
            </button>
            <button className="kp-btn alt" onClick={() => setScreen("gallery")}>
              🖼️ {labels.gallery}
            </button>
          </div>

          <div className="kp-card">
            <h3>🏅 {labels.stickers}</h3>
            <div className="kp-row">
              {unlocked.length
                ? unlocked.map((sticker) => <span key={sticker} style={{ fontSize: 32 }}>{sticker}</span>)
                : <p>Complete a drawing challenge to unlock your first sticker!</p>}
            </div>
          </div>
        </div>
      )}

      {/* CHALLENGE LIST */}
      {screen === "challenges" && (
        <div className="play-challenges">
          <button className="kp-btn alt" onClick={startFreeDrawing}>
            {labels.back}
          </button>

          <h2>{labels.choose}</h2>

          <div className="challenge-list">
            {challenges.map((item, index) => (
              <div className="kp-card challenge-card" key={item.id}>
                <div style={{ fontSize: 38 }}>{item.emoji}</div>
                <h3>{item.title[selectedLanguage] || item.title.en}</h3>
                <p>{item.description[selectedLanguage] || item.description.en}</p>
                <button className="kp-btn" onClick={() => startChallenge(index)}>
                  🎨 Start Drawing
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GALLERY */}
      {screen === "gallery" && (
        <div className="play-gallery">
          <button className="kp-btn alt" onClick={startFreeDrawing}>
            {labels.back}
          </button>

          <h2>🖼️ {labels.gallery}</h2>

          {gallery.length === 0 ? (
            <div className="kp-card">
              <p>{labels.empty}</p>
            </div>
          ) : (
            <div className="gallery-grid">
              {gallery.map((item) => (
                <div className="kp-card gallery-card" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.title}
                    onClick={() => setPreview(item)}
                  />
                  <h3>{item.title}</h3>
                  <small>{item.date}</small>
                  <div className="kp-row">
                    <button className="kp-btn alt" onClick={() => setPreview(item)}>
                      View
                    </button>
                    <button className="kp-btn alt" onClick={() => deleteArtwork(item.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {preview && (
            <div className="kp-card gallery-preview">
              <h3>{preview.title}</h3>
              <img src={preview.image} alt={preview.title} />
              <button className="kp-btn alt" onClick={() => setPreview(null)}>
                Close
              </button>
            </div>
          )}
        </div>
      )}

      {/* DRAWING CANVAS */}
      {isCanvasScreen && (
        <div className="play-drawing">
          {mode === "challenge" && (
            <div className="kp-card active-challenge">
              <h3>🎯 {labels.task}</h3>
              <h2>{challenge.title[selectedLanguage] || challenge.title.en}</h2>
              <p>{challenge.description[selectedLanguage] || challenge.description.en}</p>
              <button className="kp-btn alt" onClick={() => setScreen("challenges")}>
                {labels.back}
              </button>
            </div>
          )}

          {mode === "free" && (
            <div className="kp-card">
              <h3>{labels.free}</h3>
              <p>{labels.freeDesc}</p>
              <button className="kp-btn alt" onClick={() => setScreen("challenges")}>
                🎯 {labels.challenges}
              </button>
              <button className="kp-btn alt" onClick={() => setScreen("gallery")}>
                🖼️ {labels.gallery}
              </button>
            </div>
          )}

          <div className="play-toolbar">
            <h3>{labels.colors}</h3>
            <div className="kp-row">
              {cfg.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`kp-sw ${color === c && tool === "brush" ? "selected" : ""}`}
                  style={{ background: c }}
                  aria-label={`Colour ${c}`}
                  onClick={() => {
                    setColor(c);
                    setTool("brush");
                  }}
                />
              ))}
            </div>

            <h3>{labels.size}: {size}px</h3>
            <div className="brush-size-control">
              <span>1</span>
              <input
                type="range"
                min="1"
                max="40"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
              />
              <span>40</span>
              <span className="brush-preview" style={{
                width: `${Math.max(size, 4)}px`,
                height: `${Math.max(size, 4)}px`,
                backgroundColor: color,
              }} />
            </div>

            <h3>{labels.shapes}</h3>
            <div className="kp-row">
              {SHAPES.map((shape) => (
                <button
                  key={shape.id}
                  className={`kp-btn alt ${tool === `shape:${shape.id}` ? "selected" : ""}`}
                  onClick={() => setTool(`shape:${shape.id}`)}
                >
                  <span style={{ fontSize: 22 }}>{shape.icon}</span>
                  {labels[shape.id]}
                </button>
              ))}
            </div>

            <h3>{labels.stickers}</h3>
            <div className="kp-row">
              {cfg.stickers.map((sticker) => (
                <button
                  key={sticker}
                  className={`kp-btn alt ${tool === `stamp:${sticker}` ? "selected" : ""}`}
                  onClick={() => setTool(`stamp:${sticker}`)}
                  disabled={!unlocked.includes(sticker) && !["4-6", "7-10"].includes(ageGroup)}
                  title="Choose sticker"
                >
                  {sticker}
                </button>
              ))}
            </div>

            <div className="kp-row play-tools">
              <button className={`kp-btn alt ${tool === "brush" ? "selected" : ""}`} onClick={() => setTool("brush")}>
                {labels.brush}
              </button>
              <button className={`kp-btn alt ${tool === "eraser" ? "selected" : ""}`} onClick={() => setTool("eraser")}>
                {labels.eraser}
              </button>
              <button className="kp-btn alt" onClick={undo}>{labels.undo}</button>
              <button className="kp-btn alt" onClick={clearDrawing}>{labels.clear}</button>
              <button className="kp-btn" onClick={saveToGallery}>{labels.save}</button>
              <button className="kp-btn alt" onClick={downloadDrawing}>{labels.download}</button>
            </div>
          </div>

          <div className="play-canvas-section">
            <h3>{labels.canvas}</h3>
            <canvas
              ref={canvasRef}
              width="800"
              height="480"
              className="play-canvas"
              style={{ touchAction: "none", background: "#fff" }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={() => { drawing.current = false; }}
              onPointerCancel={() => { drawing.current = false; }}
              onLostPointerCapture={() => { drawing.current = false; }}
            />
          </div>

          {notice && <div className="kp-card" role="status">{notice}</div>}

          {mode === "challenge" && (
            <div className="challenge-finish">
              <button
                className="kp-btn"
                onClick={finishChallenge}
                disabled={completed}
              >
                {completed ? labels.encouragement : labels.done}
              </button>
            </div>
          )}
        </div>
      )}
    </PageShell>
  );
}
