import React, { useState } from 'react';
import { X, Plus, Image as ImageIcon } from 'lucide-react';
import { STAGES, CATEGORIES } from '../data/recipes';

export default function AddRecipeModal({ isOpen, onClose, onAddRecipe }) {
  const [title, setTitle] = useState('');
  const [stage, setStage] = useState('初期');
  const [category, setCategory] = useState('炭水化物');
  const [ingredients, setIngredients] = useState('');
  const [buttonToPress, setButtonToPress] = useState('potage & paste');
  const [photoUrl, setPhotoUrl] = useState('');
  const [memo, setMemo] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newRecipe = {
      id: `recipe-${Date.now()}`,
      title: title.trim(),
      stage,
      category,
      ingredients: ingredients.trim() || '未入力',
      buttonToPress: buttonToPress.trim() || '標準操作',
      photoUrl: photoUrl.trim() || null,
      hasEaten: false,
      memo: memo.trim()
    };

    onAddRecipe(newRecipe);

    // Reset form
    setTitle('');
    setStage('初期');
    setCategory('炭水化物');
    setIngredients('');
    setButtonToPress('potage & paste');
    setPhotoUrl('');
    setMemo('');

    onClose();
  };

  const validStages = STAGES.filter(s => s !== 'すべて');
  const validCategories = CATEGORIES.filter(c => c !== 'すべて');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-amber-50/50">
          <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
            <Plus className="w-5 h-5 text-amber-600" />
            <span>新しいレシピを追加</span>
          </h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-200/60 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Recipe Name */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              レシピ名 <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="例: 10倍がゆ"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-gray-50/50"
            />
          </div>

          {/* Stage & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">時期</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-gray-50/50"
              >
                {validStages.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">カテゴリ</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-gray-50/50"
              >
                {validCategories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">材料</label>
            <input
              type="text"
              placeholder="例: 水 200ml, 生米 20g"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-gray-50/50"
            />
          </div>

          {/* Button to press */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">押下するボタン</label>
            <input
              type="text"
              placeholder="例: potage & paste"
              value={buttonToPress}
              onChange={(e) => setButtonToPress(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-gray-50/50"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-gray-500" />
              <span>写真のURL（任意）</span>
            </label>
            <input
              type="url"
              placeholder="https://..."
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-gray-50/50"
            />
          </div>

          {/* Memo */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">自由メモ</label>
            <textarea
              rows={2}
              placeholder="メモや注意事項..."
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-gray-50/50"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>レシピを保存</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
