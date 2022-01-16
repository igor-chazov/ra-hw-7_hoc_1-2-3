import propTypes from 'prop-types';

function SortTable({ list }) {
  return (
    <div>
      <h2>Sort Table</h2>
      <table>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Amount</th>
          </tr>
          {list.map(item => (
            <tr key={Math.random(10000000)}>
              <td>{item.date}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

SortTable.propTypes = {
  list: propTypes.array.isRequired
}

export default SortTable;
