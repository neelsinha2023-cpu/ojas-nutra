import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { BRAND_ASSETS } from '../data/products';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  onOpenSearch,
}) => {
  const { totalQuantity, setIsCartOpen } = useCart();
  const { user, setIsAuthModalOpen } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'ritual', label: 'Daily Ritual' },
    { id: 'science', label: 'Our Science' },
    { id: 'circle', label: 'Atelier & Circle' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* 0. Top Announcement Bar */}
      <div className="w-full bg-[#1b261e]/98 backdrop-blur-md text-[#ecf2ed] py-2 px-4 sm:px-8 text-center text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest flex items-center justify-center gap-2 border-b border-white/5">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#f6be40] animate-pulse" />
        <span>Complimentary Climate-Neutral Shipping on Orders Above ₹750 • 100% Lab Verified Liposomal Purity</span>
      </div>

      {/* Main Glass Nav Header */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#0c1810]/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-b border-[#bfc9bc]/30 py-3'
            : 'bg-[#f5fbf5]/85 backdrop-blur-lg border-b border-[#bfc9bc]/20 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
          {/* Logo Brand Block */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="relative flex items-center justify-center h-11 w-auto">
              <img
                src={BRAND_ASSETS.logo}
                alt="OjasNutra Official Brand Logo"
                className="h-9 sm:h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="hidden sm:flex flex-col border-l border-[#bfc9bc]/40 pl-3">
              <span className="font-['Bodoni_Moda'] text-lg sm:text-[21px] font-semibold tracking-tight text-[#171d1a] group-hover:text-[#005420] transition-colors leading-tight">
                OjasNutra
              </span>
              <span className="text-[9px] text-[#005420] tracking-widest uppercase font-bold">
                Cellular Botanical Alchemy
              </span>
            </div>
          </button>

          {/* Desktop Navigation with Active Pill */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-[#e9efea]/80 px-4 py-1.5 rounded-full border border-[#bfc9bc]/40 shadow-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs sm:text-sm font-medium transition-all py-1.5 px-4 rounded-full cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#005420] font-bold shadow-sm'
                      : 'text-[#40493f] hover:text-[#171d1a] hover:bg-white/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Header Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Search Formulations"
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#40493f] hover:text-[#171d1a] hover:bg-[#e9efea] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">search</span>
            </button>

            {/* Account / Portal Button */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              aria-label="Customer Portal"
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#40493f] hover:text-[#171d1a] hover:bg-[#e9efea] transition-colors cursor-pointer"
              title={user ? `Signed in as ${user.name}` : 'Sign In'}
            >
              <span className="material-symbols-outlined text-xl">account_circle</span>
            </button>

            {/* Shopping Cart Button with Real Counter */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#40493f] hover:text-[#171d1a] hover:bg-[#e9efea] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">shopping_bag</span>
              {totalQuantity > 0 && (
                <span className="absolute top-1 right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-[#7a5900] text-white text-[10px] font-bold shadow-[0_0_8px_rgba(253,195,70,0.6)] animate-in zoom-in-50">
                  {totalQuantity}
                </span>
              )}
            </button>

            {/* User Initials Avatar */}
            <div className="pl-1 hidden sm:block">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#1b6e32]/15 text-[#005420] font-bold text-xs border border-[#005420]/20 hover:bg-[#1b6e32]/25 transition-colors cursor-pointer"
              >
                {user ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'OJ'}
              </button>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-[#40493f] hover:text-[#171d1a] hover:bg-[#e9efea] cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden px-4 pt-3 pb-6 bg-[#f5fbf5] border-t border-[#bfc9bc]/30 shadow-xl space-y-2 animate-in slide-in-from-top-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                  activeSection === item.id
                    ? 'bg-[#005420] text-white'
                    : 'text-[#171d1a] hover:bg-[#e9efea]'
                }`}
              >
                <span>{item.label}</span>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            ))}

            <div className="pt-3 border-t border-[#bfc9bc]/30 flex items-center justify-between text-xs text-[#40493f] px-2">
              <span>{user ? `Signed in as ${user.name}` : 'Welcome Guest'}</span>
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="text-[#005420] font-bold hover:underline"
              >
                {user ? 'My Atelier Account' : 'Sign In'}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
