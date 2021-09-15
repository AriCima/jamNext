import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import isAfter from 'date-fns/isAfter';

import { isBefore } from 'date-fns';
import {
  Div, Txt, Title, SubTitle, Form, InputSubmit, FormRow,
} from '../../styledComps';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import dictionary from '../../locale';

import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';
import { setActiveSection, setRoomsInfo } from '../../redux/actions';
import { TENANTS } from '../../config';

const InviteJammerForm = ({ roomNr }) => {
  const dispatch = useDispatch();
  const { lenguage } = useSelector((state) => state.userReducer);
  const dict = dictionary[lenguage];
  const { jamId, roomsInfo, jamDetails } = useSelector((state) => state.jamReducer);

  const [newRoomNr, setNewRoomNr] = useState('');
  const [roomInfo, setRoomInfo] = useState({});
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date(new Date().setMonth(new Date().getMonth() + 1)));
  const [nrOfTenants, setNrOfTenants] = useState(1);
  const [nrOfTheRoom, setNrOfTheRoom] = useState('');
  const [moreTenants, setMoreTenants] = useState([]);
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

  // const getRoomInfo = () => {
  //   const rInfo = roomsInfo[roomNr - 1];
  //   setRoomInfo(rInfo);
  // };

  useEffect(() => {
    console.log('use 1');
    if (jamId) {
      getRooms();
    }
    dispatch(setActiveSection('tenants'));
  }, []);

  const changeRoomNr = (val) => {
    const nr = parseInt(val, 10);
    const newInfo = roomsInfo[nr - 1];
    console.log('newInfo: ', newInfo);
    setNewRoomNr(nr - 1);
    setRoomInfo(newInfo);
  };
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

  const onSubmit = (data) => {
    console.log('data: ', data);
    const cIn = new Date(checkIn);
    console.log('cIn: ', cIn);
    const cOut = new Date(checkOut);
    console.log('cOut: ', cOut);

    const outLater = isAfter(cOut, cIn);
    if (outLater) {
      // setErrorMessage('Check-out date must be greater than check-In date');
      console.log('Check-out date must be greater than check-In date');
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

    // for (let i = 0; i < tenantsInfo.length; i++) {
    //   DataService.saveInvitation(jamId, data)
    //     .then((res) => {
    //       const invId = res.id;
    //       // eslint-disable-next-line max-len
    //       // CHAPUZA AQUI HAY QUE AUTOMATIZAR FUNCION DE INVITACION Y PASAR EL USER UN EMAIL CON EL LINK
    //       const registrationURL = `/register/${jamId}/${invId}`;
    //       console.log('registrationURL: ', registrationURL);
    //       // eslint-disable-next-line max-len
    //       // history.push(`/register/${jamId}/${jamName}/${adminFirstName}/${firstName}/${lastName}/${invId}`);
    //     });
    // }
  };

  const roomsNrs = [{ id: '', name: '' }];
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
  const recalculateRent = (val) => {
    const totalRent = Number(rent) + Number(expenses);
    const firstMonth = Calculations.getFirstMonth(val, totalRent, checkIn);
    const lastMonth = Calculations.getLastMonth(val, totalRent, checkOut);
    console.log('firstMonth: ', firstMonth);
    console.log('lastMonth: ', lastMonth);
  };

  const renderMultipleTenants = (nr) => {
    console.log('nr: ', nr, ' / ', typeof nr);
    const arr = [];
    for (let i = 1; i < nr; i++) {
      const obj = {
        tNr: i+1, nameName: 'firstName'+(i+1), nameLabel: 'First name tenant' +(i+1), emailName: 'email' + (i + 1), emailLabel: 'Email tenant' +(i+1),
      };
      arr.push(obj);
    }
    return (

      arr.map((tenant) => (
        <>
          <SubTitle>
            {dict.common.tenant}
            :
            {''}
            {tenant.tNr}
          </SubTitle>
          <FormRow>
            <FormInput
              w="70%"
              label={dict.common.firstName}
              type="text"
              mgR="20px"
              pad="8px"
              name={tenant.nameName}
              error={errors.nameName}
              errorMessage="Mandatory"
              register={register}
              registerObject={{ required: true }}
            />
            <FormInput
              w="70%"
              label={dict.common.email}
              type="text"
              pad="8px"
              name={tenant.emailName}
              error={errors.emailName}
              errorMessage="Ma  ndatory"
              register={register({
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
              registerObject={{ required: true }}
            />
          </FormRow>
        </>
      ))
    );
  };

  useEffect(() => {
    const multipleTenants = renderMultipleTenants(nrOfTenants);
    setMoreTenants(multipleTenants);
  }, [nrOfTenants]);

  return (
    <Form
      autoComplete="off"
      className="hook-form"
      onSubmit={handleSubmit(onSubmit)}
      // style={inviteStyle}
      mg="15px"
      col
    >
      <Div w="100%" col just="center" align="flex-start" mgB="20px">
        <Title>
          {dict.common.inviteTenantForm}
          {' '}
        </Title>
        {/* nrOfTenants */}
        <FormRow>
          <FormSelect // nrOfTenants
            w="100%"
            pad="8px"
            type="text"
            label={dict.common.nrOfTenants}
            labelW="150%"
            name="nrOfTenants"
            error={errors.nrOfTenants}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
            modifiedValue={(val) => { 
              setNrOfTenants(Number(val));
              // renderMultipleTenants(Number(val));
            }}
            options={[
              { id: 1, name: 1 },
              { id: 2, name: 2 },
              { id: 3, name: 3 },
              { id: 4, name: 4 },
              { id: 5, name: 5 },
            ]}
          />
        </FormRow>
        <SubTitle>{dict.common.tenantInfo}</SubTitle>
        <FormRow>
          <FormInput // firstName
            w="70%"
            label={dict.common.firstName}
            type="text"
            name="firstName"
            mgR="20px"
            pad="8px"
            error={errors.firstName}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
          />
          <FormInput // email
            w="70%"
            label={dict.common.email}
            type="text"
            name="email"
            pad="8px"
            error={errors.email}
            errorMessage="Mandatory"
            register={register({
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
            registerObject={{ required: true }}
          />
        </FormRow>

        {nrOfTenants > 1 && moreTenants}

        {/* checkIn, checkOut */}
        <SubTitle>{dict.common.inAndOutSubtitle}</SubTitle>
        <FormRow just="space-between">
          <Div className="checkIn" align="center" mgT="20px" mgR="20px">
            <Div mgR="10px">
            <Txt fSize="16px" color="#808080">Check-In</Txt>
              {errors.checkIn && <Div className="field-error">Required</Div>}
            </Div>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              dateFormat="dd-MMM-yyyy"

            />
          </Div>
          <Div className="checkOut" align="center" mgT="20px">
            <Div mgR="10px">
              <Txt fSize="16px" color="#808080">Check-Out</Txt>
              {errors.checkOut && <Div className="field-error">Required</Div>}
            </Div>
            <DatePicker
              selected={checkOut}
              onChange={(value) => setCheckOut(value)}
              dateFormat="dd-MMM-yyyy"
            />
          </Div>
        </FormRow>

        <SubTitle>{dict.common.contractInfo}</SubTitle>
        <FormRow just="space-between">
          <FormSelect
            w="25%"
            mgR="20px"
            pad="8px"
            col
            label={dict.common.roomNr}
            labelW="100%"
            name="newRoomNr"
            type="text"
            error={errors.newRoomNr}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
            modifiedValue={(val) => changeRoomNr(val)}
            options={roomsNrs}
          />

          <FormSelect // contractMode
            w="70%"
            col
            label={dict.settingsForm.contMode}
            labelAlign="flex-start"
            labelW="100%"
            name="contractMode"
            type="text"
            pad="8px"
            placeholder={defaultValues.contMod}
            error={errors.contractMode}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
            options={contracts}
            modifiedValue={(val) => recalculateRent(val)}
          />
        </FormRow>
        <FormRow just="space-between">
          <FormInput
            w="30%"
            label={dict.common.rent}
            placeholder={defaultValues.rent}
            type="numer"
            name="rent"
            mgR="20px"
            pad="8px"
            error={errors.rent}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
          />
          <FormInput
            w="30%"
            label={dict.common.expenses}
            placeholder={defaultValues.expenses}
            type="number"
            name="expenses"
            mgR="20px"
            pad="8px"
            error={errors.expenses}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
          />
          <FormInput
            w="30%"
            label={dict.common.deposit}
            placeholder={defaultValues.deposit}
            type="number"
            name="deposit"
            pad="8px"
            error={errors.deposit}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
          />
        </FormRow>

      </Div>
      <InputSubmit
        w="100%"
        back="rgb(85, 187, 151)"
        type="submit"
        value={dict.common.sendInv}
      />

    </Form>
  );
};

export default InviteJammerForm;
