import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { Navigate, useNavigate } from 'react-router-dom';
import GlobalLoader from '../../components/GlobalLoader/GlobalLoader';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import CustomTable from '../../components/CustomTable/CustomTable';
import { deleteUser, getAllUsers } from '../../services/user';
import { ToastShow } from '../../redux/ducks/toast';
import Modal from '../../components/Modal/Modal';

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [finalSort, setFinalSort] = useState<string[]>([]);
  const [sort, setSort] = useState<{ columnName: string; sortOrder: 'ASC' | 'DESC' }>({
    columnName: '',
    sortOrder: 'ASC',
  });
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [totalDataCount, setTotalDataCount] = useState<number>(0);
  const [totalPagesCount, setTotalPagesCount] = useState(0);
  const [userID, setUserID] = useState<number | string>();
  const [rowClicked, setRowClicked] = useState(false);
  const [openReasonIndex, setOpenReasonIndex] = useState<boolean>(false);
  const [idLoading, setIdLoading] = useState<boolean>(false);
  const [usersData, setUsersData] = useState([]);
  const [deleteModel, setDeleteModel] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | string>();
  const onCharClick = (char: string) => {
    if (finalSort.includes(char)) {
      const tempArray = [...finalSort];
      const charIndex = tempArray.indexOf(char);
      tempArray.splice(charIndex, 1);
      setFinalSort(tempArray);
    } else {
      setFinalSort((prev) => [...prev, char]);
    }
  };

  const PageLimit = 3;
  const columns = [
    {
      header: '',
      name: '',
      cell: (props: any) => {
        return (
          <div className="px-4 py-5 text-GrayDark">
            <input
              type="checkbox"
              onChange={() => {
                setRowClicked(true);
              }}
            />
          </div>
        );
      },
    },
    {
      header: '',
      name: '',
      cell: (props: any) => {
        return (
          <div className="px-4 py-5  text-GrayDark text-left">
            <div style={{ width: '50px', height: '50px' }}>
              <img
                src={
                  props.profilePicture
                    ? props.profilePicture
                    : 'https://i.ibb.co/v4zkGL5/1280px-Radisson-Blu-logo-1.png'
                }
                alt=""
              />
            </div>
          </div>
        );
      },
    },
    {
      header: 'Title',
      name: 'title',
      cell: (props: any) => {
        return `${props?.title}`;
      },
    },
    {
      header: 'Full Name',
      name: 'firstname',
      cell: (props: any) => {
        return `${props?.firstname} ${props?.middlename} ${props?.lastname}`;
      },
    },
    {
      header: 'Email',
      name: 'email',
      cell: (props: any) => {
        return `${props?.email}`;
      },
    },
    {
      header: 'Phone',
      name: 'phoneNumber',
      cell: (props: any) => {
        return `${props?.phoneNumber}`;
      },
    },
    {
      header: 'Date of Birth',
      name: 'dob',
      cell: (props: any) => {
        return `${props?.dob}`;
      },
    },

    {
      header: 'District',
      name: 'district',
      cell: (props: any) => {
        return `${props?.district}`;
      },
    },
    {
      header: 'Taluka',
      name: 'taluka',
      cell: (props: any) => {
        return `${props?.taluka}`;
      },
    },
    {
      header: 'City',
      name: 'city',
      cell: (props: any) => {
        return `${props?.city}`;
      },
    },
    {
      header: 'Pincode',
      name: 'pincode',
      cell: (props: any) => {
        return `${props?.pincode}`;
      },
    },
    {
      header: 'Profession',
      name: 'profession',
      cell: (props: any) => {
        return `${props?.profession}`;
      },
    },
    {
      header: 'CreatedBy',
      name: 'createdBy',
      cell: (props: any) => {
        return `${props?.createdBy[0]?.firstname} ${props?.createdBy[0]?.lastname}`;
      },
    },
    {
      header: '',
      name: '',
      cell: (props: any) => {
        return (
          <span
            onClick={() => {
              setDeleteModel(true);
              setDeleteId(props._id);
            }}
          >
            <i className="material-icons" style={{ fontSize: '24px', color: '#5400CF' }}>
              delete
            </i>
          </span>
        );
      },
    },
    {
      header: '',
      name: '',
      cell: (props: any) => {
        return (
          <span
            onClick={() => {
              navigate(`/users/edit?id=${props._id}`);
            }}
          >
            <i className="material-icons" style={{ fontSize: '24px', color: '#5400CF' }}>
              edit
            </i>
          </span>
        );
      },
    },
  ];

  const getUsers = async (query: { page: number; limit: number }) => {
    setIdLoading(true);
    try {
      const responseData = await getAllUsers(query);
      if (responseData?.status === 200) {
        setUsersData(responseData?.data?.data);
        setTotalDataCount(responseData?.data?.totalcount);
        setIdLoading(false);
      } else {
        setUsersData([]);
        dispatch(
          ToastShow({
            message: 'Something went wrong',
            type: 'error',
          })
        );
        setIdLoading(false);
      }
      setIdLoading(false);
    } catch (error) {
      setUsersData([]);
      dispatch(
        ToastShow({
          message: 'Something went wrong',
          type: 'error',
        })
      );
      setIdLoading(false);
      console.log(error);
    }
  };
  const deleteUsers = async (id: string | number) => {
    try {
      console.log(id, '786 786');

      const responseDelete = await deleteUser(id);
      if (responseDelete?.status === 200) {
        dispatch(
          ToastShow({
            message: 'User Deleted successfully',
            type: 'success',
          })
        );
      } else {
        dispatch(
          ToastShow({
            message: 'Something went wrong',
            type: 'error',
          })
        );
      }
    } catch (error) {
      dispatch(
        ToastShow({
          message: 'Something went wrong',
          type: 'error',
        })
      );
      console.log(error);
    }
  };

  useEffect(() => {
    if (userID && rowClicked) {
      navigate(`/users/edit?id=${userID}`);
    }
  }, [userID, rowClicked]);

  const query = {
    page: page,
    limit: PageLimit,
  };

  useEffect(() => {
    getUsers(query);
    if (totalDataCount) {
      setTotalPagesCount(Math.ceil(totalDataCount / PageLimit));
    }
  }, [page, totalDataCount]);

  return idLoading ? (
    <GlobalLoader />
  ) : (
    <Card title={'USERS'}>
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
            navigate('/users/add');
          }}
        >
          Create User
        </Button>
      </div>
      <CustomTable
        // sortByAlphabeticalOrder={{ isApply: true, val: finalSort, onCharClick: onCharClick }}
        // searchBeforeElements={
        //   <Button
        //     type="button"
        //     style={{
        //       // marginTop: '-10px',
        //       marginLeft: '-125px',
        //       border: '2px solid',
        //       padding: '10px 5px',
        //       fontSize: '15px',
        //       backgroundColor: '#5400CF',
        //       width: '125px',
        //       // height: '20%',
        //       color: 'white',
        //       borderRadius: '10px',
        //     }}
        //     parentStyle={{ marginLeft: '90%' }}
        //     onClickHandler={() => {
        //       console.log('okay');
        //     }}
        //   >
        //     Download List
        //   </Button>
        // }
        // searchAfterElements={
        //   <Button
        //     type="button"
        //     style={{
        //       // marginTop: '-10px',
        //       marginLeft: '-50px',
        //       border: '2px solid',
        //       padding: '10px 5px',
        //       fontSize: '15px',
        //       backgroundColor: '#5400CF',
        //       width: '125px',
        //       // height: '20%',
        //       color: 'white',
        //       borderRadius: '10px',
        //     }}
        //     parentStyle={{ marginLeft: '90%' }}
        //     onClickHandler={() => {
        //       console.log('okay');
        //     }}
        //   >
        //     Download List
        //   </Button>
        // }
        // search={true}
        tableHeading={'User Info'}
        isLoading={false}
        headerData={columns}
        bodyData={usersData}
        sort={sort}
        setSort={setSort}
        // sortArrowVariant={'2'}
        currentDataLength={usersData?.length ?? usersData?.length}
        dataCount={totalDataCount}
        limit={PageLimit}
        page={page}
        setPage={setPage}
        totalPages={totalPagesCount}
        searchText={searchText}
        setSearchText={setSearchText}
        onrowClick={setUserID}
        closeReasonModal={setOpenReasonIndex}
      />
      <Modal
        onClickBtn={'Yes, Delete'}
        onClickHandler={() => {
          deleteId && deleteUsers(deleteId);
          setDeleteModel(false);
        }}
        title={'Are you sure you want to delete this item?'}
        isCloseBtn
        isModelOpen={deleteModel}
        onCloseHandler={() => {
          // deleteUsers(0);
          setDeleteModel(false);
        }}
      />
    </Card>
  );
};

export default Users;
