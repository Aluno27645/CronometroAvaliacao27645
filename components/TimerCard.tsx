'use client';

import { useEffect, useState } from 'react';
import { useTimerStore } from '@/lib/store';
import { formatTime } from '@/lib/utils';
import { Timer } from '@/lib/types';

interface TimerCardProps {
  timer: Timer;
}

export default function TimerCard({ timer }: TimerCardProps) {
  const { startTimer, pauseTimer, resetTimer, removeTimer, updateTimer, setTimerFinished } = useTimerStore();
  const [localTime, setLocalTime] = useState(timer.remaining);

  useEffect(() => {
    setLocalTime(timer.remaining);
  }, [timer.remaining]);

  useEffect(() => {
    if (timer.status === 'running') {
      const interval = setInterval(() => {
        const newTime = timer.remaining - 1;
        updateTimer(timer.id, newTime);
        setLocalTime(newTime);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer.status, timer.remaining, timer.id, updateTimer]);

  const handleStartPause = async () => {
    if (timer.status === 'running') {
      await pauseTimer(timer.id);
    } else if (timer.status === 'paused') {
      await startTimer(timer.id);
    } else {
      await resetTimer(timer.id);
    }
  };

  const isOvertime = timer.status === 'running' && timer.remaining < 0;
  const isFinished = timer.status === 'finished' || timer.remaining <= 0;
  
  const minutes = Math.floor(Math.abs(localTime) / 60);
  const seconds = Math.abs(localTime) % 60;
  const sign = localTime < 0 ? '-' : '';

  return (
    <div className={`bg-gradient-to-br from-[#313244] to-[#181825] backdrop-blur-sm rounded-3xl p-6 border transition-all ${
      timer.status === 'running' 
        ? 'border-[#cba6f7] shadow-xl shadow-[#cba6f7]/30' 
        : isFinished 
        ? 'border-[#f38ba8]/50' 
        : 'border-[#45475a]'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold uppercase tracking-wide text-[#cdd6f4]">{timer.name}</h3>
        <button
          onClick={() => removeTimer(timer.id)}
          className="text-[#a6adc8] hover:text-[#f38ba8] transition-colors"
          title="Remover"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="flex-1 bg-[#181825] rounded-2xl p-4 text-center border border-[#45475a]">
          <div className={`text-5xl font-bold mb-1 ${
            isOvertime ? 'text-[#f38ba8]' : isFinished ? 'text-[#eba0ac]' : timer.status === 'running' ? 'text-[#cdd6f4]' : 'text-[#bac2de]'
          }`}>
            {sign}{String(minutes).padStart(2, '0')}
          </div>
          <div className="text-xs text-[#a6adc8] uppercase tracking-wider">Minutos</div>
        </div>
        <div className="flex-1 bg-[#181825] rounded-2xl p-4 text-center border border-[#45475a]">
          <div className={`text-5xl font-bold mb-1 ${
            isOvertime ? 'text-[#f38ba8]' : isFinished ? 'text-[#eba0ac]' : timer.status === 'running' ? 'text-[#cdd6f4]' : 'text-[#bac2de]'
          }`}>
            {String(seconds).padStart(2, '0')}
          </div>
          <div className="text-xs text-[#a6adc8] uppercase tracking-wider">Segundos</div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleStartPause}
          className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all transform hover:scale-105 ${
            timer.status === 'running'
              ? 'bg-[#45475a] hover:bg-[#585b70] text-[#cdd6f4]'
              : isFinished
              ? 'bg-[#45475a] hover:bg-[#585b70] text-[#cdd6f4]'
              : 'bg-[#cba6f7] hover:bg-[#b4befe] text-[#11111b] shadow-lg shadow-[#cba6f7]/30'
          }`}
        >
          {timer.status === 'running' ? 'Pausar' : isFinished ? 'Reiniciar' : 'Iniciar'}
        </button>
        <button
          onClick={() => resetTimer(timer.id)}
          className="px-4 py-3 bg-[#181825] hover:bg-[#313244] rounded-xl font-bold transition-all border border-[#45475a] text-[#cdd6f4]"
          title="Reset"
        >
          ↻
        </button>
      </div>
    </div>
  );
}
