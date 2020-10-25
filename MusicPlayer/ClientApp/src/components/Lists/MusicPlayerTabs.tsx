import * as React from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppBar, Tabs, Tab, createStyles, withStyles, Theme } from '@material-ui/core';
import MuiStyles from '../../MuiStyles';

const StyledTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      color: "#7e5dc0",
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      "&:focus": {
        opacity: 1
      }
    }
  })
)(Tab);

function MusicPlayerTabs() {
  const match = useRouteMatch();
  const location = useLocation();
  const classes = MuiStyles();

  if(match)
    return (
      <Tabs className={classes.mediaTabs} value={location.pathname} style={{backgroundColor:'#ffffff38'}} indicatorColor="primary" textColor="primary" aria-label="simple tabs">
          <StyledTab disableRipple label="Playlists" component={Link} to={`/playlists`} value={`/playlists`} />
          <StyledTab disableRipple label="Tracks" component={Link} to={`/tracks`} value={`/tracks`} />
          <StyledTab disableRipple label="Albums" component={Link} to={`/albums`} value={`/albums`} />
          <StyledTab disableRipple label="Artists" component={Link} to={`/artists`} value={`/artists`} />
        </Tabs>)
}

export default connect()(MusicPlayerTabs as any);
