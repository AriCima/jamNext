import React from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase';
import { Div, Txt } from "../../styledComps";

const Layout = ({ children }) => {

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

  return (
    <Div main>
      <Div col back="red" flexG='1' maxW='30%'>
        <Div pad="50px" back="lightgreen" flexG="0">
          Create
          Join
          <Div mgL="10px" w="80px" h="100%" back="green" just="center" align="center" back="white"
            onClick={e => signOut(e)}
          >
            <Txt color="green">LogOut</Txt>
          </Div>
        </Div>
        <Div pad="50px">
          Listado Principal
        </Div>
      </Div>
      <Div col back="lightblue" flexG='3'>
          {children}
      </Div>
    </Div>
  );
};

export default Layout;