import React from "react";
import { connect } from "react-redux";

import Text from '../../styledComps/text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
// import { setSection, setSubSection } from '../../../../redux/actions/navigateActions';
// import { setDocType, setDocId, setEditable } from '../../../../redux/actions/docsActions';

import "./index.scss";

const InviteUserButton = ({ text  }) => {

  const sendInvitation = () => {
    // setSection('Tenants');
    // setSubSection('');
    // setDocType('INVITE-TENANT');
    // setDocId('');
    // setEditable(true);
    alert('invite form will open');
  }

  return (

    <div className="invite-button"
        onClick={e => sendInvitation(e)}
    >
      <FontAwesomeIcon
        icon={faPaperPlane}
      />
      <Txt>Invite a {text}</Txt>  

    </div>
  )
  
}


export default connect (null, null)(InviteUserButton);
