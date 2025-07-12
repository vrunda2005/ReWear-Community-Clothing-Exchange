import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

interface Item {
  _id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  condition: string;
  uploader: {
    name: string;
    email: string;
  };
}

const categories = ['Tops', 'T-Shirts', 'Jeans', 'Formals', 'Ethnic-wear'];

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [featuredItems, setFeaturedItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        const response = await API.get('/items');
        // Get first 6 items as featured
        setFeaturedItems(response.data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching featured items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedItems();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="text-2xl font-bold">ReWear</div>
         <nav className="space-x-6 flex items-center">
            <a href="/" className="hover:underline">Home</a>
            <a href="#browse" className="hover:underline">Browse</a>
            <a href="/list-item" className="hover:underline">List an Item</a>
            <a href="/login" className="hover:underline">Login</a>
            <a href="/signup" className="font-semibold hover:underline">Sign Up</a>
            {/* Profile Icon → Dashboard */}
          <a href="/dashboard">
            <img
              src="/images/avatar1.png" // use a placeholder or user's profile image later
              alt="Profile"
              className="w-8 h-8 rounded-full border border-gray-300 hover:scale-105 transition"
            />
          </a>
        </nav>

          <div className="text-2xl font-bold text-green-600">ReWear</div>
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
        <div className="w-full h-96 bg-gradient-to-r from-green-400 to-blue-500 flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
              Swap, Earn, and Rewear
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl">
              Join the sustainable fashion revolution. Swap clothes, earn points, and give your wardrobe a new life while helping the environment.
            </p>
            <div className="space-x-4">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="px-6 py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                  <Link
                    to="/list-item"
                    className="px-6 py-3 bg-white text-black rounded-md font-medium hover:bg-gray-100 transition-colors"
                  >
                    List an Item
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="px-6 py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-colors"
                  >
                    Start Swapping
                  </Link>
                  <Link
                    to="/login"
                    className="px-6 py-3 bg-white text-black rounded-md font-medium hover:bg-gray-100 transition-colors"
                  >
                    Login
                  </Link>
                </>
              )}
              <a
                href="#browse"
                className="px-6 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors"
              >
                Browse Items
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Introduction */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose ReWear?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ReWear is more than just a clothing exchange platform. We're building a community of conscious consumers who believe in sustainable fashion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">♻️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainable Fashion</h3>
              <p className="text-gray-600">Reduce waste and environmental impact by giving clothes a second life.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Earn Points</h3>
              <p className="text-gray-600">Get rewarded for your contributions with our points system.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">Join a community of fashion-conscious individuals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div
                key={cat}
                className="bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg p-6 text-center font-medium transition-colors"
              >
                {cat}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items Carousel */}
      <section id="browse" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Featured Items</h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="mt-2 text-gray-600">Loading featured items...</p>
            </div>
          ) : featuredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredItems.map((item) => (
                <div key={item._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={item.images[0] || '/images/placeholder.jpg'}
                    alt={item.title}
                    className="h-48 w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/placeholder.jpg';
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{item.description.substring(0, 100)}...</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">By {item.uploader.name}</span>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">{item.condition}</span>
                    </div>
                    <Link
                      to={`/item/${item._id}`}
                      className="mt-3 block w-full text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No items available yet. Be the first to list an item!</p>
              {user && (
                <Link
                  to="/list-item"
                  className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  List Your First Item
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} ReWear. All rights reserved.</p>
          <p className="mt-2 text-gray-400">Sustainable fashion for a better tomorrow.</p>
        </div>
      </footer>
    </div>
  );
}
