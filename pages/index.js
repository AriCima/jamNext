import React from 'react';
import { connect } from 'react-redux';

import Head from 'next/head'
import NavBarApp from '../domains/NavBarApp';
import NavBarJam from '../domains/NavBarJam';

// import styles from '../styles/Home.module.css'
import { getInitialProps } from 'next/dist/next-server/lib/utils';
import { SubTitle, Txt, Div, Title, Main, Footer, AppContainer } from '../styledComps';


const Home = ({ userId = '', firstName = '' }) => {

  const noUser = userId === ''; 


  return (
    <AppContainer w="100%">
      <Head>
        <title>Jammint</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <Div main w="100%" col mg="40px 0 0 0" just="flex-start" align="center">
        {noUser ? (
          <>
            <NavBarApp w="100%"/>
            <Div w="100%" col align="center">
              <Title>Welocme to jammint</Title>
              <SubTitle>Jam with your flatmates </SubTitle>
            </Div>
          </>
          ) : (
            <>
              <NavBarJam w="100%"/>
            </>
          )
        }
      </Div>

      <Footer>
        <Txt>This is the coolest footer ever existed</Txt>
      </Footer>
    </AppContainer>
  )
}

// const mapStateToProps = (state) => {
//   const {
//     // userInfo: { userId, firstName },
//     // jamInfo: { jamId, jamName }
//   } = state;
//   return { userId, firstName }
// }

export default connect(null, null)(Home);


// Ejemplo de carga de usuarios

// static async getInitialProps() {
//   const firebase = await loadFirebase();
//   const db = firebase.firestore();
//   let result = await new Promise((resolve, reject) => {
//     db.collection('jamNext')
//       .get()
//       .then(snapshot => {
//         let data = [];
//         snapshot.forEach(doc => {
//           data.push(Object.assign(
//             {
//               id:doc.id
//             },
//             doc.data()
//           )
//           );
//         });
//         resolve(data)
//       })
//       .catch(error => {
//         reject([]);
//       });
//   });
//   return { users: result};
// }

