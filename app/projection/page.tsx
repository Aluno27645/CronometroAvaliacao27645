'use client';

import { useEffect, useState } from 'react';
import { useTimerStore } from '@/lib/store';
import { formatTime } from '@/lib/utils';
import { useSyncTimers } from '@/lib/sync';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';

export default function ProjectionPage() {
  useSyncTimers(); // Enable cross-tab synchronization
  const { timers, updateTimer, setTimerFinished, pauseTimer } = useTimerStore();
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [localTimers, setLocalTimers] = useState<{[key: string]: number}>({});

  // Update running timers every second
  useEffect(() => {
    let tickCount = 0;
    const interval = setInterval(() => {
      tickCount++;
      const updates: {[key: string]: number} = {};
      
      timers.forEach((timer) => {
        if (timer.status === 'running') {
          const currentLocal = localTimers[timer.id] ?? timer.remaining;
          const newTime = currentLocal - 1;
          updates[timer.id] = newTime;
          
          // Update database every 2 seconds for better sync
          if (tickCount % 2 === 0) {
            updateTimer(timer.id, newTime);
          }
        }
      });
      
      setLocalTimers(prev => ({...prev, ...updates}));
    }, 1000);

    return () => clearInterval(interval);
  }, [timers, localTimers, updateTimer]);

  // Sync local timers with store timers when they change from external source
  useEffect(() => {
    const newLocalTimers: {[key: string]: number} = {};
    timers.forEach(timer => {
      newLocalTimers[timer.id] = timer.remaining;
    });
    setLocalTimers(newLocalTimers);
  }, [timers]);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const dateStr = now.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' });
      setCurrentTime(timeStr);
      setCurrentDate(dateStr);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Find the main timer (most recent running timer, or first timer)
  const mainTimer = timers.find(t => t.status === 'running') || timers[0];
  const otherTimers = timers.filter(t => t.id !== mainTimer?.id);

  return (
    <div className="min-h-screen text-[#cdd6f4] p-8">
      {/* Back Button */}
      <Link
        href="/dashboard"
        className="fixed top-6 left-6 z-50 bg-[#313244] hover:bg-[#45475a] backdrop-blur-sm border border-[#585b70] text-[#cdd6f4] font-semibold py-3 px-5 rounded-xl transition-all flex items-center gap-2"
      >
        <span>←</span>
        <span>Configuração</span>
      </Link>

      {/* Header */}
      <div className="flex items-center justify-end mb-12 pt-4">
        <div className="flex items-center gap-4 text-right">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-wider text-[#cdd6f4]">ASSEMBLEIA MUNICIPAL DE DEMO</h1>
            <p className="text-xl text-[#bac2de]">ORDEM DO DIA</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-[#cba6f7] to-[#b4befe] rounded-full flex items-center justify-center shadow-lg shadow-[#cba6f7]/50">
            <FontAwesomeIcon icon={faHourglass} className="text-3xl text-[#11111b]" />
          </div>
        </div>
      </div>

      {/* Timer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {timers.map((timer) => {
          const displayTime = localTimers[timer.id] ?? timer.remaining;
          const isOvertime = displayTime < 0 && timer.status === 'running';
          const isFinished = timer.status === 'finished' || (displayTime <= 0 && timer.status !== 'running');
          const minutes = Math.floor(Math.abs(displayTime) / 60);
          const seconds = Math.abs(displayTime) % 60;
          const sign = displayTime < 0 ? '-' : '';
          
          return (
            <div
              key={timer.id}
              className={`rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 transition-all backdrop-blur-sm border-2 overflow-hidden flex flex-col ${
                timer.status === 'running'
                  ? 'bg-gradient-to-br from-[#cba6f7]/95 to-[#b4befe]/95 border-[#cba6f7] shadow-xl shadow-[#cba6f7]/60'
                  : isFinished
                  ? 'bg-gradient-to-br from-[#313244] to-[#181825] border-[#f38ba8]/50'
                  : 'bg-gradient-to-br from-[#313244] to-[#181825] border-[#45475a]'
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 ${
                  timer.status === 'running' ? 'bg-[#11111b]/20' : 'bg-[#181825]'
                }`}>
                  <div className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl ${timer.status === 'running' ? 'text-[#11111b]' : 'text-[#bac2de]'}`}>👤</div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl uppercase tracking-wide truncate ${timer.status === 'running' ? 'text-[#11111b]' : 'text-[#cdd6f4]'}`}>{timer.name}</h3>
                </div>
              </div>
              
              <div className="flex gap-2 sm:gap-3 md:gap-4 flex-1 min-h-0">
                <div className={`flex-1 rounded-2xl p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 flex flex-col items-center justify-center overflow-hidden min-w-0 aspect-square max-h-full ${
                  timer.status === 'running' ? 'bg-[#11111b]/10' : 'bg-[#181825]'
                }`}>
                  <div className={`font-bold w-full overflow-hidden flex items-center justify-center ${
                    isOvertime ? 'text-[#f38ba8]' : timer.status === 'running' ? 'text-[#11111b]' : 'text-[#cdd6f4]'
                  }`}
                  style={{fontSize: 'clamp(1rem, 5vw, 5rem)', lineHeight: '1'}}
                  >
                    {sign}{String(minutes).padStart(2, '0')}
                  </div>
                  <div className={`text-[0.4rem] sm:text-[0.5rem] md:text-[0.6rem] lg:text-xs xl:text-sm uppercase tracking-wider mt-0.5 sm:mt-1 whitespace-nowrap ${
                    timer.status === 'running' ? 'text-[#11111b]/70' : 'text-[#a6adc8]'
                  }`}>MIN</div>
                </div>
                <div className={`flex-1 rounded-2xl p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 flex flex-col items-center justify-center overflow-hidden min-w-0 aspect-square max-h-full ${
                  timer.status === 'running' ? 'bg-[#11111b]/10' : 'bg-[#181825]'
                }`}>
                  <div className={`font-bold w-full overflow-hidden flex items-center justify-center ${
                    isOvertime ? 'text-[#f38ba8]' : timer.status === 'running' ? 'text-[#11111b]' : 'text-[#cdd6f4]'
                  }`}
                  style={{fontSize: 'clamp(1rem, 5vw, 5rem)', lineHeight: '1'}}
                  >
                    {String(seconds).padStart(2, '0')}
                  </div>
                  <div className={`text-[0.4rem] sm:text-[0.5rem] md:text-[0.6rem] lg:text-xs xl:text-sm uppercase tracking-wider mt-0.5 sm:mt-1 whitespace-nowrap ${
                    timer.status === 'running' ? 'text-[#11111b]/70' : 'text-[#a6adc8]'
                  }`}>SEG</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Timers State */}
      {timers.length === 0 && (
        <div className="text-center py-32">
          <div className="text-8xl mb-6">⏱️</div>
          <h2 className="text-4xl font-bold text-[#bac2de] mb-4 uppercase tracking-wide">Nenhum cronómetro ativo</h2>
          <p className="text-xl text-[#a6adc8]">Adicione cronómetros na página de controlo</p>
        </div>
      )}

      {/* Date and Time Footer */}
      <div className="fixed bottom-6 right-6 text-right">
        <div className="text-3xl font-bold text-[#cdd6f4]">{currentDate} {currentTime}</div>
        <div className="text-sm text-[#a6adc8] mt-1">ASSEMBLEIAS</div>
      </div>
    </div>
  );
}
