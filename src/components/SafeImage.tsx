import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackCategory?: string;
  containerClassName?: string;
}

// Highly stylized category vector illustrations to guarantee zero empty gray boxes or broken icons
const CategoryIllustration: React.FC<{ category: string; altText: string }> = ({
  category,
  altText,
}) => {
  const cat = category.toLowerCase();

  if (cat.includes('electr')) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 p-6 text-stone-200">
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-amber-400 drop-shadow-md" fill="none">
          {/* Headphone band */}
          <path
            d="M20 52 C20 28, 80 28, 80 52"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Cushions */}
          <rect x="14" y="48" width="12" height="24" rx="6" fill="#f59e0b" />
          <rect x="74" y="48" width="12" height="24" rx="6" fill="#f59e0b" />
          {/* Sound waves */}
          <path d="M42 56 Q50 50 58 56" stroke="#d6d3d1" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M38 64 Q50 54 62 64" stroke="#78716c" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-300 mt-2">
          {altText || 'Electronics'}
        </span>
      </div>
    );
  }

  if (cat.includes('fash')) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F5F2EB] to-[#EBE4D8] p-6 text-stone-800">
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-stone-800 drop-shadow-sm" fill="none">
          {/* Garment silhouette */}
          <path
            d="M34 26 L42 34 L50 28 L58 34 L66 26 L80 40 L70 48 L64 42 L64 80 L36 80 L36 42 L30 48 L20 40 Z"
            fill="#d6cebf"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <line x1="50" y1="36" x2="50" y2="78" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
        <span className="text-[11px] font-semibold tracking-wider uppercase text-stone-700 mt-2">
          {altText || 'Fashion Collection'}
        </span>
      </div>
    );
  }

  if (cat.includes('beau')) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FDFBF7] via-[#F4EBE1] to-[#EAD8C7] p-6 text-amber-900">
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-amber-800 drop-shadow-sm" fill="none">
          {/* Dropper Pipette Top */}
          <rect x="44" y="16" width="12" height="12" rx="3" fill="#78350f" />
          <rect x="42" y="28" width="16" height="6" rx="2" fill="#b45309" />
          {/* Amber Glass Dropper Bottle */}
          <path
            d="M36 34 L64 34 L68 44 L68 82 C68 86 64 88 50 88 C36 88 32 86 32 82 L32 44 Z"
            fill="#d97706"
            fillOpacity="0.85"
            stroke="#78350f"
            strokeWidth="3"
          />
          {/* Elixir droplet */}
          <circle cx="50" cy="62" r="5" fill="#fef3c7" />
        </svg>
        <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-800 mt-2">
          {altText || 'Botanical Beauty'}
        </span>
      </div>
    );
  }

  if (cat.includes('home') || cat.includes('living')) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F9F7F2] to-[#E8E2D5] p-6 text-stone-800">
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-stone-800 drop-shadow-sm" fill="none">
          {/* Stoneware Pour-over Carafe */}
          <path
            d="M36 28 L64 28 L56 46 L68 76 C70 82 64 84 50 84 C36 84 30 82 32 76 L44 46 Z"
            fill="#d1c7b7"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Pour-over handle */}
          <path
            d="M62 52 C74 54, 76 72, 60 76"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-[11px] font-semibold tracking-wider uppercase text-stone-700 mt-2">
          {altText || 'Home & Living'}
        </span>
      </div>
    );
  }

  // Accessories default
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F5EFE6] to-[#E3D5C5] p-6 text-amber-950">
      <svg viewBox="0 0 100 100" className="w-24 h-24 text-amber-950 drop-shadow-sm" fill="none">
        {/* Folio / Cardholder */}
        <rect
          x="24"
          y="30"
          width="52"
          height="44"
          rx="5"
          fill="#92400e"
          stroke="#451a03"
          strokeWidth="3"
        />
        {/* Brass closure clasp */}
        <circle cx="50" cy="52" r="5" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
        <path d="M24 42 L50 56 L76 42" stroke="#fde68a" strokeWidth="2" fill="none" />
      </svg>
      <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-900 mt-2">
        {altText || 'Curated Accessories'}
      </span>
    </div>
  );
};

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Product image',
  className = '',
  containerClassName = '',
  fallbackCategory = 'General',
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-stone-100/80 ${containerClassName}`}>
      {/* Warm Loading Skeleton Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-stone-200/70 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-stone-300 border-t-amber-700 animate-spin opacity-50" />
        </div>
      )}

      {hasError ? (
        <CategoryIllustration category={fallbackCategory} altText={alt} />
      ) : (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          decoding="async"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          {...rest}
        />
      )}
    </div>
  );
};
