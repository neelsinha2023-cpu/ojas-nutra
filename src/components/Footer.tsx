import React, { useState } from 'react';
import { BRAND_ASSETS } from '../data/products';

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenPolicy: (type: 'privacy' | 'terms' | 'shipping' | 'quality') => void;
  onSelectProduct: (productId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPolicy,
  onSelectProduct,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="w-full bg-[#2c322e] text-[#ecf2ed] pt-16 pb-12 border-t border-white/10 relative z-20" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12 items-start">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {/* Brand SVG Mark */}
                <div className="relative flex items-center justify-center w-10 h-10">
                  <svg className="w-10 h-10" viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r="26" fill="none" stroke="#ffdea3" strokeWidth="1.8" opacity="0.8" />
                    <circle cx="20" cy="18" r="2.5" fill="#a3f6aa" />
                    <circle cx="40" cy="18" r="2.5" fill="#f6be40" />
                    <circle cx="30" cy="44" r="2.5" fill="#a3f6aa" />
                    <path
                      d="M30 38 C23 32, 21 21, 29 17 C29 25, 33 32, 30 38 Z"
                      fill="none"
                      stroke="#a3f6aa"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M30 38 C37 32, 39 21, 31 17 C31 25, 27 32, 30 38 Z"
                      fill="none"
                      stroke="#f6be40"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="flex items-center gap-2">
                  <img
                    src={BRAND_ASSETS.logo}
                    alt="OjasNutra"
                    className="h-7 w-auto object-contain"
                  />
                  <span className="font-['Bodoni_Moda'] text-xl text-white font-semibold">
                    OjasNutra
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#bfc9bc] max-w-sm leading-relaxed">
                High-potency clinical nutraceuticals grounded in Ayurvedic botanical alchemy. Formulated to elevate primordial vigor, cellular resilience, and radiant longevity.
              </p>
            </div>

            {/* Newsletter */}
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#f6be40] font-bold block">
                The Longevity Circle
              </span>
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-white/10 border border-white/15 rounded-full px-4 py-2.5 text-xs text-[#ecf2ed] placeholder-[#bfc9bc]/60 focus:outline-none focus:ring-1 focus:ring-[#f6be40]"
                />
                <button
                  type="submit"
                  className="rounded-full bg-[#1b6e32] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#005420] transition-colors flex items-center gap-1 shadow-md cursor-pointer whitespace-nowrap"
                >
                  Join
                </button>
              </form>
              {subscribed && (
                <p className="text-xs text-[#a3f6aa] animate-in fade-in">
                  Welcome! You are subscribed to Ojas Longevity Circle updates.
                </p>
              )}
            </div>
          </div>

          {/* Col 2: Formulas & Shop */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#f6be40] font-bold">
              Formulas &amp; Shop
            </h4>
            <ul className="space-y-2 text-xs text-[#bfc9bc]">
              <li>
                <button
                  onClick={() => onSelectProduct('sea-buckthorn-gummies')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Sea Buckthorn Gummies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectProduct('liposomal-glutathione-gummies')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Glutathione Gummies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectProduct('eye-care-gummies')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Eye Care Gummies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectProduct('apple-cider-vinegar-gummies')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Apple Cider Vinegar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ritual')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Circadian Loop Regimen
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Science & Transparency */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#f6be40] font-bold">
              Science &amp; Transparency
            </h4>
            <ul className="space-y-2 text-xs text-[#bfc9bc]">
              <li>
                <button
                  onClick={() => onNavigate('science')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Clinical Research &amp; Trials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('science')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Third-Party COA Archive
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('quality')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Sourcing &amp; Potency Standards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('chronicle')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Liposomal Delivery Physics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('shipping')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Cold-Chain Preservation
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Company & Care */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#f6be40] font-bold">
              Company &amp; Care
            </h4>
            <ul className="space-y-2 text-xs text-[#bfc9bc]">
              <li>
                <button
                  onClick={() => onNavigate('circle')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Our Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('science')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Atelier &amp; Laboratories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('shipping')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Shipping &amp; India Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact Concierge Desk
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & FSSAI Disclaimer */}
        <div className="pt-6 space-y-4 border-t border-white/10">
          <p className="text-[11px] text-[#bfc9bc]/80 leading-relaxed">
            *These statements have not been evaluated by the Food and Drug Administration / FSSAI. These products are nutraceutical food supplements and are not intended to diagnose, treat, cure, or prevent any disease. Individual results may vary. Consult your physician prior to starting any concentrated botanical regimen.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#bfc9bc] pt-2">
            <div>© 2025 OjasNutra Atelier Inc. All rights reserved. Clean Science. Radiant Life.</div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => onOpenPolicy('privacy')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => onOpenPolicy('terms')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Terms &amp; Conditions
              </button>
              <button
                onClick={() => onOpenPolicy('quality')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Quality Verifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
