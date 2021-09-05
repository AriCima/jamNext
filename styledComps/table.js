// src: https://codesandbox.io/s/tables-styled-components-v7vgb?from-embed=&file=/src/components/kit/Table/index.js:0-1752
import styled from 'styled-components';

const Table = styled.table`
  margin: ${({ mg }) => mg || '0'};
  width: ${({ w }) => w || ''};
  border: none;
  borderCollapse: 'separate',
  borderSpacing: '0 15px',
  caption-side: bottom;


  thead > tr {
    border: none;
    td{
      color: #403D39;
      font-weight: 700;
    }
  }

  tr {
    height: 40px;
    border: 1px solid #FCA311;
    td{
      font-size: 14px;
      padding: 5px 10px;
    }
  }


  // tbody tr {
  //   :nth-of-type(odd) {
  //     background-color: rgba(240, 239, 235, 0.6);
  //   }
  //   :hover {
  //     background-color: rgba(240, 239, 235, 1);
  //   }
  // }

  tbody tr {
    border: 1px solid #FCA311;
    border-collapse:separate;
    border-spacing: 0 15px;
  }

  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`;

export default Table;
