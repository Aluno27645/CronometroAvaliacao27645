'use client';

import { create } from 'zustand';
import { Timer, TimerStore } from './types';
import { supabase } from './supabase';

export const useTimerStore = create<TimerStore>((set, get) => ({
  timers: [],
  
  addTimer: async (name: string, duration: number) => {
    const { data, error } = await supabase
      .from('cronometros')
      .insert({
        nome: name,
        duracao: duration,
        tempo_restante: duration,
        estado: 'paused',
      })
      .select()
      .single();

    if (error) {
      console.error('Erro ao adicionar cronómetro:', error);
      return;
    }

    const newTimer: Timer = {
      id: data.id,
      name: data.nome,
      duration: data.duracao,
      remaining: data.tempo_restante,
      status: data.estado as 'paused' | 'running' | 'finished',
      createdAt: new Date(data.criado_em).getTime(),
    };

    set((state) => ({ timers: [...state.timers, newTimer] }));
  },
  
  removeTimer: async (id: string) => {
    const { error } = await supabase
      .from('cronometros')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao remover cronómetro:', error);
      return;
    }

    set((state) => ({ timers: state.timers.filter(t => t.id !== id) }));
  },
  
  startTimer: async (id: string) => {
    const { error } = await supabase
      .from('cronometros')
      .update({ estado: 'running' })
      .eq('id', id);

    if (error) {
      console.error('Erro ao iniciar cronómetro:', error);
      return;
    }

    set((state) => ({
      timers: state.timers.map(t =>
        t.id === id ? { ...t, status: 'running' as const } : t
      ),
    }));
  },
  
  pauseTimer: async (id: string) => {
    const timer = get().timers.find(t => t.id === id);
    if (!timer) return;

    const { error } = await supabase
      .from('cronometros')
      .update({ 
        estado: 'paused',
        tempo_restante: timer.remaining 
      })
      .eq('id', id);

    if (error) {
      console.error('Erro ao pausar cronómetro:', error);
      return;
    }

    set((state) => ({
      timers: state.timers.map(t =>
        t.id === id ? { ...t, status: 'paused' as const } : t
      ),
    }));
  },
  
  resetTimer: async (id: string) => {
    const timer = get().timers.find(t => t.id === id);
    if (!timer) return;

    const { error } = await supabase
      .from('cronometros')
      .update({ 
        tempo_restante: timer.duration,
        estado: 'paused' 
      })
      .eq('id', id);

    if (error) {
      console.error('Erro ao reiniciar cronómetro:', error);
      return;
    }

    set((state) => ({
      timers: state.timers.map(t =>
        t.id === id ? { ...t, remaining: t.duration, status: 'paused' as const } : t
      ),
    }));
  },
  
  resetAllTimers: async () => {
    const timers = get().timers;
    
    for (const timer of timers) {
      await supabase
        .from('cronometros')
        .update({ tempo_restante: timer.duration, estado: 'paused' })
        .eq('id', timer.id);
    }

    set((state) => ({
      timers: state.timers.map(t => ({ ...t, remaining: t.duration, status: 'paused' as const })),
    }));
  },
  
  updateTimer: async (id: string, remaining: number) => {
    const { error } = await supabase
      .from('cronometros')
      .update({ tempo_restante: remaining })
      .eq('id', id);

    if (error) {
      console.error('Erro ao atualizar cronómetro:', error);
    }

    set((state) => ({
      timers: state.timers.map(t =>
        t.id === id ? { ...t, remaining } : t
      ),
    }));
  },
  
  setTimerFinished: async (id: string) => {
    const { error } = await supabase
      .from('cronometros')
      .update({ estado: 'finished', tempo_restante: 0 })
      .eq('id', id);

    if (error) {
      console.error('Erro ao finalizar cronómetro:', error);
    }

    set((state) => ({
      timers: state.timers.map(t =>
        t.id === id ? { ...t, status: 'finished' as const, remaining: 0 } : t
      ),
    }));
  },
  
  loadTimers: async () => {
    const { data, error } = await supabase
      .from('cronometros')
      .select('*')
      .order('criado_em', { ascending: true });

    if (error) {
      console.error('Erro ao carregar cronómetros:', error);
      return;
    }

    const timers: Timer[] = data.map(d => ({
      id: d.id,
      name: d.nome,
      duration: d.duracao,
      remaining: d.tempo_restante,
      status: d.estado as 'paused' | 'running' | 'finished',
      createdAt: new Date(d.criado_em).getTime(),
    }));

    set({ timers });
  },
}));
