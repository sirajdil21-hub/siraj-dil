import React, { useState } from "react";
import { Search } from "lucide-react";

interface CommandBarProps {
  userName?: string;
  onSubmitCommand: (cmd: string) => void;
  disabled?: boolean;
}

export default function CommandBar({
  userName = "Siraj",
  onSubmitCommand,
  disabled = false,
}: CommandBarProps) {
  const [inputVal, setInputVal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || disabled) return;
    onSubmitCommand(inputVal.trim());
    setInputVal("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-2xl mx-auto flex items-center justify-between border-2 border-[#00ff88]/80 bg-[#041a1b]/95 rounded-full px-3 py-1 shadow-[0_0_20px_rgba(0,255,136,0.3)] backdrop-blur-md shrink-0 mt-1"
    >
      <div className="flex items-center gap-1.5 flex-1 overflow-hidden">
        <span className="text-[10.5px] sm:text-xs font-mono font-bold text-[#00ff88] shrink-0 tracking-wider">
          COMMAND [{userName}]'s SYSTEM:
        </span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Enter voice command or system query..."
          disabled={disabled}
          className="flex-1 bg-transparent border-none outline-none text-white text-[11px] sm:text-xs font-mono placeholder:text-white/30 px-1"
        />
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="w-6 h-6 rounded-full bg-[#00ff88]/20 hover:bg-[#00ff88]/40 border border-[#00ff88] flex items-center justify-center text-[#00ff88] transition-all cursor-pointer shrink-0 ml-1"
        title="Execute Command"
      >
        <Search size={13} />
      </button>
    </form>
  );
}
