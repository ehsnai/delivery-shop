/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const SHOW_SIGNUP_MODAL_OPEN = 'delivery/Header/SHOW_SIGNUP_MODAL_OPEN'
export const SHOW_SIGNUP_MODAL_CLOSE = 'delivery/Header/SHOW_SIGNUP_MODAL_CLOSE'

export const SHOW_SIGNIN_MODAL_OPEN = 'delivery/Header/SHOW_SIGNIN_MODAL_OPEN'
export const SHOW_SIGNIN_MODAL_CLOSE = 'delivery/Header/SHOW_SIGNIN_MODAL_CLOSE'

export const SHOW_CART_MODAL_OPEN = 'delivery/Header/SHOW_CART_MODAL_OPEN'
export const SHOW_CART_MODAL_CLOSE = 'delivery/Header/SHOW_CART_MODAL_CLOSE'

export const SIGNUP_USER  = 'delivery/Header/SIGNUP_USER';
export const SIGNUP_USER_SUCCESS  = 'delivery/Header/SIGNUP_USER_SUCCESS';
export const SIGNIN_USER = 'delivery/Header/SIGNIN_USER';
export const SIGNIN_USER_SUCCESS = 'delivery/Header/SIGNIN_USER_SUCCESS';
export const SIGNOUT_USER = 'delivery/Header/SIGNOUT_USER';
export const SIGNOUT_USER_SUCCESS = 'delivery/Header/SIGNOUT_USER_SUCCESS';

export const SHOW_MESSAGE               = 'delivery/Home/SHOW_MESSAGE'
