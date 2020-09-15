import * as React from "react"
import { RouteComponentProps } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';
import * as MusicPlayerStore from '../store/MusicPlayer';
import './FooterPlayer.css';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';

type MusicPlayerProps =
  MusicPlayerStore.MusicPlayerState // ... state we've requested from the Redux store
  & typeof MusicPlayerStore.actionCreators // ... plus action creators we've requested
  & RouteComponentProps<{ folderPath: string }>; // ... plus incoming routing parameters

const drawerWidth = 240;

class SideMenu extends React.PureComponent<MusicPlayerProps>
{
  public render() {
    return (<Drawer
      variant="permanent"
    />)
  }
};

export default connect(
  (state: ApplicationState) => state.musicPlayer,
  MusicPlayerStore.actionCreators
)(SideMenu as any);
