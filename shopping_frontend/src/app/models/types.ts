export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
  rating?: number;
  stock?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  address?: string;
  city?: string;
  country?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  status: 'placed' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
}

export interface CheckoutRequest {
  items: Array<{ id: string; quantity: number }>;
  // Client-only: we expect a client secret or URL from backend
}

export interface CheckoutSessionResponse {
  clientSecret?: string;
  checkoutUrl?: string;
  orderId?: string;
}
