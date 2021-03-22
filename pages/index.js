import Head from 'next/head'

import styles from '../styles/Home.module.css'
import Title from '../styledComps/title';
import { getInitialProps } from 'next/dist/next-server/lib/utils';
import Login from './login';
import Div from '../styledComps/divs';
import Register from './register';
import Table from '../domains/table';

const data = [
  {
    countryName: "Afghanistan",
    capital: "Kabul",
    currency: "Afghani"
  },
  {
    countryName: "Albania",
    capital: "Tirane",
    currency: "Lek"
  },
  {
    countryName: "Algeria",
    capital: "Algiers",
    currency: "Dinar"
  }
];

const titles = [{title: 'Pais'}, {title: 'Capital'}, {title: 'Moneda'}];

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jammint</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className={styles.main}>
        <Login />
        <Register />
        <Table data={data} titles={titles}/>
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

