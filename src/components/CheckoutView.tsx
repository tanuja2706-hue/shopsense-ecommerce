import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, CheckCircle2, ShoppingBag } from 'lucide-react';
import { CartItem, CheckoutFormData, PlacedOrder } from '../types';
import { SafeImage } from './SafeImage';

interface CheckoutViewProps {
  cartItems: CartItem[];
  onPlaceOrder: (order: PlacedOrder) => void;
  onBackToCart: () => void;
  onBackToShop: () => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cartItems,
  onPlaceOrder,
  onBackToCart,
  onBackToShop,
}) => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: 'Alex Vance',
    email: 'alex.vance@example.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace, Suite 402',
    city: 'Springfield',
    state: 'OR',
    pinCode: '97477',
    paymentMethod: 'cod',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@'))
      newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pinCode.trim()) newErrors.pinCode = 'PIN/Postal code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Generate clean demo order ID
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      const newOrder: PlacedOrder = {
        orderId: `SS-${randomNum}`,
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        items: [...cartItems],
        subtotal,
        shipping,
        totalAmount: total,
        customer: formData,
      };

      onPlaceOrder(newOrder);
      setIsSubmitting(false);
    }, 700);
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-16 text-center max-w-md mx-auto px-4">
        <h2 className="text-xl font-bold text-stone-900 mb-2">No items to checkout</h2>
        <p className="text-xs text-stone-500 mb-6">
          Your shopping cart is currently empty. Add items from the shop to proceed.
        </p>
        <button
          onClick={onBackToShop}
          className="py-2.5 px-6 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back button & Breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBackToCart}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shopping Cart</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-stone-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>SSL 256-Bit Encrypted Checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Customer & Delivery Details Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs">
          <div className="pb-6 border-b border-stone-100">
            <h1 className="font-display text-2xl font-bold text-stone-950">
              Shipping & Contact Details
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Please enter your delivery information to complete your order.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 pt-6">
            
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                1. Customer Contact
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 text-xs bg-stone-50 border rounded-lg focus:bg-white focus:outline-none transition-colors ${
                      errors.fullName ? 'border-red-500' : 'border-stone-200 focus:border-stone-900'
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-red-500 mt-1 block">{errors.fullName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 text-xs bg-stone-50 border rounded-lg focus:bg-white focus:outline-none transition-colors ${
                      errors.email ? 'border-red-500' : 'border-stone-200 focus:border-stone-900'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[11px] text-red-500 mt-1 block">{errors.email}</span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 text-xs bg-stone-50 border rounded-lg focus:bg-white focus:outline-none transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-stone-200 focus:border-stone-900'
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-[11px] text-red-500 mt-1 block">{errors.phone}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                2. Shipping Address
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 text-xs bg-stone-50 border rounded-lg focus:bg-white focus:outline-none transition-colors ${
                      errors.address ? 'border-red-500' : 'border-stone-200 focus:border-stone-900'
                    }`}
                  />
                  {errors.address && (
                    <span className="text-[11px] text-red-500 mt-1 block">{errors.address}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 text-xs bg-stone-50 border rounded-lg focus:bg-white focus:outline-none transition-colors ${
                        errors.city ? 'border-red-500' : 'border-stone-200 focus:border-stone-900'
                      }`}
                    />
                    {errors.city && (
                      <span className="text-[11px] text-red-500 mt-1 block">{errors.city}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      State / Region *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 text-xs bg-stone-50 border rounded-lg focus:bg-white focus:outline-none transition-colors ${
                        errors.state ? 'border-red-500' : 'border-stone-200 focus:border-stone-900'
                      }`}
                    />
                    {errors.state && (
                      <span className="text-[11px] text-red-500 mt-1 block">{errors.state}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      PIN / Postal Code *
                    </label>
                    <input
                      type="text"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 text-xs bg-stone-50 border rounded-lg focus:bg-white focus:outline-none transition-colors ${
                        errors.pinCode ? 'border-red-500' : 'border-stone-200 focus:border-stone-900'
                      }`}
                    />
                    {errors.pinCode && (
                      <span className="text-[11px] text-red-500 mt-1 block">{errors.pinCode}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Option */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  3. Payment Method
                </h3>
                <span className="text-[11px] font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-sm">
                  Select Payment Option
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label
                  className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'border-stone-950 bg-stone-50/80 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData((p) => ({ ...p, paymentMethod: 'cod' }))}
                    className="mt-0.5 accent-stone-950"
                  />
                  <div>
                    <span className="font-semibold text-stone-900 block">Cash on Delivery</span>
                    <span className="text-[11px] text-stone-500">
                      Pay with cash or card upon product arrival.
                    </span>
                  </div>
                </label>

                <label
                  className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    formData.paymentMethod === 'card'
                      ? 'border-stone-950 bg-stone-50/80 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData((p) => ({ ...p, paymentMethod: 'card' }))}
                    className="mt-0.5 accent-stone-950"
                  />
                  <div>
                    <span className="font-semibold text-stone-900 block">Credit / Debit Card</span>
                    <span className="text-[11px] text-stone-500">
                      Safe instant authorization.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-stone-950 hover:bg-stone-800 text-white font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-amber-300" />
                    <span>Place Order (${total.toFixed(2)})</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-center text-stone-400 mt-2">
                Your order is secured by industry standard SSL transaction protection.
              </p>
            </div>

          </form>
        </div>

        {/* Right Column: Order Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 sticky top-28 shadow-xs space-y-6">
            <div className="pb-4 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                <ShoppingBag className="w-4 h-4 text-amber-700" />
                <span>Order Summary</span>
              </div>
              <span className="text-xs text-stone-500 tabular-nums font-semibold">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
              </span>
            </div>

            {/* Cart Items Preview List */}
            <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-3 text-xs">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-100">
                    <SafeImage
                      src={product.image}
                      alt={product.name}
                      fallbackCategory={product.category}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-stone-900 truncate">
                      {product.name}
                    </h5>
                    <span className="text-[11px] text-stone-500">
                      Qty: {quantity} × ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <span className="font-bold text-stone-950 tabular-nums">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="pt-4 border-t border-stone-100 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Items Subtotal</span>
                <span className="font-semibold text-stone-900 tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span className="font-semibold text-stone-900 tabular-nums">
                  {shipping === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Estimated Taxes</span>
                <span className="font-semibold text-stone-900 tabular-nums">$0.00</span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-950 pt-3 border-t border-stone-200">
                <span>Total Due</span>
                <span className="tabular-nums font-display text-lg text-stone-950">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Quality Note */}
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/60 text-[11px] text-stone-600 space-y-1">
              <span className="font-bold text-stone-900 block">ShopSense Assurance</span>
              <p className="leading-relaxed">
                Enjoy 30-day effortless return policies and insured direct fulfillment on all catalog orders.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
