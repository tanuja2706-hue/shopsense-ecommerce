import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, X, ChevronDown } from 'lucide-react';
import { ActivePage, ProductCategory } from '../types';

interface MarketplaceHeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onOpenCart: () => void;
}

const NAV_CATEGORIES: { label: string; value: ProductCategory }[] = [
  { label: 'For You', value: 'For You' },
  { label: 'Fashion', value: 'Fashion' },
  { label: 'Electronics', value: 'Electronics' },
  { label: 'Beauty', value: 'Beauty' },
  { label: 'Home & Living', value: 'Home & Living' },
  { label: 'Accessories', value: 'Accessories' },
  { label: 'Mobiles', value: 'Mobiles' },
  { label: 'Appliances', value: 'Appliances' },
];

export const MarketplaceHeader: React.FC<MarketplaceHeaderProps> = ({
  activePage,
  setActivePage,
  cartCount,
  wishlistCount,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  onSelectCategory,
  onOpenCart,
}) => {
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActivePage('shop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (cat: ProductCategory) => {
    onSelectCategory(cat);
    if (cat === 'For You') {
      setActivePage('home');
    } else {
      setActivePage('shop');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200/90 shadow-2xs transition-all">
      {/* First Row: Logo, Large Prominent Search, Wishlist, Cart, Account */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6 h-16 sm:h-18">
          
          {/* Logo */}
          <button
            onClick={() => {
              onSelectCategory('All');
              setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-left focus:outline-none shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-400 text-stone-950 flex items-center justify-center font-display font-extrabold text-lg sm:text-xl shadow-xs">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-stone-950 leading-tight">
                ShopSense
              </span>
              <span className="text-[10px] text-amber-700 font-semibold tracking-wider uppercase -mt-0.5 hidden xs:inline">
                Marketplace
              </span>
            </div>
          </button>

          {/* Prominent Search Bar (Real marketplace style like Flipkart reference) */}
          <div className="flex-1 max-w-2xl mx-1 sm:mx-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search for products, brands and more"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 sm:py-2.5 text-xs sm:text-sm bg-stone-50 hover:bg-stone-100/70 border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-all shadow-2xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Zone: Account, Wishlist, Cart */}
          <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
            {/* Account / User Menu */}
            <div className="relative">
              <button
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                className="flex items-center gap-1.5 py-1.5 px-2 sm:px-3 text-stone-800 hover:text-stone-950 hover:bg-stone-100 rounded-lg text-xs sm:text-sm font-semibold transition-colors"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-stone-700" />
                <span className="hidden md:inline">Account</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 hidden sm:inline" />
              </button>

              {accountDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white border border-stone-200 rounded-xl shadow-xl py-2 z-50 text-xs animate-in fade-in slide-in-from-top-2"
                  onClick={() => setAccountDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-stone-100">
                    <p className="font-bold text-stone-900">Welcome Customer</p>
                    <p className="text-[11px] text-stone-500">Sign in to manage orders</p>
                  </div>
                  <button
                    onClick={() => {
                      setActivePage('wishlist');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-stone-50 flex items-center gap-2 text-stone-700"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>My Wishlist ({wishlistCount})</span>
                  </button>
                  <button
                    onClick={onOpenCart}
                    className="w-full text-left px-4 py-2 hover:bg-stone-50 flex items-center gap-2 text-stone-700"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>My Cart ({cartCount})</span>
                  </button>
                  <button
                    onClick={() => {
                      setActivePage('shop');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-stone-50 flex items-center gap-2 text-stone-700"
                  >
                    <span>Browse All Products</span>
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <button
              onClick={() => {
                setActivePage('wishlist');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title="Saved Items"
              aria-label="Wishlist"
              className={`relative p-2 rounded-lg transition-colors ${
                activePage === 'wishlist'
                  ? 'bg-stone-100 text-stone-950'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-amber-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Icon & Button */}
            <button
              onClick={onOpenCart}
              title="Shopping Cart"
              aria-label="Cart"
              className="relative py-2 px-2.5 sm:px-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg transition-all flex items-center gap-2 shadow-xs active:scale-98"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-bold hidden sm:inline">Cart</span>
              <span className="min-w-[18px] h-[18px] px-1 bg-amber-400 text-stone-950 text-[11px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Second Row: Horizontal Product Categories (Marketplace Navigation Tabs) */}
      <div className="bg-white border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar py-2 text-xs sm:text-sm font-medium">
            {NAV_CATEGORIES.map((cat) => {
              const isActive =
                (cat.value === 'For You' && activePage === 'home') ||
                (activePage === 'shop' && selectedCategory === cat.value);

              return (
                <button
                  key={cat.label}
                  onClick={() => handleCategoryClick(cat.value)}
                  className={`relative py-1.5 px-3 rounded-md whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-stone-950 font-bold bg-stone-100 sm:bg-transparent'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-50'
                  }`}
                >
                  <span>{cat.label}</span>
                  {isActive && (
                    <span className="hidden sm:block absolute inset-x-2 -bottom-2 h-0.5 bg-stone-950 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
