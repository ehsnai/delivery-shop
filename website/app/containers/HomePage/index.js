/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button,Row ,Col,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';


import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRegisterModal,
  makeSelectFeedbackModal,
  makeSelectLoginModal,
  makeSelectCartModal,
  makeSelectFilterModal,
  makeSelectValidModal,
  makePath,
  makeSelectAuthUser,
  makeFilteredList,
  makeCart,
  makeItems,
  makeIsValid,
  makeAddresses,
  makeOrders
} from './selectors';

import {
  makeSelectLoading,
  makeSelectError,
  makeSelectUsername,

} from 'containers/App/selectors'

import { 
  userSignUp, 
  getFilterList,
  showValidation,
  getAddress,
  getCurrentUser
} from './actions';

import { 

  makeSelectFilter

} from './selectors';

import reducer   from './reducer'
import saga      from './saga'
import logo      from '../../images/logo-lg.png'

import Sidebar   from 'components/sidebar'
import Header    from 'components/header'
import List      from 'components/list'
import Dashboard from 'components/dashboard'
import Profile   from 'components/profile'
import Order     from 'components/order'
import Address   from 'components/address'
import Support   from 'components/support'
import Checkout  from 'components/checkout'

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect"

import Search from 'components/search'
import FilterModalC from 'components/filterModal'
import checkout from '../../components/checkout';

const key = 'home';

export function HomePage({

  username,
  authUser,
  RegisterModal,
  LoginModal,
  FeedbackModal,
  ValidateModal,
  loading,
  CartModal,
  FilterModal,
  filters,
  error,
  path,
  onGetList,
  onValidModalClick,
  onGetAddressClick,
  onGetCurrentUser,
  lists,
  cart,
  items,
  isValid,
  addresses,
  orders

}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {

    onGetList();
    onValidModalClick();
    if(authUser) onGetAddressClick()

    if(localStorage.getItem('token')) onGetCurrentUser()

    // When initial state username is not null, submit the form to load repos
    //if (username && username.trim().length > 0) onSubmitForm();
  }, []);

  console.log("localStorage.getItem('token') is :",localStorage.getItem('token'))
  console.log("authUser is :",authUser)
  console.log("isValid is :",isValid)
  console.log("addresses is home:",addresses)
  console.log("orders is home:",orders)

  return(
    <div className="wrapper">

      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="Delivery Home Page"
        />
      </Helmet>

      <MobileView>

        <FilterModalC
          filterModal = {FilterModal}
          filters     = {filters}
        />

        <Row className="m-0 p-0">

          <Col xs="12" sm="12" className="m-0 p-0">

            <div className="header">

              <Header 
                type          = 'normal' 
                registerModal = {RegisterModal}
                loginModal    = {LoginModal}
                cartModal     = {CartModal}
                validateModal = {ValidateModal}
                isMobile      = {isMobile}
                authUser      = {authUser}
                cart          = {cart}
                items         = {items}
                isValid       = {isValid}
                addresse      = {addresses}
                orders        = {orders}
                logo={logo}
                subBrand='Delivery'
                searchText='Search Products'
              />

            </div>

            <div className="content mobile">

              <Search
                text="Search Products"
                type="mobile"
              />

              {path == 'home' &&
              
              <List
                mobile='mobile'
                lists = {lists}
                authUser      = {authUser}
                feedbackModal = {FeedbackModal}
                isValid       = {isValid}
              />

              }

              {path == 'dashboard' && 
            
                <Dashboard />

              }

              {path == 'profile' && 
                
                <Profile
                  authUser      = {authUser}
                  addresse      = {addresses}

                />

              }

              {path == 'order' && 
                
                <Order 
                orders        = {orders}

                />

              }

              {path == 'address' && 
                
                <Address 
                  addresses = {addresses}
                />

              }

              {path == 'support' && 
                
                <Support />

              }

            </div>

          </Col>

        </Row>
      
      </MobileView>

      <BrowserView>

        <Row className="m-0 p-0">

          <Col xs="6" sm="3" className="m-0 p-0">

            <div  id="leftSide">

              <Sidebar
                logo        ={logo}
                subBrand    = 'Delivery'
                searchText  = 'Search Products'
                type        = 'normal'
                filters     = {filters}
                path        = {path}
              />

            </div>

          </Col>

          <Col xs="6" sm="9" className="m-0 p-0">

            <div className="rightSide">

              {cart.length > 0 &&

              <Checkout

                cart          = {cart}
                items         = {items}

              />

              }

              <div className="header">

                <Header 
                  type          = 'normal' 
                  registerModal = {RegisterModal}
                  loginModal    = {LoginModal}
                  cartModal     = {CartModal}
                  validateModal = {ValidateModal}
                  isMobile      = {isMobile}
                  authUser      = {authUser}
                  cart          = {cart}
                  items         = {items}
                  isValid       = {isValid}
                  addresse      = {addresses}
                  orders        = {orders}


                />

              </div>

              <div className="content">

                {path == 'home' &&

                  <List 
                  lists = {lists}
                  feedbackModal = {FeedbackModal} 
                  authUser      = {authUser}
                  isValid       = {isValid}

                  />              
                
                }

                {path == 'dashboard' && 
            
                  <Dashboard />

                }

                {path == 'profile' && 
                  
                  <Profile 
                    authUser      = {authUser}
                    addresse      = {addresses}
                  />

                }

                {path == 'order' && 
                  
                  <Order 
                    orders        = {orders}
                  />

                }

                {path == 'address' && 
                  
                  <Address
                    address = {addresses}
                  />

                }

                {path == 'support' && 
                  
                  <Support />

                }

              </div>

            </div>

          </Col>
        
        </Row>

        </BrowserView>

    </div>

  )

}
HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onToggleRegisterModal: PropTypes.func,
  username: PropTypes.string,
  RegisterModal: PropTypes.bool,
  FeedbackModal: PropTypes.bool,
  onSubmitRegister: PropTypes.func,
  authUser:PropTypes.object,
  lists:PropTypes.array,
  addresses:PropTypes.array,
  orders:PropTypes.array,
  cart:PropTypes.array,
  onGetList:PropTypes.func,
  onGetAddressClick:PropTypes.func,
  onValidModalClick : PropTypes.func,
  onGetCurrentUser : PropTypes.func
};

