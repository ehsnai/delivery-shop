
import React from 'react';
import PropTypes from 'prop-types';
import {
  ListWrapper,
  WrapperX,
  ListTitle,
  ListBody,
  ListCard,
  ListCardBody,
  MobileNavMenu,
  NotFoundCartCol
} from './Styles';

import FilterButton from '../filterButton'
import {
  Row,
  Col,
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
  Table

} from 'reactstrap'
import CustomCard from '../customCard'
import MenuIcon from '../../images/menu.png'
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

import winkIcon from '../../images/wink.png'

function Dashboard(props) {

  return (
    <ListWrapper>

      <WrapperX>
        Dashboard
      </WrapperX>

    </ListWrapper>



  )
}

// We require the use of src and alt, only enforced by react in dev mode
Dashboard.propTypes = {
  //src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  //alt: PropTypes.string.isRequired,
  //className: PropTypes.string,
};

export default Dashboard;
