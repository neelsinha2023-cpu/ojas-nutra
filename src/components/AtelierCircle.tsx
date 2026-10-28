import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

interface AtelierCircleProps {
  onJoinCircle: () => void;
  onHowItWorks: () => void;
}

export const AtelierCircle: React.FC<AtelierCircleProps> = ({
  onJoinCircle,
  onHowItWorks,
}) => {
  const { applyPromoCode } = useCart();
  const [joinedToast, setJoinedToast] = useState<string | null>(null);

  const handleJoin = () => {
    applyPromoCode('OJAS15');
    setJoinedToast('Welcome to The Ojas Circle! 15% Member Privilege applied.');
    onJoinCircle();
    setTimeout(() => setJoinedToast(null), 4000);
  };

  return (
    <section className="w-full pb-20 px-4 sm:px-8 bg-[#f5fbf5]" id="circle">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#08120c] via-[#102316] to-[#08120c] p-8 md:p-14 text-[#ecf2ed] shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/10">
          <div className="sq-field" />

          {/* Falling Petals Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {[...Array(14)].map((_, i) => (
              <span
                key={i}
                className="petal"
                style={{
                  width: `${10 + (i % 6) * 2}px`,
                  height: `${7 + (i % 5) * 1.5}px`,
                  left: `${(i * 7.5) % 100}%`,
                  animationDuration: `${5 + (i % 4)}s`,
                  animationDelay: `${(i * 0.4) % 3}s`,
                }}
              />
            ))}
          </div>

          {/* Content Left */}
          <div className="space-y-3 max-w-2xl relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ffdea3]/20 border border-[#ffdea3]/30 text-[#ffdea3] text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
              <span className="material-symbols-outlined text-sm">workspace_premium</span>
              <span>Private Atelier Membership</span>
            </div>

            <h2 className="font-['Bodoni_Moda'] text-3xl sm:text-4xl text-[#ecf2ed] tracking-tight font-medium">
              The Ojas Circle: Perpetual Vitality Reserved
            </h2>

            <p className="text-sm sm:text-base text-[#bfc9bc] leading-relaxed">
              Automatic recurring replenishment shipped direct from fresh micro-batches, priority concierge botanical consultation, and guaranteed harvest reserves. 15% ongoing member privilege.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-[#bfc9bc]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#ffdea3]">check_circle</span>
                Cancel anytime
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#ffdea3]">check_circle</span>
                Fresh monthly batches
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#ffdea3]">check_circle</span>
                15% Privilege Reserved
              </span>
            </div>

            {joinedToast && (
              <div className="mt-3 p-2.5 rounded-xl bg-[#a3f6aa]/20 border border-[#a3f6aa]/40 text-[#a3f6aa] text-xs font-medium animate-in fade-in">
                {joinedToast}
              </div>
            )}
          </div>

          {/* Actions Right */}
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <button
              onClick={handleJoin}
              className="px-8 py-4 rounded-full bg-[#ffdea3] text-[#261900] text-sm font-bold hover:bg-[#f6be40] transition-all shadow-[0_4px_20px_rgba(253,195,70,0.35)] hover:shadow-[0_6px_28px_rgba(253,195,70,0.5)] whitespace-nowrap text-center cursor-pointer"
            >
              Join The Circle
            </button>
            <button
              onClick={onHowItWorks}
              className="px-7 py-4 rounded-full bg-white/10 border border-white/15 text-[#ecf2ed] text-sm font-semibold hover:bg-white/20 transition-all whitespace-nowrap text-center backdrop-blur-md cursor-pointer"
            >
              How It Works
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
