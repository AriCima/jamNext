import React from 'react';
import { useRouter } from 'next/router';
import LoginForm from '../../domains/LoginForm';


import { Div, Txt, Button, } from '../../styledComps';


const Login = () => {
    
    const router = useRouter()
    const navigateTo = (e) => {
        e.preventDefault();
        router.push('register')
    };

    const formStyle = {
        display: 'flex',
        width: '100%',
        justifyContent: 'center'
    }

    return (
        <Div col w="100%" just="center" align="center">
            <LoginForm />
            <Div col w="100%" align="center" just="center" mgT="20px">
                <Div just="flex-start" w="50%">
                    <Txt fSize="10px">Or if you don't have an account yet, you can register here</Txt>
                </Div>
                <Button
                    href={""}
                    onClick={e => navigateTo(e)}
                    border='rgb(85, 187, 151)'
                    color='rgb(85, 187, 151)'
                    w='50%'
                >
                    <Txt color="gray">REGISTER</Txt>
                </Button>
            </Div>
        </Div>
    );
};


export default Login;