import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES_LIST } from '../data/products';
import { ProductCategory } from '../types';
import { SafeImage } from './SafeImage';

interface ShopByCategoryProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-2xs">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-950 tracking-tight">
              Shop by Category
            </h2>
            <p className="text-[11px] sm:text-xs text-stone-500 font-medium">
              Explore curated product collections across our core departments
            </p>
          </div>
        </div>

        {/* 5-Column Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {CATEGORIES_LIST.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name as ProductCategory)}
              className="group relative flex flex-col text-left rounded-xl overflow-hidden bg-stone-50/70 border border-stone-200 hover:border-amber-400 hover:shadow-md transition-all duration-200 focus:outline-none"
            >
              {/* Image Container */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
                <SafeImage
                  src={cat.image}
                  alt={cat.name}
                  fallbackCategory={cat.name}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300 ease-out"
                />
                
                {/* Arrow Affordance Badge */}
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-700 opacity-80 group-hover:opacity-100 group-hover:bg-amber-400 group-hover:text-stone-950 transition-all shadow-xs">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Text Info */}
              <div className="p-3 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-bold text-stone-950 text-xs sm:text-sm group-hover:text-amber-800 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5 leading-snug">
                    {cat.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
