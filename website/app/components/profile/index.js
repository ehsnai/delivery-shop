
import React from 'react';
import PropTypes from 'prop-types';
import {
  ListWrapper,
  WrapperX,
  WrapperY,
  ProfilePic,
  ProfileStatus,
  ProfileInfo,
  ProfileCard,

} from './Styles';

import FilterButton from '../filterButton'
import {
  Row,
  Col,
  Navbar,
  NavbarBrand,
  FormGroup, 
  Label, 
  Input,
  Button, 
  CardHeader, 
  CardFooter, 
  CardBody,
  CardImgOverlay,
  CardImg,
  CardLink,
  CardTitle, 
  CardText,
  Card,
  ListGroup, ListGroupItem,Alert


} from 'reactstrap'
import CustomCard from '../customCard'
import addressIcon from '../../images/addressImage.png'
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

import winkIcon from '../../images/wink.png'

function Profile(props) {

  const {authUser,addresse} = props

  return (
    <ListWrapper>

      <WrapperX>

        <Row>
          <Col xs="12" sm="3">
            <ProfileInfo>
              <ProfilePic bg="http://via.placeholder.com/150x150">
                  <ProfileStatus>Verified</ProfileStatus>
              </ProfilePic>
              <h6>{authUser.firstName}</h6>
              <p className="text-muted mb-1">{authUser.email}</p>
              <Button className="font-12" outline color="success">Account Setting</Button>
            </ProfileInfo>
          </Col>
          <Col xs="12" sm="9">
            <WrapperY>
            <h5 className="mb-4">
              My Recs
              <Button size="sm" color="link" className="font-12">‌Add New</Button>
            </h5>

            <Alert color="secondary">
              Not found any row for Recs
            </Alert>

            <h5 className="my-4">
              My Addresses
              <Button size="sm" color="link" className="font-12">‌Add New</Button>
            </h5>

            {addresse &&
            
            <ListGroup>

              {addresse.map(address => (
                <ListGroupItem>
                  <p className="m-0">
                  {address.street},{address.unit}, {address.code}
                  </p>
                  <Button size="sm" color="link" className="font-12 text-warning ml-0 pl-0 mb-0 pb-0">‌Edit</Button>
                  <Button size="sm" color="link" className="font-12 text-danger mb-0 pb-0">Delete</Button>
                </ListGroupItem>
              ))}

            </ListGroup>

            }

            <h5 className="my-4">
              My Reviews
              <Button size="sm" color="link" className="font-12">‌Add New</Button>

            </h5>

            <Alert color="secondary">
              Not Reviews Yet
            </Alert>
            





            </WrapperY>
            










          </Col>

        </Row>


      </WrapperX>

    </ListWrapper>



  )
}

// We require the use of src and alt, only enforced by react in dev mode
Profile.propTypes = {
  //src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  //alt: PropTypes.string.isRequired,
  //className: PropTypes.string,
};

export default Profile;
