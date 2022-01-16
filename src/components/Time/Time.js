import React, { useState, useEffect } from 'react';
import './time.css';
import getTimeAgo from './utility';
import data from './data';
import { nanoid } from 'nanoid'

function DateTime(props) {
  return (
    <p className="item-time__date">{props.date}</p>
  )
}

function DateTimePretty(Component) {
  return function Wrapper(props) {
    return <Component {...props} date={getTimeAgo(props.date)} />
  }
}

const TimeAgo = DateTimePretty(DateTime);

function Video(props) {
  return (
    <div className={'time__item item-time'}>
      <div className={'item-time__body'}>
        <div className={'item-time__video'}>
          <iframe src={props.url} title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"></iframe>
        </div>
        <TimeAgo date={props.date} />
      </div>
    </div>
  )
}

function VideoList(props) {
  return props.list.map((item) => <Video key={nanoid()} url={item.url} date={item.date} />);
}

export default function Time() {
  const [list, setList] = useState([]);

  useEffect(() => setList(data), []);

  return (
    <div className={'time'}>
      <VideoList list={list} />
    </div>
  );
}
