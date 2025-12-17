'use client';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      cronometros: {
        Row: {
          id: string;
          nome: string;
          duracao: number;
          tempo_restante: number;
          estado: 'paused' | 'running' | 'finished';
          criado_em: string;
        };
        Insert: {
          id?: string;
          nome: string;
          duracao: number;
          tempo_restante: number;
          estado: 'paused' | 'running' | 'finished';
          criado_em?: string;
        };
        Update: {
          id?: string;
          nome?: string;
          duracao?: number;
          tempo_restante?: number;
          estado?: 'paused' | 'running' | 'finished';
          criado_em?: string;
        };
      };
    };
  };
};
