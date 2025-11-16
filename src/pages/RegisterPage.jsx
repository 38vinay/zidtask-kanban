// src/components/forms/Register.jsx
import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle, Building } from 'lucide-react';

const Register = () => {
  const { darkMode } = useTheme();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    role: 'employee'
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name can only contain letters and spaces';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Company validation (optional but if provided, must be valid)
    if (formData.company && formData.company.trim().length < 2) {
      newErrors.company = 'Company name must be at least 2 characters';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms acceptance
    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
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
    
    // Clear error when user starts typing
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
        const userData = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          company: formData.company,
          role: formData.role,
          createdAt: new Date().toISOString()
        };
        
        register(userData);
        setIsLoading(false);
        
        // Show success message or redirect
        console.log('Registration successful:', userData);
      }, 1500);
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    if (strength <= 2) return { strength: 33, label: 'Weak', color: '#ef4444' };
    if (strength <= 3) return { strength: 66, label: 'Medium', color: '#f59e0b' };
    return { strength: 100, label: 'Strong', color: '#10b981' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: darkMode 
        ? 'radial-gradient(ellipse at top, rgba(231, 76, 140, 0.15) 0%, transparent 50%), #0a0f1e'
        : 'radial-gradient(ellipse at top, rgba(231, 76, 140, 0.1) 0%, transparent 50%), #ffffff',
      padding: '40px 20px',
      position: 'relative'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(30, 64, 175, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite'
      }} />

      <div className="fade-in" style={{
        width: '100%',
        maxWidth: '520px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div className="text-center mb-4">
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
            boxShadow: '0 4px 12px rgba(231, 76, 140, 0.3)',
            margin: '0 auto 20px'
          }}>Z</div>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            marginBottom: '8px',
            color: darkMode ? '#fff' : '#1e40af'
          }}>Create Your Account</h2>
          <p style={{
            color: darkMode ? '#94a3b8' : '#64748b',
            fontSize: '14px'
          }}>Join ZidTask and start managing your tasks efficiently</p>
        </div>

        {/* Register Card */}
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
          <div>
            {/* Full Name Field */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: darkMode ? '#fff' : '#1e40af'
              }}>
                Full Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <User 
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
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 44px',
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    border: `1px solid ${errors.name 
                      ? '#ef4444' 
                      : darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(30, 64, 175, 0.2)'}`,
                    borderRadius: '10px',
                    fontSize: '14px',
                    color: darkMode ? '#fff' : '#0f172a',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              {errors.name && (
                <div className="fade-in" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '6px',
                  color: '#ef4444',
                  fontSize: '12px'
                }}>
                  <AlertCircle size={14} />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            {/* Email Field */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: darkMode ? '#fff' : '#1e40af'
              }}>
                Email Address <span style={{ color: '#ef4444' }}>*</span>
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
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
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

            {/* Company Field (Optional) */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: darkMode ? '#fff' : '#1e40af'
              }}>
                Company Name <span style={{ color: darkMode ? '#64748b' : '#94a3b8', fontSize: '12px' }}>(Optional)</span>
              </label>
              <div style={{ position: 'relative' }}>
                <Building 
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
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter your company name"
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 44px',
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    border: `1px solid ${errors.company 
                      ? '#ef4444' 
                      : darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(30, 64, 175, 0.2)'}`,
                    borderRadius: '10px',
                    fontSize: '14px',
                    color: darkMode ? '#fff' : '#0f172a',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              {errors.company && (
                <div className="fade-in" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '6px',
                  color: '#ef4444',
                  fontSize: '12px'
                }}>
                  <AlertCircle size={14} />
                  <span>{errors.company}</span>
                </div>
              )}
            </div>

            {/* Role Selection */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: darkMode ? '#fff' : '#1e40af'
              }}>
                Your Role <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px'
              }}>
                {['employee', 'manager', 'admin'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role }))}
                    style={{
                      padding: '10px',
                      background: formData.role === role 
                        ? 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)'
                        : darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                      border: `1px solid ${formData.role === role 
                        ? 'transparent'
                        : darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(30, 64, 175, 0.2)'}`,
                      borderRadius: '8px',
                      color: formData.role === role ? '#fff' : (darkMode ? '#94a3b8' : '#64748b'),
                      fontSize: '13px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textTransform: 'capitalize'
                    }}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: darkMode ? '#fff' : '#1e40af'
              }}>
                Password <span style={{ color: '#ef4444' }}>*</span>
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
                  placeholder="Create a strong password"
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
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
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
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div style={{ marginTop: '8px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '4px'
                  }}>
                    <span style={{ fontSize: '12px', color: darkMode ? '#94a3b8' : '#64748b' }}>
                      Password Strength
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: passwordStrength.color }}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '4px',
                    background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${passwordStrength.strength}%`,
                      height: '100%',
                      background: passwordStrength.color,
                      transition: 'all 0.3s ease'
                    }} />
                  </div>
                </div>
              )}
              
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

            {/* Confirm Password Field */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: darkMode ? '#fff' : '#1e40af'
              }}>
                Confirm Password <span style={{ color: '#ef4444' }}>*</span>
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
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  style={{
                    width: '100%',
                    padding: '12px 44px 12px 44px',
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    border: `1px solid ${errors.confirmPassword 
                      ? '#ef4444' 
                      : darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(30, 64, 175, 0.2)'}`,
                    borderRadius: '10px',
                    fontSize: '14px',
                    color: darkMode ? '#fff' : '#0f172a',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <div className="fade-in" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '6px',
                  color: '#10b981',
                  fontSize: '12px'
                }}>
                  <CheckCircle size={14} />
                  <span>Passwords match</span>
                </div>
              )}
              {errors.confirmPassword && (
                <div className="fade-in" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '6px',
                  color: '#ef4444',
                  fontSize: '12px'
                }}>
                  <AlertCircle size={14} />
                  <span>{errors.confirmPassword}</span>
                </div>
              )}
            </div>

            {/* Terms and Conditions */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                cursor: 'pointer',
                fontSize: '13px',
                color: darkMode ? '#94a3b8' : '#64748b'
              }}>
                <input 
                  type="checkbox" 
                  checked={acceptTerms}
                  onChange={(e) => {
                    setAcceptTerms(e.target.checked);
                    if (errors.terms) {
                      setErrors(prev => ({ ...prev, terms: '' }));
                    }
                  }}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: '#3b82f6',
                    marginTop: '2px'
                  }} 
                />
                <span>
                  I agree to the{' '}
                  <span style={{ color: '#3b82f6', fontWeight: '500' }}>Terms of Service</span>
                  {' '}and{' '}
                  <span style={{ color: '#3b82f6', fontWeight: '500' }}>Privacy Policy</span>
                </span>
              </label>
              {errors.terms && (
                <div className="fade-in" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '6px',
                  marginLeft: '28px',
                  color: '#ef4444',
                  fontSize: '12px'
                }}>
                  <AlertCircle size={14} />
                  <span>{errors.terms}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="hover-lift"
              style={{
                width: '100%',
                padding: '14px',
                background: isLoading 
                  ? 'rgba(168, 85, 247, 0.5)'
                  : 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)',
                border: 'none',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '15px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                boxShadow: '0 8px 20px rgba(231, 76, 140, 0.3)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTopColor: '#fff',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                  Creating Your Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

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

          {/* Social Register */}
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

        {/* Sign In Link */}
        <div className="text-center mt-4">
          <p style={{
            color: darkMode ? '#94a3b8' : '#64748b',
            fontSize: '14px'
          }}>
            Already have an account?{' '}
            <button 
              onClick={() => window.location.href = '/login'}
              style={{
                color: '#3b82f6',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              Sign In
            </button>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        
        .scale-in {
          animation: scaleIn 0.6s ease-out;
        }
        
        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .hover-lift {
          transition: all 0.3s ease;
        }
        
        .hover-lift:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(231, 76, 140, 0.4);
        }
        
        .hover-lift:active:not(:disabled) {
          transform: translateY(0);
        }
        
        .hover-scale {
          transition: all 0.3s ease;
        }
        
        .hover-scale:hover {
          transform: scale(1.02);
        }
        
        .hover-scale:active {
          transform: scale(0.98);
        }
        
        input::placeholder {
          color: ${darkMode ? '#64748b' : '#94a3b8'};
        }
        
        input:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default Register;