import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWalking, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns/';
import { TENANTS } from '../../config';
import { Div, Txt } from '../../styledComps';

// import { DayPicker } from 'react-dates';
import { setTenantsList, setRoomsInfo } from '../../redux/actions';
// import OccupancyGraph from './OccupancyGraph';

import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';

// import CustomDialog from '../../../Modal/CustomDialog';
// import RentPaymentsInfo from './RentPayments';

// import { setDocType, setDocId, setEditable } from '../../../../redux/actions/docsActions';
// import { setSection } from '../../../../redux/actions/navigateActions';

const AdminOverview = () => {
  const [occupancy, setOccupancy] = useState(0);
  const [incomes, setIncomes] = useState(0);
  const [activity, setActivity] = useState([]);
  const [roomsSource, setRoomsSource] = useState([]);
  //   const [showMissingInfo, setShowMissingInfo] = useState(false);
  //   const [missingInfoArr, setMissingInfoArr] = useState([]);
  //   const [pendingRents, setPendingRents] = useState([]);

  const {
    jamId, jamType, tenantsList, roomsInfo,
  } = useSelector((state) => state.jamReducer);
  const dispatch = useDispatch();

  const getAllRoomsInfo = async () => {
    const res = await DataService.getJamRooms(jamId);
    // const roomsInfoStatus = Calculations.missingRoomsInfo(res);
    console.log('rooms: ', res);
    // if (roomsInfoStatus.missingInfo) {
    //   setShowMissingInfo(true);
    //   setMissingInfoArr(roomsInfoStatus.missingArr);
    // }
  };

  const getAdminJamInfo = async () => {
    if (jamType === 'rooms-rental') {
      const jammers = await DataService.getJammers(jamId);
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
      dispatch(setTenantsList(tenantsList));
      dispatch(setRoomsInfo(sortedRooms));
    }
  };

  useEffect(() => {
    getAdminJamInfo(jamId);
  }, [jamId]);

  const takeMeToTenantInfo = (e, userId) => {
    e.preventDefault();
    alert('click on userID: ', userId);
  };

  const renderActivity = () => activity.map((check, i) => {
    const isOut = check.type === 'chkOut';
    return (
      <div
        className="activity-line"
        onClick={(e) => takeMeToTenantInfo(e, check.userId)}
      >
        <div className={`activity-img${isOut ? '-isOut' : ''}`}>
          <FontAwesomeIcon
            className={`walking-icon${isOut ? '-isOut' : ''}`}
            icon={faWalking}
          />
          <FontAwesomeIcon
            className={`door-icon${isOut ? '-isOut' : ''}`}
            icon={faDoorOpen}
          />
        </div>
        <div className="activity-info">
          <p>
            On
            <span>{isOut ? format(check.date, 'dd/MMM/yyyy') : format(check.date, 'dd/MMM/yyyy')}</span>
            {' '}
            {check.firstName}
            {' '}
            {check.lastName}
            {' '}
            checks
            {' '}
            {isOut ? 'out' : 'in'}
          </p>
        </div>
      </div>
    );
  });

  const showActivity = activity.length !== 0;

  return (
    <Div w="100%" col >
      <Txt color="BLUE" fSize="44px">ADMIN OVERVIEW</Txt>
    </Div>
  // <div className="admin-overview-wrapper">

  //   <div className="overview-activity">
  //     <div className="overview-section-title">
  //       <h2>Ins &amp; Outs</h2>
  //     </div>
  //     <div className="overview-section-activity">
  //       {showActivity && renderActivity()}
  //     </div>
  //   </div>

  //   {/* <CustomDialog
  //     mustOpen={showMissingInfo}
  //     info={missingInfoArr}
  //     dialogType="pending-room-info"
  //     actionMessage="Take me to rooms form"
  //   /> */}

  //   <div className="overview-ocupation">
  //     <div className="ocupation-label">
  //       <p>
  //         Occupancy:
  //         {Math.floor(occupancy)}
  //         %
  //       </p>
  //     </div>
  //     <OccupancyGraph occupancy={occupancy} />
  //   </div>

  //   <div className="overview-incomes">
  //     <div className="incomes-label">
  //       <p>Month Incomes:</p>
  //     </div>
  //     <div className="incomes-value">
  //       <p>
  //         {incomes}
  //         {' '}
  //         €
  //       </p>
  //     </div>
  //   </div>

  // </div>
  );
};

export default (AdminOverview);
