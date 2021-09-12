import styled from 'styled-components';

const Button = styled.button`
    role: button;
    height: ${({h}) => h || 'auto'};
    width: ${({w}) => w || 'auto'};
    padding: ${({pad}) => pad || '15px'};
    margin: ${({mg}) => mg || '0'};
    margin-right: ${({mgR}) => mgR || '0'};
    margin-left: ${({mgL}) => mgL || '0'};
    color: ${({color}) => color || 'black'};
    background-color: ${({back}) => back || 'transparent'};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: ${({ border }) => `1px solid ${border}` || 'none'};
    border-radius: 5px;
    &:hover{
        background-color: ${({ backHov }) => backHov || 'white'};
        color: ${({ colorHov }) => colorHov || 'white'};
        border: ${({ borderHov }) => borderHov || 'black'};
    }
}`;

export default Button;
// flex-direction: ${props => (props.col ? 'column' : 'row')};