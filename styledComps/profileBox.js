import styled from 'styled-components';

const ProfileBox = styled.div`
    align-items: ${({ align }) => align || 'stretch'};
    background-color: ${({ back }) => back || 'transparent'};
    border: ${({ border }) => (border ? `1px solid ${border}` : 'none')};
    bottom: ${({ bot }) => bot || 'auto'};
    box-shadow: ${({ shad }) => shad || 'none'};
    color: ${({ color }) => color || 'black'};
    flex-direction: ${({ col }) => (col ? 'column' : 'row')};
    ${({ h }) => (h ? `height: ${h};` : '0px')}
    justify-content: ${({ just }) => just || 'stretch'};
    ${({ left }) => (left ? `left: ${left};` : '')}
    margin: ${({ mg }) => mg || '0'};
    margin-top: ${({ mgT }) => mgT || ''};
    margin-left: ${({ mgL }) => mgL || ''};
    margin-right: ${({ mgR }) => mgR || ''};
    margin-bottom: ${({ mgB }) => mgB || ''};
    overflow-y: ${({ ovY }) => ovY || 'visible'};
    padding: ${({ pad }) => pad || '0'};
    ${({ pos }) => (pos ? `position: ${pos};` : '')}
    ${({ flexG }) => (flexG ? `flex-grow: ${flexG};` : '')}
    ${({ right }) => (right ? `right: ${right};` : '')}
    ${({ top }) => (top ? `top: ${top};` : '')}
    max-width: ${({ maxW }) => maxW || '100%'};
    width: ${({ w }) => w || ''};
    overflow: hidden;
    display: flex;
    height: 100%;
    transition: all 0.9s ease-out;
}
}`;

export default ProfileBox;
