import * as Yup from 'yup';

export const initialUserValue = {
  _id: '',
  firstname: '',
  middlename: '',
  lastname: '',
  title: '',
  email: '',
  phoneNumber: '',
  dob: '',
  district: '',
  taluka: '',
  city: '',
  pincode: '',
  address: '',
  profession: '',
};

export const validationSchemaUserProfile = Yup.object().shape({
  title: Yup.string().trim().required('Title  is required'),
  firstname: Yup.string().trim().required('First name is required'),
  middlename: Yup.string().trim().required('Middle name is required'),
  lastname: Yup.string().trim().required('Last name is required'),
  dob: Yup.string().trim().required('Date is required'),
  phoneNumber: Yup.string().trim().required('Phone number is required'),
  email: Yup.string().trim().required('Email is required'),
  profession: Yup.string().trim().required('Profession  is required'),
  district: Yup.string().trim().required('District  is required'),
  taluka: Yup.string().trim().required('Taluka  is required'),
  city: Yup.string().trim().required('City  is required'),
  pincode: Yup.string().trim().required('Pincode  is required'),
  address: Yup.string().trim().required('Address  is required'),
});
