import React, { Component } from 'react';
import s from './Loading.scss';

export default class Loading extends Component {
  render() {
    return (
      <div className={s.loading}>
        <i className="icon-loading" />
      </div>
    )
  }
}