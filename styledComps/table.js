// src: https://codesandbox.io/s/tables-styled-components-v7vgb?from-embed=&file=/src/components/kit/Table/index.js:0-1752

import React from "react";
import styled from "styled-components";

const Table = styled.table`
    caption-side: top;
    border: none;
    border-collapse: collapse;
    caption-side: bottom;
    th {
        border: 1px solid red;
        background-color: yellow;
    }
    th > td {
        background-color: green;
    }
    tr {
        :hover {
          background-color: lightpink;
        }
    }
    tr > td {
      padding: 5px 10px;
      color: black;
      :hover {
        background-color: blue;
      }
    }
`;

export default Table;