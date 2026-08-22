import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import AddRecipeModal from './components/AddRecipeModal';
import { INITIAL_RECIPES, STAGES, CATEGORIES } from './data/recipes';
import { Search, CheckCircle, Sparkles, X } from 'lucide-react';

export default function App() {
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem('simple_babyfood_recipes_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_RECIPES; }
    }
    return INITIAL_RECIPES;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState('すべて');
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [showEatenOnly, setShowEatenOnly] = useState(false);

  const [activeModalRecipe, setActiveModalRecipe] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Sync state with LocalStorage
  useEffect(() => {
    localStorage.setItem('simple_babyfood_recipes_v2', JSON.stringify(recipes));
  }, [recipes]);

  // Toggle eaten status
  const handleToggleHasEaten = (id) => {
    setRecipes(prev => prev.map(r => r.id === id ? { ...r, hasEaten: !r.hasEaten } : r));
    if (activeModalRecipe && activeModalRecipe.id === id) {
      setActiveModalRecipe(prev => ({ ...prev, hasEaten: !prev.hasEaten }));
    }
  };

  // Add new custom recipe
  const handleAddRecipe = (newRecipe) => {
    setRecipes([newRecipe, ...recipes]);
  };

  // Save free memo
  const handleSaveMemo = (id, noteText) => {
    setRecipes(prev => prev.map(r => r.id === id ? { ...r, memo: noteText } : r));
    if (activeModalRecipe && activeModalRecipe.id === id) {
      setActiveModalRecipe(prev => ({ ...prev, memo: noteText }));
    }
  };

  // Delete recipe
  const handleDeleteRecipe = (id) => {
    setRecipes(prev => prev.filter(r => r.id !== id));
  };

  // Filtered recipes
  const filteredRecipes = useMemo(() => {
    return recipes.filter(r => {
      // Eaten only filter
      if (showEatenOnly && !r.hasEaten) return false;

      // Stage filter (初期 / 中期 / 後期)
      if (selectedStage !== 'すべて' && r.stage !== selectedStage) return false;

      // Category filter
      if (selectedCategory !== 'すべて' && r.category !== selectedCategory) return false;

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const inTitle = r.title?.toLowerCase().includes(query);
        const inIngredients = r.ingredients?.toLowerCase().includes(query);
        const inButton = r.buttonToPress?.toLowerCase().includes(query);
        const inMemo = r.memo?.toLowerCase().includes(query);
        if (!inTitle && !inIngredients && !inButton && !inMemo) return false;
      }

      return true;
    });
  }, [recipes, selectedStage, selectedCategory, showEatenOnly, searchQuery]);

  const eatenCount = useMemo(() => recipes.filter(r => r.hasEaten).length, [recipes]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-white to-amber-50/20 text-gray-800 font-sans pb-16">
      {/* Header Navbar */}
      <Navbar 
        recipesCount={recipes.length} 
        eatenCount={eatenCount} 
        onOpenAddModal={() => setIsAddModalOpen(true)} 
      />

      <main className="max-w-6xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6 space-y-4 sm:space-y-6">
        {/* Stage Filter Tabs (全時期 / 初期 / 中期 / 後期) */}
        <div className="bg-white rounded-2xl p-1 sm:p-1.5 border border-amber-100 shadow-xs grid grid-cols-4 gap-1">
          {STAGES.map(stage => {
            const isActive = selectedStage === stage;
            return (
              <button
                key={stage}
                onClick={() => setSelectedStage(stage)}
                className={`py-2 px-1 sm:py-2.5 sm:px-3 rounded-xl text-xs sm:text-xs font-bold transition-all text-center truncate ${
                  isActive 
                    ? 'bg-amber-500 text-white shadow-xs scale-[1.01]' 
                    : 'text-gray-600 hover:bg-amber-50 hover:text-amber-800'
                }`}
              >
                {stage === 'すべて' ? '全時期' : (
                  <>
                    <span className="hidden sm:inline">離乳食</span>
                    <span>{stage}</span>
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Filter & Search Bar Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-gray-100 shadow-xs">
          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="レシピ名・材料で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 sm:py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-xs focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Pills & Eaten Filter */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 md:pb-0">
            {/* Eaten filter toggle */}
            <button
              onClick={() => setShowEatenOnly(!showEatenOnly)}
              className={`px-3 py-2 sm:py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 border ${
                showEatenOnly
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-xs'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>食べたことあり</span>
            </button>

            <span className="w-px h-5 bg-gray-200 shrink-0" />

            {/* Categories */}
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 sm:py-2 rounded-xl text-xs font-semibold shrink-0 transition-all border ${
                  selectedCategory === cat
                    ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count & Filter Reset */}
        <div className="flex items-center justify-between text-xs text-gray-500 px-1 font-medium">
          <span>該当レシピ: <strong className="text-gray-800">{filteredRecipes.length}</strong> 件</span>
          {(selectedStage !== 'すべて' || selectedCategory !== 'すべて' || showEatenOnly || searchQuery) && (
            <button
              onClick={() => {
                setSelectedStage('すべて');
                setSelectedCategory('すべて');
                setShowEatenOnly(false);
                setSearchQuery('');
              }}
              className="text-amber-600 hover:underline font-bold"
            >
              フィルター解除
            </button>
          )}
        </div>

        {/* Responsive Recipe Cards Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onToggleHasEaten={handleToggleHasEaten}
                onClick={() => setActiveModalRecipe(recipe)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-gray-100 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 mx-auto flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-700">該当するレシピが見つかりませんでした</h3>
            <p className="text-xs text-gray-400">条件を変更するか、右上の「追加」から新しいレシピを作成してください。</p>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {activeModalRecipe && (
        <RecipeModal
          recipe={activeModalRecipe}
          onClose={() => setActiveModalRecipe(null)}
          onToggleHasEaten={handleToggleHasEaten}
          onSaveMemo={handleSaveMemo}
          onDelete={handleDeleteRecipe}
        />
      )}

      {/* Add Recipe Modal */}
      <AddRecipeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddRecipe={handleAddRecipe}
      />
    </div>
  );
}
