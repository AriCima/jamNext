import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import {
  withStyles, makeStyles,
} from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DataService from '../../../services/DataService';
import Calculations from '../../../services/Calculations';

import FormInput from '../../../components/FormInput';
import FormSelect from '../../../components/FormSelect';
import FormTextArea from '../../../components/FormTextArea';

import { setJamInfo } from '../../../redux/actions';
import { setActiveSection, setJamDesc, setJamName } from '../../../redux/actions/jamActions';
import Layout from '../../../domains/Layout';
import {
  Div, Button, Title, SubTitle, FormRow, InputSubmit, Table,
} from '../../../styledComps';
import NavBarJam from '../../../domains/NavBarJam';
import dictionary from '../../../locale';

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginLeft: '20px',
  },
  accordion: {
    width: '90%',
    padding: '0 10px',
    backgroundColor: '#E5E2DC',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: '#252422',
  },
  expHeading: {
    color: '#FCA311',
    fontWeight: '600',
  },
  expIcon: {
    color: '#FCA311',
  },
  details: {
    flexDirection: 'column',
  },
}));

const Settings = () => {
  const classes = useStyles();
  const { lenguage } = useSelector((state) => state.userReducer);
  const dict = dictionary[lenguage];

  const [showButtons, setShowButtons] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [landlordTitle, setTitle] = useState('');

  const {
    jamDetails, jamName, jamDesc, jamCode,
  } = useSelector((state) => state.jamReducer);
  const dispatch = useDispatch();

  const router = useRouter();
  const { jamId } = router.query;

  const [selectedCountry, setSelectedCountry] = useState('');
  const [ctMode, setContractMode] = useState('');

  const getJamInfo = async () => {
    const res = await DataService.getJamInfoById(jamId);
    dispatch(setJamInfo(res));
  };

  useEffect(() => {
    jamId && getJamInfo(jamId);
    dispatch(setActiveSection('settings'));
  }, [jamId]);

  const defaultValues = {
    jamName,
    jamDesc,
    jamCode,
    jamDetails,
  };
  const {
    register, errors, handleSubmit, control, reset
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    DataService.editJamSpecs(jamId, { ...data, jamCode });
    setShowButtons(false);
  };

  const resetForm = (e) => {
    e.preventDefault();
    setShowButtons(false);
    reset(defaultValues);
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '20px',
    justifyContent: 'center',
  };

  const countries = Calculations.getSelectOptions('countries');
  const contracts = Calculations.getSelectOptions('contracts');

  return (
    <Layout>
      <div>
        <NavBarJam />
        <>
          <Title>
            Manage all the information about&nbsp;
            <span>{jamName}</span>
            {' '}
            &nbsp;here
          </Title>
          <div className={classes.root}>
            <form
              style={formStyle}
              autoComplete="off"
              className="settings-form"
              onSubmit={handleSubmit(onSubmit)}
            >

              <Div className="settingsForm" w="90%" col just="center" align="flex-start">
                {/* JAM INFO */}
                <Accordion
                  className={classes.accordion}
                  expanded={expanded === 'panel1'}
                  onChange={handleChange('panel1')}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={expanded === 'panel1' && classes.expIcon} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={expanded === 'panel1' ? classes.expHeading : classes.heading}>Jam Info</Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.details}>
                    <FormRow className="settings-section-info row-section">
                      <FormInput
                        w="70%"
                        label="Jam Name"
                        placeholder={defaultValues.jamName}
                        type="text"
                        name="jamName"
                        mgR="20px"
                        error={errors.jamName}
                        errorMessage="Jam Name is mandatory"
                        register={register}
                        registerObject={{ required: true }}
                        modifiedValue={() => { setShowButtons(true); }}
                      />
                      <FormInput
                        w="70%"
                        label="Jam Code"
                        placeholder={defaultValues.jamCode}
                        type="text"
                        name="jamCode"
                        error={errors.jamCode}
                        register={register}
                        disabled
                        modifiedValue={() => setShowButtons(true)}
                      />
                    </FormRow>
                    <FormRow>
                      <FormTextArea
                        w="100%"
                        h="20px"
                        label="Jam Description"
                        placeholder={defaultValues.jamDesc}
                        type="text"
                        name="jamDesc"
                        error={errors.jamDesc}
                        errorMessage="Jam description is mandatory"
                        register={register}
                        registerObject={{ required: true }}
                        modifiedValue={() => setShowButtons(true)}
                      />

                    </FormRow>
                  </AccordionDetails>
                </Accordion>
                {/* CONTRACT INFO */}
                <Accordion
                  className={classes.accordion}
                  expanded={expanded === 'panel2'}
                  onChange={handleChange('panel2')}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={expanded === 'panel2' && classes.expIcon} />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography className={expanded === 'panel2' ? classes.expHeading : classes.heading}>Contract info</Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.details}>
                    <SubTitle>Apartment location</SubTitle>
                    <FormRow>
                      <FormInput
                        w="100%"
                        label="Address (Street, house nr, floor, door, . . . )"
                        placeholder={dict.placeholder.inputAddress}
                        type="text"
                        name="jamDetails.contractInfo.apartmentInfo.apartmentAddress"
                        error={errors.address}
                        errorMessage="Jam address is mandatory"
                        register={register}
                        registerObject={{ required: true }}
                        modifiedValue={() => setShowButtons(true)}
                      />
                    </FormRow>
                    <FormRow>
                      <FormInput
                        w="30%"
                        label="City"
                        placeholder={defaultValues.apartmentCity}
                        type="text"
                        name="jamDetails.contractInfo.apartmentInfo.apartmentCity"
                        mgR="20px"
                        error={errors.city}
                        errorMessage="Jam city is mandatory"
                        register={register}
                        registerObject={{ required: true }}
                        modifiedValue={() => setShowButtons(true)}
                      />
                      <FormInput
                        w="30%"
                        label="ZipCode"
                        placeholder={defaultValues.apartmentZipCode}
                        type="text"
                        name="jamDetails.contractInfo.apartmentInfo..apartmentZipCode"
                        mgR="20px"
                        error={errors.zipCode}
                        errorMessage="zipCode is mandatory"
                        register={register}
                        registerObject={{ required: true }}
                        modifiedValue={() => setShowButtons(true)}
                      />

                      <FormSelect
                        w="40%"
                        label="Country"
                        name="jamDetails.contractInfo.apartmentInfo.apartmentCountry"
                        type="text"
                        error={errors.apartmentCountry}
                        errorMessage="Please select a country"
                        register={register}
                        registerObject={{ required: true }}
                        options={countries}
                        reportValue={(val) => setSelectedCountry(val)}
                        modifiedValue={() => setShowButtons(true)}
                      />
                    </FormRow>
                    <SubTitle>Landlord information</SubTitle>
                    <FormRow>
                      <FormSelect
                        w="20%"
                        mgR="20px"
                        label="Title"
                        name="jamDetails.contractInfo.landlordInfo.landlordTitle"
                        type="text"
                        error={errors.landlordTitle}
                        errorMessage="Please select a title"
                        register={register}
                        registerObject={{ required: true }}
                        reportValue={(val) => setTitle(val)}
                        options={[{ id: 'mr', name: 'Mr' }, { id: 'mrs', name: 'Mrs' }]}
                        modifiedValue={() => setShowButtons(true)}
                      />
                      <FormInput
                        w="40%"
                        mgR="20px"
                        label="Landlord name"
                        type="text"
                        name="jamDetails.contractInfo.landlordInfo.landlordFirstName"
                        error={errors.landlordFirstName}
                        errorMessage="Landlord name is mandatory"
                        register={register}
                        registerObject={{ required: true }}
                        modifiedValue={() => setShowButtons(true)}
                      />
                      <FormInput
                        w="40%"
                        mgR="20px"
                        label="Landlord last name"
                        type="text"
                        name="jamDetails.contractInfo.landlordInfo.landlordLastName"
                        error={errors.landlordLastName}
                        errorMessage="Landlord last name is mandatory"
                        register={register}
                        registerObject={{ required: true }}
                        modifiedValue={() => setShowButtons(true)}
                      />
                    </FormRow>

                    <FormRow>
                      <FormSelect
                        w="30%"
                        mgR="20px"
                        label="Document type"
                        name="jamDetails.contractInfo.landlordInfo.landlordDocType"
                        type="text"
                        error={errors.landlordDocType}
                        errorMessage="Please select a document type"
                        register={register}
                        registerObject={{ required: true }}
                        options={[
                          { id: 'dni', name: 'DNI' },
                          { id: 'nie', name: 'NIE' },
                          { id: 'pass', name: 'Passport' },
                        ]}
                        modifiedValue={() => setShowButtons(true)}
                      />

                      <FormInput
                        w="20%"
                        mgR="20px"
                        label="Doc Nr"
                        type="text"
                        name="jamDetails.contractInfo.landlordInfo.landlordDocNr"
                        error={errors.landlordDocNr}
                        errorMessage="A document Nr is mandatory"
                        register={register}
                        registerObject={{ required: true }}
                        modifiedValue={() => setShowButtons(true)}
                      />

                      <FormInput
                        w="60%"
                        label="Address (Street, house nr, floor, door . . .  "
                        type="text"
                        name="jamDetails.contractInfo.landlordInfo.landlordAddress"
                        error={errors.landlordAddress}
                        errorMessage="Landlord address mandatory"
                        register={register}
                        registerObject={{ required: true }}
                        modifiedValue={() => setShowButtons(true)}
                      />

                    </FormRow>
                    <FormRow>
                      <FormInput
                        w="40%"
                        mgR="20px"
                        label="City"
                        type="text"
                        name="jamDetails.contractInfo.landlordInfo.landlordCity"
                        error={errors.landlordCity}
                        errorMessage="Landlord city is mandatory"
                        register={register}
                        registerObject={{ required: true }}
                        modifiedValue={() => setShowButtons(true)}
                      />
                      <FormInput
                        w="20%"
                        mgR="20px"
                        label="ZipCode"
                        type="text"
                        name="jamDetails.contractInfo.landlordInfo.landlordZipCode"
                        error={errors.landlordZipCode}
                        errorMessage="Landlord zipCode is mandatory"
                        register={register}
                        registerObject={{ required: true }}
                        modifiedValue={() => setShowButtons(true)}
                      />

                      <FormSelect
                        w="40%"
                        mgR="20px"
                        label="Country"
                        name="jamDetails.contractInfo.landlordInfo.landlordCountry"
                        type="text"
                        error={errors.landlordCountry}
                        errorMessage="Please select a country"
                        register={register}
                        registerObject={{ required: true }}
                        options={countries}
                        reportValue={(val) => setSelectedCountry(val)}
                        modifiedValue={() => setShowButtons(true)}
                      />

                    </FormRow>

                    <SubTitle>Contract details</SubTitle>
                    <FormRow>
                      <FormSelect
                        w="60%"
                        label="Contract mode"
                        name="jamDetails.contractInfo.apartmentInfo.contractMode"
                        type="text"
                        error={errors.contractMode}
                        errorMessage="Please select the contract mode"
                        register={register}
                        registerObject={{ required: true }}
                        reportValue={(val) => setContractMode(val)}
                        options={contracts}
                        modifiedValue={() => setShowButtons(true)}
                      />
                    </FormRow>
                  </AccordionDetails>
                </Accordion>
                {/* CHECK-IN / OUT PROCEDURE */}
                <Accordion
                  className={classes.accordion}
                  expanded={expanded === 'panel4'}
                  onChange={handleChange('panel4')}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={expanded === 'panel4' && classes.expIcon} />}
                    aria-controls="panel4a-content"
                    id="panel4a-header"
                  >
                    <Typography className={expanded === 'panel4' ? classes.expHeading : classes.heading}>Check-in / Check-out procedures</Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.details}>

                    <FormRow>
                      <FormTextArea
                        w="100%"
                        label="Check-In procedure"
                        placeholder={defaultValues.checkInProcedure}
                        type="text"
                        name="jamDetails.jamRules.checkInProcedure"
                        error={errors.checkInProcedure}
                        errorMessage="Check-In procedure is mandatory"
                        register={register}
                        modifiedValue={() => setShowButtons(true)}
                      />
                    </FormRow>
                    <FormRow>
                      <FormTextArea
                        w="100%"
                        label="Check-Out procedure"
                        placeholder={defaultValues.checkOutProcedure}
                        type="text"
                        name="jamDetails.jamRules.checkOutProcedure"
                        error={errors.checkOutProcedure}
                        errorMessage="Check-Out procedure is mandatory"
                        register={register}
                        modifiedValue={() => setShowButtons(true)}
                      />
                    </FormRow>
                    <FormRow>
                      <FormInput
                        w="33%"
                        label="Check-In from"
                        placeholder={defaultValues.checkInFrom}
                        type="text"
                        name="jamDetails.jamRules.checkInFrom"
                        mgR="20px"
                        error={errors.checkInFrom}
                        register={register}
                        modifiedValue={() => setShowButtons(true)}
                      />

                      <FormInput
                        w="33%"
                        label="to"
                        placeholder={defaultValues.checkInTo}
                        type="text"
                        name="jamDetails.jamRules.checkInTo"
                        mgR="20px"
                        error={errors.checkInTo}
                        register={register}
                        modifiedValue={() => setShowButtons(true)}
                      />
                      <FormInput
                        w="33%"
                        label="Cehck-Out before"
                        placeholder={defaultValues.checkOutBefore}
                        type="text"
                        name="jamDetails.jamRules.checkOutBefore"
                        mgR="20px"
                        error={errors.checkOutBefore}
                        register={register}
                        modifiedValue={() => setShowButtons(true)}
                      />
                    </FormRow>

                  </AccordionDetails>
                </Accordion>
                {/* HOUSE RULES */}
                <Accordion
                  className={classes.accordion}
                  expanded={expanded === 'panel5'}
                  onChange={handleChange('panel5')}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={expanded === 'panel5' && classes.expIcon} />}
                    aria-controls="panel5a-content"
                    id="panel5a-header"
                  >
                    <Typography className={expanded === 'panel5' ? classes.expHeading : classes.heading}>House rules</Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.details}>

                    <Table id="jamRules-table" w="100%" mg="20px 0">
                      <thead>
                        <tr>
                          <td style={{ fontSize: '14px' }}>
                            {' '}
                          </td>
                          <td style={{ textAlign: 'right', paddingRight: '30px' }}>
                            <span style={{ marginRight: '40px' }}>Yes</span>
                            <span>No</span>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <label>Are pets allowed in the flat ?</label>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <Controller
                              name="jamDetails.jamRules.pets"
                              control={control}
                              defaultValue={defaultValues.pets}
                              modifiedValue={() => setShowButtons(true)}
                              as={(
                                <RadioGroup aria-label="pets">
                                  <Div className="radios-wrapper" just="flex-end">
                                    <Div className="radio-box">
                                      <FormControlLabel
                                        value="yes"
                                        control={<GreenRadio />}
                                      />
                                    </Div>
                                    <Div className="radio-box">
                                      <FormControlLabel
                                        value="no"
                                        control={<RedRadio />}
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
                            <label>Can tenants smoke in the apartment ?</label>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <Controller
                              name="jamDetails.jamRules.smoking"
                              control={control}
                              defaultValue={defaultValues.smoking}
                              modifiedValue={() => setShowButtons(true)}
                              as={(
                                <RadioGroup aria-label="smoking">
                                  <Div className="radios-wrapper" just="flex-end">
                                    <Div className="radio-box">
                                      <FormControlLabel
                                        value="yes"
                                        control={<GreenRadio />}
                                      />
                                    </Div>
                                    <Div className="radio-box">
                                      <FormControlLabel
                                        value="no"
                                        control={<RedRadio />}
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
                            <label>Can tenants smoke in balconies or terraces ?</label>
                          </td>
                          <td style={{ textAlign: 'right' }}>

                            <Controller
                              name="jamDetails.jamRules.smokingBalcony"
                              control={control}
                              defaultValue={defaultValues.smokingBalcony}
                              modifiedValue={() => setShowButtons(true)}
                              as={(
                                <RadioGroup aria-label="smokingBalcony">
                                  <Div className="radios-wrapper" just="flex-end">
                                    <Div className="radio-box">
                                      <FormControlLabel
                                        value="yes"
                                        control={<GreenRadio />}
                                      />
                                    </Div>
                                    <Div className="radio-box">
                                      <FormControlLabel
                                        value="no"
                                        control={<RedRadio />}
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
                            <label>Can tenants invite firends to the apartment ? </label>
                          </td>
                          <td style={{ textAlign: 'right' }}>

                            <Controller
                              name="jamDetails.jamRules.inviteFriends"
                              control={control}
                              defaultValue={defaultValues.inviteFriends}
                              modifiedValue={() => setShowButtons(true)}
                              as={(
                                <RadioGroup aria-label="inviteFriends">
                                  <Div className="radios-wrapper" just="flex-end">
                                    <Div className="radio-box">
                                      <FormControlLabel
                                        value="yes"
                                        control={<GreenRadio />}
                                      />
                                    </Div>
                                    <Div className="radio-box">
                                      <FormControlLabel
                                        value="no"
                                        control={<RedRadio />}
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
                            <label>Can tenants have guests to overnight in the apartment ?</label>
                          </td>
                          <td style={{ textAlign: 'right' }}>

                            <Controller
                              name="jamDetails.jamRules.overnight"
                              control={control}
                              defaultValue={defaultValues.overnight}
                              modifiedValue={() => setShowButtons(true)}
                              as={(
                                <RadioGroup aria-label="overnight">
                                  <Div className="radios-wrapper" just="flex-end">
                                    <Div className="radio-box">
                                      <FormControlLabel
                                        value="yes"
                                        control={<GreenRadio />}
                                      />
                                    </Div>
                                    <Div className="radio-box">
                                      <FormControlLabel
                                        value="no"
                                        control={<RedRadio />}
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
                            <label>Can tenants organize or participate in parties in the apartment ? </label>
                          </td>
                          <td style={{ textAlign: 'right' }}>

                            <Controller
                              name="jamDetails.jamRules.parties"
                              control={control}
                              defaultValue={defaultValues.parties}
                              modifiedValue={() => setShowButtons(true)}
                              as={(
                                <RadioGroup aria-label="parties">
                                  <Div className="radios-wrapper" just="flex-end">
                                    <Div className="radio-box">
                                      <FormControlLabel
                                        value="yes"
                                        control={<GreenRadio />}
                                      />
                                    </Div>
                                    <Div className="radio-box">
                                      <FormControlLabel
                                        value="no"
                                        control={<RedRadio />}
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

                  </AccordionDetails>
                </Accordion>
              </Div>
              {showButtons && (
                <Div w="90%" mgT="20px" just="flex-start">
                  <InputSubmit
                    w="160px"
                    h="50px"
                    back="rgb(85, 187, 151)"
                    type="submit"
                    value="submit"
                  />
                  <Div className="roomInfo-buttonArea" w="160px" mgL="20px">
                    <Button
                      w="100%"
                      h="50px"
                      border="lightgray"
                      back="lightgray"
                      backHov="gray"
                      colorHov="white"
                      color="white"
                      className="cancel-button"
                      onClick={resetForm}
                    >
                      Cancel
                    </Button>
                  </Div>
                </Div>
              )}

            </form>
          </div>
        </>
      </div>
    </Layout>
  );
};

export default Settings;
