

import { 
  SIGNUP_USER,
  SIGNIN_USER,
  SHOW_MESSAGE,
  SIGNUP_USER_SUCCESS,
  SHOW_SIGNUP_MODAL_OPEN ,
  SHOW_SIGNUP_MODAL_CLOSE,
  SHOW_SIGNIN_MODAL_OPEN,
  SHOW_SIGNIN_MODAL_CLOSE,
  SHOW_CART_MODAL_OPEN,
  SHOW_CART_MODAL_CLOSE,
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */

export const userSignUp = (user) => {
  return {
      type: SIGNUP_USER,
      payload: user
  };
};
export const userSignIn = (user) => {
  return {
      type: SIGNIN_USER,
      payload: user
  };
};
export const userSignOut = () => {
  return {
      type: SIGNOUT_USER
  };
};
export const userSignUpSuccess = (authUser) => {
  return {
      type: SIGNUP_USER_SUCCESS,
      payload: authUser
  };
};

export const userSignInSuccess = (authUser) => {
  return {
      type: SIGNIN_USER_SUCCESS,
      payload: authUser
  }
};

export const userSignOutSuccess = () => {
  return {
      type: SIGNOUT_USER_SUCCESS,
  }
};

export const showRegisterModal = () => {
  return {
      type: SHOW_SIGNUP_MODAL_OPEN,
  };
};

export const closeRegisterModal = () => {
  return {
      type: SHOW_SIGNUP_MODAL_CLOSE,
  };
};

export const showLoginModal = () => {
  return {
      type: SHOW_SIGNIN_MODAL_OPEN,
  };
};

export const closeLoginModal = () => {
  return {
      type: SHOW_SIGNIN_MODAL_CLOSE,
  };
};

export const showCartModal = () => {
  return {
      type: SHOW_CART_MODAL_OPEN,
  };
};

export const closeCartModal = () => {
  return {
      type: SHOW_CART_MODAL_CLOSE,
  };
};

export const showMessage = (message) => {
  return {
      type: SHOW_MESSAGE,
      payload: message
  };
};
