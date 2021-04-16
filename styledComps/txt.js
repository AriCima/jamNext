import styled from 'styled-components';

const Txt = styled.p`
    font-size: ${({fSize}) => fSize || '1rem'};
    font-weight: ${props => (props.bold ? '700' : '400')};
    margin: ${({mg}) => mg || '0'};
    padding: ${({pad}) => pad || '0'};
    color: ${({color}) => color || 'black'};;
`;

export default Txt;