// src/utils/helpers.js

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Generate unique ID
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Truncate text
export const truncateText = (text, length = 50) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

// Get initials from name
export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Color generator for avatars
export const getColorFromString = (str) => {
  const colors = [
    '#e74c8c', '#a855f7', '#3b82f6', '#10b981', 
    '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'
  ];
  const index = str.charCodeAt(0) % colors.length;
  return colors[index];
};