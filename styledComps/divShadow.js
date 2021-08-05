import styled from 'styled-components';

const DivShadow = styled.div`
    align-items: ${({ align }) => align || 'stretch'};
    background-color: ${({ back }) => back || 'transparent'};
    border: ${({ border }) => (border ? `1px solid ${border}` : 'none')};
    border-bottom:  ${({ bordB }) => (bordB ? `1px solid ${bordB}` : 'none')};
    border-radius: ${({ borderR }) => (borderR || '')};
    bottom: ${({ bot }) => bot || 'auto'};
    box-shadow: ${({ shad }) => shad || 'none'};
    color: ${({ color }) => color || 'black'};
    display: flex;
    flex-direction: ${({ col }) => (col ? 'column' : 'row')};
    ${({ h }) => (h ? `height: ${h};` : '')}
    justify-content: ${({ just }) => just || 'stretch'};
    ${({ left }) => (left ? `left: ${left};` : '')}
    margin: ${({ mg }) => mg || '0'};
    margin-top: ${({ mgT }) => mgT || '0'};
    margin-left: ${({ mgL }) => mgL || '0'};
    margin-right: ${({ mgR }) => mgR || '0'};
    margin-bottom: ${({ mgB }) => mgB || '0'};
    overflow-y: ${({ ovY }) => ovY || 'visible'};
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
    overflow: auto;
    ${({ transf }) => (transf ? `transform: ${transf};` : '')}
    &:hover{
        box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.16);
        cursor: pointer;
    }
}`;

export default DivShadow;
