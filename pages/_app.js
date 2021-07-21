import React, { useEffect } from 'react';
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
  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.userReducer);

  firebase.auth().onAuthStateChanged(async (user) => {
    if (user && !userId) {
      const userInfo = await DataService.getUserInfo(user.uid);
      dispatch(setUserInfo({ userId: user.uid, ...userInfo }));
    }
  });

  const getUserJams = async () => {
    try {
      const jams = await DataService.getUserJams(userId);
      dispatch(setUserJams(jams));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    userId && getUserJams();
  }, [userId]);

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
