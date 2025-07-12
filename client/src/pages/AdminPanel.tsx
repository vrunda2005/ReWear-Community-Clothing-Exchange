import React from 'react';

const dummyUsers = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    profilePic: "/images/avatar1.png",
    listings: 5,
    swaps: 2,
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
    profilePic: "/images/avatar2.png",
    listings: 3,
    swaps: 1,
  },
];

const AdminPanel = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <div className="flex gap-4 mb-6">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Manage Users</button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md">Manage Orders</button>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-md">Manage Listings</button>
      </div>

      <div className="space-y-4">
        {dummyUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between bg-white p-4 rounded shadow">
            <div className="flex items-center gap-4">
              <img
                src={user.profilePic}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-xs text-gray-500">
                  Listings: {user.listings} | Swaps: {user.swaps}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button className="bg-yellow-500 px-3 py-1 text-white rounded text-sm">
                Approve Listing
              </button>
              <button className="bg-red-500 px-3 py-1 text-white rounded text-sm">
                Remove User
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
