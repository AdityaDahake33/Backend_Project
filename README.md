# Pro Gallery Uploader

A Node.js application for uploading and managing images with user authentication.

## Features

- User registration and login
- Image upload to Cloudinary
- Gallery view of uploaded images
- Download and delete functionality

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- EJS Templates
- Cloudinary for image storage
- JWT for authentication

## Deployment to Vercel

### Prerequisites

1. [GitHub account](https://github.com/)
2. [Vercel account](https://vercel.com/) (you can sign up with your GitHub account)
3. [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas) for database
4. [Cloudinary account](https://cloudinary.com/) for image storage

### Step 1: Prepare Your Environment Variables

You'll need the following environment variables for deployment:

- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Your Cloudinary API key
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret

### Step 2: Deploy to Vercel

1. Push your code to GitHub if you haven't already

2. Log in to [Vercel](https://vercel.com/)

3. Click on "Add New..." > "Project"

4. Import your GitHub repository

5. Configure the project:
   - Framework Preset: Select "Other"
   - Build Command: Leave empty (Vercel will use the settings in vercel.json)
   - Output Directory: Leave empty
   - Install Command: `npm install`

6. Add Environment Variables:
   - Click on "Environment Variables"
   - Add all the variables listed in Step 1

7. Click "Deploy"

### Step 3: Verify Deployment

1. Once deployment is complete, Vercel will provide you with a URL

2. Visit the URL to ensure your application is working correctly

3. Test the login, registration, and image upload functionality

### Troubleshooting

If you encounter issues with your deployment:

1. Check the Vercel deployment logs for errors

2. Verify that all environment variables are correctly set

3. Ensure your MongoDB Atlas cluster is configured to accept connections from any IP address (or specifically from Vercel's IPs)

4. Check that your Cloudinary credentials are correct

## Local Development

1. Clone the repository

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the required environment variables (see `.env.example`)

4. Run the development server:
   ```
   npm run dev
   ```

5. Visit `http://localhost:3000` in your browser