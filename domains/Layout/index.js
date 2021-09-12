/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import LeftMenu from '../LeftMenu';
import Modal from '../../components/Modal';
import CreateForm from '../CreateForm';
import JoinForm from '../JoinForm';
import { Div, SubTitle, AppWrapper } from '../../styledComps';

const Layout = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [showCreate, setShowCreate] = useState(true);

  // const { modalType } = useSelector((state) => state.Reducer);

  // const renderModal = () => {
  //   switch (modalType) {
  //     case 'create':
  //       return (
  //         <>
  //           <Div className="LoginWrapper" w="100%" just="center">
  //             <SubTitle mgT="-5px" mgB="20px">Create yout own Jam !</SubTitle>
  //           </Div>
  //           <CreateForm showModal={(val) => setShowModal(val)} />
  //         </>
  //       );
  //     case 'login':
  //       return (
  //         <>
  //           <Div className="RegisterWrapper" w="100%" just="center">
  //             <SubTitle mgT="-5px" mgB="20px">Input the jam-code</SubTitle>
  //           </Div>
  //           <JoinForm />
  //         </>
  //       );
  //     case 'invite':
  //       return (
  //         <>
  //           <Div className="RegisterWrapper" w="100%" just="center">
  //             <SubTitle mgT="-5px" mgB="20px">Input the jam-code</SubTitle>
  //           </Div>
  //           <JoinForm />
  //         </>
  //       );
  //     default:
  //       break;
  //   }
  // };
  return (
    <AppWrapper>
      <LeftMenu openModal={() => setShowModal(true)} showCreate={(x) => setShowCreate(x)} />

      <Div openModal={() => setShowModal(true)} className="AppBody" minH="100Vh" col flexG="3">
        {children}
      </Div>

      <Modal showModal={showModal} closeModal={() => setShowModal(false)}>
        <Div col w="100%" just="center" align="center">
          <Div col w="90%" pad="0 0 10px 0">
            {/* {renderModal()} */}
            {showCreate ? (
              <>
                <Div className="LoginWrapper" w="100%" just="center">
                  <SubTitle mgT="-5px" mgB="20px">Create yout own Jam !</SubTitle>
                </Div>
                <CreateForm showModal={(val) => setShowModal(val)} />
              </>
            ) : (
              <>
                <Div className="RegisterWrapper" w="100%" just="center">
                  <SubTitle mgT="-5px" mgB="20px">Input the jam-code</SubTitle>
                </Div>
                <JoinForm />
              </>
            )}
          </Div>
        </Div>
      </Modal>

    </AppWrapper>
  );
};

export default Layout;
