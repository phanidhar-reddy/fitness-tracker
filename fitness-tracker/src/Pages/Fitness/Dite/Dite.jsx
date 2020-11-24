import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  TextField,
} from "@material-ui/core";
import React from "react";
import UXPage from "../../../BaseModules/Components/UX/UXPage/UXPage";
import DataGrid from "../../../BaseModules/Components/UXComponents/DataGrid/DataGrid";
import { connect } from "react-redux";
import {
  addError,
  addUserData,
  clearAll,
} from "../../../DataAdapters/store/Actions";
import _ from "lodash";
import baseAxios from "../../../DataAdapters/Axios/authAxios";
import { appConfig } from "../../../BaseModules/Config/ApplicationConfig/appConfig";
import Utills from "../../../Bo/Utill";
class Dite extends UXPage {
  onPageLoad = async () => {
    this.props.clearAllMessages();
    let diteInfo = await baseAxios({
      method: "get",
      url: `${appConfig.diteUri}/${this.props.userInfo.email}`,
    });
    this.setValue("dite.collection", diteInfo.data);
  };

  getTotal = (row) => {
    return (
      parseInt(row.breakFast) +
      parseInt(row.lunch) +
      parseInt(row.snacks) +
      parseInt(row.dinner)
    );
  };

  handleEdit = async (event, row) => {
    this.setValue("dite.editData", row);
  };

  handleDelete = async (event, id) => {
    let rows = [...this.getValue("dite.collection")];
    await baseAxios({
      method: "delete",
      url: `${appConfig.diteUri}`,
      data: { _id: id },
    });
    _.remove(rows, (row) => row._id === id);
    this.setValue("dite.collection", rows);
  };

  genrateCustomeCuntent = (key, row) => {
    switch (key) {
      case "total":
        return this.getTotal(row);
      default:
        return row[key];
    }
  };

  doReset = () => {
    let defaultRow = {
      _id: "",
      date: "",
      userKey: this.props.userInfo.email,
      breakFast: 0,
      lunch: 0,
      snacks: 0,
      dinner: 0,
    };
    this.setValue("dite.editData", defaultRow);
  };

  saveDite = async (event) => {
    this.props.clearAllMessages();
    if (this.validateDite(this.getValue("dite.editData"))) {
      this.props.addErrorMessage("Add Valid Dite Data");
      window.scroll(0, 0);
      return;
    }
    let diteData =
      "" !== this.getValue("dite.editData._id")
        ? this.getValue("dite.editData")
        : {
            ...this.getValue("dite.editData"),
            date: Utills.getCurrentDateString(),
            userKey: this.props.userInfo.email,
          };
    await baseAxios({
      method: "put",
      url: `${appConfig.diteUri}`,
      data: { ...diteData },
    });
    this.doReset();
    await this.onPageLoad();
  };

  validateDite = (diteInfo) => {
    return (
      diteInfo.breakFast === 0 ||
      diteInfo.lunch === 0 ||
      diteInfo.snacks === 0 ||
      diteInfo.dinner === 0
    );
  };

  changeBreakFast = (event) => {
    if ("" !== event.target.value.trim() && !isNaN(event.target.value))
      this.setValue("dite.editData.breakFast", event.target.value);
  };

  changeLunch = (event) => {
    if ("" !== event.target.value.trim() && !isNaN(event.target.value))
      this.setValue("dite.editData.lunch", event.target.value);
  };

  changeSnacks = (event) => {
    if ("" !== event.target.value.trim() && !isNaN(event.target.value))
      this.setValue("dite.editData.snacks", event.target.value);
  };

  changeDinner = (event) => {
    if ("" !== event.target.value.trim() && !isNaN(event.target.value))
      this.setValue("dite.editData.dinner", event.target.value);
  };

  genrateEditableData = () => {
    return (
      <Container>
        <Divider></Divider>
        <Box display="flex" p={2}>
          <Box mr={1}>
            <TextField
              variant="outlined"
              margin="normal"
              type="text"
              id="breakFast"
              label="Break Fast"
              name="breakFast"
              onChange={this.changeBreakFast}
              value={this.getValue("dite.editData.breakFast")}
            />
          </Box>
          <Box mr={1}>
            <TextField
              variant="outlined"
              margin="normal"
              type="text"
              id="lunch"
              label="Lunch"
              name="lunch"
              onChange={this.changeLunch}
              value={this.getValue("dite.editData.lunch")}
            />
          </Box>
          <Box mr={1}>
            <TextField
              variant="outlined"
              margin="normal"
              type="text"
              id="snacks"
              label="Snacks"
              name="snacks"
              onChange={this.changeSnacks}
              value={this.getValue("dite.editData.snacks")}
            />
          </Box>
        </Box>
        <Box display="flex" p={2}>
          <Box mr={1}>
            <TextField
              variant="outlined"
              margin="normal"
              type="text"
              id="dinner"
              label="Dinner"
              name="dinner"
              onChange={this.changeDinner}
              value={this.getValue("dite.editData.dinner")}
            />
          </Box>
        </Box>
        <Divider></Divider>
        <Box display="flex" p={2}>
          <Box mr={1}>
            <Button
              fullWidth
              variant="contained"
              onClick={this.saveDite}
              color="primary"
            >
              Save
            </Button>
          </Box>
          <Box mr={1}>
            <Button
              fullWidth
              variant="outlined"
              onClick={this.doReset}
              color="primary"
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Container>
    );
  };

  renderComponent = () => {
    console.log();
    return (
      <Container maxWidth="md">
        <Paper>
          <Box p={2} style={{ backgroundColor: "#D3D3D3" }}>
            Dite Information
          </Box>
          <Divider></Divider>
          <Box p={2}>
            <DataGrid
              headers={`Date,BreakFast,Lunch,Snacks,Dinner,Total`}
              keys="date,breakFast,lunch,snacks,dinner,total"
              collection={this.getValue("dite.collection")}
              editRow={this.handleEdit}
              delete={this.handleDelete}
              genrateCustomeCuntent={this.genrateCustomeCuntent}
              genrateEditableData={this.genrateEditableData}
              keyId="_id"
            ></DataGrid>
          </Box>
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

export default connect(mapStateToProps, mapDispatchToPorpos)(Dite);
