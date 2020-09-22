import * as React from 'react';
import { connect } from 'react-redux';
import IconButton from "@material-ui/core/IconButton";
import { Toolbar, AppBar, Typography, InputBase, Badge, Avatar } from "@material-ui/core/";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Menu as MenuIcon, Search as SearchIcon, } from '@material-ui/icons/';
import MuiStyles from '../MuiStyles';


const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  //setAnchorEl(event.currentTarget);
};

const handleMobileMenuClose = () => {
  //setMobileMoreAnchorEl(null);
};

const handleMenuClose = () => {
  //setAnchorEl(null);
  handleMobileMenuClose();
};

const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  //setMobileMoreAnchorEl(event.currentTarget);
};

const menuId = "primary-search-account-menu";
const renderMenu = (
  <Menu
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    id={menuId}
    keepMounted
    transformOrigin={{ vertical: "top", horizontal: "right" }}
    open={true}
    onClose={handleMenuClose}
  >
    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
    <MenuItem onClick={handleMenuClose}>My account</MenuItem>
  </Menu>
);

const mobileMenuId = "primary-search-account-menu-mobile";
const renderMobileMenu = (
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

function MusicPlayerAppBar() {
  const classes = MuiStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap>
          Material-UI
          </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
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
    </AppBar>)
}
export default connect()(MusicPlayerAppBar);
