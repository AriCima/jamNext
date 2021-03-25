import styled from 'styled-components';

const NavBar = styled.div`
    width: 100%;
    position: fixed;
    top: 0;
    // left: 20%;
    right: 0;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.16);
    background-color: white;
}`

export default NavBar;
// flex-direction: ${props => (props.col ? 'column' : 'row')};