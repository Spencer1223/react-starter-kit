import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import s from './HomeHeader.scss';

class HomeHeader extends Component {
  render() {
    return (
      <div className={s.header}>
        <div className={s.cityName}>
          <Link to=""><i className="icon-user-circle-o white font-biggest-plus" /></Link>
        </div>
        <div className={s.searchBar}>
          <div className={s.searchInput}>
            <i className="icon-search" />
            <input type="text" className={`.input ${s.inputSearch}`} placeholder="请输入关键字" />
          </div>
        </div>
        <div className={s.musicIcon}>
          <Link to="">
            <div className={s.musicIconAnimate}>
            {
              ['one', 'two', 'three', 'four'].map((ele, i) => {
                return (
                  <span key={i} className={`${ele} playing`} />
                )
              })
            }
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default HomeHeader;