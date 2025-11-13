// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { BoardProvider } from './contexts/BoardContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboardPage from './pages/UserDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import BoardPage from './pages/BoardPage';

// Styles
import './styles/global.css';
import './styles/theme.css';
import './styles/animations.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BoardProvider>
          <Router>
            <div className="app-container">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* User Routes */}
                <Route path="/dashboard" element={<UserDashboardPage />} />
                <Route path="/dashboard/user" element={<UserDashboardPage />} />
                <Route path="/board/:id" element={<BoardPage />} />
                
                {/* Admin Routes */}
                <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
                
                {/* Fallback */}
                <Route path="*" element={<LandingPage />} />
              </Routes>
            </div>
          </Router>
        </BoardProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;