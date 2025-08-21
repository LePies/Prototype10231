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

## Step 2: Deploy Backend to Render

1. **Go to [render.com](https://render.com) and sign in**
2. **Click "New +" and select "Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service:**
   - **Name**: `mysaddle-backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: `Free`

5. **Add Environment Variables:**
   - `NODE_ENV`: `production`
   - `PORT`: `10000`

6. **Click "Create Web Service"**

## Step 3: Deploy Frontend to Render

1. **Click "New +" again and select "Static Site"**
2. **Connect the same GitHub repository**
3. **Configure the service:**
   - **Name**: `mysaddle-frontend`
   - **Build Command**: `cd client && npm install && npm run build`
   - **Publish Directory**: `client/build`
   - **Plan**: `Free`

4. **Add Environment Variable:**
   - `REACT_APP_API_URL`: `https://your-backend-name.onrender.com`

5. **Click "Create Static Site"**

## Step 4: Update API URLs

Once deployed, update your frontend to use the new API URL:

1. **Go to your backend service on Render**
2. **Copy the URL** (e.g., `https://mysaddle-backend.onrender.com`)
3. **Go to your frontend service**
4. **Update the environment variable** `REACT_APP_API_URL` with your backend URL

## Step 5: Test Your Deployment

1. **Visit your frontend URL** (e.g., `https://mysaddle-frontend.onrender.com`)
2. **Test the functionality**:
   - Navigate between pages
   - Try to place an order
   - Check if the API calls work

## Important Notes

### Free Tier Limitations
- **Backend**: 750 hours/month (usually enough for small apps)
- **Frontend**: 100GB bandwidth/month
- **Sleep Mode**: Backend may sleep after 15 minutes of inactivity

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
   - Ensure Node.js version compatibility

2. **API Errors**:
   - Verify CORS settings
   - Check environment variables

3. **Static Files Not Loading**:
   - Ensure build command runs successfully
   - Check publish directory path

### Support
- Render Documentation: [docs.render.com](https://docs.render.com)
- Render Community: [community.render.com](https://community.render.com)

## Next Steps

After successful deployment:
1. **Set up a custom domain** (optional)
2. **Configure monitoring and alerts**
3. **Set up automatic deployments** from your main branch
4. **Consider upgrading to paid plans** for production use

Your MySaddle app will now be live on the internet! 🚀
