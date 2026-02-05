# Quick Start Backend

## Before Starting:

1. **Check Setup**
   ```bash
   cd backend
   npm run check
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment**
   - Copy `.env.example` to `.env`
   - Update `GEMINI_API_KEY` with your API key
   - Ensure MongoDB is running

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## Get Gemini API Key:
1. Go to https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy to `.env` file

## Test Backend:
- Server: http://localhost:5000
- API Test: http://localhost:5000/api/questions (after login)

## Common Issues:

**MongoDB Connection Failed?**
- Start MongoDB: `mongod`
- Or use MongoDB Atlas cloud

**Port 5000 in use?**
- Change `PORT=5001` in `.env`

**CORS errors?**
- Check `CORS_ORIGIN` in `.env` matches frontend URL
