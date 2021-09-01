import React, { useState } from 'react';
import { Div } from '../../styledComps';

import LeftNavBar from '../LeftNavBar';
import ProfileMenu from '../ProfileMenu';
import JamsList from '../JamsList';

const LeftMenu = ({ openModal, showCreate }) => {
  const [showProfile, setShowProfile] = useState(false);

  const showProfileMenu = () => {
    setShowProfile(!showProfile);
  };
  return (
    <Div shad="8px 0 21px -13px #DFDFDF" className="LeftMenu" col flexG="0.2" minW="20%">
      <LeftNavBar openModal={openModal} showCreate={showCreate} showProfileMenu={showProfileMenu} />
      {showProfile
        ? <ProfileMenu showProfileMenu={showProfileMenu} />
        : <JamsList />
      }
    </Div>
  );
};

export default LeftMenu;
