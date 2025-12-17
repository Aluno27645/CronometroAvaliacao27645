'use client';

import { useState } from 'react';
import { useTimerStore } from '@/lib/store';
import { parseTimeInput } from '@/lib/utils';

export default function AddTimerForm() {
  const [name, setName] = useState('');
  const [minutes, setMinutes] = useState('10');
  const [seconds, setSeconds] = useState('00');
  const [isLoading, setIsLoading] = useState(false);
  const { addTimer } = useTimerStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert('Por favor, insira um nome para o cronómetro');
      return;
    }

    const duration = parseTimeInput(minutes, seconds);
    
    if (duration <= 0) {
      alert('Por favor, insira uma duração válida');
      return;
    }

    setIsLoading(true);
    try {
      await addTimer(name.trim(), duration);
      setName('');
      setMinutes('10');
      setSeconds('00');
    } catch (error) {
      console.error('Erro ao criar cronómetro:', error);
      alert('Erro ao criar cronómetro. Verifique a configuração do Supabase.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-[#313244] to-[#181825] backdrop-blur-sm rounded-3xl p-6 mb-6 border border-[#45475a]">
      <h2 className="text-xl font-bold mb-6 uppercase tracking-wide text-[#cdd6f4]">Adicionar Cronómetro</h2>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-1">
          <label className="block text-sm font-medium mb-2 text-[#bac2de]">Nome / Identificador</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Equipa A"
            className="w-full px-4 py-3 bg-[#181825] border border-[#45475a] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cba6f7] text-[#cdd6f4] placeholder-[#6c7086]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#bac2de]">Minutos</label>
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            min="0"
            max="99"
            className="w-full px-4 py-3 bg-[#181825] border border-[#45475a] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cba6f7] text-[#cdd6f4]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#bac2de]">Segundos</label>
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            min="0"
            max="59"
            className="w-full px-4 py-3 bg-[#181825] border border-[#45475a] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cba6f7] text-[#cdd6f4]"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-6 w-full bg-[#cba6f7] hover:bg-[#b4befe] disabled:bg-[#313244] disabled:cursor-not-allowed text-[#11111b] font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] disabled:transform-none shadow-lg shadow-[#cba6f7]/30"
      >
        {isLoading ? 'A adicionar...' : 'Adicionar Cronómetro'}
      </button>
    </form>
  );
}
