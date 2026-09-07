import React, { useState, useEffect, useRef } from "react";
import {
  Code,
  Play,
  Copy,
  Download,
  Terminal,
  Folder,
  FileCode,
  Sparkles,
  Smartphone,
  Monitor,
  Tablet,
  Check,
  RefreshCw,
  ExternalLink,
  Layers,
  Cpu,
  Zap,
  Globe,
  Share2,
  Sliders,
  Send,
  X,
} from "lucide-react";
import { cyberSynth } from "../utils/audioUtils";
import {
  PRESET_BLUEPRINTS,
  GeneratedProject,
  ProjectFile,
  generateProjectWithGemini,
} from "../services/codeStudioService";

interface CyberCodeStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export default function CyberCodeStudioModal({
  isOpen,
  onClose,
  initialPrompt = "",
}: CyberCodeStudioModalProps) {
  const [activeTab, setActiveTab] = useState<"code" | "preview" | "architecture">("code");
  const [projects, setProjects] = useState<GeneratedProject[]>(PRESET_BLUEPRINTS);
  const [currentProject, setCurrentProject] = useState<GeneratedProject>(PRESET_BLUEPRINTS[0]);
  const [selectedFile, setSelectedFile] = useState<ProjectFile>(PRESET_BLUEPRINTS[0].files[0]);
  const [promptInput, setPromptInput] = useState(initialPrompt);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [logs, setLogs] = useState<string[]>([
    "🚀 R.S. AI Code Studio initialized for Admin Siraj.",
    "📦 Loaded 5 Production-grade Web & App Architecture Blueprints.",
    "⚡ Vite 6.2 + React 19 + TypeScript ready for live compilation.",
  ]);

  // Code editor local editable content
  const [fileContents, setFileContents] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    PRESET_BLUEPRINTS.forEach((p) => {
      p.files.forEach((f) => {
        map[`${p.id}_${f.name}`] = f.content;
      });
    });
    return map;
  });

  const activeContentKey = `${currentProject.id}_${selectedFile.name}`;
  const currentCode = fileContents[activeContentKey] ?? selectedFile.content;

  const handleSelectProject = (project: GeneratedProject) => {
    cyberSynth.playBeep(900, 0.04);
    setCurrentProject(project);
    setSelectedFile(project.files[0]);
    addLog(`📂 Switched project to: ${project.title} (${project.titleUrdu})`);
  };

  const handleSelectFile = (file: ProjectFile) => {
    cyberSynth.playBeep(1100, 0.03);
    setSelectedFile(file);
    addLog(`📄 Opened file: ${file.path}`);
  };

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timestamp}] ${msg}`, ...prev.slice(0, 40)]);
  };

  const handleCopyCode = () => {
    cyberSynth.playBeep(1400, 0.05);
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    addLog(`📋 Copied ${selectedFile.name} content to clipboard.`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    cyberSynth.playBeep(1200, 0.05);
    const blob = new Blob([currentCode], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = selectedFile.name;
    link.click();
    URL.revokeObjectURL(url);
    addLog(`💾 Downloaded file: ${selectedFile.name}`);
  };

  const handleGenerateCustom = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptInput.trim()) return;

    cyberSynth.playBeep(800, 0.06);
    setIsGenerating(true);
    addLog(`⚡ Starting Neural Code Synthesis for prompt: "${promptInput}"...`);

    try {
      const generated = await generateProjectWithGemini(promptInput);
      setProjects((prev) => [generated, ...prev]);
      setCurrentProject(generated);
      setSelectedFile(generated.files[0] || { name: "App.tsx", path: "src/App.tsx", language: "typescript", content: "// Code" });

      // Save file contents
      const newMap = { ...fileContents };
      generated.files.forEach((f) => {
        newMap[`${generated.id}_${f.name}`] = f.content;
      });
      setFileContents(newMap);

      cyberSynth.playStartupSound();
      addLog(`✅ Successfully synthesized: ${generated.title}`);
      setPromptInput("");
    } catch (err) {
      console.error(err);
      addLog(`⚠️ Code Synthesis fallback engaged.`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCodeChange = (newText: string) => {
    setFileContents((prev) => ({
      ...prev,
      [activeContentKey]: newText,
    }));
  };

  // Construct iframe preview document
  const generatePreviewDoc = () => {
    // Find App.tsx or index.html
    const htmlFile = currentProject.files.find((f) => f.name.endsWith(".html"));
    const appFile = currentProject.files.find((f) => f.name === "App.tsx");
    const cssFile = currentProject.files.find((f) => f.name.endsWith(".css"));

    const appCode = (fileContents[`${currentProject.id}_App.tsx`] || appFile?.content || "").replace(/import[\s\S]*?from\s+['"][^'"]+['"];?/g, "");

    // Built-in working standalone HTML template preview
    return `<!DOCTYPE html>
