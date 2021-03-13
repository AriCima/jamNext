import styled from 'styled-components';

const subTitle = styled.h1`
    font-size: 1.5rem;
    font-weight: ${props => (props.bold ? '700' : '400')};
    color: black;
`;

export default subTitle;