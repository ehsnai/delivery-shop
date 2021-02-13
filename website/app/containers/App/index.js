
import React ,{memo}from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';

import HomePage from 'containers/HomePage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import GlobalStyle from '../../global-styles';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';

import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  makeSelectUsername,
  makeSelectRegisterModal,
  makeSelectLoginModal,
  makeSelectCartModal,
  makeSelectLoading
} from './selectors'

const key = 'main';
export function App( {


}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}

App.propTypes = {
  loading: PropTypes.bool,
  onToggleRegisterModal: PropTypes.func,
  username: PropTypes.string,
  RegisterModal: PropTypes.bool,
  onSubmitRegister: PropTypes.func,
};


const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  RegisterModal: makeSelectRegisterModal(),
  LoginModal : makeSelectLoginModal(),
  CartModal  : makeSelectCartModal(),
  loading: makeSelectLoading(),
});



export function mapDispatchToProps(dispatch) {
  return {
    onSubmitRegister: evt => dispatch(userSignUp(evt.target.value)),
    onToggleRegisterModal: evt => dispatch(userSignUp(evt.target.value)),
  };
}


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);

