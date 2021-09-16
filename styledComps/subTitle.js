import styled from 'styled-components';

const SubTitle = styled.p`
    font-size: 16px;
    font-weight:700;
    color: #366375;
    margin: 20px 0 0px 0;
    padding: ${({pad}) => pad || '0'};
`;

export default SubTitle;
