import React, { useState, useEffect, useRef } from 'react';
import { Exercise } from '../types';
import { soundService } from '../utils/audio';
import {
  Pause,
  Play,
  RotateCcw,
  X,
  Volume2,
  VolumeX,
  Sparkles,
  Wind,
  Eye,
  HeartHandshake,
  CheckCircle2,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface ActivePausePlayerProps {
  exercise: Exercise;
  onClose: () => void;
  onComplete: () => void;
}

export const ActivePausePlayer: React.FC<ActivePausePlayerProps> = ({
  exercise,
  onClose,
  onComplete,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(60);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(soundService.getIsMuted());
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [ambientMode, setAmbientMode] = useState<'breeze' | 'none'>('breeze');

  const containerRef = useRef<HTMLDivElement>(null);
  const lastStepIndexRef = useRef<number>(0);

  // Determine current step based on elapsed time (60 - secondsRemaining)
  const elapsed = 60 - secondsRemaining;
  let accumulatedTime = 0;
  let currentStepIndex = 0;

  for (let i = 0; i < exercise.steps.length; i++) {
    const stepDuration = exercise.steps[i].duration;
    if (elapsed < accumulatedTime + stepDuration) {
      currentStepIndex = i;
      break;
    }
    accumulatedTime += stepDuration;
    if (i === exercise.steps.length - 1) {
      currentStepIndex = i;
    }
  }

  const currentStep = exercise.steps[currentStepIndex] || exercise.steps[0];

  // Sound: start ambient on mount, stop on unmount
  useEffect(() => {
    soundService.playBowlChime();
    if (ambientMode === 'breeze' && !isMuted) {
      soundService.startAmbientBreeze();
    }
    return () => {
      soundService.stopAmbient();
    };
  }, []);

  // Tick step sound when step changes
  useEffect(() => {
    if (currentStepIndex !== lastStepIndexRef.current && secondsRemaining > 0 && secondsRemaining < 60) {
      soundService.playStepTick();
      lastStepIndexRef.current = currentStepIndex;
    }
  }, [currentStepIndex, secondsRemaining]);

  // Main countdown timer
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          soundService.stopAmbient();
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onComplete]);

  // Keyboard shortcut: Space to pause/resume, Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsRunning((prev) => !prev);
      } else if (e.code === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const toggleSound = () => {
    const muted = soundService.toggleMute();
    setIsMuted(muted);
    if (muted) {
      soundService.stopAmbient();
    } else if (ambientMode === 'breeze') {
      soundService.startAmbientBreeze();
    }
  };

  const handleRestart = () => {
    setSecondsRemaining(60);
    setIsRunning(true);
    soundService.playBowlChime();
    if (ambientMode === 'breeze' && !isMuted) {
      soundService.startAmbientBreeze();
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Circular progress calculation
  const radius = 96;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (secondsRemaining / 60) * circumference;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-md flex flex-col justify-between text-white select-none overflow-y-auto"
    >
      {/* Top Bar inside Player */}
      <div className="max-w-4xl w-full mx-auto px-4 py-4 sm:py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center">
            {exercise.category === 'respiracion' && <Wind className="w-4 h-4" />}
            {exercise.category === 'estiramiento' && <Sparkles className="w-4 h-4" />}
            {exercise.category === 'relajacion' && <HeartHandshake className="w-4 h-4" />}
            {exercise.category === 'visual' && <Eye className="w-4 h-4" />}
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white leading-tight">
              {exercise.title}
            </h2>
            <div className="text-xs text-slate-400">
              Paso {currentStepIndex + 1} de {exercise.steps.length} · 1 Minuto Para Mí
            </div>
          </div>
        </div>

        {/* Top right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            title={isMuted ? 'Activar sonido' : 'Silenciar'}
            className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-teal-400" />}
          </button>

          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            className="hidden sm:flex w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white items-center justify-center transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            title="Cerrar pausa"
            className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Center Interactive Countdown and Guidance */}
      <div className="max-w-2xl w-full mx-auto px-4 py-4 flex flex-col items-center justify-center flex-1 my-auto text-center">
        {/* Step indicator pills with active state */}
        <div className="flex items-center gap-2 mb-6">
          {exercise.steps.map((step, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentStepIndex
                  ? 'w-10 bg-teal-400'
                  : idx < currentStepIndex
                  ? 'w-6 bg-teal-600/40'
                  : 'w-4 bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Circular Countdown Ring with Dynamic Visual Breathing Orb inside */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center mb-8">
          {/* Animated Background Glow depending on exercise category and phase */}
          <div
            className={`absolute inset-4 rounded-full blur-2xl opacity-40 transition-all duration-1000 ${
              currentStep.actionPhase === 'inhala' || currentStep.actionPhase === 'estira'
                ? 'scale-110 bg-teal-400'
                : currentStep.actionPhase === 'sosten'
                ? 'scale-100 bg-sky-400'
                : 'scale-90 bg-emerald-500'
            }`}
          />

          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 220 220">
            {/* Background Track */}
            <circle
              cx="110"
              cy="110"
              r={radius}
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-slate-800"
            />
            {/* Progress Stroke */}
            <circle
              cx="110"
              cy="110"
              r={radius}
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="text-teal-400 transition-all duration-1000 ease-linear"
            />
          </svg>

          {/* Center Inner Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <span className="text-5xl sm:text-6xl font-extrabold font-mono tabular-nums tracking-tighter text-white">
              {secondsRemaining}
            </span>
            <span className="text-xs uppercase font-semibold tracking-widest text-teal-300 mt-1">
              segundos
            </span>

            {/* Micro action prompt badge */}
            <span className="mt-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/90 backdrop-blur-xs">
              {currentStep.actionPhase === 'inhala' && '🌬️ Inhala suave'}
              {currentStep.actionPhase === 'sosten' && '✨ Sostén en calma'}
              {currentStep.actionPhase === 'exhala' && '🍃 Exhala despacio'}
              {currentStep.actionPhase === 'estira' && '🧘 Alarga sin forzar'}
              {currentStep.actionPhase === 'observa' && '👀 Punto lejano'}
              {currentStep.actionPhase === 'suelta' && '🌿 Suelta el peso'}
              {currentStep.actionPhase === 'parpadea' && '💧 Parpadea suave'}
              {!currentStep.actionPhase && 'Pausa Activa'}
            </span>
          </div>
        </div>

        {/* Step Instruction Card */}
        <div className="max-w-lg w-full bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-1.5">
            {currentStep.label}
          </div>
          <p className="text-base sm:text-lg font-medium text-white leading-relaxed mb-2">
            {currentStep.instruction}
          </p>
          {currentStep.subtext && (
            <p className="text-xs sm:text-sm text-slate-400">
              {currentStep.subtext}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="max-w-2xl w-full mx-auto px-4 py-5 sm:py-6">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleRestart}
            title="Reiniciar 60 segundos"
            className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all active:scale-95"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className="min-h-[52px] px-8 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-base flex items-center gap-2.5 shadow-lg shadow-teal-500/20 transition-all active:scale-95"
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 fill-slate-950" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-slate-950" />
                <span>Continuar</span>
              </>
            )}
          </button>

          {/* Quick finish button for convenience/testing */}
          <button
            onClick={() => {
              setSecondsRemaining(1);
            }}
            title="Finalizar pausa"
            className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-teal-900/40 text-slate-400 hover:text-teal-300 flex items-center justify-center transition-all active:scale-95 text-xs"
          >
            <CheckCircle2 className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center text-xs text-slate-500 mt-4">
          Espacio seguro · Hospital Universitario del Valle · Puedes pausar en cualquier momento
        </div>
      </div>
    </div>
  );
};
