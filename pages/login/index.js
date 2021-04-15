import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import AuthService from '../../services/AuthService';
import DataService from '../../services/DataService';
import { setUserInfo } from '../../redux/actions/userActions';

import { Div, SubTitle, Txt, Button } from '../../styledComps';
import FormInput from '../../components/FormInput';


const Login = ({ updateView, setUserInfo}) => {
    
    const { register, errors, handleSubmit } = useForm();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo') || '';

        if (!isEmpty(userInfo)) {
            // SET USER INFO IN REDUX
            setUserInfo(userInfo)
        };

    }, []);

    const onLogin = (data) => {
        const { email, password } = data;  

        AuthService.login(email, password)
        .then(res => {
            const userId = res.user.uid
            console.log('userId: ', userId);
            DataService.getUserInfo(userId)
            .then((res) => {
                console.log('res: ', res);
                const { firstName, lastName } = res;
                const userInfo = {userId, firstName, lastName, email, password};               
                localStorage.setItem('userInfo', userInfo);
                router.push('/dashboard')
            })
        })
    }

    const router = useRouter()

    const switchToRegister = (e, href) => {
        e.preventDefault();
        router.push(href)
    };

    return (
        <Div w="100%" col algin="center" just="center">
            <form autoComplete="off" onSubmit={handleSubmit(onLogin)}>
                <Div w="50%" col just="center" align="center">
                    <SubTitle>LOGIN and start jamin'</SubTitle>
                    <Div col w="100%" just="center" align="center">
                        <FormInput
                            w="50%"
                            name="email"
                            label="email"
                            // type='email'
                            error={errors.email}
                            errorMessage="Email no válido"
                            register={register}
                            registerObject={{ 
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            }}
                        />

                        <FormInput
                            w="50%"
                            label="password"
                            type='password'
                            name="password"
                            error={errors.password}
                            errorMessage="Non valid password"
                            register={register}
                            registerObject={{
                                required: true,
                                pattern: '',

                            }}
                        />

                    </Div>
                    {/* <Input
                        back='rgb(85, 187, 151)'
                        type="submit"
                    /> */}
                    <Button
                        w="50%"
                        type="submit"
                        border='rgb(85, 187, 151)'
                        back="rgb(85, 187, 151)"
                        color="white"
                    >
                        <Txt color="white" bold mg="0px" pad="0">Submit</Txt>
                    </Button>
                </Div>

            </form>
            <Div col w="50%" align="center" just="center" mgT="20px">
                <Div just="flex-start" w="50%">
                    <Txt fSize="10px">Or if you don't have an account yet, you can register here</Txt>
                </Div>
                <Button
                    onClick={switchToRegister}
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


export default connect(null, { setUserInfo })(Login);