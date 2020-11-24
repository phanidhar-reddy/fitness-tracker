import { Backdrop } from "@material-ui/core";
import React from "react";
import UXComponent from "../../UX/UXComponent/UXComponent";
import classes from "./Spinner.module.css";

export default class Spinner extends UXComponent {
  showSpinner = () => {
    this.setState({ spinner: true });
  };

  hideSpinner = () => {
    this.setState({ spinner: false });
  };

  renderComponent = () => {
    return (
      <Backdrop
        invisible={false}
        open={this.state.spinner}
        className={classes.Backdrop}
      >
        {this.props.children}
      </Backdrop>
    );
  };
}
