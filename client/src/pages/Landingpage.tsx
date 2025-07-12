import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const categories = ['Tops', 'T-Shirts', 'Jeans', 'Formals', 'Ethnic-wear'];
const featuredItems = [
  { id: 1, title: 'Vintage Jacket', image: '/images/featured1.jpg' },
  { id: 2, title: 'Denim Jeans', image: '/images/featured2.jpg' },
  { id: 3, title: 'Summer Dress', image: '/images/featured3.jpg' },
];
const products = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  image: `/images/product${(i % 4) + 1}.jpg`,
}));

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="text-2xl font-bold">ReWear</div>
          <nav className="space-x-6">
            <a href="#" className="hover:underline">Home</a>
            <a href="#browse" className="hover:underline">Browse</a>
            {user ? (
              <>
                <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                <Link to="/list-item" className="hover:underline">List an Item</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:underline">Login</Link>
                <Link to="/signup" className="font-semibold hover:underline">Sign Up</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero & Search */}
      <section className="relative">
        <img
          src="/images/hero.jpg"
          alt="Hero"
          className="w-full h-72 object-cover filter grayscale"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
            Swap, Earn, and Rewear
          </h1>
          <div className="space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-6 py-3 bg-black text-white rounded-md font-medium"
                >
                  Go to Dashboard
                </Link>
                <Link
                  to="/list-item"
                  className="px-6 py-3 bg-white text-black rounded-md font-medium"
                >
                  List an Item
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="px-6 py-3 bg-black text-white rounded-md font-medium"
                >
                  Start Swapping
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-3 bg-white text-black rounded-md font-medium"
                >
                  Login
                </Link>
              </>
            )}
            <a
              href="#browse"
              className="px-6 py-3 bg-green-600 text-white rounded-md font-medium"
            >
              Browse Items
            </a>
          </div>
          <div className="mt-6 w-full max-w-xl">
            <input
              type="text"
              placeholder="Search for items..."
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div
                key={cat}
                className="bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg p-6 text-center font-medium"
              >
                {cat}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Carousel */}
      <section id="browse" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Featured Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-48 w-full object-cover filter grayscale"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Listings */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">All Items</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((prod) => (
              <div key={prod.id} className="bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="h-40 w-full object-cover filter grayscale"
                />
                <div className="p-3">
                  <h4 className="text-md font-medium">{prod.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} ReWear. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
