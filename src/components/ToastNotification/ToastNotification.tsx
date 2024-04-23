import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastSelector, ToastShow } from '../../redux/ducks/toast';

const ToastNotification = () => {
  const dispatch = useDispatch();
  const toastMessage = useSelector(toastSelector);

  useEffect(() => {
    if (toastMessage.message) {
      if (toastMessage.type === 'error') {
        toast.error(toastMessage.message);
      } else {
        toast(toastMessage.message);
      }
      setTimeout(() => {
        dispatch(ToastShow({ message: null, type: null }));
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastMessage?.message]);

  return (
    <ToastContainer
      className="!z-[9999999]"
      position="top-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
    />
  );
};

export default ToastNotification;
