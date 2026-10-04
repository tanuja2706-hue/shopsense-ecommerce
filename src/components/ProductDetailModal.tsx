import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Product } from '../types';
import { SafeImage } from './SafeImage';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isInWishlist: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  isInWishlist,
  onToggleWishlist,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 1500);
  };

  const discountAmount = product.originalPrice ? product.originalPrice - product.price : 0;
  const discountPercent = product.originalPrice
    ? Math.round((discountAmount / product.originalPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 transition-opacity animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-stone-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/50">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span>Shop</span>
            <span>/</span>
            <span className="text-stone-700 font-medium">{product.category}</span>
            <span className="hidden sm:inline">/</span>
            <span className="hidden sm:inline text-stone-900 font-medium truncate max-w-xs">
              {product.name}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Left: Product Media */}
            <div className="space-y-4">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-stone-100 border border-stone-200/80">
                <SafeImage
                  src={product.image}
                  alt={product.name}
                  fallbackCategory={product.category}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover object-center"
                />

                {product.tag && (
                  <div className="absolute top-4 left-4 bg-stone-950 text-white text-xs font-semibold px-2.5 py-1 rounded-sm shadow-sm">
                    {product.tag}
                  </div>
                )}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs text-stone-600">
                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/60 flex flex-col items-center">
                  <Truck className="w-4 h-4 text-stone-800 mb-1" />
                  <span className="font-semibold text-stone-900">Direct Delivery</span>
                  <span className="text-[10px] text-stone-500">Tracked shipping</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/60 flex flex-col items-center">
                  <RotateCcw className="w-4 h-4 text-stone-800 mb-1" />
                  <span className="font-semibold text-stone-900">Interactive</span>
                  <span className="text-[10px] text-stone-500">Full functionality</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/60 flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 text-stone-800 mb-1" />
                  <span className="font-semibold text-stone-900">Quality Design</span>
                  <span className="text-[10px] text-stone-500">Clean aesthetic</span>
                </div>
              </div>
            </div>

            {/* Right: Product Information & Purchase Controls */}
            <div className="flex flex-col space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-1 uppercase tracking-wider font-semibold">
                  <span>{product.category}</span>
                  <span>·</span>
                  <span className="text-emerald-700 font-medium">In Stock</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-stone-950 leading-tight">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-500'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-stone-800 tabular-nums">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-stone-400">
                    ({product.reviewsCount} customer ratings)
                  </span>
                </div>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pb-4 border-b border-stone-100">
                <span className="text-3xl font-bold text-stone-950 tabular-nums">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-base text-stone-400 line-through tabular-nums">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-sm">
                      Save {discountPercent}% (${discountAmount.toFixed(2)})
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-stone-600 text-sm leading-relaxed">
                {product.description}
              </p>

              {/* Features List */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wider text-stone-900 font-bold">
                  Highlights & Specifications
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-600">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold text-sm leading-none mt-0.5">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity and Actions */}
              <div className="pt-4 border-t border-stone-200 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold text-stone-700 uppercase tracking-wide">
                    Quantity
                  </span>
                  <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-stone-50">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="px-3 py-1.5 text-stone-700 hover:bg-stone-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-semibold"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-sm font-semibold text-stone-900 tabular-nums min-w-[36px] text-center bg-white">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      disabled={quantity >= 10}
                      className="px-3 py-1.5 text-stone-700 hover:bg-stone-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-semibold"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-stone-400">
                    Total: <strong className="text-stone-900 tabular-nums">${(product.price * quantity).toFixed(2)}</strong>
                  </span>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                      addedSuccess
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-stone-900 text-white hover:bg-stone-800 active:scale-98 shadow-sm'
                    }`}
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart ({quantity})</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-amber-300" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onToggleWishlist(product)}
                    aria-label="Wishlist"
                    className={`p-3 rounded-xl border transition-all duration-200 flex items-center justify-center ${
                      isInWishlist
                        ? 'bg-amber-50 border-amber-300 text-amber-700'
                        : 'border-stone-300 hover:border-stone-400 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="px-6 py-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <span>In stock · Ready to dispatch</span>
          <button
            onClick={onClose}
            className="text-stone-700 hover:text-stone-950 font-medium underline underline-offset-2"
          >
            Continue browsing
          </button>
        </div>
      </div>
    </div>
  );
};
