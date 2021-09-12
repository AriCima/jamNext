/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { TENANTS } from '../../../config';

import { setJamInfo, setTenantsList, setRoomsInfo } from '../../../redux/actions';
import { setActiveSection } from '../../../redux/actions/jamActions';

import Layout from '../../../domains/Layout';
import { Div, Txt, Table } from '../../../styledComps';
import NavBarJam from '../../../domains/NavBarJam';
import DataService from '../../../services/DataService';
import Calculations from '../../../services/Calculations';
import dictionary from '../../../locale';

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
      console.log('tenantsByRooms: ', tenantsByRooms);
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

  const leftTd = {
    textAlign: 'left',
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
        <tr>
          { isVacant ? (
            existNextTenant
              ? (
                <>
                  <td className="startTd">
                    <Txt mgL="20px">{room.roomNr}</Txt>
                  </td>
                  <td colSpan="4" className="middleTd">
                    {dict.common.vacantUnt}
                    {' '}
                    {nextTenant.checkIn}
                  </td>
                  <td className="lastTd" />
                </>
              ) : (
                <>
                  <td className="startTd">
                    <Txt mgL="20px">{room.roomNr}</Txt>
                  </td>
                  <td colSpan="4" className="middleTd vacant">
                    {dict.common.vacant}
                  </td>
                  <td className="lastTd" />
                </>
              )

          ) : (
            <>
              <td className="startTd">
                <Txt mgL="20px">{room.roomNr}</Txt>
              </td>
              <td className="middleTd">
                {firstName}
                {' '}
                {lastName}
{/* 
                <Div
                  just="center"
                  align="center"
                  mgL="15px"
                //   onClick={StartChat()}
                >
                  <FontAwesomeIcon
                    icon={faComments}
                  />
                </Div> */}
              </td>
              <td className="middleTd">
                {checkIn}
              </td>
              <td className="middleTd">
                {checkOut}
              </td>
              <td className="middleTd">
                {rent}
              </td>
              <td className="lastTd">
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
      <Div colorHov="black" col w="100%" just="flex-start" align="flex-start">
        {/* <SubTitle mg="10px" mgB="30px">Rooms list</SubTitle> */}
        <Div colorHov="black" mgT="20px" w="100%" just="center" align="center">
          <Table w="90%">
            <thead>
              <tr>
                <td style={leftTd}>{dict.common.roomNr}</td>
                <td>{dict.common.tenant}</td>
                <td>Cehck-In</td>
                <td>Check-Out</td>
                <td>{dict.common.rent}</td>
                <td>{dict.common.deposit}</td>
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
