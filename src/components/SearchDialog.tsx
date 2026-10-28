import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (productId: string) => void;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const { addToCart } = useCart();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS;

    return PRODUCTS.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchTag = p.tagline.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchActives = p.actives.some(
        (a) => a.name.toLowerCase().includes(q) || a.standardization.toLowerCase().includes(q)
      );
      const matchBenefits = p.benefits.some((b) => b.toLowerCase().includes(q));
      const matchBatch = p.batchNumber.toLowerCase().includes(q);
      const matchCategory = p.categoryLabel.toLowerCase().includes(q);

      return matchName || matchTag || matchDesc || matchActives || matchBenefits || matchBatch || matchCategory;
    });
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#bfc9bc]/30 overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        {/* Search Bar */}
        <div className="p-4 sm:p-5 border-b border-[#bfc9bc]/30 flex items-center gap-3 bg-[#f5fbf5]">
          <span className="material-symbols-outlined text-[#005420] text-2xl">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by botanical active, health goal, or batch stamp..."
            className="flex-1 bg-transparent text-sm sm:text-base font-medium text-[#171d1a] placeholder-[#707a6e] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#707a6e] hover:text-[#171d1a] text-xs font-semibold cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#707a6e] hover:text-[#171d1a] hover:bg-[#e9efea] cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Suggestion Tags */}
        <div className="px-5 py-2.5 bg-[#eff5ef] border-b border-[#bfc9bc]/20 flex items-center gap-2 overflow-x-auto text-[11px] text-[#40493f]">
          <span className="font-bold text-[#707a6e] shrink-0">Popular:</span>
          {['Glutathione', 'Lutein', 'Sea Buckthorn', 'ACV', 'Sugar Free', 'COA Batch'].map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-2.5 py-0.5 rounded-full bg-white border border-[#bfc9bc]/30 hover:border-[#005420] cursor-pointer whitespace-nowrap"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 sm:p-5 max-h-[60vh] overflow-y-auto space-y-3">
          {results.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <span className="material-symbols-outlined text-3xl text-[#707a6e]">search_off</span>
              <p className="text-sm font-bold text-[#171d1a]">No formulations match "{query}"</p>
              <p className="text-xs text-[#707a6e]">
                Try searching for "Glutathione", "Omega 7", "Eye Care", or "Apple Cider Vinegar".
              </p>
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product.id);
                  onClose();
                }}
                className="p-3.5 rounded-2xl bg-[#eff5ef]/60 hover:bg-[#eff5ef] border border-[#bfc9bc]/30 flex items-center justify-between gap-4 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 object-contain rounded-xl bg-white p-1 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#171d1a] truncate group-hover:text-[#005420] transition-colors">
                        {product.name}
                      </h4>
                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#ffdea3]/40 text-[#5d4200] font-bold">
                        {product.categoryLabel}
                      </span>
                    </div>
                    <p className="text-xs text-[#40493f] truncate">{product.tagline}</p>
                    <p className="text-[10px] text-[#707a6e] mt-0.5 truncate">
                      Actives: {product.actives.map((a) => a.name).join(', ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-bold text-sm text-[#171d1a]">₹{product.price}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product, 1);
                    }}
                    className="px-3 py-1.5 rounded-full bg-[#005420] text-white text-xs font-bold hover:bg-[#1b6e32] transition-colors shadow-xs cursor-pointer"
                  >
                    + Add
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
