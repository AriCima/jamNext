import styled from 'styled-components';

// FORMATO

const Input = styled.input(props => ({
    display: 'block',
    backgroundColor: props.back ? props.back : 'rgba(240, 239, 235, 0.6)',
    boxSizing: 'border-box',
    border: '1px solid rgba(0, 0, 0, 0.16)',
    padding: '10px 15px',
    marginBottom: '10px',
    width: props.w ? props.w : '100%',
})) 


// ::placeholder{
//     color: $lightGray;
// }
  

export default Input;