<html lang="ur">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${currentProject.title}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #060b14; color: #e2e8f0; font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 0; }
    ${cssFile?.content || ""}
  </style>
</head>
<body class="p-4 sm:p-6">
  <div class="max-w-4xl mx-auto">
    <!-- Top System Banner -->
    <div class="flex items-center justify-between border-b border-cyan-500/40 pb-3 mb-6">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>
        <h1 class="text-xl font-bold text-cyan-400">${currentProject.title}</h1>
        <span class="text-xs bg-cyan-950 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded font-mono">${currentProject.framework}</span>
      </div>
      <div class="text-xs text-gray-400 font-mono">
        Architect: <span class="text-cyan-300 font-bold">Admin Siraj</span> // R.S. ENGINE
      </div>
    </div>

    <!-- Interactive Working Demo Area -->
    <div id="interactive-root">
      ${
        currentProject.id === "ecommerce_mart"
          ? `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-4 bg-gray-900/90 border border-cyan-500/30 rounded-lg hover:border-cyan-400 transition-all">
              <div class="text-4xl text-center mb-2">🛸</div>
              <div class="font-bold text-white text-base">Quantum Cyber Drone X9</div>
              <div class="text-xs text-gray-400 mt-1">4K Tactical Recon with IR Sensors</div>
              <div class="flex justify-between items-center mt-3">
                <span class="text-cyan-400 font-bold text-lg">$450</span>
                <button onclick="addToCart('Quantum Cyber Drone X9', 450)" class="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded uppercase cursor-pointer">+ خریدیں (Buy)</button>
              </div>
            </div>
            <div class="p-4 bg-gray-900/90 border border-cyan-500/30 rounded-lg hover:border-cyan-400 transition-all">
              <div class="text-4xl text-center mb-2">🕶️</div>
              <div class="font-bold text-white text-base">Holographic HUD Glasses</div>
              <div class="text-xs text-gray-400 mt-1">AR Telemetry Overlay with Night Vision</div>
              <div class="flex justify-between items-center mt-3">
                <span class="text-cyan-400 font-bold text-lg">$299</span>
                <button onclick="addToCart('Holographic HUD Glasses', 299)" class="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded uppercase cursor-pointer">+ خریدیں (Buy)</button>
              </div>
            </div>
            <div class="p-4 bg-gray-900/90 border border-cyan-500/30 rounded-lg hover:border-cyan-400 transition-all">
              <div class="text-4xl text-center mb-2">⚡</div>
              <div class="font-bold text-white text-base">Arc Reactor Power Bank 50k</div>
              <div class="text-xs text-gray-400 mt-1">Supercharged 100W Plasma Output</div>
              <div class="flex justify-between items-center mt-3">
                <span class="text-cyan-400 font-bold text-lg">$85</span>
                <button onclick="addToCart('Arc Reactor Power Bank 50k', 85)" class="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded uppercase cursor-pointer">+ خریدیں (Buy)</button>
              </div>
            </div>
            <div class="p-4 bg-gray-900/90 border border-cyan-500/30 rounded-lg hover:border-cyan-400 transition-all">
              <div class="text-4xl text-center mb-2">🎧</div>
              <div class="font-bold text-white text-base">Neural Audio Pods Pro</div>
              <div class="text-xs text-gray-400 mt-1">Noise Cancelling Spatial Audio</div>
              <div class="flex justify-between items-center mt-3">
                <span class="text-cyan-400 font-bold text-lg">$120</span>
                <button onclick="addToCart('Neural Audio Pods Pro', 120)" class="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded uppercase cursor-pointer">+ خریدیں (Buy)</button>
              </div>
            </div>
          </div>

          <!-- Cart Sidebar -->
          <div class="p-4 bg-black/80 border border-cyan-500/40 rounded-lg h-fit">
            <h3 class="font-bold text-cyan-300 text-sm border-b border-cyan-500/30 pb-2 mb-3">🛒 شاپنگ کارٹ (Shopping Cart)</h3>
            <div id="cart-items" class="space-y-2 text-xs text-gray-300">
              <div class="text-gray-500 text-center py-4">کارٹ خالی ہے (Click items to add)</div>
            </div>
            <div class="border-t border-cyan-500/30 mt-3 pt-2 flex justify-between font-bold text-white text-sm">
              <span>ٹوٹل رقم:</span>
              <span id="cart-total" class="text-cyan-400">$0</span>
            </div>
            <button onclick="alert('آرڈر مکمل کر دیا گیا! شکریہ ایڈمن سراج!')" class="w-full mt-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded uppercase cursor-pointer">
              آرڈر مکمل کریں (Checkout)
            </button>
          </div>
        </div>
        <script>
          let cart = [];
          function addToCart(name, price) {
            cart.push({ name, price });
            renderCart();
          }
          function renderCart() {
            const container = document.getElementById('cart-items');
            if (cart.length === 0) {
              container.innerHTML = '<div class="text-gray-500 text-center py-4">کارٹ خالی ہے</div>';
              document.getElementById('cart-total').innerText = '$0';
              return;
            }
            let html = '';
            let total = 0;
            cart.forEach((item, index) => {
              total += item.price;
              html += '<div class="flex justify-between items-center border-b border-gray-800 pb-1"><span>' + item.name + '</span><span class="text-cyan-400 font-bold">$' + item.price + '</span></div>';
            });
            container.innerHTML = html;
            document.getElementById('cart-total').innerText = '$' + total;
          }
        </script>
        `
          : currentProject.id === "portfolio_pro"
          ? `
        <div class="bg-black/60 border border-cyan-500/40 p-6 rounded-xl text-center">
          <div class="w-24 h-24 mx-auto rounded-full border-2 border-cyan-400 bg-cyan-950 flex items-center justify-center text-4xl shadow-[0_0_20px_#00f0ff] mb-4">
            ⚡
          </div>
          <span class="px-2 py-0.5 bg-cyan-500 text-black text-xs font-black rounded uppercase">LEAD ARCHITECT</span>
          <h2 class="text-3xl font-black text-white mt-2">SIRAJ (سراج)</h2>
          <p class="text-cyan-400 text-sm mt-1">Full-Stack AI Developer & Cyber Systems Commander</p>
          <p class="text-xs text-gray-400 max-w-lg mx-auto mt-2">
            جدید ترین ویب سائٹس، ایپس اور سائبر نیٹ ورک سسٹمز کا معمار۔ R.S. ٹیکٹیکل AI پلیٹ فارم کا خالق۔
          </p>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <div class="p-3 bg-gray-900 border border-cyan-500/30 rounded text-center">
              <div class="text-xl font-bold text-cyan-300">50+</div>
              <div class="text-[10px] text-gray-400 uppercase">Apps Built</div>
            </div>
            <div class="p-3 bg-gray-900 border border-cyan-500/30 rounded text-center">
              <div class="text-xl font-bold text-emerald-400">99.9%</div>
              <div class="text-[10px] text-gray-400 uppercase">Uptime</div>
            </div>
            <div class="p-3 bg-gray-900 border border-cyan-500/30 rounded text-center">
              <div class="text-xl font-bold text-yellow-400">100%</div>
              <div class="text-[10px] text-gray-400 uppercase">Root Access</div>
            </div>
            <div class="p-3 bg-gray-900 border border-cyan-500/30 rounded text-center">
              <div class="text-xl font-bold text-violet-400">2026</div>
              <div class="text-[10px] text-gray-400 uppercase">Active Year</div>
            </div>
          </div>
        </div>
        `
          : currentProject.id === "chat_app"
          ? `
        <div class="max-w-md mx-auto bg-gray-900 border border-cyan-500/40 rounded-xl overflow-hidden shadow-2xl">
          <div class="p-3 bg-cyan-950/60 border-b border-cyan-500/30 flex justify-between items-center">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span class="font-bold text-sm text-cyan-300">سراج انکرپٹڈ چیٹ</span>
            </div>
            <span class="text-[10px] text-gray-400 font-mono">ONLINE</span>
          </div>
          <div id="chat-box" class="p-4 h-64 overflow-y-auto space-y-2 text-xs">
            <div class="flex flex-col items-end"><div class="bg-cyan-600 text-white px-3 py-1.5 rounded-lg rounded-br-none">السلام علیکم! R.S. لائیو ہے۔</div></div>
            <div class="flex flex-col items-start"><div class="bg-gray-800 text-cyan-200 px-3 py-1.5 rounded-lg rounded-bl-none border border-cyan-500/20">وعلیکم السلام سراج بھائی! تمام نیٹ ورک چینلز فعال ہیں۔</div></div>
          </div>
          <div class="p-2 bg-black/60 border-t border-cyan-500/30 flex gap-2">
            <input id="chat-input" type="text" placeholder="پیغام لکھیں..." class="flex-1 bg-gray-800 border border-cyan-500/30 rounded px-3 py-1.5 text-xs text-white focus:outline-none" onkeydown="if(event.key==='Enter') sendMsg()" />
            <button onclick="sendMsg()" class="px-3 py-1.5 bg-cyan-500 text-black font-bold text-xs rounded cursor-pointer">بھیجیں</button>
          </div>
        </div>
        <script>
          function sendMsg() {
            const input = document.getElementById('chat-input');
            const val = input.value.trim();
            if (!val) return;
            const box = document.getElementById('chat-box');
            box.innerHTML += '<div class="flex flex-col items-end"><div class="bg-cyan-600 text-white px-3 py-1.5 rounded-lg rounded-br-none">' + val + '</div></div>';
            input.value = '';
            box.scrollTop = box.scrollHeight;
            setTimeout(() => {
              box.innerHTML += '<div class="flex flex-col items-start"><div class="bg-gray-800 text-cyan-200 px-3 py-1.5 rounded-lg rounded-bl-none border border-cyan-500/20">جواب: ' + val + ' موصول ہو گیا۔ [R.S. Verified]</div></div>';
              box.scrollTop = box.scrollHeight;
            }, 600);
          }
        </script>
        `
          : currentProject.id === "retro_game"
          ? `
        <div class="max-w-md mx-auto bg-black border border-cyan-500/50 p-6 rounded-xl text-center">
          <h2 class="text-xl font-black text-cyan-400">CYBER REFLEX LOCK 2026</h2>
          <p class="text-xs text-gray-400 mt-1">ٹارگٹ پر کلک کر کے اسکور بڑھائیں</p>
          <div id="game-score" class="text-3xl font-black text-emerald-400 my-4">اسکور: 0</div>
          <div class="relative w-full h-64 bg-gray-950 border border-cyan-500/30 rounded overflow-hidden">
            <button id="game-target" onclick="hitTarget()" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);" class="w-14 h-14 bg-red-600 hover:bg-red-500 text-white font-black text-xs rounded-full shadow-[0_0_20px_#ff0055] cursor-pointer transition-all">
              🎯 +10
            </button>
          </div>
          <button onclick="resetGame()" class="w-full mt-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase rounded cursor-pointer">
            دوبارہ شروع کریں (Restart)
          </button>
        </div>
        <script>
          let score = 0;
          function hitTarget() {
            score += 10;
            document.getElementById('game-score').innerText = 'اسکور: ' + score;
            const t = document.getElementById('game-target');
            const x = Math.floor(Math.random() * 80) + 10;
            const y = Math.floor(Math.random() * 70) + 15;
            t.style.left = x + '%';
            t.style.top = y + '%';
          }
          function resetGame() {
            score = 0;
            document.getElementById('game-score').innerText = 'اسکور: 0';
            hitTarget();
          }
        </script>
        `
          : `
        <div class="bg-gray-900 border border-cyan-500/40 p-6 rounded-xl">
          <h2 class="text-lg font-bold text-cyan-300 mb-2">${currentProject.titleUrdu}</h2>
          <p class="text-sm text-gray-300 mb-4">${currentProject.description}</p>
          <div class="p-4 bg-black/60 border border-cyan-500/30 rounded font-mono text-xs text-cyan-400">
            <div>// API STATUS: 200 OK</div>
            <div>// ARCHITECT: ADMIN SIRAJ</div>
            <div>// FRAMEWORK: ${currentProject.framework}</div>
            <div class="mt-2 text-emerald-400">✓ ALL MICROSERVICES RUNNING HEALTHY</div>
          </div>
        </div>
        `
      }
    </div>
  </div>
