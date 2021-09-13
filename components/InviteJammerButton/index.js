import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Div, Button } from '../../styledComps';
import { COLORS } from '../../config';
import Modal from '../Modal';

import InviteJammerForm from '../../domains/InviteJammerForm';

const InviteJammerButton = ({ text }) => {
  const [showModal, setShowModal] = useState(false);

  const openInvitationForm = () => {
    setShowModal(true);
  };
  const iconStyle = {
    color: 'E76F51',
  };
  return (
    <>
      <Div w="200px" className="roomInfo-buttonArea">
        <Button
          h="40px"
          pad="0 15px"
          w="200px"
          border={COLORS.GREENS.BUTTONS.BACK}
          back="white"
          backHov={COLORS.GREENS.BUTTONS.BACKHOV}
          mgR="20px"
          just="center"
          align="center"
          color={COLORS.GREENS.BUTTONS.BACK}
          colorHov="white"
      // className="edit-button"
          onClick={(e) => { openInvitationForm(e); }}
        >
          <FontAwesomeIcon
            style={iconStyle}
            icon={faPaperPlane}
          />
        &nbsp;
          <Div h="100%" align="center" color={COLORS.GREENS.BUTTONS.BACK} colorHov="white">
            Invite
            {text}
          </Div>
        </Button>
      </Div>
      <Modal showModal={showModal} closeModal={() => setShowModal(false)}>
        <InviteJammerForm roomNr="" />
      </Modal>
    </>
  );
};

export default InviteJammerButton;
