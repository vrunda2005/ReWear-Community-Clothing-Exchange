import React from 'react';
import { useParams } from 'react-router-dom';

const dummyItem = {
  id: 1,
  title: 'Vintage Denim Jacket',
  description: 'Classic 90s denim jacket in great condition. Lightly used, fits medium-large, made of 100% cotton.',
  images: [
    '/images/featured1.jpg',
    '/images/featured2.jpg',
    '/images/featured3.jpg',
  ],
  uploader: {
    name: 'Aarav Shah',
    email: 'aarav@example.com',
  },
  status: 'Available',
};

const ItemDetail = () => {
  const { id } = useParams(); // For real integration later

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{dummyItem.title}</h1>

      {/* Grid: Images + Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Gallery */}
        <div className="space-y-4">
          {dummyItem.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Item ${i + 1}`}
              className="w-full h-60 object-cover rounded-lg shadow"
            />
          ))}
        </div>

        {/* Details */}
        <div>
          <p className="text-lg mb-4">{dummyItem.description}</p>

          <div className="mb-3">
            <p className="text-sm text-gray-600">
              <strong>Uploaded by:</strong> {dummyItem.uploader.name}
            </p>
            <p className="text-xs text-gray-500">{dummyItem.uploader.email}</p>
          </div>

          <p className="mb-4">
            <strong>Status:</strong>{' '}
            <span className={`font-semibold ${
              dummyItem.status === 'Available' ? 'text-green-600' : 'text-red-500'
            }`}>
              {dummyItem.status}
            </span>
          </p>

          <div className="flex gap-4 mt-6">
            <button className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Request Swap
            </button>
            <button className="px-5 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
              Redeem via Points
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
