import React, { LegacyRef } from 'react';

interface IButton {
  parentStyle?: any;
  className?: string;
  varient?: 'primaryDark' | 'primaryLight' | 'white' | 'tomato' | undefined;
  smallBtn?: boolean;
  children: JSX.Element | string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClickHandler?: (e?: any) => void;
  onlyDisable?: boolean;
  loader?: boolean;
  value?: string;
  forwardedRef?: LegacyRef<HTMLButtonElement> | null;
  id?: string;
}

const Button = (props: IButton) => {
  return (
    <div style={props?.parentStyle ?? ''}>
      <button
        id={props.id}
        ref={props.forwardedRef}
        value={props.value ? props.value : undefined}
        disabled={props.onlyDisable !== undefined ? props.onlyDisable : props.loader}
        style={{
          margin: '10px',
          border: '2px solid',
          padding: '10px 5px',
          fontSize: '15px',
          backgroundColor: 'white',
          width: '50%',
          height: '20%',
          color: 'black',
          borderRadius: '10px',
        }}
        type={props.type}
        onClick={props.onClickHandler}
      >
        {props.children}
        {props.loader && (props.onlyDisable === undefined || props.onlyDisable === false) && (
          <svg
            style={{ marginLeft: '8px', marginTop: '2px' }}
            xmlns="http://www.w3.org/2000/svg"
            version="1.0"
            width="20px"
            height="20px"
            viewBox="0 0 128 128"
          >
            <g>
              <circle cx="16" cy="64" r="16" fill="#0c0d0d" />
              <circle cx="16" cy="64" r="16" fill="#5d5e5e" transform="rotate(45,64,64)" />
              <circle cx="16" cy="64" r="16" fill="#999999" transform="rotate(90,64,64)" />
              <circle cx="16" cy="64" r="16" fill="#cecfcf" transform="rotate(135,64,64)" />
              <circle cx="16" cy="64" r="16" fill="#e2e3e3" transform="rotate(180,64,64)" />
              <circle cx="16" cy="64" r="16" fill="#e2e3e3" transform="rotate(225,64,64)" />
              <circle cx="16" cy="64" r="16" fill="#e2e3e3" transform="rotate(270,64,64)" />
              <circle cx="16" cy="64" r="16" fill="#e2e3e3" transform="rotate(315,64,64)" />
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64"
                calcMode="discrete"
                dur="560ms"
                repeatCount="indefinite"
              />
            </g>
          </svg>
        )}
      </button>
    </div>
  );
};

export default Button;
