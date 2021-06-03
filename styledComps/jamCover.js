import styled from 'styled-components';

const JamCover = styled.a`
    role: button;
    width: 100%;
    height: 60px;
    padding: 5px 10px;
    margin: 0;
    color: ${({active}) => active ? "white" : 'black'};
    background-color: ${({active}) => active ? "rgba(85, 187, 151, 1)" : 'rgb(255, 255, 255)'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border: 1px solid gray;
    span{
      color: black;
      margin-left: 10px;
    }
    &:hover{
      background-color: ${({active}) => active ? "rgba(85, 187, 151, 1)" : 'rgb(85, 187, 151)'};
      cursor: ${({active}) => active ? ")" : 'pointer'};
      span{
         color: white;
      }
    }
    transition: 0.3s;

}`;

export default JamCover