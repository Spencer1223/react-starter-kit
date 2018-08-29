import * as actionTypes from '../constants/index';

export function increment() {
  return {
    type: actionTypes.INCREMENT,
  }
}

export function decrement() {
  return {
    type: actionTypes.DECREMENT,
  }
}

export function reset() {
  return {
    type: actionTypes.RESET,
  }
}