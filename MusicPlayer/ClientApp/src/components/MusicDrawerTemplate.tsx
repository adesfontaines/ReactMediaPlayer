import { List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core/";
import { SettingsRounded, LibraryMusicRounded, HomeRounded, ExploreRounded, AddCircleRounded } from "@material-ui/icons/";
import React from "react";
import MuiStyles from "../MuiStyles";
import { connect } from "react-redux";
import { ApplicationState } from "../store";
import * as NavigationStore from '../store/Navigation';
import { Link } from "react-router-dom";

type NavigationProps =
  NavigationStore.NavigationState
  & typeof NavigationStore.actionCreators;

function MusicDrawerTemplate(props: NavigationProps) {
  const classes = MuiStyles();
  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List style={{ paddingTop: "0px" }}>
        <ListItem selected={true} button component={Link} to="/">
          <ListItemIcon>
            <HomeRounded color="primary" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/tracks">
          <ListItemIcon>
            <LibraryMusicRounded color="primary" />
          </ListItemIcon>
          <ListItemText primary="Library" />
        </ListItem>
        <ListItem button component={Link} to="/explore">
          <ListItemIcon>
            <ExploreRounded color="primary"/>
          </ListItemIcon>
          <ListItemText primary="Explore" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component={Link} to="/import">
          <ListItemIcon>
            <AddCircleRounded color="primary" />
          </ListItemIcon>
          <ListItemText primary={"Import media"} />
        </ListItem>
        <ListItem button component={Link} to="/settings">
          <ListItemIcon>
            <SettingsRounded color="primary" />
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