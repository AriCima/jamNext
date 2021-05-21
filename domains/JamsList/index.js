import React  from "react";
import { useSelector } from 'react-redux';
import Link from 'next/Link';

import styled from 'styled-components';
import { Div } from "../../styledComps";

const JamCover = styled.a`
    role: button;
    height: ${({h}) => h || 'auto'};
    width: 100%;
    padding: 5px 10px;
    margin: 60px 0 0 0;
    color: black;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    border: 1px solid gray;
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

}`;

const JamsList = () => {

  const { userJams } = useSelector(state => state.userReducer);

  const renderJams = () => {
    return userJams.map((jam, j) => {
      const {name, desc, jamId} = jam;
      return (
        <Link href={`/jam/${jamId}`}>
          <JamCover key={j}>
            <span>{name}</span>
            <span>{desc}</span>
          </JamCover>
        </Link>
      )
    });
  };

  const noJams = userJams.lengh === 0;

  return (
    <Div col w="100%">
      { !noJams && renderJams() }
    </Div>
  )
  
};

export default JamsList;