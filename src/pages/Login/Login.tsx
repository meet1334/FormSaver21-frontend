// import { At, Button, CheckBox, FormInput, LockOff, SiteLogoWithText } from '@radefy/component';
import { ErrorMessage, Form, Formik, Field, FormikValues } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialLoginValues, validationSchemaLogin } from '../../utils/helper/login';
import FormInput from '../../components/FormInput/FormInput';
import CustomSelect from '../../components/Select/CustomSelect';
import Button from '../../components/Button/Button';
import { login } from '../../services/auth';
import { useDispatch } from 'react-redux';
import { setTokens } from '../../redux/ducks/token';
import { ToastShow } from '../../redux/ducks/toast';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginProcess, setLoginProcess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: FormikValues) => {
    console.log(values, '786');

    setLoginProcess(true);
    try {
      const response = await login({ email: values.email, password: values.password });
      if (response.status === 200) {
        const cookieHeader = response.headers['Set-Cookie'];
        // Log cookie value
        console.log('Cookie:', cookieHeader);
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
    <div style={{ backgroundColor: '#FFCA04', width: 'auto', height: '950px' }}>
      <div
        style={{
          border: '5px solid orange ',
          borderRadius: '12px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '50px',
          boxShadow: '0 0 0.5rem hsl(300, 40%, 5%)',
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
                {/* <CustomSelect
                  // parentClass="mb-4 last:mb-0"
                  selectLable="Room number"
                  isMulti={false}
                  name="roomNumber"
                  options={[
                    { label: 'meet', value: 'meet' },
                    { label: 'meet22', value: 'meet22' },
                    { label: 'meet1', value: 'meet1' },
                  ]}
                  placeholder="Please Select Room"
                  style={{ margin: '12px', width: '300px' }}
                  required={true}
                /> */}
              </div>

              <Button type="submit" parentStyle={{ marginLeft: '140px' }} loader={loginProcess}>
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
