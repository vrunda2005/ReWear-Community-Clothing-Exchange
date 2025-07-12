import React from 'react';

const Dashboard = () => {
  // Dummy data for now
  const user = {
    name: 'Devashree',
    email: 'devashree@example.com',
    points: 120,
  };

  const uploadedItems = [
    { id: 1, title: 'Denim Jacket', status: 'Available' },
    { id: 2, title: 'Red Saree', status: 'Swapped' },
  ];

  const swaps = [
    { id: 1, item: 'Blue Kurti', status: 'Ongoing' },
    { id: 2, item: 'Woolen Scarf', status: 'Completed' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>

      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Points:</strong> {user.points}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Uploaded Items</h2>
        <ul className="space-y-2">
          {uploadedItems.map(item => (
            <li key={item.id} className="p-2 bg-gray-100 rounded-md">
              {item.title} — <span className="text-sm italic">{item.status}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Your Swaps</h2>
        <ul className="space-y-2">
          {swaps.map(swap => (
            <li key={swap.id} className="p-2 bg-gray-100 rounded-md">
              {swap.item} — <span className="text-sm italic">{swap.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
