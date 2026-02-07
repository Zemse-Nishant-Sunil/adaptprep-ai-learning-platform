import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './contexts/UserContext';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './components/Dashboard';
import MockTest from './components/MockTest';
import Insights from './components/Insights';
import Navbar from './components/Navbar';
import Performance from './components/Performance';
import Profile from './components/Profile';
import ChatBot from './components/ChatBot';
import ChatIcon from './components/ChatIcon';

// Create a wrapper component to handle authentication logic
const AppContent = () => {
    const { user, loading } = useUser();
    const [isChatOpen, setIsChatOpen] = useState(false);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '18px'
            }}>
                Loading...
            </div>
        );
    }

    return (
        <div className="App">
            {user && <Navbar />}
            <Routes>
                {/* Public routes */}
                <Route
                    path="/login"
                    element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
                />
                <Route
                    path="/signup"
                    element={!user ? <SignUp /> : <Navigate to="/dashboard" replace />}
                />

                {/* Protected routes */}
                <Route
                    path="/dashboard"
                    element={user ? <Dashboard /> : <Navigate to="/login" replace />}
                />
                <Route
                    path="/mock-test"
                    element={user ? <MockTest /> : <Navigate to="/login" replace />}
                />
                <Route
                    path="/insights"
                    element={user ? <Insights /> : <Navigate to="/login" replace />}
                />
                <Route
                    path="/performance"
                    element={user ? <Performance /> : <Navigate to="/login" replace />}
                />
                <Route
                    path="/profile"
                    element={user ? <Profile /> : <Navigate to="/login" replace />}
                />

                {/* Default redirect */}
                <Route
                    path="/"
                    element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
                />
            </Routes>

            {/* Chat features - only show for authenticated users */}
            {user && (
                <>
                    <ChatIcon onClick={() => setIsChatOpen(true)} />
                    <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
                </>
            )}
        </div>
    );
};

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;