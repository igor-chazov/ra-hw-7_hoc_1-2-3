import React from 'react';
import './aggregation.css';
import MonthTable from './MontTable';
import YearTable from './YearTable';
import SortTable from './SortTable';
import withFormat from './withFormat';

const MonthTableWithFormat = withFormat(MonthTable, 'month', 'MMM');
const YearTableWithFormat = withFormat(YearTable, 'year', 'YYYY');
const SortTableWithFormat = withFormat(SortTable, false, 'YYYY-MM-DD');

export default class Aggregation extends React.Component {
  state = {
    list: []
  };

  componentDidMount() {
    fetch(process.env.REACT_APP_DATA_URL)
      .then(response => response.json())
      .then(data => this.setState(data));
  }

  render() {
    const { list } = this.state;
    return (
      <div className={'aggregation'}>
        <MonthTableWithFormat list={list} />
        <YearTableWithFormat list={list} />
        <SortTableWithFormat list={list} />
      </div>
    );
  }
}
