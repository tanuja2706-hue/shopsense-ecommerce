import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { SafeImage } from './SafeImage';

interface ProductCardProps {
  product: Product;
  isInWishlist: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isInWishlist,
  onToggleWishlist,
  onAddToCart,
  onViewDetails,
}) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      onClick={() => onViewDetails(product)}
      className="group relative flex flex-col bg-white border border-stone-200/90 rounded-xl overflow-hidden hover:border-stone-400 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
        <SafeImage
          src={product.image}
          alt={product.name}
          fallbackCategory={product.category}
          containerClassName="w-full h-full"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out"
        />

        {/* Subtle Tag (Top Left) */}
        {product.tag && (
          <div className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-sm tracking-wide">
            {product.tag}
          </div>
        )}

        {/* Discount Badge if applicable */}
        {discountPercentage && !product.tag && (
          <div className="absolute top-3 left-3 bg-amber-700/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-sm">
            Save {discountPercentage}%
          </div>
        )}

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={handleWishlistClick}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            isInWishlist
              ? 'bg-amber-500 text-white shadow-xs'
              : 'bg-white/80 text-stone-700 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isInWishlist ? 'fill-current' : ''
            }`}
          />
        </button>

        {/* Quick View Button overlay on desktop hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="flex-1 py-2 px-3 bg-white/95 backdrop-blur-xs hover:bg-white text-stone-900 text-xs font-semibold rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Information */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="uppercase tracking-wider font-medium text-[11px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-stone-700 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span className="tabular-nums">{product.rating.toFixed(1)}</span>
              <span className="text-stone-400 text-[11px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-medium text-stone-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-amber-800 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="font-bold text-stone-950 text-base sm:text-lg tabular-nums">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through tabular-nums">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {discountPercentage && (
              <span className="text-[11px] text-emerald-700 font-bold tabular-nums">
                {discountPercentage}% off
              </span>
            )}
          </div>

          {/* Add to Cart Working Button */}
          <button
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
              justAdded
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-stone-900 text-white hover:bg-stone-800 active:scale-95'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

        {/* Mobile View Details Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(product);
          }}
          className="sm:hidden text-center text-xs text-stone-600 hover:text-stone-950 py-1 font-medium underline underline-offset-2"
        >
          View Details
        </button>
      </div>
    </div>
  );
};
