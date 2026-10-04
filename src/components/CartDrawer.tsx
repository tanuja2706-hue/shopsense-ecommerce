import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';
import { SafeImage } from './SafeImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;
  const freeShippingThreshold = 100;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/60">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-700" />
            <h2 className="font-display font-bold text-lg text-stone-950">
              Shopping Cart
            </h2>
            <span className="text-xs text-stone-500 font-semibold bg-stone-200/70 px-2 py-0.5 rounded-full tabular-nums">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close cart drawer"
            className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200/50 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-display text-lg font-bold text-stone-900">
                Your cart is empty
              </h3>
              <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                Discover our curated catalog of everyday essentials, high-end acoustics, and thoughtful design objects.
              </p>
              <button
                onClick={onContinueShopping}
                className="py-2.5 px-5 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors shadow-xs"
              >
                Start Browsing
              </button>
            </div>
          ) : (
            cartItems.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-4 p-3.5 rounded-xl border border-stone-200 bg-white hover:border-stone-300 transition-colors"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-100">
                  <SafeImage
                    src={product.image}
                    alt={product.name}
                    fallbackCategory={product.category}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(product.id)}
                        title="Remove item"
                        className="text-stone-400 hover:text-red-600 transition-colors p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-[11px] text-stone-500 uppercase tracking-wider">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Stepper */}
                    <div className="flex items-center border border-stone-300 rounded-md overflow-hidden bg-stone-50">
                      <button
                        onClick={() => onUpdateQuantity(product.id, -1)}
                        className="p-1 hover:bg-stone-200 text-stone-700 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-stone-900 tabular-nums min-w-[20px] text-center bg-white">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, 1)}
                        className="p-1 hover:bg-stone-200 text-stone-700 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Line Total */}
                    <div className="text-right">
                      <span className="text-xs font-bold text-stone-950 tabular-nums">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Summary */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-stone-50/80 space-y-4">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900 tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-stone-900 tabular-nums">
                  {shipping === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-200">
                <span>Total Amount</span>
                <span className="tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 bg-stone-950 hover:bg-stone-800 text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <button
                onClick={onContinueShopping}
                className="w-full py-2.5 px-4 text-center text-xs font-medium text-stone-600 hover:text-stone-950 transition-colors"
              >
                Continue Shopping
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
              <span>Safe & Secure Checkout · Encrypted Transaction</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
