import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import upperFirst from 'lodash/upperFirst';
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
    const sec = upperFirst(section);
    return (
      <Link href={`/jam/${jamId}/${section}`} key={section + jamId} passHref>
        <JamNavBarItem
          active={section === activeSection}
          back="red"
        >
          {sec}
        </JamNavBarItem>
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
