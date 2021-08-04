import React, { useEffect } from 'react';
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

import { setJamInfo } from '../../../redux/actions';
import { setActiveSection } from '../../../redux/actions/jamActions';
import Layout from '../../../domains/Layout';
import {
  Div, Txt, SubTitle, Button, FormSection, FormSubtitle, FormRow,
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
  const {
    jamDetails, jamName, jamDesc, jamCode,
  } = useSelector((state) => state.jamReducer);
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [contractMode, setContractMode] = useState('');


  const router = useRouter();
  const { jamId } = router.query;

  const getJamInfo = async () => {
    const res = await DataService.getJamInfoById(jamId);
    dispatch(setJamInfo(res));
  };

  useEffect(() => {
    jamId && getJamInfo(jamId);
    dispatch(setActiveSection('settings'));
  }, [jamId]);

  const [disabled, setDisabled] = useState(true);

  const enableEditForm = (x) => {
    setDisabled(!x);
  };

  const { houseRules, landlordInfo } = jamDetails;
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
  } = houseRules;

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
    inviteFriends: jamDetails.houseRules.inviteFriends,
  };

  const {
    register, errors, handleSubmit, control,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    const {
      address,
      city,
      zipCode,
      country,
      checkInFrom,
      checkInProcess,
      checkInTo,
      checkOutBefore,
      checkOutProcess,
      contractMode,
      landlordTitle,
      landlordFirstName,
      landlordLastName,
      landlordDocType,
      landlordDocNr,
      landlordAddress,
      landlordCity,
      landlordZipCode,
      landlordCountry,
      jamDesc,
      jamName,
      overnight,
      parties,
      pets,
      smoking,
      smokingBalcony,
      inviteFriends,
    } = data;

    data.jamCode = jamCode;

    const editJamMainInfo = jamName !== defaultValues.jamName || jamDesc !== defaultValues.jamDesc || contractMode !== defaultValues.contractMode;
    const editLandlordInfo = landlordFirstName !== defaultValues.landlordFirstName || landlordLastName !== defaultValues.landlordLastName || landlordDocType !== defaultValues.landlordDocType || landlordDocNr !== defaultValues.landlordDocNr || landlordAddress !== defaultValues.landlordAddress || landlordCity !== defaultValues.landlordCity || landlordZipCode !== defaultValues.landlordZipCode || landlordCountry !== defaultValues.landlordCountry || landlordTitle !== defaultValues.landlordTitle;
    const editJamDetails = address !== defaultValues.address || city !== defaultValues.city || zipCode !== defaultValues.zipCode || country !== defaultValues.country;

    const editHouseRules = (
      checkInProcess !== defaultValues.checkInProcess || checkOutProcess !== defaultValues.checkOutProcess
        || checkInFrom !== defaultValues.checkInFrom || checkInTo !== defaultValues.checkInTo
        || checkOutBefore !== defaultValues.checkOutBefore || pets !== defaultValues.pets
        || parties !== defaultValues.parties || overnight !== defaultValues.overnight
        || smokingBalcony !== defaultValues.smokingBalcony || smoking !== defaultValues.smoking || inviteFriends !== defaultValues.inviteFriends
    );

    if (editLandlordInfo) {
      const info = {
        title: landlordTitle,
        name: landlordFirstName,
        lastName: landlordLastName,
        docType: landlordDocType,
        docNr: landlordDocNr,
        address: landlordAddress,
        city: landlordCity,
        zipCode: landlordZipCode,
        country: landlordCountry,
      };
      DataService.editLandlordInfo(jamId, info);
    }
    if (editJamMainInfo) {
      const info = { jamName, jamDesc };
      DataService.editJamMainInfo(jamId, info);
    }
    if (editJamDetails) {
      const info = {
        address, city, zipCode, country, contractMode,
      };
      DataService.editJamDetails(jamId, info);
    }
    if (editHouseRules) {
      const info = {
        checkInFrom,
        checkInProcess,
        checkInTo,
        checkOutBefore,
        checkOutProcess,
        overnight,
        parties,
        pets,
        smoking,
        smokingBalcony,
        inviteFriends,
      };
      DataService.editJamHouseRules(jamId, info);
    }
  };

  const formStyle = {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  };

  const countries = Calculations.getSelectOptions('countries');
  const cotracts = Calculations.getSelectOptions('contracts');


  return (
    <Layout>
      <NavBarJam />
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



        <FormSection className="settings-section">
          <FormSubtitle>Jam Section</FormSubtitle>
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
              disabled={disabled}
            />
                        <FormInput
              w="70%"
              label="Jam Description"
              placeholder={defaultValues.jamDesc}
              type="text"
              name="jamDesc"
              mgR="20px"
              error={errors.jamDesc}
              errorMessage="Jam description is mandatory"
              register={register}
              registerObject={{ required: true }}
              disabled={disabled}
            />

            <FormInput
              w="70%"
              label="Apartment location"
              placeholder={defaultValues.address}
              type="text"
              name="address"
              mgR="20px"
              error={errors.address}
              errorMessage="Jam address is mandatory"
              register={register}
              registerObject={{ required: true }}
              disabled={disabled}
            />

            <FormInput
              w="70%"
              label="City"
              placeholder={defaultValues.city}
              type="text"
              name="city"
              mgR="20px"
              error={errors.city}
              errorMessage="Jam city is mandatory"
              register={register}
              registerObject={{ required: true }}
              disabled={disabled}
            />

            <FormInput
              w="70%"
              label="ZipCode"
              placeholder={defaultValues.zipCode}
              type="text"
              name="zipCode"
              mgR="20px"
              error={errors.zipCode}
              errorMessage="zipCode is mandatory"
              register={register}
              registerObject={{ required: true }}
              disabled={disabled}
            />


                <FormSelect
                  w="50%"
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

            <FormInput
              w="70%"
              label="Jam Code"
              placeholder={defaultValues.jamCode}
              type="text"
              name="jamCode"
              mgR="20px"
              error={errors.jamCode}
              register={register}
              disabled={true}
            />

          </FormRow>
        </FormSection>

        <FormSection className="settings-section">
              <FormSubtitle>House rules</FormSubtitle>
              <FormRow>
                <Div className="block-label">
                  <label>Check-In procedure</label>
                  {errors.checkInProcess && <Div className="field-error">Required</Div>}
                </Div>
                <textarea
                  name="checkInProcess"
                  ref={register({
                    required: true,
                  })}
                  disabled={disabled}
                />
    

                <Div className="block-label">
                  <label>Check-Out procedure</label>
                  {errors.checkOutProcess && <Div className="field-error">Required</Div>}
                </Div>
                <textarea
                  name="checkOutProcess"
                  ref={register({
                    required: true,
                  })}
                  disabled={disabled}
                />
              </FormRow>
              <FormRow>
  
                            <FormInput
                  w="70%"
                  label="Check-In from"
                  placeholder={defaultValues.checkInFrom}
                  type="text"
                  name="checkInFrom"
                  mgR="20px"
                  error={errors.checkInFrom}
                  register={register}
                  disabled={true}
                />

                  <FormInput
                    w="70%"
                    label="to"
                    placeholder={defaultValues.checkInTo}
                    type="text"
                    name="checkInTo"
                    mgR="20px"
                    error={errors.checkInTo}
                    register={register}
                    disabled={true}
                  />

                <FormSelect
                  w="50%"
                  label="Contract mode"
                  name="contractMode"
                  type="text"
                  error={errors.contractMode}
                  errorMessage="Please select the contract mode"
                  register={register}
                  registerObject={{ required: true }}
                  onChange={(e) => setJamType(e.target.value)}
                  reportValue={(val) => setContractMode(val)}
                  options={contracts}
                />

              </FormRow>
              



        </FormSection>

        <Div className="settings-section row-section">

          <Div className="settings-section-title">
            <Div className="backLine" />
            <dic className="title">
              <p>Landlord Info</p>
            </dic>
          </Div>

          <Div className="settings-section-info row-section">

            <Div className="rules-custom-input-block midWidth">
              <Div className="block-label">
                <label>Title</label>
                {errors.landlordTitle && <Div className="field-error">Required</Div>}
              </Div>
              <select className="input-styled" name="landlordTitle" ref={register} disabled={disabled}>
                <option value="Mr">Don</option>
                <option value="Mrs">Doña</option>
              </select>
            </Div>

            <Div className="rules-custom-input-block midWidth">
              <Div className="block-label">
                <label>Landlord name</label>
                {errors.landlordFirstName && <Div className="field-error">Required</Div>}
              </Div>
              <input name="landlordFirstName" ref={register({ required: true })} disabled={disabled} />
            </Div>

            <Div className="rules-custom-input-block midWidth">
              <Div className="block-label">
                <label>Landlord lastname</label>
                {errors.landlordLastName && <Div className="field-error">Required</Div>}
              </Div>
              <input name="landlordLastName" ref={register({ required: true })} disabled={disabled} />
            </Div>

            <Div className="rules-custom-input-block midWidth">
              <Div className="block-label">
                <label>Doc Type</label>
                {errors.title && <Div className="field-error">Required</Div>}
              </Div>
              <select className="input-styled" name="landlordDocType" ref={register} disabled={disabled}>
                <option value="passport">Passport</option>
                <option value="dni">DNI</option>
                <option value="dni">NIE</option>
              </select>
            </Div>

            <Div className="rules-custom-input-block midWidth">
              <Div className="block-label">
                <label>Doc Nr</label>
                {errors.landlordDocNr && <Div className="field-error">Required</Div>}
              </Div>
              <input name="landlordDocNr" ref={register({ required: true })} disabled={disabled} />
            </Div>

            <Div className="rules-custom-input-block midWidth">
              <Div className="block-label">
                <label>Landlord Address</label>
                {errors.landlordAddress && <Div className="field-error">Required</Div>}
              </Div>
              <input
                name="landlordAddress"
                ref={register({ required: true })}
                disabled={disabled}
                placeholder="Street, hosue nr, floor, door . . ."
              />
            </Div>

            <Div className="rules-custom-input-block short-block">
              <Div className="block-label">
                <label>City</label>
                {errors.landlordCity && <Div className="field-error">Required</Div>}
              </Div>
              <input
                name="landlordCity"
                ref={register({ required: true })}
                disabled={disabled}
              />
            </Div>
            <Div className="rules-custom-input-block short-block">
              <Div className="block-label">
                <label>ZipCode</label>
                {errors.landlordZipCode && <Div className="field-error">Required</Div>}
              </Div>
              <input
                name="landlordZipCode"
                ref={register({ required: true })}
                disabled={disabled}
              />
            </Div>
            <Div className="rules-custom-input-block short-block">
              <Div className="block-label">
                <label>Country</label>
                {errors.landlordCountry && <Div className="field-error">Required</Div>}
              </Div>
              <input
                name="landlordCountry"
                ref={register({ required: true })}
                disabled={disabled}
              />
            </Div>

          </Div>

        </Div>

        <Div className="settings-section">

          {/* <Div className="settings-section-title">
                      <Div className="backLine"/>
                      <dic className="title">
                          <p>HOUSE RULES</p>
                      </dic>
                  </Div> */}

          <Div className="settings-content rules">

            <Div className="houseRules-form-section">
              <Div className="form-col">
                {/* <Div className="houseRules-text">
                                  <p>Please activate the rules you want to apply to your apartment</p>
                                  <p>Activated rules will be shown in your tenant's <span>"Overview"</span> page</p>
                              </Div> */}
                <table id="houseRules-table">
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
                      <label>Can tenants smoke in the apartment ?</label>
                    </td>
                    <td id="rules-value">
                      <section>
                        <Controller
                          name="smoking"
                          control={control}
                          defaultValue={defaultValues.smoking}
                          disabled={disabled}
                          as={(
                            <RadioGroup aria-label="smoking">
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
                      <label>Can tenants smoke in balconies or terraces ?</label>
                    </td>
                    <td id="rules-value">
                      <section>
                        <Controller
                          name="smokingBalcony"
                          control={control}
                          defaultValue={defaultValues.smokingBalcony}
                          disabled={disabled}
                          as={(
                            <RadioGroup aria-label="smokingBalcony">
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
                      <label>Can tenants invite firends to the apartment ? </label>
                    </td>
                    <td id="rules-value">
                      <section>
                        <Controller
                          name="inviteFriends"
                          control={control}
                          defaultValue={defaultValues.inviteFriends}
                          disabled={disabled}
                          as={(
                            <RadioGroup aria-label="inviteFriends">
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
                      <label>Can tenants have guest to overnight in the apartment ?</label>
                    </td>
                    <td id="rules-value">
                      <section>
                        <Controller
                          name="overnight"
                          control={control}
                          defaultValue={defaultValues.overnight}
                          disabled={disabled}
                          as={(
                            <RadioGroup aria-label="overnight">
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
                      <label>Can tenants organize or participate in parties in the apartment ? </label>
                    </td>
                    <td id="rules-value">
                      <section>
                        <Controller
                          name="parties"
                          control={control}
                          defaultValue={defaultValues.parties}
                          disabled={disabled}
                          as={(
                            <RadioGroup aria-label="parties">
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
                </table>
              </Div>
            </Div>

          </Div>
        </Div>

      </form>
    </Layout>
  );
};

export default Settings;
