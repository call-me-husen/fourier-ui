export default function formatTime(date: Date, showTimeZone: boolean = false): string {
  // Convert to user's browser timezone
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: showTimeZone ? "short" : undefined
  })
}