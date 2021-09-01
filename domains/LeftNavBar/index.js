import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import { Div, NavBarIcon } from '../../styledComps';

const LeftNavBar = ({ openModal, showCreate, showProfileMenu }) => (
  <Div className="LeftNavBar" minH="60px" mgL="10px" mgR="10px" flexG="0" just="space-between" align="center">
    <NavBarIcon
      className="Join-button"
      fSize="36px"
      onClick={() => {
        openModal(true);
        showCreate(false);
      }}
    >
      <FontAwesomeIcon icon={faCheck} />
    </NavBarIcon>
    <NavBarIcon
      className="Create-button"
      cfSize="36px"
      onClick={() => {
        openModal(true);
        showCreate(true);
      }}
    >
      <FontAwesomeIcon icon={faPlus} />
    </NavBarIcon>
    <NavBarIcon className="Profile-button" fSize="36px" onClick={showProfileMenu}>
      <FontAwesomeIcon icon={faUser} />
    </NavBarIcon>
  </Div>
);

export default LeftNavBar;
