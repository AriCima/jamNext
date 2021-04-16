import React from "react";
import { Div, Txt, Button } from "../../styledComps";

const jams = [
  {name: 'A', desc: 'this is jam A'},
  {name: 'B', desc: 'this is jam B'},
  {name: 'C', desc: 'this is jam C'},
  {name: 'D', desc: 'this is jam D'},
];

const JamsList = () => {

  const renderJams = () => {
    return jams.map((jam, j) => {

      return (
        <Button jamCover back="rgb(255, 255, 255)" w="100%" border="gray" pad="5px 10px" col mgT="60px" key={j} align="flex-start" just="center">
          <Txt>{jam.name}</Txt>
          <Txt>{jam.desc}</Txt>
        </Button>
      )
    });
  };


  return (
    <Div col w="100%">
      { jams.length !== 0 && renderJams() }
    </Div>
  )
  
};

export default JamsList;