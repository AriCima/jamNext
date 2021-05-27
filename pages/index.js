import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useSelector } from 'react-redux'

import Head from 'next/head'
import NavBarApp from '../domains/NavBarApp';

import { SubTitle, Txt, Div, Title, Footer, AppContainer } from '../styledComps';


const Home = () => {
  const router = useRouter();
  const { userId } = useSelector(state => state.userReducer)

  useEffect(() => {
    userId && router.push('/jam');
  }, [userId])

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