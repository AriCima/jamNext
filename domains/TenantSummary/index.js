import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { Div, Txt, DivShadow } from '../../styledComps';
// import JammerContractInfo from '../../../../Reusables/JammerContractInfo';
import StartChatButton from '../StartChatButton';

const TenantSummary = ({ tenantType, tenant, jamId }) => {
  const {
    adminFirstName, adminLastName, adminId, jamName,
  } = useSelector((state) => state.jamReducer);

  const {
    firstName, lastName, userId, checkIn, checkOut,
  } = tenant;

  const tenantTitle = tenantType === 'current' ? 'Current Tenant :' : 'Next tenant: ';

  return (

    <Div className="cTenant-header" w="100%" just="center" align="center" bordB>
      <Txt fSize="14px">{tenantTitle}</Txt>

      <Link href="/jam/[jamId]/jammerInfo/[jammerId]" as={`/jam/${jamId}/jammerInfo/${userId}`} passHref>
        <Div className="TenantSummaryInfo" hoverC="pointer" pad="20px" h="40px" just="flex-start" align="center" borderR="5px" mgL="5px">
          <Txt fSize="12px">
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
          <Txt fSize="12px" mgL="20px" color="gray">
            check-in:
          </Txt>
          <Txt fSize="12px" mgL="10px">{checkIn}</Txt>
          {tenantType === 'current' && (
          <>
            <Txt fSize="12px" mgL="20px" color="gray">
              check-out:
            </Txt>
            <Txt fSize="12px" mgL="10px">{checkOut}</Txt>
          </>
          )}
        </Div>
      </Link>

      {/* <JammerContractInfo contractInfo={TenantSummary} showRoomNr={false} /> */}

    </Div>

  );
};

export default TenantSummary;
