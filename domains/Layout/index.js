import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/Link';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import JamsList from '../JamsList';
import Modal from '../../components/Modal';
import CreateForm from '../CreateForm';
import JoinForm from '../JoinForm';
import { resetUserInfo } from '../../redux/actions/userActions';
import { Div, SubTitle, AppWrapper } from '../../styledComps';

const NavBarIcon = styled.p`
  font-size: 30px;
  font-weight: 500;
  margin: 0;
  color: rgba(85, 187, 151, 1);
  &:hover{
    color: rgba(85, 187, 151, 0.6);
  }
`;

const Layout = ({ children, leftMenu }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCreate, setShowCreate] = useState(true);

  const router = useRouter();
  const dispatch = useDispatch();

  const signOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
      // alert('See you later');
      // localStorage.setItem('userId', '');
        console.log('Logout');
        dispatch(resetUserInfo());
        router.push('/');
      })
      .catch(() => {
        alert("Ups! Seems you'll have to stay longer");// An error happened.
      });
  };

  const showProfileMenu = () => {
    setShowProfile(!showProfile);
  };

  return (
    <AppWrapper>
      <Div className="LeftSide" col flexG="1" maxW="30%">
        {leftMenu}
      </Div>

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
                <JoinForm userId="1" />
              </>
            )}
          </Div>
        </Div>
      </Modal>

    </AppWrapper>
  );
};

export default Layout;
