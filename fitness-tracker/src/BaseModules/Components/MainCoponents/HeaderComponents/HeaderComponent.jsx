import React from "react";
import UXComponent from "../../UX/UXComponent/UXComponent";
import { Phantom } from "../../UXComponents/SpacingComponent/SpaceCompoennt";
import TopNavBar from "../../UXComponents/TopNavBar/TopNavBar";

export default class HeaderComponent extends UXComponent {
  renderComponent = () => {
    return (
      <div>
        <TopNavBar></TopNavBar>
        <Phantom></Phantom>
      </div>
    );
  };
}
