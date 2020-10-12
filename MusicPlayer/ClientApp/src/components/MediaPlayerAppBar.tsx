import { AppBar, Avatar, Badge, IconButton, InputBase, Toolbar, Typography, Menu, MenuItem } from "@material-ui/core/";
import { Menu as MenuIcon, Search as SearchIcon } from '@material-ui/icons/';
import MailIcon from '@material-ui/icons/Mail';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import * as React from 'react';
import { connect } from 'react-redux';
import MuiStyles from '../MuiStyles';
import * as NavigationStore from '../store/Navigation';
import { ApplicationState } from "../store";

type NavigationProps =
  NavigationStore.NavigationState
  & typeof NavigationStore.actionCreators;

const mobileMenuId = "primary-search-account-menu-mobile";
const sideMenuId = "primary-search-account-menu";

function MediaPlayerAppBar(props: NavigationProps) {

  // Handlers //
  // Drawer Menu
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    //setMobileMoreAnchorEl(event.currentTarget);
  }
  const handleMobileMenuClose = () => {
    //setMobileMoreAnchorEl(null);
  }
  const handleDrawerToggle = () => {
    console.log("toggle menu");
    props.toggleMobileDrawer();
  }

  //Right menu
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    //setAnchorEl(event.currentTarget);
  }
  const handleMenuClose = () => {
    //setAnchorEl(null);
    //handleMobileMenuClose();
  }

  /// Renderers ///
  const classes = MuiStyles();

  const renderMobileMenu = () => {
    return (
      <Menu
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        open={true}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <Avatar>H</Avatar>
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
  }
  const renderMenu = () => {
    return (
      <Menu
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={sideMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={true}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    );
  }
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          onClick={handleDrawerToggle}
          aria-label="open drawer"
        >
          <MenuIcon />
        </IconButton>

        <Typography className={classes.title} variant="h6" noWrap>
          ReactMediaPlayer
        </Typography>

        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search songs, artist, albums…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>

        <div className={classes.grow} />

        <div className={classes.sectionDesktop}>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
          >
            <Avatar>H</Avatar>
          </IconButton>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton
            aria-label="show more"
            aria-haspopup="true"
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>);
}

export default connect(
  (state: ApplicationState) => state.navigation,
  NavigationStore.actionCreators)(MediaPlayerAppBar);