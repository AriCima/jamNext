import styled from 'styled-components';

const FormError = styled.h4`
    font-size: 11px;
    font-weight: ${props => (props.bold ? '700' : '400')};
    color: red;
    margin: 0;
`;
export default FormError;