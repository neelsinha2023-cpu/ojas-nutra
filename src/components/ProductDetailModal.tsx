import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onInspectBatch: (batchNumber: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onInspectBatch,
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);
  const [isSubscription, setIsSubscription] = useState<boolean>(false);
  const [packMonths, setPackMonths] = useState<number>(1);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  if (!isOpen || !product) return null;

  const basePrice = product.price * packMonths;
  const originalPrice = (product.originalPrice || Math.round(product.price * 1.25)) * packMonths;
  const effectivePrice = isSubscription ? Math.round(basePrice * 0.85) : basePrice;

  const handleAdd = () => {
    addToCart(product, quantity * packMonths, isSubscription);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#bfc9bc]/30 overflow-hidden z-10 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#bfc9bc]/30 flex items-center justify-between bg-[#f5fbf5]">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#ffdea3]/40 text-[#5d4200] text-xs font-bold uppercase tracking-wider">
              {product.categoryLabel}
            </span>
            <span className="text-xs text-[#707a6e]">•</span>
            <span className="text-xs text-[#005420] font-semibold">{product.batchNumber}</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#707a6e] hover:text-[#171d1a] hover:bg-[#e9efea] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Product Image Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="aspect-square bg-[#eff5ef] rounded-3xl p-6 flex items-center justify-center relative overflow-hidden group border border-[#bfc9bc]/30">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[10px] text-[#005420] font-bold shadow-xs">
                  {product.servings} Bio-Active Gummies
                </span>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-[#eff5ef] border border-[#bfc9bc]/30">
                  <span className="font-bold text-[#005420] block">Zero Sugar</span>
                  <span className="text-[10px] text-[#707a6e]">Diabetic Friendly</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#eff5ef] border border-[#bfc9bc]/30">
                  <span className="font-bold text-[#005420] block">100% Vegan</span>
                  <span className="text-[10px] text-[#707a6e]">Citrus Pectin Matrix</span>
                </div>
              </div>

              {/* Linked COA Batch Trigger */}
              <div className="p-3 bg-[#f5fbf5] rounded-xl border border-[#005420]/20 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-[#005420]">
                  <span className="material-symbols-outlined text-base">verified</span>
                  <span className="font-bold">Lot: {product.batchNumber}</span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onInspectBatch(product.batchNumber);
                  }}
                  className="text-xs text-[#005420] font-bold underline hover:text-[#1b6e32] cursor-pointer"
                >
                  Verify COA
                </button>
              </div>
            </div>

            {/* Product Information Column */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex text-[#7a5900]">
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
                  <span className="text-xs font-bold text-[#171d1a]">{product.rating}</span>
                  <span className="text-xs text-[#707a6e]">
                    ({product.reviewCount} verified patrons)
                  </span>
                </div>

                <h2 className="font-['Bodoni_Moda'] text-2xl sm:text-3xl text-[#171d1a] font-semibold leading-tight">
                  {product.name}
                </h2>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#005420] mt-0.5">
                  {product.tagline}
                </p>
              </div>

              {/* Pricing Display */}
              <div className="flex items-baseline gap-3 pb-3 border-b border-[#bfc9bc]/30">
                <span className="text-3xl font-bold text-[#171d1a]">
                  ₹{effectivePrice}.00
                </span>
                <span className="text-sm text-[#707a6e] line-through">
                  ₹{originalPrice}.00
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#a3f6aa]/30 text-[#005420] font-bold text-xs">
                  Save ₹{originalPrice - effectivePrice}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-[#40493f] leading-relaxed">
                {product.description}
              </p>

              {/* Pack Size Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#171d1a] block">
                  Select Regimen Duration
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { months: 1, label: '30 Days', desc: '1 Bottle' },
                    { months: 2, label: '60 Days', desc: '2 Bottles (Save 5%)' },
                    { months: 3, label: '90 Days', desc: '3 Bottles (Save 10%)' },
                  ].map((tier) => (
                    <button
                      key={tier.months}
                      onClick={() => setPackMonths(tier.months)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        packMonths === tier.months
                          ? 'border-[#005420] bg-[#005420]/5 shadow-xs font-bold'
                          : 'border-[#bfc9bc]/40 hover:bg-[#eff5ef]'
                      }`}
                    >
                      <span className="text-xs text-[#171d1a] block">{tier.label}</span>
                      <span className="text-[10px] text-[#707a6e]">{tier.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Purchase Mode: One-time vs Subscription */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setIsSubscription(false)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    !isSubscription
                      ? 'border-[#005420] bg-[#005420]/5 font-bold shadow-xs'
                      : 'border-[#bfc9bc]/40 hover:bg-[#eff5ef]'
                  }`}
                >
                  <span className="text-xs text-[#171d1a] block">One-Time Ritual</span>
                  <span className="text-[11px] text-[#707a6e]">₹{basePrice}.00</span>
                </button>

                <button
                  onClick={() => setIsSubscription(true)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSubscription
                      ? 'border-[#005420] bg-[#005420]/5 font-bold shadow-xs'
                      : 'border-[#bfc9bc]/40 hover:bg-[#eff5ef]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#005420] font-bold block">
                      Subscribe &amp; Save
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#a3f6aa] text-[#002108] font-bold">
                      -15%
                    </span>
                  </div>
                  <span className="text-[11px] text-[#171d1a]">
                    ₹{Math.round(basePrice * 0.85)}.00 / month
                  </span>
                </button>
              </div>

              {/* Active Ingredient Disclosures */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-[#171d1a] block">
                  Active Compounds Breakdown
                </span>
                <div className="space-y-1.5 text-xs">
                  {product.actives.map((active, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-[#eff5ef] border border-[#bfc9bc]/20 flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-[#171d1a]">{active.name}</span>
                        <span className="text-[10px] text-[#707a6e] block">
                          {active.standardization}
                        </span>
                      </div>
                      <span className="font-bold text-[#005420]">{active.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Circadian Timing Protocol */}
              <div className="p-3 rounded-xl bg-[#ffdea3]/20 border border-[#ffdea3]/40 flex items-center gap-3 text-xs">
                <span className="material-symbols-outlined text-[#7a5900] text-xl">schedule</span>
                <div>
                  <span className="font-bold text-[#261900] block">Recommended Protocol:</span>
                  <span className="text-[#5d4200]">{product.intakeTime}</span>
                </div>
              </div>

              {/* Quantity Counter & Add Action */}
              <div className="pt-3 border-t border-[#bfc9bc]/30 flex items-center gap-4">
                <div className="flex items-center border border-[#bfc9bc]/40 rounded-full bg-[#eff5ef] p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-[#40493f] hover:bg-white cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-[#171d1a]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-[#40493f] hover:bg-white cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-4 rounded-full bg-[#005420] text-white text-xs sm:text-sm font-bold hover:bg-[#1b6e32] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">
                    {addedToast ? 'check_circle' : 'add_shopping_cart'}
                  </span>
                  <span>
                    {addedToast ? 'Added to Ritual!' : `Add to Ritual • ₹${effectivePrice * quantity}`}
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#707a6e] pt-1">
                <span>FSSAI Lic: {product.fssaiNumber}</span>
                <span>Complimentary Shipping Above ₹750</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
