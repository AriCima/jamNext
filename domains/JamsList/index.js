import React, {useState, useEffect}  from "react";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/Link';

import { Div, JamCover } from "../../styledComps";


const JamsList = () => {

  const { userJams } = useSelector(state => state.userReducer);
  const [currentJamId, setCurrentJamId] = useState('');
  
  const router = useRouter();

  const { jamId } = router.query;

  useEffect(() => {
    jamId && setCurrentJamId(jamId)
  }, [jamId])

  const renderJams = () => {
    return userJams.map((jam, j) => {
      const {jamName, jamDesc, jamId} = jam;
      const active = jam.jamId === currentJamId;
      return (
        <Link key={jamId} href="/jam/[jamId]/overview" as={`/jam/${jamId}/overview`} passHref>
          <JamCover active={active}>
              <span>{jamName}</span>
              <span>{jamDesc}</span>
          </JamCover>
        </Link>
      )
    });
  };

  const noJams = userJams.lengh === 0;

  return (
    <Div col w="100%">
      { !noJams && renderJams() }
    </Div>
  )
  
};

export default JamsList;