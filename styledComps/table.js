// src: https://codesandbox.io/s/tables-styled-components-v7vgb?from-embed=&file=/src/components/kit/Table/index.js:0-1752
import styled from 'styled-components';

const Table = styled.table`
  border: none;
  border-collapse: collapse;
  caption-side: bottom;
  td, thead {
    border: none;
  }
tr > td {
  font-size: 10px;
}
  td {
    padding: 5px 10px;
    font-size: 10px;
  }

  tbody tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
    :hover {
      background-color: lightpink;
    }
  }
  thead > tr {
    background-color: #c2c2c2;
  }
  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`;

export default Table;
