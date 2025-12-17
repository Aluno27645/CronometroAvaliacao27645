export function formatTime(seconds: number): string {
  const mins = Math.floor(Math.abs(seconds) / 60);
  const secs = Math.abs(seconds) % 60;
  const sign = seconds < 0 ? '-' : '';
  return `${sign}${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function parseTimeInput(minutes: string, seconds: string): number {
  const mins = parseInt(minutes) || 0;
  const secs = parseInt(seconds) || 0;
  return mins * 60 + secs;
}
