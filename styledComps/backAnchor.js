import styled from 'styled-components';

const BackAnchor = styled.a`
    role: button;
    height: 60px;
    padding: 5px 10px;
    margin: 0;
    color: #CCC5B9;
    background-color: none;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
        color:#FCA311;
        cursor: pointer;
    }
    transition: 0.3s;
}`;

export default BackAnchor;
