# AdaptPrep - AI-Powered Exam Preparation Platform

A comprehensive full-stack web application designed to help students prepare for competitive exams (JEE/NEET) with AI-powered personalized coaching and comprehensive performance analytics.

## 🌟 Key Features

### 📚 Comprehensive Test Preparation
- **Mock Tests**: Practice with authentic JEE and NEET exams
- **Multiple Subjects**: Physics, Chemistry, Mathematics (JEE) and Biology (NEET)
- **Detailed Solutions**: Step-by-step explanations for every question
- **Question Bank**: 1000+ carefully curated questions from various exam patterns

### 🤖 AI-Powered Study Coach
- **Intelligent Chatbot**: Powered by Google Gemini AI
- **Personalized Help**: Context-aware responses based on your test history
- **Weak Point Analysis**: AI identifies and helps improve weak areas
- **Instant Doubt Resolution**: Get answers to your questions anytime

### 📊 Advanced Analytics Dashboard
- **Performance Tracking**: Monitor your progress with detailed metrics
- **Subject-wise Analysis**: Track performance in each subject
- **Strong/Weak Subject Identification**: Know where you excel and where to focus
- **Score Trends**: Visualize your improvement over time
- **Accuracy Metrics**: Understand your correct/incorrect/skipped ratios

### 👤 User Profile & Management
- **Profile Customization**: Set up your profile with avatar and exam details
- **Progress History**: Access all your test results and scores
- **Subject Performance**: View detailed statistics for each subject
- **Learning Journey**: Track your learning progress from day one

### 🔐 Secure Authentication
- **JWT-based Security**: Secure token-based authentication
- **Password Encryption**: Bcrypt password hashing
- **Data Privacy**: All user data is securely stored and protected

## 🏗️ Project Structure

```
project/
├── backend/
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Authentication & validation
│   ├── data/           # Question bank data
│   └── server.js       # Express server setup
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── contexts/   # Context API
│   │   └── styles/     # CSS stylesheets
│   └── public/         # Static assets
└── README.md           # This file
```

## 🚀 Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Context API** - State management
- **Recharts** - Data visualization
- **Lucide Icons** - Icon library
- **CSS3** - Styling and animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Google Gemini API** - AI-powered coaching

## 📋 Features Breakdown

### User Authentication
- ✅ Sign up with email and password
- ✅ Secure login with JWT tokens
- ✅ Password encryption with bcrypt
- ✅ Session management

### Dashboard
- ✅ Overview of test statistics
- ✅ Quick links to key features
- ✅ Recent test results
- ✅ Strong subjects display
- ✅ Learning progress summary

### Mock Tests
- ✅ Subject selection (Physics, Chemistry, Math/Biology)
- ✅ Multiple test variations
- ✅ 10-minute timer for each test
- ✅ Question-based navigation
- ✅ Instant result display
- ✅ Answer comparison with correct answers

### Performance Analysis
- ✅ Overall accuracy metrics
- ✅ Subject-wise performance breakdown
- ✅ Pie charts and bar charts
- ✅ Question status analysis (correct/incorrect/skipped)
- ✅ Score trends over time
- ✅ Recent test history

### Insights Page
- ✅ Comprehensive performance analytics
- ✅ Subject-wise accuracy tracking
- ✅ Strengths and weaknesses identification
- ✅ Improvement recommendations
- ✅ Test completion statistics
- ✅ Visual performance dashboard

### Detailed Solutions
- ✅ Complete explanation for each question
- ✅ Correct answer highlighting
- ✅ User's answer comparison
- ✅ Topic classification
- ✅ Difficulty level display
- ✅ Save solutions for future reference

### AI Study Coach
- ✅ Interactive chat interface
- ✅ Personalized responses based on test history
- ✅ Context-aware suggestions
- ✅ Doubt resolution
- ✅ Study tips and strategies
- ✅ Performance improvement advice

### User Profile
- ✅ Profile information display
- ✅ Avatar selection
- ✅ Test statistics summary
- ✅ Account information
- ✅ Strong subjects list
- ✅ Learning journey overview

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login

### User Management
- `GET /api/user/profile` - Get user profile and data
- `PUT /api/user/profile` - Update profile
- `POST /api/user/test-results` - Save test results

### Questions
- `GET /api/questions` - Get exam structure
- `GET /api/questions/:examType/:subject` - Get subject questions

### AI Chat
- `POST /api/chat/initialize` - Start new chat session
- `POST /api/chat/send` - Send message to AI coach
- `GET /api/chat/sessions` - Get session history
- `GET /api/chat/session/:sessionId` - Get session messages

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB (local or Atlas)
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 📖 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/adaptprep
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

## 🎯 Supported Exams

- **JEE (Joint Entrance Examination)**
  - Subjects: Physics, Chemistry, Mathematics
  
- **NEET (National Eligibility cum Entrance Test)**
  - Subjects: Physics, Chemistry, Biology

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## 🔒 Security Features

- JWT-based authentication
- Password encryption with bcrypt
- Input validation and sanitization
- CORS protection
- Rate limiting on API endpoints
- Secure data storage in MongoDB

## 🤝 Contributing

We welcome contributions to improve AdaptPrep. Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For issues, questions, or suggestions, please create an issue in the repository.

## 🎓 Educational Purpose

AdaptPrep is designed as an educational tool to help students prepare for competitive exams with AI-powered personalized coaching and comprehensive analytics.

---

**Last Updated**: February 2026
**Version**: 1.0.0
