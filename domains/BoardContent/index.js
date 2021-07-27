import React from 'react';
import { useSelector } from 'react-redux';
import Calculations from '../../services/Calculations';

import { Div, Txt, MessageContainer } from '../../styledComps';

const BoardContent = ({ boardContent }) => {
  const messageTime = Calculations.getMessageDate(boardContent.createdAt);
  const { adminFirstName } = useSelector((state) => state.jamReducer);

  const renderMessage = (messageType) => {
    switch (messageType) {
      case 'publi':
        return (
          <MessageContainer>
            <div className="publi-img" />
            <div className="publi-info">
              <div className="publi-title" />
              <div className="publi-text" />
              <div className="publi-time" />
            </div>
          </MessageContainer>
        );
      default:
        return (
          <MessageContainer>
            <Div className="board-title" w="100%" just="flex-start" align="center">
              <Txt bold fSize="16px" mgL="5px">{boardContent.title}</Txt>
            </Div>
            <Div className="board-message" just="flex-start" align="center" mg="10px 10px 16px 20px">
              <Txt fSize="14px" mgL="10px">{boardContent.desc}</Txt>
            </Div>
            <Div className="message-info" w="100%" just="flex-start" align="center">
              <Txt>
                {adminFirstName}
                {' '}
                -
                {' '}
                {messageTime}
              </Txt>
            </Div>
          </MessageContainer>
        );
    }
  };

  return (
    <Div col w="90%" borderR="5px">
      {renderMessage(boardContent.messageType)}
    </Div>
  );
};
export default BoardContent;
