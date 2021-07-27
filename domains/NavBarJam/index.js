import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';

import { Div, JamNavBarItem } from '../../styledComps';
import Calculations from '../../services/Calculations';
import useUserPermisions from '../../hooks/useUserPermisions';

const NavBarJam = () => {
  const [jamSections, setJamSections] = useState([]);
  const { jamId, jamType, activeSection } = useSelector((state) => state.jamReducer);

  const { role } = useUserPermisions();

  useEffect(() => {
    if (jamType && role !== 'loading') {
      const userIsAdmin = role === 'admin';
      const sections = userIsAdmin
        ? Calculations.getJamAdminSections(jamType)
        : Calculations.getJamGuestSections(jamType);
      setJamSections(sections);
    }
  }, [jamType, role]);

  const renderJamSections = () => jamSections.map((section) => {
    const sec = section.toLowerCase();
    console.log('sec: ', sec);
    console.log('activeSection: ', activeSection);
    return (
      <Link href={`/jam/${jamId}/${sec}`} key={section + jamId} passHref>
        <JamNavBarItem active={sec === activeSection} back="red">{section}</JamNavBarItem>
      </Link>
    );
  });

  const sectionsLoaded = jamSections.length !== 0;
  return (
    <Div className="navBar Jams" w="100%" h="60px" just="space-around" align="center">
      {sectionsLoaded && renderJamSections()}
    </Div>
  );
};

export default NavBarJam;
