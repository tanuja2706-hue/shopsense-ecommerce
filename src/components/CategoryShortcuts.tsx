import React from 'react';
import { CATEGORY_SHORTCUTS } from '../data/products';
import { ProductCategory } from '../types';
import { SafeImage } from './SafeImage';

interface CategoryShortcutsProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const CategoryShortcuts: React.FC<CategoryShortcutsProps> = ({ onSelectCategory }) => {
  return (
    <section className="bg-white border-b border-stone-200/80 py-4 sm:py-6 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 sm:gap-8 overflow-x-auto no-scrollbar py-1">
          {CATEGORY_SHORTCUTS.map((item) => (
            <button
              key={item.name}
              onClick={() => onSelectCategory(item.category as ProductCategory)}
              className="group flex flex-col items-center gap-2 shrink-0 text-center focus:outline-none transition-transform active:scale-95"
            >
              {/* Circular / Rounded-Square Icon Container */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden p-0.5 bg-stone-100 border border-stone-200 group-hover:border-amber-400 group-hover:shadow-md transition-all duration-200">
                <SafeImage
                  src={item.image}
                  alt={item.name}
                  fallbackCategory={item.name}
                  containerClassName="w-full h-full rounded-[14px]"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Category Label */}
              <span className="text-xs font-semibold text-stone-800 group-hover:text-amber-800 transition-colors whitespace-nowrap">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
