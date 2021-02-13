
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import { API_URL } from '../../config'

import {
  HeaderWrapper,
  WrapperX,
  WrapperTabs,
  WrapperMenu,
  WrapperNav,
  HeaderTools,
  HeaderCart,
  HeaderCartB,
  RegisterLink,
  HeaderCard,
  HeaderCardImg,
  HeaderCardBody,
  LoginLink,
  ModalRegisterHeader,
  ModalRegisterBody,
  ModalRegisterFooter,
  ModalLoginHeader,
  ModalLoginBody,
  ModalLoginFooter,
  MobileHeaderWrapper,
  MobileHeaderCard,
  MobileWrapperTabs,
  MobileHeaderCardBody,
  MobileHeaderCardImg,
  LoginRegisterLink,
  MobileWrapperNav,
  HeaderSignIn,
  MobileHeaderTools,
  CartFormGroup,
  CartButtonGroup,
  CartTabButton,
  StockInput,
  StockCountInput,
  ProfileLink,
  DeleteCartButton,
  HeaderAddress,
  HeaderAddressB

} from './Styles';

import {
  Row,
  Col,
  Table,
  FormGroup, 
  ButtonGroup,
  Label,
  Modal,
  Alert, 
  Input,
  Button,
  Nav,
  NavItem,
  NavLink,
  Form, 
  FormText,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormFeedback,
  Dropdown, 
  DropdownItem, 
  DropdownToggle, 
  DropdownMenu,
  Popover, PopoverHeader, PopoverBody,
  Badge
} from 'reactstrap'

import { 
  userSignUp,
  showRegisterModal,
  closeRegisterModal,
  showLoginModal,
  closeLoginModal,
  getCartItems,
  closeCartModal,
  userSignIn,
  userLogout,
  changeMode,
  removeFromCart,
  validateAge,
  changeCartCount,
  addOrder,
  openCartModal,
  userIdCart,
  getCurrentUser
} from 'containers/HomePage/actions';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {makeSelectCurrentUser} from 'containers/App/selectors'
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

import Brand from 'components/brand'
import signinIcon from '../../images/signin.png'
import deleteIcon from '../../images/delete.png'
import clockIcon from '../../images/open.png'
import deliveryIcon from '../../images/delivery.png'
import giftIcon from '../../images/gift.png'
import cartImage from '../../images/cart.png'
import userIcon from '../../images/signin.png'
import addressImage from '../../images/addressImage.png'
import {formatter} from '../../utils/formater'
import defaultImage from "../../images/image_placeholder.jpg";


