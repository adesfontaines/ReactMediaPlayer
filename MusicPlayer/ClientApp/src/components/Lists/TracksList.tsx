import * as React from 'react';
import { ImClock } from 'react-icons/im';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MusicTracksStore from '../../store/MusicTracks';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Link } from '@material-ui/core/';
import { Skeleton } from '@material-ui/lab';
import MediaUtils from '../../MediaUtils';
import MuiStyles from '../../MuiStyles';
import { AiFillPlayCircle } from 'react-icons/ai';
import MusicTrack from '../../store/Entities/MusicTrack';

type MusicTracksProps =
  MusicTracksStore.MusicTracksState // ... state we've requested from the Redux store
  & typeof MusicTracksStore.actionCreators // ... plus action creators we've requested

var previousSearchQuery: string | undefined;
var firstSearch: boolean = true;
const albumCoverSize = 48;
const showTrackNumber = true;
function TracksList(props: MusicTracksProps){
  const classes = MuiStyles();
  React.useEffect(() => {
    if (!props.isLoading && (firstSearch || props.searchQuery !== previousSearchQuery)) {
      firstSearch = false;
      previousSearchQuery = props.searchQuery;
      console.log("Request music tracks. Search query : '" + props.searchQuery + "'");
      props.requestMusicTracks(props.searchQuery);
    }
  });
  const handlePlayerTrack = (musicTrack: MusicTrack) => {
    props.setQueue([musicTrack]);
  }

  const renderTracks = () => {
    return props.tracks.map((track, index) => (
      <TableRow hover key={index} onDoubleClick={() => handlePlayerTrack(track)}>
        {showTrackNumber ? <TableCell>{index + 1}</TableCell> : ""}
        <TableCell>
          <div className="row" style={{ display: "inline-flex" }}>
            <div className="col-md-1">
              <button className="coverPlayButton" onClick={() => handlePlayerTrack(track)} style={{ height: albumCoverSize, width: albumCoverSize }}>{track.id == props.c} <AiFillPlayCircle size={24} /></button>
              <img className="media-cover" src="https://f4.bcbits.com/img/a0460013667_10.jpg" height={albumCoverSize} width={albumCoverSize} />
            </div>
            <div className="col-md-11 musicNameLabel">
              {track.title}
              <br />
              <Link href={`./artist/${track.artist}`} color="textSecondary">{track.artist}</Link>
            </div>
          </div>
        </TableCell>
        <TableCell><Link href={`./album/${track.artist}/${track.album}`} color="textSecondary">{track.album}</Link></TableCell>
        <TableCell align="right">{MediaUtils.formatTimeLabel(track.duration)}</TableCell>
        <TableCell></TableCell>
      </TableRow>
    ));
  }

  const renderSkeletonTable = () => {
    return [...Array(30).keys()].map((value) => (
      <TableRow key={value}>
        {showTrackNumber ? <TableCell></TableCell> : ""}
        <TableCell>
          <div className="row" style={{ display: "inline-flex", width:"240px" }}>
            <div className="col-md-1">
              <Skeleton variant="rect" className="media-cover" width={albumCoverSize} height={albumCoverSize} />
            </div>
            <div className="col-md-11 musicNameLabel" style={{width:"240px"}}>
              <Skeleton />
              <Skeleton width="50%" />
            </div>
          </div>
        </TableCell>
        <TableCell><Skeleton width="120px" /></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
      </TableRow>));
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
        <TableContainer className={'table tracks-list table-hover'} aria-labelledby="tabelLabel">
          <Table aria-label="tracks list">
            <TableHead>
              <TableRow>
                {showTrackNumber ? <TableCell padding='checkbox'>#</TableCell> : ""}
                <TableCell>TITLE</TableCell>
                <TableCell>ALBUM</TableCell>
                <TableCell align="right"><ImClock size={14}/></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.isLoading || !props.tracks ? renderSkeletonTable() : renderTracks()}
            </TableBody>
          </Table>
        </TableContainer>
      </div>);
  }
}

export default connect(
  (state: ApplicationState) => state.musicTracks, // Selects which state properties are merged into the component's props
  MusicTracksStore.actionCreators // Selects which action creators are merged into the component's props
)(TracksList as any);
