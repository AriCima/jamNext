import React from "react";
import {useForm} from "react-hook-form";
import { useRouter } from 'next/router';

import { connect } from 'react-redux';
import { Div, InputSubmit, SubTitle, Txt, Button } from '../../styledComps';


import DataService from '../../services/DataService';
import { setUserInfo } from '../../redux/actions';
import Layout from '../../domains/Layout';

import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';


const UserCompany = ({ setUserInfo }) => {

    const router = useRouter();
    const { userId } = router.query;

    const { register, errors, handleSubmit } = useForm();


    // const getUserInfo = async (userId) => {
    //     const res = await DataService.getJamInfoById(jamId);
    //     setUserInfo(res);
    // };

    // useEffect(() => {
    //     userId && getUserInfo(userId);
    // }, [userId]);


    const updateCompanyInfo = (data) => {
        const { firstName, lastName, email } = data;  
        console.log('data: ', data);

        // DataService.updateCompanyInfo(data);
    }

    const formStyle = {
        display: 'flex',
        width: '100%',
        justifyContent: 'center'
      }

    return (
        <Layout>
            <Div back="white" col w="100%" just="center" align="center" pad="20px">
                <form style={formStyle} autoComplete="off" onSubmit={handleSubmit(updateCompanyInfo)}>
                    <Div w="100%" col just="center" align="center">
                        <SubTitle>Company Info</SubTitle>
                        <Div col w="100%" just="center" align="center">

                            <FormInput
                                w="100%"
                                label="Name"
                                type='text'
                                name="name"
                                error={errors.name}
                                errorMessage="name is mandatory"
                                register={register}
                                registerObject={{required: true}}
                            />

                            <FormInput
                                w="100%"
                                label="Address (street, houseNr, floor, door"
                                type='text'
                                name="address"
                                error={errors.address}
                                errorMessage="address is mandatory"
                                register={register}
                                registerObject={{required: true}}
                            />
                        </Div>

                        <Div w="100%" just="flex-start">
                            <FormInput
                                w="30%"
                                mgR="20px"
                                label="Zip code"
                                type='text'
                                name="zipCode"
                                error={errors.zipCode}
                                errorMessage="zip code is mandatory"
                                register={register}
                                registerObject={{required: true}}
                            />

                            <FormSelect
                                w="50%"
                                label="Country"
                                name="country"
                                type='text'
                                error={errors.country}
                                errorMessage="country is mandatory"
                                register={register}
                                registerObject={{required: true}}
                            />
                        </Div>

                        <Div w="100%" just="flex-start">
                            <FormInput
                                w="30%"
                                mgR="20px"
                                label="Mobile"
                                name="mobile"
                                type='text'
                                error={errors.modile}
                                errorMessage="mobile is mandatory"
                                register={register}
                                registerObject={{required: true}}
                            />

                            <FormInput
                                w="30%"
                                label="Phone Nr"
                                name="phone"
                                type='text'
                                error={errors.phone}
                                errorMessage="phone is mandatory"
                                register={register}
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

export default UserCompany ;
