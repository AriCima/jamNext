import styled from 'styled-components';

const StartChat = styled.div`   
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 40px;
    margin: ${({ mg }) => mg || '0'};
    padding: 0 15px;
    width: ${({ w }) => w || ''};
    color: rgb(85, 187, 151);
    &:hover{
      cursor: pointer;
      color: rgb(77, 172, 139);
    }
    transition: 0.3s;
`;

export default StartChat;
