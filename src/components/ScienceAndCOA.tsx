import React, { useState } from 'react';
import { BRAND_ASSETS } from '../data/products';
import { lookupBatchCOA } from '../data/coaDatabase';
import { BatchCOA } from '../types';

interface ScienceAndCOAProps {
  onOpenScienceModal: () => void;
}

export const ScienceAndCOA: React.FC<ScienceAndCOAProps> = ({
  onOpenScienceModal,
}) => {
  const [batchCode, setBatchCode] = useState<string>('#OJ-2025-08');
  const [searchResult, setSearchResult] = useState<{
    searched: boolean;
    data: BatchCOA | null;
    query: string;
  }>({
    searched: false,
    data: null,
    query: '',
  });
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!batchCode.trim()) return;

    setIsVerifying(true);
    setTimeout(() => {
      const result = lookupBatchCOA(batchCode);
      setSearchResult({
        searched: true,
        data: result,
        query: batchCode.trim(),
      });
      setIsVerifying(false);
    }, 450);
  };

  return (
    <section
      className="w-full py-24 bg-white px-4 sm:px-8 border-t border-[#bfc9bc]/30"
      id="science"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Research Facility Graphic */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] bg-[#eff5ef]">
              <img
                src={BRAND_ASSETS.facilityImage}
                alt="OjasNutra Clinical Herbal Research Atelier"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c322e]/75 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-widest text-[#ffdea3] font-bold block mb-1">
                  Atelier Research Facility • Zürich &amp; Dehradun
                </span>
                <p className="text-sm sm:text-base font-medium">
                  Where ancient Ayurvedic palm manuscripts meet high-resolution liquid chromatography.
                </p>
                <button
                  onClick={onOpenScienceModal}
                  className="mt-3 text-xs font-semibold text-[#a3f6aa] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Extraction Technologies</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Float ISO Badge */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 hidden sm:flex items-center gap-3 p-4 rounded-2xl bg-white shadow-2xl border border-[#bfc9bc]/30 text-[#171d1a]">
              <span className="material-symbols-outlined text-[#005420] text-3xl">
                verified_user
              </span>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#707a6e] block">
                  Protocol Standard
                </span>
                <span className="text-sm sm:text-base font-bold text-[#171d1a]">
                  ISO 17025 Certified
                </span>
              </div>
            </div>
          </div>

          {/* Right: Scientific Rigor & Genuine COA Lookup */}
          <div className="lg:col-span-6 space-y-7">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#005420] font-bold">
                Uncompromising Science
              </span>
              <h2 className="font-['Bodoni_Moda'] text-3xl sm:text-4xl text-[#171d1a] tracking-tight font-medium">
                A New Standard in Transparent Nutraceutical Truth
              </h2>
              <p className="text-base text-[#40493f] font-light leading-relaxed">
                We reject proprietary blends that conceal under-dosed actives. Every formulation discloses exact active mg potencies with publicly auditable batch certificates.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#eff5ef] border border-[#bfc9bc]/30">
                <span className="material-symbols-outlined text-[#005420] text-xl mt-0.5">
                  menu_book
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-[#171d1a]">
                    Clinically Calibrated Dosages
                  </h4>
                  <p className="text-xs text-[#40493f]">
                    We match the exact milligram thresholds verified in double-blind placebo trials.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#eff5ef] border border-[#bfc9bc]/30">
                <span className="material-symbols-outlined text-[#005420] text-xl mt-0.5">
                  biotech
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-[#171d1a]">
                    Independent 5-Tier Contaminant Profiling
                  </h4>
                  <p className="text-xs text-[#40493f]">
                    Zero arsenic, lead, microplastics, or glyphosates. Tested down to parts-per-billion.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Genuine COA Batch Search */}
            <div className="p-6 rounded-2xl bg-[#eff5ef] border border-[#bfc9bc]/40 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-[#171d1a]" htmlFor="batchCodeInput">
                  Inspect Your Batch Certificate (COA)
                </label>
                <span className="text-[10px] text-[#005420] uppercase font-bold tracking-wider">
                  Live Public Registry
                </span>
              </div>

              <form onSubmit={handleVerify} className="flex items-center gap-2">
                <input
                  id="batchCodeInput"
                  type="text"
                  value={batchCode}
                  onChange={(e) => setBatchCode(e.target.value)}
                  placeholder="e.g. #OJ-2025-08"
                  className="flex-1 bg-white px-4 py-3 rounded-full text-sm font-medium text-[#171d1a] focus:outline-none focus:ring-2 focus:ring-[#005420] shadow-sm border border-[#bfc9bc]/40"
                />
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="px-6 py-3 rounded-full bg-[#005420] text-white text-sm font-semibold hover:bg-[#1b6e32] transition-colors shadow-sm flex items-center gap-1.5 whitespace-nowrap cursor-pointer disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-lg">
                    {isVerifying ? 'sync' : 'search'}
                  </span>
                  <span>{isVerifying ? 'Verifying...' : 'Verify'}</span>
                </button>
              </form>

              <div className="flex flex-wrap gap-2 text-[11px] text-[#707a6e]">
                <span>Sample verified lots:</span>
                {['#OJ-2025-08', '#OJ-2025-09', '#OJ-2025-10', '#OJ-2025-11'].map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => {
                      setBatchCode(code);
                      const result = lookupBatchCOA(code);
                      setSearchResult({ searched: true, data: result, query: code });
                    }}
                    className="underline text-[#005420] hover:text-[#1b6e32] cursor-pointer"
                  >
                    {code}
                  </button>
                ))}
              </div>

              {/* Genuine Search Results State */}
              {searchResult.searched && (
                <div className="mt-4 pt-4 border-t border-[#bfc9bc]/40 animate-in fade-in duration-300">
                  {searchResult.data ? (
                    <div className="p-4 rounded-xl bg-white border border-[#005420]/30 shadow-xs space-y-2 text-xs">
                      <div className="flex items-center justify-between pb-2 border-b border-[#bfc9bc]/20">
                        <span className="font-bold text-[#005420] flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm text-[#005420]">
                            verified
                          </span>
                          Batch {searchResult.data.batchNumber} Verified
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#a3f6aa]/30 text-[#005420] font-bold text-[10px]">
                          ISO 17025 Passed
                        </span>
                      </div>
                      <p className="font-semibold text-[#171d1a]">{searchResult.data.productName}</p>
                      <div className="grid grid-cols-2 gap-2 text-[#40493f] pt-1">
                        <div>
                          <span className="text-[#707a6e] block">Analytical Lab:</span>
                          <span className="font-medium text-[#171d1a]">{searchResult.data.laboratory}</span>
                        </div>
                        <div>
                          <span className="text-[#707a6e] block">Tested Potency:</span>
                          <span className="font-medium text-[#005420]">{searchResult.data.testedPotency}</span>
                        </div>
                        <div>
                          <span className="text-[#707a6e] block">Heavy Metals:</span>
                          <span className="font-medium text-[#171d1a]">{searchResult.data.heavyMetals.status} (Lead &lt;0.010 mg/kg)</span>
                        </div>
                        <div>
                          <span className="text-[#707a6e] block">Microbials:</span>
                          <span className="font-medium text-[#171d1a]">{searchResult.data.microbiological.status} (E.coli &amp; Salmonella Negative)</span>
                        </div>
                      </div>
                      <div className="pt-2 flex items-center justify-between text-[11px] text-[#707a6e]">
                        <span>Sample ID: {searchResult.data.sampleId}</span>
                        <span>Mfd: {searchResult.data.mfgDate}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-[#ffdad6]/40 border border-[#ba1a1a]/30 text-xs space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-[#ba1a1a]">
                        <span className="material-symbols-outlined text-base">info</span>
                        <span>Certificate Not Found for "{searchResult.query}"</span>
                      </div>
                      <p className="text-[#40493f]">
                        No verified analytical certificate currently matches this batch stamp in our public NABL laboratory registry.
                      </p>
                      <p className="text-[11px] text-[#707a6e]">
                        Please inspect the 8-digit stamp on the bottom carton flap, or contact our Atelier Concierge with your lot code for manual verification.
                      </p>
                    </div>
                  )}
                </div>
              )}

              <p className="text-[11px] text-[#707a6e]">
                *Enter the 8-digit stamp found at the packaging carton of any OjasNutra gummy formulation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
