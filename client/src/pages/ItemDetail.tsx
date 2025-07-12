import React from 'react';
import { useParams } from 'react-router-dom';

const dummyItem = {
  id: 1,
  title: 'Vintage Denim Jacket',
  description: 'Classic 90s denim jacket in great condition.',
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
  const { id } = useParams(); // Use later for real routing

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{dummyItem.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-4">
          {dummyItem.images.map((src, i) => (
            <img key={i} src={src} alt={`Image ${i}`} className="rounded-md" />
          ))}
        </div>
        <div>
          <p className="text-lg mb-4">{dummyItem.description}</p>
          <p className="mb-2"><strong>Uploaded by:</strong> {dummyItem.uploader.name}</p>
          <p className="mb-4 text-sm text-gray-600">{dummyItem.uploader.email}</p>
          <p className="mb-4"><strong>Status:</strong> <span className="text-green-600">{dummyItem.status}</span></p>

          <div className="space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Request Swap
            </button>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-md">
              Redeem via Points
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
