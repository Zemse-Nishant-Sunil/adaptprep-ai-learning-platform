# AdaptPrep Backend

A complete Node.js + Express + MongoDB backend for the AdaptPrep exam preparation application.

## Features

### Authentication & User Management
- 🔐 JWT Authentication with bcrypt password hashing
- 👤 User registration and login
- 👥 User profile management
- 📝 User data persistence

### Question Bank & Testing
- 📚 Question Bank API supporting JEE and NEET exams
- 🧮 Multiple subjects: Physics, Chemistry, Mathematics (JEE) & Biology (NEET)
- 📊 Mock test creation and management
- ✅ Test result recording with detailed answers
- 📈 Performance tracking with accuracy metrics

### AI Features
- 🤖 Google Gemini AI integration for personalized study coaching
- 💬 Interactive chat-based learning assistant
- 🎯 Context-aware responses using user's test history
- 📋 Incorrect question analysis and targeted help

### Analytics & Progress
- 📊 User progress tracking with test history
- 📈 Subject-wise performance analysis
- 🎓 Strong/Weak subject identification
- 💯 Average score calculation and trends
- 🔍 Detailed question analysis with explanations

### Security & Performance
- 🔒 Rate Limiting & Security
- 🛡️ Input validation and sanitization
- 🔄 CORS protection
- ⚡ Optimized database queries

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

### Authentication Routes
- `POST /api/auth/signup` - User registration with email and password
- `POST /api/auth/login` - User login and JWT token generation

### User Management Routes
- `GET /api/user/profile` - Get user profile and userData with test history
- `PUT /api/user/profile` - Update user profile (name, avatar)
- `POST /api/user/test-results` - Save test results with detailed answers

### Questions Routes
- `GET /api/questions` - Get exam structure and available subjects
- `GET /api/questions/:examType/:subject` - Get questions for specific exam type and subject

### Chat/AI Routes
- `POST /api/chat/initialize` - Initialize new chat session
- `POST /api/chat/send` - Send message to AI coach and get response
- `GET /api/chat/sessions` - Get user's chat session history
- `GET /api/chat/session/:sessionId` - Get chat messages from a session

## Getting Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key to your .env file

## Database Models

- **User**: Authentication data, profile info (name, email, examType, avatar)
- **UserData**: Test results, performance metrics, strong/weak subjects
- **Chat**: Chat sessions and messages with AI coach
- **Message History**: Conversation history for context-aware responses

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting (100 req/15min)
- CORS protection
- Input validation
