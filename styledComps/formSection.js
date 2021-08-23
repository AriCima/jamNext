import styled from 'styled-components';

const FormSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: ${({ mg }) => mg || '0'};
    padding: ${({ pad }) => pad || '20px 10px'};
    width: 95%;
`;

export default FormSection;
