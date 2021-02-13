
import qs from 'qs'
import { API_URL } from '../../config'

import { all,call, fork,put, select, takeLatest } from 'redux-saga/effects';

import { 
  LOAD_LIST,
  SIGNUP_USER,
  SIGNIN_USER,
  GET_CART_ITEMS,
  SEND_FEEDBACK,
  ADD_ADDRESS,
  GET_ADDRESS,
  ADD_ORDER,
  GET_ORDER,
  GET_SIGNIN_USER,
  ADD_USER_ID,
  CONFIRM_ORDER,

 } from './constants';

import { 
  reposLoaded, 
  repoLoadingError,
  getFilterListSuccess,
  userSignUpSuccess ,
  userSignInSuccess,
  getCartListSuccess,
  sendFeedbackSuccess,
  addAddressSuccess,
  getAddress,
  addOrderSuccess,
  getOrderSuccess,
  getCurrentUserSuccess,
  userIdCartSuccess,
  confirmOrderSuccess

} from './actions';

import { showMessage} from 'containers/App/actions';

import request from 'utils/request';
import { 
  makeSelectUsername,
  makeSelectFilter,
  makeItems,
  makeCart
} from './selectors';
import axios from 'axios'

const getFilterListRequest = async (payload) =>

await axios({
  method: "get",
  url: `${API_URL}productsFilter`,
  headers: {'Content-Type': 'application/json'},
  params:{
    filters : payload
  }
})
.then ()
.catch (error => error);

const getCartListRequest = async (payload) =>

await axios({
  method: "get",
  url: `${API_URL}productsCart`,
  headers: {'Content-Type': 'application/json'},
  params:{
    ids : payload
  }
})
.then ()
.catch (error => error);

const getUserAddressRequest = async () =>

await axios({
  method: "get",
  url: `${API_URL}addressById`,
  headers: {
    'Content-Type': 'application/json',
    'authorization': localStorage.getItem('token')
  },
  params:{
    userId: localStorage.getItem('userId')
  }
})
.then ()
.catch (error => error);

const getUserOrderRequest = async () =>

await axios({
  method: "get",
  url: `${API_URL}userOrders`,
  headers: {
    'Content-Type': 'application/json',
    'authorization':localStorage.getItem('token')
  },
  params:{
    userId: localStorage.getItem('userId')
  }
})
.then ()
.catch (error => error);

const createUserWithEmailPasswordRequest = async (email, password,firstName) =>
await axios({
  method: "post",
  url: `${API_URL}register`,
  headers: {'Content-Type': 'application/json'},
  data: {
      email : email,
      password : password,
      firstName : firstName
  }
})
.then (authUser => authUser)
.catch (error => error);

const signInUserWithEmailPasswordRequest = async (email, password) =>
await axios({
  method: "post",
  url: `${API_URL}login`,
  headers: {'Content-Type': 'application/json'},
  data: {
      userName : email,
      password : password,
      type     : 'user'
  }
})
.then (authUser => authUser)
.catch (error => error);

const sendUserFeedbackRequest = async (text, type) =>
await axios({
  method: "post",
  url: `${API_URL}tickets`,
  headers: {
    'Content-Type': 'application/json',
    'authorization': localStorage.getItem('token')
  },
  data: {
      type : type,
      text : text,
      userId: localStorage.getItem("userId")
  }
})
.then ()
.catch (error => error);

const sendUserAddressRequest = async (street, unit, postal) =>
await axios({
  method: "post",
  url: `${API_URL}address`,
  headers: {
    'Content-Type': 'application/json',
    'authorization': localStorage.getItem('token')
  },
  data: {
      street : street,
      unit   : unit,
      code : postal,
      userId :  localStorage.getItem('userId')
  }
})
.then ()
.catch (error => error);

const addUserOrderRequest = async (dTime, pMethod, dAddress, orderType, note, cart) =>
await axios({
  method: "post",
  url: `${API_URL}orders`,
  headers: {
    'Content-Type': 'application/json',
    'authorization': localStorage.getItem('token')
  },
  data: {
      userId    : localStorage.getItem("userId"),
      dTime     : dTime,
      pMethod   : pMethod,
      dAddress  : dAddress,
      orderType : orderType,
      note      :note,
      cart      :cart
  }
})
.then (authUser => authUser)
.catch (error => error);

