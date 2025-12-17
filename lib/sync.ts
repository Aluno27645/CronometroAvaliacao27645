'use client';

import { useEffect } from 'react';
import { useTimerStore } from './store';
import { supabase } from './supabase';

export function useSyncTimers() {
  // Load timers on mount
  useEffect(() => {
    useTimerStore.getState().loadTimers();
  }, []);

  // Subscribe to real-time changes
  useEffect(() => {
    const channel = supabase
      .channel('cronometros-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cronometros',
        },
        (payload) => {
          // Only reload if it's not a minor update to a running timer
          // This prevents the flickering caused by our own periodic updates
          if (payload.eventType === 'INSERT' || payload.eventType === 'DELETE') {
            useTimerStore.getState().loadTimers();
          } else if (payload.eventType === 'UPDATE') {
            const newRecord = payload.new as any;
            // Only reload if status changed or it's a reset (time equals duration)
            if (newRecord.estado !== payload.old?.estado || newRecord.tempo_restante === newRecord.duracao) {
              useTimerStore.getState().loadTimers();
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
}

