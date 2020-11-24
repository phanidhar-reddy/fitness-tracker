import * as ActionTypes from "./action";

export const addError = (message) => {
  return { type: ActionTypes.ADD_ERROR, error: message };
};

export const addInfo = (message) => {
  return { type: ActionTypes.ADD_INFO, info: message };
};

export const clearAll = (message) => {
  return { type: ActionTypes.CLEAR_ALL };
};
