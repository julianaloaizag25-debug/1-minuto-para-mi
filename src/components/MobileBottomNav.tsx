import React from 'react';
import { Heart, Sparkles, Droplets, Award } from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: 'exercises' | 'garden' | 'badges';
  onSelectTab: (tab: 'exercises' | 'garden' | 'badges') => void;
  onOpenRoulette: () => void;
  calmDrops: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenRoulette,
  calmDrops,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg px-2 py-1.5 pb-safe">
      <div className="grid grid-cols-4 items-center h-14">
        {/* Tab 1: Pausas */}
        <button
          onClick={() => onSelectTab('exercises')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            currentTab === 'exercises' ? 'text-teal-700 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Heart className={`w-5 h-5 ${currentTab === 'exercises' ? 'fill-teal-700/20' : ''}`} />
          <span className="text-[10px] tracking-tight mt-1">Pausas</span>
        </button>

        {/* Tab 2: Ruleta Sorpresa */}
        <button
          onClick={onOpenRoulette}
          className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span className="text-[10px] tracking-tight mt-1">Ruleta</span>
        </button>

        {/* Tab 3: Jardín HUV */}
        <button
          onClick={() => onSelectTab('garden')}
          className={`flex flex-col items-center justify-center py-1 relative transition-colors ${
            currentTab === 'garden' ? 'text-teal-700 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Droplets className={`w-5 h-5 ${currentTab === 'garden' ? 'fill-teal-700/20' : ''}`} />
          <span className="text-[10px] tracking-tight mt-1">Mi Jardín</span>
          {calmDrops > 0 && (
            <span className="absolute top-0.5 right-6 w-2 h-2 rounded-full bg-teal-500" />
          )}
        </button>

        {/* Tab 4: Insignias */}
        <button
          onClick={() => onSelectTab('badges')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            currentTab === 'badges' ? 'text-teal-700 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Award className={`w-5 h-5 ${currentTab === 'badges' ? 'fill-teal-700/20' : ''}`} />
          <span className="text-[10px] tracking-tight mt-1">Insignias</span>
        </button>
      </div>
    </nav>
  );
};
