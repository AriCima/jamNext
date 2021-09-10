import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Div, Txt, Button } from '../../styledComps';

const InviteJammerButton = ({ openModal, text }) => {
  const openInvitationForm = () => {
    openModal(true);
  };

  const iconStyle = {
    color: 'E76F51',
  };
  return (

    <Div w="200px" className="roomInfo-buttonArea">
      <Button
        h="40px"
        pad="0 15px"
        w="200px"
        border="#FCA311"
        mgR="20px"
        just="center"
        align="center"
      // className="edit-button"
        onClick={(e) => { openInvitationForm(e); }}
      >
        <FontAwesomeIcon
          style={iconStyle}
          icon={faPaperPlane}
        />
        {' '}
      &nbsp;
        <Txt mg="0" fSize="14px" color="#E76F51">
          Invite
          {text}
        </Txt>
      </Button>

    </Div>
  );
};

export default InviteJammerButton;
