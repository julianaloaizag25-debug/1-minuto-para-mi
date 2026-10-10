import React, { useState } from 'react';
import { Exercise } from '../types';
import { EXERCISES } from '../data/exercises';
import { soundService } from '../utils/audio';
import { Sparkles, Dices, X, Play, ArrowRight } from 'lucide-react';

interface SurpriseRouletteModalProps {
  onClose: () => void;
  onSelectExercise: (exercise: Exercise, usedRoulette: boolean) => void;
}

export const SurpriseRouletteModal: React.FC<SurpriseRouletteModalProps> = ({
  onClose,
  onSelectExercise,
}) => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const spin = () => {
    setIsSpinning(true);
    setSelectedExercise(null);

    // Play rolling tick sounds
    let ticks = 0;
    const maxTicks = 12;
    const interval = setInterval(() => {
      soundService.playStepTick();
      ticks++;
      if (ticks >= maxTicks) {
        clearInterval(interval);
        const randomIndex = Math.floor(Math.random() * EXERCISES.length);
        const chosen = EXERCISES[randomIndex];
        setSelectedExercise(chosen);
        setIsSpinning(false);
        soundService.playBowlChime();
      }
    }, 120);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 text-center relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
          <Dices className={`w-7 h-7 ${isSpinning ? 'animate-spin' : ''}`} />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
          Cero fatiga de decisión
        </span>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Ruleta Sorpresa de 60s
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
          Después de tomar tantas decisiones en el turno, deja que el azar elija tu minuto de bienestar.
        </p>

        {/* Selected Exercise Preview or Spin Button */}
        {selectedExercise ? (
          <div className="bg-teal-50/80 border border-teal-200 rounded-2xl p-4 mb-6 text-left animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="text-[11px] font-bold uppercase tracking-wider text-teal-800 mb-1">
              ¡Tu pausa asignada para hoy!
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              {selectedExercise.title}
            </h3>
            <p className="text-xs text-slate-600 mb-2">
              {selectedExercise.shortDescription}
            </p>
            <div className="text-[11px] text-teal-700 font-medium">
              {selectedExercise.discretionTag}
            </div>

            <button
              onClick={() => onSelectExercise(selectedExercise, true)}
              className="mt-4 w-full min-h-[44px] rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>¡Comenzar este Minuto!</span>
            </button>
          </div>
        ) : (
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
            <p className="text-xs text-slate-500 mb-4">
              Presiona el botón para elegir una pausa discreta al azar
            </p>
            <button
              disabled={isSpinning}
              onClick={spin}
              className="min-h-[48px] px-8 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 mx-auto active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>{isSpinning ? 'Eligiendo tu pausa...' : '¡Girar la Ruleta!'}</span>
            </button>
          </div>
        )}

        {selectedExercise && (
          <button
            onClick={spin}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline decoration-slate-300 transition-colors"
          >
            Girar de nuevo
          </button>
        )}
      </div>
    </div>
  );
};
