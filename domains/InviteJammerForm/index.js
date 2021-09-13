import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import isAfter from 'date-fns/isAfter';

import { isBefore } from 'date-fns';
import {
  Div, Txt, SubTitle, InputSubmit, FormRow,
} from '../../styledComps';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import dictionary from '../../locale';

import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';
import { setActiveSection, setRoomsInfo } from '../../redux/actions';
import { TENANTS } from '../../config';

const InviteJammerForm = ({ roomNr }) => {
  console.log('roomNr: ', roomNr, ' / ', typeof roomNr);
  const dispatch = useDispatch();
  const { lenguage } = useSelector((state) => state.userReducer);
  const dict = dictionary[lenguage];
  const { jamId, roomsInfo, jamDetails } = useSelector((state) => state.jamReducer);

  const [newRoomNr, setNewRoomNr] = useState(roomNr);
  const [roomInfo, setRoomInfo] = useState({});
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date(new Date().setMonth(new Date().getMonth() + 1)));
  const [nrOfTenants, setNrOfTenants] = useState(1);
  const [nrOfTheRoom, setNrOfTheRoom] = useState('');
  const [second, setShowSecond] = useState(false);
  const [third, setShowThird] = useState(false);

  const getRooms = async () => {
    if (roomsInfo.length === 0) {
      const rooms = await DataService.getJamRooms(jamId);
      const nrOfRooms = rooms.length.toString();

      const tenantsByRooms = Calculations.getTenantsByRooms(TENANTS, nrOfRooms);
      const organizedTenantsByRoom = Calculations.getOrganizedTenants(tenantsByRooms, nrOfRooms);

      const sortedRooms = Calculations.sortByField({ elements: rooms, asc: true, field: 'roomNr' });

      if (rooms.length > 0) {
        for (let i = 0; i < rooms.length; i++) {
          const oT = organizedTenantsByRoom[i];
          sortedRooms[i].currentTenant = oT.currentTenant;
          sortedRooms[i].formerTenants = oT.formerTenants;
          sortedRooms[i].futureTenants = oT.futureTenants;
        }
      }

      // Info en Redux
      dispatch(setRoomsInfo(sortedRooms));
    }
  };

  const getRoomInfo = () => {
    const rInfo = roomsInfo[parseInt(newRoomNr, 10)];
    setNewRoomInfo(rInfo);
  };

  useEffect(() => {
    jamId && getRooms(jamId);
    dispatch(setActiveSection('tenants'));
  }, []);

  useEffect(() => {
    roomNr && getRoomInfo();
  }, [roomNr]);

  const {
    register, errors, handleSubmit, control, setValue,
  } = useForm();

  const {
    rent = '', deposit = '', sqm = '', expenses = '', exterior = '', privBath = '',
  } = roomInfo;
  const { contractMode = '' } = jamDetails.contractInfo;

  const defaultValues = {
    rent, deposit, sqm, expenses, exterior, privBath, contractMode,
  };
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

  const changeRoomNr = (val) => {
    setNewRoomNr(val);
  };
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
    data.adminFirstName = adminFirstName;
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
          // history.push(`/register/${jamId}/${jamName}/${adminFirstName}/${firstName}/${lastName}/${invId}`);
        });
    }
  };

  const roomsNrs = [];
  for (let i = 0; i < roomsInfo.length; i++) {
    const number = i + 1;
    const stringRoom = number.toString();
    const opt = { id: stringRoom, name: stringRoom };
    roomsNrs.push(opt);
  }
  const contracts = Calculations.getSelectOptions('contracts');

  const inviteStyle = {
    margin: '15px',
    overflowY: 'scroll',
  };

  return (
    <form
      autoComplete="off"
      className="hook-form"
      onSubmit={handleSubmit(onSubmit)}
      style={inviteStyle}
    >

      <Div w="100%" col just="center" align="flex-start">
        <SubTitle>Jam info</SubTitle>
        <Div w="100%" col just="center" align="flex-start">
          <FormRow just="space-between">
            <FormSelect
              w="25%"
              mgR="20px"
              col
              label={dict.common.roomNr}
              labelW="100%"
              name="contractMode"
              name="roomNr"
              type="text"
              error={errors.roomNr}
              errorMessage="Mandatory"
              register={register}
              registerObject={{ required: true }}
              onChange={(e) => changeRoomNr(e.target.value)}
              options={roomsNrs}
            />

            <FormSelect
              w="25%"
              col
              mgR="20px"
              type="text"
              label={dict.common.nrOfTenants}
              labelW="100%"
              name="contractMode"
              name="nrOfTenants"
              error={errors.nrOfTenants}
              errorMessage="This is mandatory"
              register={register}
              registerObject={{ required: true }}
              onChange={(e) => setNrOfTenants(e.target.value)}
              options={[
                { id: '1', name: '1' },
                { id: '2', name: '2' },
                { id: '3', name: '3' },
                { id: '4', name: '4' },
                { id: '5', name: '5' },
              ]}
            />
            <FormSelect // contractMode
              w="40%"
              col
              label={dict.settingsForm.contMode}
              labelAlign="flex-start"
              labelW="100%"
              name="contractMode"
              type="text"
              error={errors.contractMode}
              errorMessage="Mandatory"
              register={register}
              registerObject={{ required: true }}
              options={contracts}
            />
            {/* { contractMode !== '' && (
              <Div pad="20px" back="#CCC5B9" borderR="15px" w="100%" mgT="20px" align="center" just="flex-start">
                <Txt fSize="14px">{dict.contractType[contractMode]}</Txt>
              </Div>
              )} */}
          </FormRow>
          <FormRow just="space-between">
            <Div className="checkIn" mgR="20px">
              <Div mgR="10px">
                <label>Check In</label>
                {errors.checkIn && <Div className="field-error">Required</Div>}
              </Div>
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
            </Div>
            <Div className="checkOut">
              <Div mgR="10px">
                <label>Check Out</label>
                {errors.checkOut && <Div className="field-error">Required</Div>}
              </Div>
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
            </Div>
          </FormRow>
          <FormRow>
            <FormInput
              w="33%"
              label={dict.common.rent}
              placeholder={defaultValues.rent}
              type="text"
              name="rent"
              mgR="20px"
              error={errors.rent}
              errorMessage="Mandatory"
              register={register}
              registerObject={{ required: true }}
            />
            <FormInput
              w="33%"
              label={dict.common.expenses}
              placeholder={defaultValues.expenses}
              type="text"
              name="expenses"
              mgR="20px"
              error={errors.expenses}
              errorMessage="Mandatory"
              register={register}
              registerObject={{ required: true }}
            />
            <FormInput
              w="33%"
              label={dict.common.deposit}
              placeholder={defaultValues.deposit}
              type="text"
              name="deposit"
              mgR="20px"
              error={errors.deposit}
              errorMessage="Mandatory"
              register={register}
              registerObject={{ required: true }}
            />
          </FormRow>
        </Div>
        <SubTitle>Personal info</SubTitle>
        <Div w="100%" just="center" align="flex-start">
          <FormInput
            w="70%"
            label={dict.common.firstName}
            type="text"
            name="firstName"
            mgR="20px"
            error={errors.firstName}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
          />
          <FormInput
            w="70%"
            label={dict.common.lastName}
            type="text"
            name="lastName"
            mgR="20px"
            error={errors.lastName}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
          />
          <FormInput
            w="70%"
            label={dict.common.email}
            type="text"
            name="email"
            mgR="20px"
            error={errors.email}
            errorMessage="Mandatory"
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
            label={dict.common.firstName}
            type="text"
            name="firstName2"
            mgR="20px"
            error={errors.firstName2}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
          />
          <FormInput
            w="70%"
            label={dict.common.lastName}
            type="text"
            name="lastName2"
            mgR="20px"
            error={errors.lastName2}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
          />
          <FormInput
            w="70%"
            label={dict.common.email}
            type="text"
            name="email2"
            mgR="20px"
            error={errors.email2}
            errorMessage="Mndatory"
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
            label={dict.common.firstName}
            type="text"
            name="firstName3"
            mgR="20px"
            error={errors.firstName3}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
          />
          <FormInput
            w="70%"
            label={dict.common.lastName}
            type="text"
            name="lastName3"
            mgR="20px"
            error={errors.lastName3}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
          />
          <FormInput
            w="70%"
            label={dict.common.email}
            type="text"
            name="email3"
            mgR="20px"
            error={errors.email3}
            errorMessage="Mandatory"
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

export default InviteJammerForm;
