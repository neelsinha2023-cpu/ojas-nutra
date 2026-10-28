import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess,
}) => {
  const { items, subtotal, discount, shipping, total, placeOrder } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [formData, setFormData] = useState({
    fullName: user?.name || 'Dr. Aarav Mehta',
    email: user?.email || 'aarav.mehta@vitality.in',
    phone: user?.phone || '+91 98201 44521',
    addressLine: user?.address?.line || 'Flat 402, Lotus Grand, Indiranagar',
    city: user?.address?.city || 'Bengaluru',
    state: user?.address?.state || 'Karnataka',
    pincode: user?.address?.pincode || '560038',
  });

  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('upi');
  const [upiId, setUpiId] = useState('aarav@okhdfcbank');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateShipping = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@'))
      errs.email = 'Valid email is required for tracking';
    if (!formData.phone.trim() || formData.phone.length < 10)
      errs.phone = '10-digit mobile number required';
    if (!formData.addressLine.trim()) errs.addressLine = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.state.trim()) errs.state = 'State is required';
    if (!formData.pincode.trim() || formData.pincode.length !== 6)
      errs.pincode = 'Valid 6-digit Indian PIN code required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep('payment');
    }
  };

  const handleCompleteOrder = async () => {
    setIsSubmitting(true);
    try {
      const placed = await placeOrder(formData, paymentMethod);
      setIsSubmitting(false);
      onOrderSuccess(placed);
      onClose();
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#bfc9bc]/30 overflow-hidden flex flex-col max-h-[92vh] z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-[#f5fbf5] border-b border-[#bfc9bc]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-[#005420]/10 flex items-center justify-center text-[#005420]">
              <span className="material-symbols-outlined text-lg">local_shipping</span>
            </span>
            <div>
              <h3 className="font-['Bodoni_Moda'] text-xl font-semibold text-[#171d1a]">
                Atelier Direct Checkout
              </h3>
              <p className="text-xs text-[#707a6e]">
                {step === 'shipping' ? 'Step 1 of 2: Shipping Destination' : 'Step 2 of 2: Payment Protocol'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#707a6e] hover:text-[#171d1a] hover:bg-[#e9efea] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Development Environment Disclosure Badge */}
        <div className="px-6 py-2.5 bg-[#eff5ef] border-b border-[#bfc9bc]/30 text-[11px] text-[#40493f] flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-[#7a5900]">info</span>
          <span>
            <strong>Verified Test Flow:</strong> Live payment gateway in development mode. Real order reference and persistent account history will be generated without actual credit card debits.
          </span>
        </div>

        {/* Body Form */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {step === 'shipping' ? (
            <form id="shipping-form" onSubmit={handleNextToPayment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#171d1a] block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#eff5ef] border border-[#bfc9bc]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#171d1a] focus:outline-none focus:ring-1 focus:ring-[#005420]"
                    placeholder="e.g. Dr. Aarav Mehta"
                  />
                  {errors.fullName && <p className="text-[10px] text-[#ba1a1a] mt-0.5">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-[#171d1a] block mb-1">
                    Mobile Phone (for delivery SMS) *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#eff5ef] border border-[#bfc9bc]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#171d1a] focus:outline-none focus:ring-1 focus:ring-[#005420]"
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && <p className="text-[10px] text-[#ba1a1a] mt-0.5">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#171d1a] block mb-1">
                  Email Address (for Certificate of Analysis &amp; Order Invoice) *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#eff5ef] border border-[#bfc9bc]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#171d1a] focus:outline-none focus:ring-1 focus:ring-[#005420]"
                  placeholder="name@vitality.in"
                />
                {errors.email && <p className="text-[10px] text-[#ba1a1a] mt-0.5">{errors.email}</p>}
              </div>

              <div>
                <label className="text-xs font-bold text-[#171d1a] block mb-1">
                  Street Address &amp; Apartment *
                </label>
                <input
                  type="text"
                  value={formData.addressLine}
                  onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                  className="w-full bg-[#eff5ef] border border-[#bfc9bc]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#171d1a] focus:outline-none focus:ring-1 focus:ring-[#005420]"
                  placeholder="House number, apartment name, street"
                />
                {errors.addressLine && <p className="text-[10px] text-[#ba1a1a] mt-0.5">{errors.addressLine}</p>}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#171d1a] block mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#eff5ef] border border-[#bfc9bc]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#171d1a] focus:outline-none focus:ring-1 focus:ring-[#005420]"
                    placeholder="Bengaluru"
                  />
                  {errors.city && <p className="text-[10px] text-[#ba1a1a] mt-0.5">{errors.city}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-[#171d1a] block mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-[#eff5ef] border border-[#bfc9bc]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#171d1a] focus:outline-none focus:ring-1 focus:ring-[#005420]"
                    placeholder="Karnataka"
                  />
                  {errors.state && <p className="text-[10px] text-[#ba1a1a] mt-0.5">{errors.state}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-[#171d1a] block mb-1">
                    PIN Code (6 digits) *
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full bg-[#eff5ef] border border-[#bfc9bc]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#171d1a] focus:outline-none focus:ring-1 focus:ring-[#005420]"
                    placeholder="560038"
                  />
                  {errors.pincode && <p className="text-[10px] text-[#ba1a1a] mt-0.5">{errors.pincode}</p>}
                </div>
              </div>

              {/* Order Summary Snapshot */}
              <div className="p-4 rounded-2xl bg-[#eff5ef] border border-[#bfc9bc]/30 text-xs space-y-2">
                <div className="flex justify-between font-bold text-[#171d1a]">
                  <span>Order Items ({items.length})</span>
                  <span>₹{total}.00</span>
                </div>
                <div className="text-[11px] text-[#707a6e] flex items-center justify-between">
                  <span>Shipping: {shipping === 0 ? 'Complimentary' : `₹${shipping}`}</span>
                  <span>Includes GST &amp; Cold-Chain Verification</span>
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-5 animate-in fade-in">
              {/* Payment Methods */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#171d1a] block">
                  Select Indian Payment Method
                </label>

                {/* UPI Option */}
                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-[#005420] bg-[#005420]/5 shadow-xs'
                      : 'border-[#bfc9bc]/40 hover:bg-[#eff5ef]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#005420]">qr_code_2</span>
                      <div>
                        <p className="font-bold text-sm text-[#171d1a]">
                          Instant UPI (GPay, PhonePe, Paytm, BHIM)
                        </p>
                        <p className="text-[11px] text-[#707a6e]">
                          Zero transaction fee • Instant order confirmation
                        </p>
                      </div>
                    </div>
                    <span className="w-5 h-5 rounded-full border-2 border-[#005420] flex items-center justify-center">
                      {paymentMethod === 'upi' && <span className="w-2.5 h-2.5 bg-[#005420] rounded-full" />}
                    </span>
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="mt-3 pt-3 border-t border-[#bfc9bc]/20 space-y-2">
                      <label className="text-[11px] font-semibold text-[#171d1a] block">
                        Enter UPI VPA / ID
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                        className="w-full bg-white border border-[#bfc9bc]/40 rounded-xl px-3 py-2 text-xs text-[#171d1a]"
                      />
                    </div>
                  )}
                </div>

                {/* Cards Option */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#005420] bg-[#005420]/5 shadow-xs'
                      : 'border-[#bfc9bc]/40 hover:bg-[#eff5ef]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#005420]">credit_card</span>
                      <div>
                        <p className="font-bold text-sm text-[#171d1a]">
                          Credit &amp; Debit Cards (RuPay, Visa, Mastercard)
                        </p>
                        <p className="text-[11px] text-[#707a6e]">
                          256-Bit SSL Encrypted Protocol
                        </p>
                      </div>
                    </div>
                    <span className="w-5 h-5 rounded-full border-2 border-[#005420] flex items-center justify-center">
                      {paymentMethod === 'card' && <span className="w-2.5 h-2.5 bg-[#005420] rounded-full" />}
                    </span>
                  </div>
                </div>

                {/* Net Banking */}
                <div
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'border-[#005420] bg-[#005420]/5 shadow-xs'
                      : 'border-[#bfc9bc]/40 hover:bg-[#eff5ef]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#005420]">account_balance</span>
                      <div>
                        <p className="font-bold text-sm text-[#171d1a]">
                          Net Banking (HDFC, ICICI, SBI, Axis, Kotak)
                        </p>
                        <p className="text-[11px] text-[#707a6e]">Direct bank authentication</p>
                      </div>
                    </div>
                    <span className="w-5 h-5 rounded-full border-2 border-[#005420] flex items-center justify-center">
                      {paymentMethod === 'netbanking' && (
                        <span className="w-2.5 h-2.5 bg-[#005420] rounded-full" />
                      )}
                    </span>
                  </div>
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#005420] bg-[#005420]/5 shadow-xs'
                      : 'border-[#bfc9bc]/40 hover:bg-[#eff5ef]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#005420]">payments</span>
                      <div>
                        <p className="font-bold text-sm text-[#171d1a]">Cash on Delivery (COD)</p>
                        <p className="text-[11px] text-[#707a6e]">
                          Pay in cash or UPI when delivered
                        </p>
                      </div>
                    </div>
                    <span className="w-5 h-5 rounded-full border-2 border-[#005420] flex items-center justify-center">
                      {paymentMethod === 'cod' && <span className="w-2.5 h-2.5 bg-[#005420] rounded-full" />}
                    </span>
                  </div>
                </div>
              </div>

              {/* Total Summary */}
              <div className="p-4 rounded-2xl bg-[#eff5ef] border border-[#bfc9bc]/30 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#40493f]">Deliver to:</span>
                  <span className="font-semibold text-[#171d1a] truncate max-w-xs">
                    {formData.fullName}, {formData.city} - {formData.pincode}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#40493f]">Subtotal:</span>
                  <span className="font-semibold text-[#171d1a]">₹{subtotal}.00</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#005420]">
                    <span>Privilege Discount:</span>
                    <span>-₹{discount}.00</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#40493f]">Shipping:</span>
                  <span className="font-semibold text-[#171d1a]">
                    {shipping === 0 ? 'Complimentary' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#171d1a] pt-2 border-t border-[#bfc9bc]/30">
                  <span>Grand Total:</span>
                  <span>₹{total}.00</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-[#f5fbf5] border-t border-[#bfc9bc]/30 flex items-center justify-between gap-4">
          {step === 'payment' ? (
            <button
              onClick={() => setStep('shipping')}
              className="px-5 py-3 rounded-full border border-[#bfc9bc]/40 text-[#40493f] text-xs font-semibold hover:bg-white transition-colors cursor-pointer"
            >
              Back to Address
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-full border border-[#bfc9bc]/40 text-[#40493f] text-xs font-semibold hover:bg-white transition-colors cursor-pointer"
            >
              Return to Cart
            </button>
          )}

          {step === 'shipping' ? (
            <button
              type="submit"
              form="shipping-form"
              className="px-8 py-3.5 rounded-full bg-[#005420] text-white text-xs font-bold hover:bg-[#1b6e32] transition-colors shadow-md flex items-center gap-1.5 cursor-pointer ml-auto"
            >
              <span>Continue to Payment</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          ) : (
            <button
              onClick={handleCompleteOrder}
              disabled={isSubmitting}
              className="px-8 py-3.5 rounded-full bg-[#005420] text-white text-xs font-bold hover:bg-[#1b6e32] transition-colors shadow-md flex items-center gap-1.5 cursor-pointer ml-auto disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">lock</span>
              <span>{isSubmitting ? 'Securing Order...' : `Authorize & Pay ₹${total}.00`}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
