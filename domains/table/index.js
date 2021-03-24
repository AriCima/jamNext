// src https://codesandbox.io/s/tables-styled-components-v7vgb?from-embed=&file=/src/data.js:13-282
import Table from '../../styledComps/table';

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
                        <td>{d.countryName}</td>
                        <td>{d.capital}</td>
                        <td>{d.currency}</td>
                    </tr>
                )
            })}

        </tbody>
    </Table>
);

export default TableMarkup;