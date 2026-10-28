import React from 'react';
import { BRAND_ASSETS } from '../data/products';

interface ScienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCOA: () => void;
}

export const ScienceModal: React.FC<ScienceModalProps> = ({
  isOpen,
  onClose,
  onOpenCOA,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#bfc9bc]/30 overflow-hidden z-10 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#0b1710] to-[#15291b] text-white flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-[#a3f6aa] font-bold block">
              Atelier Research &bull; Dehradun &amp; Z&uuml;rich
            </span>
            <h3 className="font-['Bodoni_Moda'] text-2xl font-semibold">
              The Cellular Liposomal Architecture
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#bfc9bc] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#40493f] leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#eff5ef] border border-[#bfc9bc]/30">
              <img
                src={BRAND_ASSETS.facilityImage}
                alt="Research Facility"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-3">
              <span className="font-bold text-[#005420] text-sm block">
                Why Standard Supplements Fail
              </span>
              <p>
                Up to 85% of oral Glutathione, Vitamin C, and herbal polyphenols are systematically degraded in the gastric environment by hydrochloric acid, pepsin, and bile salts before ever reaching your bloodstream.
              </p>
              <p>
                OjasNutra encapsulates pure standardized active botanicals inside <strong>bio-identical phospholipid nano-spheres</strong> derived from non-GMO sunflower phosphatidylcholine.
              </p>
            </div>
          </div>

          {/* 3 Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#eff5ef] border border-[#bfc9bc]/30 space-y-2">
              <span className="material-symbols-outlined text-[#005420] text-2xl">bubble_chart</span>
              <h4 className="font-bold text-sm text-[#171d1a]">1. Liposomal Bilayer</h4>
              <p className="text-[11px] text-[#40493f]">
                Shields delicate active molecules through acidic gastric transit, fusing directly with small-intestinal enterocyte membranes for 4.8x bioavailability.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#eff5ef] border border-[#bfc9bc]/30 space-y-2">
              <span className="material-symbols-outlined text-[#7a5900] text-2xl">ac_unit</span>
              <h4 className="font-bold text-sm text-[#171d1a]">2. Supercritical CO₂</h4>
              <p className="text-[11px] text-[#40493f]">
                Extracted at low temperatures without petroleum solvents like hexane or ethanol. Yields zero toxic residual solvents and 100% pure bioactive fractions.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#eff5ef] border border-[#bfc9bc]/30 space-y-2">
              <span className="material-symbols-outlined text-[#005420] text-2xl">verified_user</span>
              <h4 className="font-bold text-sm text-[#171d1a]">3. ISO 17025 Testing</h4>
              <p className="text-[11px] text-[#40493f]">
                Every single micro-batch is independently assayed by Eurofins and SGS for 5-tier contaminants: heavy metals, microbials, pesticides, and exact active milligrams.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#ffdea3]/20 border border-[#ffdea3]/40 flex items-center justify-between">
            <div>
              <span className="font-bold text-[#261900] text-xs block">
                Public Certificate of Analysis (COA) Transparency
              </span>
              <span className="text-[11px] text-[#5d4200]">
                Enter any batch stamp from your carton to inspect live third-party laboratory reports.
              </span>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenCOA();
              }}
              className="px-4 py-2 rounded-full bg-[#005420] text-white text-xs font-bold hover:bg-[#1b6e32] cursor-pointer whitespace-nowrap ml-4"
            >
              Verify Lot COA
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-[#f5fbf5] border-t border-[#bfc9bc]/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#005420] text-white text-xs font-bold hover:bg-[#1b6e32] cursor-pointer"
          >
            Close Science Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
