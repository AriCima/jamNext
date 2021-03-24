import styled from 'styled-components';

const FormError = styled.h4`
    font-size: 1rem;
    font-weight: ${props => (props.bold ? '700' : '400')};
    color: red;
`;
export default FormError;