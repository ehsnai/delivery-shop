/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { SHOW_MESSAGE,SHOW_SIGNUP_MODAL_OPEN,SHOW_SIGNUP_MODAL_CLOSE } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SHOW_MESSAGE:

        console.log('your message',action.payload)

        break;





    }
  });

export default appReducer;
