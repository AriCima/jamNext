/* eslint-disable react/prop-types */
import React from 'react';

import {
  Div, Select, FormError, Label,
} from '../../styledComps';

const FormSelect = ({
 options, labelW, labelMgR, labelJust, labelAlign, col, w, mgT, mgB, mgL, mgR, label, name, error, errorMessage, register, registerObject, type = 'text', pad, modifiedValue
}) => {
  const optionsList = options.map((el) => (
    <option key={el.id} value={el.id}>{el.name}</option>
  ));

  const handleChange = (e) => {
    modifiedValue && modifiedValue(e.target.value);
  };

  return (
    <Div
      col={col}
      w={w}
      mgT={mgT}
      mgL={mgL}
      mgR={mgR}
      mgB={mgB}
      just="center"
      align="center"
    >
      <Div
        col
        w={labelW}
        mgR={labelMgR}
        just={labelJust}
        align={labelAlign}
      >
        <Label>{label}</Label>
        {error && <FormError bold>{errorMessage}</FormError>}
      </Div>
      <Select
        w="100%"
        pad={pad}
        type={type}
        name={name}
        mgB="0"
        ref={register(registerObject)}
        onChange={(e) => handleChange(e)}
      >
        {optionsList}
      </Select>
    </Div>
  );
};

export default FormSelect;
