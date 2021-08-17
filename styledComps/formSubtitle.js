import styled from 'styled-components';

const FormSubtitle = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: ${({ mg }) => mg || '0'};
    padding: ${({ pad }) => pad || '0'};
    font-weight: 700;
    width: 100%;
    color: gray;
    font-size: 16px;
`;

export default FormSubtitle;
