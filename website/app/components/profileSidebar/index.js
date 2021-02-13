import React from 'react';
import PropTypes from 'prop-types';

import {
    ProfileSideMenu,
    ProfileListGroupItem,
    ProfileListGroup
} from './Styles';

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

import { ListGroup, ListGroupItem } from 'reactstrap';

class ProfileSidebar extends React.Component {

    constructor(props){
        super(props)

    }

    render() {

        return (

            <ProfileSideMenu>

                <ProfileListGroup>

                    <ProfileListGroupItem value='profile'   onClick={this.props.onMenuClick}  tag="button" action active={this.props.path == 'profile' ? 'active':''}>my profile</ProfileListGroupItem>
                    <ProfileListGroupItem value='order'     onClick={this.props.onMenuClick}  tag="button" action active={this.props.path == 'order' ? 'active':''} >my orders</ProfileListGroupItem>
                    <ProfileListGroupItem value='address'   onClick={this.props.onMenuClick}  tag="button" action active={this.props.path == 'address' ? 'active':''}>Addresses</ProfileListGroupItem>
                    <ProfileListGroupItem value='support'   onClick={this.props.onMenuClick}  tag="button" action active={this.props.path == 'support' ? 'active':''}>Support</ProfileListGroupItem>
                    <ProfileListGroupItem                   onClick={this.props.OnUserLogout} tag="button" action>log out</ProfileListGroupItem>

                </ProfileListGroup>

            </ProfileSideMenu>

        );

    }

}

ProfileSidebar.propTypes = {
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
      onMenuClick   : (evt) => dispatch(changeMode(evt.target.value)),
      OnUserLogout  : () => dispatch(userLogout()),
      dispatch,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProfileSidebar);
  
