import React, { useState, useEffect } from 'react';
import data from './data';
import './highlight.css';
import './wrap-item-highlight.css';
import { nanoid } from 'nanoid'

function New(props) {
  return (
    <div className={'highlight__wrap-item wrap-item-highlight wrap-item-highlight_new'}>
      <div className={'wrap-item-highlight__body'}>
        <span className={'wrap-item-highlight__label'}>New</span>
        {props.children}
      </div>
    </div>
  )
};

function Popular(props) {
  return (
    <div className={'highlight__wrap-item wrap-item-highlight wrap-item-highlight_popular'}>
      <div className={'wrap-item-highlight__body'}>
        <span className={'wrap-item-highlight__label'}>Popular</span>
        {props.children}
      </div>
    </div>
  )
};

function Video(props) {
  return (
    <>
      <div className={'item-highlight__wrap'}>
        <iframe
          className={'item-highlight__content'}
          src={props.url} title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen">
        </iframe>
      </div>
      <p className={'item-highlight__views'}>Просмотров: {props.views}</p>
    </>
  )
};

function Article(props) {
  return (
    <>
      <div className={'item-highlight__wrap'}>
        <div className={'item-highlight__content article-highlight'}>
          <div className={'article-highlight__title'}>
            <a className={'article-highlight__link'} href={'#task2'}>{props.title}</a>
          </div>
        </div>
      </div>
      <p className={'item-highlight__views'}>Просмотров: {props.views}</p>
    </>
  )
};

function getContent(item) {
  const content = {
    video: <Video {...item} />,
    article: <Article {...item} />,
  }

  return content[item.type];
}

function ItemHighlight({ item }) {
  return (
    <div className={'highlight__item item-highlight'}>
      <div className={'item-highlight__body'}>
        {getContent(item)}
      </div>
    </div>
  )
}

function withLabel(Component) {
  return function Wrapper(props) {
    const labels = {
      new: <New children={<Component {...props} />} />,
      popular: <Popular children={<Component {...props} />} />,
      default: <Component {...props} />,
    }

    const { views } = props.item;
    let label = 'default';

    if (views < 100) label = 'new';
    else if (views > 1000) label = 'popular';

    return labels[label]
  }
}

const ItemHighlightWithLabel = withLabel(ItemHighlight);

function List(props) {
  return props.list.map((item) => <ItemHighlightWithLabel key={nanoid()} item={item} />);
};

export default function Highlight() {
  const [list, setList] = useState([]);

  useEffect(() => setList(data), []);

  return (
    <div className={'highlight'}>
      <List list={list} />
    </div>
  );
}
