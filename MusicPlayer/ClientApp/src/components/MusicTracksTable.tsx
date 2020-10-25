//import React from 'react';
//import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Link } from '@material-ui/core/';
//import { Skeleton } from '@material-ui/lab';
//import MediaUtils from '../../MediaUtils';
//import MusicTrack from '../../store/Entities/MusicTrack';

//const checkboxes = [1, 2, 3];
//class KFJELJFLAF extends React.Component {
//  render() {
//    return (
//      <div>
//        <TrucMachin checkboxes={checkboxes} />
//      </div>
//    );
//  }
//}


//export default const TrucMachin = props => {
//  const handleClick = id => console.log("id is", id);
//  return (
//    <div>
//      {props.checkboxes.map(id => (
//        <Checkbox id={id} key={id} handleClick={handleClick} />
//      ))}
//    </div>
//  );
//};
//const MusicTracksTable(tracks: MusicTrack[], isLoading = true, showTrackNumber = false) =>
//{
//  // Render
//  if (!isLoading && tracks && tracks.length == 0) {
//    return (
//      <div>
//        <Typography variant="h6" gutterBottom>
//          Nothing to listen here :'(
//                </Typography>
//        <Typography variant="body1" gutterBottom>
//          Try to add some music to begin !
//        </Typography>
//      </div>);
//  }
//  else {
//    return (
//      <div>
//        <TableContainer className={'table tracks-list table-hover'} aria-labelledby="tabelLabel">
//          <Table aria-label="tracks list">
//            <TableHead>
//              <TableRow>
//                {showTrackNumber ? "<TableCell padding='checkbox'>#</TableCell>" : ""}
//                <TableCell>TITLE</TableCell>
//                <TableCell>ALBUM</TableCell>
//                <TableCell align="right"><ImClock size={14} /></TableCell>
//                <TableCell></TableCell>
//              </TableRow>
//            </TableHead>
//            <TableBody>
//              {isLoading || !tracks ? renderSkeletonTable() : renderTracks()}
//            </TableBody>
//          </Table>
//        </TableContainer>
//      </div>);
//  }
//}

//const renderTracks = (tracks: MusicTrack[], showTrackNumber = false) => {
//  return tracks.map((track, index) => (
//    <TableRow hover key={index} onDoubleClick={() => handlePlayerTrack(track)}>
//      {showTrackNumber ? "<TableCell>" + index + 1 + "</TableCell>" : ""}
//      <TableCell>
//        <div className="row" style={{ display: "inline-flex" }}>
//          <div className="col-md-1">
//            <button className="coverPlayButton" onClick={() => handlePlayerTrack(track)} style={{ height: albumCoverSize, width: albumCoverSize }}> Play</button>
//            <img className="media-cover" src="https://f4.bcbits.com/img/a0460013667_10.jpg" height={albumCoverSize} width={albumCoverSize} />
//          </div>
//          <div className="col-md-11 musicNameLabel">
//            {track.title}
//            <br />
//            <Link href={`./artist/${track.artist}`} color="textSecondary">{track.artist}</Link>
//          </div>
//        </div>
//      </TableCell>
//      <TableCell><Link href={`./album/${track.artist}/${track.album}`} color="textSecondary">{track.album}</Link></TableCell>
//      <TableCell align="right">{MediaUtils.formatTimeLabel(track.duration)}</TableCell>
//      <TableCell></TableCell>
//    </TableRow>
//  ));
//}
//const renderSkeletonTable = (showTrackNumber: boolean) => {
//  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((value) => (
//    <TableRow key={value}>
//      {showTrackNumber ? "<TableCell></TableCell>" : ""}
//      <TableCell>
//        <div className="row" style={{ display: "inline-flex", width: "240px" }}>
//          <div className="col-md-1">
//            <Skeleton variant="rect" className="media-cover"/>
//          </div>
//          <div className="col-md-11 musicNameLabel" style={{ width: "240px" }}>
//            <Skeleton />
//            <Skeleton width="50%" />
//          </div>
//        </div>
//      </TableCell>
//      <TableCell><Skeleton animation="wave" width="40%" /></TableCell>
//      <TableCell></TableCell>
//      <TableCell></TableCell>
//    </TableRow>));
//}
