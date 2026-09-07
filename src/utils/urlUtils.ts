// Safe URL and Intent Dispatcher for Stark-Tech Mark VII System

export interface SafeUrlResult {
  url: string;
  type: "web" | "phone" | "email" | "search" | "whatsapp" | "youtube" | "spotify";
  displayTitle?: string;
}

/**
 * Builds a valid, safely encoded URL avoiding syntax errors or malformed protocols.
 */
export function buildSafeUrl(rawInput: string): SafeUrlResult {
  const trimmed = (rawInput || "").trim();
  if (!trimmed) {
    return { url: "https://www.google.com", type: "search", displayTitle: "Google Search" };
  }

  // 1. Phone / Tel: "tel:", "call 12345", "dial +91...", "phone 987654"
  if (/^(tel:|call\b|dial\b|phone\b|call\s+karo|milao)/i.test(trimmed)) {
    const phoneNumber = trimmed
      .replace(/^(tel:|call\s+karo|call\b|dial\b|phone\b|milao|ko)\s*/gi, "")
      .replace(/[^\d+*#]/g, "");

    const telUrl = phoneNumber ? `tel:${phoneNumber}` : "tel:";
    return {
      url: telUrl,
      type: "phone",
      displayTitle: phoneNumber ? `Calling ${phoneNumber}` : "Tactical Dialer",
    };
  }

  // 2. Email / Mailto
  if (/^(mailto:|mail\b|email\b|email\s+karo)/i.test(trimmed)) {
    const email = trimmed.replace(/^(mailto:|mail\b|email\b|email\s+karo|to|ko|bhejo)\s*/gi, "").trim();
    if (email.includes("@")) {
      return {
        url: `mailto:${encodeURIComponent(email)}`,
        type: "email",
        displayTitle: `Email to ${email}`,
      };
    }
  }

  // 3. If already starts with http:// or https://
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const parsed = new URL(trimmed);
      return { url: parsed.href, type: "web", displayTitle: parsed.hostname };
    } catch {
      return {
        url: `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`,
        type: "search",
        displayTitle: `Search for ${trimmed}`,
      };
    }
  }

  // 4. Strip colon or invalid domain characters that break URL constructor (like "tel:.com")
  let cleanDomain = trimmed.replace(/[:\/\\?#]/g, "").replace(/\s+/g, "");

  // Check if it looks like a domain name with valid TLD (e.g. google.com, ai.google.dev, github.io)
  if (/^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(cleanDomain)) {
    return {
      url: `https://${cleanDomain}`,
      type: "web",
      displayTitle: cleanDomain,
    };
  }

  // If single word like "wikipedia", "github", "reddit", "youtube"
  if (/^[a-z0-9-]+$/i.test(cleanDomain) && cleanDomain.length > 1 && cleanDomain.length <= 32) {
    return {
      url: `https://www.${cleanDomain}.com`,
      type: "web",
      displayTitle: `${cleanDomain}.com`,
    };
  }

  // Fallback to Google web search
  return {
    url: `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`,
    type: "search",
    displayTitle: `Search for ${trimmed}`,
  };
}

/**
 * Safely executes window.open or protocol link without throwing SyntaxError or breaking iFrames.
 */
export function safeOpenUrl(rawUrl: string): boolean {
  if (!rawUrl || typeof rawUrl !== "string") return false;
  const trimmed = rawUrl.trim();
  if (!trimmed) return false;

  try {
    // Protocols like tel:, mailto:, sms: should be triggered via hidden anchor element
    if (/^(tel|mailto|sms):/i.test(trimmed)) {
      const anchor = document.createElement("a");
      anchor.href = trimmed;
      anchor.style.display = "none";
      anchor.rel = "noopener noreferrer";
      document.body.appendChild(anchor);
      anchor.click();
      setTimeout(() => {
        if (anchor.parentNode) {
          anchor.parentNode.removeChild(anchor);
        }
      }, 150);
      return true;
    }

    // Standard HTTP/HTTPS URLs
    let finalUrl = trimmed;
    try {
      if (!/^https?:\/\//i.test(trimmed)) {
        finalUrl = `https://${trimmed}`;
      }
      const parsed = new URL(finalUrl);
      finalUrl = parsed.href;
    } catch {
      finalUrl = `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`;
    }

    const win = window.open(finalUrl, "_blank", "noopener,noreferrer");
    return !!win;
  } catch (err) {
    console.warn("Safe open window error caught:", err);
    return false;
  }
}
