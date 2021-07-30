import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import DataService from '../services/DataService';
import { setJamInfo } from '../redux/actions';

const useUserPermisions = () => {
  const router = useRouter();
  const { jamId } = router.query;
  const { adminId } = useSelector((state) => state.jamReducer);
  const { userId } = useSelector((state) => state.userReducer);
  const [role, setRole] = useState('loading');
  const dispatch = useDispatch();

  const getInfo = async () => {
    const jamInfo = await DataService.getJamInfoById(jamId);
    dispatch(setJamInfo(jamInfo));
  };

  useEffect(() => {
    !adminId && getInfo();
    if(userId && adminId){
      setRole(adminId === userId ? 'admin' : 'guest');
    } 
  }, [ userId, adminId ]);

  return { role };
};

export default useUserPermisions;
