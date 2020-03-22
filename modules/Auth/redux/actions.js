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

export const logoutSuccess = payload => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
    payload
  };
};

export const fetchUserRequest = payload => {
  return {
    type: actionTypes.FETCH_USER_REQUEST,
    payload
  };
};
export const fetchUserSuccess = payload => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    payload
  };
};
export const fetchUserError = payload => {
  return {
    type: actionTypes.FETCH_USER_ERROR,
    payload
  };
};

export function fetchTokenSuccess(payload) {
  return {
    type: actionTypes.FETCH_PARTICIPATION_TOKEN_SUCCESS,
    payload
  };
}