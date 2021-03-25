import styled from 'styled-components';

const Main = styled.div`
    width: ${({w}) => w || '100%'};
    margin: ${({mg}) => mg || '0'};
    padding: ${({pad}) => pad || '0'};
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}`

export default Main;
// flex-direction: ${props => (props.col ? 'column' : 'row')};