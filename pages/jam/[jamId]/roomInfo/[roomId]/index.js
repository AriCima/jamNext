import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { setJamInfo, setActiveSection } from '../../../../../redux/actions';

import FormSelect from '../../../../../components/FormSelect';
import FormInput from '../../../../../components/FormInput';

import { Div, Txt, SubTitle } from '../../../../../styledComps';
import Layout from '../../../../../domains/Layout';
import NavBarJam from '../../../../../domains/NavBarJam';
import DataService from '../../../../../services/DataService';
import EditRoomForm from '../../../../../domains/EditRoomForm';

const RoomInfo = () => {
  const [info, setInfo] = useState({});
  const router = useRouter();
  const { jamId, roomId } = router.query;
  const dispatch = useDispatch();

  const getJamInfo = async () => {
    const res = await DataService.getJamInfoById(jamId);
    dispatch(setJamInfo(res));
  };

  const getSingleRoomInfo = async () => {
    const roomInfo = await DataService.getRoomInfo(jamId, roomId);
    console.log('roomInfo: ', roomInfo);
    setInfo(roomInfo);
  };

  useEffect(() => {
    jamId && getJamInfo(jamId);
    roomId && jamId && getSingleRoomInfo(jamId, roomId);
    dispatch(setActiveSection('rooms'));
  }, [jamId, roomId]);

  const { roomNr } = info;

  return (
    <Layout>
      <NavBarJam />
      <Div w="100%" col pad="50px">
        <EditRoomForm jamId={jamId} roomInfo={info} />
      </Div>
    </Layout>

  );
};

export default RoomInfo;
