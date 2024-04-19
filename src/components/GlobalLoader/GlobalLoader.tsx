import React from 'react';

const GlobalLoader = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '60px',
          height: '60px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#6B46C1',
            borderRadius: '12px',
            position: 'absolute',
            animation: 'logoRotate 2s linear infinite',
          }}
        ></span>
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            border: '8px solid #ffffff',
            position: 'absolute',
          }}
        ></span>
        <span
          style={{
            width: '18px',
            height: '6px',
            backgroundColor: '#ffffff',
            border: '2px solid #ffffff',
            position: 'absolute',
            right: 0,
          }}
        ></span>
      </div>
    </div>
  );
};

export default GlobalLoader;
