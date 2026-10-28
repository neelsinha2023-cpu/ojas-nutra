import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface CircadianRitualSectionProps {
  onSelectProduct: (productId: string) => void;
}

export const CircadianRitualSection: React.FC<CircadianRitualSectionProps> = ({
  onSelectProduct,
}) => {
  const [activePanel, setActivePanel] = useState<number>(1);
  const { addToCart } = useCart();

  const glutathione = PRODUCTS.find((p) => p.id === 'liposomal-glutathione-gummies')!;
  const eyeCare = PRODUCTS.find((p) => p.id === 'eye-care-gummies')!;
  const acv = PRODUCTS.find((p) => p.id === 'apple-cider-vinegar-gummies')!;

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <section className="w-full py-24 bg-[#f5fbf5] px-4 sm:px-8" id="ritual">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#005420]/10 text-[#005420] text-xs uppercase tracking-wider font-bold">
              <span className="material-symbols-outlined text-sm">cycle</span>
              Interactive Circadian Loop
            </div>
            <h2 className="font-['Bodoni_Moda'] text-3xl sm:text-4xl text-[#171d1a] tracking-tight font-medium">
              The Ojas Daily Ritual: From Intake to Cellular Vitality
            </h2>
            <p className="text-base text-[#40493f] max-w-2xl font-light">
              Hover across the circadian phases to inspect how our bio-identical gummies synchronize with your biological clock.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#005420] font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#005420] animate-pulse" />
            Interactive 3-Phase Loop
          </div>
        </div>

        {/* 3 Horizontal Expandable Panels */}
        <div className="flex flex-col lg:flex-row gap-5 min-h-[520px] w-full">
          {/* PANEL 1: Morning Glutathione */}
          <div
            onClick={() => setActivePanel(1)}
            onMouseEnter={() => setActivePanel(1)}
            className={`rounded-3xl p-7 lg:p-8 bg-gradient-to-br from-[#0b1710] to-[#15291b] text-[#ecf2ed] cursor-pointer relative overflow-hidden flex flex-col justify-between shadow-xl border border-[#a3f6aa]/20 transition-all duration-500 ${
              activePanel === 1 ? 'lg:flex-[2.4] ring-2 ring-[#a3f6aa]/40' : 'lg:flex-[0.8] opacity-85 hover:opacity-100'
            }`}
          >
            {/* Watermark Giant Number */}
            <span className="absolute -bottom-8 -right-4 font-['Bodoni_Moda'] text-[160px] lg:text-[210px] font-bold text-[#a3f6aa]/10 select-none pointer-events-none leading-none">
              01
            </span>

            {/* Header info */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-[#ffdea3]/20 border border-[#ffdea3]/40 flex items-center justify-center text-[#ffdea3] font-bold text-sm">
                  01
                </span>
                <span className="text-xs uppercase tracking-widest text-[#ffdea3] font-bold">
                  Morning Ingestion • 08:00 AM
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm transition-colors ${
                  activePanel === 1
                    ? 'bg-[#ffdea3] text-[#261900]'
                    : 'bg-white/10 text-[#ecf2ed] backdrop-blur-sm'
                }`}
              >
                {activePanel === 1 ? 'Active Phase' : 'Explore Phase'}
              </span>
            </div>

            {/* Content for Active vs Collapsed */}
            {activePanel === 1 ? (
              <div className="relative z-10 my-auto py-4 max-w-xl animate-in fade-in duration-300">
                <h3 className="font-['Bodoni_Moda'] text-2xl lg:text-3xl text-[#ecf2ed] font-semibold mb-3">
                  Liposomal Glutathione &amp; Cellular Awakening
                </h3>
                <p className="text-sm lg:text-base text-[#bfc9bc] leading-relaxed">
                  Kickstart your morning cellular defense. Our sugar-free Liposomal Glutathione gummy delivers high-potency antioxidant protection directly to your bloodstream, neutralizing overnight oxidative stress, brightening skin vitality, and energizing mitochondrial ATP synthesis.
                </p>

                {/* Floating Product Mini Card */}
                <div className="mt-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-wrap items-center justify-between gap-4">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct('liposomal-glutathione-gummies');
                    }}
                    className="flex items-center gap-3 group/item cursor-pointer"
                  >
                    <img
                      src={glutathione.image}
                      alt="Liposomal Glutathione Gummies"
                      className="w-14 h-14 object-contain drop-shadow transition-transform group-hover/item:scale-105"
                    />
                    <div>
                      <p className="text-sm font-bold text-[#ecf2ed] group-hover/item:text-[#ffdea3] transition-colors">
                        Liposomal Glutathione Gummies
                      </p>
                      <p className="text-xs text-[#bfc9bc]">Sugar Free • Blueberry • ₹799</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleQuickAdd(e, glutathione)}
                    className="px-4 py-2 rounded-full bg-[#ffdea3] text-[#261900] text-xs font-bold hover:bg-[#f6be40] transition-colors whitespace-nowrap shadow-sm cursor-pointer"
                  >
                    Take Morning Dose • ₹799
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative z-10 my-auto py-8">
                <h3 className="font-['Bodoni_Moda'] text-2xl text-[#ecf2ed] font-semibold">
                  Liposomal Glutathione
                </h3>
                <p className="text-xs text-[#bfc9bc] mt-1">Cellular Awakening &amp; Radiant Vigor</p>
              </div>
            )}

            {/* Footer Bar */}
            <div className="relative z-10 flex items-center justify-between text-xs text-[#bfc9bc] pt-3 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#a3f6aa]">verified</span>
                Cellular Detox &amp; Radiant Vigor
              </span>
              <span className="font-bold text-[#a3f6aa]">Phase 1 / 3</span>
            </div>
          </div>

          {/* PANEL 2: Midday Eye Care */}
          <div
            onClick={() => setActivePanel(2)}
            onMouseEnter={() => setActivePanel(2)}
            className={`rounded-3xl p-7 lg:p-8 bg-gradient-to-br from-[#181a11] to-[#252716] text-[#ecf2ed] cursor-pointer relative overflow-hidden flex flex-col justify-between shadow-xl border border-[#ffdea3]/20 transition-all duration-500 ${
              activePanel === 2 ? 'lg:flex-[2.4] ring-2 ring-[#ffdea3]/40' : 'lg:flex-[0.8] opacity-85 hover:opacity-100'
            }`}
          >
            <span className="absolute -bottom-8 -right-4 font-['Bodoni_Moda'] text-[160px] lg:text-[210px] font-bold text-[#ffdea3]/10 select-none pointer-events-none leading-none">
              02
            </span>

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-[#ffdea3]/20 border border-[#ffdea3]/40 flex items-center justify-center text-[#ffdea3] font-bold text-sm">
                  02
                </span>
                <span className="text-xs uppercase tracking-widest text-[#ffdea3] font-bold">
                  Midday Focus • 02:00 PM
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm transition-colors ${
                  activePanel === 2
                    ? 'bg-[#ffdea3] text-[#261900]'
                    : 'bg-white/10 text-[#ecf2ed] backdrop-blur-sm'
                }`}
              >
                {activePanel === 2 ? 'Active Phase' : 'Explore Phase'}
              </span>
            </div>

            {activePanel === 2 ? (
              <div className="relative z-10 my-auto py-4 max-w-xl animate-in fade-in duration-300">
                <h3 className="font-['Bodoni_Moda'] text-2xl lg:text-3xl text-[#ecf2ed] font-semibold mb-3">
                  Eye Care &amp; Blue Light Filtering
                </h3>
                <p className="text-sm lg:text-base text-[#bfc9bc] leading-relaxed">
                  Neutralize digital screen exhaustion and midday fatigue. Concentrated carotenoids Lutein and Zeaxanthin concentrate in the macular pigment, creating a biological filter against high-energy blue photon wavelengths while protecting photoreceptor integrity.
                </p>

                <div className="mt-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-wrap items-center justify-between gap-4">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct('eye-care-gummies');
                    }}
                    className="flex items-center gap-3 group/item cursor-pointer"
                  >
                    <img
                      src={eyeCare.image}
                      alt="Eye Care Gummies"
                      className="w-14 h-14 object-contain drop-shadow transition-transform group-hover/item:scale-105"
                    />
                    <div>
                      <p className="text-sm font-bold text-[#ecf2ed] group-hover/item:text-[#ffdea3] transition-colors">
                        Eye Care Gummies
                      </p>
                      <p className="text-xs text-[#bfc9bc]">Lutein + Zeaxanthin • ₹699</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleQuickAdd(e, eyeCare)}
                    className="px-4 py-2 rounded-full bg-[#ffdea3] text-[#261900] text-xs font-bold hover:bg-[#f6be40] transition-colors whitespace-nowrap shadow-sm cursor-pointer"
                  >
                    Take Midday Dose • ₹699
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative z-10 my-auto py-8">
                <h3 className="font-['Bodoni_Moda'] text-2xl text-[#ecf2ed] font-semibold">
                  Eye Care Gummies
                </h3>
                <p className="text-xs text-[#bfc9bc] mt-1">Lutein &amp; Blue Light Filtering</p>
              </div>
            )}

            <div className="relative z-10 flex items-center justify-between text-xs text-[#bfc9bc] pt-3 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#ffdea3]">visibility</span>
                Macular Shield &amp; Neural Calm
              </span>
              <span className="font-bold text-[#ffdea3]">Phase 2 / 3</span>
            </div>
          </div>

          {/* PANEL 3: Evening ACV */}
          <div
            onClick={() => setActivePanel(3)}
            onMouseEnter={() => setActivePanel(3)}
            className={`rounded-3xl p-7 lg:p-8 bg-gradient-to-br from-[#1a1114] to-[#2d181e] text-[#ecf2ed] cursor-pointer relative overflow-hidden flex flex-col justify-between shadow-xl border border-[#ffdad6]/20 transition-all duration-500 ${
              activePanel === 3 ? 'lg:flex-[2.4] ring-2 ring-[#ffdad6]/40' : 'lg:flex-[0.8] opacity-85 hover:opacity-100'
            }`}
          >
            <span className="absolute -bottom-8 -right-4 font-['Bodoni_Moda'] text-[160px] lg:text-[210px] font-bold text-[#ffdad6]/10 select-none pointer-events-none leading-none">
              03
            </span>

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-[#ffdea3]/20 border border-[#ffdea3]/40 flex items-center justify-center text-[#ffdea3] font-bold text-sm">
                  03
                </span>
                <span className="text-xs uppercase tracking-widest text-[#ffdea3] font-bold">
                  Evening Metabolism • 08:30 PM
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm transition-colors ${
                  activePanel === 3
                    ? 'bg-[#ffdea3] text-[#261900]'
                    : 'bg-white/10 text-[#ecf2ed] backdrop-blur-sm'
                }`}
              >
                {activePanel === 3 ? 'Active Phase' : 'Explore Phase'}
              </span>
            </div>

            {activePanel === 3 ? (
              <div className="relative z-10 my-auto py-4 max-w-xl animate-in fade-in duration-300">
                <h3 className="font-['Bodoni_Moda'] text-2xl lg:text-3xl text-[#ecf2ed] font-semibold mb-3">
                  Apple Cider Vinegar Metabolic Balance
                </h3>
                <p className="text-sm lg:text-base text-[#bfc9bc] leading-relaxed">
                  Stabilize post-dinner glycemic response and nurture overnight metabolic fasting. Formulated with authentic mother enzymes to soothe digestion, lower fasting triglycerides, and promote restorative regenerative rest without synthetic stimulants.
                </p>

                <div className="mt-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-wrap items-center justify-between gap-4">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct('apple-cider-vinegar-gummies');
                    }}
                    className="flex items-center gap-3 group/item cursor-pointer"
                  >
                    <img
                      src={acv.image}
                      alt="Apple Cider Vinegar Gummies"
                      className="w-14 h-14 object-contain drop-shadow transition-transform group-hover/item:scale-105"
                    />
                    <div>
                      <p className="text-sm font-bold text-[#ecf2ed] group-hover/item:text-[#ffdea3] transition-colors">
                        Apple Cider Vinegar Gummies
                      </p>
                      <p className="text-xs text-[#bfc9bc]">With Mother Ferment • ₹699</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleQuickAdd(e, acv)}
                    className="px-4 py-2 rounded-full bg-[#ffdea3] text-[#261900] text-xs font-bold hover:bg-[#f6be40] transition-colors whitespace-nowrap shadow-sm cursor-pointer"
                  >
                    Take Evening Dose • ₹699
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative z-10 my-auto py-8">
                <h3 className="font-['Bodoni_Moda'] text-2xl text-[#ecf2ed] font-semibold">
                  Apple Cider Vinegar
                </h3>
                <p className="text-xs text-[#bfc9bc] mt-1">Metabolic Equilibrium &amp; Digest</p>
              </div>
            )}

            <div className="relative z-10 flex items-center justify-between text-xs text-[#bfc9bc] pt-3 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#ffdad6]">nutrition</span>
                Digestive Equilibrium &amp; Repair
              </span>
              <span className="font-bold text-[#ffdad6]">Phase 3 / 3</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
