import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import styled from 'styled-components';
import { Div, NavBar, Txt  } from '../../styledComps';

import Calculations from '../../services/Calculations';

const NavBarItem = styled.a`
    role: button;
    height: 100%;
    padding: 5px 10px;
    margin: 0 20px;
    color: green;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    &:hover{
      background-color: rgb(85, 187, 151);
      p{
         color: white;
      }
    }
    transition: 0.3s;
    &:hover{
        background-color: rgb(226,226,226);
        cursor: pointer;
    }

}`;

const NavBarJam = () => {
    const [jamSections, setJamSections] = useState([]);
    const { jamType, jamName, adminId } = useSelector(state => state.jamReducer);
    const { userId } = useSelector(state => state.userReducer);

    if (jamSections.length > 0 && jamType !== '') {
        const userIsAdmin = userId === adminId;
        const sections = userIsAdmin ? Calculations.getJamSections(jamType) : Calculations.getJamGuestSections(jamType);
        setJamSections(sections);
    };

    const renderJamSections = () => {
        return jamSections.map((section, key) => {
            return(
                <Link href={`/jam/${jamId}/`}>
                    <NavBarItem>{section}</NavBarItem>
                </Link>
            )
        })
    };

    const sectionsLoaded = jamSections.length !== 0;
    return(
        <NavBar>
            <Div w="20%" just="flex-start">
                <Txt>{jamName}</Txt>
            </Div>
            <Div w="80%" just="space-around" align="center">
                {sectionsLoaded && renderJamSections()}
            </Div>
        </NavBar>
    )
}

export default NavBarJam