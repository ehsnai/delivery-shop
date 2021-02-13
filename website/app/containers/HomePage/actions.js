import { 
  LOGOUT_USER,
  SIGNUP_USER,
  SIGNIN_USER,
  SHOW_MESSAGE,
  SIGNUP_USER_SUCCESS,
  SHOW_SIGNUP_MODAL_OPEN,
  SHOW_SIGNUP_MODAL_CLOSE,
  SHOW_SIGNIN_MODAL_OPEN,
  SHOW_SIGNIN_MODAL_CLOSE,
  SHOW_CART_MODAL_OPEN,
  SHOW_CART_MODAL_CLOSE,
  SHOW_FILTER_LIST,
  SHOW_FILTER_LIST_SUCCESS,
  ADD_FILTER_STRAINS,
  REMOVE_FILTER_STRAINS,
  ADD_FILTER_ADDITIONAL,
  REMOVE_FILTER_ADDITIONAL,
  REMOVE_FILTER_CATEGORY,
  ADD_FILTER_CATEGORY,
  SORT_CHANGE,
  CLEAR_FILTER,
  SHOW_FILTER_MODAL,
  CLOSE_FILTER_MODAL,
  CHANGE_PATCH,
  SIGNIN_USER_SUCCESS,
  LOAD_LIST,
  LOAD_LIST_SUCCESS,
  ADD_TO_CARD,
  REMOVE_FROM_CARD,
  GET_CART_ITEMS,
  GET_CART_ITEMS_SUCCESS,
  CHANGE_FILTER_SEARCH,
  SHOW_FEEDBACK_MODAL,
  CLOSE_FEEDBACK_MODAL,
  SEND_FEEDBACK,
  SEND_FEEDBACK_SUCCESS,
  SHOW_VALIDATION_MODAL,
  VALIDATE_AGE,
  ADD_ADDRESS,
  ADD_ADDRESS_SUCCESS,
  GET_ADDRESS,
  CHANGE_CART_COUNT,
  ADD_ORDER,
  GET_ORDER,
  ADD_ORDER_SUCCESS,
  GET_ORDER_SUCCESS,
  GET_SIGNIN_USER,
  GET_SIGNIN_USER_SUCCESS,
  ADD_USER_ID,
  ADD_USER_ID_SUCCESS,
  CONFIRM_ORDER,
  CONFIRM_ORDER_SUCCESS,

} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 * @param  {string} password The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */

export const getFilterList = () => {
  return {
      type: LOAD_LIST,
  };
};

export const getFilterListSuccess = (list) => {
  return {
      type: LOAD_LIST_SUCCESS,
      payload: list
  };
};

export const userLogout = () => {
  localStorage.removeItem('token')
  return {
      type: LOGOUT_USER,
  };
};

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

