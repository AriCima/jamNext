import styled from 'styled-components';

const FormSubtitle = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: ${({ mg }) => mg || '0'};
    padding: ${({ pad }) => pad || '0'};
    width: 95%;
    color: gray;
    font-size: 14px;
`;

export default FormSubtitle;
