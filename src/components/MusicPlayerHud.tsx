import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Square,
  Volume2,
  VolumeX,
  Music as MusicIcon,
} from "lucide-react";
import { cyberSynth } from "../utils/audioUtils";

interface MusicPlayerHudProps {
  onSongChange?: (title: string) => void;
}

const PLAYLIST = [
  { title: "1. ONEWAY - MARCH WINAMP", artist: "Stark Records", duration: 168 },
  { title: "2. AC/DC - BACK IN BLACK (JARVIS REMIX)", artist: "Iron Man OST", duration: 255 },
  { title: "3. DRIVING WITH THE TOP DOWN", artist: "Ramin Djawadi", duration: 190 },
  { title: "4. SUIT UP MARK VII THEME", artist: "Stark Industries", duration: 210 },
];

export default function MusicPlayerHud({ onSongChange }: MusicPlayerHudProps) {
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(45); // percentage
  const [volume, setVolume] = useState(85);
  const [isMuted, setIsMuted] = useState(false);

  const currentTrack = PLAYLIST[currentTrackIdx];

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    cyberSynth.playBeep(isPlaying ? 600 : 900, 0.05);
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    cyberSynth.playBeep(1100, 0.04);
    const nextIdx = (currentTrackIdx + 1) % PLAYLIST.length;
    setCurrentTrackIdx(nextIdx);
    setProgress(0);
    if (onSongChange) onSongChange(PLAYLIST[nextIdx].title);
  };

  const handlePrev = () => {
    cyberSynth.playBeep(800, 0.04);
    const prevIdx = (currentTrackIdx - 1 + PLAYLIST.length) % PLAYLIST.length;
    setCurrentTrackIdx(prevIdx);
    setProgress(0);
    if (onSongChange) onSongChange(PLAYLIST[prevIdx].title);
  };

  const handleStop = () => {
    cyberSynth.playBeep(450, 0.05);
    setIsPlaying(false);
    setProgress(0);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const currentSecs = Math.floor((progress / 100) * currentTrack.duration);

  return (
    <div className="relative border border-[#ff003c]/60 rounded-xs bg-[#100104]/90 p-2 text-[#ff003c] font-mono text-[9.5px] shadow-[0_0_15px_rgba(255,0,60,0.2)]">
      {/* Top Diamond Indicator and Track Title matching photo */}
      <div className="flex items-center gap-1.5 border-b border-[#ff003c]/30 pb-1">
        <span className="w-2 h-2 transform rotate-45 border border-[#ff003c] bg-[#ff003c]/30 shrink-0" />
        <div className="flex-1 truncate font-bold text-white tracking-wider text-[9px]">
          {currentTrack.title}
        </div>
        <span className="text-[#ff3366] text-[8px] shrink-0 font-semibold">WINAMP</span>
      </div>

      {/* Progress & Time */}
      <div className="flex items-center justify-between text-[8px] text-[#ff6688] pt-1">
        <span>{formatTime(currentSecs)}</span>
        <div className="flex-1 mx-2 h-1.5 bg-black/80 rounded-xs border border-[#ff003c]/40 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#ff003c] to-[#ff6600]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span>{formatTime(currentTrack.duration)}</span>
      </div>

      {/* Media Controls Bar matching screenshot */}
      <div className="flex items-center justify-between pt-1.5">
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            className="w-5 h-4.5 bg-black/80 border border-[#ff003c]/50 hover:bg-[#ff003c]/20 rounded-xs flex items-center justify-center text-white cursor-pointer"
            title="Previous Track"
          >
            <SkipBack size={10} />
          </button>
          <button
            onClick={togglePlay}
            className="w-6 h-4.5 bg-[#ff003c]/30 border border-[#ff003c] hover:bg-[#ff003c]/50 rounded-xs flex items-center justify-center text-white cursor-pointer shadow-[0_0_8px_#ff003c]"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={10} /> : <Play size={10} />}
          </button>
          <button
            onClick={handleStop}
            className="w-5 h-4.5 bg-black/80 border border-[#ff003c]/50 hover:bg-[#ff003c]/20 rounded-xs flex items-center justify-center text-white cursor-pointer"
            title="Stop"
          >
            <Square size={9} />
          </button>
          <button
            onClick={handleNext}
            className="w-5 h-4.5 bg-black/80 border border-[#ff003c]/50 hover:bg-[#ff003c]/20 rounded-xs flex items-center justify-center text-white cursor-pointer"
            title="Next Track"
          >
            <SkipForward size={10} />
          </button>
        </div>

        {/* Mini 8-band Equalizer Bars */}
        <div className="flex items-end gap-0.5 h-4">
          {[40, 75, 90, 60, 85, 50, 70, 95].map((val, idx) => (
            <motion.div
              key={idx}
              animate={{
                height: isPlaying ? [`${val * 0.3}%`, `${val}%`, `${val * 0.5}%`] : "25%",
              }}
              transition={{
                duration: 0.4 + idx * 0.08,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="w-1 bg-gradient-to-t from-[#ff003c] to-[#ffcc00] rounded-xs"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
