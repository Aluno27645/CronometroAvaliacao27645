'use client';

import { useTimerStore } from '@/lib/store';
import { useSyncTimers } from '@/lib/sync';
import TimerCard from '@/components/TimerCard';
import AddTimerForm from '@/components/AddTimerForm';
import Link from 'next/link';

export default function DashboardPage() {
  useSyncTimers(); // Enable cross-tab synchronization
  const { timers, resetAllTimers } = useTimerStore();

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 uppercase tracking-wide text-[#cdd6f4]">Controlo de Cronómetros</h1>
            <p className="text-[#bac2de]">Gerir múltiplos cronómetros</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/projection"
              target="_blank"
              className="bg-[#cba6f7] hover:bg-[#b4befe] text-[#11111b] font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-[#cba6f7]/30"
            >
              Projeção
            </Link>
            <Link
              href="/"
              className="bg-[#313244] hover:bg-[#45475a] backdrop-blur-sm border border-[#585b70] text-[#cdd6f4] font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              ← Voltar
            </Link>
          </div>
        </div>

        <AddTimerForm />

        {timers.length > 0 && (
          <div className="mb-6 flex justify-end">
            <button
              onClick={() => resetAllTimers()}
              className="bg-[#313244] hover:bg-[#45475a] backdrop-blur-sm border border-[#585b70] text-[#cdd6f4] font-semibold py-3 px-6 rounded-xl transition-all"
            >
              ↻ Reiniciar Todos
            </button>
          </div>
        )}

        {timers.length === 0 ? (
          <div className="text-center py-20 bg-gradient-to-br from-[#313244] to-[#181825] backdrop-blur-sm rounded-3xl border border-[#45475a]">
            <div className="text-6xl mb-4">⏱️</div>
            <p className="text-xl text-[#bac2de] mb-2">Nenhum cronómetro criado</p>
            <p className="text-[#a6adc8]">Adicione o primeiro cronómetro acima</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {timers.map((timer) => (
              <TimerCard key={timer.id} timer={timer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
