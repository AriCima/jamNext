/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { TENANTS } from '../../../config';
import { useForm } from 'react-hook-form';

import { setJamInfo, setTenantsList, setRoomsInfo } from '../../../redux/actions';
import { setActiveSection } from '../../../redux/actions/jamActions';

import Layout from '../../../domains/Layout';
import { Div, Txt, Table } from '../../../styledComps';
import FormSelect from '../../../components/FormSelect';
import InviteJammerButton from '../../../components/InviteJammerButton'
import NavBarJam from '../../../domains/NavBarJam';
import DataService from '../../../services/DataService';
import Calculations from '../../../services/Calculations';
import dictionary from '../../../locale';

const formStyle = {
  display: 'flex',
  width: '100%',
  marginLeft:"20px",
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
};

const Tenants = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { register, errors, handleSubmit } = useForm();
  const { roomsInfo, tenantsList } = useSelector((state) => state.jamReducer);
  const { jamId } = router.query;
  const { lenguage } = useSelector((state) => state.userReducer);
  const dict = dictionary[lenguage];

  const [tenantsType, setTenantsType] = useState(`${dict.common.allTenants}`);

  const getJamInfo = async () => {
    const res = await DataService.getJamInfoById(jamId);
    dispatch(setJamInfo(res));
  };

  const getTenants = async () => {
    // const res = await DataService.getJammers(jamId);
    // const tenantsList = Calculations.removeAmdinFromJammers(jammers);
    // const tenantsByRooms = Calculations.getTenantsByRooms(tenantsList, nrOfRooms);
    // const tenantsByRooms = Calculations.getTenantsByRooms(TENANTS, nrOfRooms);
    // Info en Redux
    dispatch(setTenantsList(TENANTS));
  };

  useEffect(() => {
    jamId && getJamInfo(jamId);
    jamId && getTenants(jamId);
    dispatch(setActiveSection('tenants'));
  }, [jamId]);

  const selectTenantType = (data) => {
    setTenantsType(data);
  };

  const renderTenantsInfo = () => {
    const tenantsByDates = Calculations.getOrganizedTenantsByDates(TENANTS);
    let tenantsToShow = Calculations.sortByField({elements: TENANTS, asc: true, field: 'firstName'});
    
    switch(tenantsType) {
      case 'current':
        const current = tenantsByDates.currentTenants;
        tenantsToShow = Calculations.sortByField({elements: current, asc: true, field: 'roomNr'});
        break;
      case 'future':
        const future = tenantsByDates.futureTenants;
        tenantsToShow = Calculations.sortByField({elements: future, asc: true, field: 'roomNr'});
        break;
      case 'former':
        const former = tenantsByDates.formerTenants;
        tenantsToShow = Calculations.sortByField({elements: former, asc: true, field: 'firstName'});
        break;
      default:
        break;
    }
    
    return (
      tenantsToShow.map((tenant) => {
        const {
          firstName, lastName, checkIn, checkOut, roomNr, rent, deposit
        } = tenant;

        return (
          <Link key={tenant.userId} href="/jam/[jamId]/tenantInfo/[userId]" as={`/jam/${jamId}/tenantInfo/${tenant.userId}`} passHref>
            <tr>
              <td className="startTd">
                {firstName}
                {' '}
                {lastName}
              </td>
              <td className="middleTd">
                <Txt mgL="20px">{roomNr}</Txt>
              </td>
              <td className="middleTd">
                {checkIn}
              </td>
              <td className="middleTd">
                {checkOut}
              </td>
              <td className="middleTd">
                {rent}
              </td>
              <td className="lastTd">
                {deposit}
              </td>
            </tr>
          </Link>
        );
      })
    );
  };

  const leftTd = {
    textAlign: 'left',
  };

  const showInfo = tenantsList.length !== 0;

  return (
    <Layout>
      <NavBarJam />
      <Div col w="100%" just="flex-start" align="flex-start">
        <Div w="100%" mgT="20px"align="center" just="space-between">
        <form style={formStyle} autoComplete="off">
          <FormSelect
            w="40%"
            pad="5px"
            col={false}
            label={dict.common.show}
            labelW="90px"
            labelMgR="10px"
            name="tenantType"
            type="text"
            error={errors.jamType}
            errorMessage="Please select a jam type"
            register={register}
            registerObject={{ required: true }}
            options={[
              {id: 'all', name: `${dict.common.allTenants}`},
              {id: 'current', name: `${dict.common.currentTenants}`},
              {id: 'future', name: `${dict.common.futureTenants}`},
              {id: 'former', name: `${dict.common.formerTenants}`},
          ]}
            modifiedValue={(val) => { selectTenantType(val) }}
          />
        </form>
          <InviteJammerButton text={dict.common.aTenant} />
        </Div>
        <Div colorHov="black" mgT="20px" w="100%" just="center" align="center">
          <Table w="90%">
            <thead>
              <tr>
                <td>{dict.common.tenant}</td>
                <td style={leftTd}>{dict.common.roomNr}</td>
                <td>Cehck-In</td>
                <td>Check-Out</td>
                <td>{dict.common.rent}</td>
                <td>{dict.common.deposit}</td>
              </tr>
            </thead>
            <tbody>
              {showInfo && renderTenantsInfo()}
            </tbody>
          </Table>

        </Div>
      </Div>
    </Layout>
  );
};

export default Tenants;
