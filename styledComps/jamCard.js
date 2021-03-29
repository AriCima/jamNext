import styled from 'styled-components';

const JamCard = styled.div`
    align-items: flex-start;
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    border: none;
    box-shadow: 0px 8px 21px -13px $lightGray;
    display: flex;
    flex-direction: column;
    height: 60px;
    justify-content: center;
    margin: 1px 0;
    padding: 0;
    transition: 0.3s;
    width: 100%;
    &:hover{
        background-color: rgb(226,226,226);
    }
}`

export default JamCard;
// flex-direction: ${props => (props.col ? 'column' : 'row')};