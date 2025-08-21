const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting MySaddle build process...');

try {
  // Check if client directory exists
  if (!fs.existsSync('client')) {
    throw new Error('Client directory not found');
  }

  console.log('📦 Installing client dependencies...');
  execSync('cd client && npm install', { stdio: 'inherit' });

  console.log('🔨 Building React app...');
  execSync('cd client && npm run build', { stdio: 'inherit' });

  // Check if build was successful
  const buildPath = path.join(__dirname, 'client/build');
  if (!fs.existsSync(buildPath)) {
    throw new Error('Build directory not created');
  }

  const indexPath = path.join(buildPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    throw new Error('index.html not found in build directory');
  }

  console.log('✅ Build completed successfully!');
  console.log(`📁 Build directory: ${buildPath}`);
  console.log(`📄 Index file: ${indexPath}`);

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
