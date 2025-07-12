import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';

interface SwapItem {
  id: number;
  title: string;
  image: string;
  user: string;
}

const demoItems: SwapItem[] = [
  { id: 1, title: 'Vintage Jacket', image: '/images/featured1.jpg', user: 'Alice' },
  { id: 2, title: 'Denim Jeans', image: '/images/featured2.jpg', user: 'Bob' },
  { id: 3, title: 'Ethnic Kurta', image: '/images/featured3.jpg', user: 'Charlie' },
];

const SwapSwiper: React.FC = () => {
  const [items, setItems] = useState<SwapItem[]>(demoItems);
  const [swapped, setSwapped] = useState<SwapItem | null>(null);

  const handleSwipe = (direction: string, item: SwapItem): void => {
    if (direction === 'right') {
      // Simulate mutual swap
      setSwapped(item);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Swap confirmation modal */}
      {swapped && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">It's a Swap!</h2>
            <p className="mb-6">
              You and {swapped.user} agreed to swap <strong>{swapped.title}</strong>.
            </p>
            <button
              onClick={() => setSwapped(null)}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Card stack */}
      <div className="w-full max-w-md relative" style={{ height: '500px' }}>
        {items.length > 0 ? (
          items.map((item) => (
            <TinderCard
              key={item.id}
              onSwipe={(dir) => handleSwipe(dir, item)}
              preventSwipe={['up', 'down']}
            >
              <div className="absolute bg-white rounded-xl shadow-lg overflow-hidden" style={{ width: '100%', height: '100%' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-64 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-600">Owner: {item.user}</p>
                </div>
              </div>
            </TinderCard>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-64">No more items to swipe.</p>
        )}
      </div>
    </div>
  );
};

export default SwapSwiper;
