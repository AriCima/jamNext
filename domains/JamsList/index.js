import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Div, JamCover, Txt } from '../../styledComps';

const JamsList = () => {
  const { userJams } = useSelector((state) => state.userReducer);
  const [currentJamId, setCurrentJamId] = useState('');

  const router = useRouter();

  const { jamId } = router.query;

  useEffect(() => {
    jamId && setCurrentJamId(jamId);
  }, [jamId]);

  const renderJams = () => userJams.map((jam, j) => {
    const { jamName, jamDesc, jamId } = jam;
    const active = jam.jamId === currentJamId;
    return (
      <Link key={jamId} href="/jam/[jamId]/overview" as={`/jam/${jamId}/overview`} passHref>
        <JamCover selected={active}>
          <Txt fSize="12px" bold mgL="0"><span>{jamName}</span></Txt>
          <p>{jamDesc}</p>
        </JamCover>
      </Link>
    );
  });

  const noJams = userJams.lengh === 0;

  return (
    <Div col w="100%">
      { !noJams && renderJams() }
    </Div>
  );
};

export default JamsList;
