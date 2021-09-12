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
        color: ${({ hovCol }) => (hovCol || '#FCA311')};
        font-weight: 550;
        text-decoration: ${({ txtDeco }) => (txtDeco || '')};
        cursor: pointer;
    }
    transition: 0.2s;
}`;

export default AnchorText;
