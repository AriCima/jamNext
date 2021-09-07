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

    <Div className="cTenant-header" mgB="10px" mgR="40px" col shad="4px 6px 12px 0px #B2B2B2" zIndex="2" w="400px" pad="15px" borderR="5px" just="center" align="center">
      <Link href="/jam/[jamId]/jammerInfo/[jammerId]" as={`/jam/${jamId}/jammerInfo/${userId}`} passHref>
        <>
          <Div className="TenantSummaryInfo" w="100%" pad="5px 0" just="space-between" align="flex-start">

            <Div just="flex-start" w="auto">
              <Txt color="#403D39">{tenantTitle}</Txt>
              <Txt mgL="20px">
                {firstName}
                {' '}
                {lastName}
              </Txt>
            </Div>

            <StartChatButton
              w="auto"
              adminId={adminId}
              adminName={adminFirstName}
              adminLastName={adminLastName}
              jammers={[{ userId, firstName, lastName }]}
              jamDesc={jamName}
              originJamId={jamId}
            />
          </Div>

          <Div className="TenantSummaryInfo" w="100%" pad="5px 0" just="space-between" align="flex-start">
            <Div>
              <Txt color="gray">
                check-in:
              </Txt>
              <Txt mgL="10px">{checkIn}</Txt>
            </Div>

            {tenantType === 'current' && (
            <Div>
              <Txt color="gray">
                check-out:
              </Txt>
              <Txt mgL="10px">{checkOut}</Txt>
            </Div>
            )}
          </Div>
        </>
      </Link>

      {/* <JammerContractInfo contractInfo={TenantSummary} showRoomNr={false} /> */}

    </Div>

  );
};

export default TenantSummary;
