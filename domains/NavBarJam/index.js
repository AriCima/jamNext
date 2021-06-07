import React, { useState, useEffect } from 'react';
import Link from 'next/Link';
import { useSelector , useDispatch } from 'react-redux';

import { Div, JamNavBarItem } from '../../styledComps';
import Calculations from '../../services/Calculations';
import { setActiveSection } from '../../redux/actions/jamActions';


const NavBarJam = () => {
    const [jamSections, setJamSections] = useState([]);
    const dispatch = useDispatch()
    const { jamType, adminId, activeSection} = useSelector(state => state.jamReducer);
    const { userId } = useSelector(state => state.userReducer);
    const { jamId } = useSelector(state => state.jamReducer);
  

    useEffect(() => {
        if(jamType) {
            const userIsAdmin = userId === adminId;
            const sections = userIsAdmin ? Calculations.getJamAdminSections(jamType) : Calculations.getJamGuestSections(jamType);
            setJamSections(sections);
        } 
    }, [jamType]);

    const renderJamSections = () => {
        return jamSections.map((section, key) => {
            const sec = section.toLowerCase();
            const active = activeSection === sec;
            return(
                <Link href={`/jam/${jamId}/${sec}`} key={key} passHref>
                    <JamNavBarItem active onClick={(sec) => dispatch(setActiveSection(sec))} back="red" back="red">{section}</JamNavBarItem>
                </Link>
            )
        })
    };

    const sectionsLoaded = jamSections.length !== 0;
    return(
            <Div className="navBar Jams" w="100%" h="60px" just="space-around" align="center">
                {sectionsLoaded && renderJamSections()}
            </Div>
    )
}

export default NavBarJam