class  Header extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      scrollPosition: window.pageYOffset,
      loginEmail:null,
      loginEmailState: '',
      loginPasswordState:'',
      loginPassword:"",
      registerName:"",
      registerNameState:"",
      registerEmail:"",
      registerEmailState:"",
      registerPassword: "",
      registerPasswordState: false,
      registerPasswordConfirm: "",
      registerPasswordConfirmState: false,
      deliveryType:"delivery",
      profileDropdownOpen: false,
      timePopoverOpen: false,
      validate : 1,
      cartNote : '',
      file: null,
      imagePreviewUrl: defaultImage,
      idImage : "",
      idNumber: "",
      idNumberState : ""

    };

    this.handleRegisterModal    = this.handleRegisterModal.bind(this)
    this.handleLoginModal       = this.handleLoginModal.bind(this)
    this.handleCartModel        = this.handleCartModel.bind(this)
    this.handleRegisterSubmit   = this.handleRegisterSubmit.bind(this)
    this.handleLoginSubmit      = this.handleLoginSubmit.bind(this)
    this.handleDeliveryType     = this.handleDeliveryType.bind(this)
    this.profileToggle          = this.profileToggle.bind(this)
    this.handleCartClick        = this.handleCartClick.bind(this)
    this.handleAddressClick     = this.handleAddressClick.bind(this)
    
    this.handleRemoveCart       = this.handleRemoveCart.bind(this)
    this.togglePopover          = this.togglePopover.bind(this)
    this.handleUserNote         = this.handleUserNote.bind(this)
    this.handleCountChange      = this.handleCountChange.bind(this)

    this.handleSubmitOrder      = this.handleSubmitOrder.bind(this)
    this.handleAddressChange    = this.handleAddressChange.bind(this)
    this.handleMethodChange     = this.handleMethodChange.bind(this)
    this.handleDispatchChange   = this.handleDispatchChange.bind(this)
    this.handleSubmitIdCardImage= this.handleSubmitIdCardImage.bind(this)

  }

  fileInput = React.createRef();

  componentDidMount() {
    window.addEventListener('scroll', this.listenToScroll)
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenToScroll)
  }

  componentWillReceiveProps(){
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

  togglePopover = () => {
    this.setState({
      timePopoverOpen: !this.state.timePopoverOpen
    });
  }

  handleDeliveryType = (evt) =>{
    const type = evt.target.name
    this.setState({
      deliveryType : type
    })

  }

  handleRegisterModal(){
    this.setState(prevState => ({
      RegisterModal: !prevState.RegisterModal
    }));
  }

  handleLoginModal(){
    this.setState(prevState => ({
      LoginModal: !prevState.LoginModal
    }));
  }

  handleCartModel(){
    this.setState(prevState => ({
      CartModel: !prevState.CartModel
    }));
  }

  handleSelect = event => {
    this.setState({ [event.target.name]: event.target.value }
      ,()=>{console.log("state in select: =>",this.state)}
      );
  }
  
  handleChange(event,stateName) {
    this.setState({ [stateName]: event.target.value }
      ,()=>{console.log("state in handlechange: =>",this.state)}
      );
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

  compare(string1, string2) {
    if (string1 === string2) {
      return true;
    }
    return false;
  }

  verifyNumber(value) {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  }

  verifyUrl(value) {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
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

  handleRegisterSubmit() {
    if (this.state.registerName === "") {
      this.setState({ registerNameState: true });
    }
    if (this.state.registerEmail === "") {
      this.setState({ registerEmailState: true });
    }
    if (this.state.registerPassword === "") {
      this.setState({ passwordConfirmState: true });
    }
    if (this.state.registerPasswordConfirm === "") {
      this.setState({ passwordState: "error" });
    }
    else{
      this.props.onRegisterClick(this.state.registerEmail,this.state.registerPassword,this.state.registerName)
    }
  }

  handleLoginSubmit() {

    if (this.state.loginEmailState === "") {
      this.setState({ loginEmailState: true });
    }
    if (this.state.loginPasswordState === "") {
      this.setState({ loginPasswordState: true });
    }
    else{
      this.props.onLoginClick(this.state.loginEmail,this.state.loginPassword)
    }

  }

  rangeClick() {
    if (this.state.minLengthState === "") {
      this.setState({ minLengthState: "error" });
    }
    if (this.state.maxLengthState === "") {
      this.setState({ maxLengthState: "error" });
    }
    if (this.state.rangeState === "") {
      this.setState({ rangeState: "error" });
    }
    if (this.state.minValueState === "") {
      this.setState({ minValueState: "error" });
    }
    if (this.state.maxValueState === "") {
      this.setState({ maxValueState: "error" });
    }
  }

  handleImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      },()=>{this.handleSubmitImage()});
    };
    reader.readAsDataURL(file);
  }

  handleSubmitImage = e => {
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
    const formData = new FormData();
    formData.append('photo',this.state.file);
    const config = {
      headers: {
          'content-type': 'multipart/form-data',
          "authorization": `${localStorage.getItem('token')}`
      }
    };

    axios.post(`${API_URL}uploadImage`,formData,config)
        .then((response) => {
            console.log("The file is successfully uploaded",response.data.imagepath);
            console.log("The Response ==>",response)
            this.setState({
              idImage: response.data.imagepath,
            }
            ,()=>{console.log("image state", this.state)}
            );
                }).catch((error) => {
          console.log("The file is error: ",error);

    });
  
  }

  handleImageClick = () => {
    this.fileInput.current.click();
  }

  handleImageRemove = () => {
    this.setState({
      file: null,
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage
    }
    ,()=>{console.log("image state", this.state)}
    );
    this.fileInput.current.value = null;
  }

  handleSubmit(){

    const firstName   = this.state.firstName;
    const lastName    = this.state.lastName;
    const email       = this.state.email;
    const password    = this.state.password;
    const idNumber    = this.state.userIdNumber;
    const idImage     = this.state.userImage;
    const type        = this.state.userType;
    const status      = this.state.userStatus;
    const mobile      = this.state.mobile;
    const membership  = this.state.userMembership;

    console.log("state for send:",this.state)

    axios({

      method: "POST",
      url: "http://localhost:5000/users",
      headers: {'authorization': localStorage.getItem('token')},

      data: {
        firstName  : firstName,
        lastName   : lastName,
        email      : email,
        password   : password,
        idNumber   : idNumber,
        idImage    : idImage,
        type       : type,
        status     : status,
        mobile     : mobile,
        membership : membership,

      }

    }).then((response)=>{

      this.props.history.push("/admin/listUser")

    })
    .catch( (error) => {

      if (error.response) {

        switch(error.response.status) {

          case 422:
            this.setState({
              errorCode:error.response.status,
              errorMessage:error.response.data.message,
              errorColor:'danger'
          })
          break;

          case 400:
            this.setState({
                errorCode:error.response.status,
                errorMessage:error.response.data.message,
                errorColor:'danger'
            })
            break;


        case 404:
            this.setState({
                errorCode:error.response.status,
                errorMessage:error.response.data.message,
                errorColor:'danger'
            },()=>{console.log(this.state)})
            break;

    
          case 500:
            this.setState({
              errorCode:error.response.status,
              errorMessage:error.response.data.message,
              errorColor:'warning'
            })
            break;

          default:
          // code block
        }

      }

    });

  }

  profileToggle() {
    this.setState({
      profileDropdownOpen: !this.state.profileDropdownOpen
    });
  }

  handleCartClick(){
    if (this.props.authUser){
      this.props.onCartModalClick()
      this.props.onGetCartItems()
    }
    else{
      this.props.onLoginModalClick()
    }
  }

  handleAddressClick(){
    if (this.props.authUser){
      this.props.onMenuClick()
    }
    else{
      this.props.onLoginModalClick()
    }
  }

  handleRemoveCart(evt){
    const id = evt.target.value
    const text = evt.target.name
    this.props.onRemoveCart(id,text)
    this.props.onGetCartItems()
  }

  handleUserNote(evt){
    this.setState({
      cartNote: evt.target.value
    })
  }

  handleCountChange(evt){

    const count = evt.target.value
    const id    = evt.target.name
    this.props.onChangeCartCount(id,count)

  }

  handleAddressChange(evt){
    this.setState({
      cartAddress: evt.target.value
    })

  }

  handleMethodChange(evt){
    this.setState({
      cartMethod: evt.target.value
    })

  }

  handleDispatchChange(evt){
    this.setState({
      cartDtime: evt.target.value
    })

  }

  handleSubmitOrder(){

    const authUser = this.props.authUser

    console.log("authUser",this.props.authUser)

    if( authUser && authUser.idNumber === null, authUser.isValid === 0){

      console.log("get validate id")

    }

    else{

      let userCart = []

      this.props.items.map((item,i) =>{

        this.props.cart.map((cartItem, j)=>{

          if(item._id == cartItem.itemId){

            userCart.push(
              {
                  "itemName" : item.title,
                  "itemId" : cartItem.itemId,
                  "count"  : cartItem.count,
                  "priceIdName": cartItem.priceId ? item.prices[cartItem.priceId].name : -1,
                  "price" : cartItem.priceId ? item.prices[cartItem.priceId].price * cartItem.count : item.prices * cartItem.count
              }
          )

          }

        })

      })

      console.log("userCart",userCart)


      let note      = this.state.cartNote
      let dTime     = this.state.cartDtime
      let dAddress  = this.state.cartAddress
      let pMethod   = this.state.cartMethod
      let orderType = this.state.deliveryType
      let cart      = userCart

      this.props.onOrderClick({dTime, pMethod, dAddress, orderType, note, cart})

      console.log("handleSubmitOrder here!")
    }

  }

  handleSubmitIdCardImage(){

    let idImage = this.state.idImage
    let idNumber = this.state.idNumber

    console.log("this.state.idImage :",this.state.idImage)
    console.log("this.state.idNumber",this.state.idNumber)

    if(idImage == "" && !idImage){
      this.setState({ idNumberState: true });
      console.log("this 1")

    }
    if(this.state.idNumber == "") {
      this.setState({ idNumberState: true });
      console.log("this 1")

    }
    else if(idImage != "" && idImage){
      this.props.onSetUserIdNumber({idImage,idNumber})
      this.props.ongetCurrentUser()
    }

  }

