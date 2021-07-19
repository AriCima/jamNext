import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactSelect from 'react-select';
import isAfter from 'date-fns/isAfter';

import { isBefore } from 'date-fns';
import { Div, SubTitle, InputSubmit } from '../../styledComps';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';

import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';

const useInviteJammerForm = ({
  jamId, jamName, adminName, jammers, rooms, jamDetails, roomNr = '',
}) => {
  // const [ organizedJammers, setOrganizedJammers ] = useState([]);
  // const [ showModal, setShowModal ] = useState(false);
  const [deposit, setDeposit] = useState('');
  const [rent, setRent] = useState('');
  const [checkIn, setCheckIn] = useState(new Date());
  // eslint-disable-next-line max-len
  const [checkOut, setCheckOut] = useState(new Date(new Date().setMonth(new Date().getMonth() + 1)));
  const [errorDesc, setErrorDesc] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [invitationInfo, setInvitationInfo] = useState({});
  const [nrOfTenants, setNrOfTenants] = useState(1);
  const [nrOfTheRoom, setNrOfTheRoom] = useState('');
  const [room, setRoomInfo] = useState({});
  const [second, setShowSecond] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [third, setShowThird] = useState(false);

  const [defaultValues, setDefaultValues] = useState({
    checkIn,
    checkOut,
    deposit: '',
    nrOfTenants: 1,
    rent: '',
    contractMode: jamDetails.contractMode,
    roomNr,
  });

  const {
    register, errors, handleSubmit, control, setValue,
  } = useForm({ defaultValues });

  useEffect(() => {
    const rL = rooms.length;
    const newOptions = [];

    for (let j = 0; j < rL; j++) {
      const val = j + 1;
      const sVal = val.toString();
      const obj = { value: sVal, label: sVal };
      newOptions.push(obj);
    }

    setOptions(newOptions);
  }, []);

  useEffect(() => {
    if (nrOfTenants === '1') {
      setShowSecond(false);
      setShowThird(false);
    }
    if (nrOfTenants === '2') {
      setShowSecond(true);
    }
    if (nrOfTenants === '3') {
      setShowSecond(true);
      setShowThird(true);
    }
  }, [nrOfTenants]);

  useEffect(() => {
    const nrOfRooms = rooms.length;
    const nr = parseInt(nrOfTheRoom);
    const validNr = nr > 0 && nr < nrOfRooms;
    if (nrOfTheRoom !== '' && validNr) {
      const room = rooms.filter((e) => e.roomNr === nrOfTheRoom);
      setRoomInfo(room);
      setRent(room[0].rent);
      setDeposit(room[0].deposit);
      setValue('rent', room[0].rent);
      setValue('deposit', room[0].deposit);
    }
  }, [nrOfTheRoom]);

  const onSubmit = (data) => {
    setShowErrorMessage(false);
    const cIn = new Date(checkIn);
    const cOut = new Date(checkOut);

    const outLater = isAfter(cOut, cIn);
    if (outLater) {
      setErrorMessage('Check-out date must be greater than check-In date');
      return;
    }
    const roomJammers = jammers.filter((e) => e.roomNr === data.roomNr);

    for (let i = 0; i < roomJammers.length; i++) {
      const inIsBetween = isAfter(cIn, roomJammers[i].checkIn) && isBefore(cIn, roomJammers[i].checkOut);
      const outIsBetween = isAfter(cOut, roomJammers[i].checkIn) && isBefore(cOut, roomJammers[i].checkOut);
      const isOverlapping = inIsBetween || outIsBetween;
      if (isOverlapping) {
        const {
          firstName, lastName, roomNr, checkIn, checkOut,
        } = roomJammers[i];
        setErrorMessage('There is dates overlapping with');
        setErrorDesc(`Tenant: ${firstName} ${lastName}, roomNr: ${roomNr}, check-In: ${checkIn}, check-out: ${checkOut}`);
        setShowErrorMessage(true);
        return;
      }
    }

    const rentsArray = Calculations.getTenantPayments(data.rent, data.contractMode, cIn, cOut);

    data.rentsArray = rentsArray;
    data.registeredUser = false;
    data.jamName = jamName;
    data.adminName = adminName;
    data.contractCode = Calculations.generateCode();
    data.checkIn = moment(cIn).format('DD-MMM-YYYY');
    data.checkOut = moment(cOut).format('DD-MMM-YYYY');
    console.log('data: ', data);

    setInvitationInfo(data);

    let contractType = 'single';
    const nrOfTenants = parseInt(data.nrOfTenants);

    if (nrOfTenants > 1) contractType = 'multiple';
    data.contractType = contractType;

    const tenantsInfo = [{
      firstName: data.firstName,
      lastName: data.lastName,
      emial: data.email,
    }];

    if (nrOfTenants === 2) {
      tenantsInfo.push({
        firstName: data.firstName2,
        lastName: data.lastName2,
        emial: data.email2,
      });
    }

    if (nrOfTenants === 3) {
      tenantsInfo.push({
        firstName: data.firstName2,
        lastName: data.lastName2,
        emial: data.email2,
      });
      tenantsInfo.push({
        firstName: data.firstName3,
        lastName: data.lastName3,
        email: data.email3,
      });
    }

    for (let i = 0; i < tenantsInfo.length; i++) {
      DataService.saveInvitation(jamId, data)
        .then((res) => {
          const invId = res.id;
          // eslint-disable-next-line max-len
          // CHAPUZA AQUI HAY QUE AUTOMATIZAR FUNCION DE INVITACION Y PASAR EL USER UN EMAIL CON EL LINK
          const registrationURL = `/register/${jamId}/${invId}`;
          console.log('registrationURL: ', registrationURL);
          // eslint-disable-next-line max-len
          // history.push(`/register/${jamId}/${jamName}/${adminName}/${firstName}/${lastName}/${invId}`);
        });
    }
  };

  const typeOfContracts = Calculations.getTypeOfContracts();

  return (
    <form
      autoComplete="off"
      className="hook-form"
      onSubmit={handleSubmit(onSubmit)}
    >

      <Div w="100%" col just="center" align="flex-start">
        <SubTitle>Jam info</SubTitle>
        <Div w="100%" col just="center" align="flex-start">
          <FormInput
            w="70%"
            label="Nr of tenants to include in the contact"
            type="text"
            name="nrOfTenants"
            mgR="20px"
            error={errors.nrOfTenants}
            errorMessage="This is mandatory"
            register={register}
            registerObject={{ required: true }}
            onChange={(e) => setNrOfTenants(e.target.value)}
          />
          <FormSelect
            w="50%"
            label="Room Nr"
            name="roomNr"
            type="text"
            error={errors.roomNr}
            errorMessage="Room Nr is mandatory"
            register={register}
            registerObject={{ required: true }}
                    // reportValue={(val) => setContractMode(val)}
            options={typeOfContracts}
          />
          <FormSelect
            w="50%"
            label="Contract Mode"
            name="contractMode"
            type="text"
            error={errors.contractMode}
            errorMessage="Please select the type of contract"
            register={register}
            registerObject={{ required: true }}
                    // reportValue={(val) => setContractMode(val)}
            options={typeOfContracts}
          />
          <div className="custom-input-block midWidth">
            <div className="block-label ">
              <label>Check In</label>
              {errors.checkIn && <div className="field-error">Required</div>}
            </div>
            <Controller
              control={control}
              dateFormat="dd-MMM-yyyy"
              name="checkIn"
              className="input"
              render={() => (
                <ReactDatePicker
                  selected={checkIn}
                  onChange={(value) => setCheckIn(value)}
                />
              )}
            />
          </div>
          <div className="custom-input-block midWidth">
            <div className="block-label ">
              <label>Check Out</label>
              {errors.checkOut && <div className="field-error">Required</div>}
            </div>
            <Controller
              control={control}
              dateFormat="dd-MMM-yyyy"
              name="checkOut"
              className="input"
              render={() => (
                <ReactDatePicker
                  selected={checkOut}
                  onChange={(value) => setCheckOut(value)}
                />
              )}
            />
          </div>
          <FormInput
            w="70%"
            label="Rent €/Mo"
            type="text"
            name="rent"
            mgR="20px"
            error={errors.rent}
            errorMessage="Rent value is mandatory"
            register={register}
            registerObject={{ required: true }}
          />
          <FormInput
            w="70%"
            label="Deposit €"
            type="text"
            name="deposit"
            mgR="20px"
            error={errors.deposit}
            errorMessage="Deposit value mandatory"
            register={register}
            registerObject={{ required: true }}
          />
        </Div>
        <SubTitle>Personal info</SubTitle>
        <Div w="100%" just="center" align="flex-start">
          <FormInput
            w="70%"
            label="First Name"
            type="text"
            name="firstName"
            mgR="20px"
            error={errors.firstName}
            errorMessage="This is mandatory"
            register={register}
            registerObject={{ required: true }}
          />
          <FormInput
            w="70%"
            label="Last Name"
            type="text"
            name="lastName"
            mgR="20px"
            error={errors.lastName}
            errorMessage="This is mandatory"
            register={register}
            registerObject={{ required: true }}
          />
          <FormInput
            w="70%"
            label="Email"
            type="text"
            name="email"
            mgR="20px"
            error={errors.email}
            errorMessage="This is mandatory"
            register={register({
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
            registerObject={{ required: true }}
          />
        </Div>
        { second && (
        <Div w="100%" just="center" align="flex-start">
          <SubTitle>Personal info 2nd tenant</SubTitle>
          <FormInput
            w="70%"
            label="First Name"
            type="text"
            name="firstName2"
            mgR="20px"
            error={errors.firstName2}
            errorMessage="This is mandatory"
            register={register}
            registerObject={{ required: true }}
          />
          <FormInput
            w="70%"
            label="Last Name"
            type="text"
            name="lastName2"
            mgR="20px"
            error={errors.lastName2}
            errorMessage="This is mandatory"
            register={register}
            registerObject={{ required: true }}
          />
          <FormInput
            w="70%"
            label="Email"
            type="text"
            name="email2"
            mgR="20px"
            error={errors.email2}
            errorMessage="This is mandatory"
            register={register({
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
            registerObject={{ required: true }}
          />
        </Div>
        )}
        {third && (
        <Div w="100%" just="center" align="flex-start">
          <SubTitle>Personal info 3rd tenant</SubTitle>
          <FormInput
            w="70%"
            label="First Name"
            type="text"
            name="firstName3"
            mgR="20px"
            error={errors.firstName3}
            errorMessage="This is mandatory"
            register={register}
            registerObject={{ required: true }}
          />
          <FormInput
            w="70%"
            label="Last Name"
            type="text"
            name="lastName3"
            mgR="20px"
            error={errors.lastName3}
            errorMessage="This is mandatory"
            register={register}
            registerObject={{ required: true }}
          />
          <FormInput
            w="70%"
            label="Email"
            type="text"
            name="email3"
            mgR="20px"
            error={errors.email3}
            errorMessage="This is mandatory"
            register={register({
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
            registerObject={{ required: true }}
          />
        </Div>
        )}
      </Div>
      <InputSubmit
        w="100%"
        back="rgb(85, 187, 151)"
        type="submit"
        value="submit"
      />

    </form>
  );
};

export default useInviteJammerForm;
