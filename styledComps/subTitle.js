import styled from 'styled-components';

const SubTitle = styled.h1`
    font-size: 1.5rem;
    font-weight: ${props => (props.bold ? '700' : '400')};
    color: black;
    margin: ${({mg}) => mg || '0'}
    padding: ${({pad}) => pad || '0'};
`;

export default SubTitle;