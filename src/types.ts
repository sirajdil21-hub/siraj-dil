export type AppState = "idle" | "listening" | "processing" | "speaking";

export type ArmorTheme = "cyan" | "combat" | "stealth";

export type VisualsMode = "spectrum" | "camera" | "radar" | "neural";

export interface ChatMessage {
  id: string;
  sender: "user" | "master" | "jarvis" | "system";
  text: string;
  timestamp?: string;
}

export interface TelemetryData {
  cpuUsage: number;
  cpuSpeed: number; // e.g. 3003 MHz
  ramPercent: number; // e.g. 62%
  ramUsedGB: number; // e.g. 1.2 GB
  ramTotalGB: number; // e.g. 1.9 GB
  batteryPercent: number;
  uptimeSeconds: number;
  networkUp: number;
  networkDown: number;
  timeStr: string;
  dateStr: string;
  weatherCondition: string;
  weatherTempC: number;
}
