import * as Yup from 'yup';

export const initialLoginValues = {
  email: '',
  password: '',
  //   keepSignedIn: false,
};

export const validationSchemaLogin = Yup.object().shape({
  email: Yup.string()
    .trim()
    // .email('Email is invalid')
    .required('Email is required'),
  // .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, 'Invalid Email id'),
  password: Yup.string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one capital letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one symbol')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
});
