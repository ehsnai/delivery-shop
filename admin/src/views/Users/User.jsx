import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import axios from 'axios'
import { API_URL } from '../../config'

// material ui icons
import MailOutline from "@material-ui/icons/MailOutline";
import Contacts from "@material-ui/icons/Contacts";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";

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
//import ImageUpload from "components/CustomUpload/ImageUpload.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";

// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      firstName: "",
      firstNameState: "",
      lastName: "",
      lastNameState: "",
      password: "",
      passwordState: "",
      passwordConfirm: "",
      passwordConfirmState: "",

      userStatus: "",
      userType:"",
      userMembership: "",

      userImageUrl:"",
      userImage :'',
      file: null,
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage,

      userIdNumberState:'',
      userIdNumber:''

    };

    this.registerClick = this.registerClick.bind(this);
    this.loginClick = this.loginClick.bind(this);
    this.typeClick = this.typeClick.bind(this);
    this.rangeClick = this.rangeClick.bind(this);

  }

  fileInput = React.createRef();

  handleSelect = event => {
    this.setState({ [event.target.name]: event.target.value }
      ,()=>{console.log("state in select: =>",this.state)}
      );
  };
  
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
          this.setState({ [stateName + "State"]: "success" }
          ,() =>{
            console.log("states in change", this.state)
          }
          );
        } else {
          this.setState({ [stateName + "State"]: "error" }
          ,() =>{
            console.log("states in change", this.state)
          }
          );
        }
        break;
      case "password":
        if (this.verifyLength(event.target.value, 1)) {
          this.setState({ [stateName + "State"]: "success" }
          ,() =>{
            console.log("states in pass", this.state)
          }
          );
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "equalTo":
        if (this.compare(event.target.value, this.state[stateNameEqualTo])) {
          this.setState({ [stateName + "State"]: "success" }
          ,() =>{
            console.log("states in pass", this.state)
          }
          );
        } else {
          this.setState({ [stateName + "State"]: "error" }
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
          this.setState({ [stateName + "State"]: "success" }
          ,() =>{
            console.log("states in pass", this.state)
          }
          );
        } else {
          this.setState({ [stateName + "State"]: "error" });
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
    if (this.state.passwordConfirmState === "") {
      this.setState({ passwordConfirmState: "error" });
    }
    if (this.state.passwordState === "") {
      this.setState({ passwordState: "error" });
    }
  }

  loginClick() {
    if (this.state.loginEmailState === "") {
      this.setState({ loginEmailState: "error" });
    }
    if (this.state.loginPasswordState === "") {
      this.setState({ loginPasswordState: "error" });
    }
  }

  typeClick() {
    if (this.state.firstNameState === "") {
      this.setState({ firstNameState: "error" });
    }
    if (this.state.lastNameState === "") {
      this.setState({ lastNameState: "error" });
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
  };

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
            this.setState({
              userImage: response.data.imagepath,
            }
            ,()=>{console.log("image state", this.state)}
            );
                }).catch((error) => {
          console.log("The file is error: ",error);

    });
  
  };

  handleImageClick = () => {
    this.fileInput.current.click();
  };

  handleImageRemove = () => {
    this.setState({
      file: null,
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage
    }
    ,()=>{console.log("image state", this.state)}
    );
    this.fileInput.current.value = null;
  };

  handleSubmit(){

    const firstName   = this.state.firstName;
    const lastName    = this.state.lastName;
    const email       = this.state.email;
    const password    = this.state.password;
    const idNumber = this.state.userIdNumber;
    const idImage = this.state.userImage;
    const type    = this.state.userType;
    const status      = this.state.userStatus;
    const mobile  = this.state.mobile;
    const membership = this.state.userMembership;

    axios({

      method: "POST",
      url: `${API_URL}users`,
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

  render() {

    const {  errorCode, errorMessage,errorColor} = this.state;

    const { classes,avatar } = this.props;

    return (
      <GridContainer>
       
        <GridItem xs={12} sm={12} md={12}>

          <Card>

            <CardHeader color="rose" text>
              <CardText color="rose">
                <h4 className={classes.cardTitle}>Add User</h4>
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
                      First Name
                    </FormLabel>
                  </GridItem>

                  <GridItem xs={12} sm={7}>

                    <CustomInput
                      success={this.state.firstNameState === "success"}
                      error={this.state.firstNameState === "error"}
                      id="firstName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "firstName", "length", 0),
                        type: "text",
                        endAdornment:
                          this.state.firstNameState === "error" ? (
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
                      Last Name
                    </FormLabel>
                  </GridItem>


                  <GridItem xs={12} sm={7}>

                    <CustomInput
                      success={this.state.lastNameState === "success"}
                      error={this.state.lastNameState === "error"}
                      id="lastName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "lastName", "length", 0),
                        type: "text",
                        endAdornment:
                          this.state.lastNameState === "error" ? (
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
                      Email
                    </FormLabel>
                  </GridItem>

                  <GridItem xs={12} sm={7}>

                    <CustomInput
                      success={this.state.emailState === "success"}
                      error={this.state.emailState === "error"}
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "email", "email"),
                        type: "email",
                        endAdornment:
                          this.state.emailState === "error" ? (
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
                      Mobile
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={7}>
                    <CustomInput
                      success={this.state.mobileState === "success"}
                      error={this.state.mobileState === "error"}
                      id="mobile"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "mobile", "number"),
                        type: "number",
                        endAdornment:
                          this.state.mobileState === "error" ? (
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
                      Password
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={3}>
                    <CustomInput
                      success={this.state.passwordState === "success"}
                      error={this.state.passwordState === "error"}
                      id="password"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event => this.change(event, "password",'password'),
                        type: "password",
                        autoComplete: "off",
                        endAdornment:
                          this.state.password === "error" ? (
                            <InputAdornment position="end">
                              <Close className={classes.danger} />
                            </InputAdornment>
                          ) : (
                            undefined
                          )
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={3}>
                    <CustomInput
                      success={this.state.passwordConfirmState === "success"}
                      error={this.state.passwordConfirmState === "error"}
                      id="passwordConfirm"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(
                            event,
                            "passwordConfirm",
                            "equalTo",
                            "password"
                          ),
                        type: "password",
                        autoComplete: "off",
                        endAdornment:
                          this.state.passwordConfirmState === "error" ? (
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
                        User Status
                      </FormLabel>
                    </GridItem>


                    <GridItem xs={12} sm={7}>

                        <FormControl
                          fullWidth
                          className={classes.selectFormControl}
                        >
                          <InputLabel
                            htmlFor="userStatus"
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
      
                            value={this.state.userStatus}
                            onChange={this.handleSelect}
                            inputProps={{
                              name: "userStatus",
                              id: "userStatus"
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

                <GridContainer>

                    <GridItem xs={12} sm={2}>
                      <FormLabel className={classes.labelHorizontal}>
                        User Membership
                      </FormLabel>
                    </GridItem>


                    <GridItem xs={12} sm={7}>

                        <FormControl
                          fullWidth
                          className={classes.selectFormControl}
                        >
                          <InputLabel
                            htmlFor="userMembership"
                            className={classes.selectLabel}
                          >
                            Choose MemberShip
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu
                            }}
                            classes={{
                              select: classes.select
                            }}
      
                            value={this.state.userMembership}
                            onChange={this.handleSelect}
                            inputProps={{
                              name: "userMembership",
                              id: "userMembership"
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
                              value="bronze"
                            >
                              bronze
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="silver"
                            >
                              silver
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="gold"
                            >
                              gold
                            </MenuItem>


                          </Select>
                        </FormControl>
                      </GridItem>


                </GridContainer>

                <GridContainer>

                    <GridItem xs={12} sm={2}>
                      <FormLabel className={classes.labelHorizontal}>
                        User Type
                      </FormLabel>
                    </GridItem>

                    <GridItem xs={12} sm={7}>

                        <FormControl
                          fullWidth
                          className={classes.selectFormControl}
                        >
                          <InputLabel
                            htmlFor="userType"
                            className={classes.selectLabel}
                          >
                            Choose Type
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu
                            }}
                            classes={{
                              select: classes.select
                            }}
      
                            value={this.state.userType}
                            onChange={this.handleSelect}
                            inputProps={{
                              name: "userType",
                              id: "userType"
                            }}
                          >
                            <MenuItem
                              disabled
                              classes={{
                                root: classes.selectMenuItem
                              }}
                            >
                              Choose Type
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="admin"
                            >
                              Admin
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="user"
                            >
                              User
                            </MenuItem>


                          </Select>
                        </FormControl>
                      </GridItem>


                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      ID Number
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={7}>
                    <CustomInput
                      success={this.state.userIdNumberState === "success"}
                      error={this.state.userIdNumberState === "error"}
                      id="userIdNumber"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event =>
                          this.change(event, "userIdNumber", "number"),
                        type: "number",
                        endAdornment:
                          this.state.numberState === "error" ? (
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
                      ID Cart Image
                    </FormLabel>
                  </GridItem>

                  <GridItem xs={12} sm={4} md={4}>

                    <div className="fileinput text-center">
                      <input
                        type="file"
                        onChange={this.handleImageChange}
                        ref={this.fileInput}
                      />
                      <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
                        <img src={this.state.imagePreviewUrl} alt="..." />
                      </div>
                      <div>
                        {this.state.file === null ? (
                          <Button color="rose" onClick={() => this.handleImageClick()}>
                            {avatar ? "Add Photo" : "Select image"}
                          </Button>
                        ) : (
                          <span>
                            <Button color="rose" onClick={() => this.handlhandleImageClickeClick()}>
                              Change
                            </Button>
                            {avatar ? <br /> : null}
                            <Button
                              color="danger"
                              onClick={() => this.handleImageRemove()}
                            >
                              <i className="fas fa-times" /> Remove
                            </Button>
                          </span>
                        )}
                      </div>
                    </div>
              
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

User.propTypes = {
  classes: PropTypes.object
};

export default withStyles(validationFormsStyle)(User);
