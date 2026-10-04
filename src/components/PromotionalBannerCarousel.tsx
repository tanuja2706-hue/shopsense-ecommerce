import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { ProductCategory } from '../types';
import { SafeImage } from './SafeImage';

interface PromotionalBannerCarouselProps {
  onSelectCategory: (category: ProductCategory) => void;
}

interface BannerItem {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  buttonText: string;
  category: ProductCategory;
  bgGradient: string;
  textColor: string;
  image: string;
}

export const PromotionalBannerCarousel: React.FC<PromotionalBannerCarouselProps> = ({
  onSelectCategory,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const banners: BannerItem[] = [
    {
      id: 1,
      badge: 'SEASONAL TECH PROMOTION',
      title: 'Smart Tech. Better Everyday.',
      subtitle: 'Explore electronics, acoustics & workstation accessories',
      buttonText: 'Shop Electronics',
      category: 'Electronics',
      bgGradient: 'from-stone-900 via-stone-850 to-stone-950',
      textColor: 'text-white',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=900&auto=format&fit=crop',
    },
    {
      id: 2,
      badge: 'NEW APPAREL ARRIVALS',
      title: 'Refresh Your Everyday Style',
      subtitle: 'Discover new season organic cotton & linen fashion picks',
      buttonText: 'Shop Fashion',
      category: 'Fashion',
      bgGradient: 'from-amber-950 via-stone-900 to-amber-900',
      textColor: 'text-white',
      image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=900&auto=format&fit=crop',
    },
    {
      id: 3,
      badge: 'INTERIOR COMFORTS',
      title: 'Make Your Space Yours',
      subtitle: 'Thoughtful home essentials, ceramic craft & warm lighting',
      buttonText: 'Explore Home',
      category: 'Home & Living',
      bgGradient: 'from-stone-800 via-stone-900 to-stone-950',
      textColor: 'text-white',
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=900&auto=format&fit=crop',
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, banners.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const activeBanner = banners[currentSlide];

  return (
    <section
      className="py-4 sm:py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative rounded-2xl overflow-hidden shadow-md">
        
        {/* Banner Slide Container */}
        <div
          className={`relative bg-gradient-to-r ${activeBanner.bgGradient} min-h-[220px] sm:min-h-[280px] md:min-h-[320px] flex items-center justify-between p-6 sm:p-10 lg:p-12 overflow-hidden transition-all duration-500`}
        >
          {/* Left Text Block */}
          <div className="relative z-10 max-w-md sm:max-w-lg space-y-3 sm:space-y-4">
            <span className="inline-block bg-amber-400 text-stone-950 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-xs">
              {activeBanner.badge}
            </span>

            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {activeBanner.title}
            </h2>

            <p className="text-stone-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-md">
              {activeBanner.subtitle}
            </p>

            <div className="pt-2">
              <button
                onClick={() => onSelectCategory(activeBanner.category)}
                className="py-2.5 sm:py-3 px-5 sm:px-7 rounded-xl bg-amber-400 text-stone-950 hover:bg-amber-300 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 group"
              >
                <span>{activeBanner.buttonText}</span>
                <ArrowRight className="w-4 h-4 text-stone-950 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Product Imagery */}
          <div className="hidden sm:block relative w-48 sm:w-64 md:w-80 aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 shrink-0 transform hover:scale-103 transition-transform duration-300">
            <SafeImage
              src={activeBanner.image}
              alt={activeBanner.title}
              fallbackCategory={activeBanner.category}
              containerClassName="w-full h-full"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Left / Right Chevron Controls */}
          <button
            onClick={handlePrev}
            aria-label="Previous banner"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-stone-900 shadow-md flex items-center justify-center transition-all z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next banner"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-stone-900 shadow-md flex items-center justify-center transition-all z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots Pagination */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {banners.map((b, idx) => (
            <button
              key={b.id}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx ? 'w-6 bg-amber-400' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
