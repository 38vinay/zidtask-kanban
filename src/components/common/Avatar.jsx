// src/components/common/Avatar.jsx
import React from 'react';
import { getInitials, getColorFromString } from '../../Utils/helpers';

/**
 * Avatar Component
 * Displays user avatar with initials or image
 */
const Avatar = ({ 
  user, 
  size = 'md', 
  showTooltip = true,
  onClick = null,
  className = ''
}) => {
  const sizes = {
    xs: { width: 24, height: 24, fontSize: 10 },
    sm: { width: 32, height: 32, fontSize: 12 },
    md: { width: 40, height: 40, fontSize: 14 },
    lg: { width: 48, height: 48, fontSize: 16 },
    xl: { width: 64, height: 64, fontSize: 20 }
  };

  const sizeStyle = sizes[size] || sizes.md;
  const initials = user?.name ? getInitials(user.name) : '?';
  const bgColor = user?.name ? getColorFromString(user.name) : '#94a3b8';

  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        width: `${sizeStyle.width}px`,
        height: `${sizeStyle.height}px`,
        borderRadius: '50%',
        background: user?.avatar 
          ? `url(${user.avatar}) center/cover` 
          : bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: `${sizeStyle.fontSize}px`,
        fontWeight: '600',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        position: 'relative',
        flexShrink: 0
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
      title={showTooltip ? user?.name : ''}
    >
      {!user?.avatar && initials}
    </div>
  );
};

/**
 * Avatar Group Component
 * Displays multiple avatars in a group with overlap
 */
export const AvatarGroup = ({ 
  users = [], 
  max = 3, 
  size = 'md',
  onMoreClick = null 
}) => {
  const displayUsers = users.slice(0, max);
  const remaining = users.length - max;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      position: 'relative'
    }}>
      {displayUsers.map((user, index) => (
        <div
          key={user.id || index}
          style={{
            marginLeft: index > 0 ? '-8px' : '0',
            position: 'relative',
            zIndex: displayUsers.length - index,
            border: '2px solid #fff'
          }}
        >
          <Avatar user={user} size={size} />
        </div>
      ))}
      
      {remaining > 0 && (
        <div
          onClick={onMoreClick}
          style={{
            marginLeft: '-8px',
            width: size === 'sm' ? '32px' : size === 'lg' ? '48px' : '40px',
            height: size === 'sm' ? '32px' : size === 'lg' ? '48px' : '40px',
            borderRadius: '50%',
            background: '#e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
            fontSize: size === 'sm' ? '10px' : size === 'lg' ? '14px' : '12px',
            fontWeight: '600',
            cursor: onMoreClick ? 'pointer' : 'default',
            border: '2px solid #fff',
            zIndex: 0,
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (onMoreClick) {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.background = '#d1d5db';
            }
          }}
          onMouseLeave={(e) => {
            if (onMoreClick) {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = '#e5e7eb';
            }
          }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};

export default Avatar;