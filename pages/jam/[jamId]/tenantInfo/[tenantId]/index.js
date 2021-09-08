import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import { isEmpty } from 'lodash';
import { setJamInfo, setActiveSection } from '../../../../../redux/actions';

import { TENANTS } from '../../../../../config';
import {
  Div, Title, Txt, SubTitle,
} from '../../../../../styledComps';
import BookingsGraphic from '../../../../../components/BookingsGraphic';
import BackButton from '../../../../../components/BackButton';
import Layout from '../../../../../domains/Layout';
import NavBarJam from '../../../../../domains/NavBarJam';
import DataService from '../../../../../services/DataService';
import Calculations from '../../../../../services/Calculations';
import TenantSummary from '../../../../../domains/TenantSummary';
import EditRoomForm from '../../../../../domains/EditRoomForm';
import SingleTenantInfo from '../../../../../domains/SingleTenantInfo';
import dictionary from '../../../../../locale';

const TenantInfo = () => {
  const tenant = TENANTS[0];
  const { lenguage } = useSelector((state) => state.userReducer);
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

  const getTenantInfo = async () => {
    const tenantInfo = await DataService.getSingleRoomInfo(jamId, roomId);
    setInfo(tenantInfo);
  };

  useEffect(() => {
    jamId && getJamInfo(jamId);
    roomId && jamId && getSingleTenantInfo(jamId, tenantId);
    dispatch(setActiveSection('tenants'));
  }, [jamId, roomId]);

  useEffect(() => {
    roomId && jamId && getTenantInfo(jamId, tenantId);
  }, [editInfo]);

  useEffect(() => {
    jamId && getJamInfo(jamId);
    roomId && jamId && getTenantInfoo(jamId, tenantId);
    dispatch(setActiveSection('tenants'));
  }, []);

  const { roomNr } = info;
  const isVacant = isEmpty(current);
  const thereIsNext = isEmpty(next);

  return (
    <Layout>
      <NavBarJam />
      <Div className="roomId" h="100%" w="100%" col pad="5px 20px">
        <Div className="BackButton">
          <BackButton section="tenants" />
        </Div>
        <Div className="title" w="100%" mgB="30px" just="space-between">
          <Title>
            {tenant.firstName}&nbsp;{tenant.lastName}
          </Title>
        </Div>
        {editInfo
          ? <EditRoomForm jamId={jamId} roomId={roomId} roomInfo={info} edit={setEditInfo} />
          : <SingleTenantInfo jamId={jamId} tenant={tenant} edit={setEditInfo} />}

      </Div>
    </Layout>

  );
};

export default TenantInfo;
