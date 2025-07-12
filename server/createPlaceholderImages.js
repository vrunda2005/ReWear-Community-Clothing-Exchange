const fs = require('fs');
const path = require('path');

// Create simple HTML-based placeholder images
const createPlaceholderImage = (filename, title, color = '#4CAF50') => {
  const html = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, ${color}, #2196F3);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 300px;
            text-align: center;
        }
        .content {
            background: rgba(0,0,0,0.3);
            padding: 30px;
            border-radius: 10px;
            backdrop-filter: blur(10px);
        }
        h1 {
            margin: 0 0 10px 0;
            font-size: 24px;
        }
        p {
            margin: 0;
            font-size: 16px;
            opacity: 0.9;
        }
    </style>
</head>
<body>
    <div class="content">
        <h1>${title}</h1>
        <p>Sample Image</p>
    </div>
</body>
</html>`;

  // Save as HTML file (we'll use this as a placeholder)
  fs.writeFileSync(path.join(__dirname, 'uploads', filename.replace('.jpg', '.html')), html);
  console.log(`Created placeholder for ${filename}`);
};

// Create placeholder images for our sample items
const placeholders = [
  { filename: 'denim-jacket-1.jpg', title: 'Vintage Denim Jacket', color: '#2196F3' },
  { filename: 'formal-shirt-1.jpg', title: 'Black Formal Shirt', color: '#000000' },
  { filename: 'floral-dress-1.jpg', title: 'Summer Floral Dress', color: '#E91E63' },
  { filename: 'tshirt-1.jpg', title: 'White T-Shirt', color: '#FFFFFF' },
  { filename: 'handbag-1.jpg', title: 'Leather Handbag', color: '#795548' },
  { filename: 'jeans-1.jpg', title: 'Blue Jeans', color: '#2196F3' }
];

placeholders.forEach(item => {
  createPlaceholderImage(item.filename, item.title, item.color);
});

console.log('Placeholder images created successfully!');
console.log('Note: These are HTML files that can be opened in a browser to see the placeholder images.'); 