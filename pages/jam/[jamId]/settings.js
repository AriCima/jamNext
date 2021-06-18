import React from 'react';
import { useSelector } from 'react-redux';

import Layout from '../../../domains/Layout';
import { Div, Txt } from '../../../styledComps';
import NavBarJam from '../../../domains/NavBarJam';

const Settings = () => {
  const { jamDetails } = useSelector((state) => state.jamReducer);
  const { houssRules, contractInfo } = jamDetails;

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
