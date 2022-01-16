import React from "react";

export default function withFormat(Component, groupBy = false, formatType) {
  return class extends React.Component {
    static get displayName() {
      const name = Component.displayName ||
        Component.name || 'Component';
      return `WithFormat(${name})`;
    }

    group(data) {
      let groupedData;

      if (groupBy === 'year') {
        groupedData = data.reduce((acc, data) => {
          const index = acc.findIndex((item) => item[groupBy].getFullYear() === data.date.getFullYear());
          if (index === -1) {
            acc.push({ [groupBy]: data.date, amount: data.amount })
          } else {
            acc[index].amount += data.amount;
          }
          return acc;
        }, []);
      } else if (groupBy === 'month') {
        groupedData = data.reduce((acc, data) => {
          const index = acc.findIndex((item) => item[groupBy].getMonth() === data.date.getMonth());
          if (index === -1) {
            acc.push({ [groupBy]: data.date, amount: data.amount })
          } else {
            acc[index].amount += data.amount;
          }
          return acc;
        }, []);
      }

      return groupedData;
    }

    sort(data) {
      if (!groupBy || groupBy === 'year') {
        return data.sort((a, b) => b.date - a.date);
      }

      if (groupBy === 'month') {
        return data.sort((a, b) => b[groupBy].getMonth() - a[groupBy].getMonth());
      }
    }

    format(data) {
      const keyFormat = groupBy || 'date';
      let formattedData;
      if (formatType === 'YYYY') {
        formattedData = data.map((item) => ({ ...item, [keyFormat]: item[keyFormat].getFullYear() }));
      } else if (formatType === 'MMM') {
        formattedData = data.map((item) => ({ ...item, [keyFormat]: item[keyFormat].toDateString().slice(4, 7) }));
      } else if (formatType === 'YYYY-MM-DD') {
        formattedData = data.map((item) => ({ ...item, [keyFormat]: new Date(item.date).toISOString().slice(0, 10) }));
      }

      return formattedData;
    }

    render() {
      const mapData = this.props.list.map((item) => ({ ...item, date: new Date(item.date) }));
      let groupedData = mapData;
      if (groupBy) {
        groupedData = this.group(mapData);
      }
      const sortedData = this.sort(groupedData);
      const formattedData = this.format(sortedData);
      return <Component {...this.props} list={formattedData} />
    }
  }
}
