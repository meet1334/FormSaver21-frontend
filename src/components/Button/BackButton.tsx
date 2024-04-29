import React, { LegacyRef } from 'react';

interface IBackButton {
  style?: any;
  children?: JSX.Element | string;
  onClickHandler?: (e?: any) => void;
}

const BackArrow = (props: IBackButton) => {
  return (
    <>
      <button
        style={{
          backgroundColor: '#5400CF',
          border: 'none',
          borderRadius: '5px',
          padding: '10px',
          cursor: 'pointer',
          transition: 'backgroundColor 0.3s ease',
        }}
        onClick={props.onClickHandler}
      >
        <div style={props?.style}>
          <svg
            style={{
              width: '24px',
              height: '24px',
              fill: '#000',
              transition: 'fill 0.3s ease',
            }}
            viewBox="0 0 24 24"
          >
            <path d="M10 17l5-5-5-5v10z"></path>
            {props.children}
            <path fill="none" d="M0 24V0h24v24H0z"></path>
          </svg>
        </div>
      </button>
    </>
  );
};

export default BackArrow;
