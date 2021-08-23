import styled from 'styled-components';

const HovRow = styled.div`
    align-items: ${({ align }) => align || 'stretch'};
    background-color: ${({ back }) => back || 'transparent'};
    border-radius: 5px;
    border: 1px solid #C9C9C9;
    box-shadow: ${({ shad }) => shad || 'none'};
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.16);
    color: ${({ color }) => color || 'black'};
    display: flex;
    flex-direction: row;
    height: 40px;
    justify-content: space-between;
    margin: ${({ mg }) => mg || '0'};
    padding: 10px;
    width: 100%;
    &:hover{
        border: 2px solid rgb(252, 163, 17);
        cursor: pointer;
    }
`;

export default HovRow;
