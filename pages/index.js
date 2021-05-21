import React from 'react';
import { useRouter } from 'next/router';

import { setUserInfo } from '../redux/actions/userActions';
import { useDispatch } from 'react-redux'

import DataService from '../services/DataService';

import Head from 'next/head'
import NavBarApp from '../domains/NavBarApp';
import firebase from '../firebase.config';

import { SubTitle, Txt, Div, Title, Footer, AppContainer } from '../styledComps';


const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch()

  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      const userId = user.uid;
      const userInfo = {
        userId: userId,
        firstName: '',
        lastName: '',
        email: '',
        userJams: []
      }
      dispatch(setUserInfo(userInfo));
      router.push('/jam');
    }
  });

  return (
    <AppContainer col w="100%" just="flex-start">
      <Head>
        <title>Jammint</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <Div main w="100%" mg="40px 0 0 0" just="flex-start" align="center">
        <NavBarApp w="100%"/>
        <Div w="100%" col align="center">
          <Title>Welocme to jammint</Title>
          <SubTitle>Jam with your flatmates </SubTitle>
        </Div>
      </Div>

      <Footer>
        <Txt>This is the coolest footer ever existed</Txt>
      </Footer>
    </AppContainer>
  )
}

export default Home;