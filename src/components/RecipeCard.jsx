import React from 'react';
import { Check, Edit3, Circle, Utensils } from 'lucide-react';

export default function RecipeCard({ recipe, onToggleHasEaten, onClick }) {
  const getStageColor = (stage) => {
    switch (stage) {
      case '初期': return 'bg-amber-100 text-amber-800 border-amber-200';
      case '中期': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case '後期': return 'bg-sky-100 text-sky-800 border-sky-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case '炭水化物': return 'bg-orange-50 text-orange-700 border-orange-200';
      case '野菜・果物': return 'bg-green-50 text-green-700 border-green-200';
      case 'タンパク質': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`recipe-card group relative bg-white rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden shadow-xs hover:shadow-md active:scale-[0.99] flex flex-col justify-between ${
        recipe.hasEaten ? 'border-emerald-300 bg-emerald-50/10' : 'border-gray-200/80 hover:border-amber-300'
      }`}
    >
      <div>
        {/* Photo Container */}
        <div className="relative h-36 sm:h-44 w-full overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center shrink-0">
          {recipe.photoUrl ? (
            <img 
              src={recipe.photoUrl} 
              alt={recipe.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-3 text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center shadow-xs mb-1.5 text-amber-600">
                <Utensils className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-amber-800/60">写真未登録</span>
            </div>
          )}

          {/* Stage Badge */}
          <div className="absolute top-2.5 left-2.5">
            <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold border shadow-xs ${getStageColor(recipe.stage)}`}>
              {recipe.stage}
            </span>
          </div>

          {/* Category Badge */}
          <div className="absolute top-2.5 right-2.5">
            <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold border shadow-xs backdrop-blur-md ${getCategoryColor(recipe.category)}`}>
              {recipe.category}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-3.5 sm:p-4 space-y-2.5">
          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-amber-600 transition-colors line-clamp-1">
            {recipe.title}
          </h3>

          {/* Ingredients */}
          <div className="bg-gray-50/80 rounded-xl p-2 sm:p-2.5 border border-gray-100">
            <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 block mb-0.5">材料</span>
            <p className="text-xs text-gray-700 font-medium line-clamp-2 leading-relaxed">
              {recipe.ingredients || '未登録'}
            </p>
          </div>

          {/* Button to press */}
          <div className="bg-amber-50/80 border border-amber-200/70 rounded-xl p-2 sm:p-2.5 flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-bold text-amber-800/80">押下ボタン</span>
            <span className="text-[11px] sm:text-xs font-black text-amber-950 bg-amber-200/70 px-2 sm:px-2.5 py-0.5 rounded-lg border border-amber-300/50">
              {recipe.buttonToPress || '標準操作'}
            </span>
          </div>

          {/* Free memo indicator */}
          {recipe.memo && (
            <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
              <Edit3 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="truncate italic text-[11px]">{recipe.memo}</span>
            </div>
          )}
        </div>
      </div>

      {/* Eaten Checkbox Button */}
      <div className="p-3.5 pt-0 sm:p-4 sm:pt-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleHasEaten(recipe.id);
          }}
          className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
            recipe.hasEaten
              ? 'bg-emerald-500 text-white shadow-xs hover:bg-emerald-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {recipe.hasEaten ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>食べたことがある</span>
            </>
          ) : (
            <>
              <Circle className="w-4 h-4 stroke-[2]" />
              <span>食べたことがあるにチェック</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
