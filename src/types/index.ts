export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'master-antioxidant' | 'omega-glow' | 'vision-repair' | 'metabolic-reset' | 'trilogy-bundle';
  categoryLabel: string;
  badge: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  image: string;
  sugarFree: boolean;
  vegan: boolean;
  servings: number;
  flavor: string;
  actives: {
    name: string;
    amount: string;
    standardization: string;
  }[];
  benefits: string[];
  intakeTime: string;
  circadianPhase: 'morning' | 'midday' | 'evening' | 'all-day';
  batchNumber: string;
  fssaiNumber: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  isSubscription: boolean;
  subscriptionIntervalWeeks?: number;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    addressLine: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  paymentStatus: 'paid' | 'pending';
  orderStatus: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  isDevelopmentOrder: boolean;
}

export interface BatchCOA {
  batchNumber: string;
  productName: string;
  mfgDate: string;
  expDate: string;
  sampleId: string;
  laboratory: string;
  accreditation: string;
  testedPotency: string;
  heavyMetals: {
    lead: string;
    arsenic: string;
    cadmium: string;
    mercury: string;
    status: 'Passed' | 'Failed';
  };
  microbiological: {
    totalAerobic: string;
    yeastAndMold: string;
    eColi: string;
    salmonella: string;
    status: 'Passed' | 'Failed';
  };
  purityScore: number;
  verifiedAt: string;
}
