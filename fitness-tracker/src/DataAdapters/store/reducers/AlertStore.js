import * as ActionTypes from "../Actions/action";

const intiState = {
  error: [],
  warning: [],
  info: [],
};

const alertReducer = (state = intiState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ERROR:
      return {
        ...intiState,
        error: [action.error],
      };
    case ActionTypes.ADD_INFO:
      return {
        ...intiState,
        info: [action.info],
      };
    case ActionTypes.ADD_WARNING:
      return {
        ...intiState,
        warning: [action.warning],
      };
    case ActionTypes.CLEAR_ALL:
      return {
        ...intiState,
      };
    default:
      break;
  }
  return state;
};

export default alertReducer;
