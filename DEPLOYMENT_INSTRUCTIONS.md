# Quick Deployment Guide with Heroku API Key

## Your Heroku API Key
```
AAKnt7W25TF3uxmeuAa0BUeHotDbAkT-OdP_cLrvEz-Q_____wOOZ0LXesqN
```

## Step 1: Install Heroku CLI
Download from: https://devcenter.heroku.com/articles/heroku-cli
Or use: `winget install Heroku.HerokuCLI`

## Step 2: Authenticate Using API Key
```powershell
$env:HEROKU_API_KEY = "AAKnt7W25TF3uxmeuAa0BUeHotDbAkT-OdP_cLrvEz-Q_____wOOZ0LXesqN"
heroku auth:whoami
```

## Step 3: Create Heroku App
```powershell
cd C:\Users\sanga\Downloads\SATHWIK\Documents\MyDictionary\MyDictionary
heroku create mydictionary-backend
```

## Step 4: Add MongoDB Add-on (Optional) or Use MongoDB Atlas
```powershell
# Option 1: Use Heroku MongoDB add-on (paid)
heroku addons:create mongolab:sandbox

# Option 2: Use MongoDB Atlas (recommended - free tier available)
# Get connection string from https://cloud.mongodb.com
heroku config:set MONGODB_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/dictionary"
```

## Step 5: Set Environment Variables
```powershell
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL="https://your-frontend.vercel.app"
heroku config:set OXFORD_API_KEY="36380c934e642509372eb4306400c94f"
heroku config:set OXFORD_API_URL="https://od-api-sandbox.oxforddictionaries.com/api/v2"
```

## Step 6: Add Heroku Remote (if not already added)
```powershell
git remote add heroku https://git.heroku.com/mydictionary-backend.git
```

## Step 7: Deploy Backend
```powershell
git add .
git commit -m "Configure for Heroku deployment"
git push heroku main
```

## Step 8: Seed Database
```powershell
heroku run npm run seed --prefix backend
```

## Step 9: Open Your App
```powershell
heroku open
heroku logs --tail
```

## Alternative: Deploy Without Heroku CLI

### Using GitHub Integration
1. Go to https://dashboard.heroku.com
2. Create New App
3. Connect GitHub repository
4. Enable automatic deploys from main branch
5. Set Config Vars in Settings tab
6. Deploy manually or wait for auto-deploy

## Frontend Deployment (Vercel)

### Deploy Frontend Separately
```powershell
cd frontend
npm install -g vercel
vercel login
vercel --prod
```

### Set Environment Variables in Vercel Dashboard:
- `NEXT_PUBLIC_GRAPHQL_URL`: https://your-app.herokuapp.com/graphql
- `NEXT_PUBLIC_API_URL`: https://your-app.herokuapp.com

## Troubleshooting

### Check Logs
```powershell
heroku logs --tail
```

### Restart App
```powershell
heroku restart
```

### Check Build Status
```powershell
heroku builds
```

### Scale Dynos
```powershell
heroku ps:scale web=1
```

## Important Notes
- Backend will be on Heroku
- Frontend should be on Vercel (better for Next.js)
- Use MongoDB Atlas for database (free tier available)
- Update CORS settings in backend to include Vercel URL
