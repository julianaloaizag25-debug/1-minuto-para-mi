/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PauseCategory, Exercise, UserStats } from './types';
import { EXERCISES } from './data/exercises';
import { loadUserStats, recordPauseCompletion } from './utils/storage';
import { soundService } from './utils/audio';

import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { ExerciseCard } from './components/ExerciseCard';
import { ActivePausePlayer } from './components/ActivePausePlayer';
import { CompletionModal } from './components/CompletionModal';
import { GardenView } from './components/GardenView';
import { BadgesView } from './components/BadgesView';
import { SurpriseRouletteModal } from './components/SurpriseRouletteModal';
import { MobileBottomNav } from './components/MobileBottomNav';

import { ShieldCheck, Heart, Sparkles, Smile, Info } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'exercises' | 'garden' | 'badges'>('exercises');
  const [selectedCategory, setSelectedCategory] = useState<PauseCategory | 'all'>('all');
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [completedExercise, setCompletedExercise] = useState<Exercise | null>(null);
  const [newlyUnlockedBadges, setNewlyUnlockedBadges] = useState<string[]>([]);
  const [showRoulette, setShowRoulette] = useState<boolean>(false);
  const [usedRouletteForCurrent, setUsedRouletteForCurrent] = useState<boolean>(false);
  const [stats, setStats] = useState<UserStats>(() => loadUserStats());
  const [isMuted, setIsMuted] = useState<boolean>(() => soundService.getIsMuted());
  const [showGuideInfo, setShowGuideInfo] = useState<boolean>(false);

  // Sync stats from storage periodically or on load
  useEffect(() => {
    setStats(loadUserStats());
  }, []);

  const handleToggleSound = () => {
    const nextMuted = soundService.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleStartExercise = (exercise: Exercise, usedRoulette = false) => {
    setActiveExercise(exercise);
    setUsedRouletteForCurrent(usedRoulette);
    setShowRoulette(false);
  };

  const handleOpenSos = () => {
    const sosExercise = EXERCISES.find((e) => e.isSosRecommended) || EXERCISES[0];
    handleStartExercise(sosExercise, false);
  };

  const handleCompleteActivePause = () => {
    if (!activeExercise) return;

    const { stats: updatedStats, newBadges } = recordPauseCompletion(
      activeExercise.category,
      usedRouletteForCurrent
    );

    setStats(updatedStats);
    setNewlyUnlockedBadges(newBadges);
    setCompletedExercise(activeExercise);
    setActiveExercise(null);
  };

  // Filter exercises
  const filteredExercises = selectedCategory === 'all'
    ? EXERCISES
    : EXERCISES.filter((e) => e.category === selectedCategory);

  // Counts for filters
  const categoryCounts: Record<PauseCategory | 'all', number> = {
    all: EXERCISES.length,
    respiracion: EXERCISES.filter((e) => e.category === 'respiracion').length,
    estiramiento: EXERCISES.filter((e) => e.category === 'estiramiento').length,
    relajacion: EXERCISES.filter((e) => e.category === 'relajacion').length,
    visual: EXERCISES.filter((e) => e.category === 'visual').length,
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-20 md:pb-8 selection:bg-teal-100 selection:text-teal-900">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenSos={handleOpenSos}
        onOpenRoulette={() => setShowRoulette(true)}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'exercises' && (
          <>
            {/* Hero Banner with stats and quick triggers */}
            <HeroBanner
              stats={stats}
              onOpenRoulette={() => setShowRoulette(true)}
              onOpenSos={handleOpenSos}
            />

            {/* Exercises Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Category Filter and Zero-Shame Guide toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                    Catálogo de Pausas de 60 Segundos
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Elige según lo que tu cuerpo o mente te pidan en este instante
                  </p>
                </div>

                <button
                  onClick={() => setShowGuideInfo(!showGuideInfo)}
                  className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1.5 self-start sm:self-auto py-1 px-2.5 rounded-lg hover:bg-teal-50 transition-colors"
                >
                  <Info className="w-4 h-4 text-teal-600" />
                  <span>¿Por qué son 100% discretos y sin pena?</span>
                </button>
              </div>

              {/* Collapsible Info Drawer on "Cero Pena" */}
              {showGuideInfo && (
                <div className="mb-6 p-5 rounded-2xl bg-teal-50/90 border border-teal-200 text-slate-700 text-xs sm:text-sm animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 font-bold text-teal-900 mb-2">
                    <Smile className="w-5 h-5 text-teal-700" />
                    <span>Diseñados con empatía para el puesto de trabajo en el HUV</span>
                  </div>
                  <ul className="space-y-2 text-slate-600 list-disc list-inside">
                    <li>
                      <strong>Cero posturas incómodas:</strong> No tienes que tirarte al suelo ni hacer contorsiones. Todos se realizan sentados en tu silla o de pie frente a tu escritorio.
                    </li>
                    <li>
                      <strong>Camuflaje natural:</strong> Ejercicios como el reseteo de mandíbula, palming o respiración fisiológica son invisibles o parecen posturas habituales de concentración médica.
                    </li>
                    <li>
                      <strong>Totalmente confidencial:</strong> No pedimos tu nombre, cargo ni correo. No hay reportes de recursos humanos ni evaluaciones. Es un regalo genuino para ti.
                    </li>
                  </ul>
                </div>
              )}

              {/* Segmented Filter Bar */}
              <div className="mb-6">
                <CategoryFilter
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  counts={categoryCounts}
                />
              </div>

              {/* Exercises Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredExercises.map((exercise) => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    onStart={(ex) => handleStartExercise(ex, false)}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {currentTab === 'garden' && (
          <GardenView
            stats={stats}
            onStartPause={() => {
              setCurrentTab('exercises');
            }}
          />
        )}

        {currentTab === 'badges' && (
          <BadgesView
            stats={stats}
            onStartPause={() => {
              setCurrentTab('exercises');
            }}
          />
        )}
      </main>

      {/* 60-Second Active Pause Interactive Player */}
      {activeExercise && (
        <ActivePausePlayer
          exercise={activeExercise}
          onClose={() => setActiveExercise(null)}
          onComplete={handleCompleteActivePause}
        />
      )}

      {/* Completion Modal when 60s finish */}
      {completedExercise && (
        <CompletionModal
          exercise={completedExercise}
          newBadges={newlyUnlockedBadges}
          totalDrops={stats.calmDrops}
          onClose={() => setCompletedExercise(null)}
          onGoToGarden={() => {
            setCompletedExercise(null);
            setCurrentTab('garden');
          }}
          onDoAnother={() => {
            setCompletedExercise(null);
            setCurrentTab('exercises');
          }}
        />
      )}

      {/* Surprise Roulette Modal */}
      {showRoulette && (
        <SurpriseRouletteModal
          onClose={() => setShowRoulette(false)}
          onSelectExercise={(ex, fromRoulette) => handleStartExercise(ex, fromRoulette)}
        />
      )}

      {/* Mobile Bottom Thumb Navigation */}
      <MobileBottomNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenRoulette={() => setShowRoulette(true)}
        calmDrops={stats.calmDrops}
      />

      {/* Clean Hospital Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:flex sm:items-center sm:justify-between text-xs text-slate-500">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2 sm:mb-0">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
            <span className="font-semibold text-slate-700">1 Minuto Para Mí</span>
            <span aria-hidden="true">·</span>
            <span>Hospital Universitario del Valle "Evaristo García" E.S.E.</span>
          </div>

          <div className="flex items-center justify-center gap-3 text-slate-400">
            <span className="flex items-center gap-1 text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" /> Cuidar al que cuida
            </span>
            <span aria-hidden="true">·</span>
            <span>100% Anónimo</span>
            <span aria-hidden="true">·</span>
            <span>Cali, Colombia</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
