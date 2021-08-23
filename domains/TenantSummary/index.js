import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { Div, Txt, HovRow } from '../../styledComps';
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

    <HovRow className="cTenant-header" w="100%" just="center" align="center">

      <Link href="/jam/[jamId]/jammerInfo/[jammerId]" as={`/jam/${jamId}/jammerInfo/${userId}`} passHref>
        <>
          <Div className="TenantSummaryInfo" pad="20px" h="40px" just="flex-start" align="center" borderR="5px" mgL="5px">
          <Txt>{tenantTitle}</Txt>
            <Txt mgL="20px">
              {firstName}
              {' '}
              {lastName}
            </Txt>
            <Txt mgL="20px" color="gray">
              check-in:
            </Txt>
            <Txt mgL="10px">{checkIn}</Txt>
            {tenantType === 'current' && (
            <>
              <Txt mgL="20px" color="gray">
                check-out:
              </Txt>
              <Txt mgL="10px">{checkOut}</Txt>
            </>
            )}
          </Div>
            <StartChatButton
              adminId={adminId}
              adminName={adminFirstName}
              adminLastName={adminLastName}
              jammers={[{ userId, firstName, lastName }]}
              jamDesc={jamName}
              originJamId={jamId}
            />

        </>
      </Link>

      {/* <JammerContractInfo contractInfo={TenantSummary} showRoomNr={false} /> */}

    </HovRow>

  );
};

export default TenantSummary;
