import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Modal from '../../components/Modal';
import LoginForm from '../LoginForm';

import { NavBar, Txt, Div  } from '../../styledComps';


const NavBarApp = ({w}) => {
    const [showModal, setShowModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter()

    /* const navigateToAccess = (e, href) => {
        e.preventDefault();
        router.push(href)
    }; */

    return(
        <NavBar pos="fixed" w={w} just="flex-start" border="lightgray">
            <Txt>Welcome to Jammint</Txt>
            <Div h="100%" just="flex-end">
                <Div mgL="10px" w="80px" h="100%" back="green" just="center" align="center"
                    onClick={() => setShowModal(true)}
                >
                    <Txt color="white">Login</Txt>
                </Div>
                <Div mgL="10px" w="80px" h="100%" back="green" just="center" align="center"
                    onClick={e => navigateToAccess(e, 'register')}
                >
                    <Txt color="white">Sign In</Txt>
                </Div>
            </Div>
            <Modal showModal={showModal} closeModal={()=>setShowModal(false)}>
                <Div col w='80%' just="center" align="center" >
                {isLogin ? (<>
                        <h3>Login</h3>
                        <p>Don't have an account? <span onClick={()=>setIsLogin(false)}>Register</span></p>
                    </>):(<>
                        <h3>Register</h3>
                        <p>Do you have an account? <span onClick={()=>setIsLogin(true)}>Login</span></p>
                    </>)}
                {isLogin ? <LoginForm /> : <div>Register</div>}
                </Div>
            </Modal>
        </NavBar>
    )
}

export default NavBarApp