# Quick Start Frontend

## Before Starting:

1. **Check Setup**
   ```bash
   cd frontend
   npm run check
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment**
   - Copy `.env.example` to `.env`
   - Verify `REACT_APP_API_URL=http://localhost:5000/api`

4. **Ensure Backend is Running**
   ```bash
   cd ../backend
   npm run dev
   ```

5. **Start Frontend**
   ```bash
   cd ../frontend
   npm start
   ```

## Test Frontend:
- App: http://localhost:3000
- Test login/signup
- Test AI chatbot (🤖 icon in bottom right)

## Features to Test:

✅ **Authentication**
- Sign up new user
- Login existing user
- Auto-redirect to dashboard

✅ **Mock Tests**
- Select exam type (JEE/NEET)
- Take practice test
- View results

✅ **AI Chatbot**
- Click 🤖 icon
- Ask study questions
- View chat history

✅ **Insights**
- View performance stats
- See strong/weak subjects

## Common Issues:

**API calls failing?**
- Check backend is running on port 5000
- Verify `.env` has correct API URL

**Chat not working?**
- Check Gemini API key in backend `.env`
- Ensure user is logged in

**Components not found?**
- Run `npm run check` to verify all files exist
