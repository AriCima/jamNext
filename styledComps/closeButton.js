import styled from 'styled-components';

const CloseButton = styled.button`
    font-size: 30px;
    font-weight: 700;
    height: ${({h}) => h || 'auto'};
    width: ${({w}) => w || 'auto'};
    padding: ${({pad}) => pad || '0'};
    margin: ${({mg}) => mg || '0'}
    color: ${({color}) => color || 'black'};
    background-color: ${({back}) => back || 'transparent'};
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    border: none;
    transform: rotate(45deg)
}`

export default CloseButton;
