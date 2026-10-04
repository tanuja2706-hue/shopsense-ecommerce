import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Flame } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface DealsOfTheDayProps {
  products: Product[];
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onViewDetails: (product: Product) => void;
  onViewAllClick: () => void;
}

export const DealsOfTheDay: React.FC<DealsOfTheDayProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onViewDetails,
  onViewAllClick,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-2xs">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <Flame className="w-5 h-5 fill-amber-500 text-amber-600" />
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-950 tracking-tight">
                Deals of the Day
              </h2>
              <p className="text-[11px] sm:text-xs text-stone-500 font-medium">
                Top discounts on high-demand essentials
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onViewAllClick}
              className="py-1.5 px-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
            </button>

            {/* Scroll Navigation Chevrons */}
            <div className="hidden sm:flex items-center gap-1 ml-2">
              <button
                onClick={scrollLeft}
                aria-label="Scroll left"
                className="w-8 h-8 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-700 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollRight}
                aria-label="Scroll right"
                className="w-8 h-8 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-700 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Product Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-2 pt-1 scroll-smooth"
        >
          {products.map((product) => (
            <div key={product.id} className="w-[240px] sm:w-[270px] shrink-0">
              <ProductCard
                product={product}
                isInWishlist={wishlistIds.has(product.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onViewDetails={onViewDetails}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
