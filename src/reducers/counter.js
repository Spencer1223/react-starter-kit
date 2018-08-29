import * as actionTypes from '../constants/index';

/*
* 初始化state
 */

const initState = {
  count: 0
};
/*
* reducer
*/
const counter = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return {
        count: state.count + 1
      };
      break;
    case actionTypes.DECREMENT:
      return {
        count: state.count - 1
      };
      break;
    case actionTypes.RESET:
      return { count: 0 };
      break
    default: return state; break;
  }
};

export {
  counter
};