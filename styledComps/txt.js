import styled from 'styled-components';

const Txt = styled.h1`
    font-size: 1rem;
    font-weight: ${props => (props.bold ? '700' : '400')};
    color: black;
`;

export default Txt;