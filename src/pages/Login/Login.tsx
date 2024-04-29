// import { At, Button, CheckBox, FormInput, LockOff, SiteLogoWithText } from '@radefy/component';
import {  Form, Formik, FormikValues } from 'formik';
import  { useState } from 'react';
import { initialLoginValues, validationSchemaLogin } from '../../utils/helper/login';
import FormInput from '../../components/FormInput/FormInput';
import Button from '../../components/Button/Button';
import { login } from '../../services/auth';
import { useDispatch } from 'react-redux';
import { setTokens } from '../../redux/ducks/token';
import { ToastShow } from '../../redux/ducks/toast';

const Login = () => {
  const dispatch = useDispatch();
  const [loginProcess, setLoginProcess] = useState(false);


  const handleLogin = async (values: FormikValues) => {
    setLoginProcess(true);
    try {
      const response = await login({ email: values.email, password: values.password });
      if (response.status === 200) {
        dispatch(
          setTokens({
            accessToken: response.data.accessToken,
          })
        );
        dispatch(
          ToastShow({
            message: 'User Login Successfully ',
            type: 'success',
          })
        );
        if (typeof window !== 'undefined') {
          localStorage.setItem('jwttoken', response.data.accessToken.jwt);
        }
      } else {
        dispatch(ToastShow({ message: response.data.message, type: 'error' }));
      }
      setLoginProcess(false);
    } catch (error) {
      setLoginProcess(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#5400CF', width: 'auto', height: '1050px' }}>
      <div
        style={{
          border: '5px solid white ',
          borderRadius: '12px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '50px',
          boxShadow: '0 0 0.5rem hsl(300, 40%, 5%)',
          backgroundColor: 'white',
        }}
      >
        <Formik
          initialValues={initialLoginValues}
          validationSchema={validationSchemaLogin}
          onSubmit={handleLogin}
          enableReinitialize
        >
          {({ values, errors, touched }) => (
            <Form>
              <div>
                <FormInput
                  id="email"
                  label="Email"
                  name="email"
                  type="text"
                  placeholder="Email or Username"
                  maxLength={50}
                  required={true}
                />
                <FormInput
                  label="Password"
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  maxLength={50}
                  required={true}
                />
              </div>
              <Button
                type="submit"
                style={{
                  marginTop: '30px',
                  border: '2px solid',
                  padding: '10px 10px',
                  fontSize: '15px',
                  backgroundColor: '#5400CF',
                  width: '50%',
                  height: '20%',
                  color: 'white',
                  borderRadius: '10px',
                }}
                parentStyle={{ marginLeft: '30%', marginTop: '20px' }}
                loader={loginProcess}
              >
                Sign in
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
