import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import s from './Nav.scss';

export default class Nav extends Component {
  render() {
    return (
      <ul className={s.nav}>
      {
        this.props.tabs.map((item, i) => (
          <li key={i}>
            <Link to={item.path} className="gray-dark">{item.text}</Link>
          </li>
        ))
      }
      </ul>
    )
  }
}

Nav.defaultProps = {
  tabs: [
    {
      text: '首页',
      path: '/',
    },
    {
      text: 'Counter',
      path: '/counter',
    },
  ]
}