import styled from 'styled-components';

const NavBar = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.16);
    padding: 0 10px;
}`

export default NavBar;
// flex-direction: ${props => (props.col ? 'column' : 'row')};