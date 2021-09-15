import styled from 'styled-components';

const Form = styled.form`
    auto-complete: off
    align-items: ${({ align }) => align || 'stretch'};
    background-color: ${({ back }) => back || 'transparent'};
    border: ${({ border }) => (border ? `1px solid ${border}` : 'none')};
    borderBot: ${({ borderBot }) => (borderBot ? `1px solid ${borderBot}` : 'none')};
    border-radius: ${({ borderR }) => (borderR || '')};
    display: flex;
    flex-direction: ${({ col }) => (col ? 'column' : 'row')};
    flex-wrap: ${({ flexW }) => (flexW || 'noWrap')};
    ${({ h }) => (h ? `height: ${h};` : '')}
    justify-content: ${({ just }) => just || 'stretch'};
    margin: ${({ mg }) => mg || '0'};
    overflow-y: ${({ ovY }) => ovY || 'scroll'};
    padding: ${({ pad }) => pad || '0'};
    width: ${({ w }) => w || ''};
    text-overflow: ${({ txtOver }) => txtOver || 'clip'};
    overflow: ${({ overFl }) => overFl || 'auto'};
    .react-datepicker-wrapper{
        input {
            background-color: ${({disabled}) => disabled ? 'white' : 'rgba(240, 239, 235, 0.6)'};
            border: 1px solid rgba(0, 0, 0, 0.16);
            padding: 8px;
        }
    }
}
}`;

export default Form;
