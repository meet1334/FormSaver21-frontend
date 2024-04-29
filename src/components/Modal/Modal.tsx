import React, { useState } from 'react';

const Modal = (props: any) => {
  const [modelClose, setModelClose] = useState<boolean>(false);
  return (
    props?.isModelOpen &&
    <div
      id="myModal"
      style={{
        display: modelClose ? 'none' : 'block',
        position: 'fixed',
        zIndex: '1',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      }}
    >
      <div
        style={{
          backgroundColor: '#fefefe',
          margin: '15% auto',
          padding: '20px',
          border: '1px solid #888',
          width: '80%',
          maxWidth: '400px',
          textAlign: 'center',
          borderRadius: '8px',
        }}
      >
        <h2>Confirm Delete</h2>
        <p>{props?.title}</p>

        <button
          style={{
            padding: '10px 20px',
            border: 'none',
            backgroundColor: '#5400CF',
            color: '#fff',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={props?.onClickHandler}
        >
          {props?.onClickBtn}
        </button>
        {props?.isCloseBtn && (
          <button
            style={{
              padding: '10px 20px',
              border: 'none',
              backgroundColor: '#5400CF',
              color: '#fff',
              borderRadius: '5px',
              cursor: 'pointer',
              marginLeft:"10px"
            }}
            onClick={props?.onCloseHandler}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
