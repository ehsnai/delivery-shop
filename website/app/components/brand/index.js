
import React, { useState }from 'react';
import PropTypes from 'prop-types';
import {
  BrandHeader,
  BrandWrapper,
  BrandScrollImg,
  BrandHeaderScroll,
  MobileBrandWrapper,
  MobileBrandScrollImg,
  MobileBrandHeaderScroll

} from './Styles';

import { CSSTransition } from 'react-transition-group'

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

class Brand extends React.Component {

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

    return (

      <React.Fragment>

        <BrowserView>

          <BrandWrapper onClick={this.props.onMenuClick} id="brand" type={scrollPosition >= 20 ? 'scroll':'normal'}>

              {scrollPosition >= 20 &&
                <div>
                  <BrandScrollImg src={this.props.src} alt={this.props.alt} />
                  <BrandHeaderScroll>{this.props.alt}</BrandHeaderScroll>
                </div>
              }

              {scrollPosition < 20 &&
                <div>
                  <img src={this.props.src} alt={this.props.alt} height="96px" />
                  <BrandHeader>{this.props.alt}</BrandHeader>
                </div>
              }

          </BrandWrapper>

        </BrowserView>



        <MobileView>
          
          <MobileBrandWrapper  id="brand" type={scrollPosition >= 20 ? 'scroll':'normal'}>


              {scrollPosition >= 20 &&
                <div>
                  <MobileBrandScrollImg src={this.props.src} alt={this.props.alt} />
                  <MobileBrandHeaderScroll>{this.props.alt}</MobileBrandHeaderScroll>
                </div>
              }

              {scrollPosition < 20 &&
                <div>
                  <img src={this.props.src} alt={this.props.alt} height="96px" />
                  <BrandHeader>{this.props.alt}</BrandHeader>
                </div>
              }


          </MobileBrandWrapper>

        </MobileView>

      </React.Fragment>

    )

}

}



Brand.propTypes = {
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
)(Brand);


