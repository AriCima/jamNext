import styled from 'styled-components';

const Label = styled.h1`
    font-size: 16px;
    font-weight: ${props => (props.bold ? '700' : '400')};
    color: ${({ disabled }) => (disabled ? 'lightgray' : 'gray')};

`;

export default Label;