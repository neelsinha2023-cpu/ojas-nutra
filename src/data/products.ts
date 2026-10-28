import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'sea-buckthorn-gummies',
    name: 'Sea Buckthorn Gummies',
    tagline: 'Omega 7 & Radiant Cellular Glow',
    category: 'omega-glow',
    categoryLabel: 'OMEGA 7 & GLOW',
    badge: 'Formulation · 01',
    price: 799,
    originalPrice: 999,
    rating: 4.9,
    reviewCount: 312,
    description: 'Wild-harvested Himalayan Sea Buckthorn berries rich in rare Omega-7 fatty acids, carotenoids, and vitamin C. Formulated to ignite collagen synthesis, strengthen cellular membranes, and provide systemic mucous-membrane hydration and skin radiance.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKdOMN7grVTjCzcy0vSMT1PvSOPQueIQf4eJWkKvhKmfOqp73h0nACsyEstN7pr2AQDRW3Uai5Ui4qRVPaZrXLCv5N8ieITDguyTSNfdYo-KpXsWeFNi9PbGKJE2rjtr2jVH4pngQYnr7nG4mEeBE5mrICzhdeFKwnGG0S8CN6hHBm850nfBlrDCpE3dzXdeX_z3tYzqXxSB5IYPO1NM0KTEJ1nvcND6OqIs4U_Fz9Ho_DT-0CgZvjHQ',
    sugarFree: true,
    vegan: true,
    servings: 30,
    flavor: 'Himalayan Berry Tangerine',
    actives: [
      { name: 'Cold-Pressed Sea Buckthorn Pulp Extract', amount: '500 mg', standardization: 'Contains 32% Palmitoleic Acid (Omega-7)' },
      { name: 'Natural Liposomal Vitamin C (from Amla)', amount: '80 mg', standardization: '100% RDA bioactive ascorbic acid' },
      { name: 'Sunflower Phosphatidylcholine', amount: '120 mg', standardization: 'Purified non-GMO liposomal carrier' }
    ],
    benefits: [
      'Accelerates systemic dermal collagen synthesis',
      'Hydrates deep mucosal linings and relieves ocular dryness',
      'Potent mitochondrial antioxidant barrier against photo-aging',
      '100% pectin-based, gelatin-free, zero added sucrose'
    ],
    intakeTime: 'Morning or Early Afternoon with light hydration',
    circadianPhase: 'morning',
    batchNumber: '#OJ-2025-08',
    fssaiNumber: 'Lic. No. 10021064000124'
  },
  {
    id: 'liposomal-glutathione-gummies',
    name: 'Liposomal Glutathione',
    tagline: 'Mitochondrial ATP & Skin Vigor',
    category: 'master-antioxidant',
    categoryLabel: 'MASTER ANTIOXIDANT',
    badge: 'Flagship Actives',
    price: 799,
    originalPrice: 1099,
    rating: 5.0,
    reviewCount: 540,
    description: 'The master cellular antioxidant encapsulated inside nanoscopic phospholipid bilayer spheres to survive stomach acid intact. Directly fuels hepatic phase-2 detoxification, recharges intracellular ATP energy, and promotes luminous dermal clarity.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxJ3oeukiNLRQ46hFOAHvleFTu_nhDDSNT97YfZ3q_1nc1vijcD-L9RgZt2FsxqS2JV1ivduA38LgC0qcsliebNJoSR-as1LHAMvkwoKIgsA7eTnxA8jdY1YqPW8aovBtm51jYPPdYXJMjaergvh4kNBz6eGb-2wZnYOlqBeIzwiCVZaEWVw3p_BKfTNEBVEUxoy-6em-Lb94tuTRB-KKzwUzeWnRmElDEZm7ihYduOAZNEz4qups9ww',
    sugarFree: true,
    vegan: true,
    servings: 30,
    flavor: 'Alpine Wild Blueberry',
    actives: [
      { name: 'Setria® Pure Reduced L-Glutathione', amount: '250 mg', standardization: '99.4% Pharmaceutical HPLC Grade' },
      { name: 'Sunflower Phospholipid Liposomal Matrix', amount: '200 mg', standardization: 'Active Phosphatidylcholine carrier' },
      { name: 'Co-Enzyme Q10 (Ubiquinol)', amount: '30 mg', standardization: 'Cellular ATP activator' }
    ],
    benefits: [
      'Delivers intact glutathione past gastric enzymes for maximum absorption',
      'Accelerates neutralisation of oxidative free radicals and cellular wastes',
      'Promotes even melanin distribution and brightens skin tone',
      'No sulfuric aftertaste, zero sugar, diabetic-friendly formulation'
    ],
    intakeTime: '08:00 AM — First thing upon waking with warm water',
    circadianPhase: 'morning',
    batchNumber: '#OJ-2025-09',
    fssaiNumber: 'Lic. No. 10021064000124'
  },
  {
    id: 'eye-care-gummies',
    name: 'Eye Care Gummies',
    tagline: 'Blue Light Protection & Macula',
    category: 'vision-repair',
    categoryLabel: 'VISION & REPAIR',
    badge: 'Circadian Midday',
    price: 699,
    originalPrice: 899,
    rating: 4.8,
    reviewCount: 289,
    description: 'Scientifically calibrated 5:1 ratio of FloraGLO® Lutein to Zeaxanthin derived from Marigold flowers. Shields the retinal macular pigment from high-energy blue photons emitted by laptops and mobile screens, reducing visual strain and fatigue.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAewOT7a5RS11_f5umoA1OAC5xr8veQgrglvk3WQEZ7d-19oWsMyDCsxhTj_78Vp_hsCaA7jNCes3dUUdxpI_BSzLgq6iu5evFOSTD0Xx2IlE7oyG8RZlDiiMZP2bSAi3SHoN9rtIqm5ZXKGLb1yOEDv2GAGuKfsaOzcpQnYrFnYGTvksCgvr9JlGO6N0lZIpazmEKQNNFE2Bub_LqU0bakxE8DcaHUWWD07WBZOWmDLT7YbTsP_fxoPw',
    sugarFree: true,
    vegan: true,
    servings: 30,
    flavor: 'Valencia Blood Orange',
    actives: [
      { name: 'Free-Form Lutein (from Tagetes erecta)', amount: '10 mg', standardization: 'Clinically verified macular pigment density booster' },
      { name: 'Zeaxanthin Isomers', amount: '2 mg', standardization: '5:1 physiological gold standard ratio' },
      { name: 'Astaxanthin Microalgae Extract', amount: '2 mg', standardization: 'Haematococcus pluvialis supercritical extract' }
    ],
    benefits: [
      'Filters high-frequency 400–460nm digital blue light rays',
      'Alleviates ocular dryness, redness, and screen-induced headaches',
      'Supports contrast sensitivity and night vision restoration',
      'Non-GMO, vegan citrus pectin, naturally sweetened with stevia'
    ],
    intakeTime: '02:00 PM — Midday screen break to recharge macula',
    circadianPhase: 'midday',
    batchNumber: '#OJ-2025-10',
    fssaiNumber: 'Lic. No. 10021064000124'
  },
  {
    id: 'apple-cider-vinegar-gummies',
    name: 'Apple Cider Vinegar',
    tagline: 'Metabolic Balance & Digestion',
    category: 'metabolic-reset',
    categoryLabel: 'METABOLIC RESET',
    badge: 'Metabolic Loop',
    price: 699,
    originalPrice: 899,
    rating: 4.9,
    reviewCount: 415,
    description: 'Raw, unfiltered Himalayan Apple Cider Vinegar containing living ‘The Mother’ probiotic cultures. Formulated to blunt post-prandial glycemic spikes, soothe nighttime abdominal bloat, and support overnight cellular autophagy.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVo2pzhpmTG_jMhnyScpc_LUxqd_fCTGu--myGHr_5UyEj_TKCcTlhXRZQrY0z9V-BbfSgId9CIxoAkB_g3q_yITZcvG_4Zh9Imbj__QpU3s2Mlg__feoHAJpYvHtpy2hCpX6i0hJiAJ0ypxzKXYQ3tcZodw2a_-vHYBfGATLfDHEAJOj8KBngqOMDOGAspSaiJrejjMao-YI2Hur-uALaOpY5EjbG1e3rBrQ-L64FnONI_oWkBoD_ig',
    sugarFree: true,
    vegan: true,
    servings: 30,
    flavor: 'Crisp Orchard Apple & Cinnamon',
    actives: [
      { name: 'Organic Raw Himalayan ACV (with Mother)', amount: '500 mg', standardization: '5% Acetic Acid natural bio-ferment' },
      { name: 'Ceylon Cinnamon Bark Extract', amount: '50 mg', standardization: 'Water-soluble polyphenol type-A polymers' },
      { name: 'Chromium Picolinate', amount: '50 mcg', standardization: 'Essential trace mineral for insulin sensitivity' }
    ],
    benefits: [
      'Promotes gentle digestive motility without burning delicate tooth enamel',
      'Helps moderate post-meal blood sugar fluctuations and cravings',
      'Nurtures microbiome diversity with natural symbiotic prebiotic fibers',
      'Real organic apple juice essence, no harsh vinegary bite'
    ],
    intakeTime: '08:30 PM — Post-dinner to support overnight metabolic restoration',
    circadianPhase: 'evening',
    batchNumber: '#OJ-2025-11',
    fssaiNumber: 'Lic. No. 10021064000124'
  },
  {
    id: 'daily-synergy-trilogy',
    name: 'Daily Synergy Regimen Trilogy',
    tagline: 'The Complete Circadian Vitality Program',
    category: 'trilogy-bundle',
    categoryLabel: 'TRIO REGIMEN · SAVE 20%',
    badge: 'Atelier Recommendation',
    price: 1999,
    originalPrice: 2497,
    rating: 5.0,
    reviewCount: 184,
    description: 'The master 3-part circadian suite designed to harmonize your morning, afternoon, and evening biology. Includes full-sized bottles of Liposomal Glutathione (Morning), Eye Care Gummies (Midday), and Apple Cider Vinegar (Evening) with complimentary travel tins.',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1Wgz74jZle62WjZ7gWAJrtk4JU4Mbi8ZOqGGIevO6ecdTkmVPu_qjJlZDSDC-mCgciuUF5DsHi_KgiBF0y8nB--MlVSBvRcM0dUeNUDF4WCNAFEL6WSqENhqtN9ucasxDIn3NKat3gj1o7shLKpBQWQxIPRn0TslnLpsr5zsyEahFBG6YMuH82osV_i_bBEBB07kadle4KNG8M3UkdMi1b0kiP52OEQjuYfR9u0Y47YWSCfTflguILE0ck',
    sugarFree: true,
    vegan: true,
    servings: 90,
    flavor: 'Curated 3-Phase Botanical Flavors',
    actives: [
      { name: 'Full Liposomal Glutathione Supply (30 Days)', amount: '250 mg / serving', standardization: '99.4% Bioactive Liposomes' },
      { name: 'Full Eye Care FloraGLO Supply (30 Days)', amount: '10 mg Lutein + 2 mg Zeaxanthin', standardization: '5:1 Golden Ratio' },
      { name: 'Full Himalayan ACV Supply (30 Days)', amount: '500 mg with Mother', standardization: '5% Acetic Acid + Chromium' }
    ],
    benefits: [
      'Synchronizes with the natural 24-hour human circadian cycle',
      'Includes complimentary brass dose-keeper and lab certificate printouts',
      'Saves ₹498 compared to individual bottle purchase',
      'Qualifies for complimentary express priority shipping across India'
    ],
    intakeTime: 'Morning (08:00 AM) • Midday (02:00 PM) • Evening (08:30 PM)',
    circadianPhase: 'all-day',
    batchNumber: '#OJ-2025-08',
    fssaiNumber: 'Lic. No. 10021064000124'
  }
];

