import styled from 'styled-components';

const Button = styled.button`
    role: button;
    height: ${({h}) => h || 'auto'};
    width: ${({w}) => w || 'auto'};
    padding: ${({pad}) => pad || '0'};
    margin: ${({mg}) => mg || '0'}
    color: ${({color}) => color || 'black'};
    background-color: ${({back}) => back || 'transparent'};
    display: 'flex';
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    border: ${({border}) => `1px solid ${border}` || 'none'};
    &:hover{
        background-color: rgb(85, 187, 151);
        color: white;
    }
}`

export default Button;
// flex-direction: ${props => (props.col ? 'column' : 'row')};