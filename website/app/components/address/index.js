
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  ListWrapper,
  WrapperX,
  AddressCard

} from './Styles';

import { 
  addAddress,
  getAddress
} from 'containers/HomePage/actions';

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
  ListGroup, ListGroupItem,Alert,Badge,
  Form


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

class Address extends React.Component {

  constructor(props){
    super()

    this.state = {

      street      : '',
      streetState : false,
      unit        : '',
      unitState   : false,
      postal      : '',
      postalState : false

    }

    this.handleAddressSubmit       = this.handleAddressSubmit.bind(this)

  }

  componentWillMount(){
    this.props.onGetAddressClick()
  }

  change(event, stateName, type, stateNameEqualTo, maxValue) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: false }
          ,() =>{
            console.log("states in change", this.state)
          }
          );
        } else {
          this.setState({ [stateName + "State"]: true }
          ,() =>{
            console.log("states in change", this.state)
          }
          );
        }
        break;
      case "password":
        if (this.verifyLength(event.target.value, 1)) {
          this.setState({ [stateName + "State"]: false }
          ,() =>{
            console.log("states in pass", this.state)
          }
          );
        } else {
          this.setState({ [stateName + "State"]: true });
        }
        break;
      case "equalTo":
        if (this.compare(event.target.value, this.state[stateNameEqualTo])) {
          this.setState({ [stateName + "State"]: false }
          ,() =>{
            console.log("states in pass", this.state)
          }
          );
        } else {
          this.setState({ [stateName + "State"]: true }
          ,() =>{
            console.log("states in pass", this.state)
          }
          );
        }
        break;
      case "checkbox":
        if (event.target.checked) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "number":
        if (this.verifyNumber(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" }
          ,() =>{
            console.log("states in pass", this.state)
          }
          );
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: false }
          ,() =>{
            console.log("states in pass", this.state)
          }
          );
        } else {
          this.setState({ [stateName + "State"]: true });
        }
        break;
      case "max-length":
        if (!this.verifyLength(event.target.value, stateNameEqualTo + 1)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "url":
        if (this.verifyUrl(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "min-value":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "max-value":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value <= stateNameEqualTo
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "range":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo &&
          event.target.value <= maxValue
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    switch (type) {
      case "checkbox":
        this.setState({ [stateName]: event.target.checked });
        break;
      default:
        this.setState({ [stateName]: event.target.value });
        break;
    }
  }

  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }

  handleAddressSubmit(){

    const street = this.state.street
    const unit = this.state.unit
    const postal = this.state.postal

    if(street == ''){
      this.setState({
        streetState : true
      })
    }
    else if(unit == ''){
      this.setState({
        unitState : true
      })
    }
    else if (postal == ''){
      this.setState({
        postalState : true
      })
    }
    else{
      this.props.onAddAddressClick({street,unit,postal})
    }

  }


  render(){

    console.log("address in comp", this.props.address)

    const { street,streetState,unit,unitState,postal,postalState } = this.state
    const { address } = this.props

    return (
      <ListWrapper>

        <WrapperX>

              <h5 className="mb-4 mt-0">
                Delivery Addresses
              </h5>


              <AddressCard className="mb-4">
                <CardBody>
                  <Form>

                    <FormGroup>
                      <Label for="street">Street</Label>
                      <Input 
                        invalid={streetState}
                        onChange = {event =>this.change(event, "street", "length", 1)}
                        type="text"
                        name="street"
                        id="street"
                        value={street}
                        placeholder="Enter your street"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="unit">Apartment/Unit</Label>
                      <Input 
                        invalid={unitState}
                        onChange = {event =>this.change(event, "unit", "length", 1)}
                        type="text"
                        name="unit"
                        id="unit"
                        value={unit}
                        placeholder="I'm in apartment #" 
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="postal">Postal Code</Label>
                      <Input 
                        invalid={postalState}
                        onChange = {event =>this.change(event, "postal", "length", 1)}
                        type="text"
                        name="postal"
                        id="postal"
                        value={postal}
                        placeholder="Enter your Zip Code" 
                      />
                    </FormGroup>

                    <FormGroup>
                      <Button 
                        size="sm" 
                        color="success"
                        onClick={this.handleAddressSubmit}
                      >Add Address</Button>
                    </FormGroup>

                  </Form>
                </CardBody>
              </AddressCard>

              <h6 className="mb-4">Your Addresses</h6>

              <ListGroup>

              { address &&
                address.map((item,i)=>(
                <ListGroupItem key={i}>
                <p className="m-0">
                {item.street}
                </p>
                <p className="m-0 text-muted font-12">
                {item.unit}
                </p>
                <Badge color="success">{item.code}</Badge>
              </ListGroupItem>
                    
              ))}


              </ListGroup>

        </WrapperX>

      </ListWrapper>
    )
  }

}

Address.propTypes = {
  onAddAddressClick: PropTypes.func,
  onGetAddressClick: PropTypes.func

};

const mapStateToProps = createStructuredSelector({
});

export function mapDispatchToProps(dispatch) {
  return {
    onAddAddressClick      : (address) => dispatch(addAddress(address)),
    onGetAddressClick      : () => dispatch(getAddress()),

  };
}

export default connect(
  null,
  mapDispatchToProps,
)(Address);
