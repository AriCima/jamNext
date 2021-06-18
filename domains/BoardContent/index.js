import React from 'react';
import Calculations from '../../services/Calculations';

const BoardContent = ({ boardContent }) => {
  const messageTime = Calculations.getMessageDate(boardContent.createdAt);

  const renderMessage = (messageType) => {
    switch (messageType) {
      case 'publi':
        return (
          <div className="board-publi-item">
            <div className="publi-img" />
            <div className="publi-info">
              <div className="publi-title" />
              <div className="publi-text" />
              <div className="publi-time" />
            </div>
          </div>
        );
      default:
        return (
          <div className="board-message-item">
            <div className="board-message">
              <p>{boardContent.messageText}</p>
            </div>
            <div className="board-message-info">
              <div className="board-message-time">
                <p>
                  {boardContent.adminName}
                  {' '}
                  -
                  {' '}
                  {messageTime}
                </p>
              </div>
            </div>
          </div>
        );
                // console.log('no navbar item matched')
    }
  };

  return (
    <>
      {renderMessage(boardContent.messageType)}
    </>
  );
};
export default BoardContent;
