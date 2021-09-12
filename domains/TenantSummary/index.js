import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { Div, Txt, AnchorText } from '../../styledComps';
import StartChatButton from '../StartChatButton';
import dictionary from '../../locale';

const TenantSummary = ({ tenantType, tenant, jamId }) => {
  const { lenguage } = useSelector((state) => state.userReducer);
  const dict = dictionary[lenguage];

  const {
    adminFirstName, adminLastName, adminId, jamName,
  } = useSelector((state) => state.jamReducer);

  const {
    firstName, lastName, userId, checkIn, checkOut,
  } = tenant;

  const tenantTitle = tenantType === 'current' ? `${dict.common.currentTenant} :` : `${dict.common.nextTenant} :`;

  return (

    <Div className="cTenant-header" mgB="10px" mgR="40px" col shad="2px 2px 12px 0px #B2B2B2" zIndex="2" w="400px" pad="15px" borderR="5px" just="center" align="center">
      <>
        <Div className="TenantSummaryInfo" w="100%" pad="5px 0" just="space-between" align="flex-start">

          <Div just="flex-start" w="auto">
            <Txt color="#403D39">{tenantTitle}</Txt>
            <Link href="/jam/[jamId]/jammerInfo/[jammerId]" as={`/jam/${jamId}/jammerInfo/${userId}`} passHref>
              <AnchorText mg="0px 10px" color="black">
                {firstName}
                {' '}
                {lastName}
              </AnchorText>
            </Link>
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
    </Div>

  );
};

export default TenantSummary;
