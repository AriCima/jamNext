import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import { isEmpty } from 'lodash';
import { setJamInfo, setActiveSection } from '../../../../../redux/actions';

import { SINGLE_ROOM_TENANTS } from '../../../../../config';
import {
  Div, Title, Txt, SubTitle,
} from '../../../../../styledComps';
import BookingsGraphic from '../../../../../components/BookingsGraphic';
import BackButton from '../../../../../components/BackButton';
import InviteJammerButton from '../../../../../components/InviteJammerButton'
import Layout from '../../../../../domains/Layout';
import NavBarJam from '../../../../../domains/NavBarJam';
import DataService from '../../../../../services/DataService';
import Calculations from '../../../../../services/Calculations';
import TenantSummary from '../../../../../domains/TenantSummary';
import EditRoomForm from '../../../../../domains/EditRoomForm';
import SingleRoomInfo from '../../../../../domains/SingleRoomInfo';

import dictionary from '../../../../../locale';

const RoomInfo = () => {
  const { lenguage } = useSelector((state) => state.userReducer);
  const { roomsInfo } = useSelector((state) => state.jamReducer);

  const dict = dictionary[lenguage];
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
    const roomInfo = await DataService.getSingleRoomInfo(jamId, roomId);
    const organizedTenant = Calculations.getSingleRoomOrganizedTenants(SINGLE_ROOM_TENANTS);
    setCurrent(organizedTenant.currentTenant);
    setNextTenant(organizedTenant.nextTenant);
    setInfo(roomInfo);
  };

  useEffect(() => {
    jamId && getJamInfo(jamId);
    roomId && jamId && getRoomInfo(jamId, roomId);
    dispatch(setActiveSection('rooms'));
  }, [jamId, roomId]);

  useEffect(() => {
    roomId && jamId && getRoomInfo(jamId, roomId);
  }, [editInfo]);

  useEffect(() => {
    jamId && getJamInfo(jamId);
    roomId && jamId && getRoomInfo(jamId, roomId);
    dispatch(setActiveSection('rooms'));
  }, []);

  const { roomNr } = info;
  const isVacant = isEmpty(current);
  const thereIsNext = isEmpty(next);

  return (
    <Layout>
      <NavBarJam />
      <Div className="roomId" h="100%" w="100%" col pad="5px 20px">
        <Div className="BackButton" just="space-between">
          <BackButton section="rooms" />
          <Div mgT="20px">
            <InviteJammerButton roomNr={roomNr} text={dict.common.aTenant} />
          </Div>
        </Div>
        <Div className="title" col w="100%" mgB="30px" just="center" align="flex-start">
          <Title>
            {dict.common.roomNr}
            &nbsp;
            {' '}
            {roomNr}
          </Title>
          {!isVacant && <TenantSummary tenantType="current" jamId={jamId} tenant={current} />}
          {isVacant && thereIsNext && <TenantSummary tenantType="next" jamId={jamId} tenant={next} />}
          {isVacant && !thereIsNext && <Txt>{dict.common.roomIsVac}</Txt>}
        </Div>

        <Div mgT="20px" w="100%" just="center">
          <BookingsGraphic tenants={SINGLE_ROOM_TENANTS} />
        </Div>

        {editInfo
          ? <EditRoomForm jamId={jamId} roomId={roomId} roomInfo={info} edit={setEditInfo} />
          : <SingleRoomInfo jamId={jamId} roomId={roomId} roomInfo={info} edit={setEditInfo} />}

      </Div>
    </Layout>

  );
};

export default RoomInfo;
