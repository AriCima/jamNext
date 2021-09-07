import styled from 'styled-components';

const AnchorText = styled.a`
    role: button;
    margin: ${({ mg }) => mg || '0'};
    color: ${({ color }) => color || 'black'};
    background-color: none;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
        color:#FCA311;
        text-decoration: underline;
        cursor: pointer;
    }
    transition: 0.2s;
}`;

export default AnchorText;
