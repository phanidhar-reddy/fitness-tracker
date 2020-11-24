import { Container, makeStyles } from "@material-ui/core";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import UXComponent from "../../UX/UXComponent/UXComponent";
import AlertComponent from "../Alerts/AlertComponent";
import FooterCompoent from "../FoooterComponent/FooterComponent";
import HeaderComponent from "../HeaderComponents/HeaderComponent";
import Page from "../PagesNavigatorComponent/PagesNavigatorComponent";

export default class BaseComponent extends UXComponent {
  renderComponent = () => {
    const useStyles = makeStyles((theme) => ({
      footer: {
        padding: theme.spacing(3, 2),
        marginTop: "auto",
        backgroundColor:
          theme.palette.type === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      },
    }));

    return (
      <BrowserRouter>
        <HeaderComponent></HeaderComponent>
        <Container fixed>
          <AlertComponent messages={this.state.messages}></AlertComponent>
          <Page></Page>
        </Container>
        <FooterCompoent className={useStyles.footer}></FooterCompoent>
      </BrowserRouter>
    );
  };
}