render(){

  const {
    scrollPosition, 
    emailState,
    registerName,
    registerNameState,
    registerEmailState,
    registerEmail,
    errorCode, errorMessage,errorColor,
    loginEmailState,
    loginEmail,
    loginPassword,
    registerPasswordState,
    registerPasswordConfirmState,
    loginPasswordState,
    cartNote,
    idNumber,
    idNumberState
    
  } = this.state;

  const {authUser,cart,items,addresse,isValid} = this.props

  let selected = null
  let count = [1,2,3,4,5,6,7,8,9,10]
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

  console.log("cart",cart)
  console.log("items",items)

  return (

    <React.Fragment>

       {/* <Modal isOpen={this.props.validateModal} toggle={this.handleValidate} >
        <ModalHeader toggle={this.toggle}>Are You at Least 19 ?</ModalHeader>
        <ModalBody>

          { isValid == 0 &&
            <Alert color="warning" className="text-center">
            You Dont enough age to see this site
            </Alert>
          }

          <Button onClick={this.props.onValidate} value={1} color="info" size="lg" block>Yes, I AM</Button>
          <Button onClick={this.props.onValidate} value={0} color="secondary" size="lg" block>No, I AM NOT</Button>
          <p className="text-muted text-center mt-3 font-12">This for validate your age</p>
        </ModalBody>
      </Modal>
 */}
      <Popover placement="bottom" isOpen={this.state.timePopoverOpen} target="showtimes" toggle={this.togglePopover}>
        <PopoverBody>
        <Table borderless className="m-0">
          <tbody>
            <tr>
              <td width="90px" className='p-1 text-success'>Monday</td>
              <td width="150px" className='p-1 text-right'>9:00 am - 9:00 pm</td>
            </tr>
            <tr>
              <td width="90px" className='p-1 text-success'>Tuesday</td>
              <td width="150px" className='p-1 text-right'>9:00 am - 9:00 pm</td>
            </tr>
            <tr>
              <td width="90px" className='p-1 text-success'>Wednesday</td>
              <td width="150px" className='p-1 text-right'>9:00 am - 9:00 pm</td>
            </tr>
            <tr>
              <td width="90px" className='p-1 text-success'>Thursday</td>
              <td width="150px" className='p-1 text-right'>9:00 am - 9:00 pm</td>
            </tr>
            <tr>
              <td width="90px" className='p-1 text-success'>Friday</td>
              <td width="150px" className='p-1 text-right'>9:00 am - 9:00 pm</td>
            </tr>
            <tr>
              <td width="90px" className='p-1 text-success'>Saturday</td>
              <td width="150px" className='p-1 text-right'>9:00 am - 9:00 pm</td>
            </tr>
            <tr>
              <td width="90px" className='p-1 text-success'>Sunday</td>
              <td width="150px" className='p-1 text-right'>9:00 am - 9:00 pm</td>
            </tr>

          </tbody>
        </Table>


        </PopoverBody>
      </Popover>

      <Modal isOpen={this.props.registerModal} toggle={this.props.onRegisterModalClose}>
          <ModalRegisterHeader toggle={this.props.onRegisterModalClose}>
            register
          </ModalRegisterHeader>
          <ModalRegisterBody>
            <Form>

              {errorCode &&
                <Alert color={errorColor}>
                  {errorMessage}
                </Alert>      
              }

              <FormGroup>
                <Label for="registerName">Your Name</Label>
                <Input
                  invalid={registerNameState}
                  onChange = {event =>this.change(event, "registerName", "length", 1)}
                  type="text"
                  name="registerName"
                  id="registerName"
                  value={registerName}
                  placeholder="Get a Name"
                />
              </FormGroup>

              <FormGroup>
                <Label for="registerEmail">Email</Label>
                <Input
                  invalid={registerEmailState}
                  onChange = {event =>this.change(event, "registerEmail", "email")}
                  type="email"
                  name="registerEmail"
                  id="registerEmail"
                  value={registerEmail}
                  placeholder="Enter your email"
                />
              </FormGroup>

              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  invalid={registerPasswordState}
                  type="password"
                  name="registerPassword"
                  id="registerPassword"
                  onChange = {event =>this.change(event, "registerPassword", "password")}
                  placeholder="enter your password"
                />
              </FormGroup>

              <FormGroup>
                <Label for="examplePassword">Re Enter Password</Label>
                <Input 
                  invalid={registerPasswordConfirmState}
                  type="password"
                  name="registerPasswordConfirm"
                  id="registerPasswordConfirm"
                  onChange={ event =>
                  this.change(
                    event,
                    "registerPasswordConfirm",
                    "equalTo",
                    "registerPassword"
                  )}
                  placeholder="enter your password"
                />
                <FormFeedback>Oh noes! compare your password</FormFeedback>
              </FormGroup>

            </Form>
          </ModalRegisterBody>
          <ModalRegisterFooter>
            <Button block color="success" size="lg"  onClick={this.handleRegisterSubmit}>Register</Button>
            <div className="mt-3">I have an account.{' '}<span onClick={this.props.onLoginModalClick} className="text-success pointer" href="">Log In</span></div>
          </ModalRegisterFooter>
        </Modal>

      <Modal isOpen={this.props.loginModal} toggle={this.props.onLoginModalClose}>

          <ModalLoginHeader toggle={this.props.onLoginModalClose}>Login</ModalLoginHeader>

          <ModalLoginBody>
            <Form>

              {errorCode &&
                <Alert color={errorColor}>
                  {errorMessage}
                </Alert>      
              }

              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  invalid={loginEmailState}
                  onChange = {event =>this.change(event, "loginEmail", "email")}
                  type="email"
                  name="loginEmail"
                  id="loginEmail"
                  value={loginEmail}
                  placeholder="Enter your email"
                />
                <FormFeedback>Oh noes! enter a valid email</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input 
                  invalid={loginPasswordState}
                  type="password"
                  name="loginPassword"
                  id="loginPassword"
                  value={loginPassword}
                  onChange = {event =>this.change(event, "loginPassword", "password")}

                  placeholder="enter your password"
                />
                <FormFeedback>Oh noes! enter a valid email</FormFeedback>
              </FormGroup>

            </Form>
          </ModalLoginBody>
          <ModalLoginFooter>
            <Button block color="success" size="lg" onClick={this.handleLoginSubmit}>Login</Button>
            <div className="mt-3">Dont have account.{' '}<span onClick={this.props.onRegisterModalClick} className="text-success pointer" href="">Register</span></div>
          </ModalLoginFooter>
        </Modal>

      <Modal isOpen={this.props.cartModal} toggle={this.props.onCartModalClose}>

          <ModalLoginHeader toggle={this.props.onCartModalClose}>Delivery Card</ModalLoginHeader>

          <ModalLoginBody>

          {authUser &&
          authUser.isValid == 0 &&

            <Form>

              <Alert color="info">
                Please Complete yout registeration
              </Alert>

              <FormGroup>

                <Label for="idNumber">ID Number</Label>
                <Input 
                  type="text" 
                  name="idNumber"
                  id="idNumber"
                  value={idNumber}
                  invalid={idNumberState}
                  onChange = {event =>this.change(event, "idNumber", "length", 1)}

                />
              </FormGroup>

              <FormGroup>

              <div className="fileinput mt-4">
                  <input
                    type="file"
                    onChange={this.handleImageChange}
                    ref={this.fileInput}
                  />
                  <div className="thumbnail">
                    <img src={this.state.imagePreviewUrl} alt="..." />
                  </div>
                  <div>
                    {this.state.file === null ? (
                      <Button color="info"  size="sm" onClick={() => this.handleImageClick()}>
                        Select ID Cart Image
                      </Button>
                    ) : (
                      <span>
                        <Button color="warning"  size="sm" onClick={() => this.handlhandleImageClickeClick()}>
                          Change
                        </Button>
                        
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => this.handleImageRemove()}
                        >
                          <i className="fas fa-times" /> Remove
                        </Button>
                      </span>
                    )}
                  </div>
                </div>

              </FormGroup>

              <FormGroup className="mt-4">
                  <Button block color="info" size="lg" onClick={this.handleSubmitIdCardImage}>ADD DATA</Button>
              </FormGroup>

            </Form>
          
          }

          {authUser &&

          authUser.isValid == 1 &&

          <React.Fragment>

            {items.length == 0 && 
            <Alert color="info">
              your cart is empty
            </Alert>
            }

            {items.length > 0 && 

              <Form>

              <CartFormGroup>

                <CartButtonGroup>
                  <CartTabButton name="mail" status={this.state.deliveryType == 'mail' ? 'select':''} color="success" outline onClick={this.handleDeliveryType}>Mail Order</CartTabButton>
                  <CartTabButton name="delivery" status={this.state.deliveryType == 'delivery' ? 'select':''} color="success" outline  onClick={this.handleDeliveryType}>Delivery</CartTabButton>
                </CartButtonGroup>

              </CartFormGroup>

              { this.state.deliveryType == 'mail' &&

              <React.Fragment>

              <FormGroup>
                <Label for="exampleSelect">Delivery Address</Label>
                <Input 
                  type="select" 
                  name="cartAddress" 
                  id="cartAddress"
                  onChange={this.handleAddressChange}
                  
                  >
                  {addresse.length > 0 &&

                    addresse.map((address,i)=>(
                      <option value={address._id}>{address.street}, {address.unit}, {address.code}</option>
                    ))
                  
                  }
                  {addresse.length == 0 &&
                    <option disabled>Please Add least One Address </option>
                  }
                </Input>
                <FormText color="info">+ Add New Address</FormText>
              </FormGroup>

              <FormGroup className="ml-1">
                <Label for="exampleSelect">Payment Method</Label>
                <Input 
                type="select" 
                name="select" 
                id="exampleSelect"
                onChange={this.handleMethodChange}
                >
                  <option selected disabled>Select</option>
                  <option value="Credit">Credit Card</option>
                  <option value="Cash">Cash</option>
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="exampleText">Building Address</Label>
                <Input type="textarea" name="text" id="exampleText" placeholder="type your building address" />
              </FormGroup>

              <Table responsive className="cart-table">

                <thead>
                  <tr>
                    <th width="25%">ITEM</th>
                    <th width="25%">STOCK</th>
                    <th width="20%">QTY</th>
                    <th width="25%">AMOUNT</th>
                    <th width="5%"></th>
                  </tr>
                </thead>

                <tbody>

                  {items.map((item,i) =>(


                  <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>
                      {item.sellType == 'weight' &&

                      <FormGroup className="m-0">
                        <StockInput type="select" className="stock-cart-select" name="stock" id="stock">
                            {item.prices.map((price,i) =>(
                              <option key={i}>{price.name}</option>
                            ))}
                        </StockInput>
                      </FormGroup>
                      }

                    </td>
                    <td>
                      <FormGroup className="m-0">
                        <StockInput type="select" className="stock-cart-select" name="select" id="exampleSelect">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </StockInput>
                      </FormGroup>
                    </td>
                    <td >
                    $45.55
                    </td>
                    <td >
                      <DeleteCartButton bg={deleteIcon} name={item._id} value={i} color="default" onClick={this.handleRemoveCart}></DeleteCartButton>
                    </td>
                  </tr>


                  ))}
              
              
                <tr>
                  <td></td>
                  <td colspan="4">
                    <Row>
                    <Col xs="6" className="text-right">
                      <span className="d-block">Subtotal</span>
                      <span className="d-block">Credit</span>
                      <span className="d-block">Tax</span>
                      <span className="d-block">Delivery</span>
                    </Col>
                    <Col xs="6">
                      <span className="d-block">$10.00</span>
                      <span className="d-block">$2.00</span>
                      <span className="d-block">$3.45</span>
                      <span className="d-block">$40.00</span>
                    </Col>
                    </Row>
                  </td>
                </tr>
              
                <tr>
                  <td></td>
                  <td colspan="4">
                  <Row>
                    <Col xs="6" className="text-right">
                      <h6 className="d-block m-0">Total</h6>
                    </Col>
                    <Col xs="6">
                      <h6  className="d-block m-0">$60.00</h6>
                    </Col>
                    </Row>

                  </td>
                </tr>

                </tbody>
              </Table>
              
              <FormGroup className="mt-4">
                  <Button  block color="info" size="lg" onClick={this.typeClick}>PLACE ORDER ($100.23)</Button>
              </FormGroup>

              </React.Fragment>
              
              }

              { this.state.deliveryType == 'delivery' &&

              <React.Fragment>
            
              <FormGroup>

                <Label for="exampleSelect">Delivery Address</Label>
                <Input 
                  type="select" 
                  name="cartAddress" 
                  id="cartAddress"
                  onChange={this.handleAddressChange}
                
                >
                <option selected disabled>Select</option>

                {addresse.length > 0 &&

                  addresse.map((address,i)=>(
                    <option value={address._id}>{address.street}, {address.unit}, {address.code}</option>
                  ))

                  }
                  {addresse.length == 0 &&
                  <option disabled>Please Add least One Address </option>
                  }              
                </Input>
                <FormText color="info">+ Add New Address</FormText>

              </FormGroup>

              <Row className="m-0 p-0">

                <Col xs="6" className="m-0 p-0">

                  <FormGroup>
                    <Label for="exampleSelect">Dispatch Time</Label>
                    <Input 
                    type="select" 
                    name="select" 
                    id="exampleSelect"
                    onChange={this.handleDispatchChange}
                    >
                      <option selected disabled>Select</option>
                      <option value="Today, 12:00 PM">Today, 12:00 PM</option>
                      <option value="Today, 06:00 PM">Today, 06:00 PM</option>
                    </Input>
                  </FormGroup>

                </Col>

                <Col xs="6" className="m-0 p-0">

                  <FormGroup className="ml-1">
                    <Label for="exampleSelect">Payment Method</Label>
                    <Input 
                      type="select" 
                      name="select" 
                      id="exampleSelect"
                      onChange={this.handleMethodChange}
                      >
                      <option selected disabled>Select</option>
                      <option value="Credit">Credit Card</option>
                      <option value="Cash">Cash</option>
                    </Input>
                  </FormGroup>

                </Col>

              </Row>

              <FormGroup>

                <Label for="exampleText">Delivery Note</Label>
                <Input 
                  type="textarea" 
                  name="text"
                  id="exampleText"
                  value={cartNote}
                  onChange={this.handleUserNote}
                />

              </FormGroup>

              <Table responsive className="cart-table">

                <thead>
                  <tr>
                    <th width="25%">ITEM</th>
                    <th width="25%">STOCK</th>
                    <th width="20%">QTY</th>
                    <th width="25%">AMOUNT</th>
                    <th width="5%"></th>
                  </tr>
                </thead>

                <tbody>

                  {items.map((item,i) =>(

                    cart.map((cartItem, j)=>(

                      item._id == cartItem.itemId &&

                      <tr key={item._id + i}>

                        <td>
                        {item.title}

                        </td>
                        <td>
                          {item.sellType == 'weight' &&
      
                          <FormGroup className="m-0">
                            <StockInput type="select" className="stock-cart-select" name="stock" id="stock">
                                {item.prices.map((price,i) =>(

                                  selected = (i == cartItem.priceId ) ? true :false,

                                  <option selected={selected} key={i}>{price.name}</option>

                                  ))
                                }
                            </StockInput>
                          </FormGroup>
      
                          }
      
                        </td>
                        <td>
                          <FormGroup className="m-0">
                            <StockInput
                              type="select" 
                              className="stock-cart-select" 
                              name={j} 
                              id="cartCount"
                              onChange={this.handleCountChange}
                            >

                              {
                                
                                count.map((co)=>(
                                  selected = (co == cartItem.count ) ? true :false,
                                  <option name={co} selected={selected} value={co}>{co}</option>
                                ))

                              }
  
                            </StockInput>
                          </FormGroup>
                        </td>
                        <td >

                          {item.sellType == "weight" &&
                            <span>{formatter.format(item.prices[cartItem.priceId].price * cartItem.count)}</span>
                          }

                          {item.sellType == "piece" &&
                            <span>{formatter.format(item.prices * cartItem.count)}</span>
                          }

                        </td>
                        <td >
                          <DeleteCartButton bg={deleteIcon} name={item._id} value={i} color="default" onClick={this.handleRemoveCart}></DeleteCartButton>
                        </td>
                    
                      </tr>

                    ))

                  ))}
              
                <tr>
                  <td></td>
                  <td colspan="4">
                    <Row>
                    <Col xs="6" className="text-right">
                      <span className="d-block">Subtotal</span>
                      <span className="d-block">Tax</span>
                      <span className="d-block">Delivery</span>
                    </Col>
                    <Col xs="6">
                      <span className="d-block">{formatter.format(subTotal)}</span>
                      <span className="d-block">{formatter.format(tax)}</span>
                      <span className="d-block">{formatter.format(delivery)}</span>
                    </Col>
                    </Row>
                  </td>
                </tr>
              
                <tr>
                  <td></td>
                  <td colspan="4">
                  <Row>
                    <Col xs="6" className="text-right">
                      <h6 className="d-block m-0">Total</h6>
                    </Col>
                    <Col xs="6">
                      <h6  className="d-block m-0">{formatter.format(subTotal + tax + delivery)}</h6>
                    </Col>
                    </Row>

                  </td>
                </tr>

                </tbody>
                
              </Table>
              
              <FormGroup className="mt-4">
                  <Button block color="info" size="lg" value={subTotal} onClick={this.handleSubmitOrder}>{`PLACE ORDER (${formatter.format(subTotal + tax + delivery)})`}</Button>
              </FormGroup>
              </React.Fragment>
              
              }

              </Form>

            } 

          </React.Fragment>

          }


        </ModalLoginBody>

      </Modal>

      <BrowserView>

        <HeaderWrapper type={scrollPosition > 20 ? 'scroll':'normal'}>

        <WrapperX isMobile={this.props.isMobile}>

          <WrapperMenu>

          <Row className="m-0 p-0 mb-3">

              <WrapperNav>

                <NavItem>
                  <NavLink href="#">DELIVEY</NavLink>
                </NavItem>

                {
                  /*

                <NavItem>
                  <NavLink href="#">ACCESSORIES</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="#">SUBSCRIPTION</NavLink>
                </NavItem>

                  */

                }

              </WrapperNav>

              <HeaderTools>
                <WrapperNav>

                  {/*

                  <NavItem>
                    <HeaderAddress bg={addressImage} value="address"  onClick={this.handleAddressClick}></HeaderAddress>
                  </NavItem>  

                  */}

                  <NavItem>
                    <HeaderCart onClick={this.handleCartClick}>
                      <img className="icon" src={cartImage} />
                      <HeaderCartB>
                        {cart.length}
                      </HeaderCartB>
                    </HeaderCart>
                  </NavItem>  

                  {authUser === null &&

                  <React.Fragment>

                    <NavItem>
                      <LoginLink href="" onClick={this.props.onLoginModalClick}>
                        Login
                      </LoginLink>
                    </NavItem>  

                    <NavItem>
                      <RegisterLink color="link" onClick={this.props.onRegisterModalClick}>
                        Sign Up
                      </RegisterLink>
                    </NavItem> 

                  </React.Fragment>

                    }
                  {authUser &&

                  <React.Fragment>

                    <Dropdown nav isOpen={this.state.profileDropdownOpen} toggle={this.profileToggle}>
                    <ProfileLink nav caret>
                      <img className="icon" src={userIcon} />
                      View Profile
                    </ProfileLink>
                    <DropdownMenu>
                      <DropdownItem header>Profile menu</DropdownItem>
                      <DropdownItem value="profile" onClick={this.props.onMenuClick}>{authUser.firstName} <span className="text-success">(verified)</span></DropdownItem>
                      <DropdownItem value="address" onClick={this.props.onMenuClick}>Delivery Addresses</DropdownItem>
                      <DropdownItem value="order" onClick={this.props.onMenuClick}>My Orders</DropdownItem>
                      <DropdownItem value="support" onClick={this.props.onMenuClick}>Support</DropdownItem>
                      <DropdownItem onClick={this.props.OnUserLogout}>Log Out</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>

                  </React.Fragment>

                  }

                </WrapperNav>
              </HeaderTools>

            </Row>

          </WrapperMenu>

          {scrollPosition < 20 &&

          <WrapperTabs>

            <Row className="m-0 p-0">

              <Col className="m-0 p-0">
                <HeaderCard className="border-none">
                  <HeaderCardImg src={clockIcon} />
                  <HeaderCardBody>
                    <strong className="delivery-abx">Open now / </strong>
                    <Button color="link" id="showtimes" className="delivery-abt">View Hours</Button>
                    <p className="delivery-abu">Today, Tuesday 9:00 am - 9:00 pm</p>

                  </HeaderCardBody>
                </HeaderCard>
              </Col>

              <Col className="m-0 p-0">
                <HeaderCard>
                  <HeaderCardImg src={deliveryIcon} />
                  <HeaderCardBody>
                  <strong className="delivery-abx">Delivery / </strong>
                  <a className="delivery-abt" href="">View Delivery Zone</a>
                  <div className="delivery-aaU">
                    <span className="">Min $20.00 / </span>
                    <span className="">Fee $5.00 - $40.00 / </span>
                    <span className="delivery-abu">12:00 AM - 11:00 PM</span>
                  </div>
                  </HeaderCardBody>
                </HeaderCard>           
              </Col>

              <Col className="m-0 p-0">
                <HeaderCard>
                  <HeaderCardImg src={giftIcon} />
                  <HeaderCardBody>
                    <strong className="delivery-abx">suprise gift / </strong>
                    <a className="delivery-abt" href="">View Promotion</a>
                  </HeaderCardBody>
                </HeaderCard>
              </Col>
              
            </Row>

          </WrapperTabs>

          }

      </WrapperX>

      </HeaderWrapper>

      </BrowserView>

      <MobileView>

        <MobileHeaderWrapper type={scrollPosition > 20 ? 'scroll':'normal'}>

              <MobileHeaderTools>
                <WrapperNav>

                  <NavItem >

                    <HeaderCart className="mx-1 mt-0"  onClick={this.props.onCartModalClick}>
                        <img className="icon" src={cartImage} />

                      <HeaderCartB>
                        {cart.length}
                      </HeaderCartB>

                    </HeaderCart>
                    
                  </NavItem>  

                  {authUser === null &&

                  <NavItem>

                    <HeaderSignIn cartImage={signinIcon} className="mr-0"  onClick={this.props.onLoginModalClick} />
                     
                  </NavItem> 

                  }

                  {authUser &&
                  <Dropdown nav isOpen={this.state.profileDropdownOpen} toggle={this.profileToggle}>
                    <ProfileLink nav caret>
                      <img className="icon" src={userIcon} />
                      View Profile
                    </ProfileLink>
                    <DropdownMenu>
                      <DropdownItem header>Your Profile</DropdownItem>
                      <DropdownItem>{authUser.firstName} <span className="text-success">(verified)</span></DropdownItem>
                      <DropdownItem>Delivery Addresses</DropdownItem>
                      <DropdownItem>My Orders</DropdownItem>
                      <DropdownItem>Log Out</DropdownItem>
                    </DropdownMenu>
                  </Dropdown> 
                  }

                </WrapperNav>

              </MobileHeaderTools>

            <Brand
                src = {this.props.logo}
                alt ={this.props.subBrand}
                className ={this.props.brandClasses}
            />

            {scrollPosition < 20 &&

            <MobileWrapperTabs>

              <Row className="m-0 p-0">

                <Col className="m-0 p-0">
                  <MobileHeaderCard >
                    <MobileHeaderCardImg src={clockIcon} />
                    <MobileHeaderCardBody>
                      <span id="showtimes" className="delivery-abx mobile">Open now</span>

                    </MobileHeaderCardBody>
                  </MobileHeaderCard>
                </Col>

                <Col className="m-0 p-0">
                  <MobileHeaderCard>
                    <MobileHeaderCardImg src={deliveryIcon} />
                    <MobileHeaderCardBody>
                    <span className="delivery-abx mobile">Delivery</span>
                    </MobileHeaderCardBody>
                  </MobileHeaderCard>           
                </Col>

                <Col className="m-0 p-0">
                  <MobileHeaderCard>
                    <MobileHeaderCardImg src={giftIcon} />
                    <MobileHeaderCardBody>
                      <span className="delivery-abx mobile">suprises </span>
                    </MobileHeaderCardBody>
                  </MobileHeaderCard>
                </Col>
                
              </Row>

            </MobileWrapperTabs>

            }

      </MobileHeaderWrapper>

      </MobileView>

    </React.Fragment>

    )
  }

}

