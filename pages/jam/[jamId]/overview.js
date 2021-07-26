import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { setJamInfo, setUserRole } from '../../../redux/actions';

import Layout from '../../../domains/Layout';
import NavBarJam from '../../../domains/NavBarJam';
import AdminOverview from '../../../domains/AdminOverview';
import GuestOverview from '../../../domains/GuestOverview';
import DataService from '../../../services/DataService';
import Calculations from '../../../services/Calculations';

const Overview = () => {
  const { userId, userRole } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const { jamId } = router.query;
  const { jamName } = useSelector((state) => state.jamReducer);

  const getJamInfo = async () => {
    const res = await DataService.getJamInfoById(jamId);
    const { adminId } = res;

    const role = userId === adminId ? 'admin' : 'guest';

    dispatch(setJamInfo(res));
    dispatch(setUserRole(role));
  };

  useEffect(() => {
    userId && jamId && getJamInfo(jamId);
  }, [jamId, userId]);

  return (
    <Layout>
      { userRole && userRole === 'admin'
        ? (
          <>
            <NavBarJam />
            <AdminOverview />
          </>
        ) : (
          <>
            <NavBarJam />
            <GuestOverview />
          </>
        )}
    </Layout>
  // <Layout>
  //   <NavBarJam />
  //   <Div col pad="50px" back="orange">
  //   </Div>
  // </Layout>
  );
};

export default Overview;
