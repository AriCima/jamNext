// src https://codesandbox.io/s/tables-styled-components-v7vgb?from-embed=&file=/src/data.js:13-282
import Table from '../../styledComps/table';
/*
const title =[
    { 
        id: 'countryName', 
        title: 'País de Origen'
    },
    { 
        id: 'capital', 
        title: 'Capital del País'
    },
    { 
        id: 'currency', 
        title: 'Moneda'
    },
];

const data =[
    { 
        id: 'ID0001', 
        conuntryName: 'Noruega',
        capital: 'Oslo',
        currency: 'Corona Noruega'
    },
    { 
        id: 'ID0002', 
        conuntryName: 'Argentina',
        capital: 'Buenos Aires',
        currency: 'Peso Argentino'
    },
    { 
        id: 'ID0003', 
        conuntryName: 'España',
        capital: 'Madrid',
        currency: 'Euro'
    },
];*/

const TableMarkup = ({ titles, data }) => (
    <Table>
        <thead>
            <tr>
                {titles.map((t, key)=> {
                    return (
                        <th key={key}>{t.title}</th>
                    )
                })}
            </tr>
        </thead>
        <tbody>
            {data.map((d, key)=> {
                return (
                    <tr key={key}>
                        {titles.map((t,index) => <td key={`${key}${index}`}> {d[t.id] || ''} </td>)}
                    </tr>
                )
            })}
        </tbody>
    </Table>
);

export default TableMarkup;