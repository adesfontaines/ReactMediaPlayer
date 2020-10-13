import * as React from 'react';
import { ImClock } from 'react-icons/im';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MusicTracksStore from '../../store/MusicTracks';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@material-ui/core/';
import { Skeleton, Rating } from '@material-ui/lab';
import { Pagination } from 'reactstrap';
import MediaUtils from '../../MediaUtils';

type MusicTracksProps =
  MusicTracksStore.MusicTracksState // ... state we've requested from the Redux store
  & typeof MusicTracksStore.actionCreators // ... plus action creators we've requested

var previousSearchQuery: string | undefined;
var firstSearch: boolean = true;
function MusicTracks(props: MusicTracksProps) {

  React.useEffect(() => {
    if (!props.isLoading && (firstSearch || props.searchQuery !== previousSearchQuery)) {
      firstSearch = false;
      previousSearchQuery = props.searchQuery;
      console.log("Request music tracks. Search query : '" + props.searchQuery + "'");
      props.requestMusicTracks(props.searchQuery);
    }
  });


  const renderTracks = () => {
    return props.tracks.map((track, index) => (
      <TableRow key={index}>
        <TableCell></TableCell>
        <TableCell>
          <div className="row">
            <div className="col-md-2">
              <img src="https://f4.bcbits.com/img/a0460013667_10.jpg" height={48} width={48} />
            </div>
            <div className="col-md-10 musicNameLabel">
              {track.title}<br />
              {track.artist}
            </div>
          </div>
        </TableCell>
        <TableCell>{track.album}</TableCell>
        <TableCell>{MediaUtils.formatTimeLabel(track.duration)}</TableCell>
        <TableCell>
          <Rating
            name="simple-controlled"
            value={track.notation}
          />
        </TableCell>
        <TableCell></TableCell>
      </TableRow>));
  }
  const renderSkeletonTable = () => {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
      <TableRow key={value}>
        <TableCell></TableCell>
        <TableCell>
          <div className="row">
            <div className="col-md-2">
              <Skeleton variant="rect" width={48} height={48} />
            </div>
            <div className="col-md-4 musicNameLabel">
              <Skeleton />
              <Skeleton width="60%" />
            </div>
          </div>
        </TableCell>
        <TableCell><Skeleton width="70%" /></TableCell>
        <TableCell><Skeleton width="30%" /></TableCell>
        <TableCell><Skeleton width="30%" /></TableCell>
        <TableCell></TableCell>
      </TableRow>));
  }
  const renderPagination = () => {
    return (
      <Pagination count={10} variant="outlined" color="primary" />
    );
  }

  // Render
  if (!props.isLoading && !firstSearch && props.tracks && props.tracks.length == 0) {
    console.log("Nothing because IsLoading: " + props.isLoading + " TrackList: " + props.tracks);

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
        <h2>Tracks</h2>
        <TableContainer component={Paper} className='table tracks-list table-hover' aria-labelledby="tabelLabel">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Album</TableCell>
                <TableCell><ImClock size={14}/></TableCell>
                <TableCell>Notation</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.isLoading || !props.tracks ? renderSkeletonTable() : renderTracks()}
            </TableBody>
          </Table>
        </TableContainer>
        {props.isLoading ? "Loading..." : renderPagination()}
      </div>);
  }
}

export default connect(
  (state: ApplicationState) => state.musicTracks, // Selects which state properties are merged into the component's props
  MusicTracksStore.actionCreators // Selects which action creators are merged into the component's props
)(MusicTracks as any);
