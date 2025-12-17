export interface Timer {
  id: string;
  name: string;
  duration: number; // in seconds
  remaining: number; // in seconds
  status: 'paused' | 'running' | 'finished';
  createdAt: number;
}

export interface TimerStore {
  timers: Timer[];
  addTimer: (name: string, duration: number) => Promise<void>;
  removeTimer: (id: string) => Promise<void>;
  startTimer: (id: string) => Promise<void>;
  pauseTimer: (id: string) => Promise<void>;
  resetTimer: (id: string) => Promise<void>;
  resetAllTimers: () => Promise<void>;
  updateTimer: (id: string, remaining: number) => Promise<void>;
  setTimerFinished: (id: string) => Promise<void>;
  loadTimers: () => Promise<void>;
}
