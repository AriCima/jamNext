import styled from 'styled-components';

const AppContainer = styled.div`
    width: ${({w}) => w || 'auto'};
    min-height: 100vh;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}`

export default AppContainer;
// flex-direction: ${props => (props.col ? 'column' : 'row')};
  