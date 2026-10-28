import React from 'react';

export const Testimonials: React.FC = () => {
  const endorsements = [
    {
      quote:
        '“OjasNutra Liposomal Glutathione gummies solve patient compliance without gastric upset. The bioavailability profile is genuinely impressive for an over-the-counter formulation.”',
      author: 'Dr. Elena Vance, MD',
      title: 'Integrative Longevity Institute',
      initials: 'EV',
      colorClass: 'bg-[#005420]/10 text-[#005420]',
    },
    {
      quote:
        '“The Eye Care gummies with Lutein & Zeaxanthin completely resolved my evening dry eyes after 12-hour coding sprints. Plus zero sugar spikes is huge for my fasting tracking.”',
      author: 'Julian Thorne',
      title: 'Biotech Founder & Longevity Athlete',
      initials: 'JT',
      colorClass: 'bg-[#7a5900]/15 text-[#7a5900]',
    },
    {
      quote:
        '“The ACV gummies are delicious and genuinely ease evening bloating. They contain actual mother ferment without eroding tooth enamel like raw liquid vinegar does.”',
      author: 'Sophia Lin, CNS',
      title: 'Functional Nutrition Specialist',
      initials: 'SL',
      colorClass: 'bg-[#384d37]/10 text-[#384d37]',
    },
  ];

  return (
    <section className="w-full py-24 bg-[#f5fbf5] px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#005420] font-bold">
            Clinical &amp; Patron Endorsements
          </span>
          <h2 className="font-['Bodoni_Moda'] text-3xl sm:text-4xl text-[#171d1a] tracking-tight font-medium">
            Validated by Researchers &amp; Integrative Physicians
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {endorsements.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow border border-[#bfc9bc]/30"
            >
              <div className="space-y-4">
                <div className="flex text-[#7a5900] gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="text-sm text-[#171d1a] italic leading-relaxed">
                  {item.quote}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-[#bfc9bc]/20">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${item.colorClass}`}
                >
                  {item.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#171d1a]">{item.author}</p>
                  <p className="text-xs text-[#707a6e]">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
