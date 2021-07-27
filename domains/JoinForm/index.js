import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';

import DataService from '../../services/DataService';

import { Div, InputSubmit } from '../../styledComps';
import FormInput from '../../components/FormInput';

const formStyle = {
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
};

const JoinForm = () => {
  const [jamIds, setJamIds] = useState([]);
  const {
    userId, email, firstName, lastName,
  } = useSelector((state) => state.userReducer);

  // CHECK IF ALREADY JOINED IN THIS JAM
  DataService.getUserJams(userId)
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        jamIds[i] = result[i].jamId;
      }
      setJamIds(jamIds);
    }).catch((error) => {
      console.log(error);
    });

  const { register, errors, handleSubmit } = useForm();

  const joinJam = (e, data) => {
    e.preventDefault();
    const { jamCode, message } = data;

    DataService.getJamInfoByCode(jamCode)
      .then((result) => {
        const {
          jamName, jamType, jamDesc, adminId, jamadminFirstName, jamId, privacy,
        } = result;

        if (jamIds.includes(jamId)) {
          alert(`You are already jammer in ${jamName}`);
          return;
        }
        const joinedAt = new Date();

        const jamInfo = {
          jamCode,
          jamName,
          jamId,
          jamDesc,
          joinedAt,
          jamType,
          adminId,
          jamadminFirstName,
          lastActivity: joinedAt,
        };
        const jammer = {
          userId, firstName, lastName, email,
        };

        if (privacy === 'private') {
          DataService.saveJoinRequest(jamId, jammer);
        } else {
          DataService.addJamToUser(jamId, userId, jamInfo)
            .then(
              console.log('result del addJamToUser', result),
            ).catch((error) => {
              console.log(error);
            });

          const userInfo = {
            userId, email, firstName, lastName,
          };

          DataService.addJammerToJam(jamId, userInfo)
            .then(
              console.log('result del updatJammers', result),
            ).catch((error) => {
              console.log(error);
            });
        }
      }).catch((error) => {
        console.log(error);
      });
  };

  return (
    <form style={formStyle} autoComplete="off" onSubmit={handleSubmit(joinJam)}>
      <Div w="100%" col just="center" align="center">

        <FormInput
          w="60%"
          label="Jam code"
          type="text"
          name="jamCode"
          error={errors.jamCode}
          errorMessage="Jam code is mandatory"
          register={register}
          registerObject={{ required: true }}
        />

        <FormInput
          w="60%"
          label="Message for the Admin"
          type="text"
          name="message"
          error={errors.message}
          errorMessage="Message is mandatory"
          register={register}
          registerObject={{ required: true }}
        />

        <InputSubmit
          w="60%"
          back="rgb(85, 187, 151)"
          type="submit"
          value="submit"
        />
      </Div>
    </form>
  );
};

export default JoinForm;
