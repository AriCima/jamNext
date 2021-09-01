import React from 'react';
import {
  TextArea, Div, FormError, Label,
} from '../../styledComps';

const FormInput = ({
  w, mgL, mgR, label, name, error, errorMessage, register, placeholder = '', registerObject, type = 'text', disabled, modifiedValue,
}) => {
  const handleChange = (e) => {
    modifiedValue(e.target.value);
  };

  return (
    <Div
      col
      w={w}
      mgL={mgL}
      mgR={mgR}
      just="center"
      align="center"
    >
      <Div
        col
        w="100%"
        just="center"
        align="flex-start"
      >
        <Label disabled={disabled}>{label}</Label>
        {error && <FormError bold>{errorMessage}</FormError>}
      </Div>
      <TextArea
        w="100%"
        type={type}
        name={name}
        placeholder={placeholder}
        ref={register(registerObject)}
        disabled={disabled}
        onChange={(e) => handleChange(e)}
      />
    </Div>
  );
};

export default FormInput;
