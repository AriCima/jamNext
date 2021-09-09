import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';

const InviteJammerButton = ({ }) => {

  const { jamId, jamType, activeSection } = useSelector((state) => state.jamReducer);

  const sendInvitation = () => {

  }

  return (

    <div className="invite-button"
        onClick={e => sendInvitation(e)}
    >
      <FontAwesomeIcon
        icon={faPaperPlane}
      />
      <p>Invite a tenant</p>

    </div>
  )
  
}


export default InviteJammerButton;
