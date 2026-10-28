import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

interface AccountPortalProps {
  onSelectProduct: (productId: string) => void;
}

export const AccountPortal: React.FC<AccountPortalProps> = ({
  onSelectProduct,
}) => {
  const { user, isAuthenticated, signIn, signUp, signOut, updateProfile, isAuthModalOpen, setIsAuthModalOpen } = useAuth();
  const { orders, addToCart } = useCart();

  const [activeTab, setActiveTab] = useState<'orders' | 'subscriptions' | 'profile'>('orders');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (authMode === 'signin') {
      const success = await signIn(emailInput, nameInput);
      if (!success) {
        setAuthError('Please enter a valid email address.');
        return;
      }
    } else {
      const success = await signUp(emailInput, nameInput, phoneInput);
      if (!success) {
        setAuthError('Please provide your name and a valid email address.');
        return;
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsAuthModalOpen(false)}
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#bfc9bc]/30 overflow-hidden z-10 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-[#f5fbf5] border-b border-[#bfc9bc]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-[#005420]/15 text-[#005420] flex items-center justify-center font-bold text-sm">
              {user ? user.name.slice(0, 2).toUpperCase() : 'OJ'}
            </span>
            <div>
              <h3 className="font-['Bodoni_Moda'] text-xl font-semibold text-[#171d1a]">
                {isAuthenticated ? user?.name : 'Atelier Customer Portal'}
              </h3>
              <p className="text-xs text-[#005420] font-semibold">
                {isAuthenticated ? `${user?.memberTier} • Member Since ${user?.joinedDate}` : 'Sign in to access your orders & subscriptions'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#707a6e] hover:text-[#171d1a] hover:bg-[#e9efea] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Auth Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!isAuthenticated ? (
            /* Sign In / Sign Up Form */
            <div className="max-w-md mx-auto py-6 space-y-6">
              <div className="text-center space-y-1">
                <h4 className="font-['Bodoni_Moda'] text-2xl font-bold text-[#171d1a]">
                  {authMode === 'signin' ? 'Access Your Atelier Account' : 'Create Atelier Patron Account'}
                </h4>
                <p className="text-xs text-[#707a6e]">
                  {authMode === 'signin'
                    ? 'Enter your email to view order history and manage your circadian subscriptions.'
                    : 'Join The Ojas Circle for 15% ongoing member privilege on fresh micro-batches.'}
                </p>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authMode === 'signup' && (
                  <div>
                    <label className="text-xs font-bold text-[#171d1a] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="e.g. Dr. Aarav Mehta"
                      className="w-full bg-[#eff5ef] border border-[#bfc9bc]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#171d1a] focus:outline-none focus:ring-1 focus:ring-[#005420]"
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-[#171d1a] block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="name@vitality.in"
                    className="w-full bg-[#eff5ef] border border-[#bfc9bc]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#171d1a] focus:outline-none focus:ring-1 focus:ring-[#005420]"
                  />
                </div>

                {authMode === 'signup' && (
                  <div>
                    <label className="text-xs font-bold text-[#171d1a] block mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#eff5ef] border border-[#bfc9bc]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#171d1a] focus:outline-none focus:ring-1 focus:ring-[#005420]"
                    />
                  </div>
                )}

                {authError && (
                  <p className="text-xs text-[#ba1a1a] p-2 rounded-lg bg-[#ffdad6]/40">
                    {authError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#005420] text-white text-xs font-bold hover:bg-[#1b6e32] transition-colors shadow-md cursor-pointer"
                >
                  {authMode === 'signin' ? 'Sign In to Portal' : 'Register as Circle Patron'}
                </button>
              </form>

              <div className="text-center text-xs text-[#707a6e]">
                {authMode === 'signin' ? (
                  <span>
                    New to OjasNutra?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('signup')}
                      className="text-[#005420] font-bold hover:underline cursor-pointer"
                    >
                      Create an account
                    </button>
                  </span>
                ) : (
                  <span>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('signin')}
                      className="text-[#005420] font-bold hover:underline cursor-pointer"
                    >
                      Sign In
                    </button>
                  </span>
                )}
              </div>
            </div>
          ) : (
            /* Authenticated Portal Content */
            <div className="space-y-6">
              {/* Tab Navigation */}
              <div className="flex border-b border-[#bfc9bc]/30 gap-6 text-xs">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`pb-2.5 font-bold transition-colors cursor-pointer ${
                    activeTab === 'orders'
                      ? 'border-b-2 border-[#005420] text-[#005420]'
                      : 'text-[#707a6e] hover:text-[#171d1a]'
                  }`}
                >
                  Order History ({orders.length})
                </button>
                <button
                  onClick={() => setActiveTab('subscriptions')}
                  className={`pb-2.5 font-bold transition-colors cursor-pointer ${
                    activeTab === 'subscriptions'
                      ? 'border-b-2 border-[#005420] text-[#005420]'
                      : 'text-[#707a6e] hover:text-[#171d1a]'
                  }`}
                >
                  Circadian Subscriptions
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`pb-2.5 font-bold transition-colors cursor-pointer ${
                    activeTab === 'profile'
                      ? 'border-b-2 border-[#005420] text-[#005420]'
                      : 'text-[#707a6e] hover:text-[#171d1a]'
                  }`}
                >
                  Profile &amp; Delivery Address
                </button>
              </div>

              {/* Tab 1: Orders */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <div className="py-12 text-center space-y-2">
                      <span className="material-symbols-outlined text-3xl text-[#707a6e]">receipt_long</span>
                      <p className="text-sm font-bold text-[#171d1a]">No orders placed yet</p>
                      <p className="text-xs text-[#707a6e]">
                        When you reserve formulations or circadian regimens, your order reference and COA tracking will appear here.
                      </p>
                    </div>
                  ) : (
                    orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-4 rounded-2xl bg-[#eff5ef] border border-[#bfc9bc]/30 space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#bfc9bc]/20">
                          <div>
                            <span className="font-bold text-sm text-[#171d1a] block">{ord.id}</span>
                            <span className="text-[10px] text-[#707a6e]">
                              Placed on {new Date(ord.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#a3f6aa]/30 text-[#005420] text-[10px] font-bold uppercase">
                              {ord.orderStatus}
                            </span>
                            <span className="font-bold text-sm text-[#171d1a]">₹{ord.total}.00</span>
                          </div>
                        </div>

                        {/* Items in order */}
                        <div className="space-y-2">
                          {ord.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  className="w-8 h-8 object-contain rounded bg-white p-0.5"
                                />
                                <span>{item.product.name} &times; {item.quantity}</span>
                              </div>
                              <button
                                onClick={() => addToCart(item.product, 1)}
                                className="text-[#005420] font-bold hover:underline text-[11px] cursor-pointer"
                              >
                                Reorder
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 flex items-center justify-between text-[11px] text-[#707a6e] border-t border-[#bfc9bc]/20">
                          <span>Delivering to: {ord.customer.city} ({ord.customer.pincode})</span>
                          <span>Payment: {ord.paymentMethod.toUpperCase()} ({ord.paymentStatus})</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Tab 2: Subscriptions */}
              {activeTab === 'subscriptions' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#ffdea3]/20 border border-[#ffdea3]/40 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-[#7a5900] font-bold">
                      <span className="material-symbols-outlined text-base">workspace_premium</span>
                      <span>The Ojas Circle Subscription Privilege</span>
                    </div>
                    <p className="text-[#5d4200]">
                      All active subscriptions receive 15% discount, fresh micro-batch bottling reserves, and zero-fee express climate-neutral delivery every 30 days.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#eff5ef] border border-[#bfc9bc]/30 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#005420]/15 flex items-center justify-center text-[#005420]">
                          <span className="material-symbols-outlined text-base">autorenew</span>
                        </span>
                        <div>
                          <p className="font-bold text-[#171d1a]">Liposomal Glutathione Regimen</p>
                          <p className="text-[10px] text-[#707a6e]">Auto-replenished every 30 days • Next batch: Nov 15, 2026</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#a3f6aa]/30 text-[#005420] font-bold text-[10px]">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-[#bfc9bc]/20">
                      <span className="font-bold text-[#171d1a]">₹679.00 / month (15% Saved)</span>
                      <button className="text-[11px] text-[#707a6e] hover:text-[#ba1a1a] underline cursor-pointer">
                        Pause or Modify
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Profile */}
              {activeTab === 'profile' && user && (
                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-2xl bg-[#eff5ef] border border-[#bfc9bc]/30 space-y-3">
                    <span className="text-[10px] uppercase font-bold text-[#707a6e] block">
                      Patron Profile Details
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[#707a6e] block">Name:</span>
                        <span className="font-bold text-[#171d1a]">{user.name}</span>
                      </div>
                      <div>
                        <span className="text-[#707a6e] block">Email:</span>
                        <span className="font-bold text-[#171d1a]">{user.email}</span>
                      </div>
                      <div>
                        <span className="text-[#707a6e] block">Phone:</span>
                        <span className="font-bold text-[#171d1a]">{user.phone || '+91 98201 44521'}</span>
                      </div>
                      <div>
                        <span className="text-[#707a6e] block">Membership:</span>
                        <span className="font-bold text-[#005420]">{user.memberTier}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#eff5ef] border border-[#bfc9bc]/30 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-[#707a6e] block">
                      Default Shipping Address (India)
                    </span>
                    <p className="font-bold text-[#171d1a]">{user.address?.line}</p>
                    <p className="text-[#40493f]">
                      {user.address?.city}, {user.address?.state} - {user.address?.pincode}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {isAuthenticated && (
          <div className="p-5 bg-[#f5fbf5] border-t border-[#bfc9bc]/30 flex items-center justify-between">
            <button
              onClick={signOut}
              className="text-xs font-semibold text-[#ba1a1a] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              <span>Sign Out</span>
            </button>
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="px-6 py-2.5 rounded-full bg-[#005420] text-white text-xs font-bold hover:bg-[#1b6e32] cursor-pointer"
            >
              Return to Atelier
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
