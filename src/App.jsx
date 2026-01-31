import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Performance from './pages/Performance';
import MockTest from './pages/MockTest';
import Insights from './pages/Insights';
import Profile from './pages/Profile';
import './styles/global.css';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useUser();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
    const { isAuthenticated, login } = useUser();

    if (!isAuthenticated) {
        return (
            <Routes>
                <Route path="/login" element={<Login onLogin={login} />} />
                <Route path="/signup" element={<SignUp onLogin={login} />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        );
    }

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/performance" element={<ProtectedRoute><Performance /></ProtectedRoute>} />
                <Route path="/test" element={<ProtectedRoute><MockTest /></ProtectedRoute>} />
                <Route path="/insights" element={<ProtectedRoute><Insights /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
};

function App() {
    return (
        <UserProvider>
            <Router>
                <div className="App">
                    <AppRoutes />
                </div>
            </Router>
        </UserProvider>
    );
}

export default App;