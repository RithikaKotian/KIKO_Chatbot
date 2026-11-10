
import { useEffect, useRef, useState } from "react";
import PageShell from "../components/PageShell";

const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const CFG = {
  "1-3": {
    c: ["#FF7A59", "#FFC93C", "#3CCB9F", "#5AA9F6", "#B58CFF"],
    s: [5, 10, 15, 20, 25, 30, 35, 40],
    st: [],
  },
  "4-6": {
    c: ["#26275A", "#FF7A59", "#FFC93C", "#3CCB9F", "#5AA9F6", "#B58CFF"],
    s: [2, 5, 8, 12, 16, 20, 25, 30],
    st: ["🌳", "🏠", "☀️", "🐘", "🦋", "🌸", "🚗", "⭐"],
  },
  "7-10": {
    c: ["#26275A", "#FF7A59", "#FFC93C", "#3CCB9F", "#5AA9F6", "#B58CFF", "#FF6FA5", "#8B5A2B"],
    s: [1, 3, 5, 8, 12, 16, 20, 25, 30, 40],
    st: [],
  },
};

const CHALLENGES = {
  "1-3": [
    {
      id: "sun",
      title: {
        en: "Draw a happy sun ☀️",
        kn: "ಸಂತೋಷದ ಸೂರ್ಯನನ್ನು ಬಿಡಿಸಿ ☀️",
        hi: "एक खुश सूरज बनाओ ☀️",
      },
      description: {
        en: "Draw a big, bright sun!",
        kn: "ದೊಡ್ಡ, ಪ್ರಕಾಶಮಾನವಾದ ಸೂರ್ಯನನ್ನು ಬಿಡಿಸಿ!",
        hi: "एक बड़ा, चमकदार सूरज बनाओ!",
      },
      elements: ["sun"],
      difficulty: "Easy",
    },
    {
      id: "flower",
      title: {
        en: "Draw a colourful flower 🌸",
        kn: "ಬಣ್ಣದ ಹೂವನ್ನು ಬಿಡಿಸಿ 🌸",
        hi: "एक रंगीन फूल बनाओ 🌸",
      },
      description: {
        en: "Draw a flower with colourful petals.",
        kn: "ಬಣ್ಣದ ದಳಗಳಿರುವ ಹೂವನ್ನು ಬಿಡಿಸಿ.",
        hi: "रंगीन पंखुड़ियों वाला फूल बनाओ।",
      },
      elements: ["flower"],
      difficulty: "Easy",
    },
    {
      id: "balloon",
      title: {
        en: "Draw a balloon 🎈",
        kn: "ಬಲೂನನ್ನು ಬಿಡಿಸಿ 🎈",
        hi: "एक गुब्बारा बनाओ 🎈",
      },
      description: {
        en: "Draw a big, beautiful balloon.",
        kn: "ದೊಡ್ಡ ಸುಂದರವಾದ ಬಲೂನನ್ನು ಬಿಡಿಸಿ.",
        hi: "एक बड़ा सुंदर गुब्बारा बनाओ।",
      },
      elements: ["balloon"],
      difficulty: "Easy",
    },
  ],

  "4-6": [
    {
      id: "garden",
      title: {
        en: "Draw a beautiful garden 🌳",
        kn: "ಸುಂದರವಾದ ಉದ್ಯಾನವನವನ್ನು ಬಿಡಿಸಿ 🌳",
        hi: "एक सुंदर बगीचा बनाओ 🌳",
      },
      description: {
        en: "Include a tree, flowers and a bright sun.",
        kn: "ಮರ, ಹೂಗಳು ಮತ್ತು ಪ್ರಕಾಶಮಾನವಾದ ಸೂರ್ಯನನ್ನು ಸೇರಿಸಿ.",
        hi: "एक पेड़, फूल और चमकदार सूरज बनाओ।",
      },
      elements: ["tree", "flowers", "sun"],
      difficulty: "Easy",
    },
    {
      id: "house",
      title: {
        en: "Draw your dream house 🏠",
        kn: "ನಿಮ್ಮ ಕನಸಿನ ಮನೆಯನ್ನು ಬಿಡಿಸಿ 🏠",
        hi: "अपने सपनों का घर बनाओ 🏠",
      },
      description: {
        en: "Draw a house with a door, windows and a roof.",
        kn: "ಬಾಗಿಲು, ಕಿಟಕಿಗಳು ಮತ್ತು ಛಾವಣಿಯಿರುವ ಮನೆಯನ್ನು ಬಿಡಿಸಿ.",
        hi: "दरवाज़े, खिड़कियों और छत वाला घर बनाओ।",
      },
      elements: ["house", "door", "windows"],
      difficulty: "Easy",
    },
    {
      id: "animal",
      title: {
        en: "Draw your favourite animal 🐘",
        kn: "ನಿಮ್ಮ ಇಷ್ಟದ ಪ್ರಾಣಿಯನ್ನು ಬಿಡಿಸಿ 🐘",
        hi: "अपना पसंदीदा जानवर बनाओ 🐘",
      },
      description: {
        en: "Draw an animal and add some details.",
        kn: "ಒಂದು ಪ್ರಾಣಿಯನ್ನು ಬಿಡಿಸಿ ಮತ್ತು ಕೆಲವು ವಿವರಗಳನ್ನು ಸೇರಿಸಿ.",
        hi: "एक जानवर बनाओ और उसमें कुछ विवरण जोड़ो।",
      },
      elements: ["animal"],
      difficulty: "Easy",
    },
    {
      id: "rainbow",
      title: {
        en: "Draw a rainbow 🌈",
        kn: "ಮಳೆಬಿಲ್ಲನ್ನು ಬಿಡಿಸಿ 🌈",
        hi: "एक इंद्रधनुष बनाओ 🌈",
      },
      description: {
        en: "Use different colours to make a rainbow.",
        kn: "ಮಳೆಬಿಲ್ಲನ್ನು ಮಾಡಲು ವಿವಿಧ ಬಣ್ಣಗಳನ್ನು ಬಳಸಿ.",
        hi: "इंद्रधनुष बनाने के लिए अलग-अलग रंगों का उपयोग करो।",
      },
      elements: ["rainbow"],
      difficulty: "Easy",
    },
  ],

  "7-10": [
    {
      id: "village",
      title: {
        en: "Draw a beautiful village 🏡",
        kn: "ಸುಂದರವಾದ ಹಳ್ಳಿಯನ್ನು ಬಿಡಿಸಿ 🏡",
        hi: "एक सुंदर गाँव बनाओ 🏡",
      },
      description: {
        en: "Include houses, trees, roads and people.",
        kn: "ಮನೆಗಳು, ಮರಗಳು, ರಸ್ತೆಗಳು ಮತ್ತು ಜನರನ್ನು ಸೇರಿಸಿ.",
        hi: "घर, पेड़, सड़कें और लोगों को शामिल करो।",
      },
      elements: ["houses", "trees", "roads", "people"],
      difficulty: "Medium",
    },
    {
      id: "school",
      title: {
        en: "Draw your dream school 🏫",
        kn: "ನಿಮ್ಮ ಕನಸಿನ ಶಾಲೆಯನ್ನು ಬಿಡಿಸಿ 🏫",
        hi: "अपने सपनों का स्कूल बनाओ 🏫",
      },
      description: {
        en: "Show classrooms, a playground and trees.",
        kn: "ತರಗತಿಗಳು, ಆಟದ ಮೈದಾನ ಮತ್ತು ಮರಗಳನ್ನು ತೋರಿಸಿ.",
        hi: "कक्षाएँ, खेल का मैदान और पेड़ बनाओ।",
      },
      elements: ["school", "playground", "trees"],
      difficulty: "Medium",
    },
    {
      id: "environment",
      title: {
        en: "Draw a green planet 🌍",
        kn: "ಹಸಿರು ಗ್ರಹವನ್ನು ಬಿಡಿಸಿ 🌍",
        hi: "एक हरा-भरा ग्रह बनाओ 🌍",
      },
      description: {
        en: "Show trees, water, animals and nature.",
        kn: "ಮರಗಳು, ನೀರು, ಪ್ರಾಣಿಗಳು ಮತ್ತು ಪ್ರಕೃತಿಯನ್ನು ತೋರಿಸಿ.",
        hi: "पेड़, पानी, जानवर और प्रकृति दिखाओ।",
      },
      elements: ["trees", "water", "animals", "nature"],
      difficulty: "Medium",
    },
    {
      id: "festival",
      title: {
        en: "Draw a colourful festival 🎉",
        kn: "ಬಣ್ಣದ ಹಬ್ಬವನ್ನು ಬಿಡಿಸಿ 🎉",
        hi: "एक रंगीन त्योहार बनाओ 🎉",
      },
      description: {
        en: "Include decorations, lights and celebrations.",
        kn: "ಅಲಂಕಾರಗಳು, ದೀಪಗಳು ಮತ್ತು ಸಂಭ್ರಮವನ್ನು ಸೇರಿಸಿ.",
        hi: "सजावट, रोशनी और उत्सव दिखाओ।",
      },
      elements: ["decorations", "lights", "celebration"],
      difficulty: "Medium",
    },
    {
      id: "space",
      title: {
        en: "Draw your own space adventure 🚀",
        kn: "ನಿಮ್ಮದೇ ಬಾಹ್ಯಾಕಾಶ ಸಾಹಸವನ್ನು ಬಿಡಿಸಿ 🚀",
        hi: "अपना अंतरिक्ष रोमांच बनाओ 🚀",
      },
      description: {
        en: "Include planets, stars and a rocket.",
        kn: "ಗ್ರಹಗಳು, ನಕ್ಷತ್ರಗಳು ಮತ್ತು ರಾಕೆಟ್ ಸೇರಿಸಿ.",
        hi: "ग्रह, तारे और एक रॉकेट बनाओ।",
      },
      elements: ["planets", "stars", "rocket"],
      difficulty: "Medium",
    },
  ],
};

