// src https://codesandbox.io/s/tables-styled-components-v7vgb?from-embed=&file=/src/data.js:13-282
import Table from '../../styledComps/table';

const TableMarkup = ({ titles, data }) => (
    <Table>
        <th>
            {titles.map((t, key)=> {
                return (
                    <td key={key}>{t.title}</td>
                )
            })}
        </th>

        <tr>
            {data.map((d, key)=> {
                return (
                    <tr key={key}>
                        <td>{d.countryName}</td>
                        <td>{d.capital}</td>
                        <td>{d.currency}</td>
                    </tr>
                )
            })}

        </tr>
    </Table>
);

export default TableMarkup;