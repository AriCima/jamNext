import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { isEmpty } from 'lodash';
import { setJamInfo, setActiveSection } from '../../../../../redux/actions';

import { SINGLE_ROOM_TENANTS } from '../../../../../config';
import { Div, Txt, SubTitle } from '../../../../../styledComps';
import Layout from '../../../../../domains/Layout';
import NavBarJam from '../../../../../domains/NavBarJam';
import DataService from '../../../../../services/DataService';
import Calculations from '../../../../../services/Calculations';
import TenantSummary from '../../../../../domains/TenantSummary';
import EditRoomForm from '../../../../../domains/EditRoomForm';
import SingleRoomInfo from '../../../../../domains/SingleRoomInfo';

const RoomInfo = () => {
  const [info, setInfo] = useState({});
  const [current, setCurrent] = useState({});
  const [next, setNextTenant] = useState({});
  const [editInfo, setEditInfo] = useState(false);

  const router = useRouter();
  const { jamId, roomId } = router.query;
  const dispatch = useDispatch();

  const getJamInfo = async () => {
    const res = await DataService.getJamInfoById(jamId);
    dispatch(setJamInfo(res));
  };

  const getRoomInfo = async () => {
    console.log('triggered');
    const roomInfo = await DataService.getSingleRoomInfo(jamId, roomId);
    const organizedTenant = Calculations.getSingleRoomOrganizedTenants(SINGLE_ROOM_TENANTS);
    setCurrent(organizedTenant.currentTenant);
    setNextTenant(organizedTenant.nextTenant);
    console.log('roomInfo: ', roomInfo);
    setInfo(roomInfo);
  };

  useEffect(() => {
    jamId && getJamInfo(jamId);
    roomId && jamId && getRoomInfo(jamId, roomId);
    dispatch(setActiveSection('rooms'));
  }, [jamId, roomId]);

  useEffect(() => {
    jamId && getJamInfo(jamId);
    roomId && jamId && getRoomInfo(jamId, roomId);
    dispatch(setActiveSection('rooms'));
  }, [])

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
          <Div w="100%" just="flex-start" align="center" mgR="20px">
            <Txt mgB="5px" fSize="14px" bold color="gray">Status</Txt>
          </Div>
        <Div h="40px" border="lightgray" borderR="5px" pad="5px" just="flex-start" align="center">
          {!isVacant && <TenantSummary tenantType="current" jamId={jamId} tenant={current} />}
          {isVacant && thereIsNext && <TenantSummary tenantType="next" jamId={jamId} tenant={next} />}
          {isVacant && !thereIsNext && <Txt>Room is Vacant</Txt>}
        </Div>
        {editInfo
          ? <EditRoomForm jamId={jamId} roomInfo={info} edit={setEditInfo} />
          : <SingleRoomInfo roomInfo={info} edit={setEditInfo} />}

      </Div>
    </Layout>

  );
};

export default RoomInfo;
