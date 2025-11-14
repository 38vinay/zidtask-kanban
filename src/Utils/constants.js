// src/utils/constants.js

export const BOARD_COLORS = [
  { name: 'Pink', value: '#e74c8c' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#10b981' },
  { name: 'Orange', value: '#f59e0b' },
  { name: 'Red', value: '#ef4444' }
];

export const LABEL_COLORS = [
  '#e74c8c', '#a855f7', '#3b82f6', '#10b981', 
  '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'
];

export const PRIORITY_LEVELS = [
  { label: 'Low', value: 'low', color: '#10b981' },
  { label: 'Medium', value: 'medium', color: '#f59e0b' },
  { label: 'High', value: 'high', color: '#ef4444' },
  { label: 'Urgent', value: 'urgent', color: '#dc2626' }
];

export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  EMPLOYEE: 'employee'
};

export const DEFAULT_COLUMNS = [
  { name: 'To Do', color: '#6b7280' },
  { name: 'In Progress', color: '#f59e0b' },
  { name: 'In Review', color: '#a855f7' },
  { name: 'Done', color: '#10b981' }
];