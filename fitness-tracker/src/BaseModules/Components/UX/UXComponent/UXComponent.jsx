import React from "react";
import _ from "lodash";

export default class UXComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validation: {
        userUpdate: false,
        signUp: false,
        bmi: false,
      },
      modal: {
        authData: {
          username: "",
          password: "",
        },
        bmi: {
          kgs: 0,
          height: 0,
          val: 0,
        },
        person: {
          _id: "",
          email: "",
          firstName: "",
          lastName: "",
          phoneNumber: 0,
          password: "",
          rePassword: "",
          dob: "",
          gender: "",
        },
        dite: {
          collection: [],
          editData: {
            _id: "",
            date: "",
            userKey: "",
            breakFast: 0,
            lunch: 0,
            snacks: 0,
            dinner: 0,
          },
        },
        fitness: {
          collection: [],
          editData: {
            _id: "",
            date: "",
            userKey: "",
            cardio: 0,
            weightLift: 0,
            yoga: 0,
            other: 0,
          },
        },
      },
      spinner: true,
    };
  }

  async componentDidMount() {
    await this.onPageLoad();
  }

  onPageLoad = async () => {};

  setValue = (modalName, modalValue) => {
    _.set(this.state, "modal." + modalName, modalValue);
    this.setState({ modal: { ...this.state.modal } });
  };

  getValue = (modalName) => {
    return _.get(this.state.modal, modalName);
  };

  renderComponent = () => {};

  render() {
    return this.renderComponent();
  }
}
