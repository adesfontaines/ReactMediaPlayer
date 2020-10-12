import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MusicAlbumStore from '../../store/MusicAlbums';
import { Grid, Card, Typography, CardMedia, CardContent, CardActionArea, Link } from '@material-ui/core/';

type MusicAlbumProps =
  MusicAlbumStore.MusicAlbumsState // ... state we've requested from the Redux store
  & typeof MusicAlbumStore.actionCreators // ... plus action creators we've requested

var firstSearch: boolean;
var previousSearchQuery: string | undefined;
function MusicAlbums(props: MusicAlbumProps) {

  // This method is called when the component is first added to the document
  React.useEffect(() => {
    if (!props.isLoading && (firstSearch || props.searchQuery !== previousSearchQuery)) {
      firstSearch = false;
      previousSearchQuery = props.searchQuery;
      console.log("Request music albums. Search query : '" + props.searchQuery + "'");
      props.requestMusicAlbums(props.searchQuery);
    }

    props.requestMusicAlbums(""); // No filter for fist call
  });

  const renderPagination = () => {
    return (
      <div className="d-flex justify-content-between">
        {props.isLoading && <span>Loading...</span>}
      </div>
    );
  }
  const renderSkeletons = () => {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
      <Grid item>
        <Card>
          <CardActionArea>
            <CardMedia
              className="albumCardMedia"
              image="https://via.placeholder.com/256"
            />
            <CardContent>
              <Typography gutterBottom variant="h5">
                Name
                                            </Typography>
              <Link href="google.com" color="textSecondary">
                Artist
                                            </Link>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    ));
  }
  const renderAlbums = () => {
    return props.albums.map((album, index) => (
      <Grid item key={index}>
        <Card>
          <CardActionArea>
            <CardMedia
              className="albumCardMedia"
              image="https://via.placeholder.com/256"
            />
            <CardContent>
              <Typography gutterBottom variant="h5">album.Title</Typography>
              <Link href="google.com" color="textSecondary">album.Artist</Link>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    ));
  }

  if ((!props.isLoading || !props.albums || (props.albums && props.albums.length == 0))) {
    return (<div>Nothing to see here</div>)
  }
  else {
    return (
      <div>
        <h2>Albums</h2>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {props.isLoading ? renderSkeletons() : renderAlbums()}
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