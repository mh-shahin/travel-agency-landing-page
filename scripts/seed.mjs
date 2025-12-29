import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Resolve project root for .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '../.env.local'),
});

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI not found in .env.local');
  process.exit(1);
}

// Sample seed data
const destinationsData = [
  {
    name: 'Dhaka',
    location: 'Bangladesh',
    image: 'https://images.unsplash.com/photo-1585241645927-c7a8e5840c42?w=800&h=600&fit=crop',
    rating: 4.5,
    price: 299,
    description: 'The vibrant capital city of Bangladesh with rich culture and history',
    featured: true,
  },
  {
    name: 'Paris',
    location: 'Eiffel Tower, France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop',
    rating: 4.8,
    price: 1299,
    description: 'The city of love and lights, home to the iconic Eiffel Tower',
    featured: true,
  },
  {
    name: 'Taj Mahal',
    location: 'Agra, India',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop',
    rating: 4.9,
    price: 899,
    description: 'One of the Seven Wonders of the World, a monument of eternal love',
    featured: true,
  },
  {
    name: 'Dubai',
    location: 'Burj Khalifa, UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    rating: 4.7,
    price: 1599,
    description: 'Modern marvel in the desert with stunning architecture',
    featured: true,
  },
  {
    name: 'New York',
    location: 'Times Square, USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
    rating: 4.6,
    price: 1899,
    description: 'The city that never sleeps, full of energy and opportunities',
    featured: true,
  },
];

const testimonialsData = [
  {
    name: 'John Doe',
    role: 'Travel Blogger',
    image: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    comment: 'Travelo made my trip planning easy. Great destinations and excellent service.',
    featured: true,
  },
  {
    name: 'Sarah Smith',
    role: 'Adventure Enthusiast',
    image: 'https://i.pravatar.cc/150?img=45',
    rating: 5,
    comment: 'Best travel agency experience. Perfect family vacation planning.',
    featured: true,
  },
  {
    name: 'Mike Johnson',
    role: 'Business Traveler',
    image: 'https://i.pravatar.cc/150?img=33',
    rating: 4,
    comment: 'Professional service with great attention to detail. Very satisfied.',
    featured: true,
  },
  {
    name: 'Emma Wilson',
    role: 'Solo Traveler',
    image: 'https://i.pravatar.cc/150?img=47',
    rating: 5,
    comment: 'Felt safe and supported throughout my entire journey.',
    featured: true,
  },
];

// Main Seed Function
async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);

    // Schemas
    const UserSchema = new mongoose.Schema(
      {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        role: { type: String, default: 'admin' },
      },
      { timestamps: true }
    );

    const DestinationSchema = new mongoose.Schema(
      {
        name: { type: String, required: true },
        location: { type: String, required: true },
        image: { type: String, required: true },
        rating: { type: Number, required: true },
        price: { type: Number, required: true },
        description: String,
        featured: { type: Boolean, default: true },
      },
      { timestamps: true }
    );

    const TestimonialSchema = new mongoose.Schema(
      {
        name: { type: String, required: true },
        role: { type: String, required: true },
        image: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        featured: { type: Boolean, default: true },
      },
      { timestamps: true }
    );

    // Models
    const User = mongoose.models.User || mongoose.model('User', UserSchema);
    const Destination =
      mongoose.models.Destination ||
      mongoose.model('Destination', DestinationSchema);
    const Testimonial =
      mongoose.models.Testimonial ||
      mongoose.model('Testimonial', TestimonialSchema);

    // Clear existing
    await User.deleteMany({});
    await Destination.deleteMany({});
    await Testimonial.deleteMany({});

    // Create admin
    const hashedPassword = await bcrypt.hash('Admin@123456', 12);
    await User.create({
      email: 'admin@datasolution360.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
    });

    // Insert seed data
    await Destination.insertMany(destinationsData);
    await Testimonial.insertMany(testimonialsData);

    await mongoose.connection.close();
    process.exit(0);
  } catch {
    console.error('SEED FAILED:', error.message);
    process.exit(1);
  }
}

seed();
