import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import React from "react";
import { connect } from "react-redux";
import MuiStyles from "../MuiStyles";
import MuiTheme from "../MuiTheme";
import { ApplicationState } from "../store";
import * as NavigationStore from '../store/Navigation';
import MusicDrawerTemplate from "./MusicDrawerTemplate";

type NavigationProps =
  NavigationStore.NavigationState
  & typeof NavigationStore.actionCreators;

function MusicPlayerDrawerElement(props: NavigationProps) {
  const classes = MuiStyles();
  const theme = MuiTheme;
  return (
    <nav className={classes.drawer} aria-label="mailbox folders" >
      <Hidden smUp implementation="css" >
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={props.isMobileOpen}
          onClose={props.toggleMobileDrawer}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <MusicDrawerTemplate />
        </Drawer>
      </Hidden >
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open>
          <MusicDrawerTemplate />
        </Drawer>
      </Hidden>
    </nav >
  )
};

export default connect(
  (state: ApplicationState) => state.navigation,
  NavigationStore.actionCreators)(MusicPlayerDrawerElement);