import styled from 'styled-components';

const JamNavBarItem = styled.div`
    height: 100%;
    padding: 5px 10px;
    margin: 0 20px;
    color: blue;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;

    &:hover{
        background-color: rgb(226,226,226);
        cursor: pointer;
    }

}`;

export default JamNavBarItem;
