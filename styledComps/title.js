import styled from 'styled-components';

const Title = styled.h1`
    font-size: 30px;
    font-weight: ${props => (props.bold ? '700' : '400')};
    color: black;
`;

export default Title;