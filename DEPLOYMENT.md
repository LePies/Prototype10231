# MySaddle App Deployment Guide - Render

This guide will help you deploy your MySaddle application to Render for free.

## Prerequisites

1. **GitHub Account**: Your code should be in a GitHub repository
2. **Render Account**: Sign up at [render.com](https://render.com)

## Step 1: Prepare Your Repository

Make sure your repository has this structure:
```
/
├── server.js
├── package.json
├── client/
│   ├── package.json
│   ├── src/
│   └── public/
├── uploads/
└── README.md
```

## Step 2: Deploy to Render (Single Service)

**Important**: Deploy as a single Web Service, not separate frontend/backend services.

1. **Go to [render.com](https://render.com) and sign in**
2. **Click "New +" and select "Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service:**
   - **Name**: `mysaddle-app`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node server.js`
   - **Plan**: `Free`

5. **Add Environment Variables:**
   - `NODE_ENV`: `production`
   - `PORT`: `10000`

6. **Click "Create Web Service"**

## How It Works

Your application is now set up as a **full-stack service** where:
- **Backend API**: Handles all `/api/*` routes
- **Frontend**: Serves the React app from the built files
- **Single URL**: Everything runs from one service (e.g., `https://mysaddle-app.onrender.com`)

## Step 3: Test Your Deployment

1. **Wait for the build to complete** (this may take 5-10 minutes)
2. **Visit your service URL** (e.g., `https://mysaddle-app.onrender.com`)
3. **Test the functionality**:
   - Navigate between pages
   - Try to place an order
   - Check if the API calls work

## Important Notes

### Free Tier Limitations
- **Service**: 750 hours/month (usually enough for small apps)
- **Sleep Mode**: Service may sleep after 15 minutes of inactivity
- **Build Time**: First build may take longer due to npm install

### File Uploads
- Render's free tier has limited file storage
- Consider using cloud storage (AWS S3, Cloudinary) for production

### Database
- Current setup uses in-memory storage (data resets on restart)
- For production, use a proper database (MongoDB Atlas, PostgreSQL)

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check if all dependencies are in package.json
   - Ensure Node.js version compatibility (>=16.0.0)

2. **"API is building" Message**:
   - This is normal during the first deployment
   - Wait for the build to complete
   - Check the build logs in Render dashboard

3. **API Errors**:
   - Verify CORS settings
   - Check environment variables

### Build Process
The deployment process:
1. **Install Dependencies**: `npm install`
2. **Build React App**: `cd client && npm install && npm run build`
3. **Start Server**: `node server.js`
4. **Serve Files**: Server serves both API and React frontend

## Support
- Render Documentation: [docs.render.com](https://docs.render.com)
- Render Community: [community.render.com](https://community.render.com)

## Next Steps

After successful deployment:
1. **Set up a custom domain** (optional)
2. **Configure monitoring and alerts**
3. **Set up automatic deployments** from your main branch
4. **Consider upgrading to paid plans** for production use

Your MySaddle app will now be live on the internet! 🚀
