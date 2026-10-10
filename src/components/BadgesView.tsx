import React from 'react';
import { Badge, UserStats } from '../types';
import { INITIAL_BADGES } from '../data/badges';
import {
  Sparkles,
  Award,
  Lock,
  Wind,
  Feather,
  Eye,
  Smile,
  Sprout,
  Flame,
  ShieldAlert,
  Dices,
  CheckCircle2
} from 'lucide-react';

interface BadgesViewProps {
  stats: UserStats;
  onStartPause: () => void;
}

export const BadgesView: React.FC<BadgesViewProps> = ({ stats, onStartPause }) => {
  const getBadgeIcon = (iconName: string, isUnlocked: boolean) => {
    const iconClass = `w-5 h-5 ${isUnlocked ? 'text-amber-600' : 'text-slate-400'}`;

    switch (iconName) {
      case 'Sparkle':
        return <Sparkles className={iconClass} />;
      case 'Feather':
        return <Feather className={iconClass} />;
      case 'Eye':
        return <Eye className={iconClass} />;
      case 'Wind':
        return <Wind className={iconClass} />;
      case 'Smile':
        return <Smile className={iconClass} />;
      case 'Sprout':
        return <Sprout className={iconClass} />;
      case 'Flame':
        return <Flame className={iconClass} />;
      case 'ShieldHeart':
        return <Award className={iconClass} />;
      case 'Dices':
        return <Dices className={iconClass} />;
      default:
        return <Award className={iconClass} />;
    }
  };

  const unlockedCount = stats.unlockedBadges.length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block mb-1">
          Reconocimientos de autocuidado
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display mb-2">
          Insignias del Cuidado
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Pequeños homenajes a tu constancia y a tu bienestar en el puesto de trabajo.
          Llevas <strong className="text-teal-800">{unlockedCount} de {INITIAL_BADGES.length}</strong> insignias desbloqueadas.
        </p>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {INITIAL_BADGES.map((badge) => {
          const isUnlocked = stats.unlockedBadges.includes(badge.id);

          return (
            <div
              key={badge.id}
              className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-white border-amber-200/90 shadow-xs hover:shadow-md'
                  : 'bg-slate-50/70 border-slate-200/70 opacity-70'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      isUnlocked
                        ? 'bg-amber-100/80 border border-amber-200'
                        : 'bg-slate-200/80 border border-slate-300'
                    }`}
                  >
                    {getBadgeIcon(badge.icon, isUnlocked)}
                  </div>

                  {isUnlocked ? (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> Conseguida
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                      <Lock className="w-3 h-3" /> Bloqueada
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug mb-1">
                  {badge.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {badge.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                Requisito: {badge.requirement}
              </div>
            </div>
          );
        })}
      </div>

      {/* Encouragement Footer */}
      <div className="bg-teal-50/70 rounded-2xl p-5 border border-teal-100 text-center max-w-xl mx-auto">
        <p className="text-xs sm:text-sm text-teal-900 font-medium mb-3">
          ¿Listo para desbloquear la siguiente? Solo toma 60 segundos.
        </p>
        <button
          onClick={onStartPause}
          className="min-h-[44px] px-6 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs"
        >
          Elegir una pausa de 60s
        </button>
      </div>
    </div>
  );
};
