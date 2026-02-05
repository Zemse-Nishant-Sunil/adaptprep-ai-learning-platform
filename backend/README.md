# AdaptPrep Backend

A complete Node.js + Express + MongoDB backend for the AdaptPrep exam preparation application.

## Features

- 🔐 JWT Authentication with bcrypt
- 📊 User progress tracking
- 🤖 AI Study Coach (Google Gemini)
- 📚 Question Bank API (JEE/NEET)
- 💬 Persistent Chat History
- 🔒 Rate Limiting & Security

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

3. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running locally or use MongoDB Atlas
   ```

4. **Run Server**
   ```bash
   npm run dev  # Development
   npm start    # Production
   ```

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `GEMINI_API_KEY`: Google Gemini API key
- `PORT`: Server port (default: 5000)
- `CORS_ORIGIN`: Frontend URL for CORS

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### User Management
- `GET /api/user/profile` - Get user profile
- `POST /api/user/test-results` - Save test results

### Questions
- `GET /api/questions/:examType/:subject` - Get questions
- `GET /api/questions` - Get exam structure

### AI Chat
- `POST /api/chat/message` - Send message to AI
- `GET /api/chat/history` - Get chat history
- `DELETE /api/chat/history` - Clear chat history

## Getting Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key to your .env file

## Database Models

- **User**: Authentication data
- **UserData**: Test results and progress
- **ChatHistory**: AI conversation history

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting (100 req/15min)
- CORS protection
- Input validation
