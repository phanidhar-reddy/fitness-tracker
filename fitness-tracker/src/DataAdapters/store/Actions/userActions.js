import * as ActionTypes from "./action";

export const addUserData = (userInfo) => {
  return { type: ActionTypes.ADD_USER_DATA, userInfo: userInfo };
};

export const clearAllUserData = () => {
  return { type: ActionTypes.CLEAR_ALL_USER_DATA };
};
