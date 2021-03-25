import React from 'react';

import { NavBar, Txt  } from '../../styledComps';


const NavBarApp = ({w}) => {

    return(
        <NavBar pos="fixed" w={w} just="flex-start" border="lightgray">
            <Txt>This is the app header</Txt>
        </NavBar>
    )
}

export default NavBarApp