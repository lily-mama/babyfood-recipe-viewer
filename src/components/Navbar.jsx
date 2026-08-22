import React from 'react';
import { UtensilsCrossed, Plus, CheckCircle2 } from 'lucide-react';

export default function Navbar({ recipesCount, eatenCount, onOpenAddModal }) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2">
        {/* Title & Brand */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 text-white flex items-center justify-center shadow-xs shrink-0">
            <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black text-gray-900 tracking-tight leading-tight">
              離乳食レシピ
            </h1>
            <p className="text-[10px] sm:text-xs font-bold text-amber-700/80">
              レコルト簡単調理メモ
            </p>
          </div>
        </div>

        {/* Right Action Area */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Eaten Stats Pill */}
          <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] sm:text-xs font-bold shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
            <span>食べた実績: <strong className="text-emerald-900">{eatenCount}</strong>/{recipesCount}</span>
          </div>

          {/* Add Recipe Button */}
          <button
            type="button"
            onClick={onOpenAddModal}
            className="py-1.5 px-3 sm:py-2 sm:px-4 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-xs sm:text-xs shadow-xs transition-all flex items-center gap-1 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">レシピ追加</span>
            <span className="sm:hidden">追加</span>
          </button>
        </div>
      </div>
    </header>
  );
}
