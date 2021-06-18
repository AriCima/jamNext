import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import Layout from '../../../domains/Layout';
import BoardContent from '../../../domains/BoardContent';
import { Div } from '../../../styledComps';
import NavBarJam from '../../../domains/NavBarJam';
import DataService from '../../../services/DataService';

const Board = () => {
  const [boardInfo, setBoardInfo] = useState([]);
  const { userId, userRole } = useSelector((state) => state.userReducer);
  const { adminName } = useSelector((state) => state.jamReducer);

  const router = useRouter();
  const { jamId } = router.query;

  const getInfo = async () => {
    const res = await DataService.getBoardInfo(jamId);
    setBoardInfo(res);
  };

  useEffect(() => {
    jamId && getInfo(jamId);
  }, [jamId]);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    // messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  };

  useEffect(() => {
    if (boardInfo.length > 0) {
      scrollToBottom();
    }
  }, [boardInfo]);

  const { register, errors, handleSubmit } = useForm();

  const renderBoardContent = () => boardInfo.map((bC, i) => (
    <BoardContent
      key={i}
      boardContent={bC}
      ref={messagesEndRef}
    />
  ));

  const showSenMessageForm = userRole === 'admin';

  const onSubmit = (data) => {
    const date = new Date();
    const messageInfo = {
      messageText: data.message,
      userId,
      adminName,
      jamId,
      section: 'board',
      createdAt: date,
      messageType: 'message',
    };
    DataService.saveBoardMessage(jamId, section, messageInfo);
    document.getElementById('board-message-form').reset();
  };

  return (
    <Layout>
      <NavBarJam />
      {renderBoardContent()}
      {showSenMessageForm
                && (
                <div className="landlord-board-form">
                  <form
                    autoComplete="off"
                    className="board-form"
                    onSubmit={handleSubmit(onSubmit)}
                    id="board-message-form"
                  >
                    <textarea
                      rows="1"
                      name="message"
                      ref={register({
                        required: true,
                      })}
                    />
                    <div className="board-buttonArea">
                      <button type="submit">Send</button>
                    </div>
                  </form>
                </div>
                )}
    </Layout>
  );
};

export default Board;
