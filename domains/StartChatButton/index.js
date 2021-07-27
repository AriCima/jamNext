import React from 'react';
import findIndex from 'lodash/findIndex';
import { useRouter } from 'next/router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

import { Txt, StartChat } from '../../styledComps';
import DataService from '../../services/DataService';

const StartChatButton = ({
  adminId,
  adminFirstName,
  adminLastName,
  jammers,
  jamDesc,
  originJamId,
  userJams,
}) => {
  const router = useRouter();

  const launchChat = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const jammerId = jammers[0].userId;

    const chatId = adminId + jammerId;
    const reverseChatId = jammerId + adminId;

    const existChat = findIndex(userJams, { jamId: chatId }) !== -1;
    const existReverseChat = findIndex(userJams, { jamId: reverseChatId }) !== -1;

    if (existChat) {
      router.push(`/jam/${chatId}`);
    }

    if (existReverseChat) {
      router.push(`/jam/${reverseChatId}`);
    }

    const chatInfo = {
      createdAt: new Date(),
      adminId,
      adminFirstName,
      adminLastName,
      jammers,
      jamId: chatId,
      jamType: 'chat',
      jamDesc,
      originJamId,
    };

    DataService.startChat(chatId, chatInfo, adminId, jammerId)
      .then(
        router.push(`/jam/${chatId}`),
      );
  };

  return (
    <StartChat
      onClick={(e) => launchChat(e)}
    >
      <FontAwesomeIcon
        icon={faComments}
      />
      <Txt mg="0 5px">Chat</Txt>

    </StartChat>
  );
};

export default (StartChatButton);
