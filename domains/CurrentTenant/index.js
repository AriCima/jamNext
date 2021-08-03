import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { Div, Txt, DivShadow } from '../../styledComps';
// import JammerContractInfo from '../../../../Reusables/JammerContractInfo';
import StartChatButton from '../StartChatButton';

const CurrentTenant = ({ tenantType, tenant, jamId }) => {
  const {
    adminFirstName, adminLastName, adminId, jamName,
  } = useSelector((state) => state.jamReducer);

  const {
    firstName, lastName, userId, checkIn, checkOut,
  } = tenant;

  const tenantTitle = tenantType === 'current' ? 'Current Tenant' : 'Next tenant';

  return (

    <Div className="cTenant-header" col w="100%" just="flex-start" align="flex-start" mgB="10px" bordB>
      <Txt mgB="10px" fSize="14px" color="gray" bold>{tenantTitle}</Txt>

      <Link href="/jam/[jamId]/jammerInfo/[jammerId]" as={`/jam/${jamId}/jammerInfo/${userId}`} passHref>
        <DivShadow className="currentTenantInfo" hoverC="pointer" pad="20px" h="40px" just="flex-start" align="center" borderR="5px" mgL="20px">
          <Txt>
            {firstName}
            {' '}
            {lastName}
          </Txt>
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
          <Txt mgL="20px" color="gray">
            check-in:
          </Txt>
          <Txt mgL="10px">{checkIn}</Txt>
          {tenantTitle === 'current' && (
          <>
            <Txt mgL="20px" color="gray">
              check-out:
            </Txt>
            <Txt mgL="10px">{checkOut}</Txt>
          </>
          )}
        </DivShadow>
      </Link>

      {/* <JammerContractInfo contractInfo={currentTenant} showRoomNr={false} /> */}

    </Div>

  );
};

export default CurrentTenant;
