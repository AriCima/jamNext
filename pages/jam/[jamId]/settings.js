import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import DataService from '../../../services/DataService';

import { setJamInfo } from '../../../redux/actions';
import { setActiveSection } from '../../../redux/actions/jamActions';
import Layout from '../../../domains/Layout';
import { Div, Txt } from '../../../styledComps';
import NavBarJam from '../../../domains/NavBarJam';


const Settings = () => {
  const { jamDetails } = useSelector((state) => state.jamReducer);
  const { houssRules, contractInfo } = jamDetails;
  const dispatch = useDispatch();
  const router = useRouter();
  const { jamId } = router.query;

  const getJamInfo = async () => {
    const res = await DataService.getJamInfoById(jamId);
    dispatch(setJamInfo(res));
  };
  useEffect(() => {
    jamId && getJamInfo(jamId);
    dispatch(setActiveSection('settings'));
  }, [jamId]);

  return (
    <Layout>
      <NavBarJam />
      <Div col pad="50px" back="orange">
        <Txt>settings info here</Txt>
      </Div>
    </Layout>
  );
};

export default Settings;
