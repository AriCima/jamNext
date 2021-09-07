import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { TENANTS } from '../../../config';

import { setJamInfo, setTenantsList, setRoomsInfo } from '../../../redux/actions';
import { setActiveSection } from '../../../redux/actions/jamActions';

import Layout from '../../../domains/Layout';
import { Div, Txt, Table } from '../../../styledComps';
import NavBarJam from '../../../domains/NavBarJam';
import DataService from '../../../services/DataService';
import Calculations from '../../../services/Calculations';
import dictionary from '../../../locale';

const Tenants = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { roomsInfo, tenantsList } = useSelector((state) => state.jamReducer);
  const { jamId } = router.query;
  const { lenguage } = useSelector((state) => state.userReducer);
  const dict = dictionary[lenguage];

  const getJamInfo = async () => {
    const res = await DataService.getJamInfoById(jamId);
    dispatch(setJamInfo(res));
  };

  const getTenants = async () => {
    const rooms = roomsInfo.length;
    const nrOfRooms = rooms.length.toString();
    const res = await DataService.getJammers(jamId);
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
    dispatch(setTenantsList(res));
  };

  useEffect(() => {
    jamId && getJamInfo(jamId);
    jamId && getTenants(jamId);
    dispatch(setActiveSection('tenants'));
  }, [jamId]);

  const renderTenantsInfo = () => tenantsList.map((tenant, j) => {
    const current = !isEmpty(tenant.currentTenant[0]) ? tenant.currentTenant : [];
    let checkIn; let checkOut; let firstName; let lastName; let rent; let deposit;

    if (current.length > 0) {
      checkIn = current[0].checkIn;
      checkOut = current[0].checkOut;
      firstName = current[0].firstName;
      lastName = current[0].lastName;
      rent = current[0].rent;
      deposit = current[0].deposit;
    }
    const future = tenant.futureTenants ? tenant.futureTenants : [];
    const isVacant = !tenant.currentTenant || isEmpty(tenant.currentTenant);
    const { roomId } = tenant;

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
  const leftTd = {
    textAlign: 'left',
  };

  const showInfo = tenantsList.length !== 0;

  return (
    <Layout>
      <NavBarJam />
      <Div col w="100%" just="flex-start" align="flex-start">
        {/* <SubTitle mg="10px" mgB="30px">Rooms list</SubTitle> */}
        <Div mgT="20px" w="100%" just="center" align="center">
          <Table w="90%">
            <thead>
              <tr>
                <td>{dict.common.tenant}</td>
                <td style={leftTd}>{dict.common.roomNr}</td>
                <td>Cehck-In</td>
                <td>Check-Out</td>
                <td>{dict.common.rent}</td>
                <td>{dict.common.deposit}</td>
              </tr>
            </thead>
            <tbody>
              {showInfo && renderTenantsInfo()}
            </tbody>
          </Table>

        </Div>
      </Div>
    </Layout>
  );
};

export default Tenants;
