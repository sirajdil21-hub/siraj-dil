// Pakistan Standard Time (PKT - UTC+5) Synced Utility for R.S. Tactical HUD

export interface PakistanTimeInfo {
  time24: string;
  timeHoursMinutes: string;
  time12: string;
  seconds: string;
  milliseconds: string;
  day: string;
  dateFull: string;
  dateShort: string;
  timezone: string;
  urduLabel: string;
  syncedTimestamp: number;
}

export function getPakistanTimeInfo(date = new Date()): PakistanTimeInfo {
  // Asia/Karachi is standard UTC+5
  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Karachi",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const time12Formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Karachi",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const dayFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Karachi",
    weekday: "long",
  });

  const fullDateFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Karachi",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const shortDateFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Karachi",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const parts = timeFormatter.formatToParts(date);
  const hours = parts.find((p) => p.type === "hour")?.value || "00";
  const minutes = parts.find((p) => p.type === "minute")?.value || "00";
  const seconds = parts.find((p) => p.type === "second")?.value || "00";
  const ms = String(date.getMilliseconds()).padStart(3, "0");

  return {
    time24: `${hours}:${minutes}:${seconds}`,
    timeHoursMinutes: `${hours}:${minutes}`,
    time12: time12Formatter.format(date),
    seconds,
    milliseconds: ms,
    day: dayFormatter.format(date).toUpperCase(),
    dateFull: fullDateFormatter.format(date),
    dateShort: shortDateFormatter.format(date),
    timezone: "PKT (UTC+5)",
    urduLabel: "پاکستان کا معیاری وقت",
    syncedTimestamp: date.getTime(),
  };
}

export function savePakistanTimeSync() {
  const current = getPakistanTimeInfo();
  try {
    localStorage.setItem(
      "rs_pakistan_time_sync",
      JSON.stringify({
        saved: true,
        timezone: "Asia/Karachi",
        offset: "+05:00",
        lastSync: new Date().toISOString(),
        formattedTime: current.time12,
        formattedDate: current.dateFull,
      })
    );
  } catch (e) {
    console.error("Failed to save Pakistan time sync", e);
  }
  return current;
}
