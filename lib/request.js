import { path, propEq } from 'ramda';

const { localStorage } = typeof window !== 'undefined' ? window : {
  localStorage: {
    getItem: () => false,
  },
};

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  return response.json().then((data) => {
    error.errors = data.errors;
    error.message = data.message;
    throw error;
  });
}

export function authHeader() {
  // return authorization header with jwt token
  const token = localStorage.getItem('eventifyState') && path(['auth', 'data', 'token'], JSON.parse(localStorage.getItem('eventifyState')));
  if (token) {
    return {
      Authorization: token,
    };
  }
  return {};
}

const makeDefaultOptions = (options) => {
  const contentType = !propEq('method', 'GET', options)
    ? { 'Content-Type': 'application/json;charset=UTF-8' }
    : {};
  return (
    {
      headers: {
        ...contentType,
        ...authHeader(),
      },
      ...options,
    }
  );
};

export default function request(url, options = { method: 'GET' }) {
  return fetch(url, makeDefaultOptions(options))
    .then(checkStatus)
    .then(parseJSON);
}
