import React, { useState, useEffect }  from "react";
import Link from 'next/Link';

import styled from 'styled-components';
import { Div } from "../../styledComps";
import DataService from "../../services/DataService";


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

const JamsList = ({ userId }) => {

  const [jamsList, setJamsList] = useState([]);
  const [nrOfJams, setNrOfJams] = useState(-1);

  useEffect(() => {
    if(userId) {
        const unsubscribe = DataService.getUserJams(userId, {
            next: querySnapshot => {
              const jams = [];
              querySnapshot.docs.map(docSnapshot => {
                  const j = docSnapshot.data();
                  j.id = docSnapshot.id;
                  jams.push(j);
              });

              setNrOfJams(jams.length);
              let jList = [];

              if(jams.length > 0) {
                for (let i = 0; i <jams-length; i++) {
                  DataService.getJamCoverInfoInfoById(jams)
                  .then(res => {
                    const { jamName, jamDesc, jamId } = res;
                    const jamCover = { jamName, jamDesc, jamId }
                    jList.push(jamCover)
                  })
                }
                setJamsList(jams);
              }

            },
            error: () => console.log('failure')
        });
        return unsubscribe;
    }
  }, [userId]);

  const renderJams = () => {
    return jamsList.map((jam, j) => {
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

  const JamsInfoLoaded = nrOfJams === jamsList.length;
  const readyToRender = JamsInfoLoaded && nrOfJams > 0

  return (
    <Div col w="100%">
      { readyToRender && renderJams() }
    </Div>
  )
  
};

export default JamsList;

// const jams = [
//   {name: 'A', desc: 'this is jam A', id: 'AAAA'},
//   {name: 'B', desc: 'this is jam B', id: 'BBBB'},
//   {name: 'C', desc: 'this is jam C', id: 'CCC'},
//   {name: 'D', desc: 'this is jam D', id: 'DDD'},
// ];