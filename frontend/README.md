# AdaptPrep Frontend

React-based frontend for the AdaptPrep exam preparation platform with an intuitive user interface and interactive components.

## 🎨 Features

### Pages & Components

#### Authentication Pages
- **Login Page** (`Login.jsx`)
  - Email and password input
  - Remember me option
  - Sign up link
  - Error handling and validation

- **Sign Up Page** (`SignUp.jsx`)
  - User registration form
  - Exam type selection (JEE/NEET)
  - Email validation
  - Password strength indicator
  - Terms and conditions

#### Main Application Pages

- **Dashboard** (`Dashboard.jsx`)
  - Quick overview of statistics
  - Tests taken count
  - Average score display
  - Latest raw score
  - Strong subjects count
  - Action cards for quick navigation
  - Recent test results list

- **Mock Test** (`MockTest.jsx`)
  - Subject and test selection
  - Timer functionality (10 minutes)
  - Question navigation
  - Multiple choice answers
  - Instant result display
  - Pie/Bar charts for performance
  - Submit and review options

- **Performance** (`Performance.jsx`)
  - Overall accuracy metrics
  - Subject-wise performance breakdown
  - Pie charts and bar charts
  - Question status analysis
  - Summary statistics
  - Performance trends

- **Insights** (`Insights.jsx`)
  - Comprehensive analytics dashboard
  - Overall accuracy tracking
  - Tests completed count
  - Subject performance cards
  - Strengths identification
  - Areas for improvement
  - Detailed subject statistics

- **Detailed Solutions** (`DetailedSolutions.jsx`)
  - Question review with answers
  - Correct vs incorrect comparison
  - Detailed explanations
  - Topic classification
  - Difficulty level display
  - Navigation between questions

- **Profile** (`Profile.jsx`)
  - User information display
  - Avatar display
  - Exam type badge
  - Profile statistics
  - Test history
  - Strong subjects list
  - Learning journey summary
  - Account information

#### UI Components

- **Navbar** (`Navbar.jsx`)
  - Navigation menu
  - User profile access
  - Logout functionality
  - Responsive mobile menu

- **ChatBot** (`ChatBot.jsx`)
  - AI-powered study coach
  - Chat interface
  - Message sending and receiving
  - Context-aware responses
  - Session management

- **Chat Icon** (`ChatIcon.jsx`)
  - Floating chat button
  - Easy access to AI coach
  - Notification indicators

- **MetricCard** (`MetricCard.jsx`)
  - Reusable metric display component
  - Trend indicators (up/down/stable)
  - Icon support
  - Gradient backgrounds

## 🏗️ Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── assets/
│       └── avatar/          # User avatars
├── src/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── SignUp.jsx
│   │   └── ...
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── MockTest.jsx
│   │   ├── Performance.jsx
│   │   ├── Insights.jsx
│   │   ├── Profile.jsx
│   │   ├── ChatBot.jsx
│   │   └── ...
│   ├── contexts/
│   │   └── UserContext.jsx
│   ├── questions/
│   │   └── index.js         # Question bank
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🔧 Key Technologies

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Context API** - State management
- **Recharts** - Data visualization library
- **Lucide React** - Icon library
- **CSS3** - Styling with animations and gradients

## 📦 Dependencies

```json
{
  "react": "^18.x",
  "react-router-dom": "^6.x",
  "recharts": "^2.x",
  "lucide-react": "^0.x",
  "axios": "^1.x"  // For API calls
}
```

## 🎯 Features by Component

### Authentication
- ✅ User registration
- ✅ User login
- ✅ JWT token management
- ✅ Protected routes
- ✅ Auto-logout on token expiry

### Dashboard
- ✅ Test statistics overview
- ✅ Average score calculation
- ✅ Recent test listing
- ✅ Quick action buttons
- ✅ Learning progress

### Testing (MockTest)
- ✅ Test selection interface
- ✅ Subject selection
- ✅ Timer countdown
- ✅ Progress bar
- ✅ Question navigation
- ✅ Answer submission
- ✅ Result display

### Analytics
- ✅ Performance graphs
- ✅ Accuracy metrics
- ✅ Subject-wise breakdown
- ✅ Trend analysis
- ✅ Improvement suggestions
- ✅ Export functionality (can be added)

### AI Chat Feature
- ✅ Real-time chat
- ✅ Message history
- ✅ Typing indicators
- ✅ Session persistence
- ✅ Context-aware responses
- ✅ Question analysis integration

### User Profile
- ✅ Profile information display
- ✅ Avatar management
- ✅ Stats summary
- ✅ Account details
- ✅ Test history
- ✅ Subject categorization

## 🎨 Design System

### Colors
- Primary: `#6366f1` (Indigo)
- Success: `#10b981` (Green)
- Warning: `#f59e0b` (Amber)
- Danger: `#ef4444` (Red)
- Background: Dark theme with gradient

### Typography
- Display Font: Poppins
- Body Font: Roboto
- Sizes: Responsive (16px base)

### Animations
- Fade-in effects
- Slide-up animations
- Smooth transitions
- Loading spinners
- Progress animations

## 🚀 Getting Started

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm start
```

Runs the app in development mode. Opens http://localhost:3000 to view in browser.

### Build for Production

```bash
npm run build
```

Builds the app for production to the `build` folder.

## 🔄 State Management (Context API)

### UserContext
Manages global user state:
- `user` - Current user information
- `userData` - User test results and analytics
- `loading` - Loading state
- `apiRequest()` - Helper for API calls
- `logout()` - User logout function

## 🌐 API Integration

Frontend communicates with backend through these routes:

### Authentication
- `POST /api/auth/signup`
- `POST /api/auth/login`

### User
- `GET /api/user/profile`
- `PUT /api/user/profile`
- `POST /api/user/test-results`

### Questions
- `GET /api/questions`
- `GET /api/questions/:examType/:subject`

### Chat
- `POST /api/chat/initialize`
- `POST /api/chat/send`
- `GET /api/chat/sessions`

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components are optimized for different screen sizes.

## ♿ Accessibility

- Semantic HTML
- ARIA labels (can be enhanced)
- Keyboard navigation
- Color contrast compliance
- Alt text for images

## 🐛 Common Issues & Solutions

### Authentication Error
- Clear browser storage
- Check API endpoint configuration
- Verify JWT token expiry

### API Connection Error
- Verify backend is running on `localhost:5000`
- Check CORS_ORIGIN in backend .env
- Verify network connectivity

### Charts Not Displaying
- Ensure Recharts is installed
- Verify data format is correct
- Check browser console for errors

## 📚 Component Documentation

Each major component includes:
- Props documentation
- Usage examples
- State management details
- Error handling

Refer to individual component files for detailed comments.

## 🔐 Security Measures

- JWT token stored in localStorage
- Protected API calls with Authorization header
- Input validation on forms
- XSS protection
- CSRF token implementation

## 🎓 Learning Resources

- React Documentation: https://react.dev
- React Router: https://reactrouter.com
- Recharts: https://recharts.org
- Lucide Icons: https://lucide.dev

---

**Last Updated**: February 2026
**Version**: 1.0.0
