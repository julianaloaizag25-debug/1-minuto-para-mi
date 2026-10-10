import React from 'react';
import { Exercise } from '../types';
import { Play, Wind, Sparkles, HeartHandshake, Eye, ShieldCheck, Smile } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  onStart: (exercise: Exercise) => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onStart }) => {
  const getCategoryIcon = () => {
    switch (exercise.category) {
      case 'respiracion':
        return <Wind className="w-4 h-4 text-emerald-600" />;
      case 'estiramiento':
        return <Sparkles className="w-4 h-4 text-teal-600" />;
      case 'relajacion':
        return <HeartHandshake className="w-4 h-4 text-sky-600" />;
      case 'visual':
        return <Eye className="w-4 h-4 text-amber-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-teal-600" />;
    }
  };

  const getCategoryName = () => {
    switch (exercise.category) {
      case 'respiracion':
        return 'Respiración';
      case 'estiramiento':
        return 'Estiramiento';
      case 'relajacion':
        return 'Descompresión';
      case 'visual':
        return 'Descanso Visual';
    }
  };

  return (
    <article className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      <div className="p-5 sm:p-6">
        {/* Unboxed metadata row with typographic separators */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            {getCategoryIcon()}
            <span>{getCategoryName()}</span>
          </span>
          <span aria-hidden="true">·</span>
          <span>60 Segundos</span>
          <span aria-hidden="true">·</span>
          <span className="text-teal-700 font-medium">{exercise.discretionTag}</span>
        </div>

        {/* Title and Subtitle */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug mb-1">
          {exercise.title}
        </h3>
        <p className="text-xs font-medium text-teal-700/90 mb-3">
          {exercise.subtitle}
        </p>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          {exercise.shortDescription}
        </p>

        {/* Why it works (physiological basis) */}
        <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 text-xs text-slate-600 mb-3">
          <span className="font-semibold text-slate-800 block mb-0.5">
            ¿Por qué funciona en el turno?
          </span>
          <span className="text-slate-600 leading-normal">{exercise.whyItWorks}</span>
        </div>

        {/* Fun / Cero Pena Tip */}
        <div className="flex items-start gap-2 text-xs text-amber-800 bg-amber-50/70 p-2.5 rounded-lg border border-amber-100/80">
          <Smile className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span className="leading-snug">
            <strong className="font-medium">Cero pena:</strong> {exercise.funTip}
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 sm:px-6 pb-5 pt-2">
        <button
          onClick={() => onStart(exercise)}
          className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors active:scale-98 shadow-2xs"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Iniciar 60 Segundos</span>
        </button>
      </div>
    </article>
  );
};
