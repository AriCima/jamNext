import React, { useState, useEffect } from 'react';
import '../styles/globals.css';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { setUserInfo, setUserJams } from '../redux/actions/userActions';
import store from '../redux/index';
import firebase from '../firebase.config';
import DataService from '../services/DataService';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

const MyComponent = ({ Component, pageProps }) => {
  const [userJams, setUserJam] = useState([]);
  const [adminJams, setAdminJams] = useState([]);
  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.userReducer);

  firebase.auth().onAuthStateChanged(async (user) => {
    if (user && !userId) {
      const userInfo = await DataService.getUserInfo(user.uid);
      dispatch(setUserInfo({ userId: user.uid, ...userInfo }));
    }
  });

  useEffect(() => {
    if (userId) {
      const unsubscribe = DataService.getUserJams(
        userId,
        (jams) => setAdminJams(jams),
        (jams) => setUserJam(jams)
      );
      return unsubscribe;
    }
  }, [userId]);
  useEffect(() => {
    dispatch(setUserJams([...adminJams, ...userJams]));
  }, [userJams, adminJams, dispatch]);

  return <Component {...pageProps} />;
};

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <MyComponent Component={Component} pageProps={pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
