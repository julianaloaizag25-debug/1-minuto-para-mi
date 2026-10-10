import React from 'react';
import { PauseCategory } from '../types';

interface CategoryFilterProps {
  selectedCategory: PauseCategory | 'all';
  onSelectCategory: (category: PauseCategory | 'all') => void;
  counts: Record<PauseCategory | 'all', number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  counts,
}) => {
  const categories: Array<{ id: PauseCategory | 'all'; label: string; icon: string }> = [
    { id: 'all', label: 'Todas las Pausas', icon: '🌟' },
    { id: 'respiracion', label: 'Respiración', icon: '🌬️' },
    { id: 'estiramiento', label: 'Estiramiento', icon: '🧘' },
    { id: 'relajacion', label: 'Descompresión', icon: '💙' },
    { id: 'visual', label: 'Descanso Visual', icon: '👁️' },
  ];

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none max-w-full">
      {categories.map((cat) => {
        const isActive = selectedCategory === cat.id;
        const count = counts[cat.id] ?? 0;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`min-h-[40px] px-3.5 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 active:scale-98 ${
              isActive
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80 hover:text-slate-900'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
            <span
              className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono tabular-nums ${
                isActive ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
