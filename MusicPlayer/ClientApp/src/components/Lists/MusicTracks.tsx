import * as React from 'react';
import { ImClock } from 'react-icons/im';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../store';
import * as MusicTracksStore from '../../store/MusicTracks';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@material-ui/core/';
import { Skeleton } from '@material-ui/lab';
import { Pagination } from 'reactstrap';

type MusicTracksProps =
  MusicTracksStore.MusicTracksState // ... state we've requested from the Redux store
  & typeof MusicTracksStore.actionCreators // ... plus action creators we've requested
  & RouteComponentProps<{ searchQuery: string }>; // ... plus incoming routing parameters

class MusicTracks extends React.PureComponent<MusicTracksProps> {

  previousSearchQuery: string | undefined;
  // This method is called when the component is first added to the document
  public componentDidMount() {
    this.ensureDataFetched();
  }

  // This method is called when the route parameters change
  public componentDidUpdate() {
    if (this.props.searchQuery !== this.previousSearchQuery) {
      this.ensureDataFetched();
      this.previousSearchQuery = this.props.searchQuery;
    }
  }

  private ensureDataFetched() {
    console.log("Request music tracks. Search query : '" + this.props.searchQuery + "'");
    this.props.requestMusicTracks(this.props.searchQuery);
  }

  private renderTracks() {
    return this.props.tracks.map((track) => (
      <TableRow key={track.name}>
        <TableCell></TableCell>
        <TableCell>
          <div className="row">
            <div className="col-md-2">
              <img src="https://via.placeholder.com/48" />
            </div>
            <div className="col-md-4 musicNameLabel">
              {track.name}<br />
              {track.artist}
            </div>
          </div>
        </TableCell>
        <TableCell>Album</TableCell>
        <TableCell>{track.artist}</TableCell>
        <TableCell>{track.notation}</TableCell>
        <TableCell></TableCell>
      </TableRow>));
  }
  private renderSkeletonTable() {
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

  render() {
    if (!this.props.isLoading && this.props.tracks && this.props.tracks.length < 0) {
      return (
        <div>
          <Typography variant="h6" gutterBottom>
            Nothing to listen here :'(
          </Typography>
          <Typography variant="body1" gutterBottom>
            body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
            unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
            dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
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
                  <TableCell><ImClock size={16} /></TableCell>
                  <TableCell>Notation</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.isLoading || this.props.tracks === undefined ? this.renderSkeletonTable() : this.renderTracks()}
              </TableBody>
            </Table>
          </TableContainer>
          {this.props.isLoading ? "Loading..." : this.renderPagination()}
        </div>);
    }
  }

  private renderPagination() {
    return (
      <Pagination count={10} variant="outlined" color="primary" />
    );
  }
}

export default connect(
  (state: ApplicationState) => state.musicTracks, // Selects which state properties are merged into the component's props
  MusicTracksStore.actionCreators // Selects which action creators are merged into the component's props
)(MusicTracks as any);
