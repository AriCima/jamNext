import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";

import DataService from '../../services/DataService';
import Calculations from "../../services/Calculations";

import { Div, InputSubmit } from '../../styledComps';
import FormInput from '../../components/FormInput';

const formStyle = {
    display: 'flex',
    width: '100%',
    justifyContent: 'center'
};

const JoinForm = () => {
    const [typeOfJam, setJamType] = useState('');
    // const [nrOfRooms, setNrOfRooms] = useState(0)
    
    const { register, errors, handleSubmit } = useForm();
    const router = useRouter()
    
    const joinJam = (e) => {
        e.preventDefault();
    
        DataService.getJamInfoByCode(jamCode)
        .then(result =>{
          
            const {jamName, jamType, jamDesc, jamAdminId, jamAdminName, jamId} = result;
        
            if(jamIds.includes(jamId) ) {
                alert(`You are already jammer in ${jamName}`)
                return
            }
            const joinedAt = new Date();
        
            const jamInfo = {
                jamCode,
                jamName,
                jamId,
                jamDesc,
                joinedAt,
                jamType,
                jamAdminId,
                jamAdminName,
                lastActivity: joinedAt
            };
        
        
        
            DataService.addJamToUser(jamId, userId, jamInfo)
            .then(result =>{
                console.log('result del addJamToUser', result)
            }).catch(function (error) {   
                console.log(error);
            });
    
            const userInfo = { userId, email, firstName, lastName };
            DataService.addJammerToJam(jamId, userInfo)
            .then(result =>{
                console.log('result del updatJammers', result)
            }).catch(function (error) {   
                console.log(error);
            });
          
        }).catch(function (error) {   
          console.log(error);
        });

    };
    

    return (
        <form style={formStyle} autoComplete="off" onSubmit={handleSubmit(joinJam)}>
            <Div w="100%" col just="center" align="center">
                
                <FormInput
                    w="60%"
                    label="Jam code"
                    type='text'
                    name="jamCode"
                    error={errors.jamCode}
                    errorMessage="Jam code is mandatory"
                    register={register}
                    registerObject={{required: true}}
                />

               

                <InputSubmit
                    w="60%"
                    back='rgb(85, 187, 151)'
                    type="submit"
                    value="submit"
                />
            </Div>
        </form>
    );
};


export default JoinForm;