import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { Div, Txt } from '../../styledComps';

import DataService from '../../services/DataService';
import JamInfo from '../JamInfo';
// import JammerContractInfo from '../JammerContractInfo';
// import JammerHouseRules from '../JammerHouseRules';

// Esta es la info que ve el inquilino en su Jam/Overview

const GuestOverview = () => {
  const [contractInfo, setContractInfo] = useState({});
  const { jamId } = useSelector((state) => state.jamReducer);
  const { userId } = useSelector((state) => state.userReducer);

  //   useEffect(() => {
  //     userId && DataService.getJammerInfo(jamId, userId)
  //       .then((res) => {
  //         setContractInfo(res);
  //       });
  //   }, []);

  return (
    <Div className="overview-wrapper" w="100%" col just="flex-start" align="flex-start">

      <Txt color="red" fSize="44px">GUEST OVERVIEW</Txt>
      {/* <JamInfo />

      <JammerContractInfo
        contractInfo={contractInfo}
        showRoomNr
      />

      <JammerHouseRules />

      <Div className="contract-versions" w="100%" col just="flex-start" align="center">
        <Div className="contract-img" just="center" align="center">
          <FontAwesomeIcon
            className="contract-icon"
            icon={faFile}
          />
          <Txt fSize="14px">ESP</Txt>
        </Div>

        <Div className="contract-img" just="center" align="center">
          <FontAwesomeIcon
            icon={faFile}
            className="contract-icon"
          />
          <Txt fSize="14px">ENG</Txt>
        </Div>
      </Div> */}

    </Div>
  );
};

export default (GuestOverview);
