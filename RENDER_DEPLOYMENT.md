# Complete Deployment Guide for Render

## Prerequisites
- GitHub account with your code pushed
- MongoDB Atlas account (free tier)
- Render account (free tier available)

---

## Part 1: Set Up MongoDB Atlas (Database)

### 1. Create MongoDB Atlas Cluster
1. Go to https://cloud.mongodb.com
2. Sign up or log in
3. Create a **FREE** M0 cluster
4. Choose a cloud provider and region (closest to you)
5. Cluster name: `MyDictionary`

### 2. Create Database User
1. Go to **Database Access**
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Username: `mydictionary_user`
5. Password: Generate a secure password (save it!)
6. Database User Privileges: **Read and write to any database**

### 3. Whitelist IP Address
1. Go to **Network Access**
2. Click **Add IP Address**
3. Choose **Allow Access from Anywhere** (0.0.0.0/0)
4. Confirm

### 4. Get Connection String
1. Go to **Database** → Click **Connect**
2. Choose **Connect your application**
3. Driver: **Node.js**
4. Copy the connection string:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/dictionary?retryWrites=true&w=majority
```
5. Replace `<username>` and `<password>` with your credentials
6. Make sure `/dictionary` database name is included

---

## Part 2: Deploy Backend to Render

### 1. Create Web Service
1. Go to https://render.com
2. Sign up/log in with GitHub
3. Click **New** → **Web Service**
4. Connect your GitHub repository: `MyDictionary`

### 2. Configure Web Service
Fill in these settings:

- **Name**: `mydictionary-backend`
- **Region**: Choose closest region
- **Branch**: `main`
- **Root Directory**: Leave blank (deploy from root)
- **Runtime**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Instance Type**: Free

**CRITICAL**: 
- Leave Root Directory BLANK - the scripts handle navigation to backend
- Build Command: `npm install && npm run build`
- Start Command: `npm start`

### 3. Add Environment Variables
Click **Advanced** → **Add Environment Variable**

Add these variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `PORT` | `4000` |
| `FRONTEND_URL` | `https://YOUR-FRONTEND.vercel.app` (update later) |
| `OXFORD_API_KEY` | `36380c934e642509372eb4306400c94f` |
| `OXFORD_API_URL` | `https://od-api-sandbox.oxforddictionaries.com/api/v2` |

### 4. Deploy
1. Click **Create Web Service**
2. Wait for deployment (5-10 minutes)
3. Your backend URL will be: `https://mydictionary-backend.onrender.com`
4. Save this URL!

### 5. Seed Database
Once deployed, go to **Shell** tab in Render dashboard:
```bash
npm run seed
```

---

## Part 3: Deploy Frontend to Vercel

### 1. Install Vercel CLI (Optional)
```powershell
npm install -g vercel
```

### 2. Deploy via Vercel Dashboard (Recommended)
1. Go to https://vercel.com
2. Sign up/log in with GitHub
3. Click **Add New** → **Project**
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 3. Add Environment Variables
In Vercel project settings → **Environment Variables**:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_GRAPHQL_URL` | `https://mydictionary-backend.onrender.com/graphql` |
| `NEXT_PUBLIC_API_URL` | `https://mydictionary-backend.onrender.com` |

### 4. Deploy
1. Click **Deploy**
2. Wait for build (2-5 minutes)
3. Your frontend URL: `https://your-project.vercel.app`

---

## Part 4: Update Backend CORS

### Update Backend Environment Variable
1. Go back to Render dashboard
2. Select your backend service
3. Go to **Environment**
4. Update `FRONTEND_URL` to your Vercel URL:
   ```
   https://your-project.vercel.app
   ```
5. Click **Save Changes**
6. Service will auto-redeploy

---

## Part 5: Verify Deployment

### Test Backend
1. Open: `https://mydictionary-backend.onrender.com/graphql`
2. You should see GraphQL Playground
3. Try query:
```graphql
query {
  words {
    id
    word
    definition
  }
}
```

### Test Frontend
1. Open your Vercel URL
2. Try searching for words
3. Add a new word
4. Test all features

---

## Troubleshooting

### Backend Issues

**Check Logs:**
```
Render Dashboard → Your Service → Logs
```

**Common Issues:**
- MongoDB connection timeout → Check Network Access whitelist
- Environment variables not set → Verify all required variables
- Build fails → Check package.json scripts

### Frontend Issues

**Check Build Logs:**
```
Vercel Dashboard → Your Project → Deployments → View Build Logs
```

**Common Issues:**
- API connection fails → Check environment variables
- GraphQL errors → Verify backend URL is correct
- CORS errors → Update FRONTEND_URL in backend

---

## Important URLs to Save

- **Backend (Render)**: https://mydictionary-backend.onrender.com
- **GraphQL Playground**: https://mydictionary-backend.onrender.com/graphql
- **Frontend (Vercel)**: https://your-project.vercel.app
- **MongoDB Atlas**: https://cloud.mongodb.com

---

## Free Tier Limitations

### Render (Free Tier)
- Service spins down after 15 minutes of inactivity
- First request after spin-down takes 30-50 seconds
- 750 hours/month free

### MongoDB Atlas (Free Tier)
- 512 MB storage
- Shared RAM
- No backup
- Sufficient for development/small projects

### Vercel (Free Tier)
- 100 GB bandwidth/month
- Unlimited deployments
- Serverless functions

---

## Continuous Deployment

Both Render and Vercel automatically deploy when you push to GitHub:

```powershell
git add .
git commit -m "Update feature"
git push origin main
```

- Vercel: Deploys immediately (2-3 minutes)
- Render: Deploys automatically (5-10 minutes)

---

## Alternative: Deploy Backend on Vercel

If you prefer all on Vercel:

1. Backend needs to be serverless
2. Would require significant code changes
3. Not recommended for GraphQL server
4. Render is better suited for Node.js servers

---

## Support

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
