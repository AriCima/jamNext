import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';

import { Div, SubTitle, InputSubmit } from '../../styledComps';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';

const formStyle = {
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
};

const CreateForm = ({ showModal }) => {
  const [typeOfJam, setJamType] = useState('');
  const [roomsNr, setRoomsNr] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState('');

  const { userId, firstName, lastName } = useSelector((state) => state.userReducer);

  const { register, errors, handleSubmit } = useForm();
  const router = useRouter();

  const createNewJam = (data) => {
    const {
      jamName, jamDesc, jamType, nrOfRooms, apartmentAddress, apartmentZipCode, apartmentCountry, apartmentCity
    } = data;

    const jamCode = Calculations.generateJamCode();
    const createdAt = new Date();
    const updatedAt = '';
    let jamRules = {};
    let contractInfo = {};
    let jamSpecs = {};

    if (jamType === 'rooms-rental') {
      jamRules = Calculations.getJamRules(jamType);
      const landlordInfo = Calculations.getLandlordInfo();
      contractInfo = {
        landlordInfo,
        apartmentInfo: {
          nrOfRooms, apartmentAddress, apartmentZipCode, apartmentCountry, apartmentCity,
        },
      };
      jamSpecs = { jamRules, contractInfo };
    }

    const newJamInfo = {
      adminId: userId,
      adminLastName: lastName,
      adminFirstName: firstName,
      createdAt,
      jamCode,
      jamDesc,
      jamSpecs,
      jamName,
      jamType,
      lastActivity: createdAt,
      privacy: 'private',
      updatedAt,
    };

    const adminId = userId;

    DataService.createJam(newJamInfo, adminId)
      .then((res) => {
        const jamId = res.id;
        showModal(false);
        router.push(`/jam/${jamId}/overview`);

        // const jamSummary = { adminId: userId, adminFirstName: firstName, createdAt };
        // DataService.addJamToUser(userId, jamId, jamSummary);
      });
  };

  const nrOfRooms = Calculations.getSelectOptions('nrOfRooms');
  const typeOfJams = Calculations.getSelectOptions('jamTypes');
  const countries = Calculations.getSelectOptions('countries');

  const valueChanged = () => {
    console.log('value changed');
  };

  return (
    <form style={formStyle} autoComplete="off" onSubmit={handleSubmit(createNewJam)}>
      <Div w="100%" col just="center" align="flex-start">
        <SubTitle>Jam Info</SubTitle>
        <FormInput
          w="70%"
          label="Jam Name"
          type="text"
          name="jamName"
          mgR="20px"
          error={errors.jamName}
          errorMessage="Jam Name is mandatory"
          register={register}
          registerObject={{ required: true }}
          modifiedValue={() => { valueChanged(); }}
        />

        <FormInput
          w="100%"
          label="Desription"
          type="text"
          name="jamDesc"
          error={errors.jamDesc}
          errorMessage="A brief description is mandatory"
          register={register}
          registerObject={{ required: true }}
          modifiedValue={() => { valueChanged(true); }}
        />

        <FormSelect
          w="50%"
          label="Jam type"
          name="jamType"
          type="text"
          error={errors.jamType}
          errorMessage="Please select a jam type"
          register={register}
          registerObject={{ required: true }}
          onChange={(e) => setJamType(e.target.value)}
          reportValue={(val) => setJamType(val)}
          options={typeOfJams}
          modifiedValue={() => { valueChanged(true); }}
        />

        {typeOfJam === 'rooms-rental'
            && (
              <Div w="100%" col just="center" align="flex-start">
                <FormSelect
                  w="50%"
                  label="Nr. of Rooms"
                  name="nrOfRooms"
                  type="number"
                  error={errors.nrOfRooms}
                  errorMessage="Please select the nr of Rrooms"
                  register={register}
                  registerObject={{ required: true }}
                  options={nrOfRooms}
                  reportValue={(val) => setRoomsNr(val)}
                  modifiedValue={() => { valueChanged(true); }}
                />
                <SubTitle>Jam Address</SubTitle>
                <FormInput // jamAddress
                  w="70%"
                  label="Address (street, house Nr, floor, door . . . )"
                  type="text"
                  name="apartmentAddress"
                  mgR="20px"
                  error={errors.apartmentAddress}
                  errorMessage="Jam address is mandatory"
                  register={register}
                  registerObject={{ required: true }}
                  modifiedValue={() => { valueChanged(true); }}
                />
                {/* <FormInput
                  w="70%"
                  label="Floor"
                  type="text"
                  name="floor"
                  mgR="20px"
                  error={errors.floor}
                  errorMessage="Jam floor is mandatory"
                  register={register}
                  registerObject={{ required: true }}
                  modifiedValue={() => { valueChanged(true); }}
                />
                <FormInput
                  w="70%"
                  label="Door"
                  type="text"
                  name="door"
                  mgR="20px"
                  error={errors.door}
                  errorMessage="Jam door is mandatory"
                  register={register}
                  registerObject={{ required: true }}
                  modifiedValue={() => { valueChanged(true); }}
                /> */}
                <FormInput
                  w="30%"
                  label="City"
                  type="text"
                  name="apartmentCity"
                  mgR="20px"
                  error={errors.apartmentCity}
                  errorMessage="Jam city is mandatory"
                  register={register}
                  registerObject={{ required: true }}
                  modifiedValue={() => { valueChanged(true); }}
                />
                <FormInput
                  w="30%"
                  label="ZipCode"
                  type="text"
                  name="apartmentZipCode"
                  mgR="20px"
                  error={errors.apartmentZipCode}
                  errorMessage="Jam zipCode is mandatory"
                  register={register}
                  registerObject={{ required: true }}
                  modifiedValue={() => { valueChanged(true); }}
                />

                <FormSelect
                  w="40%"
                  label="Country"
                  name="apartmentCountry"
                  type="text"
                  error={errors.apartmentCountry}
                  errorMessage="Please select a country"
                  register={register}
                  registerObject={{ required: true }}
                  options={countries}
                  reportValue={(val) => setSelectedCountry(val)}
                  modifiedValue={() => { valueChanged(true); }}
                />
              </Div>
            )}

        <InputSubmit
          w="100%"
          back="rgb(85, 187, 151)"
          type="submit"
          value="submit"
        />
      </Div>
    </form>
  );
};

export default CreateForm;
