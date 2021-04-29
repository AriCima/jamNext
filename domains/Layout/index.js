import React, { useState }from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase';

import JamsList from "../jamsList";
import { Div, Txt, ProfileBox, MenuItem } from "../../styledComps";

const Layout = ({ children }) => {

  const [showProfile, setShowProfile] = useState(false);
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

  const showProfileMenu = (e) => {
    e.preventDefault();
    setShowProfile(!showProfile)
  } 

  return (
    <Div main h="100vh">
      <Div col back="red" flexG='1' maxW='30%'>
        <Div h="60px" back="lightgreen" flexG="0" just="center" align="center">
          <Txt mg="0 10px">Create</Txt>
          <Txt mg="0 10px">Join</Txt>
          <Div
            onClick={e => showProfileMenu(e)}
          >
            <Txt>Prof</Txt>
          </Div>
          <Div mgL="10px" w="80px" h="100%" back="green" just="center" align="center" back="white"
            onClick={e => signOut(e)}
          >
            <Txt color="green">LogOut</Txt>
          </Div>
        </Div>
        <ProfileBox back="pink" show={showProfile} w="100%" col mgT="0" just="flex-start" align="flex-start">
        <Div w={'100%'} just="flex-end">
          <Div transf='rotate(45deg)' mgR="20px"
            onClick={e => showProfileMenu(e)}
          >
            <Txt fSize="28px" bold >+</Txt>
          </Div>
        </Div>
          <MenuItem pad={'10px 0'} w="100%" just="flex-start" align="center">
            <Txt mgL="10px">Company</Txt>
          </MenuItem>
        </ProfileBox>
        <Div col back="blue" w="100%">
          <JamsList />
        </Div>
      </Div>
      <Div col back="lightblue" flexG='3'>
          {children}
      </Div>
    </Div>
  );
};

export default Layout;