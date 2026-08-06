# Skillwrap Full-Stack Setup & Deployment Guide

This guide explains how to extract, run, and deploy the Skillwrap application. The current codebase is organized as a monorepo containing both the frontend (React) and backend (Express) in a single repository for easy development, but it can be deployed either as a single full-stack app or split into two separate deployments.

## Step 1: Extracting the Project
1. Download the project as a ZIP file or export it to GitHub using the AI Studio menu.
2. Extract the ZIP file to a folder on your computer.

## Step 2: Open in VS Code
1. Open VS Code.
2. Go to `File > Open Folder` and select the extracted project folder.

## Step 3: Install Dependencies
Open a terminal in VS Code (`Ctrl + \``) and run:
```bash
npm install
```

## Step 4: Environment Variables
Create a `.env` file in the root directory. Copy the contents of `.env.example` into `.env` and fill in the values:

- `MONGODB_URI`: Your MongoDB connection string (e.g., `mongodb+srv://...`). Used to connect to the database.
- `JWT_SECRET`: A long random string used to sign authentication cookies.
- `STRIPE_SECRET_KEY`: Your Stripe secret key for backend payment processing.
- `VITE_STRIPE_PUBLIC_KEY`: Your Stripe public key for the frontend.
- `APP_URL`: The URL of your frontend (e.g., `http://localhost:3000` for local development).

## Step 5: Run Locally
To run both the frontend and backend together locally:
```bash
npm run dev
```
The app will be available at `http://localhost:3000`. The Express server runs on the same port and proxies the API requests under `/api/*`.

## Step 6: Test APIs
You can test the APIs using Postman or your browser by navigating to `http://localhost:3000/api/health`.

## Step 7-9: GitHub Setup
To push the repository to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/skillwrap.git
git push -u origin main
```

## Step 10 & 11: Deployment (Vercel / Render)
While you can split the codebase into two repositories, the easiest way to deploy this full-stack application is to deploy it as a single Node.js application (since the backend serves the built frontend).

**Deploying to Render (Recommended for Full-Stack):**
1. Create a new Web Service on Render.com.
2. Connect your GitHub repository.
3. Build Command: `npm run build`
4. Start Command: `npm start`
5. Add your Environment Variables (MongoDB URI, JWT Secret, etc.).
6. Deploy!

**Deploying Frontend to Vercel & Backend to Render:**
If you strictly want to separate them:
1. **Frontend (Vercel)**: Import the repo, set the Build Command to `vite build`, Output Directory to `dist`. Add `VITE_` env vars. You will need to change the `axios` base URL in the code to point to your backend URL instead of relative paths.
2. **Backend (Render)**: Set the Build Command to `npm run build` and Start Command to `node dist/server.cjs`.

## Step 12: Connecting Frontend and Backend
If you deployed them separately, update the frontend's API calls to point to the backend URL. You can do this by creating an Axios instance or setting a base URL in `src/App.tsx`.

## Step 13: Connecting MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free cluster.
2. Under "Database Access", create a user with a password.
3. Under "Network Access", allow access from anywhere (`0.0.0.0/0`).
4. Click "Connect" on your cluster, choose "Connect your application", and copy the connection string.
5. Paste it into your `.env` file as `MONGODB_URI`.

## Step 14: Production Checklist
- [ ] MongoDB URI is correct and IP access is configured.
- [ ] JWT_SECRET is a strong, random string.
- [ ] Stripe keys are using production live keys (if ready).
- [ ] HTTPS is enabled on your hosting provider.
- [ ] No `.env` files are committed to GitHub.

## Step 15: Troubleshooting
- **CORS Error**: Ensure your backend `cors` configuration allows the frontend origin. In `server.ts`, update `app.use(cors({ origin: 'YOUR_FRONTEND_URL', credentials: true }));`.
- **404 API Not Found**: Ensure you are calling `/api/...` and that the backend server is running.
- **MongoDB Connection Failed**: Check if your IP is whitelisted in MongoDB Atlas and the username/password in the URI are correct.
- **Authentication Failed**: Ensure cookies are being sent with requests. Axios must have `withCredentials: true` configured (which is handled by default in this app's setup if on the same domain).

# Admin Account Credentials

By default, the application seeds an admin account if the database is empty:
- **Email**: `admin@skillwrap.com`
- **Password**: `admin@skillwrap.com`

**Important**: Log in with these credentials immediately and change the password, or delete the seeded user and create a new one manually in MongoDB.

Authentication uses JWT tokens stored in HttpOnly cookies, providing secure, persistent sessions.
