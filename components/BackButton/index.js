import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import dictionary from '../../locale';
import { BackAnchor } from '../../styledComps';

const BackButton = ({ section }) => {
  const { lenguage } = useSelector((state) => state.userReducer);
  const { jamId } = useSelector((state) => state.jamReducer);
  const dict = dictionary[lenguage];

  const lowSection = section.toLowerCase();
  console.log('link', `/jam/${jamId}/${lowSection}`);
  return (
    <Link href={`/jam/${jamId}/${lowSection}`} passHref>
      <BackAnchor>
        &lt;&lt;&nbsp;
        {dict[section]}
      </BackAnchor>
    </Link>
  );
};

export default BackButton;
