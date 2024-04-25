import { Form, Formik, Field, FormikValues } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import FormInput from '../../components/FormInput/FormInput';
import CustomSelect from '../../components/Select/CustomSelect';
import Button from '../../components/Button/Button';
import { useDispatch } from 'react-redux';
import { ToastShow } from '../../redux/ducks/toast';
import { generalContext } from '../../app/App';
import { getAdminUser, updateAdminUser } from '../../services/adminUser';
import Card from '../../components/Card/Card';
import { ICreateEditAdminUserProfile } from '../../types/Admin/AdminProfile';
import {
  initialAdminProfileValues,
  validationSchemaAdminProfile,
} from '../../utils/helper/Admin/AdminProfile';
import GlobalLoader from '../../components/GlobalLoader/GlobalLoader';
import { TITLE_OPTIONS } from '../../constants/constant';
import {
  DISTRICT_OPTION,
  DistrictData,
  TALUKA_OPTIONS,
} from '../../constants/district-taluka-city';
import { OnChangeValue } from 'react-select';
import { Option } from '../../types/CustomSelect';
import { VILLAGES_OPTIONS } from '../../constants/villages';

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { userId } = useContext(generalContext);
  const [initialProfileValues, setInitialProfileValues] =
    useState<ICreateEditAdminUserProfile>(initialAdminProfileValues);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [talukaOptions, setTalukaOptions] = useState<any>(TALUKA_OPTIONS);
  const [villageOptions, setVillageOptions] = useState<any>(VILLAGES_OPTIONS);

  const getAdminProfile = async (id: string | number) => {
    setIsLoading(true);
    try {
      const getAdminRes = await getAdminUser(id);
      if (getAdminRes.status === 200) {
        setInitialProfileValues(getAdminRes?.data?.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values: FormikValues) => {
    setUpdateLoading(true);
    try {
      const response = await updateAdminUser(values, '66210d314eb6e0af9112197b');
      if (response.status === 200) {
        dispatch(
          ToastShow({
            message: response?.data?.message,
            type: 'success',
          })
        );
      } else {
      }
      setUpdateLoading(false);
    } catch (error) {
      dispatch(
        ToastShow({
          message: 'Something Error.',
          type: 'error',
        })
      );
      setUpdateLoading(false);
    }
  };
  useEffect(() => {
    const userId = '66210d314eb6e0af9112197b';
    getAdminProfile(userId);
  }, []);
  return isLoading ? (
    <GlobalLoader />
  ) : (
    <Card title={'PROFILE'}>
      <div style={{ backgroundColor: 'white', width: 'auto', height: '950px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ marginRight: '10px', fontWeight: 'bold' }}>ID:</span>
          <span style={{ color: '#333', fontWeight: 'bold' }}>{initialProfileValues?._id}</span>
        </div>

        <div style={{}}>
          <Formik
            initialValues={initialProfileValues}
            validationSchema={validationSchemaAdminProfile}
            onSubmit={handleSubmit}
            enableReinitialize={false}
          >
            {({ values, setFieldValue, errors }) => (
              <Form>
                <div>
                  <div>
                    <Button
                      type="submit"
                      style={{
                        margin: '10px',
                        border: '2px solid',
                        padding: '10px 5px',
                        fontSize: '15px',
                        backgroundColor: '#5400CF',
                        width: '80%',
                        height: '20%',
                        color: 'white',
                        borderRadius: '10px',
                      }}
                      parentStyle={{ marginLeft: '90%' }}
                      loader={updateLoading}
                    >
                      Save
                    </Button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', width: '80%' }}>
                    <div style={{ width: '30%', margin: '5px', padding: '10px' }}>
                      {' '}
                      <CustomSelect
                        selectId="title"
                        labelStyle={{ marginTop: '12px', marginBottom: '20px' }}
                        selectLable="Title"
                        isMulti={false}
                        name="title"
                        options={TITLE_OPTIONS}
                        placeholder="Title"
                        style={{ width: '400px', marginTop: '12px' }}
                        required
                      />
                    </div>
                    <div style={{ width: '30%', margin: '5px', padding: '10px' }}>
                      <FormInput
                        id="firstname"
                        label="First name"
                        name="firstname"
                        type="text"
                        placeholder="first name"
                        maxLength={50}
                        required
                      />
                    </div>
                    <div style={{ width: '30%', margin: '5px', padding: '10px' }}>
                      {' '}
                      <FormInput
                        id="lastname"
                        label="Last name"
                        name="lastname"
                        type="text"
                        placeholder="Last name"
                        maxLength={50}
                        required
                      />
                    </div>

                    <div style={{ width: '30%', margin: '5px', padding: '10px' }}>
                      {' '}
                      <FormInput
                        id="dob"
                        label="Date of Birth"
                        name="dob"
                        type="text"
                        placeholder="Date of Birth"
                        maxLength={50}
                        required
                      />
                    </div>
                    <div style={{ width: '30%', margin: '5px', padding: '10px' }}>
                      <FormInput
                        id="phoneNumber"
                        label="Phone Number"
                        name="phoneNumber"
                        type="number"
                        placeholder="Phone Number"
                        maxLength={50}
                        required
                      />
                    </div>
                    <div style={{ width: '30%', margin: '5px', padding: '10px' }}>
                      {' '}
                      <FormInput
                        id="email"
                        label="Email"
                        name="email"
                        type="text"
                        placeholder="Email"
                        maxLength={50}
                        required
                      />
                    </div>
                    <div style={{ width: '30%', margin: '5px', padding: '10px' }}>
                      {' '}
                      <FormInput
                        id="profession"
                        label="Profession"
                        name="profession"
                        type="text"
                        placeholder="Profession"
                        maxLength={50}
                        required
                      />
                    </div>

                    <div style={{ width: '30%', margin: '5px', padding: '10px' }}>
                      {' '}
                      <CustomSelect
                        selectId="district"
                        labelStyle={{ marginTop: '12px', marginBottom: '20px' }}
                        selectLable="District"
                        isMulti={false}
                        name="district"
                        options={DISTRICT_OPTION}
                        onChange={(newValue: OnChangeValue<Option, boolean>) => {
                          const talukasData = DistrictData.districts.find((dis) => {
                            return dis.district === (newValue as Option).value;
                          });
                          setFieldValue('district', (newValue as Option).value);
                          setFieldValue('taluka', '');
                          setFieldValue('city', '');
                          const taluka = talukasData?.subDistricts.map((tal) => {
                            return {
                              label: tal.subDistrict,
                              value: tal.subDistrict,
                            };
                          });
                          taluka && setTalukaOptions(taluka);
                        }}
                        placeholder="District"
                        style={{ width: '400px', marginTop: '12px' }}
                        required
                      />
                    </div>
                    <div style={{ width: '30%', margin: '5px', padding: '10px' }}>
                      {' '}
                      <CustomSelect
                        selectId="taluka"
                        labelStyle={{ marginTop: '12px', marginBottom: '20px' }}
                        selectLable="Taluka"
                        isMulti={false}
                        name="taluka"
                        options={talukaOptions}
                        onChange={(newValue: OnChangeValue<Option, boolean>) => {
                          const talukas = DistrictData.districts.find(
                            (dis) => dis.district === values.district
                          );

                          const taluka = talukas?.subDistricts.find(
                            (tal) => tal.subDistrict === (newValue as Option).value
                          );
                          setFieldValue('taluka', (newValue as Option).value);
                          setFieldValue('city', '');
                          const cities = taluka?.villages.map((vil) => ({
                            label: vil,
                            value: vil,
                          }));

                          setVillageOptions(cities);
                        }}
                        placeholder="Taluka"
                        style={{ width: '400px', marginTop: '12px' }}
                        required
                      />
                    </div>
                    <div style={{ width: '30%', margin: '5px', padding: '10px' }}>
                      <CustomSelect
                        selectId="city"
                        labelStyle={{ marginTop: '12px', marginBottom: '20px' }}
                        selectLable="City"
                        isMulti={false}
                        name="city"
                        options={villageOptions}
                        onChange={(newValue: OnChangeValue<Option, boolean>) => {
                          setFieldValue('city', (newValue as Option).value);
                        }}
                        placeholder="City"
                        style={{ width: '400px', marginTop: '12px' }}
                        required
                      />
                    </div>
                    <div style={{ width: '30%', margin: '5px', padding: '10px' }}>
                      <FormInput
                        id="address"
                        label="Address"
                        name="address"
                        type="text"
                        placeholder="Address"
                        maxLength={50}
                        required
                      />
                    </div>
                    <div style={{ width: '30%', margin: '5px', padding: '10px' }}>
                      <FormInput
                        id="pincode"
                        label="Pincode"
                        name="pincode"
                        type="text"
                        placeholder="Pincode"
                        maxLength={50}
                        required
                      />
                    </div>

                    <div style={{ width: '30%', margin: '5px', padding: '10px' }}>
                      <FormInput
                        id="username"
                        label="Username"
                        name="username"
                        type="text"
                        placeholder="Username"
                        maxLength={50}
                        required
                      />
                    </div>
                    <div style={{ width: '30%', margin: '5px', padding: '10px' }}>
                      <FormInput
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        maxLength={50}
                        required
                      />
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Card>
  );
};

export default AdminProfile;
