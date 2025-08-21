#!/bin/bash

echo "🚀 MySaddle App Deployment Script"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "server.js" ]; then
    echo "❌ Error: server.js not found. Please run this script from the project root."
    exit 1
fi

if [ ! -d "client" ]; then
    echo "❌ Error: client directory not found. Please run this script from the project root."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building React app..."
cd client
npm install
npm run build
cd ..

echo "✅ Build completed successfully!"
echo ""
echo "📋 Next steps for Render deployment:"
echo "1. Push your code to GitHub"
echo "2. Go to render.com and create a new Web Service"
echo "3. Connect your GitHub repository"
echo "4. Use these settings:"
echo "   - Build Command: npm install"
echo "   - Start Command: node server.js"
echo "   - Plan: Free"
echo ""
echo "🌐 Your app will be live at: https://your-app-name.onrender.com"
echo ""
echo "📚 See DEPLOYMENT.md for detailed instructions"
