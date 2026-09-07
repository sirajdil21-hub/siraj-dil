import React, { useState, useEffect, useRef, useCallback } from "react";
import { getJarvisResponse, getJarvisAudio, resetJarvisSession } from "./services/geminiService";
import { processCommand } from "./services/commandService";
import { LiveSessionManager } from "./services/liveService";
import IronManMark7CyanHud from "./components/IronManMark7CyanHud";
import SniperRadicalHud057 from "./components/SniperRadicalHud057";
import PermissionModal from "./components/PermissionModal";
import CyberCameraModal from "./components/CyberCameraModal";
import SystemDiagnosticsModal from "./components/SystemDiagnosticsModal";
import UsbFlashModal from "./components/UsbFlashModal";
import CyberCodeStudioModal from "./components/CyberCodeStudioModal";
import IrisAi183Modal from "./components/IrisAi183Modal";
import { playPCM, speakInstantTTS, cyberSynth, triggerLowPowerWarning } from "./utils/audioUtils";
import { safeOpenUrl } from "./utils/urlUtils";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

type AppState = "idle" | "listening" | "processing" | "speaking";

interface ChatMessage {
  id: string;
  sender: "user" | "master" | "jarvis" | "system";
  text: string;
  timestamp?: string;
}

const INITIAL_WELCOME =
  "جی سراج! R.S. سسٹم آن لائن ہے۔ تمام ٹیکٹیکل اور ڈیوائس سسٹمز 100 فیصد فعال ہیں، بتائیں سراج، R.S. آپ کی کیا خدمت کرے؟";

