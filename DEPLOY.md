# Deployment Guide for Malfa Maskn Platform

This guide will help you push your application to GitHub and deploy it to Vercel with the PostgreSQL connection.

## 1. Install Dependencies

Since I could not run `npm install` for you, please run the following command in your terminal to install the new database dependencies:

```bash
npm install
```

## 2. Environment Configuration

### Local Development
To run the project locally with the database connection, create a file named `.env` in the root directory (same level as `package.json`) and add the following content:

```env
DATABASE_URL="postgresql://neondb_owner:npg_BGAQRTy2qKL9@ep-tiny-field-a4yu2zlw-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

> **Note:** The `.env` file is ignored by git to keep your secrets safe. Do not remove it from `.gitignore`.

### Vercel Configuration
When you deploy to Vercel, you must set the Environment Variable in the Vercel Dashboard:

1.  Go to your Project Settings on Vercel.
2.  Select **Environment Variables**.
3.  Add a new variable:
    *   **Key:** `DATABASE_URL`
    *   **Value:** `postgresql://neondb_owner:npg_BGAQRTy2qKL9@ep-tiny-field-a4yu2zlw-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require`

## 3. Push to GitHub

Run the following commands in your terminal to initialize git and push to your repository:

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Prepare for Vercel deployment with Neon DB"

# Add the remote repository
git remote add origin https://github.com/salehBaso/Malfa-V1.git

# Push to the main branch
git push -u origin main
```

## 4. Verification

After deploying to Vercel, you can verify the database connection by visiting the test endpoint:

`https://your-vercel-project-url.vercel.app/api/db-test`

You should see a JSON response with the current timestamp from the database.
