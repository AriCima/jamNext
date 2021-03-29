import styled from 'styled-components';

const SmallTxt = styled.h1`
    font-size: .825rem;
    font-weight: ${props => (props.bold ? '700' : '400')};
    color: black;
    margin: ${({mg}) => mg || '0'}
    padding: ${({pad}) => pad || '0'};
`;

export default SmallTxt;