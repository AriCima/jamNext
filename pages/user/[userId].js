import React from "react";
import {useForm} from "react-hook-form";
import { useRouter } from 'next/router';

import { connect } from 'react-redux';
import { Div, InputSubmit, SubTitle, Txt, Button } from '../../styledComps';


import DataService from '../../services/DataService';
import { setUserInfo } from '../../redux/actions';
import Layout from '../../domains/Layout';

import FormInput from '../../components/FormInput';


const UserId = ({ setUserInfo }) => {

    const router = useRouter();
    const { userId } = router.query;
    console.log('router: ', router);

    const { register, errors, getValues, handleSubmit } = useForm();


    // const getUserInfo = async (userId) => {
    //     const res = await DataService.getJamInfoById(jamId);
    //     setUserInfo(res);
    // };

    // useEffect(() => {
    //     userId && getUserInfo(userId);
    // }, [userId]);

    const updateUserInfo = (data) => {
        const { firstName, lastName, email } = data;  
        console.log('data: ', data);

        // DataService.updateUserInfo(data);
    }

    const formStyle = {
        display: 'flex',
        width: '100%',
        justifyContent: 'center'
      }

    return (
        <Layout>
            <Div back="white" col w="100%" just="center" align="center" pad="20px">
                <form style={formStyle} autoComplete="off" onSubmit={handleSubmit(updateUserInfo)}>
                    <Div w="100%" col just="center" align="center">
                        <SubTitle>User Info</SubTitle>
                        <Div col w="100%" just="center" align="center">

                            <FormInput
                                w="100%"
                                label="Name"
                                type='text'
                                name="fistName"
                                error={errors.firstName}
                                errorMessage="Non valid password"
                                register={register}
                                registerObject={{
                                    required: true,
                                    pattern: '',

                                }}
                            />

                            <FormInput
                                w="100%"
                                label="Last name"
                                type='text'
                                name="lastName"
                                error={errors.lastName}
                                errorMessage="Non valid password"
                                register={register}
                                registerObject={{
                                    required: true,
                                    pattern: '',

                                }}
                            />

                            <FormInput
                                w="100%"
                                label="Email"
                                name="email"
                                // type='email'
                                error={errors.email}
                                errorMessage="Email no válido"
                                register={register}
                                registerObject={{ 
                                    required: true,
                                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
            </Div>
        </Layout>
    );
}

export default UserId ;
