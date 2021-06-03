import styled from 'styled-components';

const JamNavBarItem = styled.a`
    role: button;
    width: 100%;
    height: 60px;
    padding: 5px 10px;
    margin: 0;
    color: ${({active}) => active ? "white" : 'black'};
    background-color: ${({back}) => back ? "rgba(85, 187, 151, 1)" : 'rgb(255, 255, 255)'};
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    &:hover{
        background-color: ${({active}) => active ? "rgba(85, 187, 151, 1)" : 'rgb(85, 187, 151)'};
        cursor: ${({active}) => active ? "" : 'pointer'};
    }
    transition: 0.3s;
}`;

export default JamNavBarItem;
