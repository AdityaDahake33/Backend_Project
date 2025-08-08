# Troubleshooting Guide for Pro Gallery Uploader

## Internal Server Error on Vercel Deployment

If you're encountering an "Internal Server Error" after deploying your application to Vercel, follow these steps to diagnose and fix the issue:

### 1. Check MongoDB Connection

**The most common cause of Internal Server Error is an invalid MongoDB connection string.**

#### Problem:
- Your local `.env` file contains `MONGO_URI = mongodb://0.0.0.0/men-drive`, which works locally but not on Vercel.
- Vercel cannot connect to a local MongoDB instance.

#### Solution:
1. Create a MongoDB Atlas account and set up a cloud database (see `MONGODB_ATLAS_SETUP.md` for detailed instructions).
2. Get your MongoDB Atlas connection string, which looks like:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   ```
3. Update the `MONGO_URI` environment variable in your Vercel project settings.

### 2. Check Vercel Logs

Vercel provides detailed logs that can help identify the source of the error:

1. Go to your Vercel dashboard
2. Select your project
3. Click on "Deployments"
4. Select your latest deployment
5. Click on "Functions" or "Logs"
6. Look for error messages that might indicate the source of the problem

### 3. Verify Environment Variables

Ensure all required environment variables are set correctly in Vercel:

1. Go to your Vercel project settings
2. Click on "Environment Variables"
3. Verify that the following variables are set:
   - `MONGO_URI` (MongoDB Atlas connection string)
   - `JWT_SECRET` (Secret key for JWT token generation)
   - `CLOUDINARY_CLOUD_NAME` (Your Cloudinary cloud name)
   - `CLOUDINARY_API_KEY` (Your Cloudinary API key)
   - `CLOUDINARY_API_SECRET` (Your Cloudinary API secret)

### 4. Check Cloudinary Configuration

If your MongoDB connection is working but you're still seeing errors, check your Cloudinary setup:

1. Verify your Cloudinary credentials in the Vercel environment variables
2. Ensure your Cloudinary account is active and not restricted
3. Check if you've exceeded your Cloudinary plan limits

### 5. Test Locally with Production Settings

Test your application locally with the same settings you're using in production:

1. Update your local `.env` file to use the MongoDB Atlas connection string
2. Run your application locally
3. If it works locally but not on Vercel, the issue might be related to Vercel's environment

### 6. Check for Node.js Version Compatibility

Vercel uses Node.js 18.x by default. If your code uses features not supported in this version:

1. Check your `package.json` for the `engines` field
2. Add or update it to specify a compatible Node.js version:
   ```json
   "engines": {
     "node": ">=18.0.0"
   }
   ```

### 7. Debugging with Custom Error Pages

The application now includes a custom error page that will display more information about errors:

1. Set `NODE_ENV=development` in your Vercel environment variables temporarily
2. Redeploy your application
3. When you encounter the error, you should see more detailed information
4. **Remember to remove or change this setting back to `production` after debugging**

### 8. Common Error Scenarios and Solutions

#### MongoDB Connection Errors

- **Error**: "MongoNetworkError: failed to connect to server"
  - **Solution**: Check if your MongoDB Atlas IP whitelist includes Vercel's IPs or is set to allow access from anywhere

- **Error**: "MongoError: Authentication failed"
  - **Solution**: Verify your MongoDB Atlas username and password in the connection string

#### Cloudinary Errors

- **Error**: "Error: Cloudinary configuration not found"
  - **Solution**: Check that all Cloudinary environment variables are set correctly

- **Error**: "Error: Invalid Cloudinary credentials"
  - **Solution**: Verify your Cloudinary API key and secret

### 9. Last Resort: Simplify and Rebuild

If you're still encountering issues:

1. Create a simplified version of your application with just the basic functionality
2. Deploy this simplified version to Vercel
3. Gradually add back features until you identify what's causing the error

### Need More Help?

If you've tried all these steps and are still experiencing issues, consider:

1. Posting on [Stack Overflow](https://stackoverflow.com/) with the tags "vercel", "mongodb", and "node.js"
2. Checking the [Vercel documentation](https://vercel.com/docs) for specific deployment issues
3. Contacting Vercel support if you believe it's a platform-specific issue