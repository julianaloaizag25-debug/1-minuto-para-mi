import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Exercise, Badge } from '../types';
import { soundService } from '../utils/audio';
import { INITIAL_BADGES } from '../data/badges';
import { AFFIRMATIONS } from '../data/exercises';
import { Droplets, Sparkles, Award, ArrowRight, Heart, Check } from 'lucide-react';

interface CompletionModalProps {
  exercise: Exercise;
  newBadges: string[];
  totalDrops: number;
  onClose: () => void;
  onGoToGarden: () => void;
  onDoAnother: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  exercise,
  newBadges,
  totalDrops,
  onClose,
  onGoToGarden,
  onDoAnother,
}) => {
  const [affirmation] = useState(() => {
    const randomIndex = Math.floor(Math.random() * AFFIRMATIONS.length);
    return AFFIRMATIONS[randomIndex];
  });

  const unlockedBadgeObjects: Badge[] = INITIAL_BADGES.filter((b) =>
    newBadges.includes(b.id)
  );

  useEffect(() => {
    // Play sweet completion sound
    soundService.playCompletionChime();

    // Trigger joyous, gentle confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0d9488', '#14b8a6', '#f59e0b', '#38bdf8', '#10b981'],
      });
    } catch {
      // safe fallback
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in-95 duration-200">
        {/* Animated Celebration Icon */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shadow-xs">
          <Droplets className="w-8 h-8 fill-teal-500/20" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block mb-1">
          ¡60 segundos cumplidos!
        </span>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Cuidaste de ti hoy
        </h2>

        <p className="text-sm text-slate-600 mb-5 leading-relaxed">
          Completaste con éxito <strong className="text-slate-800">{exercise.title}</strong>.
          Tus hombros, tu mente y tu ritmo cardíaco te lo agradecen.
        </p>

        {/* Reward pill: +1 Gota de calma */}
        <div className="bg-teal-50/80 border border-teal-200/80 rounded-2xl p-3.5 mb-5 flex items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center">
            <Droplets className="w-4 h-4 fill-white" />
          </div>
          <div className="text-left">
            <span className="text-xs font-bold text-teal-900 block">
              +1 Gota de Calma para tu Jardín HUV
            </span>
            <span className="text-[11px] text-teal-700">
              Total acumulado: {totalDrops} gotas
            </span>
          </div>
        </div>

        {/* Newly unlocked badge banner if any */}
        {unlockedBadgeObjects.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 mb-5 text-left flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-900 block">
                ¡Nueva insignia desbloqueada!
              </span>
              <span className="text-xs text-amber-800 font-medium block">
                {unlockedBadgeObjects[0].title}
              </span>
              <span className="text-[11px] text-amber-700/90 block mt-0.5">
                {unlockedBadgeObjects[0].description}
              </span>
            </div>
          </div>
        )}

        {/* Inspiring affirmation for HUV staff */}
        <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100/90 text-left">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Mensaje del HUV para ti</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
            "{affirmation}"
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-2.5">
          <button
            onClick={onClose}
            className="w-full min-h-[46px] rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm transition-colors shadow-xs flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Volver al turno renovado/a</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onGoToGarden}
              className="min-h-[42px] px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Ver mi Árbol HUV</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onDoAnother}
              className="min-h-[42px] px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Otra pausa (60s)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
