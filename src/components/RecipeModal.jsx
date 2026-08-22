import React, { useState, useEffect } from 'react';
import { X, Check, Circle, Save, Utensils, Tag, Edit2 } from 'lucide-react';

export default function RecipeModal({ recipe, onClose, onToggleHasEaten, onSaveMemo, onDelete }) {
  const [memoText, setMemoText] = useState(recipe?.memo || '');
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  useEffect(() => {
    if (recipe) {
      setMemoText(recipe.memo || '');
    }
  }, [recipe]);

  if (!recipe) return null;

  const handleSaveMemo = () => {
    onSaveMemo(recipe.id, memoText);
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2000);
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case '初期': return 'bg-amber-100 text-amber-800 border-amber-200';
      case '中期': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case '後期': return 'bg-sky-100 text-sky-800 border-sky-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 max-h-[92vh] sm:max-h-[90vh] flex flex-col transition-all transform animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Photo */}
        <div className="relative h-44 sm:h-56 w-full bg-gradient-to-br from-amber-100 to-orange-100 shrink-0 flex items-center justify-center">
          {recipe.photoUrl ? (
            <img 
              src={recipe.photoUrl} 
              alt={recipe.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-md mb-1.5 text-amber-600">
                <Utensils className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <span className="text-xs font-medium text-amber-900/60">写真未登録</span>
            </div>
          )}

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all backdrop-blur-xs shadow-md"
            aria-label="閉じる"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Stage & Category Badges */}
          <div className="absolute bottom-3 left-3 flex gap-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border shadow-xs ${getStageColor(recipe.stage)}`}>
              {recipe.stage}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold border shadow-xs bg-white/90 text-gray-800 border-gray-200 backdrop-blur-md">
              {recipe.category}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 flex-1">
          {/* Title & Eaten status */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-3">{recipe.title}</h2>

            <button
              type="button"
              onClick={() => onToggleHasEaten(recipe.id)}
              className={`w-full py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                recipe.hasEaten
                  ? 'bg-emerald-500 text-white shadow-md hover:bg-emerald-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              {recipe.hasEaten ? (
                <>
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
                  <span>食べたことがある（チェック済み）</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                  <span>食べたことがあるにチェックする</span>
                </>
              )}
            </button>
          </div>

          {/* Button to press highlight */}
          <div className="bg-amber-50 rounded-2xl p-3.5 sm:p-4 border border-amber-200 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
              <Tag className="w-4 h-4 text-amber-600" />
              <span>押下するボタン</span>
            </div>
            <p className="text-lg sm:text-xl font-black text-amber-950 tracking-tight">
              {recipe.buttonToPress || '標準操作'}
            </p>
          </div>

          {/* Ingredients */}
          <div className="bg-gray-50 rounded-2xl p-3.5 sm:p-4 border border-gray-100 space-y-1.5">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">材料・分量</h3>
            <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-relaxed whitespace-pre-wrap">
              {recipe.ingredients || '材料の記載はありません'}
            </p>
          </div>

          {/* Free Memo */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <Edit2 className="w-3.5 h-3.5" />
                <span>自由メモ</span>
              </h3>
              {isSavedNotice && (
                <span className="text-xs font-bold text-emerald-600 animate-fade-in">
                  保存しました！
                </span>
              )}
            </div>
            <textarea
              rows={3}
              value={memoText}
              onChange={(e) => setMemoText(e.target.value)}
              placeholder="反応やアレンジ、メモを入力してください..."
              className="w-full p-3 rounded-2xl border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 bg-gray-50/50"
            />
            <button
              type="button"
              onClick={handleSaveMemo}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500 text-white font-bold text-xs sm:text-xs hover:bg-amber-600 active:scale-[0.98] transition-all shadow-xs flex items-center justify-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>メモを保存する</span>
            </button>
          </div>
        </div>

        {/* Footer Delete Action */}
        {onDelete && (
          <div className="px-4 py-3 sm:px-6 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('このレシピを削除しますか？')) {
                  onDelete(recipe.id);
                  onClose();
                }
              }}
              className="text-xs font-medium text-rose-500 hover:text-rose-700 underline"
            >
              レシピを削除
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
