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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { operations } from '../../constants/constants.utils';
import {
  initialAdminStaffProfileValues,
  validationSchemaAdminStaffProfile,
} from '../../utils/helper/AdminStaff/AdminStaff';
import { ICreateEditAdminStaffProfile } from '../../types/AdminStaff/AdminStaff';
import { signUp } from '../../services/auth';

const CreateAdminStaff = () => {
  const { userId } = useContext(generalContext);
  const { operation } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [id, setId] = useState<string | number | null>('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [talukaOptions, setTalukaOptions] = useState<any>(TALUKA_OPTIONS);
  const [villageOptions, setVillageOptions] = useState<any>(VILLAGES_OPTIONS);
  const [initialUserCreateEditValues, setinitialUserCreateEditValues] =
    useState<ICreateEditAdminStaffProfile>(initialAdminStaffProfileValues);

  const getAdminStaffProfile = async (id: string | number) => {
    setIsLoading(true);
    try {
      const getAdminRes = await getAdminUser(id);
      if (getAdminRes.status === 200) {
        setinitialUserCreateEditValues(getAdminRes?.data?.data);
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
    delete values._id;
    const staffValues = { ...values, createdBy: '66210d314eb6e0af9112197b' };

    try {
      const createOrUpdateStaffResponse = id
        ? await updateAdminUser(staffValues, id)
        : await signUp(staffValues);
      if (createOrUpdateStaffResponse.status === 200) {
        dispatch(
          ToastShow({
            message: createOrUpdateStaffResponse?.data?.message,
            type: 'success',
          })
        );
        navigate('/admin-staff');
      } else {
        dispatch(
          ToastShow({
            message: 'Something Error.',
            type: 'error',
          })
        );
        setUpdateLoading(false);
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
    if (operation && operations.includes(operation)) {
      if (operation === 'edit') {
        const query = new URLSearchParams(location.search);
        const id = query.get('id');
        if (id) {
          setId(id);
        } else {
          navigate('/404', { replace: true });
        }
      } else {
        setId(null);
      }
    } else {
      navigate('/404', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, operation]);

  useEffect(() => {
    (async function () {
      if (id) {
        await getAdminStaffProfile(id);
      } else {
        setinitialUserCreateEditValues(initialAdminStaffProfileValues);
      }
    })();
  }, [id]);

  return isLoading ? (
    <GlobalLoader />
  ) : (
    <Card
      title={`${id ? 'UPDATE' : 'CREATE'} ADMIN STAFF`}
      cardStyle={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        fontFamily: 'Times New Roman, serif',
        height: '950px',
      }}
    >
      {/* <div style={{ backgroundColor: 'white', width: 'auto', height: '950px' }}> */}
      {id && (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ marginRight: '10px', fontWeight: 'bold' }}>ID:</span>
          <span style={{ color: '#333', fontWeight: 'bold' }}>{id}</span>
        </div>
      )}

      <div style={{}}>
        <Formik
          initialValues={initialUserCreateEditValues}
          validationSchema={validationSchemaAdminStaffProfile}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ values, setFieldValue, setFieldTouched, errors }) => (
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
                  <div style={{ width: '30%', margin: '1px', padding: '10px' }}>
                    {' '}
                    <CustomSelect
                      selectId="title"
                      labelStyle={{ marginTop: '8px', marginBottom: '10px' }}
                      selectLable="Title"
                      isMulti={false}
                      name="title"
                      options={TITLE_OPTIONS}
                      placeholder="Title"
                      style={{ width: '400px', marginTop: '8px' }}
                      required
                    />
                  </div>
                  <div style={{ width: '30%', margin: '1px', padding: '10px' }}>
                    <FormInput
                      id="firstname"
                      label="First name"
                      name="firstname"
                      type="text"
                      placeholder="First name"
                      maxLength={50}
                      required
                    />
                  </div>
                  <div style={{ width: '30%', margin: '1px', padding: '10px' }}>
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

                  <div style={{ width: '30%', margin: '1px', padding: '10px' }}>
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
                  <div style={{ width: '30%', margin: '1px', padding: '10px' }}>
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
                  <div style={{ width: '30%', margin: '1px', padding: '10px' }}>
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
                  <div style={{ width: '30%', margin: '1px', padding: '10px' }}>
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
                  <div style={{ width: '30%', margin: '1px', padding: '10px' }}>
                    <CustomSelect
                      selectId="role"
                      labelStyle={{ marginTop: '8px', marginBottom: '10px' }}
                      selectLable="Role"
                      isMulti={false}
                      name="role"
                      options={[
                        {
                          label: 'Admin Staff',
                          value: 'ADMINSTAFF',
                        },
                      ]}
                      placeholder="Role"
                      style={{ width: '400px', marginTop: '8px' }}
                      required
                      setFieldTouched={setFieldTouched}
                    />
                  </div>

                  <div style={{ width: '30%', margin: '1px', padding: '10px' }}>
                    {' '}
                    <CustomSelect
                      selectId="district"
                      labelStyle={{ marginTop: '8px', marginBottom: '10px' }}
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
                      style={{ width: '400px', marginTop: '8px' }}
                      required
                      setFieldTouched={setFieldTouched}
                    />
                  </div>
                  <div style={{ width: '30%', margin: '1px', padding: '10px' }}>
                    {' '}
                    <CustomSelect
                      selectId="taluka"
                      labelStyle={{ marginTop: '8px', marginBottom: '10px' }}
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
                      style={{ width: '400px', marginTop: '8px' }}
                      required
                      setFieldTouched={setFieldTouched}
                    />
                  </div>
                  <div style={{ width: '30%', margin: '1px', padding: '10px' }}>
                    <CustomSelect
                      selectId="city"
                      labelStyle={{ marginTop: '8px', marginBottom: '10px' }}
                      selectLable="City"
                      isMulti={false}
                      name="city"
                      options={villageOptions}
                      onChange={(newValue: OnChangeValue<Option, boolean>) => {
                        setFieldValue('city', (newValue as Option).value);
                      }}
                      placeholder="City"
                      style={{ width: '400px', marginTop: '8px' }}
                      required
                      setFieldTouched={setFieldTouched}
                    />
                  </div>
                  <div style={{ width: '30%', margin: '1px', padding: '10px' }}>
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
                  <div style={{ width: '30%', margin: '1px', padding: '10px' }}>
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

                  <div style={{ width: '30%', margin: '1px', padding: '10px' }}>
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
                  <div style={{ width: '30%', margin: '1px', padding: '10px' }}>
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
                  <div style={{ width: '30%', margin: '1px', padding: '10px' }}></div>
                  <div style={{ width: '30%', margin: '1px', padding: '10px' }}></div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {/* </div> */}
    </Card>
  );
};

export default CreateAdminStaff;
