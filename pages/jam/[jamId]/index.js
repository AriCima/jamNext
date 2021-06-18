import React from 'react';

import { Div, Txt } from '../../../styledComps';
import Layout from '../../../domains/Layout';
import NavBarJam from '../../../domains/NavBarJam';

const JamsId = () => (
  <Layout>
    <NavBarJam />
    <Div pad="50px" back="orange">
      <Txt>NO SECTION CHOSEN</Txt>
    </Div>
  </Layout>
);

export default JamsId;
