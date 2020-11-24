import { Container, Link, Typography } from "@material-ui/core";
import React from "react";
import UXComponent from "../../UX/UXComponent/UXComponent";
import { Phantom } from "../../UXComponents/SpacingComponent/SpaceCompoennt";

export default class FooterCompoent extends UXComponent {
  style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
  };

  renderComponent = () => {
    return (
      <footer position="fixed">
        <Phantom></Phantom>
        <Container style={this.style}>
          <Container maxWidth="sm">
            <Typography variant="body1">Fitness Trakcer App</Typography>
            <Typography variant="body2" color="textSecondary" align="center">
              {"Copyright © "}
              <Link color="inherit" href="mailto:syreddy@deloitte.com">
                Deloitte
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Container>
        </Container>
      </footer>
    );
  };
}
