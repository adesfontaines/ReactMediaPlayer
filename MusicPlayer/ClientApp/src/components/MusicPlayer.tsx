import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { NavItem, NavLink, Container } from 'reactstrap';
import { ApplicationState } from '../store';
import * as MusicPlayerStore from '../store/MusicPlayer';
import MusicPlayerDriver from './MusicPlayerDriver';
import MusicTracks from './Lists/MusicTracks';
import Home from './Home';

type MusicPlayerProps =
  MusicPlayerStore.MusicPlayerState // ... state we've requested from the Redux store
  & typeof MusicPlayerStore.actionCreators // ... plus action creators we've requested
  & RouteComponentProps<{ folderPath: string }>; // ... plus incoming routing parameters

function MusicPlayerTabs() {
  return (
    <ul className="nav justify-content-center">
        <NavItem>
          <NavLink tag={Link} className="nav-link active" to="/songs">Songs</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} className="nav-link active" to="/albums">Albums</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} className="nav-link active" to="/artists">Artists</NavLink>
        </NavItem>
    </ul>)
}
class MusicPlayer extends React.PureComponent<MusicPlayerProps> {
  render() {
    return (
      <React.Fragment>
        <MusicPlayerTabs />
        <MusicPlayerDriver />
        <Container>
          <Route exact path='/' component={MusicPlayer} />
          <Route path='music/albums' component={MusicPlayer} />
          <Route path='music/artists' component={Home} />
        </Container>
        <MusicTracks />
      </React.Fragment>
    );
  }

}

export default connect(
  (state: ApplicationState) => state.musicPlayer, // Selects which state properties are merged into the component's props
  MusicPlayerStore.actionCreators // Selects which action creators are merged into the component's props
)(MusicPlayer as any);
