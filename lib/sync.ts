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
        () => {
          // Reload timers when any change occurs
          useTimerStore.getState().loadTimers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
}