export default function App() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem("master_hud_history_v1");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
    return [
      {
        id: "init-welcome",
        sender: "master",
        text: `[SYSTEMS: OPTIMAL | STATUS: ACTIVE]\n${INITIAL_WELCOME}`,
        timestamp: new Date().toLocaleTimeString(),
      },
    ];
  });
  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;
    localStorage.setItem("master_hud_history_v1", JSON.stringify(messages));
  }, [messages]);

  const [selectedVoice, setSelectedVoice] = useState<"Charon" | "Fenrir" | "Puck" | "Orus">("Charon");
  const [isMuted, setIsMuted] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showDiagnosticsModal, setShowDiagnosticsModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showUsbFlashModal, setShowUsbFlashModal] = useState(false);
  const [showCodeStudioModal, setShowCodeStudioModal] = useState(false);
  const [showIrisAi183Modal, setShowIrisAi183Modal] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [hudView, setHudView] = useState<"mark7" | "sniper057">("sniper057");

  const handleMasterHardReset = useCallback(() => {
    localStorage.removeItem("master_hud_history_v1");
    resetJarvisSession();
    const resetMsg: ChatMessage = {
      id: "reset-" + Date.now(),
      sender: "master",
      text: `[SYSTEMS: R.S. REFLASHED | 100% REBOOTED]\nجی ایڈمن سراج! R.S. کور کامیابی کے ساتھ فل فلیش اور فیکٹری ری سیٹ ہو چکا ہے۔ تمام سسٹمز کلین اسٹیٹ میں آن لائن ہیں۔`,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([resetMsg]);
    setCurrentTranscript("");
    setCurrentResponse("جی سراج! ماسٹر کور فل فلیش اور فیکٹری ری سیٹ ہو چکا ہے۔ میں بالکل تیار ہوں۔");
    cyberSynth.playStartupSound();
    if (!isMuted) {
      setAppState("speaking");
      speakInstantTTS(
        "جی ایڈمن سراج، ماسٹر سسٹم کو کامیابی کے ساتھ فل فلیش اور ری سیٹ کر دیا گیا ہے۔ تمام کور سسٹمز بالکل کلین اور ایکٹیو ہیں۔",
        () => setAppState("idle"),
        false
      );
    }
  }, [isMuted]);

  const [currentTranscript, setCurrentTranscript] = useState("");
  const [currentResponse, setCurrentResponse] = useState(INITIAL_WELCOME);

  const liveSessionRef = useRef<LiveSessionManager | null>(null);
  const speechRecognitionRef = useRef<any>(null);
  const hasInitializedAudio = useRef(false);

  // Sync mute state with live session
  useEffect(() => {
    if (liveSessionRef.current) {
      liveSessionRef.current.isMuted = isMuted;
    }
  }, [isMuted]);

  // Voice startup welcome on first interaction
  const triggerStartupVoice = useCallback(() => {
    if (hasInitializedAudio.current) return;
    hasInitializedAudio.current = true;
    cyberSynth.playStartupSound();
    if (!isMuted) {
      setAppState("speaking");
      speakInstantTTS(INITIAL_WELCOME, () => {
        setAppState("idle");
      }, false);
    }
  }, [isMuted]);

  useEffect(() => {
    const handleFirstClick = () => {
      triggerStartupVoice();
      window.removeEventListener("click", handleFirstClick);
    };
    window.addEventListener("click", handleFirstClick);

    const timer = setTimeout(() => {
      triggerStartupVoice();
    }, 700);

    return () => {
      window.removeEventListener("click", handleFirstClick);
      clearTimeout(timer);
    };
  }, [triggerStartupVoice]);

  // Voice & Speech Execution Routine
  const speakResponse = useCallback(
    async (text: string) => {
      if (isMuted) {
        setAppState("idle");
        return;
      }
      setAppState("speaking");

      const spokenPart = text
        .replace(/\[SYSTEMS:[^\]]*\]/gi, "")
        .replace(/```[\s\S]*?```/g, "")
        .replace(/`([^`]+)`/g, "$1")
        .trim()
        .split("\n")[0];

      speakInstantTTS(spokenPart, () => {
        setAppState("idle");
      }, false);

      try {
        const audioBase64 = await getJarvisAudio(spokenPart, selectedVoice);
        if (audioBase64) {
          await playPCM(audioBase64);
        }
      } catch (e) {
        // Handled gracefully
      }

      setAppState("idle");
    },
    [isMuted, selectedVoice]
  );

  // Central Command Dispatcher
  const handleCommand = useCallback(
    async (rawTranscript: string) => {
      const trimmed = rawTranscript.trim();
      if (!trimmed) {
        setAppState("idle");
        return;
      }

      cyberSynth.playBeep(950, 0.05);
      setCurrentTranscript(trimmed);

      const timestamp = new Date().toLocaleTimeString();
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), sender: "user", text: trimmed, timestamp },
      ]);

      if (isSessionActive && liveSessionRef.current) {
        liveSessionRef.current.sendText(trimmed);
        return;
      }

      setAppState("processing");

      const cmdResult = processCommand(trimmed);

      if (cmdResult.isBrowserAction || cmdResult.action) {
        cyberSynth.playOverrideSuccess();
        const responseText = `[SYSTEMS: OPTIMAL | STATUS: ACTIVE]\n${cmdResult.action}`;
        setCurrentResponse(cmdResult.action);

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + "-m",
            sender: "master",
            text: responseText,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);

        await speakResponse(cmdResult.action);

        if (cmdResult.type === "camera") {
          setShowCameraModal(true);
        } else if (cmdResult.type === "diagnostics") {
          setShowDiagnosticsModal(true);
        } else if (cmdResult.type === "iris_ai_183") {
          setShowIrisAi183Modal(true);
        } else if (cmdResult.type === "battery") {
          if (cmdResult.payload?.triggerLowPowerWarning) {
            triggerLowPowerWarning(100, 100, true);
          }
          const btn = document.getElementById("hud-realtime-battery-indicator");
          if (btn) btn.click();
        } else if (cmdResult.type === "code_studio") {
          setShowCodeStudioModal(true);
        } else if (cmdResult.payload?.openUsbFlash) {
          setShowUsbFlashModal(true);
        } else if (cmdResult.url) {
          setTimeout(() => {
            safeOpenUrl(cmdResult.url!);
          }, 1100);
        }
        setAppState("idle");
      } else {
        const rawResponse = await getJarvisResponse(trimmed, messagesRef.current);
        const responseText = rawResponse.startsWith("[SYSTEMS:")
          ? rawResponse
          : `[SYSTEMS: OPTIMAL | STATUS: ACTIVE]\n${rawResponse}`;

        setCurrentResponse(rawResponse);

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + "-m",
            sender: "master",
            text: responseText,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);

        await speakResponse(rawResponse);
      }
    },
    [isMuted, isSessionActive, speakResponse]
  );

  // Speech Recognition fallback
  const initSpeechRecognition = () => {
    if (typeof window === "undefined") return null;
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      cyberSynth.playBeep(1200, 0.05);
      setAppState("listening");
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleCommand(transcript);
    };

    recognition.onerror = (event: any) => {
      console.warn("Speech recognition event:", event.error);
      setAppState("idle");
      if (event.error === "not-allowed") {
        setShowPermissionModal(true);
      }
    };

    recognition.onend = () => {
      if (appState === "listening") {
        setAppState("idle");
      }
    };

    return recognition;
  };

  // Toggle Live Voice Session
  const toggleListening = async () => {
    triggerStartupVoice();

    if (isSessionActive) {
      setIsSessionActive(false);
      if (liveSessionRef.current) {
        liveSessionRef.current.stop();
        liveSessionRef.current = null;
      }
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
      }
      setAppState("idle");
      resetJarvisSession();
      cyberSynth.playBeep(450, 0.08);
    } else {
      try {
        setIsSessionActive(true);
        resetJarvisSession();
        cyberSynth.playStartupSound();

        const session = new LiveSessionManager(selectedVoice);
        session.isMuted = isMuted;
        liveSessionRef.current = session;

        session.onStateChange = (state) => {
          setAppState(state);
        };

        session.onError = (err) => {
          console.warn("Live API session encountered error:", err);
          setIsSessionActive(false);
          setAppState("idle");
          setShowPermissionModal(true);
        };

        session.onMessage = (sender, text) => {
          setCurrentResponse(text);
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString() + "-" + sender,
              sender,
              text: text.startsWith("[SYSTEMS:") ? text : `[SYSTEMS: OPTIMAL | STATUS: ACTIVE]\n${text}`,
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
        };

        session.onCommand = (url, type, payload) => {
          cyberSynth.playOverrideSuccess();
          if (type === "camera" || payload?.open) {
            setShowCameraModal(true);
          } else if (type === "diagnostics") {
            setShowDiagnosticsModal(true);
          } else if (url) {
            setTimeout(() => {
              safeOpenUrl(url);
            }, 800);
          }
        };

        await session.start();
      } catch (e) {
        console.warn("Live API fallback to Web Speech Recognition:", e);
        setIsSessionActive(false);
        setAppState("idle");
        if (liveSessionRef.current) {
          liveSessionRef.current.stop();
          liveSessionRef.current = null;
        }

        const recognition = initSpeechRecognition();
        if (recognition) {
          try {
            speechRecognitionRef.current = recognition;
            recognition.start();
          } catch (recErr) {
            setShowPermissionModal(true);
          }
        } else {
          setShowPermissionModal(true);
        }
      }
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-black flex flex-col">
      {/* Permission & System Modals */}
      {showPermissionModal && (
        <PermissionModal
          onClose={() => setShowPermissionModal(false)}
          onOpenKeyboard={() => {
            setShowPermissionModal(false);
          }}
          onPermissionGranted={() => toggleListening()}
        />
      )}
      {showCameraModal && (
        <CyberCameraModal onClose={() => setShowCameraModal(false)} />
      )}
      {showDiagnosticsModal && (
        <SystemDiagnosticsModal onClose={() => setShowDiagnosticsModal(false)} />
      )}
      {showUsbFlashModal && (
        <UsbFlashModal
          isOpen={showUsbFlashModal}
          onClose={() => setShowUsbFlashModal(false)}
          onPerformHardReset={handleMasterHardReset}
        />
      )}
      {showCodeStudioModal && (
        <CyberCodeStudioModal
          isOpen={showCodeStudioModal}
          onClose={() => setShowCodeStudioModal(false)}
        />
      )}
      {showIrisAi183Modal && (
        <IrisAi183Modal
          isOpen={showIrisAi183Modal}
          onClose={() => setShowIrisAi183Modal(false)}
          onRunCommand={handleCommand}
        />
      )}

      {/* Toggleable HUD Interfaces: Mark VII Tactical HUD or Sniper Radical Screen 057 */}
      {hudView === "sniper057" ? (
        <SniperRadicalHud057
          state={appState}
          transcript={currentTranscript}
          response={currentResponse}
          onVoiceToggle={toggleListening}
          onSendText={handleCommand}
          isVoiceActive={isSessionActive}
          onOpenDiagnostics={() => setShowDiagnosticsModal(true)}
          onOpenUsbFlash={() => setShowUsbFlashModal(true)}
          onOpenCodeStudio={() => setShowCodeStudioModal(true)}
          onOpenIrisAi183={() => setShowIrisAi183Modal(true)}
          onSwitchToMark7={() => setHudView("mark7")}
        />
      ) : (
        <IronManMark7CyanHud
          state={appState}
          transcript={currentTranscript}
          response={currentResponse}
          onVoiceToggle={toggleListening}
          onSendText={handleCommand}
          isVoiceActive={isSessionActive}
          onOpenDiagnostics={() => setShowDiagnosticsModal(true)}
          onOpenSecurity={() => handleCommand("سیکیورٹی پروٹوکول ایکٹیو کرو")}
          onOpenUsbFlash={() => setShowUsbFlashModal(true)}
          onOpenCodeStudio={() => setShowCodeStudioModal(true)}
          onOpenIrisAi183={() => setShowIrisAi183Modal(true)}
          onSwitchToSniper057={() => setHudView("sniper057")}
        />
      )}
    </div>
  );
}

