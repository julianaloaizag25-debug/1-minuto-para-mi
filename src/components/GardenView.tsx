import React from 'react';
import { UserStats } from '../types';
import { Droplets, Flame, Heart, Sparkles, Wind, Eye, HeartHandshake } from 'lucide-react';

interface GardenViewProps {
  stats: UserStats;
  onStartPause: () => void;
}

export const GardenView: React.FC<GardenViewProps> = ({ stats, onStartPause }) => {
  // Determine growth stage: 1 to 4
  const drops = stats.calmDrops;
  let stage = 1;
  let stageName = 'Brote de Guayacán';
  let nextStageThreshold = 3;
  let stageDescription = 'Tu planta acaba de germinar con tus primeras pausas conscientes.';

  if (drops >= 10) {
    stage = 4;
    stageName = 'Guayacán Dorado en Plena Floración';
    nextStageThreshold = 20;
    stageDescription = 'Un árbol majestuoso y lleno de vida que brinda sombra y paz en el HUV.';
  } else if (drops >= 6) {
    stage = 3;
    stageName = 'Guayacán Florecido';
    nextStageThreshold = 10;
    stageDescription = 'Las flores doradas caleñas han comenzado a brotar en cada rama.';
  } else if (drops >= 3) {
    stage = 2;
    stageName = 'Árbol Joven en Crecimiento';
    nextStageThreshold = 6;
    stageDescription = 'Ramas fuertes y hojas verdes alimentadas con tus minutos de pausa.';
  }

  const progressPercent = Math.min(100, Math.round((drops / nextStageThreshold) * 100));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block mb-1">
          Espacio de bienestar del HUV
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display mb-2">
          El Árbol de Calma del HUV
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Cada minuto de pausa de 60 segundos riega tu árbol con una <strong>Gota de Calma</strong>.
          Sin evaluaciones ni presiones: este jardín florece únicamente a tu propio ritmo.
        </p>
      </div>

      {/* Main Interactive Garden Container */}
      <div className="bg-gradient-to-b from-sky-50 via-teal-50/40 to-emerald-50/50 rounded-3xl border border-teal-100 p-6 sm:p-10 shadow-sm relative overflow-hidden mb-8">
        {/* Soft sun / warm light in corner */}
        <div className="absolute top-4 right-6 w-24 h-24 rounded-full bg-amber-200/50 blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Vector SVG Tree Visualization */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center">
              <svg viewBox="0 0 320 320" className="w-full h-full drop-shadow-md">
                <defs>
                  <linearGradient id="groundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#86efac" />
                    <stop offset="100%" stopColor="#4ade80" />
                  </linearGradient>
                  <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#78350f" />
                    <stop offset="50%" stopColor="#92400e" />
                    <stop offset="100%" stopColor="#78350f" />
                  </linearGradient>
                </defs>

                {/* Ground mound */}
                <ellipse cx="160" cy="275" rx="120" ry="25" fill="url(#groundGrad)" opacity="0.8" />
                <ellipse cx="160" cy="275" rx="85" ry="14" fill="#16a34a" opacity="0.3" />

                {/* Little garden stones */}
                <ellipse cx="90" cy="280" rx="10" ry="5" fill="#94a3b8" />
                <ellipse cx="230" cy="278" rx="12" ry="6" fill="#cbd5e1" />

                {/* STAGE 1: Small Sprout */}
                {stage === 1 && (
                  <g className="transition-all duration-700 animate-pulse">
                    {/* Stem */}
                    <path
                      d="M160 270 Q160 230 160 200"
                      stroke="#16a34a"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    {/* Leaf left */}
                    <path
                      d="M160 230 Q130 220 135 200 Q150 215 160 225"
                      fill="#22c55e"
                    />
                    {/* Leaf right */}
                    <path
                      d="M160 215 Q190 205 185 185 Q170 200 160 210"
                      fill="#16a34a"
                    />
                    {/* Top small bud */}
                    <circle cx="160" cy="195" r="7" fill="#facc15" />
                  </g>
                )}

                {/* STAGE 2: Young Tree */}
                {stage === 2 && (
                  <g className="transition-all duration-700">
                    {/* Trunk */}
                    <path
                      d="M152 270 L154 200 Q155 170 160 160 L166 200 L168 270 Z"
                      fill="url(#trunkGrad)"
                    />
                    {/* Left Branch */}
                    <path
                      d="M155 190 Q125 175 110 165"
                      stroke="#92400e"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    {/* Right Branch */}
                    <path
                      d="M163 180 Q195 165 215 155"
                      stroke="#92400e"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    {/* Foliage clumps */}
                    <circle cx="160" cy="140" r="38" fill="#15803d" opacity="0.9" />
                    <circle cx="110" cy="160" r="28" fill="#16a34a" opacity="0.9" />
                    <circle cx="210" cy="150" r="30" fill="#22c55e" opacity="0.85" />
                    <circle cx="155" cy="120" r="26" fill="#4ade80" opacity="0.8" />
                  </g>
                )}

                {/* STAGE 3: Blooming Tree */}
                {stage === 3 && (
                  <g className="transition-all duration-700">
                    {/* Main Trunk */}
                    <path
                      d="M148 272 L152 180 Q154 140 160 120 L168 180 L172 272 Z"
                      fill="url(#trunkGrad)"
                    />
                    <path d="M152 185 Q115 160 95 140" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
                    <path d="M166 175 Q205 150 230 135" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
                    <path d="M158 145 Q135 110 125 90" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />

                    {/* Dense Green Canopy */}
                    <circle cx="160" cy="100" r="50" fill="#15803d" />
                    <circle cx="105" cy="130" r="42" fill="#16a34a" />
                    <circle cx="215" cy="125" r="44" fill="#16a34a" />
                    <circle cx="160" cy="70" r="38" fill="#22c55e" />

                    {/* Golden Guayacán Flowers */}
                    <circle cx="150" cy="75" r="8" fill="#facc15" />
                    <circle cx="175" cy="85" r="9" fill="#f59e0b" />
                    <circle cx="100" cy="115" r="8" fill="#facc15" />
                    <circle cx="120" cy="140" r="7" fill="#fef08a" />
                    <circle cx="205" cy="110" r="9" fill="#facc15" />
                    <circle cx="225" cy="135" r="8" fill="#f59e0b" />
                    <circle cx="160" cy="115" r="8" fill="#facc15" />
                  </g>
                )}

                {/* STAGE 4: Grand Golden Guayacán */}
                {stage === 4 && (
                  <g className="transition-all duration-700">
                    {/* Robust Trunk with roots */}
                    <path
                      d="M142 272 Q150 220 152 160 Q156 120 160 100 L168 160 Q170 220 178 272 Z"
                      fill="url(#trunkGrad)"
                    />
                    <path d="M142 272 Q130 278 120 280" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
                    <path d="M178 272 Q190 278 200 280" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />

                    {/* Branches */}
                    <path d="M152 170 Q105 140 75 115" stroke="#78350f" strokeWidth="8" strokeLinecap="round" />
                    <path d="M168 160 Q215 130 245 105" stroke="#78350f" strokeWidth="8" strokeLinecap="round" />
                    <path d="M156 125 Q130 85 110 60" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
                    <path d="M164 120 Q190 80 210 55" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />

                    {/* Majestic Golden Bloom Clouds */}
                    <circle cx="160" cy="65" r="55" fill="#facc15" opacity="0.95" />
                    <circle cx="95" cy="100" r="48" fill="#eab308" opacity="0.95" />
                    <circle cx="225" cy="95" r="50" fill="#f59e0b" opacity="0.95" />
                    <circle cx="130" cy="45" r="42" fill="#fef08a" opacity="0.9" />
                    <circle cx="190" cy="45" r="44" fill="#fde047" opacity="0.9" />
                    <circle cx="160" cy="105" r="40" fill="#eab308" opacity="0.95" />

                    {/* Subtle green under-tones */}
                    <circle cx="95" cy="115" r="18" fill="#16a34a" opacity="0.5" />
                    <circle cx="225" cy="110" r="20" fill="#16a34a" opacity="0.5" />

                    {/* Falling golden petals */}
                    <ellipse cx="80" cy="220" rx="3" ry="5" fill="#facc15" transform="rotate(25 80 220)" />
                    <ellipse cx="230" cy="210" rx="4" ry="2" fill="#facc15" transform="rotate(-15 230 210)" />
                    <ellipse cx="140" cy="240" rx="3" ry="4" fill="#fef08a" transform="rotate(40 140 240)" />
                    <ellipse cx="185" cy="245" rx="3" ry="5" fill="#f59e0b" transform="rotate(-30 185 245)" />

                    {/* Butterfly */}
                    <g transform="translate(245, 60) scale(0.7)">
                      <ellipse cx="0" cy="0" rx="4" ry="10" fill="#38bdf8" transform="rotate(20)" />
                      <ellipse cx="8" cy="0" rx="4" ry="10" fill="#38bdf8" transform="rotate(-20)" />
                      <line x1="4" y1="-8" x2="4" y2="8" stroke="#1e293b" strokeWidth="2" />
                    </g>
                  </g>
                )}
              </svg>
            </div>

            {/* Tree Stage Badge */}
            <div className="mt-2 text-center">
              <span className="text-base font-bold text-slate-800 block">
                {stageName}
              </span>
              <span className="text-xs text-slate-500 block max-w-sm">
                {stageDescription}
              </span>
            </div>
          </div>

          {/* Right Information & Progression Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-5 border border-teal-100 shadow-2xs mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-teal-600" />
                  Progreso al siguiente brote
                </span>
                <span className="text-xs font-bold text-teal-800 font-mono tabular-nums">
                  {drops} / {nextStageThreshold} gotas
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-teal-600 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-500 leading-snug">
                {drops >= nextStageThreshold
                  ? '¡Tu Guayacán alcanzó su máxima expresión! Sigue regándolo para mantenerlo radiante.'
                  : `Te faltan ${Math.max(1, nextStageThreshold - drops)} pausas de 60s para hacer florecer nuevas ramas.`}
              </p>
            </div>

            {/* Pauses by category breakdown */}
            <div className="space-y-2.5 mb-6">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Tus momentos de autocuidado
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/80 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2">
                  <Wind className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-slate-500 block text-[10px]">Respiración</span>
                    <span className="font-bold text-slate-800 font-mono tabular-nums">
                      {stats.pausesByCategory.respiracion || 0}
                    </span>
                  </div>
                </div>

                <div className="bg-white/80 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
                  <div>
                    <span className="text-slate-500 block text-[10px]">Estiramiento</span>
                    <span className="font-bold text-slate-800 font-mono tabular-nums">
                      {stats.pausesByCategory.estiramiento || 0}
                    </span>
                  </div>
                </div>

                <div className="bg-white/80 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-sky-600 shrink-0" />
                  <div>
                    <span className="text-slate-500 block text-[10px]">Descompresión</span>
                    <span className="font-bold text-slate-800 font-mono tabular-nums">
                      {stats.pausesByCategory.relajacion || 0}
                    </span>
                  </div>
                </div>

                <div className="bg-white/80 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="text-slate-500 block text-[10px]">Descanso Visual</span>
                    <span className="font-bold text-slate-800 font-mono tabular-nums">
                      {stats.pausesByCategory.visual || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA to add another drop */}
            <button
              onClick={onStartPause}
              className="w-full min-h-[46px] rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-xs active:scale-98"
            >
              <Droplets className="w-4 h-4 fill-white" />
              <span>Regar mi árbol con 60 segundos</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
