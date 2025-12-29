import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const destinationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  image: z.string().url('Must be a valid URL'),
  rating: z.number().min(0).max(5, 'Rating must be between 0 and 5'),
  price: z.number().positive('Price must be positive'),
  description: z.string().optional(),
  featured: z.boolean().optional(),
});

export const testimonialSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.string().min(2, 'Role must be at least 2 characters'),
  image: z.string().url('Must be a valid URL'),
  rating: z.number().min(0).max(5, 'Rating must be between 0 and 5'),
  comment: z.string().min(10, 'Comment must be at least 10 characters'),
  featured: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type DestinationInput = z.infer<typeof destinationSchema>;
export type TestimonialInput = z.infer<typeof testimonialSchema>;