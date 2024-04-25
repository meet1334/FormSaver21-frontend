import { ErrorMessage, useField } from 'formik';
import { useRef, useState } from 'react';
import { TEXT_MAXLENGTH } from '../../constants/constant';

const FormInput = (props: any) => {
  const [field] = useField(props.name);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [toggle, setToggle] = useState<boolean>(true);

  const handleClickShowPassword = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          {props?.label} {props?.required && <span style={{ color: 'red' }}>*</span>}
        </label>
        <br></br>
        <input
          {...field}
          autoComplete="off"
          type={props.type ? (props.type === 'password' && !toggle ? 'text' : props.type) : 'text'}
          style={{
            width: '400px',
            padding: '10px',
            border: '1px solid #cccccc',
            borderRadius: '10px',
            boxSizing: 'border-box',
            fontSize: '16px',
          }}
          placeholder={`${props.placeholder ? props.placeholder : 'text'}`}
          readOnly={props.readonly !== undefined ? props.readonly : undefined}
          disabled={props.disabled !== undefined ? props.disabled : undefined}
          onKeyDown={props.onKeyDownHandler}
          onFocus={props.onFocusHandler}
          onBlur={props.onBlurHandler}
          value={props.values ? props.values : field.value}
          onChange={(e) => {
            props.onRefChange && props.onRefChange(inputRef);
            props.onChangeHandler ? props.onChangeHandler(e) : field.onChange(e);
            props.debounceHandler && props.debounceHandler(e);
          }}
          maxLength={props.maxLength ? props.maxLength : TEXT_MAXLENGTH}
          ref={inputRef}
        />
        {props.type === 'password' && (
          <>
            <span
              onClick={handleClickShowPassword}
              style={{
                border: '1px solid white',
                backgroundColor: '#5400CF',
                color: 'white',
                borderRadius: '50%',
                fontSize: '12px',
                padding: '4px 8px',
                marginLeft: '8px',
              }}
            >
              {!toggle ? <span>H</span> : <span>S</span>}
            </span>
          </>
        )}
        <br></br>
        <ErrorMessage name={props.name}>
          {(msg) => (
            <div className="fm_error" style={{ color: 'red', marginTop: '20px' }}>
              {typeof msg === 'string' && msg}
            </div>
          )}
        </ErrorMessage>
      </div>
    </>
  );
};

export default FormInput;
