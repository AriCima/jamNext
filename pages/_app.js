import React, { useState, useEffect } from 'react';
import '../styles/globals.css';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { setUserInfo, setUserJams } from '../redux/actions/userActions';
import { setDictionary } from '../redux/actions/dictionaryActions';
import store from '../redux/index';
import firebase from '../firebase.config';
import DataService from '../services/DataService';
import dictionary from '../locale';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const theme = {
  colorsLuft: {
    primary: '#FCA311',
    second: '#14213D',
    gray: '#ACACAC',
    lightGray: '#E5E5E5',
  },
  colorsHol: {
    primary: '#EB5E28',
    second: '#403D39',
    gray: '#ACACAC',
    lightGray: '#CCC5B9',
    cream: '#FFFCF2',
    black: '#252422',
  },
};

const MyComponent = ({ Component, pageProps }) => {
  const [userJams, setUserJam] = useState([]);
  const [adminJams, setAdminJams] = useState([]);
  const dispatch = useDispatch();

  const { userId, lenguage } = useSelector((state) => state.userReducer);

  firebase.auth().onAuthStateChanged(async (user) => {
    if (user && !userId) {
      const userInfo = await DataService.getUserInfo(user.uid);
      const userLenguage = dictionary[lenguage];
      dispatch(setDictionary(userLenguage));

      dispatch(setUserInfo({ userId: user.uid, ...userInfo }));
    }
  });

  useEffect(() => {
    if (userId) {
      const unsubscribe = DataService.getUserJams(
        userId,
        (jams) => setAdminJams(jams),
        (jams) => setUserJam(jams),
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
