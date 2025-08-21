const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'client/build')));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept common file types for bike fitting
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Please upload PDF, image, or spreadsheet files.'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// In-memory storage for orders (in production, use a database)
let orders = [
  {
    id: 1,
    orderNumber: "SADDLE-1703123456789",
    customerName: "Sarah Johnson",
    customerEmail: "sarah.johnson@bikefitter.com",
    bikeShopName: "Johnson's Bike Fitting Studio",
    saddle: {
      id: 2,
      name: "Comfort Plus",
      description: "Padded comfort saddle ideal for long-distance touring and commuting",
      price: 199.99,
      image: "/images/comfort-plus.jpg",
      category: "Comfort"
    },
    fittingFile: "sarah_fitting_data.pdf",
    specialRequirements: "Extra padding for long-distance touring, pressure relief channel",
    status: "In Progress",
    orderDate: "2023-12-20T10:30:00.000Z",
    estimatedCompletion: "2024-01-03T10:30:00.000Z",
    progress: 55,
    notes: [
      {
        id: 1703123456789,
        text: "Initial measurements received and analyzed",
        timestamp: "2023-12-20T10:30:00.000Z"
      },
      {
        id: 1703209856789,
        text: "Saddle base construction completed, starting padding application",
        timestamp: "2023-12-21T14:30:00.000Z"
      }
    ]
  }
];
let orderCounter = 2;

// Saddle designs data
const saddleDesigns = [
  {
    id: 1,
    name: "Racing Pro",
    description: "Lightweight racing saddle with minimal padding for maximum power transfer",
    price: 299.99,
    image: "/images/racing-pro.jpg",
    category: "Racing"
  },
  {
    id: 2,
    name: "Comfort Plus",
    description: "Padded comfort saddle ideal for long-distance touring and commuting",
    price: 199.99,
    image: "/images/comfort-plus.jpg",
    category: "Comfort"
  },
  {
    id: 3,
    name: "Mountain Elite",
    description: "Durable mountain bike saddle with reinforced construction for rough terrain",
    price: 249.99,
    image: "/images/mountain-elite.jpg",
    category: "Mountain"
  },
  {
    id: 4,
    name: "Gravel Adventure",
    description: "Versatile saddle designed for gravel riding and mixed terrain",
    price: 229.99,
    image: "/gravel-adventure.jpg",
    category: "Gravel"
  }
];

// API Routes

// Get all saddle designs
app.get('/api/saddles', (req, res) => {
  res.json(saddleDesigns);
});

// Get saddle by ID
app.get('/api/saddles/:id', (req, res) => {
  const saddle = saddleDesigns.find(s => s.id === parseInt(req.params.id));
  if (!saddle) {
    return res.status(404).json({ message: 'Saddle not found' });
  }
  res.json(saddle);
});

// Create new order
app.post('/api/orders', upload.single('fittingFile'), (req, res) => {
  try {
    const { customerName, customerEmail, saddleId, specialRequirements, bikeShopName } = req.body;
    
    if (!customerName || !customerEmail || !saddleId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const saddle = saddleDesigns.find(s => s.id === parseInt(saddleId));
    if (!saddle) {
      return res.status(400).json({ message: 'Invalid saddle selection' });
    }

    const order = {
      id: orderCounter++,
      orderNumber: `SADDLE-${Date.now()}`,
      customerName,
      customerEmail,
      bikeShopName: bikeShopName || 'Direct Customer',
      saddle: saddle,
      fittingFile: req.file ? req.file.filename : null,
      specialRequirements: specialRequirements || '',
      status: 'Processing',
      orderDate: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days
      progress: 0,
      notes: []
    };

    orders.push(order);
    
    res.status(201).json({
      message: 'Order created successfully',
      order: order
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
});

// Get all orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Get order by ID
app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
});

// Update order status
app.put('/api/orders/:id/status', (req, res) => {
  const { status, progress, notes } = req.body;
  const order = orders.find(o => o.id === parseInt(req.params.id));
  
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  if (status) order.status = status;
  if (progress !== undefined) order.progress = progress;
  if (notes) {
    order.notes.push({
      id: Date.now(),
      text: notes,
      timestamp: new Date().toISOString()
    });
  }

  res.json({ message: 'Order updated successfully', order });
});

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large. Maximum size is 10MB.' });
    }
  }
  res.status(500).json({ message: 'Something went wrong', error: error.message });
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Visit http://localhost:${PORT} to view the application`);
});

