import styled from 'styled-components';

const JamCover = styled.a`
    role: button;
    width: 100%;
    height: 60px;
    padding: 5px 10px;
    margin: 0;
    background-color: ${({selected}) => selected ? "rgba(85, 187, 151, 1)" : 'rgb(255, 255, 255)'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border: 1px solid gray;
    span{
      color: ${({selected}) => selected ? "white" : 'black'};
      font-size: ${({selected}) => selected ? "16px" : '12px'};
    }
    p{
      color: ${({selected}) => selected ? "lightgray" : 'gray'};
      font-size: ${({selected}) => selected ? "12px" : '10px'};
      margin: 0;
      margin-left: 10px;
    }
    &:hover{
      background-color: ${({selected}) => selected ? "rgba(85, 187, 151, 1)" : 'rgb(85, 187, 151)'};
      cursor: ${({selected}) => selected ? "text" : 'pointer'};
      span{
         color: white;
      }
    }
    transition: 0.3s;

}`;

export default JamCover;