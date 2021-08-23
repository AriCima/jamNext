import styled from 'styled-components';

const Txt = styled.p`
    font-size: ${({ fSize }) => fSize || '14px'};
    font-weight: ${(props) => (props.bold ? '700' : '400')};
    margin: ${({ mg }) => mg || '0'};
    margin-top: ${({ mgT }) => mgT || ''};
    margin-left: ${({ mgL }) => mgL || ''};
    margin-right: ${({ mgR }) => mgR || ''};
    margin-bottom: ${({ mgB }) => mgB || ''};
    padding: ${({ pad }) => pad || '0'};
    color: ${({ color }) => color || 'black'};
`;

export default Txt;
