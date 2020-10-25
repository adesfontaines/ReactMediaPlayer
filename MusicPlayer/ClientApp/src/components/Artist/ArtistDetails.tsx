import * as React from 'react';
import { connect } from 'react-redux';
import TracksList from '../Lists/TracksList';
import { ApplicationState } from '../../store';
import * as MusicAlbumStore from '../../store/MusicAlbums';

type MusicAlbumProps =
  MusicAlbumStore.MusicAlbumsState // ... state we've requested from the Redux store
  & typeof MusicAlbumStore.actionCreators // ... plus action creators we've requested

function ArtistDetails(props: MusicAlbumProps) {
  return (
    <React.Fragment>
      <section>
        <img aria-hidden="false" draggable={false} src="https://i.scdn.co/image/ab67616d00001e02d69fbc0ece0e5d9ddd2f1103" style={{width:"232px", height:"232px"}} />
        <div>
            <h2>Artist</h2>
        </div>
      </section>
      <TracksList />
    </React.Fragment>

  );
}

export default connect(
  (state: ApplicationState) => state.musicAlbums,
  MusicAlbumStore.actionCreators
)(ArtistDetails as any);