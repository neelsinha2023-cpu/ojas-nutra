import React, { useEffect, useState } from 'react';

export const MetricsSection: React.FC = () => {
  const [biomarker, setBiomarker] = useState(0);
  const [purity, setPurity] = useState(0);
  const [ritualists, setRitualists] = useState(0);

  useEffect(() => {
    // Smooth initial countup
    const duration = 1800;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setBiomarker(parseFloat((81.9 * ease).toFixed(1)));
      setPurity(Math.floor(82 * ease));
      setRitualists(Math.floor(9887 * ease));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <section className="w-full bg-[#eff5ef] py-14 px-4 sm:px-8 border-y border-[#bfc9bc]/30" id="metrics">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1b6e32] animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-[#005420] font-bold">
              Cellular Autopilot Metrics
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-[#707a6e]">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-[#005420]">verified</span>
              ISO 17025 Certified
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-[#7a5900]">shield</span>
              Double-Blind Verifications
            </span>
          </div>
        </div>

        {/* 4 Notched Ticket Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Biomarker Lift */}
          <div className="notched-card p-6 rounded-2xl border border-[#005420]/25 shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
            <div className="flex items-center justify-between text-[#bfc9bc] mb-3">
              <span className="text-xs uppercase tracking-wider font-bold text-[#005420]">
                Biomarker Lift
              </span>
              <span className="material-symbols-outlined text-[#005420] text-xl group-hover:rotate-12 transition-transform">
                bolt
              </span>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="font-['Bodoni_Moda'] text-4xl text-[#171d1a] font-bold tracking-tight">
                {biomarker.toFixed(1)}
              </span>
              <span className="font-['Bodoni_Moda'] text-2xl text-[#171d1a] font-bold">%</span>
            </div>
            <p className="text-sm text-[#40493f] font-medium mt-1">
              Active Liposomal Delivery Matrix
            </p>
            <div className="mt-4 pt-3 border-t border-[#bfc9bc]/30 flex items-center justify-between text-xs">
              <span className="text-[#707a6e]">Absorption</span>
              <span className="text-[#005420] font-bold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-xs">trending_up</span> 4.8x Speed
              </span>
            </div>
          </div>

          {/* Card 2: Purity Protocol */}
          <div className="notched-card p-6 rounded-2xl border border-[#7a5900]/30 shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
            <div className="flex items-center justify-between text-[#bfc9bc] mb-3">
              <span className="text-xs uppercase tracking-wider font-bold text-[#7a5900]">
                Purity Protocol
              </span>
              <span className="material-symbols-outlined text-[#7a5900] text-xl group-hover:rotate-12 transition-transform">
                nest_eco_leaf
              </span>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="font-['Bodoni_Moda'] text-4xl text-[#171d1a] font-bold tracking-tight">
                {purity}
              </span>
              <span className="font-['Bodoni_Moda'] text-2xl text-[#171d1a] font-bold">%</span>
            </div>
            <p className="text-sm text-[#40493f] font-medium mt-1">
              Clean Botanical Extraction
            </p>
            <div className="mt-4 pt-3 border-t border-[#bfc9bc]/30 flex items-center justify-between text-xs">
              <span className="text-[#707a6e]">Contaminants</span>
              <span className="text-[#7a5900] font-bold">Zero Synthetics</span>
            </div>
          </div>

          {/* Card 3: Daily Ritualists */}
          <div className="notched-card p-6 rounded-2xl border border-[#005420]/25 shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
            <div className="flex items-center justify-between text-[#bfc9bc] mb-3">
              <span className="text-xs uppercase tracking-wider font-bold text-[#005420]">
                Daily Ritualists
              </span>
              <span
                className="material-symbols-outlined text-[#7a5900] text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="font-['Bodoni_Moda'] text-4xl text-[#171d1a] font-bold tracking-tight">
                {ritualists.toLocaleString()}
              </span>
              <span className="font-['Bodoni_Moda'] text-2xl text-[#171d1a] font-bold">+</span>
            </div>
            <p className="text-sm text-[#40493f] font-medium mt-1">
              Verified 5-Star Patrons
            </p>
            <div className="mt-4 pt-3 border-t border-[#bfc9bc]/30 flex items-center justify-between text-xs">
              <span className="text-[#707a6e]">Adherence</span>
              <span className="text-[#005420] font-bold">96.8% Renewal</span>
            </div>
          </div>

          {/* Card 4: Eco Regeneration */}
          <div className="notched-card p-6 rounded-2xl border border-[#384d37]/30 shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
            <div className="flex items-center justify-between text-[#bfc9bc] mb-3">
              <span className="text-xs uppercase tracking-wider font-bold text-[#384d37]">
                Eco Regeneration
              </span>
              <span className="material-symbols-outlined text-[#005420] text-xl group-hover:rotate-12 transition-transform">
                compost
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-['Bodoni_Moda'] text-4xl text-[#171d1a] font-bold tracking-tight">
                Net 0
              </span>
            </div>
            <p className="text-sm text-[#40493f] font-medium mt-1">
              Carbon-Negative Atelier
            </p>
            <div className="mt-4 pt-3 border-t border-[#bfc9bc]/30 flex items-center justify-between text-xs">
              <span className="text-[#707a6e]">Harvest Footprint</span>
              <span className="text-[#005420] font-bold">100% Recyclable</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
