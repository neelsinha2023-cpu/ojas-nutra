"use client";

import {
  motion,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface TunnelItem {
  id: string;
  src: string;
  title: string;
  sub: string;
  badge: string;
  price?: string;
  tag?: string;
}

const OJAS_TUNNEL_ITEMS: TunnelItem[] = [
  {
    id: "sea-buckthorn-gummies",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKdOMN7grVTjCzcy0vSMT1PvSOPQueIQf4eJWkKvhKmfOqp73h0nACsyEstN7pr2AQDRW3Uai5Ui4qRVPaZrXLCv5N8ieITDguyTSNfdYo-KpXsWeFNi9PbGKJE2rjtr2jVH4pngQYnr7nG4mEeBE5mrICzhdeFKwnGG0S8CN6hHBm850nfBlrDCpE3dzXdeX_z3tYzqXxSB5IYPO1NM0KTEJ1nvcND6OqIs4U_Fz9Ho_DT-0CgZvjHQ",
    title: "Sea Buckthorn Gummies",
    sub: "Omega 7 & Radiant Glow",
    badge: "Formulation · 01",
    price: "₹799",
    tag: "Sugar Free · Vegan"
  },
  {
    id: "liposomal-glutathione-gummies",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxJ3oeukiNLRQ46hFOAHvleFTu_nhDDSNT97YfZ3q_1nc1vijcD-L9RgZt2FsxqS2JV1ivduA38LgC0qcsliebNJoSR-as1LHAMvkwoKIgsA7eTnxA8jdY1YqPW8aovBtm51jYPPdYXJMjaergvh4kNBz6eGb-2wZnYOlqBeIzwiCVZaEWVw3p_BKfTNEBVEUxoy-6em-Lb94tuTRB-KKzwUzeWnRmElDEZm7ihYduOAZNEz4qups9ww",
    title: "Liposomal Glutathione",
    sub: "Mitochondrial ATP & Skin Vigor",
    badge: "Flagship Actives",
    price: "₹799",
    tag: "Master Antioxidant"
  },
  {
    id: "eye-care-gummies",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAewOT7a5RS11_f5umoA1OAC5xr8veQgrglvk3WQEZ7d-19oWsMyDCsxhTj_78Vp_hsCaA7jNCes3dUUdxpI_BSzLgq6iu5evFOSTD0Xx2IlE7oyG8RZlDiiMZP2bSAi3SHoN9rtIqm5ZXKGLb1yOEDv2GAGuKfsaOzcpQnYrFnYGTvksCgvr9JlGO6N0lZIpazmEKQNNFE2Bub_LqU0bakxE8DcaHUWWD07WBZOWmDLT7YbTsP_fxoPw",
    title: "Eye Care Gummies",
    sub: "Blue Light Protection & Macula",
    badge: "Circadian Midday",
    price: "₹699",
    tag: "Lutein + Zeaxanthin"
  },
  {
    id: "apple-cider-vinegar-gummies",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVo2pzhpmTG_jMhnyScpc_LUxqd_fCTGu--myGHr_5UyEj_TKCcTlhXRZQrY0z9V-BbfSgId9CIxoAkB_g3q_yITZcvG_4Zh9Imbj__QpU3s2Mlg__feoHAJpYvHtpy2hCpX6i0hJiAJ0ypxzKXYQ3tcZodw2a_-vHYBfGATLfDHEAJOj8KBngqOMDOGAspSaiJrejjMao-YI2Hur-uALaOpY5EjbG1e3rBrQ-L64FnONI_oWkBoD_ig",
    title: "Apple Cider Vinegar",
    sub: "Metabolic Balance & Digest",
    badge: "Metabolic Loop",
    price: "₹699",
    tag: "Mother Ferment Active"
  },
  {
    id: "facility",
    src: "https://lh3.googleusercontent.com/aida/AEtjO1WPbAWRHbNuXpg2ATigGa31I_bK9pPU3RUdZWdpG_dkkHFDNwRrgVnI4nn6lzX3NjXDJt6uykrgsKKvtATPOH-NLW1JHkrGda94Q938ipSH3-cRv2F9Wpc5J9fDkqAzyuMM41i3Fs_D8sTl_YbawImPRzbX-dP4UUQneiGtQTyyu8w_DF6K3iqIgUHBu_nQIUgrUeFIe1OZ1fE46_vev0Hrr8q-nnNGZ_so2JDkFuBZkMR7fognOXLDtdRF",
    title: "Supercritical CO₂ Lab",
    sub: "Zero Solvents · Pure Extracts",
    badge: "Atelier Science",
    price: "ISO 17025",
    tag: "High Purity"
  },
  {
    id: "cellular-elixirs",
    src: "https://lh3.googleusercontent.com/aida/AEtjO1WTXU4SlXOE4Z3cpRCa7Vpj-6BOnOgU9T1yG1vpCYWiqsVMvMkxKx7ADgsDNyFL69t62ZbjaDWTSQB35c_WSyPYI46q2oHJah3SFZbLY9nSU8smdR-LO28yxEUsmq2SXSPUZb07hUqCexgrZ-gRYKbXLAAws1q43L2mSHestLQu3jF029uwKNV_cjvdY-bGQfZtU4_x6WRB54jzhsTUVlbCOVeamOSszk7NuEfPigKtglm2_d3tU9ghkrnE",
    title: "Bioactive Infusions",
    sub: "High-Potency Longevity Drops",
    badge: "Cellular Elixirs",
    price: "Micro-Batch",
    tag: "Botanical Essence"
  },
  {
    id: "amber-glass",
    src: "https://lh3.googleusercontent.com/aida/AEtjO1VABNpFT44hGBunCCzLPb1XYwVCcg9kyZQx8nxXUNSI967P_9LqH3jVmnAQmB6z541gYLaex5iG2DFZ34XLEHG3J5rMCrbAM2-nsYH-07Urc73PtMdAtw_QyzoqbB9ZygsXmrlZWB4VUuJ0OcCIhdkmhhy1LrtCvwCcZoXUvACDOFiIUyDNyoonvP_WJKBU0lueuVLNAccUhBjFPqIuz3YBoQu6z-obPLKjmqRXnzSaTTK30E-wOO_aLVc",
    title: "Living Plant Extracts",
    sub: "UV-Shielded Active Molecules",
    badge: "Photoprotective",
    price: "Amber Glass",
    tag: "Bio-Protected"
  },
  {
    id: "daily-synergy-trilogy",
    src: "https://lh3.googleusercontent.com/aida/AEtjO1Wgz74jZle62WjZ7gWAJrtk4JU4Mbi8ZOqGGIevO6ecdTkmVPu_qjJlZDSDC-mCgciuUF5DsHi_KgiBF0y8nB--MlVSBvRcM0dUeNUDF4WCNAFEL6WSqENhqtN9ucasxDIn3NKat3gj1o7shLKpBQWQxIPRn0TslnLpsr5zsyEahFBG6YMuH82osV_i_bBEBB07kadle4KNG8M3UkdMi1b0kiP52OEQjuYfR9u0Y47YWSCfTflguILE0ck",
    title: "Daily Synergy Trilogy",
    sub: "Essential Cellular Foundation",
    badge: "Trio Regimen",
    price: "Daily Vital",
    tag: "3-Phase Protocol"
  }
];

interface TunnelCardData {
  item: TunnelItem;
  angleCos: number;
  angleSin: number;
  radiusFactorX: number;
  radiusFactorY: number;
  rotationZ: number;
  index: number;
}

const TUNNEL_CARDS: TunnelCardData[] = OJAS_TUNNEL_ITEMS.map((item, i) => {
  const goldenAngle = i * 137.5 * (Math.PI / 180);
  const radiusFactorX = 0.28 + (i % 3) * 0.08;
  const radiusFactorY = 0.26 + (i % 2) * 0.09;
  return {
    item,
    angleCos: Math.cos(goldenAngle),
    angleSin: Math.sin(goldenAngle),
    radiusFactorX,
    radiusFactorY,
    rotationZ: (i % 2 === 0 ? 1 : -1) * (2.5 + (i % 4) * 1.5),
    index: i,
  };
});

const SPRING_CONFIG = { stiffness: 60, damping: 25, mass: 0.5 };

interface StageDimensions {
  width: number;
  height: number;
  isMobile: boolean;
}

function useCameraParallax(enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, rawX, rawY]);

  return { x, y };
}

