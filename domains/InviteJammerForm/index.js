import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactSelect from 'react-select';

import { Div, SubTitle, InputSubmit } from '../../styledComps';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';

import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';

const useInviteJammerForm = ({
  jamId, jamName, adminName, jammers, rooms, jamDetails,
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
  const [options, setOptions] = useState([]);

  const [defaultValues, setDefaultValues] = useState({
    checkIn,
    checkOut,
    deposit: '',
    nrOfTenants: 1,
    rent: '',
    contractMode: jamDetails.contractMode,
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
    const cIn = checkIn;
    const cOut = checkOut;

    const outLater = moment(cOut).isAfter(cIn);
    // if (!outLater) {
    //     setErrorMessage('Check-out date must be greater than check-In date');
    //     return;
    // } else {
    //     const roomJammers = jammers.filter(e => e.roomNr === data.roomNr);

    //     for (let i = 0; i < roomJammers.length; i ++) {
    //         const inIsBetween = moment(cIn).isBetween(roomJammers[i].checkIn, roomJammers[i].checkOut);
    //         const outIsBetween = moment(cOut).isBetween(roomJammers[i].checkIn, roomJammers[i].checkOut);
    //         if (inIsBetween || outIsBetween) {
    //             const { firstName, lastName, roomNr, checkIn, checkOut } = roomJammers[i];
    //             setErrorMessage('There is dates overlapping with');
    //             setErrorDesc(`Tenant: ${firstName} ${lastName}, roomNr: ${roomNr}, check-In: ${checkIn}, check-out: ${checkOut}`);
    //             setShowErrorMessage(true);
    //             return;
    //         }
    //     }
    // };

    const rentsArray = Calculations.getTenantPayments(data.rent, data.contractMode, cIn, cOut);

    data.rentsArray = rentsArray;
    data.registeredUser = false;
    data.jamName = jamName;
    data.adminName = adminName;
    data.contractCode = Calculations.generateCode();
    data.checkIn = moment(cIn).format('DD-MMM-YYYY');
    data.checkOut = moment(cOut).format('DD-MMM-YYYY');
    data.roomNr = data.roomObj.label;
    delete data.roomObj;
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
        firstName: data.secondFirstName,
        lastName: data.secondLastName,
        emial: data.secondEmail,
      });
    }

    if (nrOfTenants === 3) {
      tenantsInfo.push({
        firstName: data.secondFirstName,
        lastName: data.secondLastName,
        emial: data.secondEmail,
      });
      tenantsInfo.push({
        firstName: data.thirdFirstName,
        lastName: data.thirdLastName,
        email: data.thirdEmail,
      });
    }

    for (let i = 0; i < tenantsInfo.length; i++) {
      DataService.saveInvitation(jamId, data)
        .then((res) => {
          const invId = res.id;
          // eslint-disable-next-line max-len
          // CHAPUZA AQUI HAY QUE AUTOMATIZAR FUNCION DE INVITACION Y PASAR EL USER UN EMAIL CON EL LINK
          const registrationURL = `/register/${jamId}/${invId}`;
          // eslint-disable-next-line max-len
          // history.push(`/register/${jamId}/${jamName}/${adminName}/${firstName}/${lastName}/${invId}`);
        });
    }
  };

  const takeMeToJammerInfo = () => {
    console.log('HELLO WORLD');
  };

  const typeOfContracts = Calculations.getTypeOfContracts();

  return (
    <form
      autoComplete="off"
      className="hook-form"
      onSubmit={handleSubmit(onSubmit)}
    >

      <div className="form-section">
        <div className="form-section-title">
          <p>Contract Info</p>
        </div>

        { showErrorMessage && (
        <div className="form-error-line">
          <div className="form-error-message">
            <h4>{errorMessage}</h4>
          </div>
          <div
            className="form-error-desc"
            onClick={(e) => {
              e.preventDefault();
              takeMeToJammerInfo(room.roomId);
            }}
          >
            <p>{errorDesc}</p>
          </div>
        </div>

        )}

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

        <div className="form-line">

          <div className="custom-input-block">
            <div className="block-label">
              <label>Room Nr</label>
              {errors.roomNr && <div className="field-error">{`nr between 0 and ${rooms.length - 1}`}</div>}
            </div>
            <Controller
              as={ReactSelect}
              options={options}
              defaultValue={options[0]}
              name="roomObj"
              isClearable
              control={control}
            />
          </div>

          <div className="rules-custom-input-block midWidth">
            <div className="block-label">
              <label>ContractMode</label>
            </div>
            <select className="input-styled" name="contractMode" ref={register}>
              <option value="daily">daily</option>
              <option value="fortnightly">fortnightly</option>
              <option value="monhtly">monhtly</option>
            </select>
          </div>

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

          <div className="custom-input-block">
            <div className="block-label">
              <label>Rent €/Mo</label>
              {errors.rent && <div className="field-error">Required</div>}
            </div>
            <input
              name="rent"
              defaultValue={defaultValues.rent}
              ref={register({
                required: true,
              })}
            />
          </div>
          <div className="custom-input-block">
            <div className="block-label">
              <label>Deposit €</label>
              {errors.deposit && <div className="field-error">Required</div>}
            </div>
            <input
              name="deposit"
              ref={register({
                required: true,
              })}
            />
          </div>

        </div>
      </div>
      <div className="form-section">
        <div className="form-section-title">
          <p>Personal information</p>
        </div>

        <div className="form-line">
          <div className="custom-input-block">
            <div className="block-label">
              <label>First name</label>
              {errors.firstName && <div className="field-error">Required</div>}
            </div>
            <input
              name="firstName"
              ref={register({
                required: true,
              })}
            />
          </div>
          <div className="custom-input-block">
            <div className="block-label">
              <label>Last name</label>
              {errors.lastName && <div className="field-error">Required</div>}
            </div>
            <input
              name="lastName"
              ref={register({
                required: true,
              })}
            />
          </div>
          <div className="custom-input-block">
            <div className="block-label">
              <label>Email</label>
              {errors.email && <div className="field-error">Non valid address</div>}
            </div>
            <input
              name="email"
              ref={register({
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
          </div>
        </div>

      </div>
      { second && (
        <div className="form-section">
          <div className="form-section-title">
            <p>Personal information 2nd tenant</p>
          </div>

          <div className="form-line">
            <div className="custom-input-block">
              <div className="block-label">
                <label>First name</label>
                {errors.secondFirstName && <div className="field-error">Required</div>}
              </div>
              <input
                name="secondFirstName"
                ref={register({
                  required: true,
                })}
              />
            </div>
            <div className="custom-input-block">
              <div className="block-label">
                <label>Last name</label>
                {errors.secondLastName && <div className="field-error">Required</div>}
              </div>
              <input
                name="secondLastName"
                ref={register({
                  required: true,
                })}
              />
            </div>
            <div className="custom-input-block">
              <div className="block-label">
                <label>Email</label>
                {errors.secondEmail && <div className="field-error">Non valid address</div>}
              </div>
              <input
                name="secondEmail"
                ref={register({
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
              />
            </div>
          </div>

        </div>
      )}
      { third && (
        <div className="form-section">
          <div className="form-section-title">
            <p>Personal information 3rd tenant</p>
          </div>

          <div className="form-line">
            <div className="custom-input-block">
              <div className="block-label">
                <label>First name</label>
                {errors.thirdFirstName && <div className="field-error">Required</div>}
              </div>
              <input
                name="thirdFirstName"
                ref={register({
                  required: true,
                })}
              />
            </div>
            <div className="custom-input-block">
              <div className="block-label">
                <label>Last name</label>
                {errors.thirdLastName && <div className="field-error">Required</div>}
              </div>
              <input
                name="thirdLastName"
                ref={register({
                  required: true,
                })}
              />
            </div>
            <div className="custom-input-block">
              <div className="block-label">
                <label>Email</label>
                {errors.thirdEmail && <div className="field-error">Non valid address</div>}
              </div>
              <input
                name="thirdEmail"
                ref={register({
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
              />
            </div>
          </div>

        </div>
      )}

      <div className="hook-form-buttonArea">
        <input type="submit" />
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  const { jamId } = state.nav;
  const {
    jamName, adminName, jammers, rooms, jamDetails,
  } = state.jamInfo;
  return {
    jamId, jamName, adminName, jammers, rooms, jamDetails,
  };
};

export default connect(mapStateToProps, null)(useInviteJammerForm);
