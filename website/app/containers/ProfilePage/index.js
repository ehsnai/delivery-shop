/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectRegisterModal,
  makeSelectLoginModal,
  makeSelectCartModal,
  makeSelectFilterModal
} from 'containers/HomePage/selectors';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectUsername,

} from 'containers/App/selectors'
import { userSignUp, } from 'containers/HomePage/actions';


import { Button,Row ,Col,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import Header from 'components/header'
import ProfileSidebar from 'components/profileSidebar'


import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";


function ProfilePage(props) {
  return (
    <div>
      <Helmet>
        <title>profile Page</title>
        <meta
          name="description"
          content="Feature page of React.js Boilerplate application"
        />
      </Helmet>

      <BrowserView>

        <Row className="m-0 p-0">

          <Col xs="6" sm="3" className="m-0 p-0">
            <div  id="leftSide">

              <ProfileSidebar />

            </div>
          </Col>

          <Col xs="6" sm="9" className="m-0 p-0">
            <div className="rightSide">
              <div className="header">
                <Header 
                  type          = 'normal' 
                  registerModal = {props.RegisterModal}
                  loginModal    = {props.LoginModal}
                  cartModal     = {props.CartModal}
                />
              </div>
              <div className="content">
content
                  
              </div>
            </div>

          </Col>

        </Row>

      </BrowserView>

    </div>
  );
}

ProfilePage.propTypes = {
  RegisterModal : PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  RegisterModal: makeSelectRegisterModal(),
  LoginModal : makeSelectLoginModal(),
  CartModal  : makeSelectCartModal(),
  FilterModal  : makeSelectFilterModal(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});


export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilePage);






