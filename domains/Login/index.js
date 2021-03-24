import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import AuthService from '../../services/AuthService';
import DataService from '../../services/DataService';
import { setUserInfo } from '../../redux/actions/userActions';

import { Div, Input, SubTitle, Txt, Button } from '../../styledComps';
import FormInput from '../../components/FormInput';


const useLoginForm = ({ updateView, setUserInfo}) => {
    
    const { register, errors, handleSubmit } = useForm();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo') || '';

        if (!isEmpty(userInfo)) {
            // SET USER INFO IN REDUX
            setUserInfo(userInfo)
        };

    }, []);

    const onLogin = (data) => {
        console.log('data: ', data);
        const { email, password } = data;  

        AuthService.login(email, password)
        .then(res => {
            const userId = res.user.uid
            DataService.getUserInfo(userId)
            .then((res) => {
                const { firstName, lastName } = res;
                const userInfo = {userId, firstName, lastName, email, password};               
                localStorage.setItem('userInfo', userInfo);
            })
        })
    }

    return (
        <Div col >
            <form autoComplete="off" onSubmit={handleSubmit(onLogin)}>
                <Div col>
                    <SubTitle>LOGIN and start jamin'</SubTitle>
                    <Div col align="flex-start">
                        <FormInput
                            w="100%"
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
                            label="password"
                            type='password'
                            error={errors.password}
                            errorMessage="Non valid password"
                            register={register}
                            registerObject={{
                                required: true,
                                pattern: '',

                            }}
                        />

                    </Div>
                </Div>

                <Div just='flex-start'>
                    <Input
                        back='rgb(85, 187, 151)'
                        type="submit"
                    />
                </Div>
            </form>
                <Div col>
                    <Txt>Or if you don't have an account yet, you can register here</Txt>
                    <Button
                        onClick={(e) => updateView('register')}
                        border='rgb(85, 187, 151)'
                        pad="10px 15px"
                        color='rgb(85, 187, 151)'
                        w='100%'
                    >
                        REGISTER
                    </Button>
                </Div>
        </Div>
    );
};


export default connect(null, { setUserInfo })(useLoginForm);