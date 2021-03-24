import styled from 'styled-components';

const Input = styled.input`
    display: block;
    background-color: ${({back}) => back || 'rgba(240, 239, 235, 0.6)'};
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.16);
    padding: 15px;
    margin-bottom: 10px;
    width: ${({w}) => w || '100%'};
` 
export default Input;