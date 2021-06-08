/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import LeftMenu from '../LeftMenu';
import Modal from '../../components/Modal';
import CreateForm from '../CreateForm';
import JoinForm from '../JoinForm';
import { Div, SubTitle, AppWrapper } from '../../styledComps';

const Layout = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [showCreate, setShowCreate] = useState(true);

  return (
    <AppWrapper>
      <LeftMenu openModal={() => setShowModal(true)} showCreate={(x) => setShowCreate(x)} />

      <Div className="AppBody" col back="lightblue" flexG="3">
        {children}
      </Div>

      <Modal showModal={showModal} closeModal={() => setShowModal(false)}>
        <Div col w="100%" just="center" align="center">
          <Div col w="90%" pad="0 0 10px 0">
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
