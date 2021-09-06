/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns/';
import isEmpty from 'lodash/isEmpty';
import { TENANTS } from '../../../config';

import { setJamInfo, setTenantsList, setRoomsInfo } from '../../../redux/actions';
import { setActiveSection } from '../../../redux/actions/jamActions';

import Layout from '../../../domains/Layout';
import {
  Div, Txt, SubTitle, Table, StartChat,
} from '../../../styledComps';
import NavBarJam from '../../../domains/NavBarJam';
import DataService from '../../../services/DataService';
import Calculations from '../../../services/Calculations';
import dictionary from '../../../locale';
import { set } from 'lodash';

const Rooms = () => {
  const { roomsInfo } = useSelector((state) => state.jamReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const { jamId } = router.query;
  const { lenguage } = useSelector((state) => state.userReducer);
  const dict = dictionary[lenguage];

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

  const startTd = {
    marginLeft: '20px',
    textAlign: 'left',
    borderBottom: '1px solid #FCA311',
    borderTop: '1px solid #FCA311',
    borderLeft: '1px solid #FCA311',
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
  };
  const lastTd = {
    textAlign: 'flex-start',
    borderBottom: '1px solid #FCA311',
    borderTop: '1px solid #FCA311',
    borderRight: '1px solid #FCA311',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
  };

  const middleTd = {
    display: 'flex',
    justifyContent: 'flex-start',
    textAlign: 'center',
    borderBottom: '1px solid #FCA311',
    borderTop: '1px solid #FCA311',
  };
  const centerTd = {
    textAlign: 'center',
    borderBottom: '1px solid #FCA311',
    borderTop: '1px solid #FCA311',
  };

  const leftTd = {
    textAlign: 'left',
  };


  const bodyTr = {
    border: '1px solid #FCA311',
  };

  const vacant = {
    textAlign: 'center',
    color: 'red',
    fontSize: '12px',
  };


  const renderRoomsInfo = () => roomsInfo.map((room, j) => {
    const current = !isEmpty(room.currentTenant[0]) ? room.currentTenant : [];
    let checkIn; let checkOut; let firstName; let lastName; let rent; let deposit;

    if (current.length > 0) {
      checkIn = current[0].checkIn;
      checkOut = current[0].checkOut;
      firstName = current[0].firstName;
      lastName = current[0].lastName;
      rent = current[0].rent;
      deposit = current[0].deposit;
    }
    const future = room.futureTenants ? room.futureTenants : [];
    const isVacant = !room.currentTenant || isEmpty(room.currentTenant);
    const { roomId } = room;

    const existNextTenant = future.length !== 0;
    let nextTenant = [];

    if (existNextTenant) {
      nextTenant = future[0];
    }

    return (
      <Link key={roomId} href="/jam/[jamId]/roomInfo/[roomId]" as={`/jam/${jamId}/roomInfo/${roomId}`} passHref>
        <tr style={bodyTr}>
          { isVacant ? (
            existNextTenant
              ? (
                <>
                  <td style={startTd}>
                    <Txt mgL="20px">{room.roomNr}</Txt>
                  </td>
                  <td colSpan="4" style={centerTd}>
                    Vacant until
                    {' '}
                    {nextTenant.checkIn}
                  </td>
                  <td style={lastTd} />
                </>
              ) : (
                <>
                  <td style={startTd}>
                    <Txt mgL="20px">{room.roomNr}</Txt>
                  </td>
                  <td colSpan="4" style={centerTd}>
                    Currently Vacant
                  </td>
                  <td style={lastTd} />
                </>
              )

          ) : (
            <>
              <td style={startTd}>
                <Txt mgL="20px">{room.roomNr}</Txt>
              </td>
              <td style={middleTd}>
                {firstName}
                {' '}
                {lastName}

                <Div
                  just="center"
                  align="center"
                  mgL="15px"
                //   onClick={StartChat()}
                >
                  <FontAwesomeIcon
                    icon={faComments}
                  />
                </Div>
              </td>
              <td style={startTd}>
                {checkIn}
              </td>
              <td style={startTd}>
                {checkOut}
              </td>
              <td style={startTd}>
                {rent}
              </td>
              <td style={lastTd}>
                {deposit}
              </td>
            </>
          )}
        </tr>
      </Link>
    );
  });

  const showInfo = roomsInfo.length !== 0;
  const captionStyle = {
    fontSize: '10px',
    fontWeight: '500',
    color: 'gray',
  };

  return (
    <Layout>
      <NavBarJam />
      <Div col w="100%" just="flex-start" align="flex-start">
        <SubTitle mg="10px" mgB="30px">Rooms list</SubTitle>
        <Div w="100%" just="center" align="center">
          <Table w="90%">
            <caption style={captionStyle}>For more information click on a room</caption>
            <thead>
              <tr>
                <td style={leftTd}>Room Nr</td>
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
