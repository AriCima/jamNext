import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

import {
  Div, Txt, Table, InputSubmit, Button
} from '../../styledComps';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';

import DataService from '../../services/DataService';

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

const EditRoomForm = ({ jamId, roomInfo }) => {
  const [disabled, setDisabled] = useState(true);

  const defaultValues = {
    roomNr: roomInfo.roomNr,
    sqm: roomInfo.sqm,
    balcony: roomInfo.balcony,
    exterior: roomInfo.exterior,
    privBath: roomInfo.privBath,
    deposit: roomInfo.deposit,
    rent: roomInfo.rent,
    expenses: roomInfo.expenses,
  };

  const enableEditForm = (x) => {
    setDisabled(!x);
  };

  const {
    register, errors, handleSubmit, control,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    data.roomNr = defaultValues.roomNr.toString();

    const { roomId } = roomInfo;
    DataService.updateRoomInfo(jamId, roomId, data);
  };

  return (
    <form
      autoComplete="off"
      className="roomInfo-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Div w="100%" just="space-between" align="flex-start" mgT="30px">
        <Txt mgB="10px" fSize="14px" color="gray" bold>Room Info</Txt>

        <Div className="roomInfo-buttonArea">

          {disabled ? (
            <Button
              pad="10px"
              border="lightgray"
              color="white"
              className="edit-button"
              onClick={(e) => { e.preventDefault(); enableEditForm(true); }}
            >
              Edit Info
            </Button>
          ) : (
            <>
              <Button
                pad="10px"
                border="lightgray"
                back="lightgray"
                backHov="gray"
                colorHov="white"
                color="white"
                className="cancel-button"
                onClick={(e) => { e.preventDefault(); enableEditForm(false); }}
              >
                Cancel
              </Button>
            </>
          )}

        </Div>

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
        />

      </Div>

      <Table id="roomInfo-table" w="100%" mg="20px 0">
        <thead>
          <tr>
            <td>
              Room features
            </td>
            <td>
              Yes
            </td>
            <td>
              No
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td id="rules-text">
              Is the room
              <span> exterior</span>
              {' '}
              ?
            </td>
            <td id="rules-value">
              <section>
                <Controller
                  name="exterior"
                  control={control}
                  defaultValue={defaultValues.exterior}
                  as={(
                    <RadioGroup aria-label="exterior">
                      <Div className="radios-wrapper">
                        <Div className="radio-box">
                          <FormControlLabel
                            value="yes"
                            control={<GreenRadio />}
                            disabled={disabled}
                          />
                        </Div>
                        <Div className="radio-box">
                          <FormControlLabel
                            value="no"
                            control={<RedRadio />}
                            disabled={disabled}
                          />
                        </Div>
                      </Div>
                    </RadioGroup>
                                  )}
                />
              </section>
            </td>
          </tr>
          <tr>
            <td id="rules-text">
              Has the room
              <span> balcony</span>
              {' '}
              ?
            </td>
            <td id="rules-value">
              <section>
                <Controller
                  name="balcony"
                  control={control}
                  defaultValue={defaultValues.balcony}
                  as={(
                    <RadioGroup aria-label="balcony">
                      <Div className="radios-wrapper">
                        <Div className="radio-box">
                          <FormControlLabel
                            value="yes"
                            control={<GreenRadio />}
                            disabled={disabled}
                          />
                        </Div>
                        <Div className="radio-box">
                          <FormControlLabel
                            value="no"
                            control={<RedRadio />}
                            disabled={disabled}
                          />
                        </Div>
                      </Div>
                    </RadioGroup>
                                      )}
                />
              </section>
            </td>
          </tr>

          <tr>
            <td id="rules-text">
              <label>
                Has the room a
                <span>private bathroom</span>
                {' '}
                ?
              </label>
            </td>
            <td id="rules-value">
              <section>
                <Controller
                  name="privBath"
                  control={control}
                  defaultValue={defaultValues.privBath}
                  disabled={disabled}
                  as={(
                    <RadioGroup aria-label="privBath">
                      <Div className="radios-wrapper">
                        <Div className="radio-box">
                          <FormControlLabel
                            value="yes"
                            control={<GreenRadio />}
                            disabled={disabled}
                          />
                        </Div>
                        <Div className="radio-box">
                          <FormControlLabel
                            value="no"
                            control={<RedRadio />}
                            disabled={disabled}
                          />
                        </Div>
                      </Div>
                    </RadioGroup>
                                      )}
                />
              </section>
            </td>
          </tr>
        </tbody>
      </Table>
      {!disabled
      && (
      <InputSubmit
        w="100%"
        back="rgb(85, 187, 151)"
        type="submit"
        value="submit"
      />
      )}
    </form>
  );
};

export default (EditRoomForm);
