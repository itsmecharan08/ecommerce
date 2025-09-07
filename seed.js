const mongoose = require('mongoose');
const Item = require('./models/Item');
require('dotenv').config();

const sampleItems = [
  {
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with advanced camera system and A17 Pro chip',
    price: 999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
    stock: 50,
    rating: 4.8,
    reviews: 120
  },
  {
    name: 'Samsung Galaxy S24',
    description: 'Premium Android smartphone with AI-powered features',
    price: 899,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
    stock: 30,
    rating: 4.7,
    reviews: 95
  },
  {
    name: 'Nike Air Max 270',
    description: 'Comfortable running shoes with Max Air cushioning',
    price: 150,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    stock: 100,
    rating: 4.5,
    reviews: 200
  },
  {
    name: 'Adidas Ultraboost 22',
    description: 'High-performance running shoes with Boost technology',
    price: 180,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop',
    stock: 75,
    rating: 4.6,
    reviews: 150
  },
  {
    name: 'The Great Gatsby',
    description: 'Classic American novel by F. Scott Fitzgerald',
    price: 12,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop',
    stock: 200,
    rating: 4.3,
    reviews: 500
  },
  {
    name: 'To Kill a Mockingbird',
    description: 'Harper Lee\'s masterpiece about justice and morality',
    price: 14,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
    stock: 150,
    rating: 4.7,
    reviews: 800
  },
  {
    name: 'Coffee Maker Deluxe',
    description: 'Programmable coffee maker with built-in grinder',
    price: 89,
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
    stock: 40,
    rating: 4.4,
    reviews: 120
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat with carrying strap',
    price: 35,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop',
    stock: 80,
    rating: 4.2,
    reviews: 90
  },
  {
    name: 'Skincare Set',
    description: 'Complete skincare routine with cleanser, toner, and moisturizer',
    price: 65,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=300&h=300&fit=crop',
    stock: 60,
    rating: 4.5,
    reviews: 75
  },
  {
    name: 'LEGO Creator Set',
    description: 'Build and rebuild 3 different models with this creative set',
    price: 45,
    category: 'Toys',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
    stock: 120,
    rating: 4.8,
    reviews: 300
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('Connected to MongoDB');

    // Clear existing items
    await Item.deleteMany({});
    console.log('Cleared existing items');

    // Insert sample items
    await Item.insertMany(sampleItems);
    console.log('Inserted sample items');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
