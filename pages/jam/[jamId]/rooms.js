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
  const [rows, setRows] = useState([]);

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
      
      let row = []
      for (let i = 0; i < rooms.length; i++) {
        console.log('rooms: ', rooms);
        const current = rooms[i].currentTenant.length !== 0;
        console.log('current: ', current);
        const next =  rooms[i].futureTenants.length !== 0;
        console.log('next: ', next);
    
        if (current) {
          const {firstName, lastName, checkIn, checkOut, rent, deposit} = rooms[i].currentTenant
          const info = { id: i+1, roomNr: i+1, name: `${firstName} ${lastName}`, checkIn, checkOut, rent, depost};
          return row.push(info);
        };
        if (next) {
          const tenant = rooms[i].futureTenants[0];
          const info = { id: i+1, roomNr: i+1, name: `Vacant until ${tenant.checkIn}`, checkIn: '', checkOut: '', rent: '', depost: '' };
          console.log('current: ', typeof current);
          row.push(info);
        } else {
          const info = { id: i+1, roomNr: i+1, name: `Vacant`, checkIn: '', checkOut: '', rent: '', depost: '' };
          row.push(info);
        }
        
      }

      setRows(row)

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

    const centerTd = {
      textAlign: 'center',
    };

    const vacant = {
      textAlign: 'center',
      color: 'red',
      fontSize: '12px',
    };

    const flexTd = {
      display: 'flex',
      justifyContent: 'flex-start',
    };
    return (
      <Link key={roomId} href="/jam/[jamId]/roomInfo/[roomId]" as={`/jam/${jamId}/roomInfo/${roomId}`} passHref>
        <tr>
          { isVacant ? (
            existNextTenant
              ? (
                <>
                  <td style={centerTd}>
                    {room.roomNr}
                  </td>
                  <td colSpan="5" style={centerTd}>
                    Vacant until
                    {' '}
                    {nextTenant.checkIn}
                  </td>
                </>
              ) : (
                <>
                  <td style={centerTd}>
                    {room.roomNr}
                  </td>
                  <td colSpan="6" style={vacant}>
                    Currently Vacant
                  </td>
                </>
              )

          ) : (
            <>
              <td style={centerTd}>
                {room.roomNr}
              </td>
              <td style={flexTd}>
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
              <td>
                {checkIn}
              </td>
              <td>
                {checkOut}
              </td>
              <td>
                {rent}
              </td>
              <td>
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

  const columns = [
    {
      field: 'roomNr',
      headerName: dict.common.roomNr,
      width: 70,
      sortable: true,
    },
    {
      field: 'name', headerName: dict.common.name, width: 130, sortable: true,
    },
    {
      field: 'checkIn', headerName: 'Check-In', width: 130, sortable: true,
    },
    {
      field: 'checkOut', headerName: 'Check-Out', width: 130, sortable: true,
    },
    {
      field: 'rent', headerName: dict.common.rent, width: 130, sortable: false,
    },
    {
      field: 'deposit', headerName: dict.common.deposit, width: 130, sortable: false,
    },

    // {
    //   field: 'age',
    //   headerName: 'Age',
    //   type: 'number',
    //   width: 90,
    // },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.getValue(params.id, 'firstName') || ''} ${
    //       params.getValue(params.id, 'lastName') || ''
    //     }`,
    // },
  ];

  return (
    <Layout>
      <NavBarJam />
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} customSearch/>
    </div>
      {/* <Div col w="100%" just="flex-start" align="flex-start">
        <SubTitle mg="10px" mgB="30px">Rooms list</SubTitle>
        <Div w="100%" just="center" align="center">
          <Table>
            <caption style={captionStyle}>For more information click on a room</caption>
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
      </Div> */}
    </Layout>
  );
};

export default Rooms;
