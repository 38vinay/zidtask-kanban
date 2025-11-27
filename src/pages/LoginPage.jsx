import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';

const Login = () => {
  const { darkMode } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        // ✅ FIX: Determine role based on email
        let userRole = 'employee'; // Default role
        
        // Role detection logic
        if (formData.email.includes('admin@') || formData.email === 'admin@company.com') {
          userRole = 'admin';
        } else if (formData.email.includes('manager@') || formData.email === 'manager@company.com') {
          userRole = 'manager';
        }
        
        const userData = {
          id: 1,
          name: formData.email.split('@')[0],
          email: formData.email,
          role: userRole
        };
        
        login(userData);
        setIsLoading(false);
        
        // ✅ FIX: Route based on role
        if (userRole === 'admin' || userRole === 'manager') {
          navigate('/dashboard/admin');
        } else {
          navigate('/dashboard/user');
        }
      }, 1500);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: darkMode 
        ? 'radial-gradient(ellipse at top, rgba(231, 76, 140, 0.15) 0%, transparent 50%), #0a0f1e'
        : 'radial-gradient(ellipse at top, rgba(231, 76, 140, 0.1) 0%, transparent 50%), #ffffff',
      padding: '20px',
      position: 'relative'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Logo & Header */}
        <div className="text-center mb-4">
          <Link to="/" className="d-inline-flex align-items-center gap-2 text-decoration-none mb-3">
            <div className="pulse" style={{
              width: '45px',
              height: '45px',
              background: 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '22px',
              color: '#fff',
              boxShadow: '0 4px 12px rgba(231, 76, 140, 0.3)'
            }}>Z</div>
          </Link>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            marginBottom: '8px',
            color: darkMode ? '#fff' : '#1e40af'
          }}>Welcome Back</h2>
          <p style={{
            color: darkMode ? '#94a3b8' : '#64748b',
            fontSize: '14px'
          }}>Sign in to continue to ZidTask</p>
        </div>

        {/* Login Card */}
        <div className="scale-in" style={{
          background: darkMode 
            ? 'rgba(30, 64, 175, 0.1)' 
            : 'rgba(255, 255, 255, 0.9)',
          border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(30, 64, 175, 0.15)'}`,
          borderRadius: '20px',
          padding: '40px 35px',
          backdropFilter: 'blur(10px)',
          boxShadow: darkMode 
            ? '0 20px 60px rgba(0, 0, 0, 0.3)' 
            : '0 20px 60px rgba(0, 0, 0, 0.1)'
        }}>
          {/* Demo Credentials Info */}
          <div style={{
            padding: '12px',
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '12px',
            color: darkMode ? '#94a3b8' : '#64748b',
            lineHeight: '1.6'
          }}>
            <strong style={{ color: '#3b82f6', display: 'block', marginBottom: '6px' }}>Demo Credentials:</strong>
            <div>🔴 Admin: <strong>admin@company.com</strong></div>
            <div>🟡 Manager: <strong>manager@company.com</strong></div>
            <div>🟢 Employee: <strong>any other email</strong></div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Rest of the form code remains the same... */}
            {/* Email Field */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: darkMode ? '#fff' : '#1e40af'
              }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail 
                  size={18} 
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: darkMode ? '#64748b' : '#94a3b8'
                  }}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 44px',
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    border: `1px solid ${errors.email 
                      ? '#ef4444' 
                      : darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(30, 64, 175, 0.2)'}`,
                    borderRadius: '10px',
                    fontSize: '14px',
                    color: darkMode ? '#fff' : '#0f172a',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(30, 64, 175, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              {errors.email && (
                <div className="fade-in" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '6px',
                  color: '#ef4444',
                  fontSize: '12px'
                }}>
                  <AlertCircle size={14} />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: darkMode ? '#fff' : '#1e40af'
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock 
                  size={18} 
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: darkMode ? '#64748b' : '#94a3b8'
                  }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '12px 44px 12px 44px',
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    border: `1px solid ${errors.password 
                      ? '#ef4444' 
                      : darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(30, 64, 175, 0.2)'}`,
                    borderRadius: '10px',
                    fontSize: '14px',
                    color: darkMode ? '#fff' : '#0f172a',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(30, 64, 175, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: darkMode ? '#64748b' : '#94a3b8',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <div className="fade-in" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '6px',
                  color: '#ef4444',
                  fontSize: '12px'
                }}>
                  <AlertCircle size={14} />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Remember & Forgot */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '28px'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                color: darkMode ? '#94a3b8' : '#64748b'
              }}>
                <input type="checkbox" style={{
                  width: '16px',
                  height: '16px',
                  cursor: 'pointer',
                  accentColor: '#3b82f6'
                }} />
                Remember me
              </label>
              <Link to="/forgot-password" style={{
                fontSize: '14px',
                color: '#3b82f6',
                textDecoration: 'none',
                fontWeight: '500'
              }}>
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="hover-lift"
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)',
                border: 'none',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '15px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                boxShadow: '0 8px 20px rgba(231, 76, 140, 0.3)',
                opacity: isLoading ? 0.7 : 1,
                transition: 'all 0.3s ease'
              }}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '28px 0'
          }}>
            <div style={{
              flex: 1,
              height: '1px',
              background: darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(30, 64, 175, 0.15)'
            }} />
            <span style={{
              fontSize: '13px',
              color: darkMode ? '#64748b' : '#94a3b8'
            }}>OR</span>
            <div style={{
              flex: 1,
              height: '1px',
              background: darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(30, 64, 175, 0.15)'
            }} />
          </div>

          {/* Social Login */}
          <div style={{ display: 'grid', gap: '12px' }}>
            <button className="hover-scale transition-all" style={{
              width: '100%',
              padding: '12px',
              background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
              border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(30, 64, 175, 0.2)'}`,
              borderRadius: '10px',
              color: darkMode ? '#fff' : '#1e40af',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
              </svg>
              Continue with Google
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-4">
          <p style={{
            color: darkMode ? '#94a3b8' : '#64748b',
            fontSize: '14px'
          }}>
            Don't have an account?{' '}
            <Link to="/register" style={{
              color: '#3b82f6',
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;