export type PauseCategory = 'respiracion' | 'estiramiento' | 'relajacion' | 'visual';

export type DiscretionLevel = 'invisible' | 'discreto' | 'movimiento_suave';

export interface ExerciseStep {
  label: string;
  duration: number; // in seconds, sum equals 60
  instruction: string;
  subtext?: string;
  actionPhase?: 'inhala' | 'sosten' | 'exhala' | 'estira' | 'observa' | 'suelta' | 'parpadea';
}

export interface Exercise {
  id: string;
  title: string;
  subtitle: string;
  category: PauseCategory;
  durationSeconds: 60;
  discretionLevel: DiscretionLevel;
  discretionTag: string;
  shortDescription: string;
  whyItWorks: string;
  funTip: string;
  steps: ExerciseStep[];
  soundType?: 'breath' | 'bell' | 'nature' | 'silent';
  isSosRecommended?: boolean;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  category: PauseCategory | 'general';
  icon: string;
  unlockedAt?: number;
  requirement: string;
}

export interface UserStats {
  totalPauses: number;
  totalSeconds: number;
  todayCount: number;
  currentStreakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  calmDrops: number; // seeds/drops for the garden
  unlockedBadges: string[];
  pausesByCategory: Record<PauseCategory, number>;
}
