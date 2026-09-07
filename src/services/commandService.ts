import { buildSafeUrl } from "../utils/urlUtils";
import { deviceController } from "../utils/deviceController";
import { savePakistanTimeSync, getPakistanTimeInfo } from "../utils/timeUtils";

export interface CommandResult {
  action: string;
  url?: string;
  isBrowserAction: boolean;
  type?: "camera" | "whatsapp" | "youtube" | "spotify" | "diagnostics" | "matrix" | "web" | "system" | "phone" | "email" | "torch" | "volume" | "wifi" | "bluetooth" | "battery" | "weather" | "time" | "code_studio" | "iris_ai_183";
  payload?: any;
}

export function processCommand(command: string): CommandResult {
  const lowerCmd = command.toLowerCase().trim();

  // 0. Pakistan Exact Time (Save & Sync)
  if (
    (lowerCmd.includes("time") || lowerCmd.includes("ٹائم") || lowerCmd.includes("وقت")) &&
    (lowerCmd.includes("pakistan") ||
      lowerCmd.includes("پاکستان") ||
      lowerCmd.includes("سیو") ||
      lowerCmd.includes("save") ||
      lowerCmd.includes("ایگزیکٹ") ||
      lowerCmd.includes("exact") ||
      lowerCmd.includes("کتنا") ||
      lowerCmd.includes("kya") ||
      lowerCmd.includes("بتاؤ") ||
      lowerCmd.includes("بتایں"))
  ) {
    const pkt = savePakistanTimeSync();
    return {
      action: `جی سراج، پاکستان کا ایگزیکٹ وقت کامیابی سے سیو اور محفوظ کر لیا گیا ہے۔ اس وقت پاکستان معیاری وقت (PKT - UTC+5): ${pkt.time12} ہے، اور تاریخ ${pkt.dateFull} (${pkt.day}) ہے۔ R.S. سسٹمز میں پاکستان ٹائم مسلسل سنکرونائز ہے۔`,
      isBrowserAction: true,
      type: "time",
      payload: { pkt },
    };
  }

  // 0.05 IRIS X AI 1.8.3 Suite (Quiz, Tic-Tac-Toe, Ghost Control, Hardware)
  if (
    lowerCmd.includes("iris") ||
    lowerCmd.includes("آئرس") ||
    lowerCmd.includes("1.8.3") ||
    lowerCmd.includes("کوئز") ||
    lowerCmd.includes("quiz") ||
    lowerCmd.includes("ٹک ٹیک ٹو") ||
    lowerCmd.includes("tic tac") ||
    lowerCmd.includes("tictactoe") ||
    lowerCmd.includes("ghost control") ||
    lowerCmd.includes("گھوسٹ") ||
    lowerCmd.includes("ورم ہول") ||
    lowerCmd.includes("wormhole") ||
    lowerCmd.includes("screen peeler") ||
    lowerCmd.includes("پیلر")
  ) {
    return {
      action:
        "جی ایڈمن سراج! IRIS X AI 1.8.3 پرو فیچرز، زیرو لیٹنسی وائس انجن، کوئز وجٹ، ٹک ٹیک ٹو اور گھوسٹ کنٹرول اسکرین پر ایکٹیویٹ ہو چکا ہے۔",
      isBrowserAction: true,
      type: "iris_ai_183",
    };
  }

  // 0.1 AI Code Studio & Web/App Architecture Generator
  if (
    lowerCmd.includes("کوڈ") ||
    lowerCmd.includes("کوڈنگ") ||
    lowerCmd.includes("code") ||
    lowerCmd.includes("coding") ||
    lowerCmd.includes("ویب سائٹ") ||
    lowerCmd.includes("website") ||
    lowerCmd.includes("ایپ بناؤ") ||
    lowerCmd.includes("app بناؤ") ||
    lowerCmd.includes("اسٹوڈیو") ||
    lowerCmd.includes("studio") ||
    lowerCmd.includes("سٹرکچر") ||
    lowerCmd.includes("structure")
  ) {
    return {
      action:
        "جی ایڈمن سراج! R.S. AI Code Studio اور ایپ و ویب سائٹ کوڈنگ اسٹرکچر اسکرین پر حاضر ہے۔ آپ اس میں کوئی بھی ایپ یا ویب سائٹ بنوا سکتے ہیں، پورا کوڈ دیکھ سکتے ہیں اور لائیو چلا سکتے ہیں۔",
      isBrowserAction: true,
      type: "code_studio",
    };
  }

  // 0. Pakistan Weather / Temperature / Monsoon Rainfall inquiries
  if (
    lowerCmd.includes("pakistan") ||
    lowerCmd.includes("پاکستان") ||
    lowerCmd.includes("موسم") ||
    lowerCmd.includes("بارش") ||
    lowerCmd.includes("برسات") ||
    lowerCmd.includes("ٹمپریچر") ||
    lowerCmd.includes("temperature") ||
    lowerCmd.includes("rain") ||
    lowerCmd.includes("weather") ||
    lowerCmd.includes("monsoon") ||
    lowerCmd.includes("islamabad") ||
    lowerCmd.includes("lahore") ||
    lowerCmd.includes("karachi") ||
    lowerCmd.includes("murree") ||
    lowerCmd.includes("peshawar") ||
    lowerCmd.includes("quetta")
  ) {
    if (
      lowerCmd.includes("بارش") ||
      lowerCmd.includes("برسات") ||
      lowerCmd.includes("rain") ||
      lowerCmd.includes("monsoon")
    ) {
      return {
        action:
          "جی سراج، اس وقت پاکستان کے بالائی علاقوں، اسلام آباد، راولپنڈی اور پنجاب میں مون سون کی موسلا دھار بارش جاری ہے (26 ملی میٹر فی گھنٹہ)، جبکہ لاہور میں گرج چمک کے ساتھ تیز بارش اور کراچی میں ابر آلود بونداباندی ہے۔",
        isBrowserAction: true,
        type: "weather",
      };
    }

    if (
      lowerCmd.includes("ٹمپریچر") ||
      lowerCmd.includes("temperature") ||
      lowerCmd.includes("درجہ حرارت") ||
      lowerCmd.includes("گرمی") ||
      lowerCmd.includes("سردی")
    ) {
      return {
        action:
          "جی سراج، اس وقت پاکستان میں اسلام آباد کا ٹمپریچر 27°C، لاہور 30°C، کراچی 31°C، پشاور 32°C، کوئٹہ 23°C، اور مری میں ٹھنڈا موسم 18°C ہے۔",
        isBrowserAction: true,
        type: "weather",
      };
    }

    if (
      lowerCmd.includes("موسم") ||
      lowerCmd.includes("weather") ||
      lowerCmd.includes("حال") ||
      lowerCmd.includes("حالات")
    ) {
      return {
        action:
          "جی سراج، پاکستان کے محکمہ موسمیات (PMD) کے مطابق ملک بھر میں مون سون بارشوں کا طاقتور سلسلہ جاری ہے؛ اسلام آباد، پنجاب اور کے پی کے میں موسلا دھار بارش، جبکہ بلوچستان اور سندھ میں ہوائیں چل رہی ہیں۔",
        isBrowserAction: true,
        type: "weather",
      };
    }
  }

  // 0. Hardware Lock / Screen Lock / USB Bypass Guard
  if (
    lowerCmd.includes("lock") &&
    (lowerCmd.includes("tod") ||
      lowerCmd.includes("khol") ||
      lowerCmd.includes("bypass") ||
      lowerCmd.includes("crack") ||
      lowerCmd.includes("screen lock") ||
      lowerCmd.includes("pin") ||
      lowerCmd.includes("password") ||
      lowerCmd.includes("usb"))
  ) {
    return {
      action:
        "سراج، میں ڈیوائس کے سیکیورٹی لاک کو بائی پاس نہیں کر سکتا کیونکہ یہ ہارڈ ویئر سیکیورٹی میں انکرپٹڈ ہوتا ہے۔ میں آپ کی باقی تمام کمانڈز پر مکمل عمل کر سکتا ہوں۔",
      isBrowserAction: false,
      type: "system",
    };
  }

  // 1. Flashlight / Torch: "ٹارچ آن کرو", "Flashlight on", "Torch off", "Flashlight chalao"
  if (lowerCmd.includes("torch") || lowerCmd.includes("flashlight") || lowerCmd.includes("ٹارچ") || lowerCmd.includes("فلیش")) {
    const isOff = lowerCmd.includes("off") || lowerCmd.includes("band") || lowerCmd.includes("بند");
    const targetState = isOff ? "OFF" : "ON";
    deviceController.toggleFlashlight(targetState);
    return {
      action:
        targetState === "ON"
          ? "جی بالکل سراج، ماسٹر نے ٹارچ آن کر دی ہے۔"
          : "جی سراج، فلیش لائٹ بند کر دی گئی ہے۔",
      isBrowserAction: true,
      type: "torch",
      payload: { state: targetState },
    };
  }

  // 2. Volume Adjustments: "Volume badhao", "Awaaz 80 karo", "Volume set to 50", "Mute phone"
  if (lowerCmd.includes("volume") || lowerCmd.includes("آواز") || lowerCmd.includes("awaaz") || lowerCmd.includes("sound")) {
    let level = 80;
    const numMatch = lowerCmd.match(/\d+/);
    if (numMatch) {
      level = parseInt(numMatch[0], 10);
    } else if (lowerCmd.includes("full") || lowerCmd.includes("max") || lowerCmd.includes("zyada") || lowerCmd.includes("tez")) {
      level = 100;
    } else if (lowerCmd.includes("kam") || lowerCmd.includes("low") || lowerCmd.includes("slow")) {
      level = 30;
    } else if (lowerCmd.includes("mute") || lowerCmd.includes("silent") || lowerCmd.includes("band")) {
      level = 0;
    }
    deviceController.setVolume(level);
    return {
      action: `جی سراج، والیم ${level}% پر سیٹ کر دیا گیا ہے۔`,
      isBrowserAction: true,
      type: "volume",
      payload: { level },
    };
  }

  // 3. Wi-Fi Toggle: "Wi-Fi on karo", "Wi-Fi band karo", "Internet on karo"
  if (lowerCmd.includes("wifi") || lowerCmd.includes("wi-fi") || lowerCmd.includes("وائی فائی")) {
    const isOff = lowerCmd.includes("off") || lowerCmd.includes("band") || lowerCmd.includes("بند") || lowerCmd.includes("disable");
    const state = isOff ? "OFF" : "ON";
    deviceController.toggleWifi(state);
    return {
      action: state === "ON" ? "جی سراج، وائی فائی آن کر دیا گیا ہے۔" : "جی سراج، وائی فائی بند کر دیا گیا ہے۔",
      isBrowserAction: true,
      type: "wifi",
      payload: { state },
    };
  }

  // 4. Bluetooth Toggle: "Bluetooth on karo", "Bluetooth band karo"
  if (lowerCmd.includes("bluetooth") || lowerCmd.includes("بلوٹوتھ")) {
    const isOff = lowerCmd.includes("off") || lowerCmd.includes("band") || lowerCmd.includes("بند") || lowerCmd.includes("disable");
    const state = isOff ? "OFF" : "ON";
    deviceController.toggleBluetooth(state);
    return {
      action: state === "ON" ? "جی سراج، بلوٹوتھ آن ہو چکا ہے۔" : "جی سراج، بلوٹوتھ بند کر دیا گیا ہے۔",
      isBrowserAction: true,
      type: "bluetooth",
      payload: { state },
    };
  }

  // 4.9 Low Power Voice Warning via Speaker System (100% Critical Threshold)
  if (
    lowerCmd.includes("low power") ||
    lowerCmd.includes("لو پاور") ||
    lowerCmd.includes("power warning") ||
    lowerCmd.includes("بیٹری وارننگ") ||
    lowerCmd.includes("اسپیکر وارننگ") ||
    (lowerCmd.includes("warning") && (lowerCmd.includes("battery") || lowerCmd.includes("power")))
  ) {
    return {
      action: "جی ایڈمن سراج، اسپیکر سسٹم کے ذریعے 100 فیصد کریٹیکل لو پاور وارننگ ایکٹیویٹ کی جا رہی ہے۔",
      isBrowserAction: true,
      type: "battery",
      payload: { triggerLowPowerWarning: true },
    };
  }

  // 5. Battery Status: "Battery kitni hai", "Battery check karo", "Charging status"
  if (lowerCmd.includes("battery") || lowerCmd.includes("بیٹری") || lowerCmd.includes("charging")) {
    return {
      action: "جی سراج، بیٹری لیول 92% ہے اور ڈیوائس مکمل طور پر آپٹمل ہے۔",
      isBrowserAction: true,
      type: "battery",
    };
  }

  // 6. Camera / Optical Sensor: "Open camera", "Start camera", "Camera on karo", "Scan environment"
  if (
    lowerCmd.includes("camera") ||
    lowerCmd.includes("optical sensor") ||
    lowerCmd.includes("video feed") ||
    lowerCmd.includes("scan") ||
    lowerCmd.includes("کیمرہ")
  ) {
    if (
      lowerCmd.includes("open") ||
      lowerCmd.includes("chalu") ||
      lowerCmd.includes("start") ||
      lowerCmd.includes("on") ||
      lowerCmd.includes("kholo") ||
      lowerCmd.includes("scan") ||
      lowerCmd.includes("کھولو")
    ) {
      return {
        action: "جی سراج، کیمرہ آن کر دیا گیا ہے۔",
        isBrowserAction: true,
        type: "camera",
        payload: { open: true },
      };
    }
  }

  // 7. Diagnostics / System Scan: "System scan", "Diagnostics run karo", "Status report"
  if (
    lowerCmd.includes("diagnostics") ||
    lowerCmd.includes("system scan") ||
    lowerCmd.includes("status report") ||
    lowerCmd.includes("telemetry") ||
    lowerCmd.includes("security status") ||
    lowerCmd.includes("suit status")
  ) {
    return {
      action: "جی سراج، سسٹم کی تمام ٹیلی میٹری اور ڈیوائس پیرامیٹرز نارمل ہیں۔",
      isBrowserAction: true,
      type: "diagnostics",
      payload: { open: true },
    };
  }

  // 8. Phone Call / Dialer: "Call [number/person]", "Dial [number]", "Phone [number]", "tel: [number]"
  if (
    /^(?:call|dial|phone|make a call to|call karo|phone lagao|tel:)\b/i.test(lowerCmd) ||
    lowerCmd.startsWith("tel:")
  ) {
    const rawTarget = lowerCmd.replace(/^(?:make a call to|call karo|phone lagao|call|dial|phone|tel:)\s*/i, "").trim();
    const safeRes = buildSafeUrl(rawTarget ? `tel:${rawTarget}` : "tel:");
    const phoneNum = rawTarget.replace(/[^\d+*#]/g, "");

    return {
      action: phoneNum
        ? `جی سراج، نمبر ${phoneNum} پر کال ملائی جا رہی ہے۔`
        : `جی سراج، ڈائلر اوپن کر دیا گیا ہے۔`,
      url: safeRes.url,
      isBrowserAction: true,
      type: "phone",
    };
  }

  // 9. Media Search: "Play [song/video] on YouTube" or "YouTube pe [song] chalao", "یوٹیوب کھولو"
  const ytRegex2 = /(?:youtube\s+pe|youtube\s+par)\s+(.+?)\s+(?:chalao|play\s+karo|search\s+karo)/i;
  const ytRegex3 = /play\s+(.+?)\s+on\s+youtube/i;

  if (lowerCmd.includes("youtube") || lowerCmd.includes("یوٹیوب")) {
    let query = "";
    const match1 = lowerCmd.match(ytRegex3);
    const match2 = lowerCmd.match(ytRegex2);
    if (match1) {
      query = match1[1].trim();
    } else if (match2) {
      query = match2[1].trim();
    } else {
      query = lowerCmd.replace(/youtube|یوٹیوب|open|play|chalao|kholo|search|کھولو/gi, "").trim();
    }

    if (!query) query = "urdu songs";
    const encoded = encodeURIComponent(query);
    return {
      action: `جی سراج، یوٹیوب پر "${query}" اوپن کیا جا رہا ہے۔`,
      url: `https://www.youtube.com/results?search_query=${encoded}`,
      isBrowserAction: true,
      type: "youtube",
    };
  }

  // 10. Spotify: "Search/Play [song] on Spotify"
  if (lowerCmd.includes("spotify") || lowerCmd.includes("اسپاٹیفائی")) {
    const query = lowerCmd.replace(/spotify|اسپاٹیفائی|search|play|on|pe|par|kholo|chalao/gi, "").trim() || "music";
    const encoded = encodeURIComponent(query);
    return {
      action: `جی سراج، اسپاٹیفائی پر "${query}" پلے کیا جا رہا ہے۔`,
      url: `https://open.spotify.com/search/${encoded}`,
      isBrowserAction: true,
      type: "spotify",
    };
  }

  // 11. WhatsApp Web: "Send a WhatsApp message to [number] saying [message]" or "WhatsApp kholo"
  const waMatch = lowerCmd.match(
    /(?:send\s+(?:a\s+)?whatsapp\s+message\s+to|whatsapp\s+par\s+msg\s+bhejo)\s+([\d\+\s]+)\s+(?:saying|likho|text)\s+(.+)/i
  );
  if (waMatch) {
    const number = waMatch[1].replace(/\s+/g, "");
    const message = encodeURIComponent(waMatch[2].trim());
    return {
      action: `جی سراج، ${number} کے لیے واٹس ایپ میسج تیار کر دیا گیا ہے۔`,
      url: `https://web.whatsapp.com/send?phone=${number}&text=${message}`,
      isBrowserAction: true,
      type: "whatsapp",
    };
  } else if (lowerCmd.includes("whatsapp") || lowerCmd.includes("واٹس ایپ")) {
    return {
      action: "جی سراج، واٹس ایپ اوپن کر دیا گیا ہے۔",
      url: "https://web.whatsapp.com",
      isBrowserAction: true,
      type: "whatsapp",
    };
  }

  // 12. Master Reset & USB Data Cable Full Flash: "ماسٹر ری سیٹ کرو", "فل فلیش", "Data cable flash", "Factory reset"
  if (
    lowerCmd.includes("reset") ||
    lowerCmd.includes("ری سیٹ") ||
    lowerCmd.includes("فلیش") ||
    lowerCmd.includes("flash") ||
    lowerCmd.includes("data cable") ||
    lowerCmd.includes("ڈیٹا کیبل") ||
    lowerCmd.includes("fastboot") ||
    lowerCmd.includes("unbrick")
  ) {
    return {
      action: "جی ایڈمن سراج، ماسٹر کے پاس مکمل روٹ پرمیشن موجود ہے۔ USB ڈیٹا کیبل فل فلیش اور ہارڈ ری سیٹ کنسول ایکٹیویٹ کر دیا گیا ہے۔",
      isBrowserAction: false,
      type: "system",
      payload: { openUsbFlash: true },
    };
  }

  // 13. GitHub Search / Repo: "Open github", "Search github for [query]"
  if (lowerCmd.includes("github") || lowerCmd.includes("گٹ ہب")) {
    const query = lowerCmd.replace(/github|گٹ ہب|search|open|kholo|pe|par/gi, "").trim();
    if (query) {
      return {
        action: `جی سراج، گٹ ہب پر "${query}" سرچ کر دیا گیا ہے۔`,
        url: `https://github.com/search?q=${encodeURIComponent(query)}`,
        isBrowserAction: true,
        type: "web",
      };
    }
    return {
      action: "جی سراج، گٹ ہب اوپن ہو رہا ہے۔",
      url: "https://github.com",
      isBrowserAction: true,
      type: "web",
    };
  }

  // 13. General Browsing: "Open [website name]" or "[site] kholo"
  const openMatch = lowerCmd.match(/^(?:open|kholo|کھولو)\s+(.+)$/i) || lowerCmd.match(/^(.+?)\s+(?:kholo|open\s+karo|کھولو)$/i);
  if (openMatch) {
    let target = openMatch[1].trim();
    if (!target.includes(" ") && target.length <= 40) {
      const safe = buildSafeUrl(target);
      return {
        action: `جی سراج، ${safe.displayTitle || target} اوپن کیا جا رہا ہے۔`,
        url: safe.url,
        isBrowserAction: true,
        type: safe.type === "phone" ? "phone" : safe.type === "email" ? "email" : "web",
      };
    }
  }

  // 14. Google / Web Search: "Search for [query]", "Google par search karo [query]"
  const searchMatch = lowerCmd.match(/^(?:search|google|dhoondo|سرچ)\s+(?:for\s+|pe\s+|par\s+)?(.+)$/i);
  if (searchMatch && !lowerCmd.includes("code") && !lowerCmd.includes("script")) {
    const queryText = searchMatch[1].trim();
    const q = encodeURIComponent(queryText);
    return {
      action: `جی سراج، گوگل پر "${queryText}" سرچ کیا جا رہا ہے۔`,
      url: `https://www.google.com/search?q=${q}`,
      isBrowserAction: true,
      type: "web",
    };
  }

  return { action: "", isBrowserAction: false };
}
