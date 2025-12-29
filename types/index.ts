
export interface Destination {
  _id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  price: number;
  description?: string;
  featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  comment: string;
  featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}