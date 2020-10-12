import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as MusicPlayerStore from '../store/MusicPlayer';
import MusicTracks from './Lists/MusicTracks';
import MusicAlbums from './Lists/MusicAlbums';
import MusicPlayerTabs from './MusicPlayerTabs';
import { Container } from 'reactstrap';
import { Route } from 'react-router';

type MusicPlayerProps =
  MusicPlayerStore.MusicPlayerState // ... state we've requested from the Redux store
  & typeof MusicPlayerStore.actionCreators // ... plus action creators we've requested

function MediaPlayerApplication(props: MusicPlayerProps) {

    return (
      <React.Fragment>
        <MusicPlayerTabs />
        <Container>
          <Route path='/music' component={MusicTracks} />
          <Route path='/tracks' component={MusicTracks} />
          <Route path='/albums' component={MusicAlbums} />
        </Container>
      </React.Fragment>
    );
}

export default connect(
  (state: ApplicationState) => state.musicPlayer, // Selects which state properties are merged into the component's props
  MusicPlayerStore.actionCreators // Selects which action creators are merged into the component's props
)(MediaPlayerApplication as any);
