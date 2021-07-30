import React, {
  useState, useEffect, useCallback,
} from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import FormSelect from '../../../components/FormSelect';
import FormInput from '../../../components/FormInput';

import Layout from '../../../domains/Layout';
import BoardContent from '../../../domains/BoardContent';
import { Div, SubTitle } from '../../../styledComps';
import NavBarJam from '../../../domains/NavBarJam';
import DataService from '../../../services/DataService';
import Calculations from '../../../services/Calculations';
import useUserPermisions from '../../../hooks/useUserPermisions';
import { setActiveSection } from '../../../redux/actions/jamActions';

const RenderBoardContent = ({ boardInfo }) => boardInfo.map((bC, i) => (
  <BoardContent
    key={i}
    boardContent={bC}
  />
));

const Board = () => {
  const [messageType, setMessageType] = useState('message');
  const [boardInfo, setBoardInfo] = useState([]);
  const { userId } = useSelector((state) => state.userReducer);
  const { adminFirstName, jamName } = useSelector((state) => state.jamReducer);

  const router = useRouter();
  const dispatch = useDispatch();
  const { jamId } = router.query;
  const { role } = useUserPermisions(jamId);

  const getInfo = useCallback(async (id) => {
    const res = await DataService.getBoardInfo(id);
    setBoardInfo(res);
  }, [setBoardInfo, jamName]);

  useEffect(() => {
    jamId && getInfo(jamId);
    dispatch(setActiveSection('board'));
  }, [jamId, getInfo]);

  const { register, errors, handleSubmit } = useForm();
  const showMessageForm = role === 'admin';

  const onSubmit = (data) => {
    const date = new Date();
    const messageInfo = {
      content: data.message,
      // title: data.subject,
      userId,
      adminFirstName,
      jamId,
      createdAt: date,
      messageType: 'message',
    };
    DataService.saveBoardMessage(jamId, messageInfo);
    document.getElementById('board-message-form').reset();
  };

  const typeOfMessages = Calculations.getSelectOptions('messageType');
  const messageFormStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
}
  return (
    <Layout>
      <NavBarJam />
      <Div className="board-wrapper" col w="90%" mgT="10px" just="space-between" align="center">
        <RenderBoardContent boardInfo={boardInfo} />
        {showMessageForm
                && (
                <Div className="landlord-board-form" position="fixed" bottom="0px" w="90%">
                  <form
                    style={messageFormStyle}
                    autoComplete="off"
                    className="board-form"
                    onSubmit={handleSubmit(onSubmit)}
                    id="board-message-form"
                  >
                    <SubTitle>Send new message</SubTitle>
                    <FormSelect
                      w="100%"
                      label="Message Type"
                      name="messageType"
                      type="text"
                      error={errors.messageType}
                      errorMessage="Please select a message type"
                      register={register}
                      registerObject={{ required: true }}
                      onChange={(e) => setMessageType(e.target.value)}
                      options={typeOfMessages}
                    />
                    {messageType === 'adv' && (
                      <FormInput
                        w="70%"
                        type="text"
                        placeholder="Subject"
                        name="subject"
                        mgR="20px"
                        error={errors.messageTitle}
                        errorMessage="A title is mandatory"
                        register={register}
                        registerObject={{ required: true }}
                      />

                    )}

                    <textarea
                      rows="5"
                      name="message"
                      ref={register({
                        required: true,
                      })}
                    />
                    <div className="board-buttonArea">
                      <button type="submit">Send</button>
                    </div>
                  </form>
                </Div>
                )}
      </Div>
    </Layout>
  );
};

export default Board;