const mapStateToProps = createStructuredSelector({

  username     : makeSelectUsername(),
  authUser     : makeSelectAuthUser(),
  RegisterModal: makeSelectRegisterModal(),
  FeedbackModal: makeSelectFeedbackModal(),
  LoginModal   : makeSelectLoginModal(),
  CartModal    : makeSelectCartModal(),
  FilterModal  : makeSelectFilterModal(),
  ValidateModal: makeSelectValidModal(),
  loading      : makeSelectLoading(),
  error        : makeSelectError(),
  filters      : makeSelectFilter(),
  path         : makePath(),
  lists        : makeFilteredList(),
  cart         : makeCart(),
  items        : makeItems(),
  isValid      : makeIsValid(),
  addresses    : makeAddresses(),
  orders       : makeOrders()
  

});

export function mapDispatchToProps(dispatch) {

  return {
    onSubmitRegister: evt => dispatch(userSignUp(evt.target.value)),
    onToggleRegisterModal: evt => dispatch(userSignUp(evt.target.value)),
    onGetList : () => dispatch(getFilterList()),
    onGetAddressClick : () => dispatch(getAddress()),
    onValidModalClick : () => dispatch(showValidation()),
    onGetCurrentUser  : () => dispatch(getCurrentUser())
  };

}

const withConnect = connect(

  mapStateToProps,
  mapDispatchToProps,

);

export default compose(
  withConnect,
  memo,
)(HomePage);
