import PropTypes from 'prop-types';

function MonthTable({ list }) {
  return (
    <div>
      <h2>Month Table</h2>
      <table>
        <tbody>
          <tr>
            <th>Month</th>
            <th>Amount</th>
          </tr>
          {list.map(item => (
            <tr key={Math.random(10000000)}>
              <td>{item.month}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

MonthTable.propTypes = {
  list: PropTypes.array.isRequired
}

export default MonthTable;