const getCurrentSigninUserRequest = async () =>
await axios({
  method: "get",
  url: `${API_URL}user`,
  headers: {
    'Content-Type': 'application/json',
    'authorization': localStorage.getItem('token')
  },
  params:{
    userId: localStorage.getItem('userId')
  }
})
.then ()
.catch (error => error);

const setUserIdCartRequest = async (idImage, idNumber) =>
await axios({
  method: "put",
  url: `${API_URL}users`,
  headers: {
    'Content-Type': 'application/json',
    'authorization': localStorage.getItem('token')
  },
  data: {
    userId      : localStorage.getItem("userId"),
    idNumber    : idNumber,
    idCardImage : idImage,
  }
})
.then (authUser => authUser)
.catch (error => error);

const setOrderConfirmRequest = async (id,oType) =>
await axios({
  method: "put",
  url: `${API_URL}orderConfirm`,
  headers: {
    'Content-Type': 'application/json',
    'authorization': localStorage.getItem('token')
  },
  data: {
    userId      : localStorage.getItem("userId"),
    orderId     : id,
    type        : oType
  }
})
.then (authUser => authUser)
.catch (error => error);


function* getFilterList() {

  const filters = yield select(makeSelectFilter());

  try {
    const filterList = yield call (getFilterListRequest,filters);
    if (filterList.message) {
        yield put (showMessage (filterList.message));
    } else {
        yield put (getFilterListSuccess (filterList.data.data));
    }
  } catch (error) {
      yield put (showMessage (error));
  }
}

function* getCartList() {

  const items = yield select(makeCart());

  const arrayItems = []
  items.map((item)=>(arrayItems.push(item.itemId)))

  const itemsObject ={}
    Object.assign(itemsObject, arrayItems)

  try {
    const cartLists = yield call (getCartListRequest,itemsObject);
    if (cartLists.message) {
        yield put (showMessage (cartLists.message));
    } else {
        yield put (getCartListSuccess (cartLists.data.data));
    }
  } catch (error) {
      yield put (showMessage (error));
  }
}

function* sendUserFeedback({ payload }) {

  const {text, type } = payload;

  try {
    const feedbackSend = yield call (sendUserFeedbackRequest,text, type);
    if (feedbackSend.message) {
        yield put (showMessage(feedbackSend.message));
    } else {
        yield put (sendFeedbackSuccess ());
    }
  } catch (error) {
      yield put (showMessage (error));
  }
}

function* sendUserAddress({ payload }) {

  const {street, unit, postal } = payload;

  try {
    const addressSend = yield call (sendUserAddressRequest,street, unit, postal);

    if (addressSend.message) {
        yield put (showMessage(addressSend.message));
    } else {
        yield put (getAddress ());
    }
  } catch (error) {
      yield put (showMessage (error));
  }
}

function* getUserAddress() {

  console.log("im here")
  try {
    const addressGet = yield call (getUserAddressRequest);
    console.log("addressGet",addressGet)

    if (addressGet.message) {
        yield put (showMessage(addressGet.message));
    } else {
        yield put (addAddressSuccess (addressGet.data.data));
    }
  } catch (error) {
      yield put (showMessage (error));
  }
}

function* getUserOrders() {

  try {
    const userOrders = yield call (getUserOrderRequest);

    console.log("userOrders",userOrders)

    if (userOrders.message) {
        yield put (showMessage(userOrders.message));
    } else {
        yield put (getOrderSuccess (userOrders.data.data));
    }
  } catch (error) {
      yield put (showMessage (error));
  }
}

function* createUserWithEmailPassword ({ payload }) {
  const { email, password, firstName } = payload;

  try {
    const signUpUser = yield call (createUserWithEmailPasswordRequest, email, password, firstName);
    console.log("user sign up :",signUpUser)
    if (signUpUser.message) {
        yield put (showMessage (signUpUser.message));
    } else {
      localStorage.setItem ('token', signUpUser.data.data.token);
      localStorage.setItem ('userId', signUpUser.data.data.userId);
      yield put (userSignUpSuccess (signUpUser.data.data));
    }
  } catch (error) {
      yield put (showMessage (error));
  }
}

