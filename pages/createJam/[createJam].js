import React, {useState} from "react";
import {useForm} from "react-hook-form";
import { useSelector } from 'react-redux';

import { connect } from 'react-redux';
import { Div, InputSubmit, SubTitle, Txt, Button } from '../../styledComps';


import { DataService, Calculations } from '../../services';
import Layout from '../../domains/Layout';

import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import Calculations from "../../services/Calculations";


const CreateJam = () => {
    const [typeOfJam, setJamType] = useState('');
    const [nrOfRooms, setNrOfRooms] = useState(0)

    const { userId } = useSelector(state => state.userReducer);
    const { register, errors, handleSubmit } = useForm();


    const createNewJam = (data) => {
        const { jamName, jamDesc, jamType } = data;
        
        const jamCode = Calculations.generateJamCode();
        const createdAt = new Date();
        const updatedAt = '';
        let jamRules = {};
        let contractInfo = {};
        let jamDetails = {};

        if (jamType === 'rooms-rental') {
            jamRules = Calculations.getJamRules(jamType);
            contractInfo = {
                landlordInfo = {},
                apartmentInfo = {}
            }
            jamDetails = {nrOfRooms, jamRules, contractInfo}
        };
        
        const newJamInfo = {
            adminId: userId,
            jamCode,
            jamName,
            jamDesc,
            jamType,
            jamDetails,
            createdAt,
            updatedAt,
            lastActivity: createdAt
        };

        DataService.createJam(newJamInfo);
    }

    const formStyle = {
        display: 'flex',
        width: '100%',
        justifyContent: 'center'
    }

    const nrOfRooms = Calculations.getSelectOptions('nrOfRooms');
    const typeOfJams = Calculations.getSelectOptions('jamTypes');

    return (
        <Layout>
            <Div back="white" col w="100%" just="center" align="center" pad="20px">
                <form style={formStyle} autoComplete="off" onSubmit={handleSubmit(createNewJam)}>
                    <Div w="100%" col just="center" align="center">
                        <SubTitle>Jam Info</SubTitle>
                        <FormInput
                            w="70%"
                            label="Jam Name"
                            type='text'
                            name="jamName"
                            mgR="20px"
                            error={errors.jamName}
                            errorMessage="Jam Name is mandatory"
                            register={register}
                            registerObject={{required: true}}
                        />

                        <FormInput
                            w="100%"
                            label="Desription"
                            type='text'
                            name="jamDesc"
                            error={errors.jamDesc}
                            errorMessage="A brief description is mandatory"
                            register={register}
                            registerObject={{required: true}}
                        />

                        <FormSelect
                            w="50%"
                            label="Jam type"
                            name="jamType"
                            type='text'
                            error={errors.jamType}
                            errorMessage="Please select a jam type"
                            register={register}
                            registerObject={{required: true}}
                            onChange={e => setJamType(e.target.value)}
                            options={typeOfJams}
                        />

                        {typeOfJam === 'rooms-rental' && 
                            <FormSelect
                                w="50%"
                                label="Nr. of Rooms"
                                name="nrOfRooms"
                                type='text'
                                error={errors.nrOfRooms}
                                errorMessage="Please select the nr of Rrooms"
                                register={register}
                                registerObject={{required: true}}
                                options={nrOfRooms}
                            />
                        }

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

export default CreateJam ;
