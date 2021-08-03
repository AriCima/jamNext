import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { isEmpty } from 'lodash';
import { setJamInfo, setActiveSection } from '../../../../../redux/actions';

import { TENANTS, SINGLE_ROOM_TENANTS } from '../../../../../config';
import { Div, Txt, SubTitle } from '../../../../../styledComps';
import Layout from '../../../../../domains/Layout';
import NavBarJam from '../../../../../domains/NavBarJam';
import DataService from '../../../../../services/DataService';
import Calculations from '../../../../../services/Calculations';
import TenantSummary from '../../../../../domains/TenantSummary';
import EditRoomForm from '../../../../../domains/EditRoomForm';

const RoomInfo = () => {
  const [info, setInfo] = useState({});
  const [current, setCurrent] = useState({});
  const [next, setNextTenant] = useState({});
  const router = useRouter();
  const { jamId, roomId } = router.query;
  const dispatch = useDispatch();

  const getJamInfo = async () => {
    const res = await DataService.getJamInfoById(jamId);
    dispatch(setJamInfo(res));
  };

  const getRoomInfo = async () => {
    const roomInfo = await DataService.getSingleRoomInfo(jamId, roomId);
    const organizedTenant = Calculations.getSingleRoomOrganizedTenants(SINGLE_ROOM_TENANTS);
    console.log('organizedTenant: ', organizedTenant);
    setCurrent(organizedTenant.currentTenant);
    setNextTenant(organizedTenant.nextTenant);
    setInfo(roomInfo);
  };

  useEffect(() => {
    jamId && getJamInfo(jamId);
    roomId && jamId && getRoomInfo(jamId, roomId);
    dispatch(setActiveSection('rooms'));
  }, [jamId, roomId]);

  const { roomNr } = info;
  const isVacant = isEmpty(current);
  const thereIsNext = isEmpty(next);

  return (
    <Layout>
      <NavBarJam />
      <Div w="100%" col pad="50px">
        <Div w="100%" just="flex-start">
          <SubTitle w="100%">Room Nr: </SubTitle>
          <Txt mgL="15px" color="gray" fSize="1.5rem" bold="700">{roomNr}</Txt>
        </Div>
        {!isVacant && <TenantSummary tenantType="current" jamId={jamId} tenant={current} />}
        {isVacant && thereIsNext && <TenantSummary tenantType="next" jamId={jamId} tenant={next} />}        
        <EditRoomForm jamId={jamId} roomInfo={info} />
      </Div>
    </Layout>

  );
};

export default RoomInfo;
