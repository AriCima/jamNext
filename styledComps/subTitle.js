import styled from 'styled-components';

const SubTitle = styled.h1`
    font-size: 1.5rem;
    font-weight: ${props => (props.bold ? '700' : '400')};
    color: gray;
    margin: 0;
    margin-top: ${({mgT}) => mgT || '0'};
    margin-left: ${({mgL}) => mgL || '0'};
    margin-right: ${({mgR}) => mgR || '0'};
    margin-bottom: ${({mgB}) => mgB || '30px'};
    mgT
    padding: ${({pad}) => pad || '0'};
`;

export default SubTitle;