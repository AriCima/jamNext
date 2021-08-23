import styled from 'styled-components';

const SubTitle = styled.p`
    font-size: 16px;
    font-weight:700;
    color: gray;
    margin: 20px 0 10px 0;
    padding: ${({pad}) => pad || '0'};
`;

export default SubTitle;
