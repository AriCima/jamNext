import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns/';
import isEmpty from 'lodash/isEmpty';
import { TENANTS } from '../../../config';

import { setJamInfo, setTenantsList, setRoomsInfo } from '../../../redux/actions';
import { setActiveSection } from '../../../redux/actions/jamActions';

import Layout from '../../../domains/Layout';
import { Div, Txt, SubTitle, Table } from '../../../styledComps';
import NavBarJam from '../../../domains/NavBarJam';
import DataService from '../../../services/DataService';
import Calculations from '../../../services/Calculations';

const Rooms = () => {
  const { roomsInfo } = useSelector((state) => state.jamReducer);
  console.log('roomsInfo en Rooms: ', roomsInfo);
  const dispatch = useDispatch();
  const router = useRouter();
  const { jamId } = router.query;

  const getJamInfo = async () => {
    const res = await DataService.getJamInfoById(jamId);
    dispatch(setJamInfo(res));
  };

  const getRooms = async () => {
    if (roomsInfo.length === 0) {
      const rooms = await DataService.getJamRooms(jamId);
      const nrOfRooms = rooms.length.toString();

      // const tenantsList = Calculations.removeAmdinFromJammers(jammers);
      // const tenantsByRooms = Calculations.getTenantsByRooms(tenantsList, nrOfRooms);
      const tenantsByRooms = Calculations.getTenantsByRooms(TENANTS, nrOfRooms);
      const organizedTenantsByRoom = Calculations.getOrganizedTenants(tenantsByRooms, nrOfRooms);

      const sortedRooms = Calculations.sortByField({ elements: rooms, asc: true, field: 'roomNr' });

      if (rooms.length > 0) {
        for (let i = 0; i < rooms.length; i++) {
          const oT = organizedTenantsByRoom[i];
          sortedRooms[i].currentTenant = oT.currentTenant;
          sortedRooms[i].formerTenants = oT.formerTenants;
          sortedRooms[i].futureTenants = oT.futureTenants;
        }
      }

      //   const currentOccupancy = Calculations.getCurrentOccupancy(tenantsList, nrOfRooms);
      //   setOccupancy(currentOccupancy);

      //   const currentIncomes = Calculations.getCurrentIncomes(tenantsList);
      //   setIncomes(currentIncomes);

      //   const futureChecks = Calculations.getFutureChecks(tenantsList);
      //   setActivity(futureChecks);

      // Info en Redux
      dispatch(setTenantsList(TENANTS));
      dispatch(setRoomsInfo(sortedRooms));
    }
  };

  useEffect(() => {
    jamId && getJamInfo(jamId);
    jamId && getRooms(jamId);
    dispatch(setActiveSection('rooms'));
  }, [jamId]);

  //   const startChat = (e) => {
  //     e.preventDefault();
  //     //console.log('userJams en el create', this.state.userJams)
  //     let userID = this.state.userId;

  //     let userId = this.state.userId;
  //     let flatMateId = this.state.flatMateId;

  //     let chatId = userId.concat(flatMateId);

  //     let transJams = [];
  //     transJams = [...this.state.userJams];
  //     let createdAt = new Date();
  //     let jamCode = Calculations.generateCode();

  //     let newJam = {
  //       adminId: userID,
  //       jamType: 'chat',
  //       jamCode: jamCode,
  //       jamName: this.state.jamName,
  //       jamDescription: this.state.jamDescription,
  //       createdAt: createdAt,
  //       jammers: [{name: this.state.userName, userId: userID}]
  //     };

  //     DataService.createJam(newJam)
  //     .then((result)=>{
  //       // //console.log('el result del create Jam = ', result)
  //       let jamId = result.id;
  //       let userID = this.state.userId;

  //       newJam.jamId = jamId;
  //       newJam.jammers = [userID];

  //       transJams.push(newJam)

  //       //console.log('updateJAm called with: ', userID, '/ ', transJams)

  //       DataService.updateJamsArrayInUser(userID, transJams);
  //       this.props.closePopup();

  //       // this.props.propsFn.push(`/home/${userId}`)

  //     },(error)=>{
  //         //console.log('Jam could not be created, error:', error);
  //     });
  //   };

  const renderRoomsInfo = () => roomsInfo.map((room, j) => {
    console.log('room: ', room);
    const current = room.currentTenant ? room.currentTenant : [];
    const isVacant = !room.currentTenant || isEmpty(room.currentTenant);
    const { roomId } = room;
    const { checkIn = '', checkOut = '', firstName = '', lastName = '' } = current;
    const cIn = checkIn ? checkIn.split('-') : '';
    const cOut = checkIn ? checkOut.split('-') : '';
    const newIn = new Date(cIn[2], cIn[1] - 1, cIn[0]);
    console.log('newIn: ', newIn);
    const newOut = new Date( cOut[2], cOut[1] - 1, cOut[0]);
    console.log('newOut: ', newOut);
    
    return (
      <Link key={roomId} href={`/jam/${jamId}/room/${roomId}]`}>
        <tr>
          {isVacant ? (
            <td>
              <Txt color="red">Currently Vacant</Txt>
            </td>
          ) : (
            <>
              <td>
                {room.roomNr}
              </td>
              <td>
                {firstName}
                {' '}
                {lastName}

                <Div
                  just="center"
                  align="center"
                >
                  <FontAwesomeIcon
                    icon={faComments}
                  />
                </Div>
              </td>
              <td>
                {newIn && format(newIn, 'dd/MMM/yyyy')}
              </td>
              <td>
                {newOut && format(newOut, 'dd/MMM/yyyy')}
              </td>
              <td>
                {current.rent}
              </td>
              <td>
                {current.deposit}
              </td>
            </>
          )}
        </tr>
      </Link>
    );
  });

  const showInfo = roomsInfo.length !== 0;

  return (
    <Layout>
      <NavBarJam />
      <Div col w="100%" just="flex-start" align="flex-start">
        <SubTitle mg="10px" mgB="30px">Rooms list</SubTitle>
        <Div w="100%" just="center" align="center">
          <Table>
            <caption>select a room</caption>
            <thead>
              <tr>
                <td>Room Nr</td>
                <td>Tenant</td>
                <td>Cehck-In</td>
                <td>Check-Out</td>
                <td>Rent</td>
                <td>Deposit</td>
              </tr>
            </thead>
            <tbody>
              {showInfo && renderRoomsInfo()}
            </tbody>
          </Table>

        </Div>
      </Div>
    </Layout>
  );
};

export default Rooms;
