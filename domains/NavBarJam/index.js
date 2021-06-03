import React, { useState, useEffect } from 'react';
import Link from 'next/Link';
import { useSelector } from 'react-redux';

import { Div, JamNavBarItem  } from '../../styledComps';
import Calculations from '../../services/Calculations';


const NavBarJam = () => {
    const [jamSections, setJamSections] = useState([]);
    const { jamType, jamName, adminId } = useSelector(state => state.jamReducer);
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
            return(
                <Link href={`/jam/${jamId}/${sec}`} key={key}>
                    <JamNavBarItem className="navBarItem">{section}</JamNavBarItem>
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