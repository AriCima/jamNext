import React from 'react';
import {useForm} from "react-hook-form";
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import DataService from '../../services/DataService';
import AuthService from '../../services/AuthService';
import { setUserInfo } from '../../redux/actions/userActions.js';

import { Div, InputSubmit, SubTitle, Txt, Button } from '../../styledComps';
import FormInput from '../../components/FormInput';

const Register = ({updateView, setUserInfo}) => {

  const { register, errors, getValues, handleSubmit } = useForm();

  const onRegister = (data) => {  
    console.log('data: ', data);
    const {firstName, lastName, email, password } = data;  

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
          router.push('/dashboard')
        })
      }
    })
  };

  const router = useRouter()

  const navigateTo = (e) => {
      e.preventDefault();
      router.push('login')
  };

  const formStyle = {
    display: 'flex',
    width: '100%',
    justifyContent: 'center'
  }

  return (

    <Div col w="100%" just="center" align="center">
      <form style={formStyle} autoComplete="off" onSubmit={handleSubmit(onRegister)}>
        <Div w="50%" col just="center" align="center">
          <SubTitle>Register and start jamin'</SubTitle>
          <Div col w="100%" just="center" align="center">
            <FormInput
              w="100%"
              label="First Name"
              name="firstName"
              type='text'
              error={errors.firstName}
              errorMessage="Debe ingresar un nombre"
              register={register}
              registerObject={{ required: true}}
            />
             <FormInput
              w="100%"
              label="Last name"
              name="lastName"
              type='text'
              error={errors.lastName}
              errorMessage="Debe ingresar un apellido"
              register={register}
              registerObject={{ required: true}}
            />
              <FormInput
                  w="100%"
                  label="Email"
                  name="email"
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
                  label="Password"
                  name="password"
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
                label="Confirm password"
                name="confirmPassword"
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

          <InputSubmit
            w="100%"
            back='rgb(85, 187, 151)'
            type="submit"
            value="Submit"
          />

        </Div>
      </form>
      <Div col w="100%" align="center" just="center" mgT="20px">
        <Div just="flex-start" w="50%">
          <Txt fSize="10px">Already have an account ? Then login here: </Txt>
        </Div>
        <Button
          onClick={e => navigateTo(e)}
          border='rgb(85, 187, 151)'
          color='rgb(85, 187, 151)'
          w='50%'
        >
            <Txt color="gray">Login</Txt>
        </Button>
      </Div>
    </Div>
  );
};



export default connect (null, {setUserInfo})(Register);