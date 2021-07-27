import React from 'react';
import { connect } from 'react-redux';

import { setJamInfo } from '../../redux/actions/jamActions';
import {
  Div, JamCard, Txt, SmallTxt, SubTitle,
} from '../../styledComps';
import DataService from '../../services/DataService';

const JamCover = ({
  jamActive, jamName, jamId, jamType, jamDesc,
}) => {
  const onsetJam = async () => {
    const res = await DataService.getJamInfoById(jamId);
    setJamInfo(res);
  };

  return (

    <JamCard jamActive={jamActive} onClick={() => onsetJam(jamId)}>
      <Div col align="flex-start" txtOver="ellipsis">
        { jamType === 'chat' ? (
          <>
            <SubTitle>interlocutor</SubTitle>
            <Txt>{`jammed in ${jamDesc}`}</Txt>
          </>
        ) : (
          <>
            <SubTitle>{jamName}</SubTitle>
            <Div col align="flex-start" txtOver="ellipsis">
              <SmallTxt>{jamDesc}</SmallTxt>
            </Div>
          </>
        )}
      </Div>

    </JamCard>
  );
};

export default connect(null, { setJamInfo })(JamCover);
