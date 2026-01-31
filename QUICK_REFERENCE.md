# Quick Reference Card

## 🚀 Quick Start

```bash
npm start
```

Then navigate to:
- **Sign Up**: `http://localhost:3000/signup`
- **Login**: `http://localhost:3000/login`
- **Dashboard**: `http://localhost:3000` (after login)

---

## 📋 Sign-Up Flow (4 Steps)

| Step | Action | Input | Validation |
|------|--------|-------|-----------|
| 1 | Email | Any email | Format: email@domain.com |
| 2 | OTP | 6 digits | Must match generated OTP |
| 3 | Password | Create & confirm | Min 8 chars, Upper, Lower, Numbers |
| 4 | Exam | Select JEE or NEET | Required |

---

## 🔑 Login Flow (2 Steps)

| Step | Action | Input | Validation |
|------|--------|-------|-----------|
| 1 | Credentials | Email & Password | Must match sign-up |
| 2 | Exam | Select JEE or NEET | Required |

---

## 📁 Files Created/Modified

### Created (2 files):
- ✨ `src/pages/SignUp.jsx` - Sign-up component (380 lines)
- ✨ `src/pages/SignUp.css` - Sign-up styling (320 lines)

### Modified (4 files):
- 📝 `src/App.jsx` - Added signup route
- 📝 `src/pages/Login.jsx` - Added signup link
- 📝 `src/pages/Login.css` - Added link styling
- 📝 `src/context/UserContext.jsx` - Modified logout

---

## 🧪 Testing OTP

### View OTP in Console:
1. Open DevTools (F12)
2. Go to Console tab
3. Fill email and click "Send OTP"
4. Look for: `OTP sent to user@email.com: 123456`
5. Copy the 6-digit number

---

## 💾 LocalStorage Keys

After sign-up, check localStorage:

```javascript
// User profile
localStorage.getItem('adaptprep_user')
// Returns: {name, email, password, examType, avatar, joinedDate}

// User data
localStorage.getItem('adaptprep_data')
// Returns: {testsCompleted, scores, subjects, etc.}

// Signup info
localStorage.getItem('adaptprep_signup')
// Returns: {email, registeredDate, examType}
```

---

## ✅ Password Requirements

Password must have:
- ✓ Minimum 8 characters
- ✓ At least one UPPERCASE letter (A-Z)
- ✓ At least one lowercase letter (a-z)
- ✓ At least one number (0-9)

**Example valid password**: `MyPassword123`

---

## 🔐 Security Features

✓ Email verification with OTP
✓ OTP expires in 5 minutes
✓ Strong password requirements
✓ Password confirmation
✓ Exam selection required
✓ Data persisted across sessions

---

## 🔄 Data Persistence

| Event | Before | After |
|-------|--------|-------|
| Logout | ✓ Data in localStorage | ✓ Data persists |
| Browser Close | ✓ Data in localStorage | ✓ Data available |
| Re-login | ✓ Enter credentials | ✓ Data auto-restored |

---

## 🎯 Common Tasks

### Clear All Data:
```javascript
// Browser Console
localStorage.clear()
// Refresh page
```

### Check User Profile:
```javascript
// Browser Console
JSON.parse(localStorage.getItem('adaptprep_user'))
```

### Check Stored Password:
```javascript
// Browser Console
JSON.parse(localStorage.getItem('adaptprep_user')).password
```

### Manual Testing Steps:
1. Sign up with: `test@example.com` / `MyPass123` / JEE
2. Dashboard appears ✓
3. Logout
4. Login with same credentials
5. Dashboard appears with same data ✓

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Can't see OTP | Check browser console (F12) |
| Wrong OTP error | Copy exact code from console |
| Weak password error | Add uppercase, lowercase, numbers |
| Passwords don't match | Ensure both fields are identical |
| No exam options | Need to complete password step first |
| Logout not working | Check browser console for errors |
| Data not saved | Check localStorage in DevTools |

---

## 📱 Responsive Breakpoints

- Mobile: 320px - 480px
- Tablet: 481px - 768px
- Desktop: 769px+

All views fully functional on all sizes.

---

## 🎨 UI Components

### Colors (from global.css):
- Primary: Indigo/Purple gradient
- Success: Green (#10b981)
- Error: Red (#dc2626)
- Background: Dark with light text

### Components Used:
- Form inputs with icons
- Card-based layout
- Button states (hover, disabled)
- Error/success messages
- Animated transitions
- Timer display

---

## 📊 Exam Options

### JEE:
- Physics
- Chemistry
- Mathematics

### NEET:
- Physics
- Chemistry
- Biology

---

## 🔗 Page Routes

| Route | Description | Auth Required |
|-------|-------------|----------------|
| `/login` | Login page | ❌ No |
| `/signup` | Sign-up page | ❌ No |
| `/` | Dashboard | ✅ Yes |
| `/performance` | Performance | ✅ Yes |
| `/test` | Mock Test | ✅ Yes |
| `/insights` | AI Insights | ✅ Yes |
| `/profile` | Profile | ✅ Yes |

---

## 📞 Documentation Links

- [Full Implementation Details](AUTHENTICATION_IMPLEMENTATION.md)
- [Complete Testing Guide](TESTING_GUIDE.md)
- [Implementation Summary](IMPLEMENTATION_SUMMARY.md)

---

## 💡 Tips

1. **Use different emails** for multiple test accounts
2. **Check console** for OTP in demo mode
3. **Use strong passwords** with uppercase, lowercase, numbers
4. **Test on mobile** using Chrome DevTools
5. **Clear localStorage** to start fresh
6. **Back buttons** work on all signup steps

---

## 📋 Checklist

Before deploying to production:

- [ ] Replace frontend OTP with backend email service
- [ ] Hash passwords using bcrypt
- [ ] Add database for user storage
- [ ] Implement session tokens/JWT
- [ ] Add HTTPS encryption
- [ ] Set up CORS properly
- [ ] Add rate limiting
- [ ] Test all error scenarios
- [ ] Add password reset flow
- [ ] Implement logging

---

**Version**: 1.0  
**Created**: 2024-01-30  
**Status**: Ready for Testing & Backend Integration