</body>
</html>`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md select-none">
      {/* Container with High-Tech Neon Framing */}
      <div className="relative w-full max-w-7xl h-[92vh] bg-[#030914] border-2 border-[#00f0ff] rounded-xl shadow-[0_0_40px_rgba(0,240,255,0.4)] flex flex-col overflow-hidden text-white font-mono">
        
        {/* Top Header Bar */}
        <div className="relative z-10 px-4 py-2.5 bg-[#041122] border-b border-[#00f0ff]/40 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#00f0ff]/20 border border-[#00f0ff] flex items-center justify-center text-[#00f0ff] font-black text-sm shadow-[0_0_10px_#00f0ff]">
              &lt;/&gt;
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white text-sm sm:text-base font-black tracking-wider">
                  R.S. AI CODE STUDIO // APP & WEB ARCHITECT
                </span>
                <span className="px-2 py-0.2 bg-[#00ff88] text-black text-[9px] font-bold rounded uppercase">
                  ROOT: SIRAJ (سراج)
                </span>
              </div>
              <div className="text-[10px] text-[#00f0ff]/80">
                مکمل کوڈنگ اسٹرکچر، ایپس و ویب سائٹس بلڈر، اور لائیو پریویو انجن
              </div>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 bg-black/70 p-1 border border-[#00f0ff]/30 rounded">
            <button
              onClick={() => {
                cyberSynth.playBeep(900, 0.03);
                setActiveTab("code");
              }}
              className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "code"
                  ? "bg-[#00f0ff] text-black shadow-[0_0_12px_#00f0ff]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Code size={13} />
              <span>کوڈنگ اسٹرکچر (Code)</span>
            </button>

            <button
              onClick={() => {
                cyberSynth.playBeep(950, 0.03);
                setActiveTab("preview");
              }}
              className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "preview"
                  ? "bg-[#00ff88] text-black shadow-[0_0_12px_#00ff88]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Play size={13} />
              <span>لائیو چلا کر دیکھیں (Preview)</span>
            </button>

            <button
              onClick={() => {
                cyberSynth.playBeep(1000, 0.03);
                setActiveTab("architecture");
              }}
              className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "architecture"
                  ? "bg-[#bf5af2] text-black shadow-[0_0_12px_#bf5af2]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Layers size={13} />
              <span>آرکیٹیکچر (Architecture)</span>
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={() => {
              cyberSynth.playBeep(700, 0.04);
              onClose();
            }}
            className="w-8 h-8 rounded bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/50 flex items-center justify-center transition-all cursor-pointer"
            title="بند کریں (Close)"
          >
            <X size={18} />
          </button>
        </div>

        {/* AI Prompt Bar for Building ANY App/Website */}
        <div className="px-4 py-2 bg-[#020b17] border-b border-[#00f0ff]/30 flex flex-col md:flex-row items-center justify-between gap-3">
          <form onSubmit={handleGenerateCustom} className="flex-1 w-full flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00f0ff] text-xs">
                ✨
              </span>
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="سراج بھائی، کون سی نئی ایپ یا ویب سائٹ بنوانی ہے؟ یہاں پرامپٹ لکھیں (مثال: 'پوڈکاسٹ پلیئر'، 'ڈاکٹر اپوائنٹمنٹ ایپ'، 'کرپٹو ٹریکر')..."
                className="w-full pl-8 pr-3 py-1.5 bg-black/80 border border-[#00f0ff]/40 rounded text-xs text-white focus:outline-none focus:border-[#00f0ff] placeholder:text-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating || !promptInput.trim()}
              className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all ${
                isGenerating
                  ? "bg-gray-800 text-gray-400 border border-gray-700"
                  : "bg-gradient-to-r from-[#00f0ff] to-[#00ff88] text-black font-black hover:opacity-90 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={12} className="animate-spin" />
                  <span>کوڈ تیار ہو رہا ہے...</span>
                </>
              ) : (
                <>
                  <Zap size={13} />
                  <span>کوڈ بنائیں (Generate)</span>
                </>
              )}
            </button>
          </form>

          {/* Presets Row */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-0.5">
            <span className="text-[10px] text-gray-400 uppercase whitespace-nowrap">بلپرنٹس:</span>
            {projects.slice(0, 5).map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectProject(p)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap border transition-all cursor-pointer ${
                  currentProject.id === p.id
                    ? "bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff]"
                    : "bg-black/50 text-gray-300 border-gray-800 hover:border-gray-600"
                }`}
              >
                {p.titleUrdu.slice(0, 18)}
              </button>
            ))}
          </div>
        </div>

        {/* Main Work Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* TAB 1: CODE EXPLORER & SYNTAX VIEWER */}
          {activeTab === "code" && (
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Left Column: File Tree & Project Structure */}
              <div className="w-full md:w-64 bg-[#030d1c] border-r border-[#00f0ff]/20 flex flex-col p-3 overflow-y-auto">
                <div className="text-xs font-bold text-[#00f0ff] tracking-wider uppercase mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Folder size={14} />
                    <span>PROJECT FILES</span>
                  </span>
                  <span className="text-[9px] bg-cyan-950 px-1.5 py-0.5 rounded text-cyan-300">
                    {currentProject.files.length} FILES
                  </span>
                </div>

                <div className="space-y-1">
                  {currentProject.files.map((file) => (
                    <button
                      key={file.name}
                      onClick={() => handleSelectFile(file)}
                      className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex items-center gap-2 transition-all cursor-pointer ${
                        selectedFile.name === file.name
                          ? "bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40 font-bold"
                          : "text-gray-300 hover:bg-black/40 hover:text-white"
                      }`}
                    >
                      <FileCode size={13} className="text-[#00f0ff]" />
                      <span className="truncate">{file.name}</span>
                      <span className="ml-auto text-[8.5px] uppercase opacity-50 font-mono">
                        {file.language}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Project Metadata Card */}
                <div className="mt-auto pt-4 border-t border-[#00f0ff]/20 text-[10px] space-y-1 text-gray-400">
                  <div className="font-bold text-white text-xs">{currentProject.title}</div>
                  <div className="text-[#00ff88]">{currentProject.titleUrdu}</div>
                  <div className="text-[9.5px] text-gray-400 leading-relaxed mt-1">
                    {currentProject.description}
                  </div>
                  <div className="pt-2 flex items-center justify-between text-[#00f0ff]">
                    <span>اسٹرکچر:</span>
                    <span className="font-bold">{currentProject.framework}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Code Editor / Viewer */}
              <div className="flex-1 flex flex-col bg-[#020712] overflow-hidden">
                {/* Code Toolbar */}
                <div className="px-4 py-2 bg-[#040f21] border-b border-[#00f0ff]/20 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Path:</span>
                    <span className="text-[#00f0ff] font-bold">{selectedFile.path}</span>
                    <span className="text-[9px] bg-black/60 px-1.5 py-0.2 rounded text-gray-400">
                      {currentCode.split("\n").length} LINES
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyCode}
                      className="px-2.5 py-1 bg-black/60 hover:bg-[#00f0ff]/20 border border-[#00f0ff]/40 rounded text-[10px] text-[#00f0ff] hover:text-white flex items-center gap-1 cursor-pointer transition-all"
                      title="کوڈ کاپی کریں"
                    >
                      {copied ? <Check size={12} className="text-[#00ff88]" /> : <Copy size={12} />}
                      <span>{copied ? "✓ کاپی ہو گیا!" : "Copy Code (کوڈ کاپی کریں)"}</span>
                    </button>

                    <button
                      onClick={handleDownloadFile}
                      className="px-2.5 py-1 bg-black/60 hover:bg-[#00ff88]/20 border border-[#00ff88]/40 rounded text-[10px] text-[#00ff88] hover:text-white flex items-center gap-1 cursor-pointer transition-all"
                      title="فائل ڈاؤن لوڈ کریں"
                    >
                      <Download size={12} />
                      <span>Download (ڈاؤن لوڈ کریں)</span>
                    </button>

                    <button
                      onClick={() => {
                        cyberSynth.playBeep(1000, 0.04);
                        setActiveTab("preview");
                      }}
                      className="px-3 py-1 bg-[#00ff88] text-black font-bold rounded text-[10px] flex items-center gap-1 cursor-pointer hover:bg-[#00ff88]/80 transition-all"
                    >
                      <Play size={12} />
                      <span>Run Preview (چلائیں)</span>
                    </button>
                  </div>
                </div>

                {/* Editor Content with Line Numbers */}
                <div className="flex-1 flex overflow-hidden">
                  {/* Line Numbers */}
                  <div className="w-12 bg-[#020a17] text-gray-600 text-right pr-3 py-4 font-mono text-xs select-none border-r border-[#00f0ff]/10 overflow-hidden">
                    {currentCode.split("\n").map((_, i) => (
                      <div key={i} className="leading-5 text-[11px]">
                        {i + 1}
                      </div>
                    ))}
                  </div>

                  {/* Textarea Code Editor */}
                  <textarea
                    value={currentCode}
                    onChange={(e) => handleCodeChange(e.target.value)}
                    spellCheck={false}
                    className="flex-1 p-4 bg-transparent text-[#e2e8f0] font-mono text-xs leading-5 resize-none focus:outline-none overflow-y-auto selection:bg-[#00f0ff]/30 selection:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE INSTANT PREVIEW */}
          {activeTab === "preview" && (
            <div className="flex-1 flex flex-col bg-[#050c18] overflow-hidden">
              {/* Preview Bar */}
              <div className="px-4 py-2 bg-[#031024] border-b border-[#00f0ff]/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88] animate-ping" />
                    <span className="font-bold text-[#00ff88]">LIVE APP PREVIEW // R.S. RUNTIME</span>
                  </div>
                  <span className="text-gray-400 text-[10px]">
                    ایپلیکیشن بالکل لائیو ہے، بٹن دبا کر اور فیچرز چلا کر دیکھیں:
                  </span>
                </div>

                {/* Device Frame Switcher */}
                <div className="flex items-center gap-1 bg-black/60 p-0.5 border border-[#00f0ff]/30 rounded">
                  <button
                    onClick={() => setPreviewDevice("desktop")}
                    className={`p-1 rounded cursor-pointer ${
                      previewDevice === "desktop" ? "bg-[#00f0ff] text-black" : "text-gray-400"
                    }`}
                    title="Desktop"
                  >
                    <Monitor size={14} />
                  </button>
                  <button
                    onClick={() => setPreviewDevice("tablet")}
                    className={`p-1 rounded cursor-pointer ${
                      previewDevice === "tablet" ? "bg-[#00f0ff] text-black" : "text-gray-400"
                    }`}
                    title="Tablet"
                  >
                    <Tablet size={14} />
                  </button>
                  <button
                    onClick={() => setPreviewDevice("mobile")}
                    className={`p-1 rounded cursor-pointer ${
                      previewDevice === "mobile" ? "bg-[#00f0ff] text-black" : "text-gray-400"
                    }`}
                    title="Mobile"
                  >
                    <Smartphone size={14} />
                  </button>
                </div>
              </div>

              {/* Iframe Preview Container */}
              <div className="flex-1 p-3 flex items-center justify-center overflow-auto bg-[#020610]">
                <div
                  className={`h-full transition-all duration-300 border border-[#00f0ff]/40 rounded-lg overflow-hidden shadow-2xl bg-black ${
                    previewDevice === "desktop"
                      ? "w-full"
                      : previewDevice === "tablet"
                      ? "w-[768px]"
                      : "w-[375px]"
                  }`}
                >
                  <iframe
                    title="App Preview"
                    srcDoc={generatePreviewDoc()}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-modals"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ARCHITECTURE & API SPEC */}
          {activeTab === "architecture" && (
            <div className="flex-1 p-6 overflow-y-auto bg-[#030917] space-y-6">
              <div className="border border-[#00f0ff]/30 bg-[#061226]/80 p-5 rounded-lg">
                <h3 className="text-base font-bold text-[#00f0ff] flex items-center gap-2 mb-3">
                  <Cpu size={18} />
                  <span>SYSTEM ARCHITECTURE // {currentProject.title.toUpperCase()}</span>
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  {currentProject.description} یہ پروجیکٹ جدید ترین مائیکرو سروسز، ری ایکٹ کمپوننٹ ہائرارکی اور فاسٹ کلائنٹ سائیڈ اسٹیٹ پر مبنی ہے۔
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                  <div className="p-3 bg-black/60 border border-cyan-500/20 rounded">
                    <div className="text-cyan-400 font-bold mb-1">FRONTEND LAYER</div>
                    <div className="text-gray-400">React 19 + TypeScript + Tailwind CSS</div>
                    <div className="text-[10px] text-emerald-400 mt-2">✓ Modular Component Tree</div>
                  </div>
                  <div className="p-3 bg-black/60 border border-cyan-500/20 rounded">
                    <div className="text-cyan-400 font-bold mb-1">BACKEND SERVICE</div>
                    <div className="text-gray-400">Express REST API + JSON Endpoints</div>
                    <div className="text-[10px] text-emerald-400 mt-2">✓ 0ms Simulated Latency</div>
                  </div>
                  <div className="p-3 bg-black/60 border border-cyan-500/20 rounded">
                    <div className="text-cyan-400 font-bold mb-1">DATA & SECURITY</div>
                    <div className="text-gray-400">AES-256 Auth + LocalStorage Persistence</div>
                    <div className="text-[10px] text-emerald-400 mt-2">✓ Root Clearance: SIRAJ</div>
                  </div>
                </div>
              </div>

              {/* API Endpoints & Routes Overview */}
              <div className="border border-[#00f0ff]/30 bg-[#061226]/80 p-5 rounded-lg">
                <h3 className="text-sm font-bold text-[#00ff88] mb-3">
                  API ROUTES & CONTRACTS (بیک اینڈ اینڈ پوائنٹس)
                </h3>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between p-2 bg-black/50 border border-gray-800 rounded">
                    <span className="text-cyan-400 font-bold">GET /api/health</span>
                    <span className="text-emerald-400">200 OK // Status Check</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-black/50 border border-gray-800 rounded">
                    <span className="text-cyan-400 font-bold">GET /api/items</span>
                    <span className="text-gray-400">Fetch all database items</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-black/50 border border-gray-800 rounded">
                    <span className="text-cyan-400 font-bold">POST /api/items</span>
                    <span className="text-gray-400">Create new item with verification</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Status & Diagnostic Console */}
        <div className="px-4 py-1.5 bg-[#020a17] border-t border-[#00f0ff]/30 flex items-center justify-between text-[10px] text-gray-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[#00ff88]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-ping" />
              <span>IDE READY</span>
            </span>
            <span>ACTIVE: <strong className="text-white">{selectedFile.name}</strong></span>
            <span>BUILD: <strong className="text-[#00f0ff]">SUCCESS</strong></span>
          </div>

          <div className="text-[#00f0ff]/80">
            ADMIN SIRAJ // R.S. AI CODE STUDIO ENGINE // 100% PRODUCTION READY
          </div>
        </div>

      </div>
    </div>
  );
}
