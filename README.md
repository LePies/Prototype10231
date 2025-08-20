# Custom Saddle Fitter - Professional Bike Saddle Customization Service

A modern, professional web application designed specifically for bike fitters and shop owners to order custom bike saddles with fitting file uploads and real-time order tracking.

## 🚴‍♂️ Features

### Core Functionality
- **Saddle Design Selection**: Choose from premium bike saddle designs (Racing, Comfort, Mountain, Gravel)
- **File Upload System**: Upload bike fitting files (PDF, Images, Spreadsheets) for personalized customization
- **Order Management**: Complete order workflow with customer information and special requirements
- **Real-time Tracking**: Monitor order progress with status updates and progress notes
- **Professional Interface**: Designed specifically for bike industry professionals

### Technical Features
- **Full-Stack Application**: React frontend with Node.js/Express backend
- **File Upload Handling**: Secure file uploads with type validation and size limits
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI/UX**: Clean, professional interface with smooth animations
- **Real-time Updates**: Live order status and progress tracking

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js
- **Multer** for file upload handling
- **CORS** enabled for cross-origin requests
- **UUID** for unique file naming

### Frontend
- **React 18** with functional components and hooks
- **React Router** for navigation
- **React Dropzone** for file uploads
- **Axios** for API communication
- **React Icons** for consistent iconography

### Styling
- **CSS3** with modern features (Grid, Flexbox, CSS Variables)
- **Responsive Design** with mobile-first approach
- **Custom Design System** with consistent spacing and colors

## 📁 Project Structure

```
custom-saddle-fitter/
├── server.js                 # Express server entry point
├── package.json             # Backend dependencies
├── uploads/                 # File upload directory
├── client/                  # React frontend
│   ├── public/             # Static assets
│   ├── src/                # Source code
│   │   ├── components/     # React components
│   │   │   ├── Navbar.js   # Navigation component
│   │   │   ├── Home.js     # Landing page
│   │   │   ├── SaddleDesigns.js # Saddle selection
│   │   │   ├── OrderForm.js     # Order form
│   │   │   └── OrderTracking.js # Order tracking
│   │   ├── App.js          # Main app component
│   │   └── index.js        # Entry point
│   └── package.json        # Frontend dependencies
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd custom-saddle-fitter
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Start the development server**
   ```bash
   # Start backend (from root directory)
   npm run dev
   
   # In a new terminal, start frontend (from root directory)
   npm run client
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Production Build

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   cd ..
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 📋 API Endpoints

### Saddles
- `GET /api/saddles` - Get all saddle designs
- `GET /api/saddles/:id` - Get specific saddle by ID

### Orders
- `POST /api/orders` - Create new order (with file upload)
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get specific order by ID
- `PUT /api/orders/:id/status` - Update order status and progress

## 🎯 Usage Guide

### For Bike Fitters & Shop Owners

1. **Browse Saddle Designs**
   - Visit the "Saddle Designs" page
   - Filter by category (Racing, Comfort, Mountain, Gravel)
   - Search for specific features or requirements

2. **Place an Order**
   - Select your preferred saddle design
   - Upload fitting files (PDF, images, or spreadsheets)
   - Fill in customer information
   - Add special requirements or notes
   - Submit the order

3. **Track Orders**
   - Monitor order progress in real-time
   - View detailed order information
   - Update order status and add progress notes
   - Track completion estimates

### File Upload Requirements

- **Accepted Formats**: PDF, JPEG, PNG, CSV, XLS, XLSX
- **Maximum Size**: 10MB per file
- **Recommended Content**: Bike fitting measurements, customer preferences, medical considerations

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
```

### File Upload Settings
File upload configuration can be modified in `server.js`:
- File size limits
- Accepted file types
- Upload directory location

## 🎨 Customization

### Styling
- Modify `client/src/index.css` for global styles
- Component-specific styles are in separate CSS files
- Color scheme and design tokens can be updated in CSS variables

### Saddle Designs
Add new saddle designs by modifying the `saddleDesigns` array in `server.js`:

```javascript
{
  id: 5,
  name: "New Saddle Model",
  description: "Description of the new saddle",
  price: 279.99,
  image: "/images/new-saddle.jpg",
  category: "Custom"
}
```

## 🚀 Deployment

### Heroku
1. Create a Heroku app
2. Set environment variables
3. Deploy using: `git push heroku main`

### Vercel/Netlify
1. Build the frontend: `npm run build`
2. Deploy the `client/build` folder
3. Deploy backend separately (e.g., to Heroku, DigitalOcean, etc.)

### Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- **User Authentication**: Login system for bike shops
- **Database Integration**: Persistent storage with PostgreSQL/MongoDB
- **Payment Processing**: Stripe integration for online payments
- **Email Notifications**: Automated order updates
- **Advanced Analytics**: Order statistics and reporting
- **Mobile App**: React Native mobile application
- **API Documentation**: Swagger/OpenAPI specification

---

**Built with ❤️ for the cycling community**
