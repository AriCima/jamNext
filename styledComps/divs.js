import styled from 'styled-components';

const Div = styled.div`
    background-color: ${({back}) => back || 'transparent'};
    height: ${({h}) => h || 'auto'};
    width: ${({w}) => w || 'auto'};
    display: 'flex';
    flex-direction: ${({col}) => col || 'row'};
    justify-content: ${({just}) => just || 'center'};
    align-items: ${({align}) => align || 'center'};
}`

export default Div;
// flex-direction: ${props => (props.col ? 'column' : 'row')};