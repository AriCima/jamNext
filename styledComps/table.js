// src: https://codesandbox.io/s/tables-styled-components-v7vgb?from-embed=&file=/src/components/kit/Table/index.js:0-1752
import styled from 'styled-components';

const Table = styled.table`
  margin: ${({ mg }) => mg || '0'};
  width: ${({ w }) => w || ''};
  border: none;
  border-collapse: collapse;
  caption-side: bottom;


  thead > tr {
    background-color: rgb(85, 187, 151);
    td{
      color: white;
      font-weight: 700;
    }
  }

  tr {
    height: 40px;
    td{
      font-size: 14px;
      padding: 5px 10px;
    }
  }


  tbody tr {
    :nth-of-type(odd) {
      background-color: rgba(240, 239, 235, 0.6);
    }
    :hover {
      background-color: rgba(240, 239, 235, 1);
    }
  }

  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`;

export default Table;