Header.propTypes = {
  
  onRegisterClick: PropTypes.func,
  onRegisterModalClick: PropTypes.func,
  onLoginModalClick   : PropTypes.func,
  onRegisterModalClose: PropTypes.func,
  onLoginModalClose: PropTypes.func,
  onCartModalClick : PropTypes.func,
  onCartModalClose : PropTypes.func,
  RegisterModal : PropTypes.bool,
  onMenuClick: PropTypes.func, 
  OnUserLogout: PropTypes.func, 
  onRemoveCart : PropTypes.func,
  onChangeCartCount : PropTypes.func,
  onValidate : PropTypes.func,
  onOrderClick: PropTypes.func,
  onGetCartItems : PropTypes.func,
  onSetUserIdNumber : PropTypes.func,
  ongetCurrentUser:PropTypes.func

};

const mapStateToProps = createSelector(
  makeSelectCurrentUser(),
  RegisterModal => ({
    RegisterModal,
  }),
);

export function mapDispatchToProps(dispatch) {
  return {
    onValidate           : (evt) => dispatch(validateAge(evt.target.value)),
    onRegisterClick      : (email, password,firstName) => dispatch(userSignUp({email,password,firstName})),
    onLoginClick         : (email, password) => dispatch(userSignIn({email,password})),
    onRegisterModalClick : () => dispatch(showRegisterModal()),
    onRegisterModalClose : () => dispatch(closeRegisterModal()),
    onLoginModalClick    : () => dispatch(showLoginModal()),
    onLoginModalClose    : () => dispatch(closeLoginModal()),
    onCartModalClick     : () => dispatch(openCartModal()),
    onGetCartItems       : () => dispatch(getCartItems()),
    onCartModalClose     : () => dispatch(closeCartModal()),
    ongetCurrentUser     : () => dispatch(getCurrentUser()),
    onMenuClick          : (evt) => dispatch(changeMode(evt.target.value)),
    OnUserLogout         : () => dispatch(userLogout()),
    onRemoveCart         : (id,text) => dispatch(removeFromCart(id,text)),
    onChangeCartCount    : (id,count) => dispatch(changeCartCount(id,count)),
    onOrderClick         : (order) => dispatch(addOrder(order)),
    onSetUserIdNumber    : (data) => dispatch(userIdCart(data)),

    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
