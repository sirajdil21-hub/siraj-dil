// Audio utilities for Peter: Cyber Synthesizer SFX, PCM 24kHz Audio Player, and Zero-Latency Voice Fallback

class CyberSynth {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // System Initialization / Startup Cyber Hum
  playStartupSound() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(80, now);
      osc1.frequency.exponentialRampToValueAtTime(440, now + 0.4);
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.8);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(120, now);
      osc2.frequency.exponentialRampToValueAtTime(554.37, now + 0.5);
      osc2.frequency.exponentialRampToValueAtTime(1108.73, now + 0.85);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.2);
      osc2.stop(now + 1.2);
    } catch (e) {
      console.warn("Audio synth warning:", e);
    }
  }

  // Terminal Execution Click / Key Beep
  playBeep(freq = 1200, duration = 0.05) {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      // ignore audio context restrictions
    }
  }

  // Command Override / Success Chime
  playOverrideSuccess() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.06, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.25);
      });
    } catch (e) {}
  }

  // Arc Reactor Pulse / Power Surge SFX
  playReactorSurge() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.35);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.7);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.7);
    } catch (e) {}
  }

  // Suit Combat / Stealth Mode Switch Sound
  playModeSwitch() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      [350, 520, 780].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.05, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.2);
      });
    } catch (e) {}
  }

  // Security Alert / Tactical Warning Buzzer
  playLockWarning() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      [320, 260, 220].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0.08, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.18);
      });
    } catch (e) {}
  }

  // Tactical Low Power Emergency Alarm Siren
  playLowPowerAlarm() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // High-urgency alternating two-tone siren
      const tones = [880, 587.33, 880, 587.33, 440];
      tones.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0.12, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.22);
      });
    } catch (e) {}
  }

  // Ambient Cyber Beat Loop for the "Visuals" Monitor
  private ambientTimer: any = null;
  private isAmbientPlaying: boolean = false;

  toggleAmbientMusic(onStateChange?: (playing: boolean) => void) {
    if (this.isAmbientPlaying) {
      this.stopAmbientMusic();
      if (onStateChange) onStateChange(false);
      return false;
    } else {
      this.startAmbientMusic();
      if (onStateChange) onStateChange(true);
      return true;
    }
  }

  startAmbientMusic() {
    const ctx = this.getContext();
    if (!ctx) return;
    this.stopAmbientMusic();
    this.isAmbientPlaying = true;

    // Pattern of futuristic bass synth notes
    const notes = [65.41, 77.78, 87.31, 98.0, 87.31, 65.41]; // C2, Eb2, F2, G2, F2, C2
    let step = 0;

    const playNote = () => {
      if (!this.isAmbientPlaying || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const freq = notes[step % notes.length];
        step++;

        // Sub bass
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.45);

        // Hi-hat tick
        if (step % 2 === 0) {
          const tickOsc = this.ctx.createOscillator();
          const tickGain = this.ctx.createGain();
          tickOsc.type = "triangle";
          tickOsc.frequency.setValueAtTime(4500, now);
          tickGain.gain.setValueAtTime(0.015, now);
          tickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
          tickOsc.connect(tickGain);
          tickGain.connect(this.ctx.destination);
          tickOsc.start(now);
          tickOsc.stop(now + 0.04);
        }
      } catch (e) {}
    };

    playNote();
    this.ambientTimer = setInterval(playNote, 420);
  }

  stopAmbientMusic() {
    this.isAmbientPlaying = false;
    if (this.ambientTimer) {
      clearInterval(this.ambientTimer);
      this.ambientTimer = null;
    }
  }
}

export const cyberSynth = new CyberSynth();

// Play 24kHz / 16kHz PCM audio chunk from Gemini
export async function playPCM(base64Data: string, sampleRate = 24000): Promise<void> {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const audioCtx = new AudioContextClass({ sampleRate });
    const binaryString = atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const buffer = new Int16Array(bytes.buffer);
    const audioBuffer = audioCtx.createBuffer(1, buffer.length, sampleRate);
    const channelData = audioBuffer.getChannelData(0);
    for (let i = 0; i < buffer.length; i++) {
      channelData[i] = buffer[i] / 32768.0;
    }
    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioCtx.destination);
    source.start();

    return new Promise<void>((resolve) => {
      source.onended = () => {
        audioCtx.close().catch(() => {});
        resolve();
      };
    });
  } catch (error) {
    console.error("Error playing PCM audio:", error);
  }
}

