import React from 'react';
import {
  Input, Div, FormError, Label,
} from '../../styledComps';

const FormInput = ({
  w, mgL, mgR, mgBI, label, name, pad, error, errorMessage, register, placeholder = '', value, registerObject, type = 'text', disabled, modifiedValue, reportNewValue
}) => {
  const reportChange = (val) => {
    modifiedValue && modifiedValue(true);
    reportNewValue && reportNewValue(val) 
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
      <Input
        w="100%"
        pad={pad}
        type={type}
        name={name}
        value={value}
        mgBI={mgBI}
        placeholder={placeholder}
        ref={register(registerObject)}
        disabled={disabled}
        onChange={(e) => reportChange(e.target.value)}
      />
    </Div>
  );
};

export default FormInput;
