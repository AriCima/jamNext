import React from "react";
import { connect } from 'react-redux';
import Link from 'next/Link';

import { setJamInfo } from "../../redux/actions/jamActions";
import { Div, Txt, JamCover} from "../../styledComps";

const jams = [
  {name: 'A', desc: 'this is jam A', id: 'AAAA'},
  {name: 'B', desc: 'this is jam B', id: 'BBBB'},
  {name: 'C', desc: 'this is jam C', id: 'CCC'},
  {name: 'D', desc: 'this is jam D', id: 'DDD'},
];

const JamsList = ({ setJamInfo}) => {

  const renderJams = () => {
    return jams.map((jam, j) => {
      const {name, desc, id} = jam;
      return (
        <Link href="/jams/12345">
          <JamCover
            back="rgb(255, 255, 255)" 
            w="100%" border="gray" 
            pad="5px 10px" col mgT="60px" 
            key={j} align="flex-start" 
            just="center">
            <span>{name}</span>
            <span>{desc}</span>
          </JamCover>
        </Link>
      )
    });
  };


  return (
    <Div col w="100%">
      { jams.length !== 0 && renderJams() }
    </Div>
  )
  
};

export default connect(null, { setJamInfo })(JamsList);