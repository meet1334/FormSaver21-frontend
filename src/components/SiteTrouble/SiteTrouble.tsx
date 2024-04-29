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
              fontSize: '200px',
              lineHeight: '1',
              fontFamily: 'BinerkaDemo',
              fontWeight: 'bold',
              color: '#5400CF',
              textShadow: '-8px 0 0 #000',
            }}
          >
            <span style={{ textShadow: '-8px 0 0 #000' }}>O</span>
            <span style={{ textShadow: '-8px 0 0 #000' }}>o</span>
            <span style={{ textShadow: '-8px 0 0 #000' }}>p</span>
            <span style={{ textShadow: '-8px 0 0 #000' }}>s</span>
            <span style={{ textShadow: '-8px 0 0 #000' }}>!</span>
          </h1>
        </div>
        <h2
          style={{
            fontSize: '20px',
            marginBottom: '8px',
            fontFamily: 'BinerkaDemo',
            fontWeight: 'bold',
            maxWidth: '300px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Something went wrong. Try Again.
        </h2>
      </div>
    </section>
  );
};

export default SiteTrouble;
