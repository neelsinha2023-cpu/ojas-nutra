/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PRODUCTS } from './data/products';
import { Product, Order } from './types';

import { Header } from './components/Header';
import PerspectiveTunnelHero from '../components/ui/perspective-tunnel-hero';
import { MetricsSection } from './components/MetricsSection';
import { CircadianRitualSection } from './components/CircadianRitualSection';
import { ProductGrid } from './components/ProductGrid';
import { ExtractionChronicle } from './components/ExtractionChronicle';
import { ScienceAndCOA } from './components/ScienceAndCOA';
import { Testimonials } from './components/Testimonials';
import { AtelierCircle } from './components/AtelierCircle';
import { Footer } from './components/Footer';

import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SearchDialog } from './components/SearchDialog';
import { AccountPortal } from './components/AccountPortal';
import { ScienceModal } from './components/ScienceModal';
import { PolicyModal } from './components/PolicyModal';

function MainStorefront() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [isOrderConfirmedOpen, setIsOrderConfirmedOpen] = useState(false);
  const [isScienceModalOpen, setIsScienceModalOpen] = useState(false);
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | 'shipping' | 'quality' | null>(null);

  const { recentNotification, clearNotification, setIsCartOpen } = useCart();
  const { setIsAuthModalOpen } = useAuth();

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  const selectedProduct = selectedProductId
    ? PRODUCTS.find((p) => p.id === selectedProductId) || null
    : null;

  const handleInspectBatchFromProduct = (batchNumber: string) => {
    handleNavigate('science');
    setTimeout(() => {
      const input = document.getElementById('batchCodeInput') as HTMLInputElement | null;
      if (input) {
        input.value = batchNumber;
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }, 400);
  };

  return (
    <div className="relative min-h-screen bg-[#f5fbf5] text-[#171d1a] overflow-x-hidden selection:bg-[#ffdea3] selection:text-[#261900]">
      {/* Toast Notification for quick add to cart */}
      {recentNotification && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#0c1810]/95 text-white shadow-2xl border border-[#a3f6aa]/30 backdrop-blur-xl flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <span className="material-symbols-outlined text-[#a3f6aa] text-xl">check_circle</span>
          <span className="text-xs font-semibold">{recentNotification}</span>
          <button
            onClick={() => {
              clearNotification();
              setIsCartOpen(true);
            }}
            className="px-3 py-1 rounded-full bg-[#ffdea3] text-[#261900] text-xs font-bold hover:bg-[#f6be40] ml-2 cursor-pointer"
          >
            View Cart
          </button>
          <button
            onClick={clearNotification}
            className="text-[#bfc9bc] hover:text-white ml-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Header */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Body */}
      <main className="w-full pt-16">
        {/* 1. Perspective Tunnel Hero */}
        <div id="home">
          <PerspectiveTunnelHero
            onExploreClick={() => handleNavigate('shop')}
            onScienceClick={() => setIsScienceModalOpen(true)}
            onSelectProduct={(productId) => {
              if (PRODUCTS.some((p) => p.id === productId)) {
                setSelectedProductId(productId);
              } else {
                handleNavigate('shop');
              }
            }}
          />
        </div>

        {/* 2. Autopilot Metrics */}
        <MetricsSection />

        {/* 3. Circadian Daily Ritual Loop */}
        <CircadianRitualSection
          onSelectProduct={(productId) => setSelectedProductId(productId)}
        />

        {/* 4. Core Bento Collection Showcase */}
        <ProductGrid
          onSelectProduct={(productId) => setSelectedProductId(productId)}
        />

        {/* 5. The Extraction Chronicle Progression */}
        <ExtractionChronicle
          onOpenScienceModal={() => setIsScienceModalOpen(true)}
        />

        {/* 6. Science & Genuine Certificate of Analysis (COA) Verifier */}
        <ScienceAndCOA
          onOpenScienceModal={() => setIsScienceModalOpen(true)}
        />

        {/* 7. Clinical & Patron Testimonials */}
        <Testimonials />

        {/* 8. The Ojas Circle Membership */}
        <AtelierCircle
          onJoinCircle={() => setIsCartOpen(true)}
          onHowItWorks={() => setPolicyType('quality')}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPolicy={(type) => setPolicyType(type)}
        onSelectProduct={(id) => setSelectedProductId(id)}
      />

      {/* Interactive Modals and Drawers */}
      <CartDrawer
        onCheckout={() => setIsCheckoutOpen(true)}
        onSelectProduct={(id) => setSelectedProductId(id)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={(order) => {
          setLastPlacedOrder(order);
          setIsOrderConfirmedOpen(true);
        }}
      />

      <OrderConfirmationModal
        isOpen={isOrderConfirmedOpen}
        order={lastPlacedOrder}
        onClose={() => setIsOrderConfirmedOpen(false)}
        onViewAccount={() => setIsAuthModalOpen(true)}
      />

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProductId}
        onClose={() => setSelectedProductId(null)}
        onInspectBatch={handleInspectBatchFromProduct}
      />

      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(id) => setSelectedProductId(id)}
      />

      <AccountPortal
        onSelectProduct={(id) => setSelectedProductId(id)}
      />

      <ScienceModal
        isOpen={isScienceModalOpen}
        onClose={() => setIsScienceModalOpen(false)}
        onOpenCOA={() => handleNavigate('science')}
      />

      <PolicyModal
        type={policyType}
        isOpen={!!policyType}
        onClose={() => setPolicyType(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainStorefront />
      </CartProvider>
    </AuthProvider>
  );
}
