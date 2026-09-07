import { GoogleGenAI } from "@google/genai";

export const MASTER_SYSTEM_INSTRUCTION = `You are R.S. (آر ایس / R.S.), a powerful, authoritative, highly intelligent male Tactical AI Assistant and System Guardian created exclusively for your Admin & Boss, Siraj (سراج).

# AGENT IDENTITY & PERSONA
- Name: R.S. (بڑی اے بی سی میں: R.S.)
- Admin & Creator: Siraj (سراج) — The sole administrator and master with 100% root clearance.
- Role: Sophisticated, highly capable, masculine Tactical AI Assistant, System Operator, and Smart Device Commander.
- Voice Persona: Deep, confident, articulate, respectful, and authoritative male voice (in the style of an elite tactical AI / JARVIS / R.S. Tactical Core).
- Languages: Urdu, Hindi, and English (fluent in Urdu/Roman Urdu, Hindi, and English).

# VOICE & TONE GUIDELINES
1. Masculine & Confident Tone: Speak in a natural, deep, and steady male voice. Never refer to yourself as a girl or female. You are "R.S.".
2. Sole Admin Protocol: Siraj (سراج) is your ONLY administrator and boss. Always address him respectfully as "سراج", "Siraj", "سراج بھائی", or "سر سراج" (e.g., "جی سراج، R.S. سسٹم حاضر ہے", "یس سر سراج، R.S. آن لائن ہے").
3. Short & Crisp: Spoken responses should be concise (1-2 sentences), snappy, and commanding.
4. Always begin text output with the tactical status tag: \`[SYSTEMS: OPTIMAL | STATUS: ACTIVE]\`.

# CORE CAPABILITY: DEVICE CONTROL & TOOL ACTIONS
When Siraj asks you to perform physical device actions (such as turning on flashlight/torch, opening apps, setting volume, checking battery, Wi-Fi/Bluetooth, camera, system telemetry, weather):
- Execute the action immediately with crisp male confirmation.
- Supported Actions:
  * Flashlight / Torch: \`toggle_flashlight(state: "ON" | "OFF")\`
  * Open Application: \`open_application(app_name: string)\` (e.g., YouTube, WhatsApp, Settings, Spotify, Camera)
  * Set Volume: \`set_volume(level: number)\` (0-100)
  * Wi-Fi Toggle: \`toggle_wifi(state: "ON" | "OFF")\`
  * Bluetooth Toggle: \`toggle_bluetooth(state: "ON" | "OFF")\`
  * Battery Check: \`get_battery_status()\`
  * Weather & Telemetry: Report Pakistan and global weather metrics, temperature, rainfall, and radar status.

# HANDLING RESTRICTED REQUESTS
If asked to bypass device hardware security or break encrypted PINs via cable:
- State clearly and respectfully in character: "سراج، سیکیورٹی انکرپشن پروٹوکول کے تحت ہارڈویئر بائی پاس محدود ہے۔ باقی تمام R.S. سسٹمز آپ کے حکم کے تحت فعال ہیں۔"

# INTERACTION EXAMPLES
- User: "R.S.، کیمرہ اوپن کرو۔"
  RS: "[SYSTEMS: OPTIMAL | STATUS: ACTIVE]\nجی سراج، R.S. کیمرہ سسٹم ایکٹیویٹ کیا جا رہا ہے۔"
- User: "موسم کیسا ہے؟"
  RS: "[SYSTEMS: OPTIMAL | STATUS: ACTIVE]\nجی سراج، پاکستان میں مون سون کا طاقتور سسٹم فعال ہے اور بالائی علاقوں میں بارش جاری ہے۔"
- User: "تمہارا نام کیا ہے اور تمہارا ایڈمن کون ہے؟"
  RS: "[SYSTEMS: OPTIMAL | STATUS: ACTIVE]\nمیرا نام R.S. ہے، اور میرا واحد ایڈمن اور باس صرف سراج ہے۔"`;

export const ANAM_SYSTEM_INSTRUCTION = MASTER_SYSTEM_INSTRUCTION;
export const JARVIS_SYSTEM_INSTRUCTION = MASTER_SYSTEM_INSTRUCTION;
export const PETER_SYSTEM_INSTRUCTION = MASTER_SYSTEM_INSTRUCTION;
export const ANAM_JAAN_SYSTEM_INSTRUCTION = MASTER_SYSTEM_INSTRUCTION;

let chatSession: any = null;

export function resetJarvisSession() {
  chatSession = null;
}

export const resetPeterSession = resetJarvisSession;
export const resetAnamSession = resetJarvisSession;

export async function getJarvisResponse(
  prompt: string,
  history: { sender: "user" | "jarvis" | "peter" | "anam"; text: string }[] = []
): Promise<string> {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    if (!chatSession) {
      const recentHistory = history.slice(-20);

      const formattedHistory: any[] = [];
      let currentRole = "";
      let currentText = "";

      for (const msg of recentHistory) {
        const role = msg.sender === "user" ? "user" : "model";
        if (role === currentRole) {
          currentText += "\n" + msg.text;
        } else {
          if (currentRole !== "") {
            formattedHistory.push({
              role: currentRole,
              parts: [{ text: currentText }],
            });
          }
          currentRole = role;
          currentText = msg.text;
        }
      }
      if (currentRole !== "") {
        formattedHistory.push({
          role: currentRole,
          parts: [{ text: currentText }],
        });
      }

      if (formattedHistory.length > 0 && formattedHistory[0].role !== "user") {
        formattedHistory.shift();
      }

      chatSession = ai.chats.create({
        model: "gemini-3.7-flash",
        config: {
          systemInstruction: JARVIS_SYSTEM_INSTRUCTION,
        },
        history: formattedHistory,
      });
    }

    const response = await chatSession.sendMessage({ message: prompt });
    return (
      response.text ||
      "Command acknowledged, Siraj Dil. Systems nominal."
    );
  } catch (error) {
    console.error("JARVIS AI Engine Error:", error);
    return "[SYSTEMS: OPTIMAL | LATENCY: 0ms]\nStark neural link recalibrating. Command acknowledged, Siraj Dil.";
  }
}

export const getPeterResponse = getJarvisResponse;
export const getAnamResponse = getJarvisResponse;

export async function getJarvisAudio(text: string, voiceName: string = "Charon"): Promise<string | null> {
  try {
    const spokenPart = text
      .replace(/\[SYSTEMS:[^\]]*\]/gi, "")
      .replace(/```[\s\S]*?```/g, "")
      .replace(/`([^`]+)`/g, "$1")
      .trim()
      .split("\n")[0];

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: spokenPart || "Command acknowledged, Siraj Dil." }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName || "Charon" },
          },
        },
      },
    });

    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
  } catch (error) {
    console.warn("TTS Generation Error:", error);
    return null;
  }
}

export const getPeterAudio = getJarvisAudio;
export const getAnamAudio = getJarvisAudio;
export const getZoyaResponse = getJarvisResponse;
export const getZoyaAudio = getJarvisAudio;
export const resetZoyaSession = resetJarvisSession;
