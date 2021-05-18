import React, { useState }from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/Link';
import firebase from 'firebase';

import JamsList from "../jamsList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../components/Modal';
import CreateForm from '../CreateForm';
import JoinForm from '../JoinForm';
import { Div, Txt, ProfileBox, SubTitle, MenuItem } from "../../styledComps";

const AppWrapper = styled.div`
  margin: 0;
  display: flex;
  flex-direction: row;
  margin: 0 0 0 0;
  width: 100%
  align-items: flex-start;
  justify-content: flex-start;
  height: 100vh;
`;

const NavBarIcon = styled.p`
  font-size: 30px;
  font-weight: 500;
  margin: 0;
  color: rgba(85, 187, 151, 1);
  &:hover{
    color: rgba(85, 187, 151, 0.6);
  }
`;

const Layout = ({ children }) => {

  const [showProfile, setShowProfile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCreate, setShowCreate] = useState(true);

  
  const router = useRouter();

  const signOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut()
    .then(() => {
      alert('See you later');
      localStorage.setItem('userId', '');
      router.push('/');
    })
    .catch(() => {
      alert("Ups! Seems you'll have to stay longer")// An error happened.
    });
  };

  const showProfileMenu = () => {
    setShowProfile(!showProfile);
  };


  return (
    <AppWrapper className="AppWrapper">
      <Div className="AppMenuSide" col flexG='1' maxW='30%'>
        <Div className="AppNavBar" minH="60px" mgL="10px" mgR="10px" flexG="0" just="space-between" align="center">
          <NavBarIcon className="Join-button" fSize="36px"
            onClick={() => {
              setShowModal(true);
              setShowCreate(false);
            }}
          >
            <FontAwesomeIcon icon={faCheck}/>
          </NavBarIcon>
          <NavBarIcon className="Create-button" cfSize="36px"
            onClick={() => {
                setShowModal(true);
                setShowCreate(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus}/>
          </NavBarIcon>
          <NavBarIcon className="Profile-button" fSize="36px"onClick={() => showProfileMenu()}>
            <FontAwesomeIcon icon={faUser}/>
          </NavBarIcon>
        </Div>
        <ProfileBox back="lightgray" show={showProfile} w="100%" col mgT="0" just="flex-start" align="flex-start">
          <Div w={'100%'} just="flex-end">
            <Div transf='rotate(45deg)' mgR="20px"
              onClick={e => showProfileMenu(e)}
            >
              <Txt fSize="28px" bold >+</Txt>
            </Div>
          </Div>
          
          <Link href="/user/user-1">
            <MenuItem pad={'10px 0'} w="100%" just="flex-start" align="center">
              <Txt mgL="10px">Profile Info</Txt>
            </MenuItem>
          </Link>
          <Link href="/user/user-1/company">
            <MenuItem pad={'10px 0'} w="100%" just="flex-start" align="center">
              <Txt mgL="10px">Company</Txt>
            </MenuItem>
          </Link>
          <MenuItem pad={'10px 0'} w="100%" just="flex-start" align="center"
            onClick={e => signOut(e)}
          >
            <Txt mgL="10px">LogOut</Txt>
          </MenuItem>
        </ProfileBox>

        <Div className="JamsList" col h="100%" w="100%">
          <JamsList userId={'hiF88yQZpvUepnGZkcEYd5Hig0L2'}/>
        </Div>

      </Div>

      <Div className="AppBody" col back="lightblue" flexG='3'>
          {children}
      </Div>

      <Modal showModal={showModal} closeModal={()=>setShowModal(false)}>
        <Div col w='100%' just="center" align="center" >
            <Div col w="90%" pad="0 0 10px 0">
                {showCreate ? (
                    <>
                        <Div className="LoginWrapper" w="100%" just="center">
                            <SubTitle mgT="-5px" mgB="20px">Create yout own Jam !</SubTitle>
                        </Div>
                        <CreateForm showModal={val => setShowModal(val)}/>
                    </>
                ):(
                    <>
                        <Div className="RegisterWrapper" w="100%" just="center">
                            <SubTitle mgT="-5px" mgB="20px">Input the jam-code</SubTitle>
                        </Div>
                        <JoinForm userId={'1'}/>
                    </>
                )}
            </Div>
        </Div>
    </Modal>

    </AppWrapper>
  );
};

export default Layout;