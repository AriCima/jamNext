import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

import {
  Div, Txt, Table, InputSubmit, Button,
} from '../../styledComps';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import DataService from '../../services/DataService';
import dictionary from '../../locale';

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const RedRadio = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const EditRoomForm = ({
  jamId, roomId, roomInfo, edit,
}) => {
  const { lenguage } = useSelector((state) => state.userReducer);
  const dict = dictionary[lenguage];

  const defaultValues = {
    airConditioner: roomInfo.airConditioner,
    balcony: roomInfo.balcony,
    deposit: roomInfo.deposit,
    expenses: roomInfo.expenses,
    exterior: roomInfo.exterior,
    heater: roomInfo.heater,
    privBath: roomInfo.privBath,
    rent: roomInfo.rent,
    roomNr: roomInfo.roomNr,
    sqm: roomInfo.sqm,
  };

  const {
    register, errors, handleSubmit, control,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    DataService.updateRoomInfo(jamId, roomId, data, () => {
      edit(false);
    });
  };

  const disableEditForm = (e) => {
    e.preventDefault();
    edit(false);
  };

  const disabled = false;
  return (
    <form
      autoComplete="off"
      className="roomInfo-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Div w="100%" h="40px" just="space-between" align="flex-start" mgT="30px">
        <Txt mgB="10px" fSize="14px" color="gray" bold>{dict.common.editRoom}</Txt>
      </Div>

      <Div className="roomInfo-section">

        <FormInput
          w="70%"
          label="Size (sqm)"
          placeholder={defaultValues.sqm}
          type="text"
          name="sqm"
          mgR="20px"
          error={errors.sqm}
          errorMessage="Size is mandatory"
          register={register}
          registerObject={{ required: true }}
          disabled={disabled}
          modifiedValue={() => { console.log('value') }}
        />

        <FormInput
          w="70%"
          label="Rent €/Mo"
          placeholder={defaultValues.rent}
          type="text"
          name="rent"
          mgR="20px"
          error={errors.rent}
          errorMessage="Rent is mandatory"
          register={register}
          registerObject={{ required: true }}
          disabled={disabled}
          modifiedValue={() => { console.log('value') }}
        />

        <FormInput
          w="70%"
          label="Expenses €/Mo"
          placeholder={defaultValues.expenses}
          type="text"
          name="expenses"
          mgR="20px"
          error={errors.expenses}
          errorMessage="Expenses is mandatory"
          register={register}
          registerObject={{ required: false }}
          disabled={disabled}
          modifiedValue={() => { console.log('value') }}
        />

        <FormInput
          w="70%"
          label="Deposit €"
          placeholder={defaultValues.deposit}
          type="text"
          name="deposit"
          mgR="20px"
          error={errors.deposit}
          errorMessage="Deposit is mandatory"
          register={register}
          registerObject={{ required: true }}
          disabled={disabled}
          modifiedValue={() => { console.log('value') }}
        />

      </Div>

      <Table id="roomInfo-table" w="100%" mg="20px 0">
        <thead>
          <tr>
            <td style={{ fontSize: '14px' }}>
              {dict.roomFeat.feat}
            </td>
            <td style={{ textAlign: 'right', paddingRight: '30px' }}>
              <span style={{ marginRight: '40px' }}>{dict.common.yes}</span>
              <span>No</span>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {dict.roomFeat.ext}
            </td>
            <td id="rules-value">
              <Controller
                name="exterior"
                control={control}
                defaultValue={defaultValues.exterior}
                modifiedValue={() => { console.log('value') }}
                as={(
                  <RadioGroup aria-label="exterior">
                    <Div className="radios-wrapper" just="flex-end">
                      <Div className="radio-box">
                        <FormControlLabel
                          value="Yes"
                          control={<GreenRadio />}
                          disabled={disabled}
                        />
                      </Div>
                      <Div className="radio-box">
                        <FormControlLabel
                          value="No"
                          control={<RedRadio />}
                          disabled={disabled}
                        />
                      </Div>
                    </Div>
                  </RadioGroup>
                  )}
              />

            </td>
          </tr>
          <tr>
            <td>
              {dict.roomFeat.balcony}
            </td>
            <td id="rules-value">
              <Controller
                name="balcony"
                control={control}
                defaultValue={defaultValues.balcony}
                modifiedValue={() => { console.log('value') }}
                as={(
                  <RadioGroup aria-label="balcony">
                    <Div className="radios-wrapper" just="flex-end">
                      <Div className="radio-box">
                        <FormControlLabel
                          value="Yes"
                          control={<GreenRadio />}
                          disabled={disabled}
                        />
                      </Div>
                      <Div className="radio-box">
                        <FormControlLabel
                          value="No"
                          control={<RedRadio />}
                          disabled={disabled}
                        />
                      </Div>
                    </Div>
                  </RadioGroup>
                                      )}
              />

            </td>
          </tr>

          <tr>
            <td>
              {dict.roomFeat.privBath}
            </td>
            <td id="rules-value">
              <Controller
                name="privBath"
                control={control}
                defaultValue={defaultValues.privBath}
                disabled={disabled}
                modifiedValue={() => { console.log('value') }}
                as={(
                  <RadioGroup aria-label="privBath">
                    <Div className="radios-wrapper" just="flex-end">
                      <Div className="radio-box">
                        <FormControlLabel
                          value="Yes"
                          control={<GreenRadio />}
                          disabled={disabled}
                        />
                      </Div>
                      <Div className="radio-box">
                        <FormControlLabel
                          value="No"
                          control={<RedRadio />}
                          disabled={disabled}
                        />
                      </Div>
                    </Div>
                  </RadioGroup>
                                      )}
              />

            </td>
          </tr>
          <tr>
            <td id="rules-text">
              {dict.roomFeat.heater}
            </td>
            <td id="rules-value">
              <Controller
                name="heater"
                control={control}
                defaultValue={defaultValues.heater}
                modifiedValue={() => { console.log('value') }}
                as={(
                  <RadioGroup aria-label="heater">
                    <Div className="radios-wrapper" just="flex-end">
                      <Div className="radio-box">
                        <FormControlLabel
                          value="Yes"
                          control={<GreenRadio />}
                          disabled={disabled}
                        />
                      </Div>
                      <Div className="radio-box">
                        <FormControlLabel
                          value="No"
                          control={<RedRadio />}
                          disabled={disabled}
                        />
                      </Div>
                    </Div>
                  </RadioGroup>
                  )}
              />
            </td>
          </tr>
          <tr>
            <td id="rules-text">
              {dict.roomFeat.aaCC}
            </td>
            <td id="rules-value">
              <Controller
                name="airConditioner"
                control={control}
                defaultValue={defaultValues.airConditioner}
                modifiedValue={() => { console.log('value') }}
                as={(
                  <RadioGroup aria-label="airConditioner">
                    <Div className="radios-wrapper" just="flex-end">
                      <Div className="radio-box">
                        <FormControlLabel
                          value="Yes"
                          control={<GreenRadio />}
                          disabled={disabled}
                        />
                      </Div>
                      <Div className="radio-box">
                        <FormControlLabel
                          value="No"
                          control={<RedRadio />}
                          disabled={disabled}
                        />
                      </Div>
                    </Div>
                  </RadioGroup>
                  )}
              />
            </td>
          </tr>
        </tbody>
      </Table>
      {!disabled
      && (
      <Div w="100%" just="space-between">
        <InputSubmit
          w="160px"
          h="50px"
          back="rgb(85, 187, 151)"
          type="submit"
          value="submit"
        />
        <Div className="roomInfo-buttonArea" w="160px">
          <Button
            w="100%"
            h="50px"
            border="lightgray"
            back="lightgray"
            backHov="gray"
            colorHov="white"
            color="white"
            className="cancel-button"
            onClick={(e) => { disableEditForm(e); }}
          >
            Cancel
          </Button>
        </Div>
      </Div>
      )}
    </form>
  );
};

export default (EditRoomForm);
