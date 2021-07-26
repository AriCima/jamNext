import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { setJamInfo } from '../../../redux/actions';
import useUserPermisions from '../../../hooks/useUserPermisions';

import Layout from '../../../domains/Layout';
import NavBarJam from '../../../domains/NavBarJam';
import AdminOverview from '../../../domains/AdminOverview';
import GuestOverview from '../../../domains/GuestOverview';
import DataService from '../../../services/DataService';


const Overview = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { jamId } = router.query;
  const { role } = useUserPermisions();

  const getJamInfo = async () => {
    const res = await DataService.getJamInfoById(jamId);
    dispatch(setJamInfo(res));
  };

  useEffect(() => {
    jamId && getJamInfo(jamId);
  }, [jamId]);

  switch (role) {
    case 'admin':
      return (
        <Layout>
          <NavBarJam />
          <AdminOverview />
        </Layout>
      );
    case 'guest':
      return (
        <Layout>
          <NavBarJam />
          <GuestOverview />
        </Layout>
      );
    default:
      return (
        <Layout>
          <NavBarJam />
          <div>Loading</div>
        </Layout>
      );
  }
};

export default Overview;
