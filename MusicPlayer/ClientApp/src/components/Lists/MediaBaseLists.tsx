import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MusicPlayerStore from '../../store/MusicPlayer';
import Artists from './ArtistsList';
import MusicTracks from './TracksList';
import MusicAlbums from './AlbumsList';
import MusicPlayerTabs from './MusicPlayerTabs';
import { Container } from 'reactstrap';
import { Route } from 'react-router';
import MuiStyles from '../../MuiStyles';

type MusicPlayerProps =
  MusicPlayerStore.MusicPlayerState // ... state we've requested from the Redux store
  & typeof MusicPlayerStore.actionCreators // ... plus action creators we've requested

function MediaBaseLists(props: MusicPlayerProps) {

    return (
      <React.Fragment>
        <MusicPlayerTabs />
        <Container className={MuiStyles().subContainer}>
          <Route path='/music' component={MusicTracks} />
          <Route path='/tracks' component={MusicTracks} />
          <Route path='/albums' component={MusicAlbums} />
          <Route path='/artists' component={Artists} />
          <Route path='/playlists' component={MusicAlbums} />
        </Container>
      </React.Fragment>
    );
}

export default connect(
  (state: ApplicationState) => state.musicPlayer, // Selects which state properties are merged into the component's props
  MusicPlayerStore.actionCreators // Selects which action creators are merged into the component's props
)(MediaBaseLists as any);
