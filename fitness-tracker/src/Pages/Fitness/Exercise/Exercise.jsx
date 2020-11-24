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
import { appConfig } from "../../../BaseModules/Config/ApplicationConfig/appConfig";
import baseAxios from "../../../DataAdapters/Axios/authAxios";
import Utills from "../../../Bo/Utill";

class Exercise extends UXPage {
  onPageLoad = async () => {
    this.props.clearAllMessages();
    let exerciseResponse = await baseAxios({
      method: "get",
      url: `${appConfig.exerciseUri}/${this.props.userInfo.email}`,
    });
    this.setValue("fitness.collection", exerciseResponse.data);
  };

  doReset = () => {
    let defaultRow = {
      _id: "",
      date: "",
      cardio: 0,
      weightLift: 0,
      yoga: 0,
      other: 0,
    };
    this.setValue("fitness.editData", defaultRow);
  };

  saveFitness = async () => {
    this.props.clearAllMessages();
    if (this.validateExercise(this.getValue("fitness.editData"))) {
      this.props.addErrorMessage("Add Valid Exercise Data");
      window.scroll(0, 0);
      return;
    }
    let exerciseData =
      "" !== this.getValue("fitness.editData._id")
        ? this.getValue("fitness.editData")
        : {
            ...this.getValue("fitness.editData"),
            date: Utills.getCurrentDateString(),
            userKey: this.props.userInfo.email,
          };
    await baseAxios({
      method: "put",
      url: `${appConfig.exerciseUri}`,
      data: { ...exerciseData },
    });
    this.doReset();
    await this.onPageLoad();
  };

  validateExercise = (ererciseInfo) => {
    return (
      ererciseInfo.cardio === 0 ||
      ererciseInfo.weightLift === 0 ||
      ererciseInfo.yoga === 0 ||
      ererciseInfo.other === 0
    );
  };

  getTotal = (row) => {
    return (
      parseInt(row.cardio) +
      parseInt(row.weightLift) +
      parseInt(row.yoga) +
      parseInt(row.other)
    );
  };

  handleEdit = (event, row) => {
    this.setValue("fitness.editData", row);
  };

  handleDelete = async (event, id) => {
    let rows = [...this.getValue("fitness.collection")];
    await baseAxios({
      method: "delete",
      url: `${appConfig.exerciseUri}`,
      data: { _id: id },
    });
    _.remove(rows, (row) => row._id === id);
    this.setValue("fitness.collection", rows);
  };

  doReset = () => {
    let defaultRow = {
      _id: "",
      date: "",
      userKey: this.props.userInfo.email,
      cardio: 0,
      weightLift: 0,
      yoga: 0,
      other: 0,
    };
    this.setValue("fitness.editData", defaultRow);
  };

  changeCardio = (event) => {
    this.setValue("fitness.editData.cardio", event.target.value);
  };

  changeWeightLift = (event) => {
    this.setValue("fitness.editData.weightLift", event.target.value);
  };

  changeYoga = (event) => {
    this.setValue("fitness.editData.yoga", event.target.value);
  };

  changeOther = (event) => {
    this.setValue("fitness.editData.other", event.target.value);
  };

  genrateCustomeCuntent = (key, row) => {
    switch (key) {
      case "total":
        return this.getTotal(row);
      default:
        return row[key];
    }
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
              type="number"
              label="Cardio"
              onChange={this.changeCardio}
              value={this.getValue("fitness.editData.cardio")}
            />
          </Box>
          <Box mr={1}>
            <TextField
              variant="outlined"
              margin="normal"
              type="number"
              label="weight Lift"
              onChange={this.changeWeightLift}
              value={this.getValue("fitness.editData.weightLift")}
            />
          </Box>
          <Box mr={1}>
            <TextField
              variant="outlined"
              margin="normal"
              type="number"
              label="Yoga"
              onChange={this.changeYoga}
              value={this.getValue("fitness.editData.yoga")}
            />
          </Box>
        </Box>
        <Box display="flex" p={2}>
          <Box mr={1}>
            <TextField
              variant="outlined"
              margin="normal"
              type="number"
              label="Other"
              onChange={this.changeOther}
              value={this.getValue("fitness.editData.other")}
            />
          </Box>
        </Box>
        <Divider></Divider>
        <Box display="flex" p={2}>
          <Box mr={1}>
            <Button
              fullWidth
              variant="contained"
              onClick={this.saveFitness}
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
            Exercise Information
          </Box>
          <Divider></Divider>
          <Box p={2}>
            <DataGrid
              headers={`Date,Cardio,Weight Lift,Yoga,Other,Total`}
              keys="date,cardio,weightLift,yoga,other,total"
              collection={this.getValue("fitness.collection")}
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

export default connect(mapStateToProps, mapDispatchToPorpos)(Exercise);
