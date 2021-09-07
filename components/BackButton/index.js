import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import dictionary from '../../locale';
import { AnchorText } from '../../styledComps';

const BackButton = ({ section }) => {
  const { lenguage } = useSelector((state) => state.userReducer);
  const { jamId } = useSelector((state) => state.jamReducer);
  const dict = dictionary[lenguage];

  const lowSection = section.toLowerCase();
  return (
    <Link href={`/jam/${jamId}/${lowSection}`} passHref>
      <AnchorText mg="10px 0" color="#CCC5B9">
        &lt;&lt;&nbsp;
        {dict[section]}
      </AnchorText>
    </Link>
  );
};

export default BackButton;
