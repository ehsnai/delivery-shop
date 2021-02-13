
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

class Coupon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        cardAnimaton: "cardHidden",

        errorCode:null,
        errorMessage:null,
        errorColor:null,

        couponTitle: "",
        couponTitleState: "",
        couponDiscount:'',
        couponDiscountState:'',
        couponText: "",
        couponStatus:''

    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.typeClick = this.typeClick.bind(this);
    this.updateContent = this.updateContent.bind (this);

  }

  fileInput = React.createRef();

  handleNameChange = (evt) => {
    this.setState({ name: evt.target.value });
  }
  
  handlePriceholderNameChange = (event,idx) => {

    console.log("idx name:",idx)

    const newPriceHolder = this.state.priceHolder.map((priceHolder, sidx) => {
      if (idx !== sidx) return priceHolder;
      return { ...priceHolder, name: event.target.value};
    });
    
    this.setState({ priceHolder: newPriceHolder }
      ,()=>{console.log("state in price: =>",this.state)}
    );
  }

  handlePriceholderPriceChange = (event,idx) => {

    console.log("idx:",idx)

    const newPriceHolder = this.state.priceHolder.map((priceHolder, sidx) => {

      if (idx == sidx) return { ...priceHolder, price: event.target.value};
      return priceHolder
      
    });
    
    this.setState({ priceHolder: newPriceHolder }
      ,()=>{console.log("state in price: =>",this.state)}
    );
  }

  handleAddPriceholder = () => {
    this.setState({ priceHolder: this.state.priceHolder.concat([{ name: '' }]) });
  }
  
  handleRemovePriceholder = (idx) => () => {
    this.setState({ priceHolder: this.state.priceHolder.filter((s, sidx) => idx !== sidx) });
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

  handleMultiple = event => {
    this.setState({ multipleSelect: event.target.value });
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

    if (this.state.productTitle === "") {
      this.setState({ productTitleState: "error" });
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
        couponText: newContent
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
          "Authorization": `${localStorage.getItem('token')}`
      }
    };

    axios.post(`${API_URL}uploadImage`,formData,config)
  
        .then((response) => {
            console.log("The file is successfully uploaded",response.data.imagepath);
            this.setState({
              productImage: response.data.imagepath,
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

    const couponTitle    = this.state.couponTitle;
    const couponText     = this.state.couponText;
    const couponDiscount = this.state.couponDiscount;
    const couponStatus   = this.state.couponStatus;

    console.log("state for send:",this.state)

    axios({
      method: "POST",
      url: `${API_URL}coupons`,
      headers: {'authorization': localStorage.getItem('token')},

      data: {
        title    : couponTitle,
        text     : couponText,
        discount : couponDiscount,
        status   : couponStatus
      }
    }).then((response)=>{

      this.props.history.push("/admin/CouponList")

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

    const { couponText ,errorCode, errorMessage,errorColor} = this.state;

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
                <h4 className={classes.cardTitle}>Add Coupon</h4>
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
                      Coupon Name
                    </FormLabel>
                  </GridItem>

                  <GridItem xs={12} sm={7}>

                    <CustomInput
                      success={this.state.couponTitleState === "success"}
                      error={this.state.couponTitleState === "error"}
                      labelText="Coupon Name *"
                      id="couponTitle"
    
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "couponTitle", "length", 0),
                        type: "text",
                        endAdornment:
                          this.state.orderTitleState === "error" ? (
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
                      Coupon Information
                    </FormLabel>
                  </GridItem>

                  <GridItem xs={12} sm={7}>
                    <CKEditor
                        activeClass="p10"
                        name="couponText"
                        id="couponText"
                        content={couponText}
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
                      Discount Percent
                    </FormLabel>
                  </GridItem>

                  <GridItem xs={12} sm={7}>

                    <CustomInput
                      success={this.state.couponDiscountState === "success"}
                      error={this.state.couponDiscountState === "error"}
                      labelText="Coupon Discount *"
                      id="couponDiscount"
    
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "couponDiscount", "length", 0),
                        type: "number",
                        endAdornment:
                          this.state.orderTitleState === "error" ? (
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
                        Coupon Status
                      </FormLabel>
                    </GridItem>


                    <GridItem xs={12} sm={7}>

                        <FormControl
                          fullWidth
                          className={classes.selectFormControl}
                        >
                          <InputLabel
                            htmlFor="couponStatus"
                            className={classes.selectLabel}
                          >
                            Coupon Status
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu
                            }}
                            classes={{
                              select: classes.select
                            }}
                            success={this.state.couponStatusState === "success"}
                            error={this.state.couponStatusState === "error"}
      
                            value={this.state.couponStatus}
                            onChange={this.handleSelect}
                            inputProps={{
                              name: "couponStatus",
                              id: "couponStatus"
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
                              value="active"
                            >
                              active
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="inactive"
                            >
                              inactive
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

Coupon.propTypes = {
  classes: PropTypes.object
};

export default withStyles(validationFormsStyle)(Coupon);
