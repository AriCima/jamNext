import styled from 'styled-components';

// FORMATO

const Input = styled.input`
    display: block;
    background-color: ${props => props.back ? props.back : 'rgba(240, 239, 235, 0.6)'};
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.16);
    padding: 10px 15px;
    margin-bottom: 10px;
    width: ${props => props.w ? props.w : '100%'};
` 

// ::placeholder{
//     color: $lightGray;
// }
  
export default Input;