import styled from 'styled-components';

const JamNavBarItem = styled.a`
    // border: 1px solid gray;
    align-items: center;
    background-color: ${({ back }) => (back || 'white')};
    color: ${({ active }) => (active ? '#FCA311' : 'black')};
    display: flex;
    font-size: 14px;
    font-weight: ${({ active }) => (active ? '550' : '400')};
    height: 100%;
    justify-content: center;
    margin: 0;
    padding: 5px 10px;
    role: button;
    width: 100%;
    &:hover{
        // background-color: ${({ active }) => (active ? 'rgba(85, 187, 151, 1)' : 'rgb(85, 187, 151)')};
        color: ${({ hovCol }) => (hovCol || '#FCA311')};
        text-decoration: underline;
        cursor: ${({ active }) => (active ? '' : 'pointer')};
    }
    transition: 0.3s;
}`;

export default JamNavBarItem;
