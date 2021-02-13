import { call, put, select, takeLatest } from 'redux-saga/effects';
import {     
  SIGNIN_USER,
  SIGNOUT_USER,
  SIGNUP_USER
} from './constants';
import { showMessage, userSignInSuccess,userSignUpSuccess} from './actions';

import request from 'utils/request';
import axios from 'axios'

/**
 * Github repos request/response handler
 */
export function* registerUser() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

const signInUserWithEmailPasswordRequest = async (username, password) => 

    await axios({
        method: "post",
        url: 'http://localhost:5000/register',
        headers: {'Content-Type': 'application/json'},
        data: {
            userName : username,
            password : password
        }
    })
    .then (authUser => authUser)
    .catch (error => error);



const createUserWithEmailPasswordRequest = async (email, password) =>
  await axios({
    method: "post",
    url: 'http://localhost:5000/register',
    headers: {'Content-Type': 'application/json'},
    data: {
        email : email,
        password : password
    }
  })
  .then (authUser => authUser)
  .catch (error => error);


function* signInUserWithEmailPassword ({ payload }) {
  console.log("payload :::--",payload)

  const { username, password } = payload;
  console.log("signInUserWithEmailPassword")
  try {

      const signInUser = yield call (signInUserWithEmailPasswordRequest, username, password);

      if (signInUser.message) {
          yield put(showMessage (signInUser.message));
      } else {
          //localStorage.setItem ('userId', signInUser.data.data.userId);
          localStorage.setItem ('token', signInUser.data.data.token);
          //localStorage.setItem ('userName', signInUser.data.data.userName);
          yield put (userSignInSuccess (signInUser));
      }
  } catch (error) {
      yield put (showMessage (error));
  }
}

function* createUserWithEmailPassword ({ payload }) {
  const { email, password } = payload;

  console.log(email)
  console.log(password)

  try {
    const signUpUser = yield call (createUserWithEmailPasswordRequest, email, password);
    if (signUpUser.message) {
      console.log("====>",signUpUser)
        yield put (showMessage (signUpUser.message));
    } else {
      console.log("+++>",signUpUser)

        localStorage.setItem ('token', signUpUser.data.data.token);
        yield put (userSignUpSuccess (signUpUser.data.data));
    }
  } catch (error) {
    console.log("error+++>",error)

      yield put (showMessage (error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(SIGNUP_USER, createUserWithEmailPassword);
}