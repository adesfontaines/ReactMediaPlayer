import React from 'react'
import { DropzoneDialog, DropzoneArea } from 'material-ui-dropzone'
import { ApplicationState } from '../store';
import * as MusicTracksStore from '../store/MusicTracks';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
type MusicTracksProps =
  MusicTracksStore.MusicTracksState // ... state we've requested from the Redux store
  & typeof MusicTracksStore.actionCreators // ... plus action creators we've requested

function UploadMediaDialog(props: MusicTracksProps) {

  var internalState = {
    open: false,
    files: []
  };

  return (
    <div>
      <DropzoneArea
        onChange={(files) => props.importTracksFiles([""])}
        filesLimit={300}
        showFileNames={true}
        acceptedFiles={['audio/aac', 'audio/mpeg', 'audio/x-wav', 'audio/flac', 'audio/ogg']}
        maxFileSize={50000000}
        showPreviews={false}
        showFileNamesInPreview={true}
      />
    </div>
  );
}
export default connect(
  (state: ApplicationState) => state.musicPlayer,
  MusicTracksStore.actionCreators)(UploadMediaDialog as any);