export const BRAND_ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6Sxcvt2ILsbSagpuwSdGXTauMYzf-XhKqLiQo33mCpvYsZhtp3t9j9lw1sp2CpDwSvxqjCyXlHHEWw2XGHCDIudf7UFuXk6HnORPnj63Y8lwsOf5nkrrmeVhxq5dFP8ntcjodQXyZn80-TMCSsEHar5i15FWqLJFPuAhSGKuIJreNlHcZaRAUGGoWBUI7zpTEN8r0KBc7gHx5HaOO4FOF-NfW8hSWMbrmptSWn2vO3gaZ6HgxKOBRVg',
  facilityImage: 'https://lh3.googleusercontent.com/aida/AEtjO1WPbAWRHbNuXpg2ATigGa31I_bK9pPU3RUdZWdpG_dkkHFDNwRrgVnI4nn6lzX3NjXDJt6uykrgsKKvtATPOH-NLW1JHkrGda94Q938ipSH3-cRv2F9Wpc5J9fDkqAzyuMM41i3Fs_D8sTl_YbawImPRzbX-dP4UUQneiGtQTyyu8w_DF6K3iqIgUHBu_nQIUgrUeFIe1OZ1fE46_vev0Hrr8q-nnNGZ_so2JDkFuBZkMR7fognOXLDtdRF',
  elixirImage: 'https://lh3.googleusercontent.com/aida/AEtjO1WTXU4SlXOE4Z3cpRCa7Vpj-6BOnOgU9T1yG1vpCYWiqsVMvMkxKx7ADgsDNyFL69t62ZbjaDWTSQB35c_WSyPYI46q2oHJah3SFZbLY9nSU8smdR-LO28yxEUsmq2SXSPUZb07hUqCexgrZ-gRYKbXLAAws1q43L2mSHestLQu3jF029uwKNV_cjvdY-bGQfZtU4_x6WRB54jzhsTUVlbCOVeamOSszk7NuEfPigKtglm2_d3tU9ghkrnE',
  amberGlass: 'https://lh3.googleusercontent.com/aida/AEtjO1VABNpFT44hGBunCCzLPb1XYwVCcg9kyZQx8nxXUNSI967P_9LqH3jVmnAQmB6z541gYLaex5iG2DFZ34XLEHG3J5rMCrbAM2-nsYH-07Urc73PtMdAtw_QyzoqbB9ZygsXmrlZWB4VUuJ0OcCIhdkmhhy1LrtCvwCcZoXUvACDOFiIUyDNyoonvP_WJKBU0lueuVLNAccUhBjFPqIuz3YBoQu6z-obPLKjmqRXnzSaTTK30E-wOO_aLVc',
  travertine: 'https://lh3.googleusercontent.com/aida/AEtjO1Wgz74jZle62WjZ7gWAJrtk4JU4Mbi8ZOqGGIevO6ecdTkmVPu_qjJlZDSDC-mCgciuUF5DsHi_KgiBF0y8nB--MlVSBvRcM0dUeNUDF4WCNAFEL6WSqENhqtN9ucasxDIn3NKat3gj1o7shLKpBQWQxIPRn0TslnLpsr5zsyEahFBG6YMuH82osV_i_bBEBB07kadle4KNG8M3UkdMi1b0kiP52OEQjuYfR9u0Y47YWSCfTflguILE0ck',
  previewScreenshot: '/public/assets/aistudio/Image_1_d6b066a2.png'
};
