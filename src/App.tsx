/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DEMO_PRODUCTS } from './data/products';
import { ActivePage, CartItem, PlacedOrder, Product, ProductCategory } from './types';
import { MarketplaceHeader } from './components/MarketplaceHeader';
import { CategoryShortcuts } from './components/CategoryShortcuts';
import { PromotionalBannerCarousel } from './components/PromotionalBannerCarousel';
import { DealsOfTheDay } from './components/DealsOfTheDay';
import { ShopByCategory } from './components/ShopByCategory';
import { TrendingGrid } from './components/TrendingGrid';
import { PopularPicksSection } from './components/PopularPicksSection';
import { ShopView } from './components/ShopView';
import { WishlistView } from './components/WishlistView';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutView } from './components/CheckoutView';
import { OrderConfirmationView } from './components/OrderConfirmationView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SafeImage } from './components/SafeImage';
import { Footer } from './components/Footer';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart State (Persisted)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('shopsense_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [
      {
        product: DEMO_PRODUCTS[0],
        quantity: 1,
      },
    ];
  });

  // Wishlist State (Persisted)
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('shopsense_wishlist');
      if (saved) return new Set(JSON.parse(saved));
    } catch {
      // Fallback
    }
    return new Set(['prod-fa-1', 'prod-hl-1', 'prod-mo-1']);
  });

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shopsense_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [cartItems]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'shopsense_wishlist',
        JSON.stringify(Array.from(wishlistIds))
      );
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [wishlistIds]);

  // Toast feedback helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}"${product.name}" to cart`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        showToast(`Removed from wishlist`);
      } else {
        next.add(product.id);
        showToast(`Saved to wishlist`);
      }
      return next;
    });
  };

  const handleRemoveFromWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      next.delete(product.id);
      return next;
    });
    showToast(`Removed from wishlist`);
  };

  const handleMoveToCart = (product: Product) => {
    handleAddToCart(product, 1);
    handleRemoveFromWishlist(product);
  };

  // Category navigation
  const handleSelectCategory = (category: ProductCategory) => {
    setSelectedCategory(category);
    if (category === 'For You') {
      setActivePage('home');
    } else {
      setActivePage('shop');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Order placement
  const handlePlaceOrder = (order: PlacedOrder) => {
    setPlacedOrder(order);
    setCartItems([]);
    setActivePage('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered lists for Marketplace Home Flow
  const dealsProducts = DEMO_PRODUCTS.filter(
    (p) => p.isDealOfTheDay || (p.originalPrice && p.originalPrice > p.price)
  );
  const trendingProducts = DEMO_PRODUCTS.filter((p) => p.isTrending);
  const popularProducts = DEMO_PRODUCTS.filter((p) => p.isPopular || p.rating >= 4.8);
  const wishlistProducts = DEMO_PRODUCTS.filter((p) => wishlistIds.has(p.id));

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F2F4] text-stone-900 selection:bg-amber-200 selection:text-stone-950 font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-950 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl border border-stone-800 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {toastMessage}
        </div>
      )}

      {/* 1. TOP HEADER (Row 1: Logo + Prominent Search + Wishlist/Cart/Account; Row 2: Category Bar) */}
      <MarketplaceHeader
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.size}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        onOpenCart={() => setCartDrawerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activePage === 'home' && (
          <div className="space-y-2 sm:space-y-3 pb-8">
            
            {/* 2. CATEGORY SHORTCUTS (Circular / Rounded-Square Icons) */}
            <CategoryShortcuts onSelectCategory={handleSelectCategory} />

            {/* 3. PROMOTIONAL BANNER CAROUSEL (3 Original ShopSense Banners) */}
            <PromotionalBannerCarousel onSelectCategory={handleSelectCategory} />

            {/* 4. DEALS OF THE DAY (Horizontal Product Carousel) */}
            <DealsOfTheDay
              products={dealsProducts}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
              onViewDetails={(p) => setSelectedProduct(p)}
              onViewAllClick={() => {
                setSelectedCategory('All');
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 5. SHOP BY CATEGORY (Attractive Category Department Cards) */}
            <ShopByCategory onSelectCategory={handleSelectCategory} />

            {/* 6. TRENDING PRODUCTS (4-Column Desktop Product Grid) */}
            <TrendingGrid
              products={trendingProducts}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
              onViewDetails={(p) => setSelectedProduct(p)}
              onViewAllClick={() => {
                setSelectedCategory('All');
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 7. POPULAR PICKS (Horizontal Product Carousel / Grid) */}
            <PopularPicksSection
              products={popularProducts}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
              onViewDetails={(p) => setSelectedProduct(p)}
              onViewAllClick={() => {
                setSelectedCategory('All');
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {activePage === 'shop' && (
          <ShopView
            products={DEMO_PRODUCTS}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onViewDetails={(p) => setSelectedProduct(p)}
          />
        )}

        {activePage === 'wishlist' && (
          <WishlistView
            wishlistProducts={wishlistProducts}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onMoveToCart={handleMoveToCart}
            onViewDetails={(p) => setSelectedProduct(p)}
            onExploreProducts={() => {
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activePage === 'cart' && (
          <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-950 mb-6 pb-4 border-b border-stone-200">
              Shopping Cart
            </h1>
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-2xs">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-stone-500 text-sm mb-4">Your cart is currently empty.</p>
                  <button
                    onClick={() => setActivePage('shop')}
                    className="py-2.5 px-6 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="divide-y divide-stone-100">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="py-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-100">
                            <SafeImage
                              src={item.product.image}
                              alt={item.product.name}
                              fallbackCategory={item.product.category}
                              containerClassName="w-full h-full"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-stone-900">{item.product.name}</h4>
                            <span className="text-xs text-stone-500">${item.product.price.toFixed(2)} each</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden">
                            <button
                              onClick={() => handleUpdateQuantity(item.product.id, -1)}
                              className="px-2.5 py-1 text-sm text-stone-600 hover:bg-stone-100"
                            >
                              -
                            </button>
                            <span className="px-3 text-xs font-bold tabular-nums">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.product.id, 1)}
                              className="px-2.5 py-1 text-sm text-stone-600 hover:bg-stone-100"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-bold text-sm tabular-nums text-stone-950 min-w-[70px] text-right">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => handleRemoveFromCart(item.product.id)}
                            className="text-stone-400 hover:text-red-600 text-xs ml-2"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      onClick={() => setActivePage('shop')}
                      className="text-xs font-semibold text-stone-600 hover:text-stone-950 underline underline-offset-2"
                    >
                      ← Continue Shopping
                    </button>
                    <button
                      onClick={() => setActivePage('checkout')}
                      className="w-full sm:w-auto py-3 px-8 bg-stone-950 text-white rounded-xl font-bold text-xs hover:bg-stone-800 shadow-md"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activePage === 'checkout' && (
          <CheckoutView
            cartItems={cartItems}
            onPlaceOrder={handlePlaceOrder}
            onBackToCart={() => setCartDrawerOpen(true)}
            onBackToShop={() => setActivePage('shop')}
          />
        )}

        {activePage === 'confirmation' && placedOrder && (
          <OrderConfirmationView
            order={placedOrder}
            onContinueShopping={() => {
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Cart Drawer Slide-out */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setCartDrawerOpen(false);
          setActivePage('checkout');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onContinueShopping={() => {
          setCartDrawerOpen(false);
          setActivePage('shop');
        }}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        isInWishlist={selectedProduct ? wishlistIds.has(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Marketplace Footer */}
      <Footer
        setActivePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={handleSelectCategory}
      />

    </div>
  );
}
