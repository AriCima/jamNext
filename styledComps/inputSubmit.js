import styled from 'styled-components';

const InputSubmit = styled.input`
    display: block;
    background-color: rgba(85, 187, 151, 0.8);
    box-sizing: border-box;
    border: 1px solid rgba(85, 187, 151, 0.8);
    padding: 15px;
    font-weight: 700;
    color: white;
    margin-bottom: 10px;
    width: ${({w}) => w || '100%'};
    font-size: 1rem;
    &:hover{
        background-color: rgba(85, 187, 151, 1);
    }
` 
export default InputSubmit;