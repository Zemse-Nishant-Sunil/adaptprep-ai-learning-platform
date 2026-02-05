# AdaptPrep Backend - Quick Start

## 🚀 5-Minute Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Get Google Gemini API Key
- Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
- Click "Create API Key"
- Copy the key

### 3. Setup Environment
```bash
cp .env.example .env
```

Edit `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/adaptprep
JWT_SECRET=your_super_secret_key_change_this_in_production
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Start MongoDB
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env with Atlas connection string
```

### 5. Run Backend
```bash
npm run dev
```

### 6. Test API
Visit: http://localhost:5000/api/questions

## Frontend Setup

```bash
cd ..  # Go back to main project folder
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
npm start
```

## ✅ You're Ready!

- Backend: http://localhost:5000
- Frontend: http://localhost:3000
- AI Chat: Click the 🤖 icon in bottom right

## 📝 Free Services Used

- **MongoDB**: Free tier (512MB)
- **Google Gemini**: Free tier (60 requests/minute)
- **Deployment**: Railway/Render (free tiers available)

## 🔧 Common Issues

**Can't connect to MongoDB?**
- Install MongoDB locally or use MongoDB Atlas
- Check MONGODB_URI in .env

**Gemini API not working?**
- Verify API key is correct
- Check you haven't exceeded free tier limits

**CORS errors?**
- Ensure CORS_ORIGIN matches your frontend URL
