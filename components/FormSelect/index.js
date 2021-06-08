/* eslint-disable react/prop-types */
import React from 'react';

import {
  Div, Select, FormError, Label,
} from '../../styledComps';

const FormSelect = ({
  reportValue, options, w, mgL, mgR, label, name, error, errorMessage, register, registerObject, type = 'text',
}) => {
  const optionsList = options.map((el) => (
    <option key={el.id} value={el.id}>{el.name}</option>
  ));

  const handleChange = (e) => {
    reportValue(e.target.value);
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
        <Label>{label}</Label>
        {error && <FormError bold>{errorMessage}</FormError>}
      </Div>
      <Select
        w="100%"
        type={type}
        name={name}
        ref={register(registerObject)}
        onChange={(e) => handleChange(e)}
      >
        {optionsList}
      </Select>
    </Div>
  );
};

export default FormSelect;
