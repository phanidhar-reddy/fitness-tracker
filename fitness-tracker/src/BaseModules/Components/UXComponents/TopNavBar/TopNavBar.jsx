import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@material-ui/core";
import {
  AccountCircleSharp,
  DirectionsBikeSharp,
  FastfoodSharp,
  FitnessCenterSharp,
} from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import securityUtill from "../../../../Bo/securityUtill";
import {
  addUserData,
  clearAll,
  clearAllUserData,
} from "../../../../DataAdapters/store/Actions";

class TopNavBar extends React.Component {
  styles = (theme) => ({
    flex: {
      flex: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  });
  state = { openMenuBool: false, menuPosition: null };
  handleClose = () => {
    this.setState({ openMenuBool: false });
  };

  handleLogout = () => {
    this.setState({ openMenuBool: false });
    this.props.clearAllMessages();
    this.props.clearAllUserData();
    securityUtill.removeJwtToken();
  };

  openMenu = (event) => {
    this.setState({ openMenuBool: !this.state.openMenuBool });
    this.setState({ menuPosition: event.currentTarget });
  };

  render = () => {
    const classes = { ...this.styles };
    let menu = <div></div>;

    if (this.state.openMenuBool) {
      menu = (
        <Menu open={true} anchorEl={this.state.menuPosition}>
          <NavLink
            to="/personInfo"
            exact
            style={{ color: "black", textDecoration: "none" }}
          >
            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          </NavLink>
          <NavLink
            to="/login"
            exact
            style={{ color: "black", textDecoration: "none" }}
          >
            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
          </NavLink>
        </Menu>
      );
    }
    let isAuthorised = <div></div>;
    if (securityUtill.getJwtToken()) {
      isAuthorised = (
        <>
          <Box>
            <NavLink to="/exercise" exact>
              <IconButton>
                <FitnessCenterSharp></FitnessCenterSharp>
              </IconButton>
            </NavLink>
            <NavLink to="/dite" exact>
              <IconButton>
                <FastfoodSharp></FastfoodSharp>
              </IconButton>
            </NavLink>
          </Box>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={this.openMenu}
          >
            <AccountCircleSharp />
            {menu}
          </IconButton>
        </>
      );
    }
    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            <IconButton color="contrast">
              <DirectionsBikeSharp
                fontSize="large"
                style={{ color: "white" }}
              />
            </IconButton>
          </Box>
          {isAuthorised}
        </Toolbar>
      </AppBar>
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
    clearAllMessages: () => dispatch(clearAll()),
    setUserData: (userData) => dispatch(addUserData(userData)),
    clearAllUserData: () => dispatch(clearAllUserData()),
  };
};

export default connect(mapStateToProps, mapDispatchToPorpos)(TopNavBar);