interface TunnelCardProps {
  card: TunnelCardData;
  progress: MotionValue<number>;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  total: number;
  stage: StageDimensions;
  onSelectProduct?: (productId: string) => void;
}

function TunnelCard({ card, progress, pointer, total, stage, onSelectProduct }: TunnelCardProps) {
  const staggerSpan = 0.55;
  const start = (card.index / total) * (1 - staggerSpan);
  const end = start + staggerSpan;
  const localProgress = useTransform(progress, [start, end], [0, 1]);
  const farZ = stage.isMobile ? -1300 : -1800;
  const nearZ = stage.isMobile ? 360 : 520;
  const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);
  const opacity = useTransform(localProgress, [0, 0.16, 0.84, 0.99], [0, 1, 1, 0]);

  const cardWidth = stage.isMobile
    ? Math.max(140, Math.min(200, stage.width * 0.42))
    : Math.max(200, Math.min(290, stage.width * 0.19));

  const baseX = card.angleCos * (stage.width * card.radiusFactorX);
  const baseY = card.angleSin * (stage.height * card.radiusFactorY);
  const panStrength = stage.isMobile ? 22 : 48;

  const transform = useTransform(
    [z, pointer.x, pointer.y],
    ([currZ, px, py]: number[]) => {
      const offsetX = baseX - px * panStrength;
      const offsetY = baseY - py * panStrength;
      return `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${currZ}px) rotateZ(${card.rotationZ}deg)`;
    }
  );

  return (
    <motion.div
      style={{
        width: cardWidth,
        transform,
        opacity,
        zIndex: card.index + 1,
      }}
      onClick={() => onSelectProduct?.(card.item.id)}
      className="pointer-events-auto absolute left-1/2 top-1/2 aspect-[4/5] will-change-transform select-none cursor-pointer group"
    >
      <div className="relative h-full w-full overflow-hidden rounded-3xl bg-[#0b1710]/90 backdrop-blur-xl p-4 shadow-2xl border border-[#ffdea3]/25 transition-all duration-500 hover:border-[#f6be40] hover:shadow-[0_0_35px_rgba(246,190,64,0.35)] flex flex-col justify-between">
        <div className="flex items-center justify-between z-10 text-[10px] font-bold">
          <span className="px-2 py-0.5 rounded-full bg-[#ffdea3]/20 text-[#ffdea3] uppercase tracking-wider">
            {card.item.badge}
          </span>
          {card.item.price && (
            <span className="text-[#a3f6aa] font-semibold">{card.item.price}</span>
          )}
        </div>

        <div className="relative w-full flex-1 my-2 overflow-hidden rounded-2xl bg-black/40 flex items-center justify-center p-2">
          <img
            src={card.item.src}
            alt={card.item.title}
            draggable={false}
            className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-108 drop-shadow-md"
          />
          {card.item.tag && (
            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[9px] text-[#a3f6aa] font-medium">
              {card.item.tag}
            </span>
          )}
        </div>

        <div className="z-10 pt-1">
          <h4 className="font-['Bodoni_Moda'] text-sm sm:text-base font-semibold text-[#ecf2ed] truncate group-hover:text-[#ffdea3] transition-colors">
            {card.item.title}
          </h4>
          <p className="text-[10px] text-[#bfc9bc] truncate">{card.item.sub}</p>
        </div>
      </div>
    </motion.div>
  );
}

