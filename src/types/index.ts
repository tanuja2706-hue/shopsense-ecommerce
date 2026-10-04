export type ProductCategory =
  | 'All'
  | 'For You'
  | 'Electronics'
  | 'Fashion'
  | 'Beauty'
  | 'Home & Living'
  | 'Accessories'
  | 'Mobiles'
  | 'Appliances'
  | 'Lifestyle';

export interface Product {
  id: string;
  name: string;
  category: Exclude<ProductCategory, 'All' | 'For You'>;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  features: string[];
  inStock: boolean;
  isTrending?: boolean;
  isPopular?: boolean;
  isDealOfTheDay?: boolean;
  tag?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  paymentMethod: 'cod' | 'card';
}

export interface PlacedOrder {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  totalAmount: number;
  customer: CheckoutFormData;
}

export type ActivePage = 'home' | 'shop' | 'wishlist' | 'cart' | 'checkout' | 'confirmation';
