
import React, { useState }from 'react';
import PropTypes from 'prop-types';
import {
  CheckWrapper,
  CheckButton

} from './Styles';

import { CSSTransition } from 'react-transition-group'
import {formatter} from '../../utils/formater'

import { 
  changeMode
} from 'containers/HomePage/actions'

import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import {makeSelectCurrentUser} from 'containers/App/selectors'

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

class Checkout extends React.Component {

  constructor(props){
    super();
    this.state = {
      isOpen: false,
      scrollPosition: window.pageYOffset
    };

  }

  componentDidMount() {
    window.addEventListener('scroll', this.listenToScroll)
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenToScroll)
  }
  
  listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop
  
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight
  
    const scrolled = winScroll / height
  
    this.setState({
      scrollPosition: winScroll,
    })
  }
  render(){
    const {scrollPosition} = this.state;

    const {cart,items} = this.props
    let subTotal = 0

    items.map((item,i) =>{

      cart.map((cartItem, j)=>{
  
        if(item._id == cartItem.itemId){
  
          if(item.sellType == "weight"){
  
            subTotal += item.prices[cartItem.priceId].price * cartItem.count
    
          }
  
          if(item.sellType == "piece"){
  
            subTotal +=item.prices * cartItem.count
    
          }
  
        }
  
    })
  
  
    })
  
    let tax = subTotal * 0.09//(subTotal * 0.09).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
    let delivery = subTotal * 0.04
  
    return (

      <CheckWrapper className="">
        <CheckButton 
          color="info" 
          block 
          onClick={this.handleClear}
        >
          Your Checkout For {cart.length} Item ( {formatter.format(subTotal)} )
        </CheckButton>
        
      </CheckWrapper>
    )

}

}

Checkout.propTypes = {
  onMenuClick: PropTypes.func, 
  OnUserLogout: PropTypes.func, 
};

const mapStateToProps = createSelector(
  makeSelectCurrentUser(),
  RegisterModal => ({
    RegisterModal,
  }),
);

export function mapDispatchToProps(dispatch) {
  return {
    onMenuClick   : () => dispatch(changeMode('home')),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checkout);


