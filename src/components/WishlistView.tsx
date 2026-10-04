import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { SafeImage } from './SafeImage';

interface WishlistViewProps {
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onExploreProducts: () => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  wishlistProducts,
  onRemoveFromWishlist,
  onMoveToCart,
  onViewDetails,
  onExploreProducts,
}) => {
  return (
    <div className="py-8 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-stone-200">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
          <span>Home</span>
          <span>/</span>
          <span className="text-stone-900 font-medium">Saved Items</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-950 tracking-tight">
            My Wishlist
          </h1>
          <span className="text-xs sm:text-sm text-stone-500">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved for later
          </span>
        </div>
      </div>

      {wishlistProducts.length === 0 ? (
        /* Empty State */
        <div className="text-center py-20 px-4 bg-white rounded-2xl border border-stone-200 max-w-xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-display text-xl font-bold text-stone-950 mb-2">
            Your wishlist is currently empty
          </h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto mb-8 leading-relaxed">
            Keep track of items you love while exploring our catalog. Click the heart icon on any product to save it here.
          </p>
          <button
            onClick={onExploreProducts}
            className="py-3 px-6 rounded-xl bg-stone-900 text-white hover:bg-stone-800 transition-all font-semibold text-xs inline-flex items-center gap-2 shadow-sm"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>
        </div>
      ) : (
        /* Wishlist Items Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-stone-400 hover:shadow-md transition-all"
            >
              {/* Product Media */}
              <div
                onClick={() => onViewDetails(product)}
                className="relative aspect-square w-full overflow-hidden bg-stone-100 cursor-pointer"
              >
                <SafeImage
                  src={product.image}
                  alt={product.name}
                  fallbackCategory={product.category}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Remove button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFromWishlist(product);
                  }}
                  title="Remove from wishlist"
                  className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-stone-600 hover:text-red-600 rounded-full shadow-xs transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                <div onClick={() => onViewDetails(product)} className="cursor-pointer">
                  <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                    {product.category}
                  </span>
                  <h3 className="font-semibold text-stone-900 text-sm line-clamp-2 group-hover:text-amber-800 transition-colors">
                    {product.name}
                  </h3>
                </div>

                <div className="pt-2 border-t border-stone-100 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-stone-950 text-base tabular-nums">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-stone-400 line-through tabular-nums">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-emerald-700 font-medium">In Stock</span>
                  </div>

                  {/* Move to Cart Button */}
                  <button
                    onClick={() => onMoveToCart(product)}
                    className="w-full py-2.5 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors active:scale-98"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
