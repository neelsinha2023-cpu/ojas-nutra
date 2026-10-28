import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onCheckout: () => void;
  onSelectProduct: (productId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onCheckout,
  onSelectProduct,
}) => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    toggleSubscription,
    clearCart,
    subtotal,
    discount,
    discountCode,
    applyPromoCode,
    removePromoCode,
    shipping,
    freeShippingThreshold,
    total,
    totalQuantity,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isCartOpen) return null;

  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoMessage({ text: res.message, error: !res.success });
    if (res.success) {
      setPromoInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#f5fbf5] h-full shadow-2xl flex flex-col z-10 border-l border-[#bfc9bc]/40 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-[#bfc9bc]/30 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#005420]">shopping_bag</span>
            <h3 className="font-['Bodoni_Moda'] text-xl font-semibold text-[#171d1a]">
              Your Ritual Cart
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-[#e9efea] text-xs font-bold text-[#005420]">
              {totalQuantity}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#707a6e] hover:text-[#171d1a] hover:bg-[#e9efea] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3 bg-[#eff5ef] border-b border-[#bfc9bc]/30 text-xs">
          {remainingForFreeShipping > 0 ? (
            <p className="text-[#40493f] mb-1.5 font-medium">
              Add <span className="font-bold text-[#005420]">₹{remainingForFreeShipping}</span> more to unlock <span className="font-bold">Complimentary Climate-Neutral Shipping</span>!
            </p>
          ) : (
            <p className="text-[#005420] font-bold flex items-center gap-1 mb-1.5">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              You have unlocked Complimentary Climate-Neutral Shipping across India!
            </p>
          )}
          <div className="w-full h-1.5 bg-[#bfc9bc]/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#005420] transition-all duration-500 rounded-full"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#eff5ef] flex items-center justify-center text-[#707a6e]">
                <span className="material-symbols-outlined text-3xl">remove_shopping_cart</span>
              </div>
              <div className="space-y-1">
                <p className="text-base font-bold text-[#171d1a]">Your ritual is empty</p>
                <p className="text-xs text-[#707a6e] max-w-xs mx-auto">
                  Explore our targeted bio-identical gummies formulated for sustained longevity.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 rounded-full bg-[#005420] text-white text-xs font-bold hover:bg-[#1b6e32] transition-colors cursor-pointer"
              >
                Explore Formulations
              </button>
            </div>
          ) : (
            items.map((item) => {
              const unitPrice = item.isSubscription
                ? Math.round(item.product.price * 0.85)
                : item.product.price;
              const itemTotal = unitPrice * item.quantity;

              return (
                <div
                  key={item.product.id}
                  className="p-3.5 bg-white rounded-2xl border border-[#bfc9bc]/30 shadow-xs space-y-3"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      onClick={() => {
                        setIsCartOpen(false);
                        onSelectProduct(item.product.id);
                      }}
                      className="w-16 h-16 object-contain bg-[#eff5ef] rounded-xl p-1 cursor-pointer shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4
                          onClick={() => {
                            setIsCartOpen(false);
                            onSelectProduct(item.product.id);
                          }}
                          className="font-bold text-sm text-[#171d1a] truncate hover:text-[#005420] cursor-pointer"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#707a6e] hover:text-[#ba1a1a] transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>

                      <p className="text-[11px] text-[#707a6e] truncate">
                        {item.product.flavor} • 30 Servings
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-bold text-sm text-[#171d1a]">₹{itemTotal}</span>
                          {item.isSubscription && (
                            <span className="text-[10px] text-[#005420] font-semibold">
                              (15% off)
                            </span>
                          )}
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center border border-[#bfc9bc]/40 rounded-full bg-[#eff5ef] p-0.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-[#40493f] hover:bg-white cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-[#171d1a]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-[#40493f] hover:bg-white cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subscribe & Save 15% switch */}
                  <div className="pt-2 border-t border-[#bfc9bc]/20 flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={item.isSubscription}
                        onChange={() => toggleSubscription(item.product.id)}
                        className="rounded text-[#005420] focus:ring-[#005420] cursor-pointer"
                      />
                      <span className="text-[#40493f] text-[11px]">
                        Subscribe every 30 days (<span className="text-[#005420] font-bold">Save 15%</span>)
                      </span>
                    </label>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer & Checkout Summary */}
        {items.length > 0 && (
          <div className="p-5 bg-white border-t border-[#bfc9bc]/30 space-y-4">
            {/* Promo Code Input */}
            <div>
              {discountCode ? (
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#a3f6aa]/20 border border-[#a3f6aa]/40 text-xs">
                  <span className="font-bold text-[#005420]">
                    Code "{discountCode}" Applied (-₹{discount})
                  </span>
                  <button
                    onClick={removePromoCode}
                    className="text-[#707a6e] hover:text-[#ba1a1a] text-xs underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Privilege Code (try OJAS15)"
                    className="flex-1 bg-[#eff5ef] px-3.5 py-2 rounded-xl text-xs font-medium text-[#171d1a] border border-[#bfc9bc]/40 focus:outline-none focus:ring-1 focus:ring-[#005420]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#2c322e] text-white text-xs font-bold hover:bg-[#005420] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoMessage && (
                <p
                  className={`text-[11px] mt-1 ${
                    promoMessage.error ? 'text-[#ba1a1a]' : 'text-[#005420]'
                  }`}
                >
                  {promoMessage.text}
                </p>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#40493f]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#171d1a]">₹{subtotal}.00</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#005420]">
                  <span>Member Privilege Discount</span>
                  <span>-₹{discount}.00</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Climate-Neutral Shipping</span>
                <span className="font-semibold text-[#171d1a]">
                  {shipping === 0 ? (
                    <span className="text-[#005420] font-bold">Complimentary</span>
                  ) : (
                    `₹${shipping}.00`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#171d1a] pt-2 border-t border-[#bfc9bc]/30">
                <span>Total</span>
                <span>₹{total}.00</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                onCheckout();
              }}
              className="w-full py-4 rounded-full bg-[#005420] text-white font-bold text-sm hover:bg-[#1b6e32] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>

            <div className="flex items-center justify-center gap-3 text-[10px] text-[#707a6e]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-[#005420]">verified</span>
                100% Guaranteed Purity
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-[#005420]">local_shipping</span>
                Dispatch in 24h
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
