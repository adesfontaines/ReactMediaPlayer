import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MusicAlbumStore from '../../store/MusicAlbums';
import { RouteComponentProps } from 'react-router';
import MediaUtils from '../../MediaUtils';

type MusicAlbumProps =
  MusicAlbumStore.MusicAlbumsState // ... state we've requested from the Redux store
  & typeof MusicAlbumStore.actionCreators // ... plus action creators we've requested
  & RouteComponentProps<{ albumId: string }>; // ... plus incoming routing parameters
//https://i.scdn.co/image/ab67616d00001e02d69fbc0ece0e5d9ddd2f1103
function AlbumDetails(props: MusicAlbumProps) {
  if (props.match.params.albumId != undefined) {
    props.getAlbumById(props.match.params.albumId);
    console.log("Album récupéré" + props.selectedAlbum);
  }
  console.log("albumId is " + props.match.params.albumId);
  if (props.selectedAlbum) {
    return (
      <div>
        <section>
          <img aria-hidden="false" draggable={false} src={MediaUtils.getAlbumCoverURL(props.selectedAlbum.id)} alt={props.selectedAlbum.title} style={{ width: "232px", height: "232px" }} />
          <div>
            <h2>Album</h2>
            <h1>{props.selectedAlbum.title}</h1>
            <span>{props.selectedAlbum.year}</span>
          </div>
        </section>
      </div>
    );
  }
  else if (props.isLoadingDetails) {
    return (<div>Loading</div>);
  }
  else {
    return (<div>Album not found :'(</div>);
  }
};

export default connect(
  (state: ApplicationState) => state.musicAlbums,
  MusicAlbumStore.actionCreators
)(AlbumDetails as any);