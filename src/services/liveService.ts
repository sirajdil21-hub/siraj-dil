import { GoogleGenAI, LiveServerMessage, Modality, Type } from "@google/genai";
import { JARVIS_SYSTEM_INSTRUCTION } from "./geminiService";
import { buildSafeUrl } from "../utils/urlUtils";

export class LiveSessionManager {
  private ai: GoogleGenAI;
  private sessionPromise: Promise<any> | null = null;
  private audioContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private processor: ScriptProcessorNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;

  // Audio playback state
  private playbackContext: AudioContext | null = null;
  private nextPlayTime: number = 0;
  private isPlaying: boolean = false;
  public isMuted: boolean = false;

  public voiceName: string = "Charon";

  public onStateChange: (state: "idle" | "listening" | "processing" | "speaking") => void = () => {};
  public onMessage: (sender: "user" | "jarvis" | "peter" | "anam", text: string) => void = () => {};
  public onCommand: (url: string, type?: string, payload?: any) => void = () => {};
  public onError: (error: any) => void = () => {};

  constructor(voiceName: string = "Charon") {
    this.voiceName = voiceName;
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  async start() {
    try {
      this.onStateChange("processing");

      // Initialize Audio Contexts
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioContextClass({ sampleRate: 16000 });
      this.playbackContext = new AudioContextClass({ sampleRate: 24000 });
      this.nextPlayTime = this.playbackContext.currentTime;

      // Get Microphone
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      this.source = this.audioContext.createMediaStreamSource(this.mediaStream);
      this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);

      this.processor.onaudioprocess = (e) => {
        if (!this.sessionPromise) return;
        const inputData = e.inputBuffer.getChannelData(0);
        const pcm16 = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          const s = Math.max(-1, Math.min(1, inputData[i]));
          pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
        }

        // Convert to base64
        const buffer = new ArrayBuffer(pcm16.length * 2);
        const view = new DataView(buffer);
        for (let i = 0; i < pcm16.length; i++) {
          view.setInt16(i * 2, pcm16[i], true);
        }

        let binary = "";
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const base64Data = btoa(binary);

        this.sessionPromise
          .then((session) => {
            session.sendRealtimeInput({
              audio: { data: base64Data, mimeType: "audio/pcm;rate=16000" },
            });
          })
          .catch((err) => console.error("Error streaming microphone audio to Live API:", err));
      };

      this.source.connect(this.processor);
      this.processor.connect(this.audioContext.destination);

      // Connect to Live API
      this.sessionPromise = this.ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: this.voiceName || "Charon" } },
          },
          systemInstruction: JARVIS_SYSTEM_INSTRUCTION,
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          tools: [
            {
              functionDeclarations: [
                {
                  name: "toggle_flashlight",
                  description: "Turn mobile flashlight or torch ON or OFF.",
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      state: {
                        type: Type.STRING,
                        description: "'ON' or 'OFF'",
                      },
                    },
                    required: ["state"],
                  },
                },
                {
                  name: "set_volume",
                  description: "Set the device volume level from 0 to 100.",
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      level: {
                        type: Type.NUMBER,
                        description: "Volume percentage level (0 to 100).",
                      },
                    },
                    required: ["level"],
                  },
                },
                {
                  name: "toggle_wifi",
                  description: "Turn Wi-Fi ON or OFF on the device.",
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      state: {
                        type: Type.STRING,
                        description: "'ON' or 'OFF'",
                      },
                    },
                    required: ["state"],
                  },
                },
                {
                  name: "toggle_bluetooth",
                  description: "Turn Bluetooth ON or OFF on the device.",
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      state: {
                        type: Type.STRING,
                        description: "'ON' or 'OFF'",
                      },
                    },
                    required: ["state"],
                  },
                },
                {
                  name: "open_application",
                  description: "Open any application or browser URL (e.g. YouTube, WhatsApp, Camera, Settings, Spotify, Diagnostics, or Web search) on behalf of Siraj.",
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      app_name: {
                        type: Type.STRING,
                        description: "The name of the app: 'YouTube', 'WhatsApp', 'Camera', 'Spotify', 'Settings', 'Diagnostics', or search query.",
                      },
                      query: {
                        type: Type.STRING,
                        description: "Optional search query or message content.",
                      },
                      target: {
                        type: Type.STRING,
                        description: "The target phone number for WhatsApp or Phone calls.",
                      },
                    },
                    required: ["app_name"],
                  },
                },
              ],
            },
          ],
        },
        callbacks: {
          onopen: () => {
            console.log("JARVIS Live Tactical Stream connected");
            this.onStateChange("listening");
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Audio Output
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              this.onStateChange("speaking");
              this.playAudioChunk(base64Audio);
            }

            // Handle Interruption
            if (message.serverContent?.interrupted) {
              this.stopPlayback();
              this.onStateChange("listening");
            }

            // Handle Transcriptions
            const userText = message.serverContent?.modelTurn?.parts?.[0]?.text;
            if (userText) {
              this.onMessage("jarvis", userText);
            }

            // Handle Function Calls
            const functionCalls = message.toolCall?.functionCalls;
            if (functionCalls && functionCalls.length > 0) {
              for (const call of functionCalls) {
                let toolResult = "Command executed successfully for Siraj.";

                if (call.name === "toggle_flashlight") {
                  const args = call.args as any;
                  const state = args.state === "ON" ? "ON" : "OFF";
                  this.onCommand("", "torch", { state });
                  toolResult = `Flashlight ${state} set.`;
                } else if (call.name === "set_volume") {
                  const args = call.args as any;
                  const level = typeof args.level === "number" ? args.level : 80;
                  this.onCommand("", "volume", { level });
                  toolResult = `Volume set to ${level}%.`;
                } else if (call.name === "toggle_wifi") {
                  const args = call.args as any;
                  const state = args.state === "ON" ? "ON" : "OFF";
                  this.onCommand("", "wifi", { state });
                  toolResult = `Wi-Fi ${state} set.`;
                } else if (call.name === "toggle_bluetooth") {
                  const args = call.args as any;
                  const state = args.state === "ON" ? "ON" : "OFF";
                  this.onCommand("", "bluetooth", { state });
                  toolResult = `Bluetooth ${state} set.`;
                } else if (call.name === "open_application" || call.name === "executeSystemAction") {
                  const args = call.args as any;
                  const appName = (args.app_name || args.actionType || "").toLowerCase();
                  let url = "";

                  if (appName.includes("camera")) {
                    this.onCommand("", "camera", { open: true });
                  } else if (appName.includes("diagnostics")) {
                    this.onCommand("", "diagnostics", { open: true });
                  } else if (appName.includes("torch") || appName.includes("flashlight")) {
                    this.onCommand("", "torch", { state: "ON" });
                  } else if (appName.includes("youtube")) {
                    url = `https://www.youtube.com/results?search_query=${encodeURIComponent(args.query || "urdu songs")}`;
                    this.onCommand(url, "youtube");
                  } else if (appName.includes("spotify")) {
                    url = `https://open.spotify.com/search/${encodeURIComponent(args.query || "music")}`;
                    this.onCommand(url, "spotify");
                  } else if (appName.includes("whatsapp")) {
                    url = `https://web.whatsapp.com/send?phone=${args.target || ""}&text=${encodeURIComponent(args.query || "")}`;
                    this.onCommand(url, "whatsapp");
                  } else {
                    const safeRes = buildSafeUrl(args.query || args.app_name || "");
                    url = safeRes.url;
                    this.onCommand(url, safeRes.type);
                  }
                }

                // Send tool response back to Gemini Live
                this.sessionPromise?.then((session) => {
                  session.sendToolResponse({
                    functionResponses: [
                      {
                        name: call.name,
                        id: call.id,
                        response: { result: toolResult },
                      },
                    ],
                  });
                });
              }
            }
          },
          onclose: () => {
            console.log("JARVIS Live Session terminated");
            this.stop();
          },
          onerror: (err) => {
            console.warn("JARVIS Live API Socket Error:", err);
            this.stop();
            this.onError(err);
          },
        },
      });
    } catch (error) {
      console.warn("Failed to initialize JARVIS Live stream:", error);
      this.stop();
      this.onError(error);
      throw error;
    }
  }

  private playAudioChunk(base64Data: string) {
    if (!this.playbackContext || this.isMuted) return;

    try {
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const buffer = new Int16Array(bytes.buffer);
      const audioBuffer = this.playbackContext.createBuffer(1, buffer.length, 24000);
      const channelData = audioBuffer.getChannelData(0);
      for (let i = 0; i < buffer.length; i++) {
        channelData[i] = buffer[i] / 32768.0;
      }

      const source = this.playbackContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.playbackContext.destination);

      const currentTime = this.playbackContext.currentTime;
      if (this.nextPlayTime < currentTime) {
        this.nextPlayTime = currentTime;
      }

      source.start(this.nextPlayTime);
      this.nextPlayTime += audioBuffer.duration;
      this.isPlaying = true;

      source.onended = () => {
        if (this.playbackContext && this.playbackContext.currentTime >= this.nextPlayTime - 0.1) {
          this.isPlaying = false;
          this.onStateChange("listening");
        }
      };
    } catch (e) {
      console.error("Error playing Live Audio buffer chunk:", e);
    }
  }

  private stopPlayback() {
    if (this.playbackContext) {
      this.playbackContext.close().catch(() => {});
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.playbackContext = new AudioContextClass({ sampleRate: 24000 });
      this.nextPlayTime = this.playbackContext.currentTime;
      this.isPlaying = false;
    }
  }

  stop() {
    if (this.processor) {
      this.processor.disconnect();
      this.processor = null;
    }
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((t) => t.stop());
      this.mediaStream = null;
    }
    if (this.audioContext) {
      this.audioContext.close().catch(() => {});
      this.audioContext = null;
    }
    this.stopPlayback();

    if (this.sessionPromise) {
      this.sessionPromise.then((session) => session.close()).catch(() => {});
      this.sessionPromise = null;
    }

    this.onStateChange("idle");
  }

  sendText(text: string) {
    if (this.sessionPromise) {
      this.sessionPromise.then((session) => {
        session.sendRealtimeInput({ text });
      });
    }
  }
}
