import React, { useState } from 'react';
import Modal from '../../components/Modal';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';

import styled from 'styled-components';
import { Txt, Div, SubTitle  } from '../../styledComps';


const Span = styled.span`
    font-weight: 700;
    color: green;
    margin-left: 10px;
    &:hover{
        text-decoration: underline;
    }
`;

const NavBarApp = ({w}) => {
    const [showModal, setShowModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    return(
        <Div pos="fixed" w={w} h="60px" just="space-between" align="center" border="lightgray">
            <Txt>Welcome to Jammint</Txt>
            <Div h="100%" just="flex-end">
                <Div mgL="10px" w="80px" h="100%" back="green" just="center" align="center"
                    onClick={() => {
                        setShowModal(true);
                        setIsLogin(true);
                    }}
                >
                    <Txt color="white">Login</Txt>
                </Div>
            </Div>
            
            <Modal showModal={showModal} closeModal={()=>setShowModal(false)}>
                <Div col w='100%' just="center" align="center" >
                    <Div col w="90%" pad="0 0 10px 0">
                        {isLogin ? (
                            <>
                                <Div className="LoginWrapper" w="100%" just="center">
                                    <SubTitle mgT="-5px" mgB="20px">Login and start jamin'</SubTitle>
                                </Div>
                                <Txt>Don't have an account yet ? <Span onClick={()=>setIsLogin(false)}>Register</Span></Txt>
                                <LoginForm />
                            </>
                        ):(
                            <>
                                <Div className="RegisterWrapper" w="100%" just="center">
                                    <SubTitle mgT="-5px" mgB="20px">Register</SubTitle>
                                </Div>
                                <Txt>Already have an account ? <Span onClick={()=>setIsLogin(true)}>Login</Span></Txt>
                                <RegisterForm />
                            </>
                        )}
                    </Div>
                </Div>
            </Modal>
            
        </Div>
    )
}

export default NavBarApp