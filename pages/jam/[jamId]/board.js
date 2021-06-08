import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import Layout from '../../../domains/Layout';
import { Div, Txt, SubTitle } from '../../../styledComps';
import NavBarJam from '../../../domains/NavBarJam';
import DataService from '../../../services/DataService';

const Board = () => {
  const [boardInfo, setBoardInfo] = useState([]);
  // const dispatch = useDispatch();
  const router = useRouter();
  const { jamId } = router.query;
  const { jamName } = useSelector((state) => state.jamReducer);

  const getInfo = async () => {
    const res = await DataService.getBoardInfo(jamId);
    console.log('res: ', res);
    setBoardInfo(res);
  };

  useEffect(() => {
    jamId && getInfo(jamId);
  }, [jamId]);

  return (
    <Layout>
      <NavBarJam />
      <Div col pad="50px" back="orange">
        <SubTitle>Board</SubTitle>
        <Txt>
          JamName:
          {jamName}
        </Txt>
        <Txt>
          JamId:
          {jamId}
        </Txt>
      </Div>
    </Layout>
  );
};

export default Board;
