import React, { useState, useRef, useEffect } from "react";
import { Terminal, Copy, Check, Play, Maximize2, Minimize2, Trash2, Cpu, ShieldAlert, Wifi, Zap, Flame } from "lucide-react";
import { cyberSynth } from "../utils/audioUtils";

interface ChatMessage {
  id: string;
  sender: "user" | "jarvis" | "peter" | "anam";
  text: string;
  timestamp?: string;
}

interface TerminalLogProps {
  messages: ChatMessage[];
  onClear: () => void;
  onSendCommand: (cmd: string) => void;
  isProcessing?: boolean;
}

const STARK_HUD_BANNER = `
      ██╗ █████╗ ██████╗ ██╗   ██╗██╗███████╗
      ██║██╔══██╗██╔══██╗██║   ██║██║██╔════╝
      ██║███████║██████╔╝██║   ██║██║███████╗
 ██   ██║██╔══██║██╔══██╗╚██╗ ██╔╝██║╚════██║
 ╚█████╔╝██║  ██║██║  ██║ ╚████╔╝ ██║███████║
  ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚═╝╚══════╝
 [ J.A.R.V.I.S. MARK VII // COMMANDER: SIRAJ DIL ]
`;

export default function TerminalLog({
  messages,
  onClear,
  onSendCommand,
  isProcessing = false,
}: TerminalLogProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isProcessing]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    cyberSynth.playBeep(1400, 0.04);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    cyberSynth.playBeep(900, 0.05);
    onSendCommand(terminalInput);
    setTerminalInput("");
  };

  const renderMessageContent = (rawText: string, msgId: string) => {
    const parts = rawText.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const lines = part.slice(3, -3).trim().split("\n");
        const language = lines[0].match(/^[a-zA-Z0-9_-]+$/) ? lines[0] : "bash";
        const codeContent = lines[0].match(/^[a-zA-Z0-9_-]+$/)
          ? lines.slice(1).join("\n")
          : lines.join("\n");

        const blockId = `${msgId}-code-${index}`;

        return (
          <div
            key={index}
            className="my-3 rounded border border-[#00f0ff]/40 bg-black/95 p-0 font-mono text-xs overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.2)]"
          >
            {/* HUD Code Header Bar */}
            <div className="flex items-center justify-between bg-[#00f0ff]/15 px-3 py-1.5 border-b border-[#00f0ff]/30 text-[11px] text-[#00f0ff]">
              <div className="flex items-center gap-2">
                <Terminal size={13} className="text-[#00f0ff]" />
                <span className="uppercase font-bold tracking-wider text-white">
                  JARVIS TACTICAL ENGINE :: {language}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(codeContent, blockId)}
                  className="flex items-center gap-1 hover:text-white px-2 py-0.5 rounded bg-[#00f0ff]/20 border border-[#00f0ff]/40 text-[#00f0ff] transition-colors"
                  title="Copy code"
                >
                  {copiedId === blockId ? (
                    <>
                      <Check size={12} className="text-emerald-400" />
                      <span className="text-[10px] text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span className="text-[10px]">COPY CODE</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code Body */}
            <pre className="p-3 text-[#00f0ff] font-mono text-[11.5px] leading-relaxed overflow-x-auto whitespace-pre selection:bg-[#00f0ff]/30 selection:text-white">
              <code>{codeContent}</code>
            </pre>
          </div>
        );
      }

      // Format inline HUD tags like [SYSTEMS: OPTIMAL | LATENCY: 0ms]
      const hudTagParts = part.split(/(\[SYSTEMS:[^\]]+\])/gi);

      return (
        <span key={index} className="leading-relaxed">
          {hudTagParts.map((subPart, subIdx) => {
            if (subPart.startsWith("[SYSTEMS:") && subPart.endsWith("]")) {
              return (
                <div
                  key={subIdx}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 my-1 rounded bg-[#00f0ff]/15 border border-[#00f0ff]/40 text-[#ffd700] font-mono text-[10.5px] font-bold tracking-wider uppercase block"
                >
                  <Zap size={11} className="text-[#00f0ff]" />
                  <span>{subPart.slice(1, -1)}</span>
                </div>
              );
            }

            const inlineParts = subPart.split(/(`[^`]+`)/g);
            return (
              <span key={subIdx}>
                {inlineParts.map((codePart, codeIdx) => {
                  if (codePart.startsWith("`") && codePart.endsWith("`")) {
                    return (
                      <code
                        key={codeIdx}
                        className="bg-[#ffd700]/15 text-[#ffd700] border border-[#ffd700]/40 px-1.5 py-0.5 rounded font-mono text-[11px] mx-0.5"
                      >
                        {codePart.slice(1, -1)}
                      </code>
                    );
                  }
                  return codePart;
                })}
              </span>
            );
          })}
        </span>
      );
    });
  };

  return (
    <div
      className={`flex flex-col rounded-lg border-2 border-[#00f0ff]/50 bg-[#020912]/95 backdrop-blur-2xl shadow-[0_0_35px_rgba(0,240,255,0.2),inset_0_0_15px_rgba(0,240,255,0.05)] font-mono transition-all duration-300 ${
        isExpanded
          ? "fixed inset-4 z-50 md:inset-8"
          : "w-full h-full max-h-[380px] lg:max-h-[460px]"
      }`}
    >
      {/* HUD Titlebar */}
      <div className="flex items-center justify-between border-b border-[#00f0ff]/30 bg-black/70 px-3 py-2 text-xs select-none">
        <div className="flex items-center gap-2 text-[#00f0ff]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff003c] inline-block shadow-[0_0_6px_#ff003c]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffd700] inline-block shadow-[0_0_6px_#ffd700]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] inline-block shadow-[0_0_6px_#00f0ff]" />
          </div>
          <span className="font-bold tracking-wider text-[11px] ml-2 text-[#ffd700]">
            JARVIS_HUD::STARK_TACTICAL_CORE [SIRAJ_DIL_OVERRIDE]
          </span>
        </div>

        <div className="flex items-center gap-3 text-[#00f0ff]/80">
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-[#00f0ff] font-bold">
            <Wifi size={11} className="animate-pulse text-[#ffd700]" />
            TELEMETRY LINK :: 100%
          </span>

          <button
            onClick={() => {
              cyberSynth.playBeep(1100, 0.04);
              setIsExpanded(!isExpanded);
            }}
            className="p-1 hover:text-white transition-colors"
            title={isExpanded ? "Minimize HUD" : "Expand HUD"}
          >
            {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>

          {messages.length > 0 && (
            <button
              onClick={() => {
                cyberSynth.playBeep(600, 0.05);
                onClear();
              }}
              className="p-1 hover:text-[#ff003c] transition-colors"
              title="Flush HUD Buffer"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      {/* HUD Telemetry Stream Area */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-3 scrollbar-hide">
        {/* Stark ASCII HUD Header */}
        <pre className="text-[8.5px] md:text-[9.5px] leading-[1.1] text-[#00f0ff] font-bold overflow-x-auto whitespace-pre select-none drop-shadow-[0_0_10px_rgba(0,240,255,0.7)]">
          {STARK_HUD_BANNER}
        </pre>

        {/* Live Suit Diagnostics Bar */}
        <div className="border-l-2 border-[#ffd700] pl-3 py-1 space-y-1 text-[10.5px] text-[#00f0ff]/80 bg-[#00f0ff]/5 rounded-r">
          <p className="flex items-center gap-2">
            <Cpu size={12} className="text-[#ffd700]" />
            <span>[STARK_CORE] Status: 100% // JARVIS Intelligence: ONLINE</span>
          </p>
          <p className="flex items-center gap-2">
            <ShieldAlert size={12} className="text-[#00f0ff]" />
            <span>[PILOT_CLEARANCE] Authorized Commander: <strong className="text-white">Siraj Dil</strong></span>
          </p>
          <p className="text-[#ffd700]/90">
            [TACTICAL_VOICE] Low-Latency Live Voice Protocol Ready.
          </p>
        </div>

        {/* Messages */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2.5 rounded border transition-all ${
              msg.sender === "user"
                ? "bg-[#ffd700]/10 border-[#ffd700]/40 text-[#ffd700]"
                : "bg-black/70 border-[#00f0ff]/30 text-[#00f0ff]"
            }`}
          >
            <div className="flex items-center justify-between text-[10px] text-[#00f0ff]/70 mb-1 select-none font-bold">
              <span className="tracking-wider">
                {msg.sender === "user" ? ">>> SIRAJ DIL [COMMAND]" : "JARVIS [TACTICAL RESPONSE]"}
              </span>
              <span>{msg.timestamp || new Date().toLocaleTimeString()}</span>
            </div>
            <div className="text-[11.5px] text-white">
              {renderMessageContent(msg.text, msg.id)}
            </div>
          </div>
        ))}

        {isProcessing && (
          <div className="flex items-center gap-2 text-[#ffd700] text-xs animate-pulse pl-1 font-bold">
            <span className="inline-block w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
            <span>[JARVIS] Processing tactical query for Siraj Dil...</span>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Tactical Shell Input */}
      <form
        onSubmit={handleTerminalSubmit}
        className="flex items-center border-t border-[#00f0ff]/30 bg-black/85 px-3 py-2 gap-2"
      >
        <span className="text-[#ffd700] font-bold text-xs select-none">JARVIS&gt;</span>
        <input
          type="text"
          value={terminalInput}
          onChange={(e) => setTerminalInput(e.target.value)}
          placeholder="Command JARVIS (e.g. 'open camera', 'write python exploit', 'play AC/DC')..."
          className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder:text-[#00f0ff]/40 selection:bg-[#00f0ff]/40"
        />
        <button
          type="submit"
          disabled={!terminalInput.trim()}
          className="flex items-center gap-1 px-3 py-1 bg-[#00f0ff]/20 hover:bg-[#00f0ff]/30 border border-[#00f0ff]/50 text-[#00f0ff] font-bold rounded text-xs transition-colors disabled:opacity-30"
        >
          <Play size={11} />
          <span>EXECUTE</span>
        </button>
      </form>
    </div>
  );
}
