import React from 'react';

import { Div, Aside } from "../../styledComps";

import NavBarJam from '../NavBarJam';

const Layout = ({ children }) => {
    return (
        <Div main>
          <Div col back="red" flexG='1' maxW='30%'>
            <Div pad="50px" back="lightgreen" flexG="0">JAMNEXT</Div>
            <Div pad="50px">
              Listado Principal
            </Div>
          </Div>
          <Div col back="lightblue" flexG='3'>
              {children}
          </Div>
        </Div>
    );
};

export default Layout;