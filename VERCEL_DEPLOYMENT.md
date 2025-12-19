# Vercel Deployment Guide for MyDictionary Frontend

This guide will help you deploy the Next.js frontend to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Backend deployed and running (e.g., on Render)
3. Git repository connected to your Vercel account

## Step 1: Push Your Code to GitHub

If you haven't already, push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Step 2: Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Select the `frontend` directory as the root directory
5. Vercel will automatically detect Next.js

## Step 3: Configure Environment Variables

In the Vercel project settings, add the following environment variable:

### Required Environment Variable:

- **Variable Name:** `NEXT_PUBLIC_GRAPHQL_URL`
- **Value:** Your backend GraphQL endpoint (e.g., `https://your-backend.onrender.com/graphql`)
- **Environment:** Production, Preview, Development (select all)

### How to Add Environment Variables:

1. Go to your project in Vercel Dashboard
2. Click "Settings" tab
3. Click "Environment Variables" in the sidebar
4. Add the variable name and value
5. Select which environments to apply it to
6. Click "Save"

## Step 4: Deploy

1. Click "Deploy" button in Vercel
2. Wait for the build to complete (usually takes 1-3 minutes)
3. Once deployed, Vercel will provide you with a URL (e.g., `https://your-app.vercel.app`)

## Step 5: Update Backend CORS Settings

After deployment, update your backend's CORS configuration to allow requests from your Vercel domain:

In your backend `src/index.ts`, update the CORS origins:

```typescript
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});

await server.start();

app.use(
  '/graphql',
  cors({
    origin: [
      'http://localhost:3000',
      'https://your-app.vercel.app',  // Add your Vercel domain
    ],
    credentials: true,
  }),
  express.json(),
  expressMiddleware(server)
);
```

Redeploy your backend after making this change.

## Step 6: Test Your Deployment

1. Visit your Vercel URL
2. Test adding, searching, and viewing words
3. Check the browser console for any errors
4. Verify API calls are going to the correct backend URL

## Automatic Deployments

Vercel automatically deploys:
- **Production:** Every push to the `main` branch
- **Preview:** Every push to other branches and pull requests

## Custom Domain (Optional)

To add a custom domain:

1. Go to Project Settings → Domains
2. Add your domain name
3. Follow the DNS configuration instructions
4. Wait for DNS propagation (can take up to 48 hours)

## Troubleshooting

### Build Fails

- Check the build logs in Vercel Dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript types are correct

### API Connection Issues

- Verify `NEXT_PUBLIC_GRAPHQL_URL` is set correctly
- Check backend CORS settings include your Vercel domain
- Ensure backend is running and accessible

### Environment Variables Not Working

- Environment variable names must start with `NEXT_PUBLIC_` to be accessible in the browser
- Redeploy after adding/changing environment variables
- Clear browser cache and try again

## Useful Commands

```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy from command line
vercel

# Deploy to production
vercel --prod
```

## Production Checklist

- [ ] Environment variables configured in Vercel
- [ ] Backend CORS updated with Vercel domain
- [ ] Backend deployed and accessible
- [ ] MongoDB connection working
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (automatic with Vercel)
- [ ] Error tracking configured (optional)
- [ ] Analytics configured (optional)

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Environment Variables](https://vercel.com/docs/environment-variables)
