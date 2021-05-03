import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import AuthService from '../../services/AuthService';
import DataService from '../../services/DataService';
import { setUserInfo } from '../../redux/actions/userActions';

import { Div, SubTitle, Txt, Button, InputSubmit } from '../../styledComps';
import FormInput from '../../components/FormInput';


const Login = ({setUserInfo}) => {
    
    const { register, errors, handleSubmit } = useForm();
    const router = useRouter()
    
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
            DataService.getUserInfo(userId)
            .then(res => {
                const { firstName, lastName } = res;
                const userInfo = {userId, firstName, lastName, email, password};               
                localStorage.setItem('userInfo', userInfo);
                router.push('/jams')
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            alert('user or password failure')
        });
    }

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
            <form style={formStyle} autoComplete="off" onSubmit={handleSubmit(onLogin)}>
                <Div w="50%" col just="center" align="center">
                    <SubTitle>LOGIN and start jamin'</SubTitle>
                    <Div col w="100%" just="center" align="center">
                        <FormInput
                            w="100%"
                            name="email"
                            label="Email"
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
                            w="100%"
                            label="Password"
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
                    <InputSubmit
                        w="100%"
                        back='rgb(85, 187, 151)'
                        type="submit"
                        value="submit"
                    />
                </Div>

            </form>
    );
};


export default connect(null, { setUserInfo })(Login);