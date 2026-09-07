import React, { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  Gamepad2,
  HelpCircle,
  Terminal,
  Layers,
  Cpu,
  Radio,
  Sliders,
  CheckCircle,
  RefreshCw,
  Zap,
  ShieldAlert,
  Volume2,
  Wifi,
  Bluetooth,
  Monitor,
  Maximize2,
  Play,
  RotateCcw,
  Copy,
  Check,
} from "lucide-react";
import { cyberSynth, speakInstantTTS } from "../utils/audioUtils";

interface IrisAi183ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunCommand?: (cmd: string) => void;
}

// Quiz Categories & Questions for IRIS 1.8.3 Quiz Widget (PRO)
interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  questionUrdu: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: "AI & Neural Networks",
    question: "What powers IRIS AI 1.8.3's zero-latency multimodal reasoning engine?",
    questionUrdu: "آئرس اے آئی 1.8.3 کے زیرو لیٹنسی ماڈل کا اصل فاؤنڈیشن ماڈل کونسا ہے؟",
    options: ["Google Gemini Live & Flash Core", "Basic Rule Engine", "Legacy Markov Chains", "Stateless Regex Parser"],
    correct: 0,
    explanation: "IRIS AI integrates Google Gemini Live & Flash models with 250ms audio chunk buffers and native VAD.",
  },
  {
    id: 2,
    category: "Cyber Defense",
    question: "What is the primary function of IRIS 'Ghost Control' across High-DPI screens?",
    questionUrdu: "ہائی ڈی پی آئی اسکرینز پر گھوسٹ کنٹرول کا بنیادی مقصد کیا ہے؟",
    options: [
      "Hardware automation, window teleportation & screen peeler OCR",
      "Playing simple background music",
      "Changing desktop icon sizes only",
      "Simulating offline terminal text",
    ],
    correct: 0,
    explanation: "Ghost Control enables autonomous mouse coordinate control, OCR extraction, and multi-display window teleportation.",
  },
  {
    id: 3,
    category: "Iron Man & Jarvis Tech",
    question: "Which Mark armor introduced the supersonic pod deployable mid-air suit-up system?",
    questionUrdu: "آئرن مین کا کونسا آرمر ہوا میں پوڈ کے ذریعے خودکار طریقے سے سوٹ اپ ہوتا تھا؟",
    options: ["Mark VII (Mark 7)", "Mark I", "Mark III", "Mark II"],
    correct: 0,
    explanation: "Tony Stark deployed Mark VII via laser wristbands in the 2012 battle of New York from Stark Tower.",
  },
  {
    id: 4,
    category: "System Engineering",
    question: "In IRIS AI 1.8.3, what do the three core AI State Colors represent?",
    questionUrdu: "آئرس اے آئی 1.8.3 میں تین بنیادی رنگ (نیلا، سبز، سفید) کس حالت کو ظاہر کرتے ہیں؟",
    options: [
      "Blue = Thinking, Green = Speaking, White = Standby",
      "Red = Error, Blue = Idle, Yellow = Charging",
      "Green = Online, Yellow = Busy, Red = Disconnected",
      "Purple = Gaming, Orange = Movie, Blue = Web",
    ],
    correct: 0,
    explanation: "IRIS v1.8.3 standardized: Thinking = Blue, Speaking = Green, Standby = White.",
  },
  {
    id: 5,
    category: "DevOps & Cloud",
    question: "What does 'Deploy Wormhole' accomplish in the IRIS ecosystem?",
    questionUrdu: "آئرس ایکو سسٹم میں 'ڈپلوئے ورم ہول' کیا کام انجام دیتا ہے؟",
    options: [
      "Exposes localhost servers to public internet via secure tunnel",
      "Shuts down the local computer power",
      "Downloads random zip files",
      "Deletes temporary browser history",
    ],
    correct: 0,
    explanation: "Deploy Wormhole generates instant encrypted tunneling endpoints for local dev servers.",
  },
];

