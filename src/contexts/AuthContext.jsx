// src/contexts/AuthContext.jsx - Enhanced with validation and persistence
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const authTimestamp = localStorage.getItem('authTimestamp');
        
        if (storedUser && authTimestamp) {
          // Check if session is still valid (e.g., 24 hours)
          const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
          const isSessionValid = Date.now() - parseInt(authTimestamp) < sessionDuration;
          
          if (isSessionValid) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsAuthenticated(true);
          } else {
            // Session expired, clear storage
            clearAuth();
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const clearAuth = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authTimestamp');
    setUser(null);
    setIsAuthenticated(false);
  };

  const login = (userData) => {
    try {
      // Validate user data
      if (!userData || !userData.email) {
        throw new Error('Invalid user data');
      }

      // Set default role if not provided
      const userWithDefaults = {
        ...userData,
        role: userData.role || 'employee',
        loginTime: new Date().toISOString()
      };

      // Store in state
      setUser(userWithDefaults);
      setIsAuthenticated(true);

      // Persist to localStorage
      localStorage.setItem('user', JSON.stringify(userWithDefaults));
      localStorage.setItem('authTimestamp', Date.now().toString());

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    clearAuth();
    // Redirect to login page will be handled by ProtectedRoute
  };

  const register = (userData) => {
    try {
      // Validate registration data
      if (!userData.email || !userData.password || !userData.name) {
        throw new Error('Missing required fields');
      }

      // In a real app, you would call an API here
      // For now, we'll just log them in
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        company: userData.company || '',
        role: userData.role || 'employee',
        createdAt: new Date().toISOString()
      };

      login(newUser);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  };

  const updateUser = (updates) => {
    try {
      if (!user) {
        throw new Error('No user logged in');
      }

      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      return { success: true };
    } catch (error) {
      console.error('Update user error:', error);
      return { success: false, error: error.message };
    }
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isManager = () => {
    return user?.role === 'manager' || user?.role === 'admin';
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
    updateUser,
    isAdmin,
    isManager
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};