import { GoogleGenAI } from "@google/genai";

export interface ProjectFile {
  name: string;
  language: "typescript" | "html" | "css" | "javascript" | "json" | "markdown";
  path: string;
  content: string;
}

export interface GeneratedProject {
  id: string;
  title: string;
  titleUrdu: string;
  description: string;
  category: string;
  framework: string;
  files: ProjectFile[];
}

export const PRESET_BLUEPRINTS: GeneratedProject[] = [
  {
    id: "ecommerce_mart",
    title: "CyberMart E-Commerce Store",
    titleUrdu: "آن لائن ای کامرس اسٹور مع شاپنگ کارٹ",
    description: "مکمل ای کامرس ویب سائٹ مع پروڈکٹ لسٹنگ، سرچ، کارٹ مینیجر اور چیک آؤٹ سسٹم۔",
    category: "Full-Stack Web App",
    framework: "React 19 + Tailwind CSS",
    files: [
      {
        name: "App.tsx",
        path: "src/App.tsx",
        language: "typescript",
        content: `import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Quantum Cyber Drone X9", price: 450, category: "Drones", image: "🛸", rating: 4.9 },
  { id: 2, name: "Holographic Smart Glasses", price: 299, category: "Wearables", image: "🕶️", rating: 4.8 },
  { id: 3, name: "Tactical Biometric Smartwatch", price: 180, category: "Wearables", image: "⌚", rating: 4.7 },
  { id: 4, name: "Neural Audio Pods Pro", price: 120, category: "Audio", image: "🎧", rating: 4.9 },
  { id: 5, name: "Arc Reactor Power Bank 50k", price: 85, category: "Power", image: "⚡", rating: 5.0 },
  { id: 6, name: "Cyber Armor Shield Backpack", price: 140, category: "Gear", image: "🎒", rating: 4.6 }
];

export default function App() {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const filtered = PRODUCTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#070b14] text-white font-sans p-4 sm:p-8">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-500/30 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-cyan-400 tracking-wider flex items-center gap-2">
            <span>⚡</span> CYBERMART // آن لائن اسٹور
          </h1>
          <p className="text-xs text-gray-400">Created by Admin Siraj / آر ایس ای کامرس انجن</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="تلاش کریں (Search products)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1.5 bg-black/60 border border-cyan-500/40 rounded text-sm text-cyan-300 focus:outline-none focus:border-cyan-400"
          />
          <div className="px-3 py-1.5 bg-cyan-950 border border-cyan-500 rounded text-cyan-400 font-bold text-sm">
            🛒 کارٹ: ({cart.reduce((s, i) => s + i.quantity, 0)}) - \${totalPrice}
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Products */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="p-4 bg-gray-900/80 border border-cyan-500/30 rounded-lg hover:border-cyan-400 transition-all">
              <div className="text-4xl mb-2 text-center">{item.image}</div>
              <h3 className="font-bold text-white text-base">{item.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-cyan-400 font-black text-lg">\${item.price}</span>
                <span className="text-xs text-yellow-400">★ {item.rating}</span>
              </div>
              <button
                onClick={() => addToCart(item)}
                className="w-full mt-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded text-xs uppercase tracking-wider cursor-pointer"
              >
                + Add to Cart (خریدیں)
              </button>
            </div>
          ))}
        </div>

        {/* Cart Drawer */}
        <div className="p-4 bg-black/70 border border-cyan-500/40 rounded-lg h-fit">
          <h2 className="text-lg font-bold text-cyan-300 mb-3 border-b border-cyan-500/20 pb-2">
            شاپنگ کارٹ (Shopping Cart)
          </h2>
          {cart.length === 0 ? (
            <p className="text-gray-500 text-xs text-center py-6">کارٹ خالی ہے (Cart is empty)</p>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center text-xs border-b border-gray-800 pb-2">
                  <div>
                    <div className="font-semibold text-white">{item.product.name}</div>
                    <div className="text-gray-400">\${item.product.price} × {item.quantity}</div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-400 hover:text-red-300 cursor-pointer font-bold ml-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <div className="pt-2 flex justify-between font-bold text-white text-sm">
                <span>کل رقم (Total):</span>
                <span className="text-cyan-400">\${totalPrice}</span>
              </div>
              <button
                onClick={() => alert("آرڈر موصول ہو گیا۔ شکریہ ایڈمن سراج!")}
                className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded text-xs uppercase tracking-wider cursor-pointer"
              >
                چیک آؤٹ مکمل کریں (Proceed Checkout)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}`,
      },
      {
        name: "index.html",
        path: "index.html",
        language: "html",
        content: `<!DOCTYPE html>
<html lang="ur" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CyberMart - E-Commerce Store by Siraj</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-black text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
      },
      {
        name: "styles.css",
        path: "src/styles.css",
        language: "css",
        content: `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
  background-color: #050811;
}`,
      },
      {
        name: "package.json",
        path: "package.json",
        language: "json",
        content: `{
  "name": "cybermart-ecommerce",
  "version": "1.0.0",
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.546.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}`,
      },
    ],
  },
  {
    id: "portfolio_pro",
    title: "Siraj Premium Cyber Portfolio",
    titleUrdu: "پروفیشنل پرسنل پورٹ فولیو ویب سائٹ",
    description: "3D سائبر گرافکس، پروجیکٹس گیلری، اسکلز میٹر اور لائیو کانٹیکٹ فارم والی جدید ویب سائٹ۔",
    category: "Portfolio Website",
    framework: "React 19 + Tailwind CSS",
    files: [
      {
        name: "App.tsx",
        path: "src/App.tsx",
        language: "typescript",
        content: `import React, { useState } from "react";

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("about");

  const skills = [
    { name: "Full-Stack Development (React, Node.js)", level: 98 },
    { name: "Artificial Intelligence & LLMs", level: 95 },
    { name: "Cybersecurity & System Defense", level: 92 },
    { name: "3D Graphics & WebGL / HUD UI", level: 96 }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white p-6 sm:p-12 font-mono">
      {/* Hero */}
      <div className="max-w-4xl mx-auto border border-cyan-500/40 p-8 rounded-xl bg-cyan-950/20 shadow-[0_0_30px_rgba(0,240,255,0.15)]">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-28 h-28 rounded-full border-2 border-cyan-400 bg-cyan-900/50 flex items-center justify-center text-4xl shadow-[0_0_20px_#00f0ff]">
            ⚡
          </div>
          <div>
            <span className="px-2 py-0.5 bg-cyan-500 text-black text-xs font-black rounded uppercase">
              LEAD ARCHITECT
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">SIRAJ (سراج)</h1>
            <p className="text-cyan-400 text-sm mt-1">Full-Stack AI Developer & Cyber Systems Commander</p>
            <p className="text-xs text-gray-400 mt-2">
              جدید ترین ویب ایپس، موبائل ایپلی کیشنز اور مصنوعی ذہانت کے سسٹمز کا بانی اور ڈویلپر۔
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-8 border-t border-cyan-500/30 pt-6">
          <h2 className="text-sm font-bold text-cyan-300 uppercase tracking-widest mb-4">
            CORE CAPABILITIES // تکنیکی صلاحیتیں
          </h2>
          <div className="space-y-3">
            {skills.map((s, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{s.name}</span>
                  <span className="text-cyan-400 font-bold">{s.level}%</span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full" style={{ width: \`\${s.level}%\` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-8 flex flex-wrap gap-4 justify-between items-center bg-black/60 p-4 rounded border border-cyan-500/30">
          <div>
            <div className="text-xs text-cyan-400 font-bold">READY TO DEPLOY YOUR PROJECT?</div>
            <div className="text-xs text-gray-400">اپنے نئے پروجیکٹ کے لیے رابطہ کریں: sirajdil21@gmail.com</div>
          </div>
          <button
            onClick={() => alert("شکریہ! سراج آپ سے جلد رابطہ کریں گے۔")}
            className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs rounded uppercase tracking-wider cursor-pointer"
          >
            رابطہ کریں (Get in Touch)
          </button>
        </div>
      </div>
    </div>
  );
}`,
      },
      {
        name: "index.html",
        path: "index.html",
        language: "html",
        content: `<!DOCTYPE html>
<html lang="ur">
  <head>
    <meta charset="UTF-8" />
    <title>Siraj - Lead AI & Cyber Architect Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
      },
      {
        name: "styles.css",
        path: "src/styles.css",
        language: "css",
        content: `body { background-color: #030712; color: white; margin: 0; font-family: monospace; }`,
      },
    ],
  },
  {
    id: "chat_app",
    title: "Tactical Live Chat & Messenger",
    titleUrdu: "لائیو چیٹ و میسنجر ایپلیکیشن",
    description: "انسٹنٹ میسجنگ، ایموجی ری ایکشنز اور اینڈ ٹو اینڈ انکرپٹڈ سیکیورٹی والی چیٹ ایپ۔",
    category: "Communication App",
    framework: "React 19 + WebSockets",
    files: [
      {
        name: "App.tsx",
        path: "src/App.tsx",
        language: "typescript",
        content: `import React, { useState } from "react";

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  isSelf: boolean;
}

export default function ChatApp() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "Admin Siraj", text: "السلام علیکم! چیٹ سسٹم آن لائن ہے۔", time: "10:30 PM", isSelf: true },
    { id: 2, sender: "R.S. Core", text: "وعلیکم السلام سراج! سیکیور چینل فعال ہے۔", time: "10:31 PM", isSelf: false },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: "Admin Siraj",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Auto reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "R.S. Core",
          text: "میسج موصول ہوا: " + input + " [ACKNOWLEDGED]",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isSelf: false
        }
      ]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#060d17] text-white flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg bg-[#0a1526] border border-cyan-500/40 rounded-xl overflow-hidden flex flex-col h-[520px] shadow-2xl">
        {/* Header */}
        <div className="p-4 bg-[#0d1e38] border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <h2 className="font-bold text-sm text-cyan-300">R.S. SECURE COMMUNICATOR</h2>
              <p className="text-[10px] text-gray-400">اینڈ ٹو اینڈ انکرپٹڈ چیٹ</p>
            </div>
          </div>
          <span className="text-xs bg-cyan-900/60 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/40">
            256-BIT AES
          </span>
        </div>

        {/* Message Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={\`flex flex-col \${m.isSelf ? "items-end" : "items-start"}\`}>
              <div className="text-[10px] text-gray-400 mb-0.5">{m.sender} • {m.time}</div>
              <div className={\`px-3 py-2 rounded-lg text-xs max-w-[80%] \${
                m.isSelf
                  ? "bg-cyan-600 text-white rounded-br-none"
                  : "bg-gray-800 text-cyan-200 rounded-bl-none border border-cyan-500/20"
              }\`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={sendMessage} className="p-3 bg-[#0d1e38] border-t border-cyan-500/30 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="میسج ٹائپ کریں (Type a message)..."
            className="flex-1 bg-black/60 border border-cyan-500/40 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded cursor-pointer"
          >
            بھیجیں
          </button>
        </form>
      </div>
    </div>
  );
}`,
      },
    ],
  },
  {
    id: "retro_game",
    title: "Cyber Reflex Shooter 2026",
    titleUrdu: "سائبر کینوس ایکشن گیم",
    description: "ایچ ٹی ایم ایل 5 کینوس اور جاوا اسکرپٹ پر بنی فوری کھیلنے والی سائبر گیم۔",
    category: "Web Game",
    framework: "HTML5 Canvas + React",
    files: [
      {
        name: "App.tsx",
        path: "src/App.tsx",
        language: "typescript",
        content: `import React, { useState, useEffect, useRef } from "react";

export default function CyberGame() {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [target, setTarget] = useState({ x: 50, y: 50 });

  const moveTarget = () => {
    const x = Math.floor(Math.random() * 80) + 10;
    const y = Math.floor(Math.random() * 70) + 15;
    setTarget({ x, y });
  };

  const handleClickTarget = () => {
    setScore((s) => s + 10);
    moveTarget();
  };

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono p-6 flex flex-col items-center justify-center select-none">
      <div className="w-full max-w-md border-2 border-cyan-500 p-4 rounded-lg bg-cyan-950/20 text-center relative h-[450px] flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-black text-white">CYBER TARGET LOCK // ریفلیکس گیم</h1>
          <p className="text-xs text-gray-400 mt-1">ٹارگٹ پر کلک کر کے اسکور بنائیں</p>
          <div className="text-2xl font-black text-emerald-400 mt-2">اسکور: {score}</div>
        </div>

        {/* Target Area */}
        <div className="relative w-full h-[280px] bg-black/60 border border-cyan-500/30 rounded overflow-hidden">
          <button
            onClick={handleClickTarget}
            style={{ left: \`\${target.x}%\`, top: \`\${target.y}%\` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-500 hover:bg-red-400 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-[0_0_20px_#ff0055] transition-all cursor-crosshair active:scale-90"
          >
            🎯 +10
          </button>
        </div>

        <button
          onClick={() => { setScore(0); moveTarget(); }}
          className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase rounded tracking-wider cursor-pointer"
        >
          نیا کھیل شروع کریں (Restart)
        </button>
      </div>
    </div>
  );
}`,
      },
    ],
  },
  {
    id: "backend_api",
    title: "Node.js & Express REST API Server",
    titleUrdu: "نوڈ جے ایس ایکسپریس بیک اینڈ سرور",
    description: "جے ایس او این اینڈ پوائنٹس، روٹس، بیئرر ٹوکن سیکیورٹی اور کرڈ آپریٹنگ سسٹم۔",
    category: "Backend API Service",
    framework: "Node.js + Express + TypeScript",
    files: [
      {
        name: "server.ts",
        path: "server/server.ts",
        language: "typescript",
        content: `import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

// Database Simulation
const database = [
  { id: 1, title: "Siraj Mission Alpha", status: "completed", priority: "high" },
  { id: 2, title: "R.S. Neural Core Sync", status: "active", priority: "critical" },
  { id: 3, title: "Defense Radar Uplink", status: "pending", priority: "medium" }
];

// GET All Items
app.get("/api/missions", (req, res) => {
  res.json({
    success: true,
    author: "Admin Siraj",
    timestamp: new Date().toISOString(),
    data: database
  });
});

// POST Create Item
app.post("/api/missions", (req, res) => {
  const { title, priority } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Mission title is required" });
  }
  const newMission = {
    id: database.length + 1,
    title,
    status: "active",
    priority: priority || "normal"
  };
  database.push(newMission);
  res.status(201).json({ success: true, mission: newMission });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(\`⚡ Server listening on http://0.0.0.0:\${PORT}\`);
});`,
      },
      {
        name: "package.json",
        path: "package.json",
        language: "json",
        content: `{
  "name": "siraj-backend-api",
  "version": "1.0.0",
  "main": "server.ts",
  "scripts": {
    "start": "tsx server.ts"
  },
  "dependencies": {
    "express": "^4.21.2"
  },
  "devDependencies": {
    "tsx": "^4.21.0",
    "typescript": "^5.8.2"
  }
}`,
      },
    ],
  },
];

export async function generateProjectWithGemini(userPrompt: string): Promise<GeneratedProject> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return createFallbackProjectFromPrompt(userPrompt);
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const promptText = `You are R.S. AI Code Studio, created for Admin Siraj (سراج).
The user wants to generate a complete, working, production-ready web application or website:
Prompt: "${userPrompt}"

Generate a complete JSON response matching this TypeScript schema:
{
  "title": string,
  "titleUrdu": string,
  "description": string,
  "category": string,
  "framework": "React 19 + Tailwind CSS",
  "files": [
    {
      "name": "App.tsx",
      "path": "src/App.tsx",
      "language": "typescript",
      "content": "Full working TypeScript React code using Tailwind CSS for UI"
    },
    {
      "name": "index.html",
      "path": "index.html",
      "language": "html",
      "content": "Full HTML5 document"
    },
    {
      "name": "styles.css",
      "path": "src/styles.css",
      "language": "css",
      "content": "Full Tailwind and CSS rules"
    }
  ]
}

Return ONLY clean, valid raw JSON without markdown backticks or commentary so it can be parsed with JSON.parse.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptText,
    });

    const rawText = response.text || "";
    const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return {
      id: "gen_" + Date.now(),
      title: parsed.title || "Custom Generated App",
      titleUrdu: parsed.titleUrdu || "اپنی مرضی کی ایپلیکیشن",
      description: parsed.description || "ایڈمن سراج کی پرامپٹ پر تیار کردہ مکمل کوڈ اسٹرکچر۔",
      category: parsed.category || "Custom Application",
      framework: parsed.framework || "React 19 + Tailwind CSS",
      files: parsed.files || [],
    };
  } catch (err) {
    console.error("Gemini code generation error, using fallback template:", err);
    return createFallbackProjectFromPrompt(userPrompt);
  }
}

function createFallbackProjectFromPrompt(userPrompt: string): GeneratedProject {
  const title = userPrompt.slice(0, 30);
  return {
    id: "gen_" + Date.now(),
    title: `${title} Application`,
    titleUrdu: `${userPrompt} - ایپ اسٹرکچر`,
    description: `ایڈمن سراج کے لیے خصوصی طور پر تیار کردہ مکمل فنکشنل کوڈ اسٹرکچر برائے "${userPrompt}"۔`,
    category: "Custom Web Application",
    framework: "React 19 + Tailwind CSS",
    files: [
      {
        name: "App.tsx",
        path: "src/App.tsx",
        language: "typescript",
        content: `import React, { useState } from "react";

export default function CustomApp() {
  const [items, setItems] = useState<string[]>(["آئٹم 1", "آئٹم 2", "آئٹم 3"]);
  const [newItem, setNewItem] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    setItems((prev) => [...prev, newItem.trim()]);
    setNewItem("");
  };

  return (
    <div className="min-h-screen bg-[#070e1c] text-white p-6 font-sans flex flex-col items-center">
      <div className="w-full max-w-xl bg-[#0c1930] border border-cyan-500/40 rounded-xl p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3 mb-4">
          <div>
            <h1 className="text-xl font-black text-cyan-400 tracking-wider">
              ${userPrompt.toUpperCase()}
            </h1>
            <p className="text-xs text-gray-400">Created by Admin Siraj // R.S. AI Code Studio</p>
          </div>
          <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 text-xs font-bold rounded border border-cyan-500/40">
            ACTIVE v1.0
          </span>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAdd} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="نیا ڈیٹا شامل کریں (Add new item)..."
            className="flex-1 px-3 py-2 bg-black/60 border border-cyan-500/40 rounded text-sm text-white focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase rounded cursor-pointer transition-all"
          >
            + Add
          </button>
        </form>

        {/* List of items */}
        <div className="space-y-2">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-3 bg-cyan-950/30 border border-cyan-500/20 rounded hover:border-cyan-400 transition-all"
            >
              <span className="text-sm font-medium text-white">{item}</span>
              <button
                onClick={() => setItems((prev) => prev.filter((_, i) => i !== idx))}
                className="text-xs text-red-400 hover:text-red-300 cursor-pointer font-bold px-2 py-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
      },
      {
        name: "index.html",
        path: "index.html",
        language: "html",
        content: `<!DOCTYPE html>
<html lang="ur">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${userPrompt} - R.S. Code Studio</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-black text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
      },
      {
        name: "styles.css",
        path: "src/styles.css",
        language: "css",
        content: `body { background-color: #070e1c; color: white; margin: 0; font-family: system-ui, sans-serif; }`,
      },
    ],
  };
}