export default function IrisAi183Modal({ isOpen, onClose, onRunCommand }: IrisAi183ModalProps) {
  const [activeTab, setActiveTab] = useState<"widgets" | "ghost" | "hardware" | "telemetry">("widgets");
  const [widgetSubTab, setWidgetSubTab] = useState<"quiz" | "tictactoe">("quiz");

  // Quiz State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizStreak, setQuizStreak] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Tic-Tac-Toe State
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [tictacWinner, setTictacWinner] = useState<string | null>(null); // 'X', 'O', 'draw'
  const [tictacStats, setTictacStats] = useState({ userWins: 0, aiWins: 0, draws: 0 });
  const [tictacDifficulty, setTictacDifficulty] = useState<"cadet" | "tactical" | "grandmaster">("grandmaster");

  // Ghost Control State
  const [screenPeelerText, setScreenPeelerText] = useState(
    `// [IRIS SCREEN PEELER OCR CAPTURE v1.8.3]\nconst irisOperator = "Siraj Dil";\nconst clearance = "LEVEL-5 ROOT";\nconst zeroLatencyEngine = true;\nconst latencyMs = 18.4;\nconsole.log("[IRIS 1.8.3 PRO] System Ready.");`
  );
  const [copiedPeeler, setCopiedPeeler] = useState(false);
  const [windowLayout, setWindowLayout] = useState<string>("50/50 Split");
  const [wormholeActive, setWormholeActive] = useState(true);
  const [wormholeUrl] = useState("https://iris-wormhole-siraj-057.live");
  const [copiedWormhole, setCopiedWormhole] = useState(false);

  // Terminal & Macros
  const [cliOutput, setCliOutput] = useState<string[]>([
    "IRIS X AI Kernel 1.8.3 [x86_64-win64-pro]",
    "Zero-Latency Voice Engine: BUFF=250ms VAD=ACTIVE",
    "High-DPI Matrix Ghost Control: ENGAGED",
    "Type 'help' or run custom protocols below...",
  ]);
  const [cliInput, setCliInput] = useState("");

  // Hardware Controls
  const [masterVolume, setMasterVolume] = useState(85);
  const [screenBrightness, setScreenBrightness] = useState(90);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [highDpiScaling, setHighDpiScaling] = useState(150);

  useEffect(() => {
    if (isOpen) {
      cyberSynth.playStartupSound();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // -------------------- QUIZ LOGIC --------------------
  const handleAnswerSelect = (optionIdx: number) => {
    if (isAnswerRevealed || quizCompleted) return;
    setSelectedOption(optionIdx);
    setIsAnswerRevealed(true);

    const curr = QUIZ_QUESTIONS[currentQuestionIdx];
    if (optionIdx === curr.correct) {
      cyberSynth.playOverrideSuccess();
      setQuizScore((prev) => prev + 100 + quizStreak * 25);
      setQuizStreak((prev) => prev + 1);
      speakInstantTTS("درست جواب ایڈمن سراج! شاندار!", undefined, false);
    } else {
      cyberSynth.playLockWarning();
      setQuizStreak(0);
      speakInstantTTS("یہ جواب درست نہیں ہے، وضاحت ملاحظہ فرمائیں۔", undefined, false);
    }
  };

  const handleNextQuestion = () => {
    cyberSynth.playBeep(900, 0.03);
    if (currentQuestionIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
    } else {
      setQuizCompleted(true);
      cyberSynth.playOverrideSuccess();
    }
  };

  const handleRestartQuiz = () => {
    cyberSynth.playBeep(1100, 0.04);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setQuizScore(0);
    setQuizStreak(0);
    setQuizCompleted(false);
  };

  // -------------------- TIC TAC TOE LOGIC --------------------
  const checkWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (squares.every((sq) => sq !== null)) {
      return "draw";
    }
    return null;
  };

  const makeAiMove = (currentBoard: (string | null)[]) => {
    const emptyIndices = currentBoard
      .map((val, idx) => (val === null ? idx : null))
      .filter((val): val is number => val !== null);

    if (emptyIndices.length === 0) return;

    let chosenIndex = emptyIndices[0];

    if (tictacDifficulty === "cadet") {
      // Random move
      chosenIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    } else if (tictacDifficulty === "tactical") {
      // Win or block win
      // Check if AI can win
      let found = false;
      for (const idx of emptyIndices) {
        const testBoard = [...currentBoard];
        testBoard[idx] = "O";
        if (checkWinner(testBoard) === "O") {
          chosenIndex = idx;
          found = true;
          break;
        }
      }
      // Block user win
      if (!found) {
        for (const idx of emptyIndices) {
          const testBoard = [...currentBoard];
          testBoard[idx] = "X";
          if (checkWinner(testBoard) === "X") {
            chosenIndex = idx;
            found = true;
            break;
          }
        }
      }
      if (!found) {
        chosenIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      }
    } else {
      // Grandmaster Minimax - unbeatable
      const minimax = (tempBoard: (string | null)[], depth: number, isMaximizing: boolean): number => {
        const winner = checkWinner(tempBoard);
        if (winner === "O") return 10 - depth;
        if (winner === "X") return depth - 10;
        if (winner === "draw") return 0;

        const available = tempBoard
          .map((v, i) => (v === null ? i : null))
          .filter((v): v is number => v !== null);

        if (isMaximizing) {
          let bestScore = -Infinity;
          for (const i of available) {
            tempBoard[i] = "O";
            const score = minimax(tempBoard, depth + 1, false);
            tempBoard[i] = null;
            bestScore = Math.max(score, bestScore);
          }
          return bestScore;
        } else {
          let bestScore = Infinity;
          for (const i of available) {
            tempBoard[i] = "X";
            const score = minimax(tempBoard, depth + 1, true);
            tempBoard[i] = null;
            bestScore = Math.min(score, bestScore);
          }
          return bestScore;
        }
      };

      let bestScore = -Infinity;
      for (const idx of emptyIndices) {
        currentBoard[idx] = "O";
        const score = minimax(currentBoard, 0, false);
        currentBoard[idx] = null;
        if (score > bestScore) {
          bestScore = score;
          chosenIndex = idx;
        }
      }
    }

    const nextBoard = [...currentBoard];
    nextBoard[chosenIndex] = "O";
    cyberSynth.playBeep(650, 0.05);
    setBoard(nextBoard);

    const winner = checkWinner(nextBoard);
    if (winner) {
      handleTictacEnd(winner);
    } else {
      setIsUserTurn(true);
    }
  };

  const handleCellClick = (idx: number) => {
    if (!isUserTurn || board[idx] !== null || tictacWinner) return;

    cyberSynth.playBeep(1050, 0.04);
    const nextBoard = [...board];
    nextBoard[idx] = "X";
    setBoard(nextBoard);

    const winner = checkWinner(nextBoard);
    if (winner) {
      handleTictacEnd(winner);
    } else {
      setIsUserTurn(false);
      setTimeout(() => {
        makeAiMove(nextBoard);
      }, 350);
    }
  };

  const handleTictacEnd = (winner: string) => {
    setTictacWinner(winner);
    if (winner === "X") {
      cyberSynth.playOverrideSuccess();
      setTictacStats((s) => ({ ...s, userWins: s.userWins + 1 }));
      speakInstantTTS("مبارک ہو سراج! آپ نے راؤنڈ جیت لیا!", undefined, false);
    } else if (winner === "O") {
      cyberSynth.playLockWarning();
      setTictacStats((s) => ({ ...s, aiWins: s.aiWins + 1 }));
      speakInstantTTS("آئرس اے آئی نے یہ چال جیت لی۔ ایک اور کوشش کریں؟", undefined, false);
    } else {
      cyberSynth.playBeep(800, 0.08);
      setTictacStats((s) => ({ ...s, draws: s.draws + 1 }));
      speakInstantTTS("یہ راؤنڈ ڈرا ہو گیا۔ کمال کا مقابلہ تھا!", undefined, false);
    }
  };

  const handleRestartTictac = () => {
    cyberSynth.playBeep(1100, 0.04);
    setBoard(Array(9).fill(null));
    setTictacWinner(null);
    setIsUserTurn(true);
  };

  // -------------------- GHOST TERMINAL LOGIC --------------------
  const handleRunCli = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliInput.trim()) return;

    const cmd = cliInput.trim().toLowerCase();
    cyberSynth.playBeep(1300, 0.03);

    const newLogs = [...cliOutput, `siraj@iris-057:~$ ${cliInput}`];

    if (cmd === "help") {
      newLogs.push(
        "Available commands:",
        "  iris status      - Display live zero-latency engine telemetry",
        "  iris ping        - Test IPC & Gemini live socket latency",
        "  iris peeler      - Refresh OCR visual screen capture",
        "  iris snap-grid   - Re-align High-DPI windows to 4-quadrant layout",
        "  iris wormhole    - Check status of localhost tunnel",
        "  clear            - Clear terminal buffer"
      );
    } else if (cmd === "iris status") {
      newLogs.push(
        "[OK] IRIS Desktop v1.8.3 PRO Active",
        "[OK] VAD: Latency <18ms | Buffer: 250ms chunks",
        "[OK] State Color: GREEN (Speaking) | BLUE (Thinking)",
        "[OK] High-DPI Ghost Control: Synchronized"
      );
    } else if (cmd === "iris ping") {
      newLogs.push("PONG! Gemini 3.1 Live Socket RTT: 14.8ms [OPTIMAL]");
    } else if (cmd === "iris peeler") {
      newLogs.push("[OCR] Fresh capture completed. 248 tokens extracted to editor.");
    } else if (cmd === "iris snap-grid") {
      newLogs.push("[WINDOWS] 4-Quadrant high-DPI matrix alignment applied.");
      setWindowLayout("4-Quadrant Matrix");
    } else if (cmd === "iris wormhole") {
      newLogs.push(`[WORMHOLE] Tunnel active at: ${wormholeUrl} (200 OK)`);
    } else if (cmd === "clear") {
      setCliOutput([]);
      setCliInput("");
      return;
    } else {
      newLogs.push(`[EXEC] Custom IRIS macro '${cmd}' routed through native executor.`);
      if (onRunCommand) onRunCommand(cliInput);
    }

    setCliOutput(newLogs);
    setCliInput("");
  };

  const handleTriggerMacro = (name: string, description: string) => {
    cyberSynth.playOverrideSuccess();
    setCliOutput((prev) => [
      ...prev,
      `[MACRO SEQUENCE] Triggering: ${name}...`,
      `[PROTOCOL] ${description}`,
      `[STATUS] 100% EXECUTED SUCCESSFULLY`,
    ]);
    speakInstantTTS(`${name} پروٹوکول کامیابی سے ایکٹیو ہو گیا ہے ایڈمن سراج۔`, undefined, false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#030d17] border-2 border-[#00f0ff] rounded-xl shadow-[0_0_50px_rgba(0,240,255,0.4)] flex flex-col overflow-hidden text-[#00f0ff] font-sans">
        {/* Top Header matching IRIS Desktop 1.8.3 High-DPI UI */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#021324] via-[#041a30] to-[#021324] border-b border-[#00f0ff]/40">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00f0ff]/20 border border-[#00f0ff] flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.6)] animate-pulse">
              <Sparkles className="w-4 h-4 text-[#00f0ff]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-black tracking-wider uppercase text-white drop-shadow-[0_0_8px_#00f0ff]">
                  IRIS X AI // DESKTOP v1.8.3 PRO
                </h2>
                <span className="px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-black uppercase bg-[#00ff88]/20 border border-[#00ff88] text-[#00ff88]">
                  PRO TIER SYNC
                </span>
              </div>
              <div className="text-[9px] sm:text-[10px] text-[#00f0ff]/80 font-mono flex items-center gap-2">
                <span>HIGH-DPI MATRIX & HARDWARE AUTOMATION</span>
                <span>•</span>
                <span className="text-[#00ff88]">VAD ZERO-LATENCY ENGINE</span>
              </div>
            </div>
          </div>

          {/* AI State Pill (White: Standby, Blue: Thinking, Green: Speaking) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#00f0ff]/40 bg-black/40 text-[9px] font-mono">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
              <span className="text-white">STATE:</span>
              <span className="text-[#00ff88] font-bold">READY (v1.8.3)</span>
            </div>
            <button
              onClick={() => {
                cyberSynth.playBeep(700, 0.05);
                onClose();
              }}
              className="p-1.5 rounded-lg bg-red-950/40 border border-red-500/50 hover:bg-red-500 hover:text-black text-red-400 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-[#020b12] border-b border-[#00f0ff]/20 overflow-x-auto text-[10px] sm:text-xs font-mono">
          <button
            onClick={() => {
              cyberSynth.playBeep(1000, 0.03);
              setActiveTab("widgets");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded border transition-all cursor-pointer ${
              activeTab === "widgets"
                ? "bg-[#00f0ff]/20 border-[#00f0ff] text-white shadow-[0_0_10px_rgba(0,240,255,0.3)] font-bold"
                : "border-transparent text-[#00f0ff]/60 hover:text-[#00f0ff] hover:bg-white/5"
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>INTERACTIVE WIDGETS</span>
            <span className="text-[8px] px-1 rounded bg-[#00ff88]/20 text-[#00ff88]">v1.8.3 NEW</span>
          </button>

          <button
            onClick={() => {
              cyberSynth.playBeep(1000, 0.03);
              setActiveTab("ghost");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded border transition-all cursor-pointer ${
              activeTab === "ghost"
                ? "bg-[#00f0ff]/20 border-[#00f0ff] text-white shadow-[0_0_10px_rgba(0,240,255,0.3)] font-bold"
                : "border-transparent text-[#00f0ff]/60 hover:text-[#00f0ff] hover:bg-white/5"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>GHOST CONTROL & MATRIX</span>
          </button>

          <button
            onClick={() => {
              cyberSynth.playBeep(1000, 0.03);
              setActiveTab("hardware");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded border transition-all cursor-pointer ${
              activeTab === "hardware"
                ? "bg-[#00f0ff]/20 border-[#00f0ff] text-white shadow-[0_0_10px_rgba(0,240,255,0.3)] font-bold"
                : "border-transparent text-[#00f0ff]/60 hover:text-[#00f0ff] hover:bg-white/5"
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>HARDWARE & OS CONTROL</span>
          </button>

          <button
            onClick={() => {
              cyberSynth.playBeep(1000, 0.03);
              setActiveTab("telemetry");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded border transition-all cursor-pointer ${
              activeTab === "telemetry"
                ? "bg-[#00f0ff]/20 border-[#00f0ff] text-white shadow-[0_0_10px_rgba(0,240,255,0.3)] font-bold"
                : "border-transparent text-[#00f0ff]/60 hover:text-[#00f0ff] hover:bg-white/5"
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>ENGINE & TOKEN TELEMETRY</span>
          </button>
        </div>

        {/* Modal Body Container */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 custom-scrollbar space-y-4">
          {/* TAB 1: INTERACTIVE WIDGETS (QUIZ PRO & TIC-TAC-TOE FREE) */}
          {activeTab === "widgets" && (
            <div className="space-y-4">
              {/* Widget Switcher */}
              <div className="flex items-center justify-between bg-[#041624] p-2 rounded-lg border border-[#00f0ff]/30">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      cyberSynth.playBeep(1100, 0.03);
                      setWidgetSubTab("quiz");
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                      widgetSubTab === "quiz"
                        ? "bg-[#00f0ff] text-black shadow-[0_0_12px_#00f0ff]"
                        : "bg-black/40 text-[#00f0ff] hover:bg-white/10"
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>IRIS QUIZ ENGINE (PRO)</span>
                  </button>

                  <button
                    onClick={() => {
                      cyberSynth.playBeep(1100, 0.03);
                      setWidgetSubTab("tictactoe");
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                      widgetSubTab === "tictactoe"
                        ? "bg-[#00ff88] text-black shadow-[0_0_12px_#00ff88]"
                        : "bg-black/40 text-[#00ff88] hover:bg-white/10"
                    }`}
                  >
                    <Gamepad2 className="w-3.5 h-3.5" />
                    <span>TIC TAC TOE (FREE)</span>
                  </button>
                </div>

                <div className="text-[10px] font-mono text-[#00f0ff]/70 hidden sm:block">
                  IRIS 1.8.3 OFFICIAL INTERACTIVE EXTENSIONS
                </div>
              </div>

              {/* SUB-WIDGET 1: QUIZ ENGINE (PRO) */}
              {widgetSubTab === "quiz" && (
                <div className="bg-[#02131f] border border-[#00f0ff]/40 rounded-xl p-4 sm:p-5 space-y-4 shadow-[inset_0_0_30px_rgba(0,240,255,0.05)]">
                  <div className="flex items-center justify-between border-b border-[#00f0ff]/20 pb-3">
                    <div>
                      <div className="text-[10px] font-mono text-[#00f0ff]/70 uppercase">
                        CATEGORY: {QUIZ_QUESTIONS[currentQuestionIdx].category}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        Question {currentQuestionIdx + 1} of {QUIZ_QUESTIONS.length}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="px-2.5 py-1 rounded bg-black/60 border border-[#00f0ff]/40 text-[10px] font-mono">
                        SCORE: <span className="text-[#00ff88] font-bold">{quizScore} PTS</span>
                      </div>
                      <div className="px-2.5 py-1 rounded bg-black/60 border border-[#00ff88]/40 text-[10px] font-mono">
                        STREAK: <span className="text-[#00ff88] font-bold">🔥 {quizStreak}x</span>
                      </div>
                    </div>
                  </div>

                  {!quizCompleted ? (
                    <>
                      {/* Question Text */}
                      <div className="space-y-1">
                        <p className="text-base sm:text-lg font-bold text-white">
                          {QUIZ_QUESTIONS[currentQuestionIdx].question}
                        </p>
                        <p className="text-xs sm:text-sm text-[#00f0ff]/80 font-urdu text-right">
                          {QUIZ_QUESTIONS[currentQuestionIdx].questionUrdu}
                        </p>
                      </div>

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                        {QUIZ_QUESTIONS[currentQuestionIdx].options.map((opt, oIdx) => {
                          const isSelected = selectedOption === oIdx;
                          const isCorrect = oIdx === QUIZ_QUESTIONS[currentQuestionIdx].correct;

                          let btnClasses =
                            "bg-black/50 border-[#00f0ff]/30 text-white hover:border-[#00f0ff] hover:bg-[#00f0ff]/10";
                          if (isAnswerRevealed) {
                            if (isCorrect) {
                              btnClasses = "bg-[#00ff88]/20 border-[#00ff88] text-[#00ff88] font-bold shadow-[0_0_12px_#00ff88]";
                            } else if (isSelected) {
                              btnClasses = "bg-red-500/20 border-red-500 text-red-300 font-bold";
                            } else {
                              btnClasses = "bg-black/30 border-gray-800 text-gray-500 opacity-60";
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleAnswerSelect(oIdx)}
                              disabled={isAnswerRevealed}
                              className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between text-xs sm:text-sm ${btnClasses}`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded border border-current flex items-center justify-center font-mono text-[10px] font-bold">
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span>{opt}</span>
                              </div>
                              {isAnswerRevealed && isCorrect && <CheckCircle className="w-4 h-4 text-[#00ff88]" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation & Next */}
                      {isAnswerRevealed && (
                        <div className="p-3 bg-black/60 border border-[#00f0ff]/40 rounded-lg space-y-2 animate-fadeIn">
                          <div className="text-[11px] font-mono text-[#00f0ff]/90 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#00ff88]" />
                            <span className="font-bold text-[#00ff88]">IRIS AI 1.8.3 EXPLANATION:</span>
                          </div>
                          <p className="text-xs text-gray-200">{QUIZ_QUESTIONS[currentQuestionIdx].explanation}</p>
                          <div className="flex justify-end pt-1">
                            <button
                              onClick={handleNextQuestion}
                              className="px-4 py-1.5 bg-gradient-to-r from-[#00f0ff] to-[#00ff88] text-black font-bold text-xs rounded hover:opacity-90 transition-all cursor-pointer shadow-[0_0_12px_rgba(0,240,255,0.5)] flex items-center gap-1"
                            >
                              <span>{currentQuestionIdx + 1 < QUIZ_QUESTIONS.length ? "NEXT QUESTION" : "VIEW RESULTS"}</span>
                              <span>→</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    /* Quiz Results Card */
                    <div className="text-center py-6 space-y-4 animate-fadeIn">
                      <div className="w-14 h-14 rounded-full bg-[#00ff88]/20 border-2 border-[#00ff88] mx-auto flex items-center justify-center shadow-[0_0_25px_#00ff88]">
                        <CheckCircle className="w-8 h-8 text-[#00ff88]" />
                      </div>
                      <h4 className="text-lg font-black text-white">QUIZ EVALUATION COMPLETE</h4>
                      <p className="text-sm text-[#00f0ff]">
                        Total Score: <span className="font-bold text-white">{quizScore} Points</span>
                      </p>
                      <button
                        onClick={handleRestartQuiz}
                        className="px-5 py-2 bg-[#00f0ff] text-black font-bold text-xs rounded hover:bg-white transition-all cursor-pointer shadow-[0_0_15px_#00f0ff] inline-flex items-center gap-2"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>RESTART QUIZ</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* SUB-WIDGET 2: TIC TAC TOE (FREE) */}
              {widgetSubTab === "tictactoe" && (
                <div className="bg-[#02131f] border border-[#00ff88]/40 rounded-xl p-4 sm:p-5 space-y-4 shadow-[inset_0_0_30px_rgba(0,255,136,0.05)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#00ff88]/20 pb-3">
                    <div>
                      <div className="text-[10px] font-mono text-[#00ff88]/70">TACTICAL AI BATTLEGROUND</div>
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        Player (X) vs IRIS AI 1.8.3 (O)
                      </h3>
                    </div>

                    {/* Difficulty selector & Score */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-black/60 p-0.5 rounded border border-[#00ff88]/30 text-[9px] font-mono">
                        {(["cadet", "tactical", "grandmaster"] as const).map((diff) => (
                          <button
                            key={diff}
                            onClick={() => {
                              cyberSynth.playBeep(900, 0.03);
                              setTictacDifficulty(diff);
                              handleRestartTictac();
                            }}
                            className={`px-2 py-1 rounded uppercase font-bold transition-all cursor-pointer ${
                              tictacDifficulty === diff
                                ? "bg-[#00ff88] text-black"
                                : "text-[#00ff88]/70 hover:text-white"
                            }`}
                          >
                            {diff}
                          </button>
                        ))}
                      </div>

                      <div className="px-2.5 py-1 rounded bg-black/60 border border-[#00ff88]/40 text-[10px] font-mono">
                        W: <span className="text-[#00ff88]">{tictacStats.userWins}</span> | L:{" "}
                        <span className="text-red-400">{tictacStats.aiWins}</span> | D:{" "}
                        <span className="text-yellow-400">{tictacStats.draws}</span>
                      </div>
                    </div>
                  </div>

                  {/* Game Grid Container */}
                  <div className="flex flex-col items-center justify-center py-2 space-y-3">
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 w-64 sm:w-72 h-64 sm:h-72">
                      {board.map((cell, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleCellClick(idx)}
                          disabled={cell !== null || !isUserTurn || tictacWinner !== null}
                          className={`rounded-xl border-2 flex items-center justify-center text-3xl sm:text-4xl font-black font-mono transition-all cursor-pointer ${
                            cell === "X"
                              ? "bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_15px_#00f0ff]"
                              : cell === "O"
                              ? "bg-[#00ff88]/20 border-[#00ff88] text-[#00ff88] shadow-[0_0_15px_#00ff88]"
                              : "bg-black/60 border-[#00ff88]/30 hover:border-[#00ff88] hover:bg-[#00ff88]/10 text-transparent"
                          }`}
                        >
                          {cell || "•"}
                        </button>
                      ))}
                    </div>

                    {/* Status & Restart button */}
                    <div className="flex items-center justify-between w-64 sm:w-72 pt-2">
                      <div className="text-xs font-mono">
                        {tictacWinner ? (
                          <span className="font-bold text-white">
                            {tictacWinner === "X"
                              ? "🎉 YOU WIN!"
                              : tictacWinner === "O"
                              ? "🤖 IRIS WINS!"
                              : "🤝 DRAW!"}
                          </span>
                        ) : (
                          <span className="text-[#00ff88]">
                            {isUserTurn ? "YOUR TURN (X)" : "IRIS THINKING (O)..."}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={handleRestartTictac}
                        className="px-3 py-1 bg-black/60 border border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88] hover:text-black text-xs font-bold rounded transition-all cursor-pointer flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>RESTART</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: GHOST CONTROL & HIGH-DPI MATRIX */}
          {activeTab === "ghost" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Screen Peeler & Phantom Typer OCR */}
                <div className="bg-[#02131f] border border-[#00f0ff]/40 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-[#00f0ff]/20 pb-2">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#00f0ff]" />
                      <h3 className="text-xs sm:text-sm font-bold text-white">
                        SCREEN PEELER & PHANTOM TYPER (OCR)
                      </h3>
                    </div>
                    <button
                      onClick={() => {
                        cyberSynth.playBeep(1200, 0.03);
                        navigator.clipboard.writeText(screenPeelerText);
                        setCopiedPeeler(true);
                        setTimeout(() => setCopiedPeeler(false), 2000);
                      }}
                      className="px-2 py-0.5 rounded bg-[#00f0ff]/20 border border-[#00f0ff] text-[10px] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black flex items-center gap-1 cursor-pointer"
                    >
                      {copiedPeeler ? <Check className="w-3 h-3 text-[#00ff88]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedPeeler ? "COPIED" : "COPY OCR"}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-[#00f0ff]/70">
                    640x360 0.5 JPEG WebRTC Vision Stream OCR Buffer. Extracted live from active display:
                  </p>
                  <textarea
                    value={screenPeelerText}
                    onChange={(e) => setScreenPeelerText(e.target.value)}
                    className="w-full h-32 bg-black/70 border border-[#00f0ff]/40 rounded-lg p-2.5 font-mono text-[11px] text-[#00ff88] focus:outline-hidden focus:border-[#00ff88]"
                  />
                  <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                    <span>Aspect Ratio: 16:9 Full-Screen</span>
                    <span className="text-[#00ff88]">Zero Distortion Vision Active</span>
                  </div>
                </div>

                {/* Teleport Windows & High-DPI Snap */}
                <div className="bg-[#02131f] border border-[#00f0ff]/40 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-[#00f0ff]/20 pb-2">
                    <div className="flex items-center gap-2">
                      <Maximize2 className="w-4 h-4 text-[#00f0ff]" />
                      <h3 className="text-xs sm:text-sm font-bold text-white">
                        TELEPORT WINDOWS // HIGH-DPI MATRIX
                      </h3>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#00f0ff]/20 border border-[#00f0ff]">
                      ACTIVE: {windowLayout}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#00f0ff]/70">
                    Instant OS coordinate alignment & layout teleport across 4K / high-resolution monitors:
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {[
                      { id: "Full Screen 4K", desc: "Single Display Focus" },
                      { id: "50/50 Split", desc: "Side-by-Side Multitasking" },
                      { id: "4-Quadrant Matrix", desc: "4 Tile Tactical Grid" },
                      { id: "Floating PiP HUD", desc: "Always on Top Compact" },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => {
                          cyberSynth.playBeep(1100, 0.04);
                          setWindowLayout(mode.id);
                          speakInstantTTS(`${mode.id} لے آؤٹ نافذ کر دیا گیا ہے۔`, undefined, false);
                        }}
                        className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                          windowLayout === mode.id
                            ? "bg-[#00f0ff]/20 border-[#00f0ff] text-white shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                            : "bg-black/50 border-[#00f0ff]/20 text-[#00f0ff]/80 hover:border-[#00f0ff]"
                        }`}
                      >
                        <div className="text-xs font-bold">{mode.id}</div>
                        <div className="text-[9px] text-gray-400 font-mono">{mode.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Deploy Wormhole & Tunneling */}
              <div className="bg-[#02131f] border border-[#00ff88]/40 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-[#00ff88]/20 pb-2">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-[#00ff88]" />
                    <h3 className="text-xs sm:text-sm font-bold text-white">
                      DEPLOY WORMHOLE // LOCALHOST SECURE TUNNEL
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        cyberSynth.playBeep(900, 0.04);
                        setWormholeActive(!wormholeActive);
                      }}
                      className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold border transition-all cursor-pointer ${
                        wormholeActive
                          ? "bg-[#00ff88]/20 border-[#00ff88] text-[#00ff88]"
                          : "bg-red-500/20 border-red-500 text-red-400"
                      }`}
                    >
                      {wormholeActive ? "TUNNEL ONLINE" : "OFFLINE"}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-black/60 p-3 rounded-lg border border-[#00ff88]/30 font-mono text-xs">
                  <div className="flex items-center gap-2 text-white">
                    <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
                    <span>{wormholeUrl}</span>
                  </div>
                  <button
                    onClick={() => {
                      cyberSynth.playBeep(1200, 0.03);
                      navigator.clipboard.writeText(wormholeUrl);
                      setCopiedWormhole(true);
                      setTimeout(() => setCopiedWormhole(false), 2000);
                    }}
                    className="px-2 py-1 bg-[#00ff88]/20 hover:bg-[#00ff88] hover:text-black text-[#00ff88] rounded border border-[#00ff88] text-[10px] flex items-center gap-1 cursor-pointer"
                  >
                    {copiedWormhole ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedWormhole ? "COPIED" : "COPY URL"}</span>
                  </button>
                </div>
              </div>

              {/* Native Terminal & CLI Script Executor */}
              <div className="bg-[#02131f] border border-[#00f0ff]/40 rounded-xl p-4 space-y-3 font-mono">
                <div className="flex items-center justify-between border-b border-[#00f0ff]/20 pb-2">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#00f0ff]" />
                    <h3 className="text-xs sm:text-sm font-bold text-white">
                      RUN TERMINAL // NATIVE SHELL SCRIPT EXECUTOR
                    </h3>
                  </div>
                  <span className="text-[9px] text-[#00f0ff]/70">SANDBOX v1.8.3 PRO</span>
                </div>

                {/* Macro Quick Launchers */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "Morning Routine", desc: "Briefing, Pakistan Weather, Stock & System Check" },
                    { name: "Combat High Alert", desc: "Lock Screen Bypass, Red HUD Overclock, Security Scan" },
                    { name: "Dev Stack Boot", desc: "Launch React 18, Vite Server, Wormhole Tunnel" },
                    { name: "Silent Recon", desc: "Mute SFX, 10% Dimmer, Stealth Port Scanner" },
                  ].map((macro) => (
                    <button
                      key={macro.name}
                      onClick={() => handleTriggerMacro(macro.name, macro.desc)}
                      className="px-2.5 py-1 bg-black/60 border border-[#00f0ff]/40 hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 text-white rounded text-[10px] flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Play className="w-2.5 h-2.5 text-[#00ff88]" />
                      <span>{macro.name}</span>
                    </button>
                  ))}
                </div>

                {/* Console Log Output */}
                <div className="h-32 bg-black/80 rounded-lg border border-[#00f0ff]/30 p-2.5 overflow-y-auto text-[11px] space-y-1 text-[#00f0ff]">
                  {cliOutput.map((line, idx) => (
                    <div key={idx} className="leading-relaxed">
                      {line}
                    </div>
                  ))}
                </div>

                {/* CLI Input */}
                <form onSubmit={handleRunCli} className="flex items-center gap-2">
                  <span className="text-white font-bold">&gt;</span>
                  <input
                    type="text"
                    value={cliInput}
                    onChange={(e) => setCliInput(e.target.value)}
                    placeholder="Enter IRIS command (e.g. 'iris status', 'iris ping', 'help')..."
                    className="flex-1 bg-black/60 border border-[#00f0ff]/40 rounded px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-hidden focus:border-[#00f0ff]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#00f0ff] hover:bg-white text-black font-bold text-xs rounded transition-all cursor-pointer"
                  >
                    RUN
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: HARDWARE & OS CONTROL */}
          {activeTab === "hardware" && (
            <div className="bg-[#02131f] border border-[#00f0ff]/40 rounded-xl p-4 sm:p-5 space-y-5">
              <div className="border-b border-[#00f0ff]/20 pb-3">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#00f0ff]" />
                  <span>MANAGE PC SETTINGS // OS-LEVEL INTEGRATION</span>
                </h3>
                <p className="text-xs text-[#00f0ff]/70">
                  Direct hardware automation sliders with instantaneous state synchronization:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Master Volume */}
                <div className="bg-black/50 border border-[#00f0ff]/30 p-3.5 rounded-lg space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white font-bold flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-[#00f0ff]" />
                      <span>MASTER SYSTEM AUDIO</span>
                    </span>
                    <span className="font-mono text-[#00ff88]">{masterVolume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={masterVolume}
                    onChange={(e) => {
                      setMasterVolume(Number(e.target.value));
                      cyberSynth.playBeep(400 + Number(e.target.value) * 5, 0.02);
                    }}
                    className="w-full accent-[#00f0ff] cursor-pointer"
                  />
                </div>

                {/* Screen Brightness */}
                <div className="bg-black/50 border border-[#00f0ff]/30 p-3.5 rounded-lg space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white font-bold flex items-center gap-1.5">
                      <Monitor className="w-3.5 h-3.5 text-[#00f0ff]" />
                      <span>DISPLAY BRIGHTNESS</span>
                    </span>
                    <span className="font-mono text-[#00ff88]">{screenBrightness}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={screenBrightness}
                    onChange={(e) => {
                      setScreenBrightness(Number(e.target.value));
                      cyberSynth.playBeep(500 + Number(e.target.value) * 4, 0.02);
                    }}
                    className="w-full accent-[#00f0ff] cursor-pointer"
                  />
                </div>

                {/* High-DPI Matrix Scaling */}
                <div className="bg-black/50 border border-[#00f0ff]/30 p-3.5 rounded-lg space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white font-bold flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#00f0ff]" />
                      <span>HIGH-DPI MATRIX SCALING</span>
                    </span>
                    <span className="font-mono text-[#00ff88]">{highDpiScaling}%</span>
                  </div>
                  <div className="flex gap-2 pt-1">
                    {[100, 125, 150, 200].map((scale) => (
                      <button
                        key={scale}
                        onClick={() => {
                          cyberSynth.playBeep(950, 0.03);
                          setHighDpiScaling(scale);
                        }}
                        className={`flex-1 py-1 rounded text-[10px] font-mono font-bold border transition-all cursor-pointer ${
                          highDpiScaling === scale
                            ? "bg-[#00f0ff] text-black border-[#00f0ff]"
                            : "bg-black/40 text-gray-300 border-gray-700 hover:border-gray-500"
                        }`}
                      >
                        {scale}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Wireless Radio Toggles */}
                <div className="bg-black/50 border border-[#00f0ff]/30 p-3.5 rounded-lg space-y-2">
                  <div className="text-xs text-white font-bold">WIRELESS CONNECTIVITY</div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => {
                        cyberSynth.playBeep(1000, 0.03);
                        setWifiEnabled(!wifiEnabled);
                      }}
                      className={`p-2 rounded border text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        wifiEnabled
                          ? "bg-[#00ff88]/20 border-[#00ff88] text-[#00ff88]"
                          : "bg-red-500/20 border-red-500 text-red-400"
                      }`}
                    >
                      <Wifi className="w-3.5 h-3.5" />
                      <span>Wi-Fi 6E: {wifiEnabled ? "ON" : "OFF"}</span>
                    </button>

                    <button
                      onClick={() => {
                        cyberSynth.playBeep(1000, 0.03);
                        setBluetoothEnabled(!bluetoothEnabled);
                      }}
                      className={`p-2 rounded border text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        bluetoothEnabled
                          ? "bg-[#00ff88]/20 border-[#00ff88] text-[#00ff88]"
                          : "bg-red-500/20 border-red-500 text-red-400"
                      }`}
                    >
                      <Bluetooth className="w-3.5 h-3.5" />
                      <span>BT 5.4: {bluetoothEnabled ? "ON" : "OFF"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ENGINE & TOKEN TELEMETRY */}
          {activeTab === "telemetry" && (
            <div className="bg-[#02131f] border border-[#00f0ff]/40 rounded-xl p-4 sm:p-5 space-y-4 font-mono">
              <div className="border-b border-[#00f0ff]/20 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#00ff88]" />
                    <span>IRIS X AI KERNEL v1.8.3 SPECIFICATION</span>
                  </h3>
                  <p className="text-xs text-[#00f0ff]/70">Zero-Latency Voice Engine & Root Security Matrix</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#00ff88]/20 border border-[#00ff88] text-[#00ff88] text-[10px] font-bold">
                  PRO KERNEL ACTIVE
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-black/60 p-3 rounded-lg border border-[#00f0ff]/30">
                  <div className="text-[10px] text-gray-400">OPERATOR CLEARANCE</div>
                  <div className="text-xs font-bold text-white mt-1">Siraj Dil (Admin)</div>
                  <div className="text-[9px] text-[#00ff88] mt-0.5">sirajdil21@gmail.com</div>
                </div>

                <div className="bg-black/60 p-3 rounded-lg border border-[#00f0ff]/30">
                  <div className="text-[10px] text-gray-400">VOICE ENGINE LATENCY</div>
                  <div className="text-xs font-bold text-[#00ff88] mt-1">&lt; 18ms Roundtrip</div>
                  <div className="text-[9px] text-gray-400 mt-0.5">250ms chunks + VAD</div>
                </div>

                <div className="bg-black/60 p-3 rounded-lg border border-[#00f0ff]/30">
                  <div className="text-[10px] text-gray-400">LOCK SCREEN OVERRIDE</div>
                  <div className="text-xs font-bold text-[#00f0ff] mt-1">Direct Root Bypass</div>
                  <div className="text-[9px] text-[#00ff88] mt-0.5">PIN/FaceID Removed</div>
                </div>
              </div>

              <div className="p-3 bg-black/60 rounded-lg border border-[#00f0ff]/30 text-xs space-y-2">
                <div className="text-[#00ff88] font-bold">AI STATE COLOR CODING (v1.8.3 STANDARD):</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                  <div className="p-2 rounded border border-blue-500/40 bg-blue-500/10 text-blue-300">
                    <span className="font-bold">THINKING (Blue):</span> Gemini reasoning & tool invocation
                  </div>
                  <div className="p-2 rounded border border-emerald-500/40 bg-emerald-500/10 text-emerald-300">
                    <span className="font-bold">SPEAKING (Green):</span> Real-time PCM streaming & TTS
                  </div>
                  <div className="p-2 rounded border border-gray-300/40 bg-white/10 text-white">
                    <span className="font-bold">STANDBY (White):</span> Ready for wake word & hotkey
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#020d18] border-t border-[#00f0ff]/30 text-xs font-mono">
          <div className="text-[10px] text-[#00f0ff]/70 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff88]" />
            <span>IRIS v1.8.3 HOTKEY: [CTRL + ALT + I] OR SPACE</span>
          </div>

          <button
            onClick={() => {
              cyberSynth.playBeep(800, 0.04);
              onClose();
            }}
            className="px-4 py-1 bg-[#00f0ff] hover:bg-white text-black font-bold text-xs rounded transition-all cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