function* signInUserWithEmailPassword ({ payload }) {
  const { email, password } = payload;
  try {
    const signInUser = yield call (signInUserWithEmailPasswordRequest, email, password);

    if (signInUser.message) {
        yield put (showMessage (signInUser.message));
    } else {
      localStorage.setItem ('token', signInUser.data.data.token);
      localStorage.setItem ('userId', signInUser.data.data._id);
      yield put (userSignInSuccess (signInUser.data.data));
    }
  } catch (error) {
    console.log("error+++>",error)

      yield put (showMessage (error));
  }
}

function* addUserOrder ({ payload }) {
  const { dTime, pMethod, dAddress, orderType, note, cart } = payload;
  try {
    const userOrder = yield call (addUserOrderRequest, dTime, pMethod, dAddress, orderType, note, cart);

    console.log("userOrder",userOrder)

    if (userOrder.message) {
        yield put (showMessage (userOrder.message));
    } else {
      yield put (addOrderSuccess (userOrder.data.data));
    }
  } catch (error) {
    console.log("error+++>",error)

      yield put (showMessage (error));
  }
}

function* getCurrentSigninUser() {

  try {
    const user = yield call (getCurrentSigninUserRequest);
    if (user.message) {
        yield put (showMessage(user.message));
    } else {
      yield put (getCurrentUserSuccess (user.data.data[0]));
    }
  } catch (error) {
      yield put (showMessage (error));
  }

}

function* setUserIdCart ({ payload }) {
  const { idImage, idNumber } = payload;
  try {
    const user = yield call (setUserIdCartRequest, idImage, idNumber);

    console.log("user id cart",user)

    if (user.message) {
        yield put (showMessage (user.message));
    } else {
      yield put (userIdCartSuccess());
    }
  } catch (error) {
    console.log("error+++>",error)

      yield put (showMessage (error));
  }
}

function* setOrderConfirm ({payload}) {
  const { id, oType } = payload;
  console.log(" payload to confirm",payload)

  try {
    console.log(" id to confirm",id)
    console.log(" id to confirm",oType)

    const order = yield call (setOrderConfirmRequest, id,oType);

    console.log("user id cart",order)

    if (order.message) {
        yield put (showMessage (order.message));
    } else {
      yield put (confirmOrderSuccess());
    }
  } catch (error) {
    console.log("error+++>",error)

      yield put (showMessage (error));
  }
}

export function* listData() {
  yield takeLatest(LOAD_LIST, getFilterList);
}

export function* signUpData() {
  yield takeLatest(SIGNUP_USER, createUserWithEmailPassword);
}

export function* signInData() {
  yield takeLatest(SIGNIN_USER, signInUserWithEmailPassword);
}

export function* getCartData() {
  yield takeLatest(GET_CART_ITEMS, getCartList);
}

export function* sendFeedback() {
  yield takeLatest(SEND_FEEDBACK, sendUserFeedback);
}

export function* senAddress() {
  yield takeLatest(ADD_ADDRESS, sendUserAddress);
}

export function* userAddress() {
  yield takeLatest(GET_ADDRESS, getUserAddress);
}

export function* userGetOrders() {
  yield takeLatest(GET_ORDER, getUserOrders);
}

export function* userOrder() {
  yield takeLatest(ADD_ORDER, addUserOrder);
}

export function* currentUser() {
  yield takeLatest(GET_SIGNIN_USER, getCurrentSigninUser);
}

export function* userIdCart() {
  yield takeLatest(ADD_USER_ID, setUserIdCart);
}

export function* orderConfirm() {
  yield takeLatest(CONFIRM_ORDER, setOrderConfirm);
}

export default function* rootSaga () {
  yield all ([fork (listData),
    fork (getCartData),
    fork (signUpData),
    fork (senAddress),
    fork (userAddress),
    fork (currentUser),
    fork (userGetOrders),
    fork (userIdCart),
    fork (sendFeedback),
    fork (userOrder),
    fork (orderConfirm),
    fork (signInData)]);
  }

  
  