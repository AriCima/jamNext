import React, {useState, useEffect}  from "react";
import { useSelector } from 'react-redux';
import Link from 'next/Link';

import styled from 'styled-components';
import { Div } from "../../styledComps";

const JamCover = styled.a`
    role: button;
    width: 100%;
    height: 60px;
    padding: 5px 10px;
    margin: 0;
    color: ${({active}) => active ? "white" : 'black'};
    background-color: ${({active}) => active ? "rgba(85, 187, 151, 1)" : 'rgb(255, 255, 255)'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border: 1px solid gray;
    span{
      color: black;
      margin-left: 10px;
    }
    &:hover{
      background-color: ${({active}) => active ? "rgba(85, 187, 151, 1)" : 'rgb(85, 187, 151)'};
      cursor: ${({active}) => active ? ")" : 'pointer'};
      span{
         color: white;
      }
    }
    transition: 0.3s;

}`;

const JamsList = () => {

  const { userJams } = useSelector(state => state.userReducer);
  const { jamId } = useSelector(state => state.jamReducer);
  const [currentJamId, setCurrentJamId] = useState(jamId);
  
  useEffect(() => {
    jamId && setCurrentJamId(jamId)
  }, [jamId])

  const renderJams = () => {
    return userJams.map((jam, j) => {
      const {jamName, jamDesc, jamId} = jam;
      const active = jam.jamId === currentJamId;
      return (
        <Link href={`/jam/${jamId}`}>
          <JamCover key={j} active={active}>
            <span>{jamName}</span>
            <span>{jamDesc}</span>
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