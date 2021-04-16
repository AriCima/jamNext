import styled from 'styled-components';

const Div = styled.div`
    align-items: ${({align}) => align || 'stretch'};
    background-color: ${({back}) => back || 'transparent'};
    border: ${({border}) => border ? `1px solid ${border}` : 'none'};
    bottom: ${({bot}) => bot || 'auto'};
    box-shadow: ${({shad}) => shad || 'none'};
    color: ${({color}) => color || 'black'};
    display: flex;
    flex-direction: ${({col}) => col ? "column" : 'row'};
    ${({h}) => h ? `height: ${h};` : ''}
    justify-content: ${({just}) => just || 'stretch'};
    ${({left}) => left ? `left: ${left};` : ''}
    margin: ${({mg}) => mg || '0'};
    margin-top: ${({mgT}) => mgT || '0'};
    margin-left: ${({mgL}) => mgL || '0'};
    margin-right: ${({mgR}) => mgR || '0'};
    margin-bottom: ${({mgB}) => mgB || '0'};
    overflow-y: ${({ovY}) => ovY || 'visible'};
    padding: ${({pad}) => pad || '0'};
    ${({pos}) => pos? `position: ${pos};`: ''}
    ${({flexG}) => flexG? `flex-grow: ${flexG};`: ''}
    ${({right}) => right ? `right: ${right};` : ''}
    ${({top}) => top ? `top: ${top};` : ''}
    max-width: ${({maxW}) => maxW || '100%'};
    width: ${({w}) => w || ''};
    text-overflow: ${({txtOver}) => txtOver || 'clip'};
    ${({main})=> main && `
        flex-direction: row;
        margin: 0;
        width: 100%
        align-items: stretch;
        justify-content: stretch;
        height: 100vh;
    `
}
}`

export default Div;

//     flex-grow:${({flexG}) => flexG || '1'};

// flex-direction: ${props => (props.col ? 'column' : 'row')};