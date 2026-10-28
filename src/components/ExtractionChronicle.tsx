import React from 'react';

interface ExtractionChronicleProps {
  onOpenScienceModal: () => void;
}

export const ExtractionChronicle: React.FC<ExtractionChronicleProps> = ({
  onOpenScienceModal,
}) => {
  const steps = [
    {
      step: '01',
      title: 'High-Altitude Foraging',
      text: 'Harvested at peak solar solstice above 11,000 feet in pristine Himalayan micro-climates where plants synthesize protective polyphenols.',
      icon: 'terrain',
      badge: 'Wild Harvested',
    },
    {
      step: '02',
      title: 'Supercritical CO₂ Extraction',
      text: 'Never boiled or exposed to neurotoxic hexanes or ethanol. Pressurized clean CO₂ leaves 100% active compounds pure and solvent-free.',
      icon: 'ac_unit',
      badge: 'Zero Solvents',
    },
    {
      step: '03',
      title: 'Liposomal Nano-Spheres',
      text: 'Active botanicals are wrapped in protective sunflower phosphatidylcholine spheres, surviving stomach acid to deliver actives intact to cell walls.',
      icon: 'bubble_chart',
      badge: '4.8x Bioavailability',
    },
    {
      step: '04',
      title: 'Triple Blind Verification',
      text: 'Every production lot is cross-tested by independent accredited laboratories for heavy metals, microbials, pesticides, and exact active percentages.',
      icon: 'fact_check',
      badge: 'Open Public COA',
    },
  ];

  return (
    <section className="w-full py-24 bg-[#f5fbf5] px-4 sm:px-8" id="chronicle">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#005420] font-bold">
            The Extraction Chronicle
          </span>
          <h2 className="font-['Bodoni_Moda'] text-3xl sm:text-4xl text-[#171d1a] tracking-tight font-medium">
            From Mountain Canopy to Cellular Absorption
          </h2>
          <p className="text-base text-[#40493f] leading-relaxed font-light">
            Standard botanicals degrade by up to 78% during high-heat processing. Here is how our certified cold-chain alchemy preserves alive biophotons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#eff5ef] rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6 hover:-translate-y-1 transition-all border border-[#bfc9bc]/30 group hover:border-[#1b6e32]/40 hover:shadow-md"
            >
              <div className="space-y-4">
                <span className="font-['Bodoni_Moda'] text-2xl text-[#7a5900] font-bold">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-[#171d1a] group-hover:text-[#005420] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#40493f] leading-relaxed">
                  {item.text}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#bfc9bc]/20 text-[#005420] text-xs uppercase font-bold tracking-wider">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">{item.icon}</span>
                  <span>{item.badge}</span>
                </span>
                <button
                  onClick={onOpenScienceModal}
                  className="text-[10px] text-[#707a6e] hover:text-[#005420] underline cursor-pointer"
                >
                  Inspect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
