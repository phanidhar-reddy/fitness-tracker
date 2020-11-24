import { Container } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { connect } from "react-redux";
import UXComponent from "../../UX/UXComponent/UXComponent";

class AlertComponent extends UXComponent {
  getMessages = (messagesList, messageType) => {
    if (messagesList.length === 0) return <div></div>;
    return <Alert severity={messageType}>{`${messagesList}`}</Alert>;
  };

  renderComponent = () => {
    return (
      <Container maxWidth="md">
        {this.getMessages(this.props.messages.error, "error")}
        {this.getMessages(this.props.messages.warning, "warning")}
        {this.getMessages(this.props.messages.info, "info")}
      </Container>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    messages: state.alertReducer,
  };
};

const mapDispatchToPorpos = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToPorpos)(AlertComponent);
