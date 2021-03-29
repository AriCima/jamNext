import styled from 'styled-components';

const Aside = styled.div`
    align-items: ${({align}) => align || 'center'};
    background-color: ${({back}) => back || 'transparent'};
    bottom: ${({bot}) => bot || 'auto'};
    box-shadow: ${({shad}) => shad || 'none'};
    display: flex;
    flex-direction: ${({col}) => col || 'row'};
    height: ${({h}) => h || 'auto'};
    justify-content: ${({just}) => just || 'center'};
    left: ${({left}) => left || 'auto'};
    position: ${({pos}) => pos || 'static'};
    right: ${({right}) => right || 'auto'};
    top: ${({top}) => top || 'auto'};
    width: ${({w}) => w || 'auto'};
}`

export default Aside;