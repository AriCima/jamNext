import styled from 'styled-components';

const FormRow = styled.div`
    display: flex;
    justify-content: ${({ just }) => just || 'flex-start'};
    align-items: center;
    margin: 0;
    width: 100%;
`;

export default FormRow;
