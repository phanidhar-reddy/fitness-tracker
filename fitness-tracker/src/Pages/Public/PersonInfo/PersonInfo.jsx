import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import React from "react";
import UXPage from "../../../BaseModules/Components/UX/UXPage/UXPage";
import { connect } from "react-redux";
import {
  addError,
  addUserData,
  clearAll,
} from "../../../DataAdapters/store/Actions";
import securityBo from "../../../Bo/securityBo";

class PersonInfo extends UXPage {
  onPageLoad = async () => {
    console.log("onPageLoad", this.props.userInfo);
    this.props.clearAllMessages();
    if (this.props.userInfo.email) {
      let userInfo = await securityBo.getUserInfo(this.props.userInfo.email);
      this.props.setUserData(userInfo);
    }
  };

  onDateChange = (event) => {
    this.props.setUserData({
      ...this.props.userInfo,
      dob: event.target.value,
    });
  };

  calculateBMI = (height, weight) => {
    return Math.round((weight * 100 * 100) / (height * height));
  };

  onWeightChange = (event) => {
    if ("" !== event.target.value.trim() && !isNaN(event.target.value))
      this.setValue("bmi.kgs", event.target.value.trim());
  };

  onHeightChange = (event) => {
    if ("" !== event.target.value.trim() && !isNaN(event.target.value))
      this.setValue("bmi.height", event.target.value.trim());
  };

  validateAndCalciluateBmi = () => {
    let bmi = { ...this.getValue("bmi") };
    this.setValue("bmi.val", this.calculateBMI(bmi.height, bmi.kgs));
  };

  onGenderChange = (event) => {
    this.props.setUserData({
      ...this.props.userInfo,
      gender: event.target.value,
    });
  };

  updateUserInfo = () => {
    console.log(this.props.userInfo);
    if (this.userIsValid(this.props.userInfo)) {
      securityBo.updateUserInfo(this.props.userInfo);
    } else {
      this.setState({
        validation: {
          userUpdate: true,
        },
      });
    }
  };

  userIsValid = () => {
    return (
      this.props.userInfo.dob !== "" &&
      this.props.userInfo.dob !== null &&
      this.props.userInfo.gender !== ""
    );
  };

  renderComponent = () => {
    console.log(this.props.userInfo.gender);
    return (
      <Container maxWidth="md">
        <Paper>
          <Box p={2} style={{ backgroundColor: "#D3D3D3" }}>
            Member Details
          </Box>
          <Divider />
          <Box p={2} style={{ backgroundColor: "#D3D3D3" }}>
            {`Hellow ${this.props.userInfo.firstName} ${this.props.userInfo.lastName}!`}
          </Box>
          <Divider />
          <Box style={{ display: "flex" }} p={2}>
            <Box mr={1}>
              <FormControl inputVariant="outlined">
                <TextField
                  key="dob-simple-select-filled-label"
                  variant="outlined"
                  margin="normal"
                  type="date"
                  fullWidth
                  label="Date Of Birth"
                  id="dateOfBirth"
                  value={`${this.props.userInfo.dob}`}
                  error={
                    (this.props.userInfo.dob === "" ||
                      this.props.userInfo.dob === null) &&
                    this.state.validation.userUpdate
                  }
                  onChange={this.onDateChange}
                  name="dateOfBirth"
                />
              </FormControl>
            </Box>
            <Box ml={1} p={2}>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-native-simple">Gender</InputLabel>
                <Select
                  key="gender-simple-select-filled-label"
                  value={`${this.props.userInfo.gender}`}
                  error={
                    this.props.userInfo.gender === "" &&
                    this.state.validation.userUpdate
                  }
                  onChange={this.onGenderChange}
                >
                  <MenuItem value={"M"}>Male</MenuItem>
                  <MenuItem value={"F"}>Female</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Button color="primary" onClick={this.updateUserInfo}>
                save
              </Button>
            </Box>
          </Box>
          <Divider />
          <Box display="flex" p={2}>
            <TextField
              variant="outlined"
              margin="normal"
              type="text"
              id="weight"
              value={this.getValue("bmi.kgs")}
              onChange={this.onWeightChange}
              label="Weight (Kgs)"
              name="weight"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              type="text"
              id="height"
              value={this.getValue("bmi.height")}
              onChange={this.onHeightChange}
              label="Height (cms)"
              name="height"
            />
            <Button color="primary" onClick={this.validateAndCalciluateBmi}>
              Calculate BMI
            </Button>

            <TextField
              variant="outlined"
              margin="normal"
              type="number"
              id="bmi"
              value={this.getValue("bmi.val")}
              disabled
              label="BMI"
              name="bmi"
            />
          </Box>
          <Divider />
          <Box p={2}>
            <h2>BMI Category</h2>
            <ol>
              <li>{"Underweight -> < 18.5"}</li>
              <li>{`Normal weight -> 18.5-24.9`}</li>
              <li>{`Overweight -> 25-29.9`}</li>
              <li>{`Obesity -> BMI of 30 or greater`}</li>
            </ol>
          </Box>
          <Divider />
        </Paper>
      </Container>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    messages: state.alertReducer,
    userInfo: state.userReducer,
  };
};

const mapDispatchToPorpos = (dispatch) => {
  return {
    addErrorMessage: (message) => dispatch(addError(message)),
    clearAllMessages: () => dispatch(clearAll()),
    setUserData: (userData) => dispatch(addUserData(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToPorpos)(PersonInfo);
