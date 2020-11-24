import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { AccountCircleSharp, LockSharp } from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import { UXPage } from "../../../BaseModules/Components/Index";
import securityBo from "../../../Bo/securityBo";
import {
  addError,
  clearAll,
  addInfo,
  clearAllUserData,
  addUserData,
} from "../../../DataAdapters/store/Actions";

class Login extends UXPage {
  onPageLoad = () => {
    this.props.clearAllUserData();
    this.props.clearAllMessages();
  };
  //Sign In
  onEmailChange = (event) => {
    this.setValue("authData.username", event.target.value);
  };
  onPasswordChange = (event) => {
    this.setValue("authData.password", event.target.value);
  };
  //Sign Up
  onEmailSignUpChange = (event) => {
    this.setValue("person.email", event.target.value);
  };
  onPasswordlSignUpChange = (event) => {
    this.setValue("person.password", event.target.value);
  };

  onRePasswordlSignUpChange = (event) => {
    this.setValue("person.rePassword", event.target.value);
  };

  onFIrstNameSignInChange = (event) => {
    this.setValue("person.firstName", event.target.value);
  };
  onLastNameSignInChange = (event) => {
    this.setValue("person.lastName", event.target.value);
  };
  onPhoneSignUpCHnage = (event) => {
    this.setValue("person.phoneNumber", event.target.value);
  };

  onSignIn = async () => {
    const isVlid = await securityBo.authorizeUser(this.getValue("authData"));
    if (isVlid) {
      this.props.setUserData({ email: this.getValue("authData.username") });
      //move to personInfo Screen
      this.props.history.push(`/personInfo`);
    } else {
      //throw validation
      this.props.addErrorMessage("Invalid UserName Or Password");
    }
  };

  validateState = (userInfo) => {
    if (
      userInfo.email === "" ||
      userInfo.firstName === "" ||
      userInfo.lastName === "" ||
      userInfo.phoneNumber === 0 ||
      userInfo.rePassword === "" ||
      userInfo.password === ""
    ) {
      return false;
    }

    if (userInfo.password !== userInfo.rePassword) {
      this.props.addErrorMessage("Password doesn't match");
      return false;
    }
    return true;
  };

  doReset = () => {
    this.doResetSignUp();
    this.props.clearAllMessages();
  };

  doResetSignUp = () => {
    const person = {
      _id: "",
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: 0,
      password: "",
      rePassword: "",
      dob: "",
      gender: "",
    };
    this.setValue("person", person);
  };

  onSignUp = async () => {
    if (!this.validateState(this.getValue("person"))) {
      this.setState({
        validation: {
          signUp: true,
        },
      });
      return;
    }

    const isVlid = await securityBo.signUp(this.getValue("person"));
    if (isVlid) {
      //move to personInfo Screen
      this.props.addInfoMessages("User Creation Sucessful");
    } else {
      //throw validation
      this.props.addErrorMessage(
        "Failed To Save User Info Try with Diffrent User"
      );
    }

    this.doResetSignUp();
  };

  renderComponent = () => {
    return (
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Container fixed maxWidth="xs">
          <Avatar>
            <AccountCircleSharp color="primary" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={this.getValue("authData.username")}
              onChange={this.onEmailChange}
              type="email"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={this.getValue("authData.password")}
              onChange={this.onPasswordChange}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.onSignIn}
            >
              Sign In
            </Button>
          </form>
        </Container>
        <Divider orientation="vertical" flexItem />
        <Container maxWidth="xs">
          <Avatar>
            <LockSharp color="primary" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box display="flex">
            <Box mr={1}>
              <TextField
                variant="outlined"
                margin="normal"
                value={this.getValue("person.firstName")}
                error={
                  this.getValue("person.firstName") === "" &&
                  this.state.validation.signUp
                }
                onChange={this.onFIrstNameSignInChange}
                required
                fullWidth
                id="firstname"
                label="First Name"
                name="firstname"
                autoFocus
              />
            </Box>
            <Box ml={1}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={this.getValue("person.lastName")}
                error={
                  this.getValue("person.lastName") === "" &&
                  this.state.validation.signUp
                }
                onChange={this.onLastNameSignInChange}
                id="lastname"
                label="Last Name"
                name="lastname"
              />
            </Box>
          </Box>
          <Box display="flex">
            <Box mr={1}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={this.getValue("person.email")}
                error={
                  this.getValue("person.email") === "" &&
                  this.state.validation.signUp
                }
                onChange={this.onEmailSignUpChange}
                id="email"
                label="Email Address"
                type="email"
                name="email"
              />
            </Box>
            <Box ml={1}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={this.getValue("person.phoneNumber")}
                error={
                  this.getValue("person.phoneNumber") === 0 &&
                  this.state.validation.signUp
                }
                onChange={this.onPhoneSignUpCHnage}
                id="phoneNumber"
                label="Phone Number"
                type="number"
                name="phoneNumber"
              />
            </Box>
          </Box>
          <Box display="flex">
            <Box mr={1}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={this.getValue("person.password")}
                error={
                  (this.getValue("person.password") === "" ||
                    this.getValue("person.password") !==
                      this.getValue("person.rePassword")) &&
                  this.state.validation.signUp
                }
                onChange={this.onPasswordlSignUpChange}
                name="password"
                label="Password"
                type="password"
                id="password"
              />
            </Box>
            <Box ml={1}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="reneterPassword"
                label="Re-Enter Password"
                type="password"
                onChange={this.onRePasswordlSignUpChange}
                error={
                  (this.getValue("person.rePassword") === "" ||
                    this.getValue("person.password") !==
                      this.getValue("person.rePassword")) &&
                  this.state.validation.signUp
                }
                value={this.getValue("person.rePassword")}
                id="reneterPassword"
              />
            </Box>
          </Box>
          <Grid container direction="row" justify="center">
            <ButtonGroup disableElevation>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.onSignUp}
              >
                Sign Up
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={this.doReset}
                color="primary"
              >
                Reset
              </Button>
            </ButtonGroup>
          </Grid>
        </Container>
      </Grid>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    messages: state.alertReducer,
  };
};

const mapDispatchToPorpos = (dispatch) => {
  return {
    addErrorMessage: (message) => dispatch(addError(message)),
    addInfoMessages: (message) => dispatch(addInfo(message)),
    clearAllMessages: () => dispatch(clearAll()),
    clearAllUserData: () => dispatch(clearAllUserData()),
    setUserData: (userData) => dispatch(addUserData(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToPorpos)(Login);
