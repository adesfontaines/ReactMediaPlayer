import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MusicAlbumStore from '../../store/MusicAlbums';
import { Grid, Card, Typography, CardMedia, CardContent, CardActionArea, Link } from '@material-ui/core/';
import { Skeleton } from '@material-ui/lab';

type MusicAlbumProps =
  MusicAlbumStore.MusicAlbumsState // ... state we've requested from the Redux store
  & typeof MusicAlbumStore.actionCreators // ... plus action creators we've requested

var previousSearchQuery: string | undefined;
var firstSearch: boolean = true;
function MusicAlbums(props: MusicAlbumProps) {

  // This method is called when the component is first added to the document
  React.useEffect(() => {
    if (!props.isLoadingList && (firstSearch || props.searchQuery !== previousSearchQuery)) {
      firstSearch = false;
      previousSearchQuery = props.searchQuery;
      console.log("Request music albums. Search query : '" + props.searchQuery + "'");
      props.requestMusicAlbums(props.searchQuery);
    }
  });

  const renderSkeletons = () => {
    return [...Array(30).keys()].map((value) => (
      <Grid item key={value}>
        <Skeleton variant="rect" className="media-cover" width={180} height={180} />
        <Skeleton />
        <Skeleton width="50%" />
      </Grid>
    ));
  }
  const renderAlbums = () => {
    return props.albums.map((album, index) => (
      <Grid item key={index}>
        <Link href={`./album/${index}`} color="textSecondary">
          <img
            className="media-cover"
            src="https://via.placeholder.com/180"
          />
        </Link>
        <br />
        <Link href={`./album/${album.artists}/${album.title}`}>{album.title}</Link>
        <br />
        <Link href={`./artist/${album.artists}`} color="textSecondary">{album.artists}</Link>

      </Grid>
    ));
  }

  if ((!props.isLoadingList && !firstSearch && props.albums && props.albums.length == 0)) {
    return (
      <div>
        <Typography variant="h6" gutterBottom>
          Nothing to listen here :'(
                </Typography>
        <Typography variant="body1" gutterBottom>
          Try to add some music to begin !
        </Typography>
      </div>);
  }
  else {
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Grid container
              justify="flex-start"
              alignItems="flex-start" spacing={3}>
              {props.isLoadingList ? renderSkeletons() : renderAlbums()}
            </Grid>
          </Grid>
        </Grid>
      </div>);
  }
}

export default connect(
  (state: ApplicationState) => state.musicAlbums,
  MusicAlbumStore.actionCreators
)(MusicAlbums as any);