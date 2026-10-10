import React from 'react';
import { Sparkles, Volume2, VolumeX, ShieldAlert, Heart } from 'lucide-react';
import { soundService } from '../utils/audio';

interface HeaderProps {
  currentTab: 'exercises' | 'garden' | 'badges';
  onSelectTab: (tab: 'exercises' | 'garden' | 'badges') => void;
  onOpenSos: () => void;
  onOpenRoulette: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenSos,
  onOpenRoulette,
  isMuted,
  onToggleSound,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 md:gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onSelectTab('exercises')}
              className="group flex items-center gap-2.5 text-left focus-visible:outline-hidden"
            >
              <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-xs group-hover:bg-teal-700 transition-colors">
                <Heart className="w-5 h-5 fill-white/20" />
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap block leading-tight">
                  1 Minuto Para Mí
                </span>
                <span className="text-[11px] font-medium text-teal-700 tracking-wide block">
                  Cuidar al que cuida · HUV
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => onSelectTab('exercises')}
              className={`hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 py-2 border-b-2 ${
                currentTab === 'exercises'
                  ? 'border-teal-600 text-teal-800 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Pausas Activas (60s)
            </button>
            <button
              onClick={onOpenRoulette}
              className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 py-2 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Ruleta Sorpresa</span>
            </button>
            <button
              onClick={() => onSelectTab('garden')}
              className={`hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 py-2 border-b-2 ${
                currentTab === 'garden'
                  ? 'border-teal-600 text-teal-800 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Mi Árbol de Calma
            </button>
            <button
              onClick={() => onSelectTab('badges')}
              className={`hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 py-2 border-b-2 ${
                currentTab === 'badges'
                  ? 'border-teal-600 text-teal-800 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Insignias
            </button>
          </nav>

          {/* Zone 3: Primary Action & Sound control */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onToggleSound}
              title={isMuted ? 'Activar sonido ambiente' : 'Silenciar sonido'}
              aria-label={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
              className="min-h-[40px] min-w-[40px] p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors flex items-center justify-center"
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-slate-400" /> : <Volume2 className="w-5 h-5 text-teal-600" />}
            </button>

            <button
              onClick={onOpenSos}
              className="min-h-[40px] px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-all shadow-xs flex items-center gap-2 whitespace-nowrap shrink-0 active:scale-95"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>SOS Turno Pesado</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
