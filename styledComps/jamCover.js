import styled from 'styled-components';
import Link from 'next/link';

const JamCover = styled.a`
    role: button;
    height: ${({h}) => h || 'auto'};
    width: ${({w}) => w || 'auto'};
    padding: ${({pad}) => pad || '0'};
    margin: ${({mg}) => mg || '0'}
    color: ${({color}) => color || 'black'};
    background-color: ${({back}) => back || 'transparent'};
    display: 'flex';
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    border: ${({border}) => `1px solid ${border}` || 'none'};
    &:hover{
        background-color: rgb(85, 187, 151);
        p{
            color: white;
        }
    }
    transition: 0.3s;
    &:hover{
        background-color: rgb(226,226,226);
        cursor: pointer;
    }

}`

export default JamCover;