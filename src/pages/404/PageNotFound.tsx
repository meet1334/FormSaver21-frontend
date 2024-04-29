import React from 'react';

const SiteTrouble = () => {
  return (
    <section
      style={{
        height: 'calc(100vh - 40px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ position: 'relative', marginBottom: '6px' }}>
          <h1
            style={{
              fontSize: '300px',
              lineHeight: '1',
              fontFamily: 'BinerkaDemo',
              fontWeight: 'bold',
              color: '#5400CF',
              textShadow: '-8px 0 0 #000',
            }}
          >
            <span style={{ textShadow: '-8px 0 0 #000' }}>4</span>
            <span style={{ textShadow: '-8px 0 0 #000' }}>0</span>
            <span style={{ textShadow: '-8px 0 0 #000' }}>4</span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default SiteTrouble;
