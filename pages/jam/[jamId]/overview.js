import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { setJamInfo, setUserRole } from '../../../redux/actions';

import Layout from '../../../domains/Layout';
import { Div, Txt, Button } from '../../../styledComps';
import NavBarJam from '../../../domains/NavBarJam';
import DataService from '../../../services/DataService';

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
    jamId && getJamInfo(jamId);
  }, [jamId]);

  return (
    <Layout>
      <NavBarJam />
      <Div col pad="50px" back="orange">
        <Div className="jam_info" w="100%" just="flex-start">
          <Txt fSize="8px" mgL="15px">
            JamName:
          </Txt>
          <Txt fSize="8px" mgL="5px" mgR="10px">
            { jamName }
          </Txt>
          <Txt fSize="8px" mgL="15px">
            JamId:
          </Txt>
          <Txt fSize="8px" mgL="5px" mgR="15px">
            {jamId}
          </Txt>
          <Txt fSize="8px" mgL="15px">
            userRole:
          </Txt>
          <Txt fSize="8px" mgL="5px" mgR="15px">
            {userRole}
          </Txt>
        </Div>
        <Div className="next-movements" w="100%" just="space-between" padL="15px 0">
          <Button pad="20ps 10px">Invite Tenant</Button>
        </Div>
        <Div className="overview-header" w="100%" just="space-between" padL="15px 0">
          <Div className="occupancy">
            <p>Occupancy chart</p>
          </Div>
          <Div className="occupancy">
            <p>Invoicing</p>
          </Div>
        </Div>
        <Div className="next-movements" w="100%" just="space-between" padL="15px 0">
          <Txt>Próximos movimientos</Txt>
        </Div>
        <Div className="next-movements" w="100%" just="space-between" padL="15px 0">
          <Txt>Payments</Txt>
        </Div>
        <Div className="next-movements" w="100%" just="space-between" padL="15px 0">
          <Txt>Estadísticas</Txt>
        </Div>
      </Div>
    </Layout>
  );
};

export default Overview;
