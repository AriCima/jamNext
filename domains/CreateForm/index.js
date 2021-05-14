import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';

import DataService from '../../services/DataService';
import Calculations from "../../services/Calculations";
import { setUserInfo } from '../../redux/actions/userActions';

import { Div, SubTitle, InputSubmit } from '../../styledComps';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';


const formStyle = {
    display: 'flex',
    width: '100%',
    justifyContent: 'center'
};

const CreateForm = ({userId, showModal}) => {
    const [typeOfJam, setJamType] = useState('');
    const [roomsNr, setRoomsNr] = useState(0)
    
    const { register, errors, handleSubmit } = useForm();
    const router = useRouter()
    
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
                landlordInfo: {},
                apartmentInfo: {}
            };

            jamDetails = {rooms: parseInt(roomsNr, 10), jamRules, contractInfo}
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

        DataService.createJam(newJamInfo)
        .then(res => {
            console.log('res', res);
            const jamId = res.id;
            showModal(false)
            router.push(`/jam/${jamId}`)
        })
    };

    const nrOfRooms = Calculations.getSelectOptions('nrOfRooms');
    const typeOfJams = Calculations.getSelectOptions('jamTypes');

    return (
        <form style={formStyle} autoComplete="off" onSubmit={handleSubmit(createNewJam)}>
            <Div w="100%" col just="center" align="flex-start">
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
                    reportValue={val => setJamType(val)}
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
                        reportValue={val => setRoomsNr(val)}
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
    );
};


export default connect(null, { setUserInfo })(CreateForm);