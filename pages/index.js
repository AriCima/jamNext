import Head from 'next/head'
import loadDB from '../firebase.config';
import styles from '../styles/Home.module.css'
import Title from '../styledComps/title';
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jammint</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Title>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </Title>

        
      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}

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