export const getCurrentUser = () => {
  return {
      type: GET_SIGNIN_USER,
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

export const getCurrentUserSuccess = (authUser) => {
  return {
      type: GET_SIGNIN_USER_SUCCESS,
      payload: authUser
  }
};

export const userIdCart = (data) => {
  return {
      type: ADD_USER_ID,
      payload: data
  };
};

export const userIdCartSuccess = () => {
  return {
      type: ADD_USER_ID_SUCCESS,
  }
};

export const userSignOutSuccess = () => {
  return {
      type: SIGNOUT_USER_SUCCESS,
  }
};

export const setInitUrl = (url) => {
  return {
      type: INIT_URL,
      payload: url
  };
};

export const showAuthLoader = () => {
  return {
      type: ON_SHOW_LOADER,
  };
};

export const hideMessage = () => {
  return {
      type: HIDE_MESSAGE,
  };
};
export const hideAuthLoader = () => {
  return {
      type: ON_HIDE_LOADER,
  };
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

export const getCartItems = () => {
  return {
      type: GET_CART_ITEMS,
  };
};

export const getCartListSuccess = (items) => {
  return {
      type: GET_CART_ITEMS_SUCCESS,
      payload: items
  };
};

export const openCartModal = () => {
  return {
      type: SHOW_CART_MODAL_OPEN,
  };
};

export const closeCartModal = () => {
  return {
      type: SHOW_CART_MODAL_CLOSE,
  };
};


export const showValidation = () => {
  return {
      type: SHOW_VALIDATION_MODAL,
  };
};

export const validateAge = (payload) => {
  return {
      type: VALIDATE_AGE,
      payload :payload
  };
};


export const filterList = (filters) => {
  return {
      type: SHOW_FILTER_LIST,
      payload: filters
  };
};

export const filterStrainAdd = (payload) => {
  return {
      type: ADD_FILTER_STRAINS,
      payload:payload
  };
};

export const filterStrainRemove = (payload) => {
  return {
      type: REMOVE_FILTER_STRAINS,
      payload:payload
  };
};

export const filterAdditionalAdd = (payload) => {
  return {
      type: ADD_FILTER_ADDITIONAL,
      payload:payload
  };
};

export const filterAdditionalRemove = (payload) => {
  return {
      type: REMOVE_FILTER_ADDITIONAL,
      payload:payload
  };
};

export const filterCategoryAdd = (payload) => {
  return {
      type: ADD_FILTER_CATEGORY,
      payload:payload
  };
};

export const filterCategoryRemove = (payload) => {
  return {
      type: REMOVE_FILTER_CATEGORY,
      payload:payload
  };
};

export const sortChange = (payload) => {
  return {
      type: SORT_CHANGE,
      sort:payload.sort,
      sDesc:payload.sDesc
  };
};

export const filterClear = () => {
  return {
      type: CLEAR_FILTER,
  };
};

export const showFilterModal = () => {
  return {
      type: SHOW_FILTER_MODAL,
  };
};

export const closeFilterModal = () => {
  return {
      type: CLOSE_FILTER_MODAL,
  };
};

export const showFeedbackModal = () => {
  return {
      type: SHOW_FEEDBACK_MODAL,
  };
};

export const closeFeedbackModal = () => {
  return {
      type: CLOSE_FEEDBACK_MODAL,
  };
};

export const sendFeedback = (payload) => {
  return {
      type: SEND_FEEDBACK,
      payload:payload
  };
};

export const sendFeedbackSuccess = () => {
  return {
      type: SEND_FEEDBACK_SUCCESS,
  };
};

export const changeMode = (path) => {
  return {
      type: CHANGE_PATCH,
      payload:path
  };
};

export const addToCart = (item) => {
  return {
      type: ADD_TO_CARD,
      payload:item
  };
};

export const changeCartCount = (id,count) => {
  return {
      type  : CHANGE_CART_COUNT,
      id    : id,
      count : count
  };
};

export const removeFromCart = (id,text) => {
  return {
      type: REMOVE_FROM_CARD,
      id:id,
      text:text
  };
};

export const searchChange = (payload) => {
  return {
      type: CHANGE_FILTER_SEARCH,
      payload:payload
  };
};

export const addAddress = (payload) => {
  return {
      type: ADD_ADDRESS,
      payload:payload
  };
};

export const addAddressSuccess = (payload) => {
  return {
      type: ADD_ADDRESS_SUCCESS,
      payload:payload
  };
};

export const getAddress = () => {
  return {
      type: GET_ADDRESS,
  };
};

export const getOrders = () => {
  return {
      type: GET_ORDER,
  };
};

export const getOrderSuccess = (payload) => {
  return {
      type: GET_ORDER_SUCCESS,
      payload:payload
  };
};

export const addOrder = (payload) => {
  return {
      type: ADD_ORDER,
      payload:payload
  };
};

export const addOrderSuccess = () => {
  return {
      type: ADD_ORDER_SUCCESS,
  };
};


export const confirmOrder = (data) => {
  return {
      type: CONFIRM_ORDER,
      payload: data
  };
};

export const confirmOrderSuccess = (id) => {
  return {
      type: CONFIRM_ORDER_SUCCESS,
  };
};







