import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import dictionary from '../../locale';
import { Div } from '../../styledComps';

const BackButton = ({ section }) => {
  const { lenguage } = useSelector((state) => state.userReducer);
  const { jamId } = useSelector((state) => state.jamReducer);
  const dict = dictionary[lenguage];

  const lowSection = section.toLowerCase();
  console.log('link', `/jam/${jamId}/${lowSection}`);
  return (
    <Div>
      <Link href={`/jam/${jamId}/${lowSection}`} passHref>
        <>
          &lt;&lt;&nbsp;
          {dict[section]}
        </>
      </Link>
    </Div>
  );
};

export default BackButton;
