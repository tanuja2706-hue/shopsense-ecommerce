import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  Search,
  X,
  Star,
  RotateCcw,
  ArrowUpDown,
  Filter,
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';

interface ShopViewProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onViewDetails: (product: Product) => void;
}

type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'rating-desc';

const CATEGORIES: ProductCategory[] = [
  'All',
  'Electronics',
  'Fashion',
  'Beauty',
  'Home & Living',
  'Accessories',
  'Mobiles',
  'Appliances',
  'Lifestyle',
];

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  setSearchQuery,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onViewDetails,
}) => {
  const [maxPrice, setMaxPrice] = useState<number>(800);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Price calculations
  const absoluteMaxPrice = useMemo(() => {
    return Math.max(...products.map((p) => p.price), 800);
  }, [products]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (
        selectedCategory !== 'All' &&
        selectedCategory !== 'For You' &&
        product.category !== selectedCategory
      ) {
        return false;
      }

      // Price filter
      if (product.price > maxPrice) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      // Search query (name and description)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesDesc) {
          return false;
        }
      }

      return true;
    });
  }, [products, selectedCategory, maxPrice, minRating, searchQuery]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'rating-desc':
        return list.sort((a, b) => b.rating - a.rating);
      case 'recommended':
      default:
        // Prioritize trending or top rated
        return list.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
    }
  }, [filteredProducts, sortBy]);

  const handleResetFilters = () => {
    onSelectCategory('All');
    setMaxPrice(800);
    setMinRating(0);
    setSearchQuery('');
    setSortBy('recommended');
  };

  const hasActiveFilters =
    (selectedCategory !== 'All' && selectedCategory !== 'For You') ||
    maxPrice < 800 ||
    minRating > 0 ||
    searchQuery.trim() !== '';

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header & Breadcrumb */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
          <span>Home</span>
          <span>/</span>
          <span className="text-stone-900 font-medium">Shop</span>
          {selectedCategory !== 'All' && (
            <>
              <span>/</span>
              <span className="text-amber-800 font-semibold">{selectedCategory}</span>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-950 tracking-tight">
              {selectedCategory === 'All' ? 'All Products' : selectedCategory}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Browse {products.length} meticulously designed lifestyle objects
            </p>
          </div>

          {/* Quick Category Tab Bar for Desktop */}
          <div className="hidden lg:flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200/80">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedCategory === cat
                    ? 'bg-stone-950 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid with Sidebar Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 bg-white p-6 rounded-2xl border border-stone-200 sticky top-28 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div className="flex items-center gap-2 font-semibold text-sm text-stone-950">
              <SlidersHorizontal className="w-4 h-4 text-amber-700" />
              <span>Filters</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-medium text-amber-700 hover:text-amber-900 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Filter: Search within category */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-900 uppercase tracking-wider block">
              Search by name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="E.g. headphones, wool..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-7 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 focus:bg-white"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Filter: Categories */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-900 uppercase tracking-wider block">
              Category
            </label>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => {
                const count =
                  cat === 'All'
                    ? products.length
                    : products.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => onSelectCategory(cat)}
                    className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                      selectedCategory === cat
                        ? 'bg-stone-900 text-white'
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-950'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[11px] tabular-nums ${
                      selectedCategory === cat ? 'text-stone-300' : 'text-stone-400'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter: Price Range */}
          <div className="space-y-3 pt-2 border-t border-stone-100">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-stone-900 uppercase tracking-wider">
                Max Price
              </label>
              <span className="font-bold text-stone-950 tabular-nums">
                ${maxPrice}
              </span>
            </div>
            <input
              type="range"
              min={30}
              max={800}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-stone-950 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400 tabular-nums">
              <span>$30</span>
              <span>$400</span>
              <span>$800</span>
            </div>
          </div>

          {/* Filter: Minimum Rating */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <label className="text-xs font-semibold text-stone-900 uppercase tracking-wider block">
              Rating
            </label>
            <div className="space-y-1">
              {[
                { label: 'All Ratings', value: 0 },
                { label: '4.8 & Above', value: 4.8 },
                { label: '4.5 & Above', value: 4.5 },
                { label: '4.0 & Above', value: 4.0 },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setMinRating(opt.value)}
                  className={`w-full flex items-center gap-2 py-1.5 px-2.5 rounded-lg text-xs font-medium text-left transition-colors ${
                    minRating === opt.value
                      ? 'bg-amber-50 text-amber-900 font-semibold border border-amber-200'
                      : 'text-stone-600 hover:bg-stone-50 hover:text-stone-950'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${
                    minRating === opt.value ? 'fill-amber-500 text-amber-500' : 'text-stone-400'
                  }`} />
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* Right Section: Mobile filter bar, sort controls, and products grid */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Controls Bar: Mobile filter button, counter, and Sort dropdown */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-xl border border-stone-200">
            {/* Mobile Filters Toggle Button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <Filter className="w-4 h-4 text-amber-700" />
              <span>Filters {hasActiveFilters && '(Active)'}</span>
            </button>

            {/* Results Counter */}
            <div className="text-xs text-stone-500 font-medium">
              Showing <strong className="text-stone-900 tabular-nums">{sortedProducts.length}</strong> of{' '}
              <strong className="text-stone-900 tabular-nums">{products.length}</strong> items
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-600 hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-stone-50 border border-stone-200 text-stone-900 text-xs font-medium rounded-lg py-2 pl-3 pr-8 hover:border-stone-400 focus:outline-none focus:border-stone-950 cursor-pointer"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Highest Rated</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-stone-400 font-medium">Applied:</span>
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => onSelectCategory('All')}
                  className="inline-flex items-center gap-1.5 py-1 px-2.5 bg-stone-100 text-stone-800 text-xs font-medium rounded-md hover:bg-stone-200"
                >
                  <span>Category: {selectedCategory}</span>
                  <X className="w-3 h-3 text-stone-500" />
                </button>
              )}
              {maxPrice < 800 && (
                <button
                  onClick={() => setMaxPrice(800)}
                  className="inline-flex items-center gap-1.5 py-1 px-2.5 bg-stone-100 text-stone-800 text-xs font-medium rounded-md hover:bg-stone-200"
                >
                  <span>Under ${maxPrice}</span>
                  <X className="w-3 h-3 text-stone-500" />
                </button>
              )}
              {minRating > 0 && (
                <button
                  onClick={() => setMinRating(0)}
                  className="inline-flex items-center gap-1.5 py-1 px-2.5 bg-stone-100 text-stone-800 text-xs font-medium rounded-md hover:bg-stone-200"
                >
                  <span>{minRating}+ Stars</span>
                  <X className="w-3 h-3 text-stone-500" />
                </button>
              )}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="inline-flex items-center gap-1.5 py-1 px-2.5 bg-stone-100 text-stone-800 text-xs font-medium rounded-md hover:bg-stone-200"
                >
                  <span>"{searchQuery}"</span>
                  <X className="w-3 h-3 text-stone-500" />
                </button>
              )}
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-amber-700 hover:text-amber-900 ml-2 underline underline-offset-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isInWishlist={wishlistIds.has(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  onAddToCart={onAddToCart}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-white rounded-2xl border border-stone-200">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-1">
                No matching products found
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto mb-6">
                Try adjusting your search criteria, raising your price ceiling, or clearing active filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="py-2.5 px-5 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Mobile Filters Slide-over / Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xs bg-white h-full shadow-2xl flex flex-col p-6 space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2 font-bold text-base text-stone-950">
                <SlidersHorizontal className="w-4 h-4 text-amber-700" />
                <span>Filters & Refinements</span>
              </div>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1 text-stone-500 hover:text-stone-950 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-900 uppercase tracking-wider block">
                Category
              </label>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      onSelectCategory(cat);
                    }}
                    className={`w-full flex items-center justify-between py-2 px-3 rounded-lg text-xs font-medium text-left ${
                      selectedCategory === cat
                        ? 'bg-stone-900 text-white'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[11px] tabular-nums">
                      {cat === 'All'
                        ? products.length
                        : products.filter((p) => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Price */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-stone-900 uppercase tracking-wider">
                  Max Price
                </span>
                <span className="font-bold text-stone-950 tabular-nums">${maxPrice}</span>
              </div>
              <input
                type="range"
                min={30}
                max={800}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-stone-950"
              />
            </div>

            {/* Mobile Ratings */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <label className="text-xs font-semibold text-stone-900 uppercase tracking-wider block">
                Rating
              </label>
              <div className="space-y-1">
                {[
                  { label: 'All Ratings', value: 0 },
                  { label: '4.8 & Above', value: 4.8 },
                  { label: '4.5 & Above', value: 4.5 },
                  { label: '4.0 & Above', value: 4.0 },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setMinRating(opt.value)}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-medium text-left ${
                      minRating === opt.value
                        ? 'bg-amber-100 text-amber-900 font-semibold'
                        : 'text-stone-600'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-stone-100 flex gap-2 mt-auto">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-2.5 px-3 bg-stone-100 text-stone-700 rounded-xl text-xs font-semibold"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 py-2.5 px-3 bg-stone-900 text-white rounded-xl text-xs font-semibold"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
