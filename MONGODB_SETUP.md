# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account
1. Go to https://cloud.mongodb.com
2. Sign up with Google/GitHub or create an account
3. Verify your email

## Step 2: Create a FREE Cluster
1. Click **Build a Database**
2. Choose **M0 FREE** tier
3. Select **AWS** as provider
4. Choose region closest to your Render deployment (e.g., Oregon/US-West)
5. Cluster Name: `MyDictionary` (or any name)
6. Click **Create Cluster** (takes 3-5 minutes)

## Step 3: Create Database User
1. Go to **Database Access** (left sidebar)
2. Click **Add New Database User**
3. Authentication Method: **Password**
4. Username: `dictionary`
5. Password: Click **Autogenerate Secure Password** and **COPY IT**
   - Example: `Abc123Xyz789!@#`
6. Database User Privileges: **Read and write to any database**
7. Click **Add User**

## Step 4: Allow Network Access
1. Go to **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere**
   - IP Address: `0.0.0.0/0`
   - Comment: "Allow from Render"
4. Click **Confirm**

## Step 5: Get Connection String
1. Go to **Database** (left sidebar)
2. Click **Connect** button on your cluster
3. Choose **Connect your application**
4. Driver: **Node.js**
5. Version: **5.5 or later**
6. Copy the connection string:

```
mongodb+srv://mydictionary_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

## Step 6: Prepare Your Connection String
Replace and add database name:

**BEFORE:**
```
mongodb+srv://mydictionary_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**AFTER (replace <password> and add /dictionary):**
```
mongodb+srv://mydictionary_user:Abc123Xyz789!@#@cluster0.xxxxx.mongodb.net/dictionary?retryWrites=true&w=majority
```

⚠️ **IMPORTANT Changes:**
- Replace `<password>` with your actual password
- Add `/dictionary` before the `?` (this is your database name)
- Keep special characters in password (if URL encode needed, use %XX format)

## Step 7: Add to Render Environment Variables
1. Go to https://dashboard.render.com
2. Select your `mydictionary-backend` service
3. Go to **Environment** tab
4. Click **Add Environment Variable**
5. Key: `MONGODB_URI`
6. Value: Your complete connection string
7. Click **Save Changes**
8. Service will auto-redeploy

## Example Connection Strings

### ✅ Correct Format:
```
mongodb+srv://myuser:MyP@ssw0rd@cluster0.abc123.mongodb.net/dictionary?retryWrites=true&w=majority
```

### ❌ Common Mistakes:
```
# Missing database name
mongodb+srv://myuser:pass@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority

# Still has <password> placeholder
mongodb+srv://myuser:<password>@cluster0.abc123.mongodb.net/dictionary

# Wrong format
mongodb://localhost:27017/dictionary
```

## Step 8: Verify Connection
After Render redeploys:
1. Check Render logs
2. Look for: `✅ Connected to MongoDB`
3. If error, check:
   - Password is correct (no < > symbols)
   - Database name `/dictionary` is included
   - IP whitelist includes 0.0.0.0/0

## Seed Database
Once connected, seed your database:
1. Go to Render dashboard
2. Select your service
3. Click **Shell** tab
4. Run:
```bash
cd backend && npm run seed
```

## Troubleshooting

### Error: Authentication failed
- Double-check username and password
- Make sure password doesn't have < > symbols
- URL encode special characters if needed

### Error: Connection timeout
- Check Network Access whitelist
- Ensure 0.0.0.0/0 is allowed

### Error: Could not connect to any servers
- Verify cluster is active (not paused)
- Check connection string format
- Ensure `/dictionary` database name is included

## Connection String Special Characters

If your password has special characters, URL encode them:

| Character | Encoded |
|-----------|---------|
| @ | %40 |
| : | %3A |
| / | %2F |
| ? | %3F |
| # | %23 |
| [ | %5B |
| ] | %5D |

Example: `P@ss:word` becomes `P%40ss%3Aword`

## MongoDB Atlas Free Tier Limits
- Storage: 512 MB
- RAM: Shared
- Backup: None
- Perfect for development and small projects
- Can upgrade anytime if needed
