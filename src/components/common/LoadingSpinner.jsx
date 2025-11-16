// src/components/common/LoadingSpinner.jsx
import React from 'react';

export const LoadingSpinner = ({ size = 'md', color = '#3b82f6', fullScreen = false }) => {
  const sizes = {
    sm: 20,
    md: 40,
    lg: 60,
    xl: 80
  };

  const spinnerSize = sizes[size] || sizes.md;

  const spinner = (
    <div style={{
      width: `${spinnerSize}px`,
      height: `${spinnerSize}px`,
      border: `${spinnerSize / 10}px solid rgba(59, 130, 246, 0.1)`,
      borderTopColor: color,
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
  );

  if (fullScreen) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999
      }}>
        {spinner}
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      {spinner}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

// Skeleton Loading Component
export const Skeleton = ({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '4px',
  variant = 'text',
  count = 1 
}) => {
  const variants = {
    text: { height: '20px', borderRadius: '4px' },
    title: { height: '32px', borderRadius: '6px' },
    avatar: { width: '40px', height: '40px', borderRadius: '50%' },
    card: { height: '200px', borderRadius: '12px' },
    button: { height: '40px', borderRadius: '8px' }
  };

  const style = variants[variant] || variants.text;

  const skeletonElement = (
    <div style={{
      width: width,
      height: height || style.height,
      borderRadius: borderRadius || style.borderRadius,
      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'loading 1.5s ease-in-out infinite'
    }} />
  );

  return (
    <>
      {count > 1 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {Array.from({ length: count }).map((_, i) => (
            <div key={i}>{skeletonElement}</div>
          ))}
        </div>
      ) : (
        skeletonElement
      )}
      <style>{`
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  );
};

// Card Skeleton
export const CardSkeleton = ({ count = 1 }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px'
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          background: 'white',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Skeleton variant="avatar" />
            <div style={{ flex: 1 }}>
              <Skeleton width="60%" height="16px" />
              <div style={{ height: '8px' }} />
              <Skeleton width="40%" height="12px" />
            </div>
          </div>
          <Skeleton count={3} />
        </div>
      ))}
    </div>
  );
};

// Board List Skeleton
export const BoardListSkeleton = ({ count = 3 }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <Skeleton width="150px" height="24px" />
            <Skeleton width="60px" height="20px" />
          </div>
          <Skeleton width="80%" height="14px" />
        </div>
      ))}
    </div>
  );
};

// Dashboard Stats Skeleton
export const DashboardStatsSkeleton = () => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px'
    }}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <Skeleton width="100px" height="16px" />
            <Skeleton width="40px" height="16px" />
          </div>
          <Skeleton width="80px" height="36px" />
          <div style={{ height: '12px' }} />
          <Skeleton width="120px" height="12px" />
        </div>
      ))}
    </div>
  );
};

export default LoadingSpinner;