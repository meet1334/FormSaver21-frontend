import { useField } from 'formik';

const FormInput = (props: any) => {
  const { label, ...propsa } = props;
  const [field, meta] = useField(props);
  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          {label} {props?.required && <span style={{ color: 'red' }}>*</span>}
        </label>
        <br></br>
        <input
          autoComplete="off"
          {...field}
          {...propsa}
          style={{
            width: '400px',
            padding: '10px',
            border: '1px solid #cccccc',
            borderRadius: '10px',
            boxSizing: 'border-box',
            fontSize: '16px',
          }}
        />
        <br></br>
        {meta?.error && meta?.touched && (
          <div style={{ marginTop: '10px', color: 'red' }}>{meta?.error}</div>
        )}
      </div>
    </>
  );
};

export default FormInput;
