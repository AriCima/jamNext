import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import DataService from '../../../services/DataService';
import Calculations from '../../../services/Calculations';

import FormInput from '../../../components/FormInput';
import FormSelect from '../../../components/FormSelect';
import FormTextArea from '../../../components/FormTextArea';

import { setJamInfo } from '../../../redux/actions';
import { setActiveSection } from '../../../redux/actions/jamActions';
import Layout from '../../../domains/Layout';
import {
  Div, SubTitle, Button, FormSection, FormSubtitle, FormRow,
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

const Settings = () => {
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
    console.log('res SETTINGS: ', res);
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
    width: '100%',
    justifyContent: 'center',
  };

  const countries = Calculations.getSelectOptions('countries');
  const contracts = Calculations.getSelectOptions('contracts');

  return (
    <Layout>
      <NavBarJam />
      <>
        <form
          style={formStyle}
          autoComplete="off"
          className="settings-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Div className="settings-form-header" w="100%" col just="center" align="flex-start">
            <SubTitle>
              Manage all the information about
              <span>{jamName}</span>
              {' '}
              here
            </SubTitle>

            <FormSection className="settings-section">
              <FormSubtitle>Jam info</FormSubtitle>
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
                />

              </FormRow>
            </FormSection>

            <FormSection>
              <FormSubtitle mg="20px 0 0 0 ">Apartment info</FormSubtitle>
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
                />

              </FormRow>
            </FormSection>

            <FormSection className="settings-section">
              <FormSubtitle>House rules</FormSubtitle>
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
                />
              </FormRow>

            </FormSection>

            <FormSection className="landlordSection">

              <FormSubtitle>Landlord information</FormSubtitle>

              <FormRow className="settings-section-info row-section">
                <FormSelect
                  w="50%"
                  label="Title"
                  name="landlordTitle"
                  type="text"
                  error={errors.landlordTitle}
                  errorMessage="Please select a title"
                  register={register}
                  registerObject={{ required: true }}
                  reportValue={(val) => setTitle(val)}
                  options={[{ id: 'mr', name: 'Mr' }, { id: 'mrs', name: 'Mrs' }]}
                />

                <FormInput
                  w="100%"
                  label="Landlord name"
                  type="text"
                  name="landlordFirstName"
                  error={errors.landlordFirstName}
                  errorMessage="Landlord name is mandatory"
                  register={register}
                  registerObject={{ required: true }}
                />

                <FormInput
                  w="100%"
                  label="Landlord last name"
                  type="text"
                  name="landlordLastName"
                  error={errors.landlordLastName}
                  errorMessage="Landlord last name is mandatory"
                  register={register}
                  registerObject={{ required: true }}
                />
              </FormRow>

              <FormRow>

                <FormSelect
                  w="50%"
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
                />

                <FormInput
                  w="100%"
                  label="Document Nr"
                  type="text"
                  name="docNr"
                  error={errors.docNr}
                  errorMessage="A document Nr is mandatory"
                  register={register}
                  registerObject={{ required: true }}
                />

                <FormInput
                  w="100%"
                  label="Address (Street, house nr, floor, door . . .  "
                  type="text"
                  name="landlordAddress"
                  error={errors.landlordAddress}
                  errorMessage="Landlord address mandatory"
                  register={register}
                  registerObject={{ required: true }}
                />

              </FormRow>
              <FormRow>

                <FormInput
                  w="70%"
                  label="ZipCode"
                  type="text"
                  name="landlordZipCode"
                  mgR="20px"
                  error={errors.landlordZipCode}
                  errorMessage="Landlord zipCode is mandatory"
                  register={register}
                  registerObject={{ required: true }}
                />

                <FormSelect
                  w="50%"
                  label="Country"
                  name="landlordCountry"
                  type="text"
                  error={errors.landlordCountry}
                  errorMessage="Please select a country"
                  register={register}
                  registerObject={{ required: true }}
                  options={countries}
                  reportValue={(val) => setSelectedCountry(val)}
                />
                <FormInput
                  w="70%"
                  label="City"
                  type="text"
                  name="landlordCity"
                  mgR="20px"
                  error={errors.landlordCity}
                  errorMessage="Landlord city is mandatory"
                  register={register}
                  registerObject={{ required: true }}
                />
              </FormRow>

            </FormSection>

            <FormSection className="settings-section">
              <Div className="settings-content rules">
                <Div className="jamRules-form-section">
                  <Div className="form-col">

                    <table id="jamRules-table">
                      <tr>
                        <th>
                          <p>House rules</p>
                        </th>
                        <th className="rules-value">
                          <Div className="header-values-wrapper">
                            <Div className="value-box">
                              <p>YES</p>
                            </Div>
                            <Div className="value-box">
                              <p>NO</p>
                            </Div>
                          </Div>
                        </th>
                      </tr>
                      <tr>
                        <td id="rules-text">
                          <label>Are pets allowed in the flat ?</label>
                        </td>
                        <td id="rules-value">
                          <section>
                            <Controller
                              name="pets"
                              control={control}
                              defaultValue={defaultValues.pets}
                              as={(
                                <RadioGroup aria-label="pets">
                                  <Div className="radios-wrapper">
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
                          </section>
                        </td>
                      </tr>
                      <tr>
                        <td id="rules-text">
                          <label>Can tenants smoke in the apartment ?</label>
                        </td>
                        <td id="rules-value">
                          <section>
                            <Controller
                              name="smoking"
                              control={control}
                              defaultValue={defaultValues.smoking}

                              as={(
                                <RadioGroup aria-label="smoking">
                                  <Div className="radios-wrapper">
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
                          </section>
                        </td>
                      </tr>
                      <tr>
                        <td id="rules-text">
                          <label>Can tenants smoke in balconies or terraces ?</label>
                        </td>
                        <td id="rules-value">
                          <section>
                            <Controller
                              name="smokingBalcony"
                              control={control}
                              defaultValue={defaultValues.smokingBalcony}

                              as={(
                                <RadioGroup aria-label="smokingBalcony">
                                  <Div className="radios-wrapper">
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
                          </section>
                        </td>
                      </tr>
                      <tr>
                        <td id="rules-text">
                          <label>Can tenants invite firends to the apartment ? </label>
                        </td>
                        <td id="rules-value">
                          <section>
                            <Controller
                              name="inviteFriends"
                              control={control}
                              defaultValue={defaultValues.inviteFriends}

                              as={(
                                <RadioGroup aria-label="inviteFriends">
                                  <Div className="radios-wrapper">
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
                          </section>
                        </td>
                      </tr>
                      <tr>
                        <td id="rules-text">
                          <label>Can tenants have guest to overnight in the apartment ?</label>
                        </td>
                        <td id="rules-value">
                          <section>
                            <Controller
                              name="overnight"
                              control={control}
                              defaultValue={defaultValues.overnight}

                              as={(
                                <RadioGroup aria-label="overnight">
                                  <Div className="radios-wrapper">
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
                          </section>
                        </td>
                      </tr>
                      <tr>
                        <td id="rules-text">
                          <label>Can tenants organize or participate in parties in the apartment ? </label>
                        </td>
                        <td id="rules-value">
                          <section>
                            <Controller
                              name="parties"
                              control={control}
                              defaultValue={defaultValues.parties}

                              as={(
                                <RadioGroup aria-label="parties">
                                  <Div className="radios-wrapper">
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
                          </section>
                        </td>
                      </tr>
                    </table>

                  </Div>
                </Div>
              </Div>
            </FormSection>

          </Div>

        </form>
      </>
    </Layout>
  );
};

export default Settings;
