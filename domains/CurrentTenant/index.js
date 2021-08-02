import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';

import Calculations from '../../services/Calculations';
import { Div, Txt } from '../../styledComps';
// import JammerContractInfo from '../../../../Reusables/JammerContractInfo';
import StartChatButton from '../StartChatButton';

const CurrentTenant = ({ current, jamId }) => {
  const {
    adminFirstName, adminLastName, adminId, jamName,
  } = useSelector((state) => state.jamReducer);

  const { firstName, lastName, userId } = current;

  return (
    <Div
      className="cTenant-wrapper"
      mgT="20px"
      mgB="20px"
      w="95%"
      col
      just="center"
      align="flex-start"
      shad="0px 4px 8px 0px rgba(0, 0, 0, 0.16);"
    >
      <Div className="cTenant-header" w="100%" just="flex-start" align="center" mgB="10px" bordB>
        <Txt mgL="20px" fSize="14px" color="gray" bold>Current Tenant</Txt>
        <Link href="/jam/[jamId]/jammerInfo/[jammerId]" as={`/jam/${jamId}/jammerInfo/${userId}`} passHref>

          <Div h="40px" just="flex-start" align="center" borderR="5px" pad="0 15px">
            {firstName}
            {' '}
            {lastName}
          </Div>

        </Link>

        <Div className="start-chatButton" just="center" align="center">
          <StartChatButton
            adminId={adminId}
            adminName={adminFirstName}
            adminLastName={adminLastName}
            jammers={[{ userId, firstName, lastName }]}
            jamDesc={jamName}
            originJamId={jamId}
          />
        </Div>

      </Div>

      {/* <JammerContractInfo contractInfo={currentTenant} showRoomNr={false} /> */}

    </Div>

  );
};

export default CurrentTenant;
