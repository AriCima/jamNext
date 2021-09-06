// src: https://codesandbox.io/s/tables-styled-components-v7vgb?from-embed=&file=/src/components/kit/Table/index.js:0-1752
import styled from 'styled-components';

const Table = styled.table`
  margin: ${({ mg }) => mg || '0'};
  width: ${({ w }) => w || ''};
  border: none;
  border-collapse: separate;
  border-spacing: ${({ borderSp }) => borderSp || ''};
  border-spacing:0 5px;
  caption-side: bottom;
  tr {
    height: 40px;
    td{
      font-size: 14px;
      padding: 5px 10px;
    }
  }

  thead tr {
    margin-bottom: 5px;
    td{
      color: #403D39;
      font-weight: 700;
    };
  };

  tbody tr {
    td{
      background-color: rgba(240, 239, 235, 1);
    }
    .startTd{
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
    .lastTd{
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    .vacant{
      text-align: center;
      color: #BD4212;
    }
    :hover{
      background-color: rgba(240, 239, 235, 1);
      .startTd{
        border-top: 2px solid #FCA311;
        border-bottom: 2px solid #FCA311;
        border-left:2px solid #FCA311;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      .middleTd{
        border-top: 2px solid #FCA311;
        border-bottom: 2px solid #FCA311;
      }
      .lastTd{
        border-top: 2px solid #FCA311;
        border-bottom: 2px solid #FCA311;
        border-right:2px solid #FCA311;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }

    }
  }

  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`;

export default Table;

// tbody tr {
//   :nth-of-type(odd) {
//     background-color: rgba(240, 239, 235, 0.6);
//   }
//   :hover {
//     background-color: rgba(240, 239, 235, 1);
//   }
// }
