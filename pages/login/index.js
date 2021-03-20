import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import AuthService from '../../services/AuthService';
import DataService from '../../services/DataService';
import { setUserInfo } from '../../redux/actions/userActions';
import { Div, Input } from '../../styledComps';

const useLoginForm = ({ setUserInfo}) => {
    
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
            DataService.getUserInfo(userId)
            .then((res) => {
                const { firstName, lastName } = res;
                const userInfo = {userId, firstName, lastName, email, password};               
                localStorage.setItem('userInfo', userInfo);
            })
        })
    }

    const goToRegister = (e) => {
        e.preventDefault();
    }
    return (
        <Div orient='column' >
            <form
                autoComplete="off"
                className="login-hook-form"
                onSubmit={handleSubmit(onLogin)}
            >
                <div className="login-form-section">
                    <div className="form-section-title">
                        <p>LOGIN and start jamin'</p>
                    </div>
                    <div className="form-column">
                        <div className="login-block-long">
                            <div className="block-label">
                                <label>Email</label>
                                {errors.email && <div className="field-error">Non valid address</div>}
                            </div>
                            <Input
                                w='50%'
                                name="email"
                                ref={register({ 
                                    required: true,
                                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                })}
                            />
                        </div>
                        <div className="login-block-long">
                            <div className="block-label">
                                <label>Password</label>
                                {errors.password && <div className="field-error">Non valid password</div>}
                            </div>
                            <Input
                                width='100%'
                                name="password" 
                                ref={register({ 
                                required: true,
                                pattern: '',
                                })}
                            />
                        </div>
                    </div>
                </div>
                <Div
                    orient='row'
                    just='flex-start'
                >
                    <Input
                        back='rgb(85, 187, 151)'
                        type="submit"
                    />
                </Div>
            </form>
                <div className="login-register-area">
                    <p>Or if you don't have an account yet, you can register here</p>

                    <div className="register-button" onClick={(e) => goToRegister(e)}>
                        <p>REGISTER</p>
                    </div>

                </div>
        </Div>
    );
};


export default connect(null, { setUserInfo })(useLoginForm);