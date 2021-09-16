import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { TENANTS } from '../../config';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import Calculations from '../../services/Calculations';

import {
  Div, Button, FormRow, Txt,
} from '../../styledComps';
import dictionary from '../../locale';

const SingleTenantInfo = ({ tenants, edit }) => {
  const { lenguage } = useSelector((state) => state.userReducer);
  const dict = dictionary[lenguage];

  const {
    address,
    checkIn,
    checkOut,
    city,
    country,
    deposit,
    docNr,
    docType,
    email,
    expenses,
    firstName,
    // id,
    lastName,
    mobile,
    rent,
    roomNr,
    zipCode,
  } = TENANTS[0];

  const {
    register, errors, control,
  } = useForm();

  const enableEditForm = (e) => {
    e.preventDefault();
    edit(true);
  };

  const countries = Calculations.getSelectOptions('countries');

  return (
    <>
      <Div className="title-div" col w="100%" h="40px" just="space-between" align="flex-start" mgT="30px">
        <Div className="tenantInfo-buttonArea">
          <Button
            w="100px"
            h="40px"
            pad="0 15px"
            border="lightgray"
            color="white"
            className="edit-button"
            w="auto"
            onClick={(e) => { enableEditForm(e); }}
          >
            {dict.common.editRoom}
          </Button>

        </Div>
      </Div>
      <Div col className="tenantInfo-section">
        <FormRow>
          <FormSelect // landlordTitle
            w="20%"
            mgR="20px"
            col
            label={dict.common.title}
            name="title"
            type="text"
            error={errors.landlordTitle}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
            // reportValue={(val) => setTitle(val)}
            options={[{ id: 'mr', name: 'Mr' }, { id: 'mrs', name: 'Mrs' }]}
            // modifiedValue={() => setShowButtons(true)}
            disabled
          />

          <FormInput
            w="70%"
            label={dict.common.firstName}
            placeholder={firstName}
            type="text"
            name="sqm"
            mgR="20px"
            error={errors.firstName}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
            disabled
          />
          <FormInput
            w="70%"
            label={dict.common.lastName}
            placeholder={lastName}
            type="text"
            name="lastName"
            mgR="20px"
            error={errors.lastName}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
            disabled
          />
        </FormRow>
        <FormRow>
          <FormSelect // DocType
            w="30%"
            mgR="20px"
            col
            label={dict.common.docType}
            placeholder={docType}
            name="landlordDocType"
            type="text"
            error={errors.docType}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
            options={[
              { id: 'dni', name: 'DNI' },
              { id: 'nie', name: 'NIE' },
              { id: 'pass', name: 'Passport' },
            ]}
            // modifiedValue={() => setShowButtons(true)}
          />

          <FormInput
            w="30%"
            label={dict.common.docNr}
            placeholder={docNr}
            type="text"
            name="docNr"
            mgR="20px"
            error={errors.docNr}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
            disabled
          />

        </FormRow>
        <FormRow>
          <FormInput
            w="70%"
            label={dict.common.email}
            placeholder={email}
            type="text"
            name="email"
            mgR="20px"
            error={errors.email}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
            disabled
          />
          <FormInput
            w="40%"
            label={dict.common.mobile}
            placeholder={mobile}
            type="text"
            name="mobile"
            mgR="20px"
            error={errors.mobile}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
            disabled
          />
        </FormRow>
        <FormRow>
          <FormInput // Apartment location
            w="100%"
            label={dict.common.address}
            placeholder={address}
            type="text"
            name="address"
            error={errors.address}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
            // modifiedValue={() => setShowButtons(true)}
          />
        </FormRow>
        <FormRow>
          <FormInput // city
            w="30%"
            label={dict.common.city}
            placeholder={city}
            type="text"
            name="city"
            mgR="20px"
            error={errors.city}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
            // modifiedValue={() => setShowButtons(true)}
            disabled
          />
          <FormInput // zipCode
            w="30%"
            label={dict.common.zip}
            placeholder={zipCode}
            type="text"
            name="zipCode"
            mgR="20px"
            error={errors.zipCode}
            errorMessage="zipCode is mandatory"
            register={register}
            registerObject={{ required: true }}
            // modifiedValue={() => setShowButtons(true)}
            disabled
          />
          <FormSelect // country
            w="40%"
            col
            label={dict.common.country}
            placeholder={country}
            name="country"
            type="text"
            error={errors.country}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
            options={countries}
            disabled
            // reportValue={(val) => setSelectedCountry(val)}
            // modifiedValue={() => setShowButtons(true)}
          />
        </FormRow>
        <FormRow>
          <FormInput
            w="20%"
            label={dict.common.roomNr}
            placeholder={roomNr}
            type="text"
            name="roomNr"
            mgR="20px"
            error={errors.roomNr}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
            disabled
          />
          <FormInput
            w="70%"
            label="Check-In"
            placeholder={checkIn}
            type="text"
            name="checkIn"
            mgR="20px"
            error={errors.checkIn}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
            disabled
          />
          <FormInput
            w="70%"
            label="Check-Out"
            placeholder={checkOut}
            type="text"
            name="checkOut"
            mgR="20px"
            error={errors.checkOut}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
            disabled
          />
        </FormRow>
        <FormRow>
          <FormInput
            w="70%"
            label={dict.rent.rent}
            placeholder={rent}
            type="text"
            name="rent"
            mgR="20px"
            error={errors.rent}
            errorMessage="Rent is mandatory"
            register={register}
            registerObject={{ required: true }}
            disabled
          />

          <FormInput
            w="70%"
            label={dict.common.expenses}
            placeholder={expenses}
            type="text"
            name="expenses"
            mgR="20px"
            error={errors.expenses}
            errorMessage="Expenses is mandatory"
            register={register}
            registerObject={{ required: false }}
            disabled
          />

          <FormInput
            w="70%"
            label={dict.deposit.deposit}
            placeholder={deposit}
            type="text"
            name="deposit"
            mgR="20px"
            error={errors.deposit}
            errorMessage="Deposit is mandatory"
            register={register}
            registerObject={{ required: true }}
            disabled
          />
        </FormRow>

      </Div>
    </>

  );
};

export default SingleTenantInfo;
