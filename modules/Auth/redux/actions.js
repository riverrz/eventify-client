import * as actionTypes from "./constants";

export const signUpRequest = payload => {
  return {
    type: actionTypes.SIGNUP_REQUEST,
    payload
  };
};
export const signUpSuccess = payload => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    payload
  };
};
export const signUpError = payload => {
  return {
    type: actionTypes.SIGNUP_ERROR,
    payload
  };
};
