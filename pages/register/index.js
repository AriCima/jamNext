import React from 'react';
import {useForm} from "react-hook-form";
import { connect } from 'react-redux';

import DataService from '../../services/DataService';
import AuthService from '../../services/AuthService';
import { setUserInfo } from '../../redux/actions/userActions.js';
import Input from '../../styledComps/input';

const useRegisterForm = ({setUserInfo}) => {

  const { register, errors, getValues, handleSubmit } = useForm();

  const onRegister = (data) => {  
    const {firstName, lastName, email, password }= data;  
    DataService.checkIfEmialExists(email)
    .then(exists => {
      if (exists === true) {
        alert('el email ya existe')
        return;
      } else {
        AuthService.register(firstName, lastName, email, password)
        .then(userInfo => {
          setUserInfo(userInfo);
          localStorage.setItem('userInfo', userInfo);
        })
      }
    })
  };

  return (

    <form
      autocomplete="off"
      className="register-hook-form"
      onSubmit={handleSubmit(onRegister)}
    >
      <div className="register-form-section">
          <div className="form-section-title">
              <p>Register and start jamin'</p>
          </div>

          <div className="register-form-line">
              <div className="custom-input-block">
                  <div className="block-label">
                      <label>First name</label>
                      {errors.firstName && <div className="field-error">Required</div>}
                  </div>
                  <Input
                    w="100%"
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
                  <Input
                    w="100%"
                    name="lastName"
                    ref={register({ 
                        required: true,
                    })}
                  />
              </div>
          </div>
          <div className="form-column">
              <div className="register-block-long">
                  <div className="block-label">
                      <label>Email</label>
                      {errors.email && <div className="field-error">Non valid address</div>}
                  </div>
                  <Input
                    w="100%"
                    name="email"
                    ref={register({ 
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                  />
              </div>
              <div className="register-block-long">
                  <div className="block-label">
                      <label>Password</label>
                      {errors.password && <div className="field-error">Non valid password</div>}
                  </div>
                  <Input
                    w="100%"
                    name="password" 
                    ref={register({ 
                      required: true,
                      pattern: '',
                    })}
                  />
              </div>
              <div className="register-block-long">
                <div className="block-label">
                    <label>Confirm Password</label>
                    {errors.confirmPassword && <div className="field-error">{errors.confirmPassword.message}</div>}
                </div>
                <Input
                    w="100%"
                    name="confirmPassword" 
                    ref={register({ 
                        required: true,
                        pattern: '',
                        validate: {
                        matchesPreviousPassword: value => {
                            const { password } = getValues();
                            return password === value || "Passwords should match!";
                        }
                        }
                    })}
                />
            </div>
          </div>
      </div>
      <div className="hook-form-buttonArea">
        <Input
            back='rgb(85, 187, 151)'
            type="submit"
        />
      </div>
    </form>
  );
};



export default connect (null, {setUserInfo})(useRegisterForm);