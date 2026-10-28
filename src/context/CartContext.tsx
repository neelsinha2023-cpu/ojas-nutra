import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Order, Product } from '../types';
import { PRODUCTS } from '../data/products';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, isSubscription?: boolean) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleSubscription: (productId: string) => void;
  clearCart: () => void;
  subtotal: number;
  discount: number;
  discountCode: string;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  shipping: number;
  freeShippingThreshold: number;
  total: number;
  totalQuantity: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  orders: Order[];
  placeOrder: (customer: Order['customer'], paymentMethod: Order['paymentMethod']) => Promise<Order>;
  recentNotification: string | null;
  clearNotification: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'ojasnutra_cart_v1';
const ORDERS_STORAGE_KEY = 'ojasnutra_orders_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate with current trusted products data
        return parsed.filter((item: CartItem) =>
          PRODUCTS.some((p) => p.id === item.product.id)
        );
      }
    } catch {
      // Fallback
    }
    // Initial sample item so the approved 4-count or realistic cart can be reviewed, or default 1 flagship item
    const defaultGlutathione = PRODUCTS.find(p => p.id === 'liposomal-glutathione-gummies') || PRODUCTS[0];
    return [
      { product: defaultGlutathione, quantity: 1, isSubscription: false }
    ];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [discountCode, setDiscountCode] = useState<string>('');
  const [promoDiscountPercent, setPromoDiscountPercent] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [recentNotification, setRecentNotification] = useState<string | null>(null);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Could not save cart:', e);
    }
  }, [items]);

  // Save orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Could not save orders:', e);
    }
  }, [orders]);

  const addToCart = (product: Product, quantity = 1, isSubscription = false) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, isSubscription: isSubscription || item.isSubscription }
            : item
        );
      }
      return [...prev, { product, quantity, isSubscription }];
    });

    setRecentNotification(`Added ${quantity}× ${product.name} to your ritual.`);
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleSubscription = (productId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, isSubscription: !item.isSubscription }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setDiscountCode('');
    setPromoDiscountPercent(0);
  };

  const applyPromoCode = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'OJAS15' || trimmed === 'CIRCLE15') {
      setDiscountCode(trimmed);
      setPromoDiscountPercent(15);
      return { success: true, message: 'Privilege Member Code applied: 15% off your order.' };
    }
    if (trimmed === 'CELLULAR10' || trimmed === 'WELCOME10') {
      setDiscountCode(trimmed);
      setPromoDiscountPercent(10);
      return { success: true, message: 'First Ritual Code applied: 10% off your order.' };
    }
    return { success: false, message: 'Invalid or expired code. Try "OJAS15" or "CELLULAR10".' };
  };

  const removePromoCode = () => {
    setDiscountCode('');
    setPromoDiscountPercent(0);
  };

  const clearNotification = () => {
    setRecentNotification(null);
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => {
    const unitPrice = item.isSubscription
      ? Math.round(item.product.price * 0.85) // 15% subscription privilege
      : item.product.price;
    return sum + unitPrice * item.quantity;
  }, 0);

  const discount = Math.round((subtotal * promoDiscountPercent) / 100);
  const freeShippingThreshold = 750;
  const shipping = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : 99;
  const total = Math.max(0, subtotal - discount + shipping);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const placeOrder = async (
    customer: Order['customer'],
    paymentMethod: Order['paymentMethod']
  ): Promise<Order> => {
    // Trusted server-like order compilation
    const orderNumber = `OJAS-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: orderNumber,
      createdAt: new Date().toISOString(),
      items: [...items],
      subtotal,
      discount,
      shipping,
      total,
      customer,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'confirmed',
      isDevelopmentOrder: true,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
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
        orders,
        placeOrder,
        recentNotification,
        clearNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
