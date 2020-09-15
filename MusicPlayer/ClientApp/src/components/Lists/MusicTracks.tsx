import * as React from 'react';
import { ImClock } from 'react-icons/im';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../store';
import * as MusicTracksStore from '../../store/MusicTracks';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core/';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles
} from "@material-ui/core/styles";

type MusicTracksProps =
  MusicTracksStore.MusicTracksState // ... state we've requested from the Redux store
  & typeof MusicTracksStore.actionCreators // ... plus action creators we've requested
  & RouteComponentProps<{ folderPath: string }>; // ... plus incoming routing parameters

class MusicTracks extends React.PureComponent<MusicTracksProps> {


  // This method is called when the component is first added to the document
  public componentDidMount() {
    this.ensureDataFetched();
  }

  // This method is called when the route parameters change
  public componentDidUpdate() {
    this.ensureDataFetched();
  }

  private ensureDataFetched() {
    this.props.requestMusicTracks("C:\\Users\\ADE\\Music");
  }
  render() {
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
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <div className="row">
                  <div className="col-md-2">
                    <img src="https://material-ui.com/static/images/cards/live-from-space.jpg" width="48px" height="48px" />
                  </div>
                  <div className="col-md-4 musicNameLabel">Musique<br />Artiste
                  </div>
                </div>
              </TableCell>
              <TableCell>Album</TableCell>
              <TableCell>3:30</TableCell>
              <TableCell>2.5/5</TableCell>
              <TableCell>...</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <div className="row">
                  <div className="col-md-2">
                    <img src="https://via.placeholder.com/48" />
                  </div>
                  <div className="col-md-4 musicNameLabel">Musique<br />Artiste
                  </div>
                </div>
              </TableCell>
              <TableCell>Album</TableCell>
              <TableCell>3:30</TableCell>
              <TableCell>2.5/5</TableCell>
              <TableCell>...</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <div className="row">
                  <div className="col-md-2">
                    <img src="https://via.placeholder.com/48" />
                  </div>
                  <div className="col-md-4 musicNameLabel">Musique<br />Artiste
                  </div>
                </div>
              </TableCell>
              <TableCell>Album</TableCell>
              <TableCell>3:30</TableCell>
              <TableCell>2.5/5</TableCell>
              <TableCell>...</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <div className="row">
                  <div className="col-md-2">
                    <img src="https://via.placeholder.com/48" />
                  </div>
                  <div className="col-md-4 musicNameLabel">Musique<br />Artiste
                  </div>
                </div>
              </TableCell>
              <TableCell>Album</TableCell>
              <TableCell>3:30</TableCell>
              <TableCell>2.5/5</TableCell>
              <TableCell>...</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <div className="row">
                  <div className="col-md-2">
                    <img src="https://via.placeholder.com/48" />
                  </div>
                  <div className="col-md-4 musicNameLabel">Musique<br />Artiste
                  </div>
                </div>
              </TableCell>
              <TableCell>Album</TableCell>
              <TableCell>3:30</TableCell>
              <TableCell>2.5/5</TableCell>
              <TableCell>...</TableCell>
            </TableRow>
          </TableBody>
          </Table>
        </TableContainer>
      </div>);
  }

  private renderPagination() {
    return (
        <div className="d-flex justify-content-between">
          {this.props.isLoading && <span>Loading...</span>}
        </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.musicTracks, // Selects which state properties are merged into the component's props
  MusicTracksStore.actionCreators // Selects which action creators are merged into the component's props
)(MusicTracks as any);

//{/ / this.props.tracks.map((track: MusicTracksStore.MusicTrack) =>
//  <tr key={track.name}>
//    <td><img src="https://via.placeholder.com/32" /> {track.name}</td>
//    <td>{track.album}</td>
//    <td>{track.artist}</td>
//    <td>{track.duration}</td>
//    <td>{track.notation}</td>
//  </tr>
//)}