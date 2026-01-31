# Testing Guide - Authentication System

## Quick Start Testing

### Prerequisites
- Application running with `npm start`
- Browser developer tools open (for OTP viewing)

---

## Test Case 1: Complete Sign-Up Flow

### Steps:
1. Open app in fresh browser (clear localStorage if needed)
2. You should see Login page
3. Click **"Create account"** link
4. You should be redirected to Sign-Up page

### Sign-Up Step 1 - Email:
1. Enter any email (e.g., `john@example.com`)
2. Click **"Send OTP"**
3. Check browser console (F12) for message: `OTP sent to john@example.com: XXXXXX`
4. Should see "OTP sent to john@example.com. Check your inbox."

### Sign-Up Step 2 - OTP Verification:
1. Copy the OTP from console
2. Paste into the OTP field (6-digit code)
3. You should see timer counting down (5:00)
4. Click **"Verify OTP"**
5. Should see "Email verified successfully!" and move to Step 3

### Sign-Up Step 3 - Password Creation:
1. Create a password (must have: 8+ chars, uppercase, lowercase, number)
   - Example: `MyPassword123`
2. Confirm password in second field
3. Click **"Set Password"**
4. Should see "Password set successfully!" and move to Step 4

### Sign-Up Step 4 - Exam Selection:
1. Click either **JEE** or **NEET** option (they become highlighted)
2. Click **"Create Account"**
3. Should see "Account created successfully! Redirecting..."
4. Should be automatically logged in and redirected to Dashboard

---

## Test Case 2: Login with Existing Account

### Prerequisites:
- You've completed Sign-Up flow above

### Steps:
1. From Dashboard, click **Logout** (top-right menu)
2. Confirm logout
3. You should return to Login page
4. Use same email and password from sign-up
5. Click **"Continue"**
6. Select the same exam (JEE or NEET)
7. Click **"Start Your Journey"**
8. Should be logged in and see Dashboard
9. **Verify**: All previous data is visible (localStorage preserved)

---

## Test Case 3: Error Scenarios

### Test 3a - Invalid Email Format:
1. Go to Sign-Up
2. Enter invalid email (e.g., `notanemail`)
3. Click "Send OTP"
4. Should see: "Please enter a valid email address"

### Test 3b - Wrong OTP:
1. Go through email step correctly
2. When prompted for OTP, enter wrong code (e.g., `000000`)
3. Click "Verify OTP"
4. Should see: "Incorrect OTP. Please try again."

### Test 3c - Weak Password:
1. Pass email and OTP verification
2. Try password without uppercase: `mypassword123`
3. Click "Set Password"
4. Should see: "Password must contain at least one uppercase letter, lowercase letter, and number"

### Test 3d - Password Mismatch:
1. Password: `MyPassword123`
2. Confirm: `MyPassword124`
3. Click "Set Password"
4. Should see: "Passwords do not match"

### Test 3e - No Exam Selected:
1. Get to Step 4 (Exam Selection)
2. Don't select any exam
3. Try to click "Create Account"
4. Should see: "Please select an exam"

### Test 3f - Login Without Password:
1. Go to Login page
2. Enter email only
3. Click "Continue"
4. Should see: "Please enter both email and password"

---

## Test Case 4: Navigation Between Steps

### Back Button Tests:
1. Sign-Up Step 2 (OTP) → Click Back → Return to Step 1 (Email)
2. Sign-Up Step 3 (Password) → Click Back → Return to Step 2 (OTP)
3. Sign-Up Step 4 (Exam) → Click Back → Return to Step 3 (Password)
4. All previous data should be preserved

### Link Navigation:
1. On Login page → Click "Create account" → Go to Sign-Up
2. On Sign-Up Step 1 → Click "Login here" link → Go to Login page

---

## Test Case 5: OTP Expiration & Resend

### Steps:
1. Complete Sign-Up email step
2. Wait for timer to reach 0:00 (or manually wait 5 minutes)
3. "Resend OTP" button should appear
4. Click "Resend OTP"
5. Timer should reset to 5:00
6. New OTP generated (check console)
7. Use new OTP to verify

---

## Test Case 6: Data Persistence

### Prerequisites:
- Completed sign-up with an exam selected

### Steps:
1. Go to Dashboard (logged in)
2. Open Developer Tools → Application → LocalStorage
3. Verify these keys exist:
   - `adaptprep_user`
   - `adaptprep_data`
   - `adaptprep_signup`
4. Click Logout
5. Refresh page → Still on Login page
6. Check localStorage → All data **still present**
7. Login again with same credentials
8. Data should be restored from localStorage

---

## Test Case 7: Multiple Sign-Ups

### Steps:
1. Complete Sign-Up with email: `user1@test.com`
2. You're logged in as User 1
3. Logout
4. Click "Create account"
5. Complete Sign-Up with different email: `user2@test.com`
6. You're logged in as User 2
7. Check localStorage keys → Should show User 2 data
8. Logout and login as User 1 → Data should switch

---

## Test Case 8: Responsive Design

### Mobile View (DevTools):
1. Open app in Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M or Cmd+Shift+M)
3. Test on various screen sizes:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1024px+)
4. Verify:
   - Cards are readable
   - Buttons are clickable
   - Text is properly sized
   - Exam options stack vertically on mobile

---

## Debugging Tips

### View OTP in Console:
```javascript
// Browser Console (F12)
// Look for message when OTP is sent:
// "OTP sent to user@email.com: 123456"
```

### Check LocalStorage:
```javascript
// Browser Console
localStorage.getItem('adaptprep_user')
localStorage.getItem('adaptprep_data')
localStorage.getItem('adaptprep_signup')
```

### Clear All Data:
```javascript
// Browser Console
localStorage.clear()
```

### Manually Set Timer to 0:
```javascript
// In SignUp.jsx during testing, set timer directly if needed
```

---

## Known Limitations (Demo Mode)

1. **OTP Generation**: Currently frontend-based (shown in console)
   - Production: Should use backend with email service
   
2. **Password Storage**: Not hashed (shown in localStorage)
   - Production: Must hash with bcrypt before storing

3. **Email Sending**: Not actually sent
   - Production: Integrate with SendGrid, AWS SES, or similar

4. **Persistence**: Only localStorage (no database)
   - Production: Store in database with proper backup

---

## Success Indicators

✅ Sign-up flow completes without errors
✅ OTP verification works with correct code
✅ Password meets security requirements
✅ Exam selection required before account creation
✅ Login works with saved credentials
✅ Logout preserves data in localStorage
✅ Navigation between steps works
✅ Error messages display appropriately
✅ Responsive design works on all devices
✅ Data persists across sessions

---

## Need Help?

If you encounter issues:

1. **Clear browser data**: Open DevTools → Storage → Clear All
2. **Check console**: Look for error messages in DevTools Console
3. **Verify imports**: Ensure all components are imported in App.jsx
4. **Check routes**: Navigate to `/login` and `/signup` explicitly
5. **Test in incognito**: Rule out caching issues

