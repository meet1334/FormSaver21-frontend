import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { Navigate, useNavigate } from 'react-router-dom';

const AdminStaff = () => {
  const navigate = useNavigate();

  return (
    <Card title={'ADMIN STAFF'}>
      {/* <div style={{ backgroundColor: 'white', width: 'auto', height: '950px' }}> */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <Button
            type="button"
            style={{
              margin: '10px',
              border: '2px solid',
              padding: '10px 5px',
              fontSize: '15px',
              backgroundColor: '#5400CF',
              width: '100%',
              height: '20%',
              color: 'white',
              borderRadius: '10px',
            }}
            parentStyle={{ marginLeft: '90%' }}
            onClickHandler={() => {
              navigate('/admin-staff/add');
            }}
          >
            Create Staff
          </Button>
        </div>
      {/* </div> */}
    </Card>
  );
};

export default AdminStaff;