// Zero-Latency Instant Speech Fallback using Browser SpeechSynthesis (Deep Male Voice Default)
export function speakInstantTTS(text: string, onEnd?: () => void, isFemaleVoice: boolean = false): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return false;
  }

  try {
    window.speechSynthesis.cancel(); // cancel any stale speech
    // Clean markdown tags or code blocks for clean speech
    const cleanText = text
      .replace(/\[SYSTEMS:[^\]]*\]/gi, "")
      .replace(/```[\s\S]*?```/g, "")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/[#*_~\[\]]/g, "")
      .trim();

    if (!cleanText) {
      if (onEnd) onEnd();
      return true;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = isFemaleVoice ? 1.15 : 0.88; // Deep rich tone for Master

    const voices = window.speechSynthesis.getVoices();
    let preferredVoice: SpeechSynthesisVoice | undefined;

    if (!isFemaleVoice) {
      // Prioritize deep, authoritative masculine voices
      preferredVoice =
        voices.find(
          (v) =>
            (v.name.toLowerCase().includes("david") ||
              v.name.toLowerCase().includes("google uk english male") ||
              v.name.toLowerCase().includes("google hi-in") ||
              v.name.toLowerCase().includes("mark") ||
              v.name.toLowerCase().includes("guy") ||
              v.name.toLowerCase().includes("george") ||
              v.name.toLowerCase().includes("male") ||
              v.name.toLowerCase().includes("james") ||
              v.name.toLowerCase().includes("ravi") ||
              v.name.toLowerCase().includes("daniel")) &&
            !v.name.toLowerCase().includes("female") &&
            !v.name.toLowerCase().includes("zira") &&
            !v.name.toLowerCase().includes("samantha")
        ) ||
        voices.find((v) => (v.lang.startsWith("ur") || v.lang.startsWith("hi")) && !v.name.toLowerCase().includes("female")) ||
        voices.find((v) => v.name.toLowerCase().includes("male")) ||
        voices.find((v) => !v.name.toLowerCase().includes("female") && !v.name.toLowerCase().includes("zira"));
    } else {
      preferredVoice =
        voices.find(
          (v) =>
            (v.name.toLowerCase().includes("female") ||
              v.name.toLowerCase().includes("zira") ||
              v.name.toLowerCase().includes("samantha") ||
              v.name.toLowerCase().includes("swara")) &&
            !v.name.toLowerCase().includes("male")
        );
    }

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (e) {
    console.warn("SpeechSynthesis error:", e);
    return false;
  }
}

/**
 * Triggers a voice-based 'Low Power' warning via the speaker system
 * if the battery level reaches a critical threshold of 100% (or specified threshold).
 *
 * @param batteryLevel - Current battery percentage (0 to 100)
 * @param criticalThreshold - Critical threshold to evaluate against (defaults to 100%)
 * @param force - If true, bypasses threshold check and fires warning immediately (e.g. for testing)
 * @returns boolean indicating whether the warning was triggered
 */
export function triggerLowPowerWarning(
  batteryLevel: number = 100,
  criticalThreshold: number = 100,
  force: boolean = false
): boolean {
  // Check if critical threshold of 100% is reached
  const isThresholdMet =
    force ||
    batteryLevel >= criticalThreshold ||
    (criticalThreshold === 100 ? batteryLevel === 100 : batteryLevel <= criticalThreshold);

  if (!isThresholdMet) {
    return false;
  }

  // 1. Trigger tactical audio alarm siren
  cyberSynth.playLowPowerAlarm();

  // 2. Broadcast authoritative voice-based Low Power warning through the speaker system
  const voiceMessage = `وارننگ! لو پاور الرٹ۔ بیٹری لیول کریٹیکل تھریشولڈ ${batteryLevel} فیصد پر پہنچ چکا ہے۔ سراج، فوری طور پر سسٹم پاور اور چارجنگ اڈاپٹر چیک کریں۔`;

  // Interrupt lower-priority speech so the emergency speaker alert plays immediately
  speakInstantTTS(voiceMessage, undefined, true);

  return true;
}

