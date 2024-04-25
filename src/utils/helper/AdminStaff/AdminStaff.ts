import * as Yup from 'yup';

export const initialAdminStaffProfileValues = {
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
  createdBy: '',
  username:'',
  password:''
};

export const validationSchemaAdminStaffProfile = Yup.object().shape({
    title: Yup.string().trim().required('Title  is required'),
  firstname: Yup.string().trim().required('First name is required'),
  lastname: Yup.string().trim().required('Last name is required'),
  dob: Yup.string().trim().required('Date is required'),
  phoneNumber : Yup.string().trim().required('Phone number is required'),
  email: Yup.string().trim().required('Email is required'),
  profession: Yup.string().trim().required('Profession  is required'),
  role : Yup.string().trim().required('Role is required'),
  district: Yup.string().trim().required('District  is required'),
  taluka: Yup.string().trim().required('Taluka  is required'),
  city: Yup.string().trim().required('City  is required'),
  pincode: Yup.string().trim().required('Pincode  is required'),
  address: Yup.string().trim().required('Address  is required'),
  username:Yup.string().trim().required('Profession  is required'),
  password: Yup.string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one capital letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one symbol')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
});