interface PerspectiveTunnelHeroProps {
  onExploreClick?: () => void;
  onScienceClick?: () => void;
  onSelectProduct?: (productId: string) => void;
}

export default function PerspectiveTunnelHero({
  onExploreClick,
  onScienceClick,
  onSelectProduct,
}: PerspectiveTunnelHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<StageDimensions>({
    width: 1440,
    height: 900,
    isMobile: false,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setStage({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
      });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Raw motion value controlled directly by mouse wheel / touch trackpad
  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.0001,
  });

  // Handle wheel scrolling locally inside the viewport container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      // Smooth warp delta
      if (Math.abs(e.deltaY) > 5) {
        const current = rawProgress.get();
        const delta = e.deltaY * 0.0007;
        const next = Math.min(1, Math.max(0, current + delta));
        rawProgress.set(next);
      }
    };
    el.addEventListener("wheel", handleWheel, { passive: true });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [rawProgress]);

  const pointer = useCameraParallax(!reduce);
  const titleScale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1, 1.15]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.15, 0.82, 1], [0.9, 1, 0.9, 0.2]);

  const resetPerspective = () => {
    rawProgress.set(0);
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[92vh] h-[92vh] max-h-[980px] w-full overflow-hidden bg-gradient-to-b from-[#040906] via-[#08150d] to-[#0c1e13] text-[#ecf2ed] select-none flex items-center justify-center pt-16"
      style={{
        perspective: stage.isMobile ? "900px" : "1200px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Immersive Background Matrix & Atmospheric Glows */}
      <div className="sq-field opacity-60" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/4 h-[550px] w-[550px] rounded-full bg-[#1b6e32]/25 blur-[140px]" />
        <div className="absolute -bottom-24 right-1/4 h-[550px] w-[550px] rounded-full bg-[#ffdea3]/15 blur-[160px]" />
      </div>

      {/* Floating Ambient Glass Badges matching OjasNutra design */}
      <div className="absolute top-28 left-6 md:left-14 w-32 h-32 rounded-3xl glass rotate-12 drift-a pointer-events-none hidden sm:flex flex-col items-center justify-center text-center p-3 z-30">
        <span className="material-symbols-outlined text-[#ffdea3] text-2xl mb-1">eco</span>
        <span className="text-[9px] uppercase tracking-wider text-[#bfc9bc] font-bold">Cold Active</span>
        <span className="text-[11px] font-semibold text-[#ecf2ed] mt-0.5">Bio-Identical</span>
      </div>

      <div className="absolute bottom-24 right-8 md:right-16 w-36 h-36 rounded-3xl glass -rotate-6 drift-b pointer-events-none hidden md:flex flex-col items-center justify-center text-center p-3 z-30">
        <span className="font-['Bodoni_Moda'] text-2xl text-[#a3f6aa] font-bold">99.4%</span>
        <span className="text-[9px] text-[#bfc9bc] uppercase tracking-wider">Bioavailability</span>
        <span className="text-[10px] text-[#ffdea3] font-semibold mt-1">Liposomal Matrix</span>
      </div>

      {/* Depth Ring Guides */}
      <div className="pointer-events-none absolute h-[50vmin] w-[50vmin] rounded-full border border-[#a3f6aa]/15" />
      <div className="pointer-events-none absolute h-[78vmin] w-[78vmin] rounded-full border border-dashed border-[#ffdea3]/10" />

      {/* 3D Z-Space Corridor with Ojas Botanical Formulations */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transformStyle: "preserve-3d" }}
      >
        {TUNNEL_CARDS.map((card, i) => (
          <TunnelCard
            key={i}
            card={card}
            progress={smoothProgress}
            pointer={pointer}
            total={TUNNEL_CARDS.length}
            stage={stage}
            onSelectProduct={onSelectProduct}
          />
        ))}
      </div>

      {/* Central Anchor Typography & Action CTAs */}
      <motion.div
        style={{ scale: titleScale, opacity: titleOpacity }}
        className="pointer-events-auto relative z-20 flex flex-col items-center text-center px-6 max-w-4xl mx-auto"
      >
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-[#a3f6aa]/25 text-[#a3f6aa] text-xs font-semibold tracking-widest uppercase shadow-[0_0_20px_rgba(163,246,170,0.15)] mb-5">
          <span className="w-2 h-2 rounded-full bg-[#a3f6aa] animate-ping" />
          <span>Cellular Longevity · Into The Living Botanical Ether</span>
        </div>

        {/* Headline */}
        <h1 className="font-['Bodoni_Moda'] text-4xl sm:text-6xl lg:text-[70px] text-[#ecf2ed] tracking-tight leading-[1.08] mb-6 drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
          Warp Into <span className="italic font-normal text-[#ffdea3]">Cellular</span>
          <br className="hidden sm:inline" /> Longevity.
        </h1>

        {/* Sub-copy */}
        <p className="font-['Inter_Tight'] text-sm sm:text-lg text-[#bfc9bc] max-w-2xl font-light leading-relaxed mb-8 drop-shadow-md">
          Step through the living molecular corridor of bio-identical gummies, wild-harvested Himalayan polyphenols, and patented liposomal delivery.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreClick}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#ffdea3] text-[#261900] text-sm sm:text-base font-bold hover:bg-[#f6be40] transition-all shadow-[0_10px_30px_rgba(253,195,70,0.35)] hover:shadow-[0_14px_40px_rgba(253,195,70,0.5)] hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Explore Formulations</span>
            <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </button>

          <button
            onClick={onScienceClick}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-[#ecf2ed] text-sm sm:text-base font-medium hover:bg-white/20 transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#ffdea3] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              play_circle
            </span>
            <span>Discover Our Science</span>
          </button>
        </div>

        {/* Interactive Scroll / Warp Hint */}
        <div className="mt-8 flex items-center gap-3 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs text-[#bfc9bc] font-medium">
          <span className="material-symbols-outlined text-[#ffdea3] text-sm animate-bounce">mouse</span>
          <span>Scroll trackpad / mouse or drag to warp through 3D corridor</span>
          <span className="hidden sm:inline">•</span>
          <button
            onClick={resetPerspective}
            className="text-[#a3f6aa] hover:underline hidden sm:inline cursor-pointer"
          >
            Reset Perspective
          </button>
        </div>
      </motion.div>
    </div>
  );
}
