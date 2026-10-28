import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface ProductGridProps {
  onSelectProduct: (productId: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ onSelectProduct }) => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Formulations' },
    { id: 'master-antioxidant', label: 'Antioxidant & Longevity' },
    { id: 'omega-glow', label: 'Omega 7 & Skin' },
    { id: 'vision-repair', label: 'Macular Vision' },
    { id: 'metabolic-reset', label: 'Metabolism & Gut' },
    { id: 'trilogy-bundle', label: 'Complete Regimens' },
  ];

  const filteredProducts =
    selectedCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedAnimationId(product.id);
    setTimeout(() => setAddedAnimationId(null), 1200);
  };

  return (
    <section className="w-full py-20 px-4 sm:px-8 bg-[#eff5ef]" id="shop">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#bfc9bc]/30">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#005420] font-bold">
              The Core Longevity Collection
            </span>
            <h2 className="font-['Bodoni_Moda'] text-3xl sm:text-4xl text-[#171d1a] tracking-tight font-medium">
              Targeted Bio-Formulations for Sustained Prime
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-4 py-2 rounded-full bg-white text-[#005420] text-xs uppercase tracking-wider font-bold shadow-sm border border-[#bfc9bc]/30">
              {PRODUCTS.length} Official Formulations Available
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#005420] text-white shadow-md'
                  : 'bg-white/80 text-[#40493f] hover:bg-white hover:text-[#171d1a] border border-[#bfc9bc]/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isAdded = addedAnimationId === product.id;
            const isTrilogy = product.category === 'trilogy-bundle';

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product.id)}
                className={`bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all duration-300 border border-[#bfc9bc]/30 cursor-pointer ${
                  isTrilogy ? 'lg:col-span-2 bg-gradient-to-br from-white to-[#f5fbf5]' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-0.5 rounded-full bg-[#ffdea3]/40 text-[#5d4200] text-[11px] font-bold uppercase tracking-wider">
                      {product.categoryLabel}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-['Plus_Jakarta_Sans'] text-lg text-[#171d1a] font-semibold">
                        ₹{product.price}.00
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#707a6e] line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="w-full aspect-[4/3] bg-[#eff5ef] rounded-2xl flex items-center justify-center p-3 mb-4 group-hover:bg-[#e9efea] transition-colors relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-106 transition-transform duration-500 drop-shadow-md"
                    />
                    {product.sugarFree && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-[9px] text-[#005420] font-semibold shadow-xs">
                        Zero Sugar
                      </span>
                    )}
                  </div>

                  <h3 className="font-['Bodoni_Moda'] text-xl text-[#171d1a] font-semibold group-hover:text-[#005420] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#40493f] mt-1 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#e9efea] text-[#40493f]">
                      {product.flavor}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#e9efea] text-[#40493f]">
                      {product.servings} Servings
                    </span>
                  </div>
                </div>

                <div className="pt-5 mt-auto">
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className={`w-full py-3 px-5 rounded-full text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isAdded
                        ? 'bg-[#1b6e32] text-white shadow-md'
                        : 'bg-[#2c322e] text-[#ecf2ed] hover:bg-[#1b6e32]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">
                      {isAdded ? 'check_circle' : 'add_shopping_cart'}
                    </span>
                    <span>
                      {isAdded ? 'Added to Ritual!' : `Add to Ritual • ₹${product.price}`}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
