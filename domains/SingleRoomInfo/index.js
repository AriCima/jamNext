import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import FormInput from '../../components/FormInput';
import {
  Div, Txt, Button, Table,
} from '../../styledComps';
import dictionary from '../../locale';
import { COLORS } from '../../config';


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

const SingleRoomInfo = ({ roomInfo, edit }) => {
  const { lenguage } = useSelector((state) => state.userReducer);
  const dict = dictionary[lenguage];

  const {
    sqm, exterior, balcony, privBath, heater, airConditioner, deposit, rent, expenses,
  } = roomInfo;

  const {
    register, errors, control,
  } = useForm();

  const enableEditForm = (e) => {
    e.preventDefault();
    edit(true);
  };

  return (
    <>
      <Div colorHov="black" className="title-div" w="100%" h="40px" just="space-between" align="flex-start" mgT="30px">
        <Txt mgB="10px" fSize="14px" color="gray" bold>{dict.roomFeat.info}</Txt>
        <Div colorHov="black" className="roomInfo-buttonArea">
          <Button
            h="40px"
            pad="0 15px"
            w="150px"
            border={COLORS.GREENS.BUTTONS.BACK}
            back="white"
            backHov={COLORS.GREENS.BUTTONS.BACKHOV}
            mgR="20px"
            just="center"
            align="center"
            color={COLORS.GREENS.BUTTONS.BACK}
            colorHov="white"
            onClick={(e) => { enableEditForm(e); }}
          >
            {dict.common.editRoom}
          </Button>

        </Div>
      </Div>

      <Div colorHov="black" className="roomInfo-section">
        <FormInput
          w="70%"
          label={dict.roomFeat.sqm}
          placeholder={sqm}
          type="text"
          name="sqm"
          mgR="20px"
          error={errors.sqm}
          errorMessage="Size is mandatory"
          register={register}
          registerObject={{ required: true }}
          disabled
        />

        <FormInput
          w="70%"
          label={dict.common.rent}
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
          label={dict.common.deposit}
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

      </Div>

      <Table id="roomInfo-table" w="100%" mg="20px 0">
        <thead>
          <tr>
            <td>
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
            <td id="rules-text">
              {dict.roomFeat.ext}
            </td>
            <td id="rules-value">
              <Controller
                name="exterior"
                control={control}
                defaultValue={exterior}
                as={(
                  <RadioGroup aria-label="exterior">
                    <Div className="radios-wrapper" just="flex-end">
                      <Div className="radio-box">
                        <FormControlLabel
                          value="Yes"
                          control={<GreenRadio />}
                          checked={exterior === 'Yes'}
                          disabled
                        />
                      </Div>
                      <Div className="radio-box">
                        <FormControlLabel
                          value="No"
                          control={<RedRadio />}
                          checked={exterior === 'No'}
                          disabled
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
              {dict.roomFeat.balcony}
            </td>
            <td id="rules-value">
              <Controller
                name="balcony"
                control={control}
                as={(
                  <RadioGroup aria-label="balcony">
                    <Div className="radios-wrapper" just="flex-end">
                      <Div className="radio-box">
                        <FormControlLabel
                          value="Yes"
                          control={<GreenRadio />}
                          checked={balcony === 'Yes'}
                          disabled
                        />
                      </Div>
                      <Div className="radio-box">
                        <FormControlLabel
                          value="No"
                          control={<RedRadio />}
                          checked={balcony === 'No'}
                          disabled
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
              {dict.roomFeat.privBath}
            </td>
            <td id="rules-value">
              <Controller
                name="privBath"
                control={control}
                defaultValue={privBath}
                as={(
                  <RadioGroup aria-label="privBath">
                    <Div className="radios-wrapper" just="flex-end">
                      <Div className="radio-box">
                        <FormControlLabel
                          value="Yes"
                          control={<GreenRadio />}
                          disabled
                          checked={privBath === 'Yes'}
                        />
                      </Div>
                      <Div className="radio-box">
                        <FormControlLabel
                          value="No"
                          control={<RedRadio />}
                          disabled
                          checked={privBath === 'No'}
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
                name="Heater"
                control={control}
                defaultValue={heater}
                as={(
                  <RadioGroup aria-label="heater">
                    <Div className="radios-wrapper" just="flex-end">
                      <Div className="radio-box">
                        <FormControlLabel
                          value="Yes"
                          control={<GreenRadio />}
                          checked={heater === 'Yes'}
                          disabled
                        />
                      </Div>
                      <Div className="radio-box">
                        <FormControlLabel
                          value="No"
                          control={<RedRadio />}
                          checked={heater === 'No'}
                          disabled
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
                name="Air conditioner"
                control={control}
                defaultValue={airConditioner}
                as={(
                  <RadioGroup aria-label="airConditioner">
                    <Div className="radios-wrapper" just="flex-end">
                      <Div className="radio-box">
                        <FormControlLabel
                          value="Yes"
                          control={<GreenRadio />}
                          checked={airConditioner === 'Yes'}
                          disabled
                        />
                      </Div>
                      <Div className="radio-box">
                        <FormControlLabel
                          value="No"
                          control={<RedRadio />}
                          checked={airConditioner === 'No'}
                          disabled
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
    </>

  );
};

export default (SingleRoomInfo);
