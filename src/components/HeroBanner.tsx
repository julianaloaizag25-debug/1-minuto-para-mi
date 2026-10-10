import React from 'react';
import { UserStats } from '../types';
import { Sparkles, Droplets, Flame, Clock, Heart, ShieldCheck } from 'lucide-react';

interface HeroBannerProps {
  stats: UserStats;
  onOpenRoulette: () => void;
  onOpenSos: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  stats,
  onOpenRoulette,
  onOpenSos,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 via-white to-slate-50 border-b border-slate-200/80 pt-8 pb-10">
      {/* Decorative calm background elements */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Metadata kicker without pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-teal-800 mb-3 tracking-wide uppercase">
            <span>Hospital Universitario del Valle</span>
            <span aria-hidden="true" className="text-teal-400">·</span>
            <span>Evaristo García E.S.E.</span>
            <span aria-hidden="true" className="text-teal-400">·</span>
            <span className="flex items-center gap-1 text-slate-500 font-normal normal-case">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" /> 100% Anónimo · Sin registros ni evaluaciones
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-display mb-4">
            Cuidar al que cuida:{' '}
            <span className="text-teal-700">1 Minuto Para Mí</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 max-w-2xl">
            Tus manos sostienen la salud de cientos de personas cada día. Regálate solo 60 segundos
            de pausa activa: ejercicios discretos y sencillos para hacer en tu silla o puesto de trabajo,
            sin llamar la atención y con una sonrisa.
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <button
              onClick={onOpenRoulette}
              className="min-h-[48px] px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm shadow-md shadow-teal-900/10 transition-all flex items-center gap-2 active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>¡Sorpréndeme con 1 Minuto!</span>
            </button>

            <button
              onClick={onOpenSos}
              className="min-h-[48px] px-5 py-2.5 rounded-xl bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 font-semibold text-sm transition-all flex items-center gap-2 active:scale-98 shadow-xs"
            >
              <Heart className="w-4 h-4 text-rose-600" />
              <span>Respiro de Emergencia (SOS)</span>
            </button>
          </div>
        </div>

        {/* Micro KPI / Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-slate-200/80">
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Droplets className="w-4 h-4 text-teal-600" />
              <span>Gotas de Calma</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {stats.calmDrops}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Riegan tu Guayacán HUV
            </div>
          </div>

          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Días Cuidándote</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {stats.currentStreakDays} {stats.currentStreakDays === 1 ? 'día' : 'días'}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Racha de autocuidado
            </div>
          </div>

          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Clock className="w-4 h-4 text-sky-600" />
              <span>Pausas de Hoy</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {stats.todayCount}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {stats.todayCount * 60} segundos dedicados
            </div>
          </div>

          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Heart className="w-4 h-4 text-emerald-600" />
              <span>Minutos Totales</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {stats.totalPauses} min
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Paz acumulada en el turno
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
