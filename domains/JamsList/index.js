import React from "react";

import JamCover from '../../components/jamCover';

const JamsList = ({ jamsList }) => {

    const renderJams = () => {
        return jamsList.map((jam, j) => {
        const {jamName, jamDesc, jamId, jamType, adminId, adminName, adminLastName } = jam;
        
        const jamActive = currentJamId === jamId;
        
        let interlocutor = '';
        if ( jamType === 'chat') {
            interlocutor = userId === adminId ? `${jammers[0].firstName} ${jammers[0].lastName}` : `${adminName} ${adminLastName}`
        };
        
        return (
            <Div mgT="60px" key={j}>
                <JamCover
                    jamActive={jamActive}
                    jamName={jamName}
                    jamDesc={jamDesc}
                    jamId={jamId}
                    jamType={jamType}
                    adminId={adminId}
                    adminName={adminName}
                    adminLastName={adminLastName}
                    imterlocutor={interlocutor}
                />
            </Div>
        )
        });
    };


  return (
    <Div top="60%" ovY="scroll" shad="8px 0 21px -13px rgb(226,226,226)" col="white">
      { jamsList.length !== 0 && renderJams() }
    </Div>
  )
  
};

export default JamsList;