const TEXT = {
  en: {
    title: "Play & Create",
    challenges: "Drawing Challenges",
    challengeDesc: "Complete a fun drawing challenge and earn stars!",
    start: "Start Challenge",
    choose: "Choose a challenge",
    task: "Your drawing task",
    difficulty: "Difficulty",
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
    submit: "✨ Evaluate My Drawing",
    evaluating: "KIKO is looking at your drawing...",
    result: "Your Drawing Result",
    again: "Try Another Challenge",
    back: "Back to Challenges",
    circle: "Circle",
    square: "Square",
    triangle: "Triangle",
    rectangle: "Rectangle",
    star: "Star",
    heart: "Heart",
    offline: "Offline feedback",
    online: "AI evaluation",
    noDrawing: "Draw something before submitting!",
    error: "Something went wrong. Please try again.",
    offlineMessage: "Great effort! You completed your drawing. Connect to the internet for detailed AI feedback.",
    stars: "Your stars",
  },
  kn: {
    title: "ಆಟ ಮತ್ತು ರಚನೆ",
    challenges: "ಚಿತ್ರಕಲೆ ಸವಾಲುಗಳು",
    challengeDesc: "ಚಿತ್ರಕಲೆ ಸವಾಲುಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ ನಕ್ಷತ್ರಗಳನ್ನು ಗಳಿಸಿ!",
    start: "ಸವಾಲು ಪ್ರಾರಂಭಿಸಿ",
    choose: "ಸವಾಲನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    task: "ನಿಮ್ಮ ಚಿತ್ರಕಲೆ ಕೆಲಸ",
    difficulty: "ಕಷ್ಟದ ಮಟ್ಟ",
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
    submit: "✨ ನನ್ನ ಚಿತ್ರವನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡಿ",
    evaluating: "ಕಿಕೋ ನಿಮ್ಮ ಚಿತ್ರವನ್ನು ನೋಡುತ್ತಿದೆ...",
    result: "ನಿಮ್ಮ ಚಿತ್ರದ ಫಲಿತಾಂಶ",
    again: "ಮತ್ತೊಂದು ಸವಾಲು",
    back: "ಸವಾಲುಗಳಿಗೆ ಹಿಂತಿರುಗಿ",
    circle: "ವೃತ್ತ",
    square: "ಚೌಕ",
    triangle: "ತ್ರಿಕೋನ",
    rectangle: "ಆಯತ",
    star: "ನಕ್ಷತ್ರ",
    heart: "ಹೃದಯ",
    offline: "ಆಫ್‌ಲೈನ್ ಪ್ರತಿಕ್ರಿಯೆ",
    online: "AI ಮೌಲ್ಯಮಾಪನ",
    noDrawing: "ಮೊದಲು ಏನಾದರೂ ಚಿತ್ರ ಬಿಡಿಸಿ!",
    error: "ದೋಷ ಸಂಭವಿಸಿದೆ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    offlineMessage: "ಅದ್ಭುತ ಪ್ರಯತ್ನ! ನಿಮ್ಮ ಚಿತ್ರವನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ. ವಿವರವಾದ AI ಪ್ರತಿಕ್ರಿಯೆಗಾಗಿ ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕಿಸಿ.",
    stars: "ನಿಮ್ಮ ನಕ್ಷತ್ರಗಳು",
  },
  hi: {
    title: "खेलें और बनाएँ",
    challenges: "ड्राइंग चुनौतियाँ",
    challengeDesc: "ड्राइंग चुनौती पूरी करो और सितारे जीतो!",
    start: "चुनौती शुरू करो",
    choose: "एक चुनौती चुनो",
    task: "तुम्हारा ड्राइंग कार्य",
    difficulty: "कठिनाई",
    brush: "🖌️ ब्रश",
    eraser: "🧽 मिटाने का साधन",
    undo: "↩️ वापस",
    clear: "🗑️ साफ़ करें",
    save: "💾 चित्र सेव करें",
    size: "ब्रश का आकार",
    colours: "रंग",
    stamps: "स्टिकर",
    shapes: "आकार",
    canvas: "तुम्हारी चित्र बनाने की जगह",
    submit: "✨ मेरी ड्राइंग का मूल्यांकन करो",
    evaluating: "किको तुम्हारी ड्राइंग देख रहा है...",
    result: "तुम्हारी ड्राइंग का परिणाम",
    again: "एक और चुनौती",
    back: "चुनौतियों पर वापस जाओ",
    circle: "गोल",
    square: "वर्ग",
    triangle: "त्रिभुज",
    rectangle: "आयत",
    star: "तारा",
    heart: "दिल",
    offline: "ऑफ़लाइन प्रतिक्रिया",
    online: "AI मूल्यांकन",
    noDrawing: "पहले कुछ चित्र बनाओ!",
    error: "कुछ गलत हुआ। फिर कोशिश करो।",
    offlineMessage: "बहुत अच्छा प्रयास! तुमने अपनी ड्राइंग पूरी की। विस्तृत AI प्रतिक्रिया के लिए इंटरनेट से जुड़ो।",
    stars: "तुम्हारे सितारे",
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

export default function PlayPage({
  ageGroup = "4-6",
  language = "en",
  lang,
  onBack,
}) {
  const selectedLanguage = lang || language || "en";
  const cfg = CFG[ageGroup] || CFG["4-6"];
  const labels = TEXT[selectedLanguage] || TEXT.en;

  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const undoStack = useRef([]);

  const [color, setColor] = useState(cfg.c[0]);
  const [size, setSize] = useState(cfg.s[0]);
  const [tool, setTool] = useState("brush");

  const [screen, setScreen] = useState("challenges");
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [evaluating, setEvaluating] = useState(false);
  const [message, setMessage] = useState("");

  const challenges = CHALLENGES[ageGroup] || CHALLENGES["4-6"];
  const challenge = challenges[challengeIndex];

  useEffect(() => {
    setColor(cfg.c[0]);
    setSize(cfg.s[0]);
    setTool("brush");
    setScreen("challenges");
    setChallengeIndex(0);
    setResult(null);
    undoStack.current = [];
    clearCanvas();
  }, [ageGroup]);

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

    if (undoStack.current.length > 30) {
      undoStack.current.shift();
    }
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

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
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
      const stamp = tool.replace("stamp:", "");
      ctx.font = "72px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(stamp, x, y);
      return;
    }

    drawing.current = true;
    canvas.setPointerCapture(e.pointerId);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = tool === "eraser" ? "#FFFFFF" : color;
    ctx.lineWidth = tool === "eraser" ? size * 3 : size;

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

  function stopDrawing() {
    drawing.current = false;
  }

  function undo() {
    const canvas = canvasRef.current;
    if (!canvas || undoStack.current.length === 0) return;

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

  function saveDrawing() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "kiko-my-artwork.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function startChallenge(index) {
    setChallengeIndex(index);
    setResult(null);
    setMessage("");
    undoStack.current = [];
    clearCanvas();
    setColor(cfg.c[0]);
    setSize(cfg.s[0]);
    setTool("brush");
    setScreen("drawing");
  }

  function hasDrawing() {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    const ctx = canvas.getContext("2d");
    const pixels = ctx.getImageData(
      0, 0, canvas.width, canvas.height
    ).data;

    for (let i = 0; i < pixels.length; i += 4) {
      if (
        pixels[i] < 245 ||
        pixels[i + 1] < 245 ||
        pixels[i + 2] < 245
      ) {
        return true;
      }
    }

    return false;
  }

  async function evaluateDrawing() {
    const canvas = canvasRef.current;

    if (!canvas || !hasDrawing()) {
      setMessage(labels.noDrawing);
      return;
    }

    setEvaluating(true);
    setMessage("");

    const image = canvas.toDataURL("image/png");

    try {
      const response = await fetch(`${API_URL}/api/evaluate-drawing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image,
          challenge: challenge.title[selectedLanguage] || challenge.title.en,
          description:
            challenge.description[selectedLanguage] ||
            challenge.description.en,
          expected_elements: challenge.elements,
          age_group: ageGroup,
          language: selectedLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error("Cloud evaluation unavailable");
      }

      const data = await response.json();

      const stars = Math.max(
        1,
        Math.min(5, Number(data.stars) || 1)
      );

      setResult({
        stars,
        feedback: data.feedback || "Wonderful effort! Keep creating!",
        detectedElements: data.detected_elements || [],
        mode: "cloud",
      });

    } catch (error) {
      // Offline fallback: participation feedback only.
      // This does not claim to understand the actual drawing.
      setResult({
        stars: 1,
        feedback: labels.offlineMessage,
        detectedElements: [],
        mode: "offline",
      });
    } finally {
      setEvaluating(false);
      setScreen("result");
    }
  }

  function nextChallenge() {
    const nextIndex = (challengeIndex + 1) % challenges.length;
    startChallenge(nextIndex);
  }

  return (
    <PageShell
      ageGroup={ageGroup}
      language={selectedLanguage}
      icon="🎨"
      title={labels.title}
      onBack={onBack}
    >
      {/* CHALLENGE LIST */}
      {screen === "challenges" && (
        <div className="play-challenges">

          <div className="kp-card challenge-intro">
            <div style={{ fontSize: "45px", textAlign: "center" }}>
              🏆
            </div>

            <h2 style={{ textAlign: "center" }}>
              {labels.challenges}
            </h2>

            <p style={{ textAlign: "center" }}>
              {labels.challengeDesc}
            </p>
          </div>

          <div className="challenge-list">
            {challenges.map((item, index) => (
              <div className="kp-card challenge-card" key={item.id}>
                <div style={{ fontSize: "35px" }}>
                  {["☀️", "🌸", "🏡", "🌈", "🚀"][index % 5]}
                </div>

                <h3>
                  {item.title[selectedLanguage] || item.title.en}
                </h3>

                <p>
                  {item.description[selectedLanguage] ||
                    item.description.en}
                </p>

                <small>
                  {labels.difficulty}: {item.difficulty}
                </small>

                <button
                  className="kp-btn"
                  onClick={() => startChallenge(index)}
                  style={{ marginTop: "12px" }}
                >
                  🎯 {labels.start}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DRAWING SCREEN */}
      {screen === "drawing" && (
        <div className="play-drawing">

          <div className="kp-card active-challenge">
            <h3>🏆 {labels.task}</h3>

            <h2>
              {challenge.title[selectedLanguage] ||
                challenge.title.en}
            </h2>

            <p>
              {challenge.description[selectedLanguage] ||
                challenge.description.en}
            </p>

            <small>
              {labels.difficulty}: {challenge.difficulty}
            </small>

            <button
              className="kp-btn alt"
              onClick={() => setScreen("challenges")}
              style={{ display: "block", marginTop: "12px" }}
            >
              ← {labels.back}
            </button>
          </div>

          <div className="play-toolbar">

            <h3>{labels.colours}</h3>

            <div className="kp-row">
              {cfg.c.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`kp-sw ${
                    color === c && tool === "brush" ? "selected" : ""
                  }`}
                  style={{ background: c }}
                  aria-label={`Colour ${c}`}
                  onClick={() => {
                    setColor(c);
                    setTool("brush");
                  }}
                />
              ))}
            </div>

            <h3>
              {labels.size}: {size}px
            </h3>

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

              <span
                className="brush-preview"
                style={{
                  width: `${Math.max(size, 4)}px`,
                  height: `${Math.max(size, 4)}px`,
                  backgroundColor: color,
                }}
              />
            </div>

            <div className="kp-row">
              {cfg.s.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`kp-btn alt ${
                    size === s ? "selected" : ""
                  }`}
                  onClick={() => setSize(s)}
                >
                  {size === s ? "✓ " : "● "}{s}
                </button>
              ))}
            </div>

            <h3>{labels.shapes}</h3>

            <div className="kp-row">
              {SHAPES.map((shape) => (
                <button
                  key={shape.id}
                  type="button"
                  className={`kp-btn alt ${
                    tool === `shape:${shape.id}` ? "selected" : ""
                  }`}
                  onClick={() => setTool(`shape:${shape.id}`)}
                >
                  <span style={{ fontSize: "22px" }}>
                    {shape.icon}
                  </span>
                  {labels[shape.id]}
                </button>
              ))}
            </div>

            {cfg.st.length > 0 && (
              <>
                <h3>{labels.stamps}</h3>

                <div className="kp-row">
                  {cfg.st.map((stamp) => (
                    <button
                      key={stamp}
                      type="button"
                      className={`kp-btn alt ${
                        tool === `stamp:${stamp}` ? "selected" : ""
                      }`}
                      onClick={() => setTool(`stamp:${stamp}`)}
                    >
                      {stamp}
                    </button>
                  ))}
                </div>
              </>
            )}

            <div className="kp-row play-tools">
              <button
                className={`kp-btn alt ${
                  tool === "brush" ? "selected" : ""
                }`}
                onClick={() => setTool("brush")}
              >
                {labels.brush}
              </button>

              <button
                className={`kp-btn alt ${
                  tool === "eraser" ? "selected" : ""
                }`}
                onClick={() => setTool("eraser")}
              >
                {labels.eraser}
              </button>

              <button className="kp-btn alt" onClick={undo}>
                {labels.undo}
              </button>

              <button className="kp-btn alt" onClick={clearDrawing}>
                {labels.clear}
              </button>

              <button className="kp-btn" onClick={saveDrawing}>
                {labels.save}
              </button>
            </div>
          </div>

          <div className="play-canvas-section">
            <h3>{labels.canvas}</h3>

            <canvas
              ref={canvasRef}
              width="800"
              height="480"
              className="play-canvas"
              style={{ touchAction: "none" }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={stopDrawing}
              onPointerCancel={stopDrawing}
              onLostPointerCapture={stopDrawing}
            />
          </div>

          {message && (
            <div className="kp-card" role="alert">
              {message}
            </div>
          )}

          <button
            className="kp-btn evaluate-button"
            onClick={evaluateDrawing}
            disabled={evaluating}
          >
            {evaluating ? labels.evaluating : labels.submit}
          </button>
        </div>
      )}

      {/* RESULT SCREEN */}
      {screen === "result" && result && (
        <div className="kp-card drawing-result">

          <div style={{ fontSize: "55px", textAlign: "center" }}>
            {result.stars >= 4 ? "🏆" : "🌟"}
          </div>

          <h2 style={{ textAlign: "center" }}>
            {labels.result}
          </h2>

          <div className="result-stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>
                {i < result.stars ? "⭐" : "☆"}
              </span>
            ))}
          </div>

          <h3 style={{ textAlign: "center" }}>
            {labels.stars}: {result.stars}/5
          </h3>

          <div className="kp-card">
            <p>{result.feedback}</p>

            {result.detectedElements.length > 0 && (
              <>
                <strong>
                  {selectedLanguage === "kn"
                    ? "ಗುರುತಿಸಿದ ಅಂಶಗಳು"
                    : selectedLanguage === "hi"
                    ? "पहचानी गई चीज़ें"
                    : "Things KIKO noticed"}
                </strong>

                <p>{result.detectedElements.join(", ")}</p>
              </>
            )}
          </div>

          <div className="evaluation-mode">
            {result.mode === "cloud"
              ? `☁️ ${labels.online}`
              : `📴 ${labels.offline}`}
          </div>

          <button
            className="kp-btn"
            onClick={nextChallenge}
          >
            🎯 {labels.again}
          </button>

          <button
            className="kp-btn alt"
            onClick={() => setScreen("challenges")}
          >
            {labels.back}
          </button>
        </div>
      )}
    </PageShell>
  );
}
