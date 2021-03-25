import React from 'react';

import { Div, NavBar  } from '../../styledComps';


const NavBarJam = () => {

    return(
        <NavBar>
            <Div w="20%" just="flex-start">
                <Txt>Jam NavBar left</Txt>
            </Div>
            <Div w="80%" just="center">
                <Txt>Jam NavBar right</Txt>
            </Div>
        </NavBar>
    )
}

export default NavBarJam