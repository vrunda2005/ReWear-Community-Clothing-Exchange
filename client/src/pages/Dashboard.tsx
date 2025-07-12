import React from 'react';

const mockUser = {
  name: "Devashree",
  email: "dev@example.com",
  profilePic: "/images/avatar1.png",
  points: 120,
};

const mockListings = [
  { id: 1, title: "Yellow Kurti", image: "/images/product1.jpg" },
  { id: 2, title: "Black Jeans", image: "/images/product2.jpg" },
];

const mockSwaps = [
  { id: 3, title: "Pink Hoodie", image: "/images/product3.jpg" },
  { id: 4, title: "Formal Shirt", image: "/images/product4.jpg" },
];

const UserDashboard = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Welcome, {mockUser.name}</h1>

      {/* Profile Overview */}
      <div className="bg-white shadow p-6 rounded-md flex items-center gap-6 mb-8">
        <img
          src={mockUser.profilePic}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">{mockUser.name}</h2>
          <p className="text-gray-500">{mockUser.email}</p>
          <p className="mt-2 text-sm font-medium">Points Balance: {mockUser.points}</p>
        </div>
      </div>

      {/* My Listings */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">My Listings</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockListings.map((item) => (
            <div key={item.id} className="bg-gray-100 rounded shadow p-2">
              <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded" />
              <p className="text-center mt-2 font-medium">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* My Swaps */}
      <div>
        <h3 className="text-xl font-semibold mb-4">My Swaps</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockSwaps.map((item) => (
            <div key={item.id} className="bg-gray-100 rounded shadow p-2">
              <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded" />
              <p className="text-center mt-2 font-medium">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
