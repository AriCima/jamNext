import styled from 'styled-components';

const TextArea = styled.textarea`
    display: block;
    background-color: ${({ disabled }) => (disabled ? 'white' : 'rgba(240, 239, 235, 0.6)')};
    color: ${({ disabled }) => (disabled ? 'gray' : 'black')};
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.16);
    padding: 15px;
    margin-bottom: 10px;
    font-faily: arial;
    width: ${({ w }) => w || '100%'};
`;
export default TextArea;
