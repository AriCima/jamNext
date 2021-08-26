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
import { setActiveSection } from '../../../redux/actions/jamActions';
import Layout from '../../../domains/Layout';
import {
  Div, Button, Title, FormRow, InputSubmit, Table,
} from '../../../styledComps';
import NavBarJam from '../../../domains/NavBarJam';

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
  details: {
    flexDirection: 'column',
  },
}));

const Settings = () => {
  const classes = useStyles();
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

  const { jamRules, contractInfo } = jamDetails;
  const { landlordInfo, apartmentInfo } = contractInfo;

  const [selectedCountry, setSelectedCountry] = useState('');
  const [ctMode, setContractMode] = useState('');

  const getJamInfo = async () => {
    console.log('launched SETTINGS');
    const res = await DataService.getJamInfoById(jamId);
    dispatch(setJamInfo(res));
  };

  useEffect(() => {
    jamId && getJamInfo(jamId);
    dispatch(setActiveSection('settings'));
  }, [jamId]);

  const {
    checkInProcess,
    checkOutProcess,
    checkInFrom,
    checkInTo,
    checkOutBefore,
    contractMode,
    pets,
    smoking,
    smokingBalcony,
    overnight,
    parties,
  } = jamRules;

  const defaultValues = {
    jamName,
    jamDesc,
    jamCode,
    landlordFirstName: landlordInfo.firstName,
    landlordLastName: landlordInfo.lastName,
    landlordDocType: landlordInfo.docType,
    landlordDocNr: landlordInfo.docNr,
    landlordAddress: landlordInfo.address,
    landlordCity: landlordInfo.city,
    landlordZipCode: landlordInfo.zipCode,
    landlordCountry: landlordInfo.country,
    landlordtitle: landlordInfo.title,
    checkInProcess,
    checkOutProcess,
    checkInFrom,
    checkInTo,
    checkOutBefore,
    contractMode,
    pets,
    smoking,
    smokingBalcony,
    overnight,
    parties,
    address: jamDetails.address,
    city: jamDetails.city,
    country: jamDetails.country,
    zipCode: jamDetails.zipCode,
    inviteFriends: jamDetails.jamRules.inviteFriends,
  };

  const {
    register, errors, handleSubmit, control,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    console.log('data', data);
    // const {
    //   address,
    //   city,
    //   zipCode,
    //   country,
    //   // checkInFrom,
    //   // checkInProcess,
    //   // checkInTo,
    //   // checkOutBefore,
    //   // checkOutProcess,
    //   // contractMode,
    //   landlordTitle,
    //   landlordFirstName,
    //   landlordLastName,
    //   landlordDocType,
    //   landlordDocNr,
    //   landlordAddress,
    //   landlordCity,
    //   landlordZipCode,
    //   landlordCountry,
    //   jamDesc,
    //   jamName,
    //   overnight,
    //   parties,
    //   pets,
    //   smoking,
    //   smokingBalcony,
    //   inviteFriends,
    // } = data;

    // data.jamCode = jamCode;

    // const editJamMainInfo = jamName !== defaultValues.jamName || jamDesc !== defaultValues.jamDesc || contractMode !== defaultValues.contractMode;
    // const editLandlordInfo = landlordFirstName !== defaultValues.landlordFirstName || landlordLastName !== defaultValues.landlordLastName || landlordDocType !== defaultValues.landlordDocType || landlordDocNr !== defaultValues.landlordDocNr || landlordAddress !== defaultValues.landlordAddress || landlordCity !== defaultValues.landlordCity || landlordZipCode !== defaultValues.landlordZipCode || landlordCountry !== defaultValues.landlordCountry || landlordTitle !== defaultValues.landlordTitle;
    // const editJamDetails = address !== defaultValues.address || city !== defaultValues.city || zipCode !== defaultValues.zipCode || country !== defaultValues.country;

    // const editHouseRules = (
    //   checkInProcess !== defaultValues.checkInProcess || checkOutProcess !== defaultValues.checkOutProcess
    //     || checkInFrom !== defaultValues.checkInFrom || checkInTo !== defaultValues.checkInTo
    //     || checkOutBefore !== defaultValues.checkOutBefore || pets !== defaultValues.pets
    //     || parties !== defaultValues.parties || overnight !== defaultValues.overnight
    //     || smokingBalcony !== defaultValues.smokingBalcony || smoking !== defaultValues.smoking || inviteFriends !== defaultValues.inviteFriends
    // );

    // if (editLandlordInfo) {
    //   const info = {
    //     title: landlordTitle,
    //     name: landlordFirstName,
    //     lastName: landlordLastName,
    //     docType: landlordDocType,
    //     docNr: landlordDocNr,
    //     address: landlordAddress,
    //     city: landlordCity,
    //     zipCode: landlordZipCode,
    //     country: landlordCountry,
    //   };
    //   DataService.editLandlordInfo(jamId, info);
    // }
    // if (editJamMainInfo) {
    //   const info = { jamName, jamDesc };
    //   DataService.editJamMainInfo(jamId, info);
    // }
    // if (editJamDetails) {
    //   const info = {
    //     address, city, zipCode, country, contractMode,
    //   };
    //   DataService.editJamDetails(jamId, info);
    // }
    // if (editHouseRules) {
    //   const info = {
    //     checkInFrom,
    //     checkInProcess,
    //     checkInTo,
    //     checkOutBefore,
    //     checkOutProcess,
    //     overnight,
    //     parties,
    //     pets,
    //     smoking,
    //     smokingBalcony,
    //     inviteFriends,
    //   };
    //   DataService.editJamHouseRules(jamId, info);
    // }
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
                <Accordion
                  className={classes.accordion}
                  expanded={expanded === 'panel1'}
                  onChange={handleChange('panel1')}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
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

                <Accordion className={classes.accordion} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography className={expanded === 'panel2' ? classes.expHeading : classes.heading}>Apartment location</Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.details}>
                    <FormRow>
                      <FormInput
                        w="100%"
                        label="Address (Street, house nr, floor, door, . . . )"
                        placeholder={defaultValues.address}
                        type="text"
                        name="address"
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
                        placeholder={defaultValues.city}
                        type="text"
                        name="city"
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
                        placeholder={defaultValues.zipCode}
                        type="text"
                        name="zipCode"
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
                        name="country"
                        type="text"
                        error={errors.country}
                        errorMessage="Please select a country"
                        register={register}
                        registerObject={{ required: true }}
                        options={countries}
                        reportValue={(val) => setSelectedCountry(val)}
                        modifiedValue={() => setShowButtons(true)}
                      />

                    </FormRow>
                  </AccordionDetails>
                </Accordion>

                <Accordion className={classes.accordion} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4a-content"
                    id="panel4a-header"
                  >
                    <Typography className={expanded === 'panel4' ? classes.expHeading : classes.heading}>Landlord information</Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.details}>

                    <FormRow className="settings-section-info row-section">
                      <FormSelect
                        w="20%"
                        mgR="20px"
                        label="Title"
                        name="landlordTitle"
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
                        name="landlordFirstName"
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
                        name="landlordLastName"
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
                        name="docType"
                        type="text"
                        error={errors.docType}
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
                        name="docNr"
                        error={errors.docNr}
                        errorMessage="A document Nr is mandatory"
                        register={register}
                        registerObject={{ required: true }}
                        modifiedValue={() => setShowButtons(true)}
                      />

                      <FormInput
                        w="60%"
                        label="Address (Street, house nr, floor, door . . .  "
                        type="text"
                        name="landlordAddress"
                        error={errors.landlordAddress}
                        errorMessage="Landlord address mandatory"
                        register={register}
                        registerObject={{ required: true }}
                        modifiedValue={() => setShowButtons(true)}
                      />

                    </FormRow>
                    <FormRow>

                      <FormInput
                        w="20%"
                        mgR="20px"
                        label="ZipCode"
                        type="text"
                        name="landlordZipCode"
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
                        name="landlordCountry"
                        type="text"
                        error={errors.landlordCountry}
                        errorMessage="Please select a country"
                        register={register}
                        registerObject={{ required: true }}
                        options={countries}
                        reportValue={(val) => setSelectedCountry(val)}
                        modifiedValue={() => setShowButtons(true)}
                      />
                      <FormInput
                        w="40%"
                        mgR="20px"
                        label="City"
                        type="text"
                        name="landlordCity"
                        mgR="20px"
                        error={errors.landlordCity}
                        errorMessage="Landlord city is mandatory"
                        register={register}
                        registerObject={{ required: true }}
                        modifiedValue={() => setShowButtons(true)}
                      />
                    </FormRow>

                  </AccordionDetails>

                </Accordion>

                <Accordion className={classes.accordion} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                  >
                    <Typography className={expanded === 'panel3' ? classes.expHeading : classes.heading}>Check-in / Check-out procedures</Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.details}>

                    <FormRow>
                      <FormTextArea
                        w="100%"
                        label="Check-In procedure"
                        placeholder={defaultValues.checkInProcedure}
                        type="text"
                        name="checkInProcedure"
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
                        name="checkOutProcedure"
                        error={errors.checkOutProcedure}
                        errorMessage="Check-Out procedure is mandatory"
                        register={register}
                        modifiedValue={() => setShowButtons(true)}
                      />
                    </FormRow>
                    <FormRow>
                      <FormInput
                        w="20%"
                        label="Check-In from"
                        placeholder={defaultValues.checkInFrom}
                        type="text"
                        name="checkInFrom"
                        mgR="20px"
                        error={errors.checkInFrom}
                        register={register}
                        modifiedValue={() => setShowButtons(true)}
                      />

                      <FormInput
                        w="20%"
                        label="to"
                        placeholder={defaultValues.checkInTo}
                        type="text"
                        name="checkInTo"
                        mgR="20px"
                        error={errors.checkInTo}
                        register={register}
                        modifiedValue={() => setShowButtons(true)}
                      />

                      <FormSelect
                        w="60%"
                        label="Contract mode"
                        name="contractMode"
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

                <Accordion className={classes.accordion} expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
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
                              name="pets"
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
                              name="smoking"
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
                              name="smokingBalcony"
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
                              name="inviteFriends"
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
                            <label>Can tenants have guest to overnight in the apartment ?</label>
                          </td>
                          <td style={{ textAlign: 'right' }}>

                            <Controller
                              name="overnight"
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
                              name="parties"
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
                      onClick={(e) => { e.preventDefault(); setShowButtons(false); }}
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
