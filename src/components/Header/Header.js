import React, { Component } from 'react';
import s from './Header.scss';

export default class Header extends Component {
  handleBack = () => {
    window.history.back();
  }

  render() {
    const { title, style } = this.props;
    return (
      <div className={s.header} style={style ? style : null}>
        <div className={s.header_back} onClick={this.handleBack}>
          <i className="icon-keyboard_arrow_left" />
        </div>
        <div className={s.header_title}>
          {title}
        </div>
        <div className={s.header_right}>

        </div>
      </div>
    )
  }
}