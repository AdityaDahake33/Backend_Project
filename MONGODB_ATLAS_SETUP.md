# MongoDB Atlas Setup Guide for Pro Gallery Uploader

## Overview

This guide will help you set up a MongoDB Atlas database for your Pro Gallery Uploader application deployment on Vercel. The Internal Server Error you're experiencing is likely due to using a local MongoDB connection string (`mongodb://0.0.0.0/men-drive`) which won't work on Vercel.

## Step 1: Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and sign up for a free account if you don't have one already.
2. Once logged in, you'll be prompted to create your first cluster.

## Step 2: Create a Cluster

1. Choose the **FREE** tier option (M0 Sandbox).
2. Select your preferred cloud provider (AWS, Google Cloud, or Azure) and region (choose one closest to your users).
3. Click **Create Cluster** (this may take a few minutes to provision).

## Step 3: Set Up Database Access

1. In the left sidebar, click on **Database Access** under the Security section.
2. Click **Add New Database User**.
3. Choose **Password** as the authentication method.
4. Enter a username and password (make sure to save these credentials).
5. Set user privileges to **Read and Write to Any Database**.
6. Click **Add User**.

## Step 4: Set Up Network Access

1. In the left sidebar, click on **Network Access** under the Security section.
2. Click **Add IP Address**.
3. For development and testing, you can click **Allow Access from Anywhere** (not recommended for production).
4. Alternatively, add specific IP addresses that need access.
5. Click **Confirm**.

## Step 5: Get Your Connection String

1. In the left sidebar, click on **Database** under the Deployments section.
2. Click **Connect** on your cluster.
3. Select **Connect your application**.
4. Choose **Node.js** as your driver and the appropriate version.
5. Copy the connection string provided.
6. Replace `<password>` with your database user's password and `<dbname>` with your preferred database name (e.g., `men-drive`).

## Step 6: Update Your Environment Variables on Vercel

1. Go to your Vercel dashboard and select your project.
2. Click on **Settings** > **Environment Variables**.
3. Find the `MONGO_URI` variable and click **Edit**.
4. Replace the current value with your MongoDB Atlas connection string.
5. Click **Save**.

## Step 7: Redeploy Your Application

1. After updating your environment variables, go to the **Deployments** tab.
2. Click on the three dots next to your latest deployment and select **Redeploy**.
3. Wait for the deployment to complete and test your application.

## Troubleshooting

- **Connection Issues**: Ensure your IP is whitelisted in the Network Access settings.
- **Authentication Errors**: Double-check your username and password in the connection string.
- **Database Not Found**: Make sure you've replaced `<dbname>` in the connection string with your actual database name.
- **Timeout Errors**: Check if your cluster is in a region with high latency to your users; consider changing regions.

## Local Development

For local development, you can use either:

1. **Local MongoDB** (as you currently have): Keep `MONGO_URI=mongodb://0.0.0.0/men-drive` in your local `.env` file.

2. **MongoDB Atlas** (recommended for consistency with production): Use your Atlas connection string in your local `.env` file.

By using the same MongoDB Atlas instance for both development and production, you can ensure consistency and avoid deployment issues.