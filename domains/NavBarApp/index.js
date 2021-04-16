import React from 'react';
import { useRouter } from 'next/router';

import { NavBar, Txt, Div  } from '../../styledComps';


const NavBarApp = ({w}) => {

    const router = useRouter()

    const navigateToAccess = (e, href) => {
        e.preventDefault();
        router.push(href)
    };

    return(
        <NavBar pos="fixed" w={w} just="flex-start" border="lightgray">
            <Txt>Welcome to Jammint</Txt>
            <Div h="100%" just="flex-end">
                <Div mgL="10px" w="80px" h="100%" back="green" just="center" align="center"
                    onClick={e => navigateToAccess(e, 'login')}
                >
                    <Txt color="white">Login</Txt>
                </Div>
                <Div mgL="10px" w="80px" h="100%" back="green" just="center" align="center"
                    onClick={e => navigateToAccess(e, 'register')}
                >
                    <Txt color="white">Sign In</Txt>
                </Div>
            </Div>
        </NavBar>
    )
}

export default NavBarApp