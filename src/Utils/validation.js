// src/utils/validation.js - Input validation and sanitization

/**
 * Email validation
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Password validation
 * Requirements: 
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 */
export const isValidPassword = (password) => {
  if (!password || password.length < 8) return false;
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  return hasUpperCase && hasLowerCase && hasNumber;
};

/**
 * Get password strength
 */
export const getPasswordStrength = (password) => {
  if (!password) return { strength: 0, label: 'None', color: '#cbd5e1' };
  
  let strength = 0;
  
  // Length checks
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  
  // Character variety checks
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z\d]/.test(password)) strength++; // Special characters
  
  if (strength <= 2) return { strength: 33, label: 'Weak', color: '#ef4444' };
  if (strength <= 3) return { strength: 66, label: 'Medium', color: '#f59e0b' };
  return { strength: 100, label: 'Strong', color: '#10b981' };
};

/**
 * Name validation (letters and spaces only, 2-50 characters)
 */
export const isValidName = (name) => {
  if (!name) return false;
  const trimmedName = name.trim();
  return trimmedName.length >= 2 && 
         trimmedName.length <= 50 && 
         /^[a-zA-Z\s]+$/.test(trimmedName);
};

/**
 * Sanitize string input (remove HTML tags and dangerous characters)
 */
export const sanitizeString = (str) => {
  if (!str) return '';
  
  // Remove HTML tags
  let sanitized = str.replace(/<[^>]*>/g, '');
  
  // Escape special characters
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    "/": '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  sanitized = sanitized.replace(reg, (match) => map[match]);
  
  return sanitized.trim();
};

/**
 * Validate board name
 */
export const isValidBoardName = (name) => {
  if (!name) return false;
  const trimmedName = name.trim();
  return trimmedName.length >= 2 && trimmedName.length <= 50;
};

/**
 * Validate task title
 */
export const isValidTaskTitle = (title) => {
  if (!title) return false;
  const trimmedTitle = title.trim();
  return trimmedTitle.length >= 1 && trimmedTitle.length <= 200;
};

/**
 * Validate URL
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate hex color code
 */
export const isValidHexColor = (color) => {
  return /^#[0-9A-F]{6}$/i.test(color);
};

/**
 * Validate form data with multiple fields
 */
export const validateForm = (fields, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(fieldName => {
    const value = fields[fieldName];
    const fieldRules = rules[fieldName];
    
    // Required check
    if (fieldRules.required && (!value || value.toString().trim() === '')) {
      errors[fieldName] = fieldRules.message || `${fieldName} is required`;
      return;
    }
    
    // Skip other validations if field is empty and not required
    if (!value && !fieldRules.required) return;
    
    // Min length check
    if (fieldRules.minLength && value.length < fieldRules.minLength) {
      errors[fieldName] = `Must be at least ${fieldRules.minLength} characters`;
      return;
    }
    
    // Max length check
    if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
      errors[fieldName] = `Must be no more than ${fieldRules.maxLength} characters`;
      return;
    }
    
    // Pattern check
    if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
      errors[fieldName] = fieldRules.message || 'Invalid format';
      return;
    }
    
    // Custom validator
    if (fieldRules.validator && !fieldRules.validator(value)) {
      errors[fieldName] = fieldRules.message || 'Invalid value';
      return;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Example usage of validateForm:
 * 
 * const rules = {
 *   email: {
 *     required: true,
 *     validator: isValidEmail,
 *     message: 'Please enter a valid email'
 *   },
 *   password: {
 *     required: true,
 *     minLength: 8,
 *     validator: isValidPassword,
 *     message: 'Password must be at least 8 characters with uppercase, lowercase, and number'
 *   },
 *   name: {
 *     required: true,
 *     minLength: 2,
 *     maxLength: 50,
 *     pattern: /^[a-zA-Z\s]+$/,
 *     message: 'Name must contain only letters and spaces'
 *   }
 * };
 * 
 * const { isValid, errors } = validateForm(formData, rules);
 */

export default {
  isValidEmail,
  isValidPassword,
  getPasswordStrength,
  isValidName,
  sanitizeString,
  isValidBoardName,
  isValidTaskTitle,
  isValidUrl,
  isValidHexColor,
  validateForm
};