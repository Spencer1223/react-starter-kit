import React, { Component } from 'react';
import ReactModal from 'react-modal';
import s from './Modal.scss';

const style = {
	overlay : {
		position          : 'absolute',
		top               : 0,
		left              : 0,
		right             : 0,
		bottom            : 0,
		backgroundColor   : 'rgba(0, 0, 0, 0.45)'
	},
	content : {
		position                   : 'absolute',
		//top                        : '20%',
		width                      : '80%',
		//left                       : '10%',
		right                      : '10%',
		bottom                     : 'auto',
		minHeight                  : '20%',
		maxHeight                  : '80%',
		border                     : 'node',
		background                 : '#fff',
		overflow                   : 'auto',
		WebkitOverflowScrolling    : 'touch',
		borderRadius               : '0.5rem',
		outline                    : 'none',
		padding                    : '0',
		top: '50%',
		left: '50%'
	}
};

export default class Modal extends Component {
  render() {
    const { onRequestClose, children } = this.props;
    return (
      <ReactModal
        shouldCloseOnOverlayClick={false}
        style={style}
        { ...this.props }
        className={s.wrap}
      >
        {
          onRequestClose ?
          <button
          className={`${s.close} icon-close`}
            onClick={onRequestClose}
          ></button> : null
        }
        {children}
      </ReactModal>
    )
  }
}