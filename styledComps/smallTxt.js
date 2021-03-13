import styled from 'styled-components';

const smallTxt = styled.h1`
    font-size: .825rem;
    font-weight: ${props => (props.bold ? '700' : '400')};
    color: black;
`;

export default smallTxt;