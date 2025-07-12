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

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const fetchItems = async (category?: string) => {
    try {
      setLoading(true);
      const response = await API.get('/items');
      const data = response.data;

      // Filter if category selected
      const filtered = category ? data.filter((item: Item) => item.category === category) : data.slice(0, 6);
      setItems(filtered);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    fetchItems(category);
    document.getElementById('browse')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
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

      {/* Hero */}
      <section className="relative">
        <div className="w-full h-96 bg-gradient-to-r from-green-400 to-blue-500 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Swap, Earn, and Rewear</h1>
          <p className="text-xl mb-6 max-w-2xl">Join the sustainable fashion revolution. Swap clothes, earn points, and give your wardrobe a new life.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {user ? (
              <>
                <Link to="/dashboard" className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">Start Swapping</Link>
                <Link to="/list-item" className="bg-white text-black px-6 py-3 rounded hover:bg-gray-200">List an Item</Link>
              </>
            ) : (
              <>
                <Link to="/signup" className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">Start Swapping</Link>
                <Link to="/login" className="bg-white text-black px-6 py-3 rounded hover:bg-gray-200">Login</Link>
              </>
            )}
            <a href="#browse" className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">Browse Items</a>
          </div>
        </div>
      </section>

      {/* Why ReWear */}
      <section className="py-16 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose ReWear?</h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12">
          ReWear is more than just a clothing exchange platform. We're a community of conscious consumers promoting sustainable fashion.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          {[
            { icon: '♻️', title: 'Sustainable Fashion', desc: 'Reduce waste and give clothes a second life.' },
            { icon: '💰', title: 'Earn Points', desc: 'Earn credits for your contributions.' },
            { icon: '👥', title: 'Community', desc: 'Be part of a like-minded fashion-forward community.' },
          ].map((f, i) => (
            <div key={i} className="text-center">
              <div className="bg-green-100 w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-4 text-2xl">
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 font-medium transition text-center"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured or Filtered Items */}
      <section id="browse" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {selectedCategory ? `Items in “${selectedCategory}”` : 'Featured Items'}
          </h2>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading items...</p>
            </div>
          ) : items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div key={item._id} className="bg-white rounded shadow hover:shadow-md transition overflow-hidden">
                  <img
                    src={item.images[0] || 'https://via.placeholder.com/400x300/CCCCCC/666666?text=No+Image'}
                    alt={item.title}
                    className="h-48 w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x300/CCCCCC/666666?text=No+Image';
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.description.slice(0, 80)}...</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>By {item.uploader.name}</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">{item.condition}</span>
                    </div>
                    <Link
                      to={`/item/${item._id}`}
                      className="mt-3 block bg-green-600 text-white text-center py-2 rounded hover:bg-green-700 transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No items found for this category.</p>
              {user && (
                <Link to="/list-item" className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                  List an Item
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} ReWear. Sustainable fashion for a better tomorrow.
        </div>
      </footer>
    </div>
  );
}
