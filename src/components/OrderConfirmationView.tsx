import React from 'react';
import { CheckCircle, Package, ArrowRight, Calendar, MapPin, Phone, Mail } from 'lucide-react';
import { PlacedOrder } from '../types';
import { SafeImage } from './SafeImage';

interface OrderConfirmationViewProps {
  order: PlacedOrder;
  onContinueShopping: () => void;
}

export const OrderConfirmationView: React.FC<OrderConfirmationViewProps> = ({
  order,
  onContinueShopping,
}) => {
  return (
    <div className="py-12 sm:py-16 max-w-3xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-md overflow-hidden">
        
        {/* Success Banner */}
        <div className="bg-stone-900 text-white p-8 sm:p-10 text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-400/30">
            <CheckCircle className="w-9 h-9" />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Order placed successfully!
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Thank you for shopping with ShopSense. Your order has been registered and is being prepared for fulfillment.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 bg-stone-800/90 px-4 py-2 rounded-xl text-xs border border-stone-700">
            <span className="text-stone-400">Order Number:</span>
            <span className="font-mono font-bold text-amber-300 tracking-wider text-sm">
              #{order.orderId}
            </span>
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-stone-100 text-xs">
            <div className="flex items-start gap-2.5 text-stone-600">
              <Calendar className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-stone-900 block">Date of Order</span>
                <span>{order.createdAt}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-stone-600">
              <Package className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-stone-900 block">Fulfillment Method</span>
                <span>
                  {order.customer.paymentMethod === 'cod'
                    ? 'Cash on Delivery'
                    : 'Standard Direct Dispatch'}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Shipping Address */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/70 space-y-2 text-xs">
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
              Delivery Destination
            </h4>
            <div className="text-stone-700 space-y-1">
              <p className="font-semibold text-stone-900">{order.customer.fullName}</p>
              <p className="flex items-center gap-1.5 text-stone-600">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>
                  {order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pinCode}
                </span>
              </p>
              <div className="flex flex-wrap gap-4 text-stone-500 pt-1">
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-stone-400" />
                  {order.customer.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-stone-400" />
                  {order.customer.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Purchased Items Summary */}
          <div className="space-y-3">
            <h4 className="font-bold text-stone-900 text-sm">
              Order Summary ({order.items.length} {order.items.length === 1 ? 'item' : 'items'})
            </h4>

            <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden">
              {order.items.map(({ product, quantity }) => (
                <div key={product.id} className="p-3.5 flex items-center gap-4 bg-white">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-100">
                    <SafeImage
                      src={product.image}
                      alt={product.name}
                      fallbackCategory={product.category}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-stone-900 text-xs sm:text-sm truncate">
                      {product.name}
                    </h5>
                    <span className="text-[11px] text-stone-500">
                      Qty: {quantity} · ${product.price.toFixed(2)} each
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-semibold text-stone-950 text-xs sm:text-sm tabular-nums">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="pt-2 border-t border-stone-100 space-y-2 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Items Subtotal</span>
              <span className="font-semibold text-stone-900 tabular-nums">
                ${order.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Delivery Fee</span>
              <span className="font-semibold text-stone-900 tabular-nums">
                {order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-stone-950 pt-3 border-t border-stone-200">
              <span>Total Amount Paid / Due</span>
              <span className="tabular-nums font-display text-xl text-stone-950">
                ${order.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Continue Shopping Button */}
          <div className="pt-4">
            <button
              onClick={onContinueShopping}
              className="w-full py-4 px-6 rounded-xl bg-stone-950 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
