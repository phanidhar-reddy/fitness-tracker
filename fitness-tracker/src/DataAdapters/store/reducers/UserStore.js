import * as ActionTypes from "../Actions/action";

const intiState = {
  _id: "",
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: 0,
  password: "",
  gender: "",
  dob: "",
};

const userReducer = (state = intiState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_USER_DATA:
      return {
        ...action.userInfo,
      };

    case ActionTypes.CLEAR_ALL_USER_DATA:
      return {
        ...intiState,
      };
    default:
      break;
  }
  return state;
};

export default userReducer;
