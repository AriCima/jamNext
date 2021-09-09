import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { Div, Txt } from '../../styledComps';

const InviteJammerButton = ({ openModal }) => {
  const openInvitationForm = () => {
    openModal(true);
  };

  return (

    <Div
      className="invite-button"
      onClick={(e) => openInvitationForm(e)}
    >
      <FontAwesomeIcon
        icon={faPaperPlane}
      />
      <Txt fSize="14px">Invite a tenant</Txt>

    </Div>
  );
};

export default InviteJammerButton;
