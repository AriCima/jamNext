import React from 'react';
import { useSelector } from 'react-redux';
import { Div, Txt } from '../../styledComps';
import StartChatButton from '../StartChatButton';

const JamInfo = () => {
  const {
    adminId,
    adminFirstName,
    adminLastName,
    jamCode,
    jamDesc,
    jamDetails,
    jamId,
    jamName,
    jamType,
  } = useSelector((state) => state.jamReducer);
  const {
    userRole, userId, firstName, lastName,
  } = useSelector((state) => state.userReducer);

  return (
    <Div className="jamInfo-wrapper" w="100%" just="flex-start" align="center">

      <Div className="jamInfo-section">

        <Div className="jamInfo-info">
          <Div className="name-desc-block">
            <Div className="jamInfo-jamName">
              <Txt>
                {jamName}
                {' '}
                :
              </Txt>
            </Div>
            <Div className="jamInfo-jamDesc">
              <Txt>{jamDesc}</Txt>
            </Div>
            <Div className="jamInfo-line">
              <Txt>
                Jam type:
                <span>{jamType}</span>
              </Txt>
            </Div>
            <Div className="jamInfo-line">
              <Txt>
                Jam address:
                <span>{jamDetails.address}</span>
              </Txt>
            </Div>
            <Div className="jamInfo-line">
              <Txt>
                Jam code:
                <span>{jamCode}</span>
              </Txt>
            </Div>
          </Div>
        </Div>

        {userRole === 'guest' && (
        <Div className="jamInfo-adminInfo">
          <Div className="jamInfo-adminFirstName">
            <Txt>
              The administrator of this jam is:
              <span>
                {adminFirstName}
                {' '}
                {adminLastName}
              </span>
            </Txt>
          </Div>
          <StartChatButton
            adminId={userId}
            adminFirstName={firstName}
            adminLastName={lastName}
            jammers={[{ userId: adminId, firstName: adminFirstName, lastName: adminLastName }]}
            jamDesc={jamName}
            originJamId={jamId}
          />
        </Div>
        )}

      </Div>
    </Div>

  );
};

export default (JamInfo);
