import { List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core/";
import { SettingsRounded, LibraryMusicRounded, HomeRounded } from "@material-ui/icons/";
import React from "react";
import MuiStyles from "../MuiStyles";
import { connect } from "react-redux";
import { ApplicationState } from "../store";
import * as NavigationStore from '../store/Navigation';
import { Link } from "react-router-dom";

function MusicDrawerTemplate() {
  const classes = MuiStyles();
  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <HomeRounded />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/tracks">
          <ListItemIcon>
            <LibraryMusicRounded />
          </ListItemIcon>
          <ListItemText primary="Library" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component={Link} to="/settings">
          <ListItemIcon>
            <SettingsRounded />
          </ListItemIcon>
          <ListItemText primary={"Settings"} />
        </ListItem>
      </List>
    </div>
  );
}
export default connect(
  (state: ApplicationState) => state.navigation,
  NavigationStore.actionCreators)(MusicDrawerTemplate);