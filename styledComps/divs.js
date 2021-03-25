import styled from 'styled-components';

const Div = styled.div`
    height: ${({h}) => h || 'auto'};
    width: ${({w}) => w || 'auto'};
    margin: ${({mg}) => mg || '0'}
    padding: ${({pad}) => pad || '0'};
    background-color: ${({back}) => back || 'transparent'};
    border: ${({border}) => `1px solid ${border}` || 'none'};
    display: 'flex';
    flex-direction: ${({col}) => col || 'row'};
    justify-content: ${({just}) => just || 'center'};
    align-items: ${({align}) => align || 'center'};
}`

export default Div;
// flex-direction: ${props => (props.col ? 'column' : 'row')};