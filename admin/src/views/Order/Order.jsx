
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";

// material ui icons
import MailOutline from "@material-ui/icons/MailOutline";
import Contacts from "@material-ui/icons/Contacts";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";



// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import ImageUpload from "components/CustomUpload/ImageUpload.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";


import CKEditor from 'react-ckeditor-component';
import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";



import axios from 'axios'
import { API_URL } from '../../config'



// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import { getPriority } from "os";

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

        cardAnimaton: "cardHidden",
        required: "",
        requiredState: "",
        errorCode:null,
        errorMessage:null,
        errorColor:null,
        orderAddress: "",
        orderAddressState: "",
        orderProduct:-1,
        orderProductState:'',
        orderText: "",
        productSelect: null,
        userList: null,
        orderStatus:'order',
        getUsers:[],
        getProducts:[],
        productItem:null,
        productItemName:null,
        count : 1,
        getAddresses :[],
        orderStep:1,
        orderDispatchTime:'',
        orderPaymentMethod:''

    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.typeClick = this.typeClick.bind(this);
    this.updateContent = this.updateContent.bind (this);
    this.handleUserSelect = this.handleUserSelect.bind(this)
    this.handleGetAddress = this.handleGetAddress.bind(this)
    this.handleSelect = this.handleSelect.bind(this)

  }

  fileInput = React.createRef();

  componentWillMount(){

    axios({
      method: "get",
      url: `${API_URL}users`,
      headers: {
          'Content-Type': 'application/json',
          "Authorization": `${localStorage.getItem('token')}`
      }
    })       
    .then((response) => {
      this.setState({
        getUsers : response.data.data
      })
    })

    axios({
      method: "get",
      url: `${API_URL}products`,
      headers: {
          'Content-Type': 'application/json',
          "Authorization": `${localStorage.getItem('token')}`
      }
    })       
    .then((response) => {
      this.setState({
        getProducts : response.data.data
      }
     )
    })

  }

  handleNameChange = (evt) => {
    this.setState({ name: evt.target.value });
  }
  
  handleAddPriceholder = () => {
    this.setState({ priceHolder: this.state.priceHolder.concat([{ name: '' }]) });
  }
  
  handleRemovePriceholder = (idx) => () => {
    this.setState({ priceHolder: this.state.priceHolder.filter((s, sidx) => idx !== sidx) });
  }

  handleUserSelect = event => {
    this.setState({ [event.target.name]: event.target.value }
      ,()=>{
        console.log(this.state.userId)
        axios({
          method: "get",
          url: `${API_URL}addressById`,
          headers: {
              'Content-Type': 'application/json',
              "Authorization": `${localStorage.getItem('token')}`
          },
          params:{
            userId: this.state.getUsers[this.state.userId]._id
          }
        })       
        .then((response) => {
          this.setState({
            getAddresses : response.data.data
          },
          console.log("getAddresses", this.state.getAddresses)
          )
        })
      }
    );
  };

  handleGetAddress = ()=>{
    axios({
      method: "get",
      url: `${API_URL}addressById`,
      headers: {
          'Content-Type': 'application/json',
          "Authorization": `${localStorage.getItem('token')}`
      },
      params:{
        userId: this.state.getUsers[this.state.userId]._id
      }
    })       
    .then((response) => {
      this.setState({
        getAddresses : response.data.data
      },
      console.log("getAddresses", this.state.getAddresses)
      )
    })

  }

  handleSelect = event =>{
    this.setState({ 
      [event.target.name]: event.target.value
    });
  }
  
  handleChange(event,stateName) {
    this.setState({ [stateName]: event.target.value }
      ,()=>{console.log("state in handlechange: =>",this.state)}
      );
  }

  handleMultiple = event => {
    this.setState({ multipleSelect: event.target.value });
  };

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
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "password":
        if (this.verifyLength(event.target.value, 1)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "equalTo":
        if (this.compare(event.target.value, this.state[stateNameEqualTo])) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
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
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" }
          ,()=>{console.log("State in change:", this.state)}
          );
        } else {
          this.setState({ [stateName + "State"]: "error" }
          ,()=>{console.log("State in change:", this.state)}
          );
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

  registerClick() {
    if (this.state.registerEmailState === "") {
      this.setState({ registerEmailState: "error" });
    }
    if (this.state.registerPasswordState === "") {
      this.setState({ registerPasswordState: "error" });
    }
    if (this.state.registerConfirmPasswordState === "") {
      this.setState({ registerConfirmPasswordState: "error" });
    }
    if (this.state.registerCheckboxState === "") {
      this.setState({ registerCheckboxState: "error" });
    }
  }

  typeClick() {
    console.log("this states :", this.state)
    if (this.state.orderAddress === "") {
      this.setState({ orderAddressState: "error" });
    }
    else {
        this.handleSubmit()
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
    else {
        this.handleSubmit()
      }
  
  }

  updateContent (newContent) {
    this.setState ({
        productText: newContent
    })
  }

  onChange (evt) {
      const newContent = evt.editor.getData ();
      this.setState ({
        orderText: newContent
      }
      ,()=>{console.log("State in textarea:", this.state)}

      )
  }

  onBlur (evt) {
      console.log ('onBlur event called with event info: ', evt);
  }

  afterPaste (evt) {
      console.log ('afterPaste event called with event info: ', evt);
  }

  handlePrice(){
    //this.setState({ productPrice: event.target.value });

  }

  handleSubmit(){

    let orderCart = []

    const orderText           = this.state.orderText;
    const orderUserId         = this.state.getUsers[this.state.userId]._id
    const orderDispatchTime   = this.state.orderDispatchTime;
    const orderPaymentMethod  = this.state.orderPaymentMethod;
    const orderDeliveryAddress= this.state.getAddresses[this.state.orderAddress]._id;
    const orderOrderType      = this.state.orderOrderType;
    const orderStatus         = this.state.orderStatus;
    const orderStep           = this.state.orderStep

    orderCart.push({
      'itemName':this.state.getProducts[this.state.orderProduct].title,
      'itemId' : this.state.getProducts[this.state.orderProduct]._id,
      'count' : this.state.count,
      'priceId': this.state.productItemName,
      'price':this.state.getProducts[this.state.orderProduct].sellType == 'weight' ? this.state.getProducts[this.state.orderProduct].prices[this.state.productItemName].price:'',
    })

    axios({
      method: "POST",
      url: `${API_URL}orders`,
      headers: {'authorization': localStorage.getItem('token')},

      data: {
        note    : orderText,
        userId    : orderUserId,
        dTime    : orderDispatchTime,
        pMethod    : orderPaymentMethod,
        dAddress    : orderDeliveryAddress,
        orderType    : orderOrderType,
        orderStatus :orderStatus,
        cart :orderCart,
        orderStep:orderStep
      }
    }).then((response)=>{

      this.props.history.push("/admin/orderList")

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

  render() {

    let { 
      count,
      orderAddress,
      orderProduct,
      productItem,
      productItemName,
      orderText,
      getUsers,
      getProducts,
      errorCode, 
      errorMessage,
      errorColor,
      userId,
      getAddresses
    } = this.state;

    var {
      classes,
      avatar,
      addButtonProps,
      changeButtonProps,
      removeButtonProps
    } = this.props

    return (
      <GridContainer>
       
        <GridItem xs={12} sm={12} md={12}>

          <Card>

            <CardHeader color="rose" text>
              <CardText color="rose">
                <h4 className={classes.cardTitle}>Add Order</h4>
              </CardText>
            </CardHeader>
            
            <CardBody>
              <form>

                <GridContainer>
                  <GridItem xs={12} sm={12}>

                  {errorCode &&
                    <SnackbarContent
                    message={errorMessage}
                    close
                    color={errorColor}
                    />
                  
                  }
                    </GridItem>
                </GridContainer>

                <GridContainer>

                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      User List
                    </FormLabel>
                  </GridItem>

                    <GridItem xs={12} sm={7}>

                      <FormControl
                          fullWidth
                          className={classes.selectFormControl}
                        >
                          <InputLabel
                            htmlFor="userId"
                            className={classes.selectLabel}
                          >
                            User List
                          </InputLabel>
                          <Select
                            value={this.state.userId}
                            onChange={this.handleUserSelect}
                            MenuProps={{ className: classes.selectMenu }}
                            classes={{ select: classes.select }}
                            inputProps={{
                              name: "userId",
                              id: "userId"
                            }}
                          >
                            <MenuItem
                              disabled
                              classes={{
                                root: classes.selectMenuItem
                              }}
                            >
                              Choose User
                            </MenuItem>

                              {getUsers.map((user,id) => (

                                <MenuItem
                                classes={{
                                  root: classes.selectMenuItem,
                                  selected: classes.selectMenuItemSelected
                                }}
                                value={id}
                                id={id}
                              >
                                {user.firstName} {user.lastName}

                              </MenuItem>
  
                              ))}

                          </Select>
                        </FormControl>
                    </GridItem>

                </GridContainer>
           
                {

                getAddresses.length > 0 &&

                <GridContainer>

                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Delivery Address
                    </FormLabel>
                  </GridItem>

                    <GridItem xs={12} sm={7}>

                      <FormControl
                          fullWidth
                          className={classes.selectFormControl}
                        >
                          <InputLabel
                            htmlFor="orderAddress"
                            className={classes.selectLabel}
                          >
                            Address List
                          </InputLabel>
                          <Select
                            success={this.state.orderAddressState === "success"}
                            error={this.state.orderAddressState === "error"}
                            value={this.state.orderAddress}
                            onChange={this.handleSelect}
                            MenuProps={{ className: classes.selectMenu }}
                            classes={{ select: classes.select }}
                            inputProps={{
                              name: "orderAddress",
                              id: "orderAddress"
                            }}
                          >
                            <MenuItem
                              disabled
                              classes={{
                                root: classes.selectMenuItem
                              }}
                            >
                              Choose Address
                            </MenuItem>

                            {getAddresses.map((address,id) => (

                                <MenuItem
                                classes={{
                                  root: classes.selectMenuItem,
                                  selected: classes.selectMenuItemSelected
                                }}
                                value={id}
                                id={id}
                              >
                                {address.street} {address.unit} {address.unit}

                              </MenuItem>
  
                              ))}

                          </Select>
                        </FormControl>
                    </GridItem>

                </GridContainer>
           
                }

                {getAddresses &&

                  getAddresses.length < 1 &&

                  <GridContainer>

                    <GridItem xs={12} sm={2}>
                      <FormLabel className={classes.labelHorizontal}>
                        Delivery Address
                      </FormLabel>
                    </GridItem>

                      <GridItem xs={12} sm={7}>
                      <CustomInput
                        id="disabled"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: "Disabled",
                          disabled: true,
                          value:"This user have not any address, Add least One Address"
                        }}
                      />

                      </GridItem>

                                  
                  </GridContainer>

                }

                <GridContainer>

                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Delivery Note
                    </FormLabel>
                  </GridItem>

                  <GridItem xs={12} sm={7}>
                    <CKEditor
                        activeClass="p10"
                        name="orderText"
                        id="orderText"
                        content={orderText}
                        events={{
                            'blur': this.onBlur.bind (this),
                            'afterPaste': this.afterPaste.bind (this),
                            'change': this.onChange.bind (this)
                        }}
                      />

                  </GridItem>
                </GridContainer>
               
                <GridContainer>

                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Products
                    </FormLabel>
                  </GridItem>

                    <GridItem xs={12} sm={7}>

                        <FormControl
                          fullWidth
                          className={classes.selectFormControl}
                        >
                          <InputLabel
                            htmlFor="orderProduct"
                            className={classes.selectLabel}
                          >
                            Choose Product
                          </InputLabel>
                          <Select
                            value={this.state.orderProduct}
                            onChange={this.handleSelect}

                            MenuProps={{
                              className: classes.selectMenu
                            }}
                            classes={{
                              select: classes.select
                            }}

                            inputProps={{
                              name: "orderProduct",
                              id: "orderProduct"
                            }}
                          >
                            <MenuItem
                              disabled
                              classes={{
                                root: classes.selectMenuItem
                              }}
                            >
                              Choose Product
                            </MenuItem>

                            {getProducts &&

                              getProducts.map((product,id) => (

                                <MenuItem
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                  }}
                                  value={id}
                                  id={id}
                                    >
                                  {product.title}
                                </MenuItem>

                            ))}

                          </Select>
                        </FormControl>
                      </GridItem>

                </GridContainer>

                {orderProduct != -1 &&

                getProducts[orderProduct].sellType == 'weight' &&

                  <GridContainer>

                    <GridItem xs={12} sm={2}>
                      <FormLabel className={classes.labelHorizontal}>
                        Product Item
                      </FormLabel>
                    </GridItem>

                    <GridItem xs={12} sm={7}>

                        <FormControl
                          fullWidth
                          className={classes.selectFormControl}
                        >
                          <InputLabel
                            htmlFor="productItemName"
                            className={classes.selectLabel}
                          >
                            Choose Item
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu
                            }}
                            classes={{
                              select: classes.select
                            }}

                            value={productItemName}
                            onChange={this.handleSelect}
                            inputProps={{
                              name: "productItemName",
                              id: "productItemName"
                            }}
                          >
                            <MenuItem
                              disabled
                              classes={{
                                root: classes.selectMenuItem
                              }}
                            >
                              Choose Item
                            </MenuItem>

                            {getProducts[orderProduct].prices.map((item,id) => (
                                <MenuItem
                                  classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                  }}
                                  value={id}
                                  id = {id}             
                                  >
                                  {item.name},{item.price},{item.amount}
                                </MenuItem>
                            ))}

                          </Select>
                        </FormControl>
                      </GridItem>

                  </GridContainer>

                }


                <GridContainer>

                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Order Count
                  </FormLabel>
                </GridItem>

                <GridItem xs={12} sm={7}>

                  <CustomInput
                    success={this.state.countState === "success"}
                    error={this.state.countState === "error"}
                    labelText="Order Count *"
                    id="count"

                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event =>
                        this.change(event, "count", "number", 0),
                      type: "number",
                      endAdornment:
                        this.state.countState === "error" ? (
                          <InputAdornment position="end">
                            <Close className={classes.danger} />
                          </InputAdornment>
                        ) : (
                          undefined
                        )
                    }}
                  />
                </GridItem>

                </GridContainer>



                <GridContainer>

                    <GridItem xs={12} sm={2}>
                      <FormLabel className={classes.labelHorizontal}>
                        Order DispatchTime
                      </FormLabel>
                    </GridItem>


                    <GridItem xs={12} sm={7}>

                        <FormControl
                          fullWidth
                          className={classes.selectFormControl}
                        >
                          <InputLabel
                            htmlFor="orderDispatchTime"
                            className={classes.selectLabel}
                          >
                            Choose DispatchTime
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu
                            }}
                            classes={{
                              select: classes.select
                            }}
                            success={this.state.orderStatusState === "success"}
                            error={this.state.orderStatusState === "error"}
      
                            value={this.state.orderDispatchTime}
                            onChange={this.handleSelect}
                            inputProps={{
                              name: "orderDispatchTime",
                              id: "orderDispatchTime"
                            }}
                          >
                            <MenuItem
                              disabled
                              classes={{
                                root: classes.selectMenuItem
                              }}
                            >
                              Choose Status
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="Today, 12:00 PM"
                            >
                              Today, 12:00 PM
                            </MenuItem>

                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="Today, 06:00 PM"
                            >
                              Today, 06:00 PM
                            </MenuItem>


                          </Select>
                        </FormControl>
                      </GridItem>
                </GridContainer>
            

                <GridContainer>

                    <GridItem xs={12} sm={2}>
                      <FormLabel className={classes.labelHorizontal}>
                        Order Payment Method
                      </FormLabel>
                    </GridItem>


                    <GridItem xs={12} sm={7}>

                        <FormControl
                          fullWidth
                          className={classes.selectFormControl}
                        >
                          <InputLabel
                            htmlFor="orderPaymentMethod"
                            className={classes.selectLabel}
                          >
                            Choose DispatchTime
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu
                            }}
                            classes={{
                              select: classes.select
                            }}
                            success={this.state.orderStatusState === "success"}
                            error={this.state.orderStatusState === "error"}
      
                            value={this.state.orderPaymentMethod}
                            onChange={this.handleSelect}
                            inputProps={{
                              name: "orderPaymentMethod",
                              id: "orderPaymentMethod"
                            }}
                          >
                            <MenuItem
                              disabled
                              classes={{
                                root: classes.selectMenuItem
                              }}
                            >
                              Choose Status
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="Credit"
                            >
                              Credit
                            </MenuItem>

                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="Cash"
                            >
                              Cash
                            </MenuItem>

                          </Select>
                        </FormControl>
                      </GridItem>
                </GridContainer>
            

                <GridContainer>

                    <GridItem xs={12} sm={2}>
                      <FormLabel className={classes.labelHorizontal}>
                        Order Type
                      </FormLabel>
                    </GridItem>


                    <GridItem xs={12} sm={7}>

                        <FormControl
                          fullWidth
                          className={classes.selectFormControl}
                        >
                          <InputLabel
                            htmlFor="orderOrderType"
                            className={classes.selectLabel}
                          >
                            Choose DispatchTime
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu
                            }}
                            classes={{
                              select: classes.select
                            }}
                            success={this.state.orderStatusState === "success"}
                            error={this.state.orderStatusState === "error"}
      
                            value={this.state.orderOrderType}
                            onChange={this.handleSelect}
                            inputProps={{
                              name: "orderOrderType",
                              id: "orderOrderType"
                            }}
                          >
                            <MenuItem
                              disabled
                              classes={{
                                root: classes.selectMenuItem
                              }}
                            >
                              Choose Status
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="Delivery"
                            >
                              Delivery
                            </MenuItem>

                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="Mail"
                            >
                              Mail
                            </MenuItem>

                          </Select>
                        </FormControl>
                      </GridItem>
                </GridContainer>
            

                <GridContainer>

                    <GridItem xs={12} sm={2}>
                      <FormLabel className={classes.labelHorizontal}>
                        Order Status
                      </FormLabel>
                    </GridItem>


                    <GridItem xs={12} sm={7}>

                        <FormControl
                          fullWidth
                          className={classes.selectFormControl}
                        >
                          <InputLabel
                            htmlFor="productStatus"
                            className={classes.selectLabel}
                          >
                            Choose Status
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu
                            }}
                            classes={{
                              select: classes.select
                            }}
                            success={this.state.orderStatusState === "success"}
                            error={this.state.orderStatusState === "error"}
      
                            value={this.state.orderStatus}
                            onChange={this.handleSelect}
                            inputProps={{
                              name: "orderStatus",
                              id: "orderStatus"
                            }}
                          >
                            <MenuItem
                              disabled
                              classes={{
                                root: classes.selectMenuItem
                              }}
                            >
                              Choose Status
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="order"
                            >
                              order
                            </MenuItem>

                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="confirm"
                            >
                              confirm
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="prepared"
                            >
                              prepared
                            </MenuItem>

                          </Select>
                        </FormControl>
                      </GridItem>
                </GridContainer>
            
            
            
            
              </form>
            </CardBody>
            <CardFooter>
              <Button color="rose" onClick={this.typeClick}>
                add new row
              </Button>
            </CardFooter>
          </Card>
        </GridItem>

      </GridContainer>
    );
  }
}

Order.propTypes = {
  classes: PropTypes.object
};

export default withStyles(validationFormsStyle)(Order);
