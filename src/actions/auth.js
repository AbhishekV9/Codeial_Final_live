import { APIUrls } from '../helpers/url';
import {
    LOGIN_START,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    AUTHENTICATE_USER,
    LOG_OUT,
    SIGNUP_START,
    SIGNUP_FAILED,
    SIGNUP_SUCCESS,
    CLEAR_AUTH_STATE
} from './actionTypes';
import { getFormBody } from '../helpers/utils';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    // user:user shorthand
    user,
  };
}

export function login(email, password) {
  //this is the asynchronus action, the action which will require redux thunk package,since this is an asynchronus action we will be returning a function from this
  return (dispatch) => {
    dispatch(startLogin());
    const url = APIUrls.login();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', //my api are built in such a way that they require the data,whatever we are sending it to the server in a particular format that format is url-form-encoded so we have ro set that in headers and here i need to set the content type because i am sending the content type of a url-form-encoded and the form-encoded-url looks like:- application/x-www-form-urlencoded
      },
      body: getFormBody({ email, password }), //body should also of type form-url-encoded
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          //dispatch action to save user
          localStorage.setItem('token',data.data.token);
          dispatch(loginSuccess(data.data.user));
          return;
        }
        dispatch(loginFailed(data.message));
      });
  };
}

export function authenticateUser(user) {
    return {
      type: AUTHENTICATE_USER,
      user,
    };
  }
  
  export function logoutUser() {
    return {
      type: LOG_OUT,
    };
  }
  
export function signup(email, password, confirmPassword, name) {
return (dispatch) => {
    const url = APIUrls.signup();
    fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: getFormBody({
        email,
        password,
        confirm_password: confirmPassword,
        name,
    }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('data', data);
        if (data.success) {
        // do something
        localStorage.setItem('token', data.data.token);
        dispatch(signupSuccessful(data.data.user));
        return;
        }
        dispatch(signupFailed(data.message));
    });
};
}

export function startSingup() {
return {
    type: SIGNUP_START,
};
}

export function signupFailed(error) {
return {
    type: SIGNUP_FAILED,
    error,
};
}

export function signupSuccessful(user) {
return {
    type: SIGNUP_SUCCESS,
    user,
};
}

export function clearAuthState(){
  return{
  type: CLEAR_AUTH_STATE
  }
}

