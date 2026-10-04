import React from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface TrendingGridProps {
  products: Product[];
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onViewDetails: (product: Product) => void;
  onViewAllClick: () => void;
}

export const TrendingGrid: React.FC<TrendingGridProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onViewDetails,
  onViewAllClick,
}) => {
  return (
    <section className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-2xs">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-950 tracking-tight">
                Trending Now
              </h2>
              <p className="text-[11px] sm:text-xs text-stone-500 font-medium">
                Customer favorites gaining momentum this week
              </p>
            </div>
          </div>

          <button
            onClick={onViewAllClick}
            className="py-1.5 px-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
          </button>
        </div>

        {/* 4-Column Desktop Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.slice(0, 8).map((product) => (
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

      </div>
    </section>
  );
};
