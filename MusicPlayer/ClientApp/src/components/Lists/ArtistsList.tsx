import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MusicArtistStore from '../../store/MusicArtists';
import { Grid, Typography, Avatar } from '@material-ui/core/';
import { Skeleton } from '@material-ui/lab';

type MusicArtistProps =
  MusicArtistStore.MusicArtistsState // ... state we've requested from the Redux store
  & typeof MusicArtistStore.actionCreators // ... plus action creators we've requested

var previousSearchQuery: string | undefined;
var firstSearch: boolean = true;
const authorPicSize = 148;
function ArtistsList(props: MusicArtistProps) {

  // This method is called when the component is first added to the document
  React.useEffect(() => {
    if (!props.isLoadingList && (firstSearch || props.searchQuery !== previousSearchQuery)) {
      firstSearch = false;
      previousSearchQuery = props.searchQuery;
      console.log("Request music artists. Search query : '" + props.searchQuery + "'");
      props.requestMusicArtists(props.searchQuery);
    }
  });

  const renderSkeletons = () => {
    return [...Array(30).keys()].map((value) => (
      <Grid item key={value}>
        <Skeleton variant="circle" width={authorPicSize} height={authorPicSize} />
        <Skeleton width="80%" />
      </Grid>
    ));
  }
  const renderArtists = () => {
    return props.artists.map((artist, index) => (
      <Grid item key={index} style={{ padding: "10px" }}>
        <Avatar style={{ width:authorPicSize, height:authorPicSize }}>{artist.name[0]}</Avatar>
        {artist.name}
      </Grid>
    ));
  }

  if ((!props.isLoadingList && !firstSearch && props.artists && props.artists.length == 0)) {
    return (
      <div>
        <Typography variant="h6" gutterBottom>
          Nothing to see here :'(
                </Typography>
        <Typography variant="body1" gutterBottom>
          Try to add some music to begin !
        </Typography>
      </div>);
  }
  else {
    return (
      <div>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Grid container
              justify="flex-start"
              alignItems="flex-start" spacing={3}>
              {props.isLoadingList ? renderSkeletons() : renderArtists()}
            </Grid>
          </Grid>
        </Grid>
      </div>);
  }
}

export default connect(
  (state: ApplicationState) => state.musicArtists,
  MusicArtistStore.actionCreators
)(ArtistsList as any);