import React from "react";
import { Route } from "react-router-dom";
import Dite from "../../../../Pages/Fitness/Dite/Dite";
import Exercise from "../../../../Pages/Fitness/Exercise/Exercise";
import PersonInfo from "../../../../Pages/Public/PersonInfo/PersonInfo";
import Login from "../../../../Pages/Security/Login/Login";
import UXComponent from "../../UX/UXComponent/UXComponent";

export default class Page extends UXComponent {
  renderComponent = () => {
    return (
      <>
        <Route path="/login" component={Login} exact></Route>
        <Route path="/logout" component={Login} exact></Route>
        <Route path="/personInfo" component={PersonInfo} exact></Route>
        <Route path="/dite" component={Dite} exact></Route>
        <Route path="/exercise" component={Exercise} exact></Route>
        <Route path="/" component={Login} exact></Route>
      </>
    );
  };
}
