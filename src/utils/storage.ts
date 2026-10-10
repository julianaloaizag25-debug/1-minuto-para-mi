import { UserStats, PauseCategory } from '../types';
import { INITIAL_BADGES } from '../data/badges';

const STATS_KEY = 'huv_1min_stats';

const DEFAULT_STATS: UserStats = {
  totalPauses: 0,
  totalSeconds: 0,
  todayCount: 0,
  currentStreakDays: 1,
  lastActiveDate: '',
  calmDrops: 0,
  unlockedBadges: [],
  pausesByCategory: {
    respiracion: 0,
    estiramiento: 0,
    relajacion: 0,
    visual: 0,
  },
};

function getTodayString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function loadUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) {
      return { ...DEFAULT_STATS, lastActiveDate: getTodayString() };
    }
    const parsed: UserStats = JSON.parse(raw);
    const today = getTodayString();

    // Check streak & today reset
    if (parsed.lastActiveDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

      if (parsed.lastActiveDate === yesterdayStr) {
        // Streak is continuous
      } else if (parsed.lastActiveDate) {
        // Missed days - gentle reset without scolding
        parsed.currentStreakDays = 1;
      }
      parsed.todayCount = 0;
      parsed.lastActiveDate = today;
    }

    return parsed;
  } catch {
    return { ...DEFAULT_STATS, lastActiveDate: getTodayString() };
  }
}

export function saveUserStats(stats: UserStats): void {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    // silent catch for privacy browsers
  }
}

export interface PauseCompletionResult {
  stats: UserStats;
  newBadges: string[];
}

export function recordPauseCompletion(category: PauseCategory, usedRoulette = false): PauseCompletionResult {
  const stats = loadUserStats();
  const today = getTodayString();

  // Increment total and category counters
  stats.totalPauses += 1;
  stats.totalSeconds += 60;
  stats.todayCount += 1;
  stats.calmDrops += 1;
  stats.pausesByCategory[category] = (stats.pausesByCategory[category] || 0) + 1;

  // Streak update if first pause today
  if (stats.lastActiveDate !== today) {
    stats.currentStreakDays += 1;
    stats.lastActiveDate = today;
  }

  // Check for newly unlocked badges
  const newBadges: string[] = [];

  function checkBadge(badgeId: string, condition: boolean) {
    if (condition && !stats.unlockedBadges.includes(badgeId)) {
      stats.unlockedBadges.push(badgeId);
      newBadges.push(badgeId);
    }
  }

  checkBadge('primer-respiro', stats.totalPauses >= 1);
  checkBadge('hombros-de-pluma', stats.pausesByCategory.estiramiento >= 3);
  checkBadge('ojos-descansados', stats.pausesByCategory.visual >= 3);
  checkBadge('maestro-del-suspiro', stats.pausesByCategory.respiracion >= 3);
  checkBadge('mente-despejada', stats.pausesByCategory.relajacion >= 3);
  checkBadge('sembrador-huv', stats.calmDrops >= 5);
  checkBadge('racha-3-dias', stats.currentStreakDays >= 3);
  checkBadge('heroe-en-equilibrio', stats.totalPauses >= 10);
  if (usedRoulette) {
    checkBadge('espiritu-aventurero', true);
  }

  saveUserStats(stats);
  return { stats, newBadges };
}

export function unlockRouletteBadge(): { stats: UserStats; newlyUnlocked: boolean } {
  const stats = loadUserStats();
  let newlyUnlocked = false;
  if (!stats.unlockedBadges.includes('espiritu-aventurero')) {
    stats.unlockedBadges.push('espiritu-aventurero');
    newlyUnlocked = true;
    saveUserStats(stats);
  }
  return { stats, newlyUnlocked };
}
