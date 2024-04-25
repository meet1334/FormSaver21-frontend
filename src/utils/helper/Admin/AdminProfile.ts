import * as Yup from 'yup';

export const initialAdminProfileValues = {
  _id: '',
  firstname: '',
  lastname: '',
  title: '',
  email: '',
  phoneNumber: '',
  dob: '',
  role: '',
  district: '',
  taluka: '',
  city: '',
  pincode: '',
  address: '',
  profession: '',
  isActive: true,
  createdBy: '',
  __v: 0,
  username: '',
  password: '',
};

export const validationSchemaAdminProfile = Yup.object().shape({
  title: Yup.string().trim().required('Title  is required'),
  firstname: Yup.string().trim().required('First name is required'),
  lastname: Yup.string().trim().required('Last name is required'),
  phoneNumber: Yup.string().trim().required('Phone number is required'),
  dob: Yup.string().trim().required('Date is required'),
  email: Yup.string().trim().required('Email is required'),
  district: Yup.string().trim().required('District  is required'),
  taluka: Yup.string().trim().required('Taluka  is required'),
  city: Yup.string().trim().required('City  is required'),
  pincode: Yup.string().trim().required('Pincode  is required'),
  address: Yup.string().trim().required('Address  is required'),
  profession: Yup.string().trim().required('Profession  is required'),
  username: Yup.string().trim().required('Profession  is required'),
  password: Yup.string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one capital letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one symbol')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
});
