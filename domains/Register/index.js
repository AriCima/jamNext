import React from 'react';
import {useForm} from "react-hook-form";
import { connect } from 'react-redux';

import DataService from '../../services/DataService';
import AuthService from '../../services/AuthService';
import { setUserInfo } from '../../redux/actions/userActions.js';

import { Div, Input, SubTitle, Txt, Button } from '../../styledComps';
import FormInput from '../../components/FormInput';

const useRegisterForm = ({updateView, setUserInfo}) => {

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

    <Div col w="100%">
      <form autoComplete="off"  onSubmit={handleSubmit(onRegister)}>
        <Div col>
          <SubTitle>Register and start jamin'</SubTitle>

          <Div col align="flex-start">
            <FormInput
              w="100%"
              label="first name"
              type='text'
              error={errors.firstName}
              errorMessage="Debe ingresar un nombre"
              register={register}
              registerObject={{ required: true}}
            />
             <FormInput
              w="100%"
              label="last name"
              type='text'
              error={errors.lastName}
              errorMessage="Debe ingresar un apellido"
              register={register}
              registerObject={{ required: true}}
            />
              <FormInput
                  w="100%"
                  label="email"
                  // type='email'
                  error={errors.email}
                  errorMessage="Email no válido"
                  register={register}
                  registerObject={{ 
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  }}
              />

              <FormInput
                w="100%"
                  label="password"
                  type='password'
                  error={errors.password}
                  errorMessage="Non valid password"
                  register={register}
                  registerObject={{
                      required: true,
                      pattern: '',

                  }}
              />
              <FormInput
                w="100%"
                label="confirm password"
                type='password'
                error={errors.confirmPassword}
                errorMessage="Non valid password"
                register={register}
                registerObject={{
                    required: true,
                    pattern: '',

                }}
                validate={{
                  matchesPreviousPassword: value => {
                    const { password } = getValues();
                    return password === value || "Passwords should match!";
                  }}}
              />
              {/* <div className="register-block-long">
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
            </div> */}
          </Div>

          <Div just='flex-start'>
            <Input
              back='rgb(85, 187, 151)'
              type="submit"
            />
          </Div>
        </Div>
      </form>
    </Div>
  );
};



export default connect (null, {setUserInfo})(useRegisterForm);