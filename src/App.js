// src/App.jsx - Updated with production features
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { BoardProvider } from './contexts/BoardContext';
import { ToastProvider } from './contexts/ToastContext';

// Components
import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './components/common/ProtectedRoute';
import { LoadingSpinner } from './components/common/LoadingSpinner';

// Lazy load pages for code splitting
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const UserDashboardPage = lazy(() => import('./pages/UserDashboardPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const BoardPage = lazy(() => import('./pages/BoardPage'));

// Styles
import './styles/global.css';
import './styles/theme.css';
import './styles/animations.css';

// Loading fallback component
const PageLoader = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, rgba(231, 76, 140, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '60px',
        height: '60px',
        background: 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#fff',
        margin: '0 auto 20px',
        animation: 'pulse 2s ease-in-out infinite'
      }}>Z</div>
      <LoadingSpinner size="md" />
    </div>
    <style>{`
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
    `}</style>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <BoardProvider>
            <ToastProvider>
              <Router>
                <div className="app-container">
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      
                      {/* Protected User Routes */}
                      <Route 
                        path="/dashboard/user" 
                        element={
                          <ProtectedRoute>
                            <UserDashboardPage />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/dashboard" 
                        element={
                          <ProtectedRoute>
                            <UserDashboardPage />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/board/:id" 
                        element={
                          <ProtectedRoute>
                            <BoardPage />
                          </ProtectedRoute>
                        } 
                      />
                      
                      {/* Protected Admin Routes */}
                      <Route 
                        path="/dashboard/admin" 
                        element={
                          <ProtectedRoute requiredRole="admin">
                            <AdminDashboardPage />
                          </ProtectedRoute>
                        } 
                      />
                      
                      {/* 404 - Redirect to home */}
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </Suspense>
                </div>
              </Router>
            </ToastProvider>
          </BoardProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;