import React from 'react';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | 'shipping' | 'quality' | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  type,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !type) return null;

  const contentMap = {
    privacy: {
      title: 'Privacy Policy & Data Protection',
      subtitle: 'Indian Digital Personal Data Protection (DPDP) Compliance',
      body: (
        <div className="space-y-4 text-xs text-[#40493f] leading-relaxed">
          <p>
            OjasNutra Atelier Inc. is committed to the protection of customer and patron personal data under the Digital Personal Data Protection Act (DPDPA) and applicable IT rules in India.
          </p>
          <h4 className="font-bold text-sm text-[#171d1a]">1. Information We Collect</h4>
          <p>
            We collect personal information such as full name, shipping address, mobile telephone number, and email address solely for order fulfillment, cold-chain shipment delivery, and Certificate of Analysis tracking.
          </p>
          <h4 className="font-bold text-sm text-[#171d1a]">2. Payment Information Security</h4>
          <p>
            Payment transactions are processed through RBI-authorized payment aggregators using 256-bit PCI-DSS encryption. OjasNutra never stores raw credit/debit card numbers or UPI MPINs on our servers.
          </p>
          <h4 className="font-bold text-sm text-[#171d1a]">3. Data Retention &amp; Rights</h4>
          <p>
            You have the right to request access to, correction of, or deletion of your personal records from our patron registry at any time by contacting privacy@ojasnutra.com.
          </p>
        </div>
      ),
    },
    terms: {
      title: 'Terms of Service & Nutraceutical Disclaimers',
      subtitle: 'Food Safety and Standards Authority of India (FSSAI) Regulatory Framework',
      body: (
        <div className="space-y-4 text-xs text-[#40493f] leading-relaxed">
          <div className="p-3.5 bg-[#eff5ef] border border-[#bfc9bc]/30 rounded-xl space-y-1">
            <span className="font-bold text-[#005420] text-xs block">
              Mandatory FSSAI Statutory Disclaimer
            </span>
            <p className="text-[11px]">
              OjasNutra formulations are nutraceutical food supplements classified under Section 22 of the Food Safety and Standards Act, 2006. These products are NOT FOR MEDICINAL USE and are not intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </div>
          <h4 className="font-bold text-sm text-[#171d1a]">1. Intended Use &amp; Consultation</h4>
          <p>
            Pregnant or lactating women, individuals taking prescription medications, or those with underlying medical conditions should consult a qualified physician or Ayurvedic medical practitioner prior to initiating any dietary botanical regimen.
          </p>
          <h4 className="font-bold text-sm text-[#171d1a]">2. Intellectual Property</h4>
          <p>
            All botanical marks, formulation architectures, trade dress, and typography are the exclusive intellectual property of OjasNutra Atelier Inc.
          </p>
          <h4 className="font-bold text-sm text-[#171d1a]">3. Governing Law</h4>
          <p>
            These terms are governed by and construed in accordance with the laws of the Republic of India, with exclusive jurisdiction in the courts of New Delhi / Bengaluru.
          </p>
        </div>
      ),
    },
    shipping: {
      title: 'Climate-Neutral Shipping & Returns Protocol',
      subtitle: 'Domestic India Logistics & Cold-Chain Integrity',
      body: (
        <div className="space-y-4 text-xs text-[#40493f] leading-relaxed">
          <h4 className="font-bold text-sm text-[#171d1a]">1. Domestic Dispatch &amp; Free Shipping</h4>
          <p>
            All orders above ₹750 qualify for complimentary climate-neutral express shipping across India. Orders below ₹750 incur a standard ₹99 logistics fee.
          </p>
          <p>
            Orders placed before 2:00 PM IST are dispatched same-day from our temperature-controlled Dehradun and Bengaluru fulfillment ateliers. Typical delivery transit is 2–4 business days.
          </p>
          <h4 className="font-bold text-sm text-[#171d1a]">2. Temperature-Sensitive Cold Packaging</h4>
          <p>
            Because our bio-identical gummies contain living botanical actives without chemical preservatives, they are packaged inside recyclable photoprotective cartons with insulated liners to shield against heat degradation during transit.
          </p>
          <h4 className="font-bold text-sm text-[#171d1a]">3. 30-Day Patron Purity Guarantee</h4>
          <p>
            If any formulation arrives with broken security seals, thermal damage, or fails to meet your standard, notify concierge@ojasnutra.com within 30 days of receipt for a complimentary replacement or full refund.
          </p>
        </div>
      ),
    },
    quality: {
      title: 'Quality Verification Standards & NABL Accreditation',
      subtitle: 'Eurofins & SGS Third-Party Laboratory Protocols',
      body: (
        <div className="space-y-4 text-xs text-[#40493f] leading-relaxed">
          <h4 className="font-bold text-sm text-[#171d1a]">1. Full Batch Traceability</h4>
          <p>
            Every single bottle produced by OjasNutra is stamped with an indelible 8-digit lot code. This lot code links directly to an independent, accredited laboratory Certificate of Analysis (COA) cross-verified by NABL ISO/IEC 17025 accredited laboratories.
          </p>
          <h4 className="font-bold text-sm text-[#171d1a]">2. 5-Tier Contaminant Profiling</h4>
          <p>
            Prior to release, each production run undergoes testing for:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Heavy Metals: Lead, Arsenic, Cadmium, Mercury (Parts per billion thresholds)</li>
            <li>Microbiological Pathogens: Total Yeast, Mold, E. coli, Salmonella</li>
            <li>Pesticide Multi-Residue: 450+ compound screening</li>
            <li>Solvent Purity: 0.0% residual hexanes, ethanols, or glycols</li>
            <li>Active Potency: HPLC/MS quantification of active L-Glutathione, Lutein, and Acetic Acid</li>
          </ul>
        </div>
      ),
    },
  };

  const activeContent = contentMap[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#bfc9bc]/30 overflow-hidden z-10 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        <div className="p-6 bg-[#f5fbf5] border-b border-[#bfc9bc]/30 flex items-center justify-between">
          <div>
            <h3 className="font-['Bodoni_Moda'] text-xl font-semibold text-[#171d1a]">
              {activeContent.title}
            </h3>
            <p className="text-xs text-[#005420] font-semibold">{activeContent.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#707a6e] hover:text-[#171d1a] hover:bg-[#e9efea] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {activeContent.body}
        </div>

        <div className="p-5 bg-[#f5fbf5] border-t border-[#bfc9bc]/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#005420] text-white text-xs font-bold hover:bg-[#1b6e32] cursor-pointer"
          >
            Acknowledge &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
