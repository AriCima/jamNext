import styled from 'styled-components';

const Div = styled.div`
    align-items: ${({ align }) => align || 'stretch'};
    background-color: ${({ back }) => back || 'transparent'};
    border: ${({ border }) => (border ? `1px solid ${border}` : 'none')};
    borderBot: ${({ borderBot }) => (borderBot ? `1px solid ${borderBot}` : 'none')};
    border-radius: ${({ borderR }) => (borderR || '')};
    bottom: ${({ bot }) => bot || 'auto'};
    box-shadow: ${({ shad }) => shad || 'none'};
    color: ${({ color }) => color || 'black'};
    display: flex;
    flex-direction: ${({ col }) => (col ? 'column' : 'row')};
    flex-wrap: ${({ flexW }) => (flexW || 'noWrap')};
    ${({ h }) => (h ? `height: ${h};` : '')}
    justify-content: ${({ just }) => just || 'stretch'};
    ${({ left }) => (left ? `left: ${left};` : '')}
    margin: ${({ mg }) => mg || '0'};
    margin-top: ${({ mgT }) => mgT || '0'};
    margin-left: ${({ mgL }) => mgL || '0'};
    margin-right: ${({ mgR }) => mgR || '0'};
    margin-bottom: ${({ mgB }) => mgB || '0'};
    overflow-y: ${({ ovY }) => ovY || 'scroll'};
    padding: ${({ pad }) => pad || '0'};
    ${({ pos }) => (pos ? `position: ${pos};` : '')}
    ${({ flexG }) => (flexG ? `flex-grow: ${flexG};` : '')}
    ${({ right }) => (right ? `right: ${right};` : '')}
    ${({ top }) => (top ? `top: ${top};` : '')}
    max-height: ${({ maxH }) => maxH || ''};
    min-height: ${({ minH }) => minH || ''};
    max-width: ${({ maxW }) => maxW || '100%'};
    min-width: ${({ minW }) => minW || ''};
    width: ${({ w }) => w || ''};
    text-overflow: ${({ txtOver }) => txtOver || 'clip'};
    overflow: ${({ overFl }) => overFl || 'auto'};
    ${({ transf }) => (transf ? `transform: ${transf};` : '')}
    z-index:${({ zIndex }) => zIndex || ''};
    &:hover{
        background-color: ${({ backHov }) => backHov || ''};
        color: ${({ colorHov }) => colorHov || ''};
        border: ${({ borderHov }) => borderHov || 'black'};
    }
        ${({ main }) => main && `
        margin: 0;
        display: flex;
        flex-direction: column;
        margin: 0 0 0 0;
        width: 100%
        align-items: center;
        justify-content: flex-start;
        height: 100vh;
    `
}
}`;

export default Div;
