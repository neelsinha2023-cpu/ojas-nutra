import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Order } from '../types';

interface OrderConfirmationModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onViewAccount: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  isOpen,
  onClose,
  onViewAccount,
}) => {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#005420', '#ffdea3', '#f6be40', '#a3f6aa'],
        });
      } catch {
        // ignore
      }
    }
  }, [isOpen]);

  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#bfc9bc]/30 overflow-hidden z-10 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Top Celebration Header */}
        <div className="p-6 bg-gradient-to-br from-[#0c1c13] to-[#152e1f] text-white text-center space-y-3 relative overflow-hidden">
          <div className="sq-field opacity-40" />
          <div className="relative z-10 w-14 h-14 mx-auto rounded-full bg-[#ffdea3]/20 border border-[#ffdea3]/40 flex items-center justify-center text-[#ffdea3]">
            <span className="material-symbols-outlined text-3xl">verified</span>
          </div>
          <div className="relative z-10">
            <span className="text-[10px] uppercase tracking-widest text-[#a3f6aa] font-bold block mb-1">
              Ritual Secured &bull; Lot Reserved
            </span>
            <h3 className="font-['Bodoni_Moda'] text-2xl sm:text-3xl font-semibold">
              Order Confirmed
            </h3>
            <p className="text-xs text-[#bfc9bc] mt-1 font-mono">
              Reference: <strong className="text-[#ffdea3]">{order.id}</strong>
            </p>
          </div>
        </div>

        {/* Body Details */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-[#40493f]">
          {/* Tracking Pipeline */}
          <div className="p-4 bg-[#eff5ef] rounded-2xl border border-[#bfc9bc]/30 space-y-3">
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#005420] block">
              Fulfillment Journey
            </span>
            <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
              <div className="space-y-1">
                <span className="w-6 h-6 mx-auto rounded-full bg-[#005420] text-white flex items-center justify-center text-xs">
                  ✓
                </span>
                <span className="font-bold text-[#171d1a] block">Confirmed</span>
              </div>
              <div className="space-y-1">
                <span className="w-6 h-6 mx-auto rounded-full bg-[#a3f6aa] text-[#005420] flex items-center justify-center text-xs animate-pulse">
                  2
                </span>
                <span className="text-[#171d1a] block">Cold Packing</span>
              </div>
              <div className="space-y-1">
                <span className="w-6 h-6 mx-auto rounded-full bg-white text-[#707a6e] border border-[#bfc9bc] flex items-center justify-center text-xs">
                  3
                </span>
                <span className="text-[#707a6e] block">Atelier Dispatch</span>
              </div>
              <div className="space-y-1">
                <span className="w-6 h-6 mx-auto rounded-full bg-white text-[#707a6e] border border-[#bfc9bc] flex items-center justify-center text-xs">
                  4
                </span>
                <span className="text-[#707a6e] block">Delivery</span>
              </div>
            </div>
            <p className="text-[11px] text-[#707a6e] text-center pt-1">
              Estimated delivery to <strong>{order.customer.city}</strong> within 2–4 business days with cold-chain protection.
            </p>
          </div>

          {/* Delivery Details */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white border border-[#bfc9bc]/30">
            <div>
              <span className="text-[10px] text-[#707a6e] uppercase tracking-wider font-bold block mb-1">
                Shipped To
              </span>
              <p className="font-bold text-[#171d1a]">{order.customer.fullName}</p>
              <p className="text-[11px] text-[#40493f]">{order.customer.addressLine}</p>
              <p className="text-[11px] text-[#40493f]">
                {order.customer.city}, {order.customer.state} - {order.customer.pincode}
              </p>
              <p className="text-[11px] text-[#707a6e] mt-1">{order.customer.phone}</p>
            </div>
            <div>
              <span className="text-[10px] text-[#707a6e] uppercase tracking-wider font-bold block mb-1">
                Payment Method
              </span>
              <p className="font-bold text-[#171d1a] uppercase">{order.paymentMethod}</p>
              <p className="text-[11px] text-[#005420] font-semibold mt-0.5">
                {order.paymentStatus === 'paid' ? 'Payment Verified (Test Mode)' : 'Pay on Delivery'}
              </p>
              <p className="text-[10px] text-[#707a6e] mt-2">
                Invoice sent to: {order.customer.email}
              </p>
            </div>
          </div>

          {/* Purchased Items */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#707a6e] block">
              Formulation Summary
            </span>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#eff5ef] border border-[#bfc9bc]/20"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10 h-10 object-contain rounded-md bg-white p-0.5"
                    />
                    <div>
                      <p className="font-bold text-xs text-[#171d1a]">{item.product.name}</p>
                      <p className="text-[10px] text-[#707a6e]">
                        Qty: {item.quantity} {item.isSubscription && '• 30-Day Auto Replenish'}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-xs text-[#171d1a]">
                    ₹{(item.isSubscription ? Math.round(item.product.price * 0.85) : item.product.price) * item.quantity}.00
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Totals */}
          <div className="pt-2 border-t border-[#bfc9bc]/30 space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold text-[#171d1a]">₹{order.subtotal}.00</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#005420]">
                <span>Member Privilege Discount:</span>
                <span>-₹{order.discount}.00</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span className="font-semibold text-[#171d1a]">
                {order.shipping === 0 ? 'Complimentary' : `₹${order.shipping}`}
              </span>
            </div>
            <div className="flex justify-between font-bold text-sm text-[#171d1a] pt-1 border-t border-[#bfc9bc]/20">
              <span>Paid Total:</span>
              <span>₹{order.total}.00</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-[#f5fbf5] border-t border-[#bfc9bc]/30 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-full border border-[#bfc9bc]/40 text-xs font-semibold text-[#40493f] hover:bg-white flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">print</span>
            <span>Print Receipt</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onViewAccount();
              }}
              className="px-5 py-2.5 rounded-full bg-[#eff5ef] text-xs font-bold text-[#005420] hover:bg-white border border-[#bfc9bc]/40 transition-colors cursor-pointer"
            >
              View in Atelier Portal
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-[#005420] text-xs font-bold text-white hover:bg-[#1b6e32] transition-colors shadow-sm cursor-pointer"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
