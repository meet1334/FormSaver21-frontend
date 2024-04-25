import React from 'react';

const Card = (props: any) => {
  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    fontFamily: 'Times New Roman, serif',
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '12px',
  };

  return (
    <div style={props.cardStyle ?? cardStyle}>
      <h2 style={titleStyle}>{props.title}</h2>
      <div>{props.children}</div>
    </div>
  );
};

export default Card;
