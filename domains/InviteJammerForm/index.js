/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import isAfter from 'date-fns/isAfter';

import { isBefore, format } from 'date-fns';
import {
  Div, Txt, Title, SubTitle, Form, InputSubmit, FormRow,
} from '../../styledComps';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import dictionary from '../../locale';

import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';
import { setActiveSection, setRoomsInfo } from '../../redux/actions';
import { TENANTS, COLORS } from '../../config';
import { isEmpty } from 'lodash';

const InviteJammerForm = ({ roomNr }) => {
  const dispatch = useDispatch();
  const { lenguage } = useSelector((state) => state.userReducer);
  const dict = dictionary[lenguage];
  const { jamId, jamName, adminFirstName, roomsInfo, jamDetails } = useSelector((state) => state.jamReducer);

  const [newRoomNr, setNewRoomNr] = useState('');
  const [jamRooms, setJamRooms] = useState([{ id: 0, name: 0 }]);
  //const [roomInfo, setRoomInfo] = useState({});
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date(new Date().setMonth(new Date().getMonth() + 3)));
  const [nrOfTenants, setNrOfTenants] = useState(1);
  const [moreTenants, setMoreTenants] = useState([]);
  const [rentsSummary, setRentsSummary] = useState({});
  const [newContractMode, setNewContractMode] = useState('');
  const [newDefaultValues, setNewDefaultValues] = useState({});
  const [newRent, setNewRent] = useState(0);
  const [newExpenses, setNewExpenses] = useState(0);
  const [newDeposit, setNewDeposit] = useState(0);
  const [totalRent, setTotalRent] = useState(0);

  const getRooms = async () => {
    if (roomsInfo.length === 0) {
      const rooms = await DataService.getJamRooms(jamId);
      console.log('rooms: ', rooms);
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

  useEffect(() => {
    if (jamId) {
      console.log('rooms Info 1')
      getRooms();
      getRoomsNr()
    }
    dispatch(setActiveSection('tenants'));
  }, [jamId]);

  const getRoomsNr = () => {
    const rNrs = [{id: 0, name: 0 }];
    for (let i = 1; i <= roomsInfo.length; i++) {
      const opt = { id: i, name: i };
      rNrs.push(opt);
    }
    setJamRooms(rNrs)
    
  }

  useEffect(()=> {
    console.log('rooms Info 2')
    getRoomsNr()
  }, [roomsInfo])


  // const {
  //   rent = '', deposit = '', sqm = '', expenses = '', exterior = '', privBath = '',
  // } = roomInfo;

  // const { contractMode = '' } = jamDetails.contractInfo;

  // const defaultValues = {
  //   rent, deposit, sqm, expenses, exterior, privBath, contractMode,
  // };

  const {
    register, errors, control, handleSubmit, setValue 
  } = useForm({defaultValues: newDefaultValues});

  const changeRoomNr = (val) => {
    const nr = parseInt(val, 10);
    const newInfo = roomsInfo[nr - 1];
    setNewRoomNr(nr - 1);
    setRoomInfo(newInfo);

    const {
      rent = '', deposit = '', sqm = '', expenses = '', exterior = '', privBath = '',
    } = newInfo;

    setNewDefaultValues({
      rent, deposit, expenses
    });
  };
  
  const onSubmit = (data) => {
    console.log(data);
    const cIn = new Date(checkIn);
    const cOut = new Date(checkOut);

    const outLater = !isAfter(cOut, cIn);

    if (outLater) {
      alert('Check-out date must be greater than check-In date');
      return;
    }

    const roomJammers = TENANTS.filter((e) => e.roomNr === data.roomNr);

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

    const rentsArray = Calculations.getTenantPayments(data.rent, data.expenses, data.contractMode, cIn, cOut);

    data.rentsArray = rentsArray;
    data.registeredUser = false;
    data.jamName = jamName;
    data.adminFirstName = adminFirstName;
    data.contractCode = Calculations.generateCode();
    data.checkIn = format(cIn, 'dd/MMM/yyyy');
    data.checkOut = format(cOut, 'dd/MMM/yyyy');
    console.log('data: ', data);

    // setInvitationInfo(data);

    let contractType = 'single';

    if (nrOfTenants > 1) contractType = 'multiple';
    data.contractType = contractType;

    const tenantsInfo = [{
      firstName: data.firstName,
      emial: data.email,
    }];

    for (let i = 0; i < nrOfTenants; i++) {
      const name = 'firstName'+(i+1);
      const email = 'email'+(i+1);
      const obj = { firstName: name, email };
      tenantsInfo.push(obj);
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

  const contracts = Calculations.getSelectOptions('contracts');

  const renderRentDetails = (obj) => {
    let l = 0;
    let fromMonth = '';
    let toMonth = '';
    const firstMonth = obj.inInfo.month;
    const lastMonth = obj.outInfo.month;
    const betw = obj.betweenMonths;

    if (betw.length > 0) {
      console.log('betw: ', betw);
      fromMonth = betw[0] && obj.betweenMonths[0].month;
      l = betw.length - 1;
      console.log('l: ', l);
      toMonth = betw[l].month;
    }

    const contractModeDic = {
      monthly: [{title: dict.rent.monthlyRent, value: rent + expenses}],
      daily: [{title: dict.months[firstMonth], value: obj.inInfo.rent}, obj.betweenLength > 0 && {title: `${dict.months[fromMonth]} ${dict.common.to} ${dict.months[toMonth]}`, value: rent + expenses },{title:dict.months[lastMonth], value: obj.outInfo.rent}],
      fortnightly: [{title: dict.months[firstMonth], value: obj.inInfo.rent}, obj.betweenLength > 0 && {title: `${dict.months[fromMonth]} ${dict.common.to} ${dict.months[toMonth]}`, value: rent + expenses },{title:dict.months[lastMonth], value: obj.outInfo.rent}]
    }
    console.log('betw: ', betw);
    
    return (<Div w="100%" col>
            <SubTitle>{dict.rent.rentsDetails}</SubTitle>
            <Div w="200%" mgT="10px" pad="10px 0" back="#D9EAF7" borderHov={COLORS.GREENS.BORDERS.BLUE} borderR="10px" border={COLORS.GREENS.BORDERS.BLUE} just="center">
            {contractModeDic[newContractMode] && contractModeDic[newContractMode].map(el => {
              return el && (
                  <Div col w={`${100/contractModeDic[newContractMode].length}%`} just="center" align="center">
                    <Txt mgB="10px" color={COLORS.GREENS.FONTS.TITLE} fSize="16px">
                      {el.title}
                    </Txt>
                    <Txt>€ {el.value}</Txt>
                  </Div>
                )})}
            </Div>
          </Div>);
            {/* <FormRow>
              <FormInput
                w="30%"
                label={dict.months[firstMonth]}
                placeholder={obj.inInfo.rent}
                type="numer"
                name="rentFirstMonth"
                mgR="20px"
                pad="8px"
                error={errors.rent}
                errorMessage="Mandatory"
                register={register}
                registerObject={{ required: true }}
                disabled
              />
              {obj.betweenLength > 0 && (
                <FormInput
                  w="30%"
                  label={`${dict.months[fromMonth]} to ${dict.months[toMonth]}`}
                  placeholder={rent}
                  type="numer"
                  name="inBetweenRent"
                  mgR="20px"
                  pad="8px"
                  error={errors.rent}
                  errorMessage="Mandatory"
                  register={register}
                  registerObject={{ required: true }}
                  disabled
                />
              )}
              <FormInput
                w="30%"
                label={dict.months[lastMonth]}
                placeholder={obj.outInfo.rent}
                type="numer"
                name="rentLastMonth"
                mgR="20px"
                pad="8px"
                error={errors.rent}
                errorMessage="Mandatory"
                register={register}
                registerObject={{ required: true }}
                disabled
              />
            </FormRow> 
          </Div>
        );
    }*/}
  };

  useEffect(() => {
    if (newRoomNr) {
      const newInfo = roomsInfo[newRoomNr - 1];
      const { rent = '', deposit = '', expenses = '' } = newInfo;
      setValue('rent', rent);
      setValue('expenses', expenses);
      setValue('deposit', deposit);
    }
  }, [newRoomNr]);

  useEffect(() => {
    const rentsObj = Calculations.getTenantPayments(newRent, newExpenses, newContractMode, checkIn, checkOut);
    if (!isEmpty(rentsObj) && newRoomNr) {
      const details = renderRentDetails(rentsObj);
      setRentsSummary(details);
    }
  }, [newContractMode]);

  const renderMultipleTenants = (nr) => {
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
            w="30%"
            mgR="20px"
            mgT="10px"
            pad="8px"
            label={dict.common.roomNr}
            labelW="100%"
            name="newRoomNr"
            type="text"
            error={errors.newRoomNr}
            errorMessage="Mandatory"
            register={register}
            registerObject={{ required: true }}
            modifiedValue={(val) => setNewRoomNr(val)}
            options={jamRooms}
          />
          {newRoomNr !== '' && (
            <Div just="center" align="center">
              
              <FormInput
                w="20%"
                label={dict.rent.rent}
                type="numer"
                name="rent"
                mgR="20px"
                pad="8px"
                mgBI="0px"
                error={errors.rent}
                errorMessage="Mandatory"
                // modifiedValue={val => setValue('rent',val)}
                register={register}
                registerObject={{ required: true }}
              />
              <Controller
                as={<input type='text' />}
                control={control}
                // defaultValue={userData ? userData.phone : ''}
                name='rent'
              />
              <FormInput
                w="25%"
                label={dict.common.expenses}
                type="number"
                name="expenses"
                mgR="20px"
                pad="8px"
                mgBI="0"
                error={errors.expenses}
                errorMessage="Mandatory"
                register={register}
                registerObject={{ required: true }}
              />
              <FormInput
                w="35%"
                label={dict.deposit.deposit}
                type="number"
                name="deposit"
                pad="8px"
                mgBI="0"
                error={errors.deposit}
                errorMessage="Mandatory"
                register={register}
                // value={deposit}
                registerObject={{ required: true }}
              />
            </Div>
          )}
        </FormRow>
        {newRoomNr !== '' && (
          <>
            <FormRow just="space-between">
              <FormSelect // contractMode
                w="50%"
                mgT="20px"
                label={dict.settingsForm.contMode}
                labelAlign="flex-start"
                labelW="100%"
                name="contractMode"
                type="text"
                pad="8px"
                // placeholder={defaultValues.contMod}
                error={errors.contractMode}
                errorMessage="Mandatory"
                register={register}
                registerObject={{ required: true }}
                options={contracts}
                modifiedValue={(val) => setNewContractMode(val)}
              />
            </FormRow>
            {newContractMode && (
              !isEmpty(rentsSummary) && rentsSummary
            )}
          </>
        )}
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
