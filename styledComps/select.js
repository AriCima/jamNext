import styled from 'styled-components';

const Select = styled.select`
    display: block;
    background-color: ${({back}) => back || 'rgba(240, 239, 235, 0.6)'};
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.16);
    padding: ${({pad}) => pad || '15px'};
    margin-bottom: ${({mgB}) => mgB || '10px'};
    width: ${({w}) => w || '100%'};
    option {
        color: black;
        background: white;
        display: flex;
        white-space: pre;
        min-height: 20px;
        padding: 0px 2px 1px;
    }
` 
export default Select;