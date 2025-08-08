# Deploying to Vercel using CLI

This guide provides step-by-step instructions for deploying your Pro Gallery Uploader application to Vercel using the Vercel CLI.

## Prerequisites

1. Node.js installed on your machine
2. Git installed on your machine
3. A Vercel account (you can sign up at [vercel.com](https://vercel.com))

## Step 1: Install Vercel CLI

Install the Vercel CLI globally on your machine:

```bash
npm install -g vercel
```

## Step 2: Login to Vercel

Authenticate with your Vercel account:

```bash
vercel login
```

Follow the prompts to complete the authentication process.

## Step 3: Configure Environment Variables

Create a `.env` file in your project root with all the required environment variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Step 4: Deploy to Vercel

Navigate to your project directory and run:

```bash
vercel
```

The CLI will guide you through the deployment process with a series of prompts:

1. Set up and deploy? Select `Y`
2. Which scope to deploy to? Select your account or team
3. Link to existing project? Select `N` for a new project
4. What's your project name? Enter a name or press Enter for the default
5. In which directory is your code located? Press Enter for the current directory
6. Want to override the settings? Select `N` to use the settings from vercel.json

## Step 5: Set Environment Variables

After the initial deployment, you need to set up your environment variables:

```bash
vercel env add MONGO_URI
```

Enter your MongoDB connection string when prompted.

Repeat this process for each environment variable:

```bash
vercel env add JWT_SECRET
vercel env add CLOUDINARY_CLOUD_NAME
vercel env add CLOUDINARY_API_KEY
vercel env add CLOUDINARY_API_SECRET
```

## Step 6: Redeploy with Environment Variables

After setting all environment variables, redeploy your application:

```bash
vercel --prod
```

## Step 7: Verify Deployment

Once the deployment is complete, Vercel will provide you with a URL. Visit the URL to ensure your application is working correctly.

## Updating Your Deployment

Whenever you make changes to your code, you can deploy the updates by running:

```bash
vercel --prod
```

## Troubleshooting

1. **Deployment Fails**: Check the Vercel logs for error messages

   ```bash
   vercel logs <deployment-url>
   ```

2. **Environment Variables Not Working**: Verify they are correctly set

   ```bash
   vercel env ls
   ```

3. **Need to Remove an Environment Variable**:

   ```bash
   vercel env rm <environment-variable-name>
   ```

4. **View Deployment Information**:

   ```bash
   vercel list
   ```

5. **Inspect a Specific Deployment**:

   ```bash
   vercel inspect <deployment-url>
   ```