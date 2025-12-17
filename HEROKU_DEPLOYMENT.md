# MyDictionary - Heroku Deployment Guide

## Prerequisites
- Heroku CLI installed
- MongoDB Atlas account (for production database)
- Git repository

## Deployment Steps

### 1. Login to Heroku
```bash
heroku login
```

Or using API key:
```bash
$env:HEROKU_API_KEY = "AAKnt7W25TF3uxmeuAa0BUeHotDbAkT-OdP_cLrvEz-Q_____wOOZ0LXesqN"
```

### 2. Create Heroku App
```bash
heroku create mydictionary-app
```

### 3. Set Environment Variables
```bash
heroku config:set MONGODB_URI="your-mongodb-atlas-uri"
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL="https://your-frontend-url.vercel.app"
heroku config:set OXFORD_API_KEY="36380c934e642509372eb4306400c94f"
heroku config:set OXFORD_API_URL="https://od-api-sandbox.oxforddictionaries.com/api/v2"
```

### 4. Deploy Backend to Heroku
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

### 5. Deploy Frontend to Vercel
The frontend should be deployed separately to Vercel:
```bash
cd frontend
vercel --prod
```

Set these environment variables in Vercel:
- `NEXT_PUBLIC_GRAPHQL_URL`: Your Heroku backend URL + `/graphql`
- `NEXT_PUBLIC_API_URL`: Your Heroku backend URL

### 6. MongoDB Atlas Setup
1. Create a MongoDB Atlas cluster
2. Whitelist Heroku IP addresses (or use 0.0.0.0/0 for all)
3. Create a database user
4. Get connection string and add to Heroku config

### 7. Seed Database (Optional)
```bash
heroku run npm run seed --prefix backend
```

## Verify Deployment
```bash
heroku open
heroku logs --tail
```

## Common Issues

### Port Configuration
Heroku automatically assigns a PORT. The backend is configured to use `process.env.PORT`.

### CORS Issues
Update backend CORS to include your Vercel frontend URL.

### Database Connection
Ensure MongoDB Atlas connection string is correct and IP whitelist includes Heroku IPs.

## Useful Commands
```bash
# View logs
heroku logs --tail

# Restart app
heroku restart

# Run seed script
heroku run npm run seed --prefix backend

# Check config
heroku config

# Scale dynos
heroku ps:scale web=1
```
