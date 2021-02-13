
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
  Modal,ModalBody,ModalHeader,ModalFooter,
  Form

} from 'reactstrap'

import { 
  sendFeedback,
  showFeedbackModal,
  closeFeedbackModal,
  showLoginModal,

} from 'containers/HomePage/actions';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {makeSelectCurrentUser} from 'containers/App/selectors'

import CustomCard from '../customCard'
import MenuIcon from '../../images/menu.png'
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

import winkIcon from '../../images/wink.png'

class List extends React.Component {
  constructor(props){
    super()

    this.state = {
      feedText: '',
      feedTextState: '',
      feedType:'feedback'

    }

    this.handleFeedClick        = this.handleFeedClick.bind(this)
    this.handleFeedSubmit       = this.handleFeedSubmit.bind(this)

  }

  handleFeedClick(){
    if (this.props.authUser){
      this.props.onFeedbackModalClick()
    }
    else{
      this.props.onLoginModalClick()
    }
  }

  handleFeedSubmit(){
    const text = this.state.feedText
    const type = this.state.feedType

    if(text != ''){
      this.props.onFeedbackClick({text,type})
    }
    else{
      this.setState({
        feedTextState : true
      })
    }
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

  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }

  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }

  handleSelect = event => {
    this.setState({ [event.target.name]: event.target.value }
      ,()=>{console.log("state in select: =>",this.state)}
      );
  };
  
  render(){

    let {lists,feedbackModal,authUser} = this.props;
    const {feedText,feedTextState} = this.state

    return (
      <ListWrapper>

        <Modal isOpen={feedbackModal} toggle={this.props.onFeedbackModalClose} >
          <ModalHeader toggle={this.props.onFeedbackModalClose}>Send Your Feedback</ModalHeader>
          <ModalBody>
            <Form>

              <FormGroup>
                <Label for="exampleSelect">Select</Label>
                <Input type="select" name="feedType" id="feedType" onChange={this.handleSelect}>
                  <option disabled>select type</option>
                  <option selected value="feedback">feedback</option>
                  <option value='report'>bug report</option>
                  <option value="help">account help</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="exampleText">Your Message</Label>
                <Input 
                  invalid={feedTextState}
                  onChange = {event =>this.change(event, "feedText", "length", 1)}
                  type="textarea"
                  name="feedText"
                  id="feedText"
                  value={feedText}
                  placeholder="say something" />
              </FormGroup>

              <FormGroup>
                <Button className="mt-3" color="success" onClick={this.handleFeedSubmit}>Send Your Feedback</Button>
              </FormGroup>

            </Form>
          </ModalBody>

        </Modal>

        <WrapperX mobile={this.props.mobile}>

        <MobileView>

          <ListTitle className="mb-4 mt-1">
            Showing {lists.length} of {lists.length} products
            <MobileNavMenu>
              <img src={MenuIcon} width="100%" height="auto"/>
            </MobileNavMenu>
          </ListTitle>

        </MobileView>

        <BrowserView>

          <ListTitle className="mb-3">
            Showing {lists.length} of {lists.length} products
          </ListTitle>
        
        </BrowserView>

          <ListBody mobile={this.props.mobile}>

            <Row className="m-0 p-0">

              {lists.map((item,i)=>(

                <Col key={i} className="m-0 p-0" xs="12" md="4">

                <CustomCard 
                  type={item.sellType} 
                  mobile={this.props.mobile}
                  item = {item}
                  key={i}
                  isValid = {this.props.isValid}
                  />
                </Col>

              ))}

            </Row>

            <Row className="m-0 p-0">

              <NotFoundCartCol className="mx-0 mt-4 p-0" xs="12" md="12">

                <Row className="m-0 p-0">

                  <Col className="p-0" md={{ size: 4, offset: 4 }}>

                    <Card body className="text-center border-none">

                      <CardTitle>

                        <img src={winkIcon} className="mb-3 mt-3" width="60" height="auto"/>
                        <p className="m-0"> Didn't find your favorite? </p>
                      
                      </CardTitle>

                      <CardText>You can send tickets to apply it.</CardText>
                      <Button 
                        color="success" 
                        md="4"
                        onClick={this.handleFeedClick}
                      >
                        Let's take it</Button>

                    </Card>

                  </Col>

                </Row>

              </NotFoundCartCol>

            </Row>

          </ListBody>

        </WrapperX>

      </ListWrapper>

    )

  }
  
}

List.propTypes = {
  
  onFeedbackClick: PropTypes.func,
  onFeedbackModalClick: PropTypes.func,
  onFeedbackModalClose: PropTypes.func,
  onLoginModalClick   : PropTypes.func,

};


// We require the use of src and alt, only enforced by react in dev mode
const mapStateToProps = createSelector(
  makeSelectCurrentUser(),
  RegisterModal => ({
    RegisterModal,
  }),
);

export function mapDispatchToProps(dispatch) {
  return {
    onFeedbackClick      : (feedback) => dispatch(sendFeedback(feedback)),
    onFeedbackModalClick : () => dispatch(showFeedbackModal()),
    onFeedbackModalClose : () => dispatch(closeFeedbackModal()),
    onLoginModalClick : () => dispatch(showLoginModal()),

    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);
