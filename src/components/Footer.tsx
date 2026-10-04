import React from 'react';
import { ActivePage, ProductCategory } from '../types';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
  onSelectCategory: (category: ProductCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, onSelectCategory }) => {
  const handleNav = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryNav = (cat: ProductCategory) => {
    onSelectCategory(cat);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Info (4 cols) */}
          <div className="col-span-2 md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-stone-950 flex items-center justify-center font-display font-extrabold text-base">
                S
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                ShopSense
              </span>
            </div>

            <p className="text-stone-400 text-xs max-w-sm leading-relaxed">
              A modern e-commerce shopping experience for discovering products across electronics, fashion, beauty, home & lifestyle.
            </p>
          </div>

          {/* About & Corporate (2 cols) */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-bold">
              About
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                  About ShopSense
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                  Careers
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                  Press Releases
                </button>
              </li>
            </ul>
          </div>

          {/* Help & Support (3 cols) */}
          <div className="col-span-1 md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-bold">
              Help & Support
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-white transition-colors">
                  Shipping Information
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-white transition-colors">
                  Returns & Cancellations
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('cart')} className="hover:text-white transition-colors">
                  Track Orders
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                  Terms of Use
                </button>
              </li>
            </ul>
          </div>

          {/* Categories (3 cols) */}
          <div className="col-span-2 md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-bold">
              Categories
            </h4>
            <div className="grid grid-cols-2 gap-2 text-stone-400">
              {(['Electronics', 'Fashion', 'Beauty', 'Home & Living', 'Accessories', 'Mobiles', 'Appliances'] as const).map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryNav(cat as ProductCategory)}
                    className="text-left hover:text-white transition-colors py-0.5"
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} ShopSense. All rights reserved.</p>
          <div className="flex items-center gap-6 text-stone-400 text-[11px]">
            <span>Curated Product Selection</span>
            <span>·</span>
            <span>Secure Checkout Demo</span>
            <span>·</span>
            <span>Responsive Shopping Experience</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
