# Vercel Deployment Guide

## Current Issues and Solutions

### 1. App Not Rendering
The app builds successfully but doesn't render. This is likely due to:
- API connection issues (trying to connect to localhost in production)
- Missing environment variables
- Routing configuration issues

### 2. Environment Variables
Make sure to set these in your Vercel dashboard:
- `OPENAI_API_KEY`: Your OpenAI API key
- `NODE_ENV`: Set to `production`

### 3. API Configuration
The app now automatically detects the correct API URL:
- Development: `http://localhost:3001/api/chat`
- Production: `https://your-domain.vercel.app/api/chat`

### 4. Vercel Configuration
The `vercel.json` file is configured to:
- Build the React app as a static site
- Serve the Node.js API at `/api/*` routes
- Route all other requests to the React app

## Debugging Steps

1. **Check Console Logs**: Open browser dev tools and check for errors
2. **Verify Environment Variables**: Ensure `OPENAI_API_KEY` is set in Vercel
3. **Test API Endpoint**: Visit `/api/health` to verify the API is working
4. **Check Build Logs**: Review Vercel build logs for any errors

## Quick Fixes

### If the app still doesn't render:
1. The app now has error boundaries and fallback components
2. Check the browser console for any JavaScript errors
3. Verify that all dependencies are properly installed

### If the API doesn't work:
1. Ensure `OPENAI_API_KEY` is set in Vercel environment variables
2. Check that the server.js file is properly configured
3. Test the API endpoint directly

## Deployment Checklist

- [ ] Set `OPENAI_API_KEY` in Vercel environment variables
- [ ] Ensure `NODE_ENV` is set to `production`
- [ ] Verify the build completes successfully
- [ ] Check that the API endpoint responds at `/api/health`
- [ ] Test the main app functionality

## Troubleshooting

If you're still having issues:
1. Check the browser console for errors
2. Verify the API is responding at `/api/health`
3. Ensure all environment variables are set correctly
4. Check Vercel function logs for API errors 