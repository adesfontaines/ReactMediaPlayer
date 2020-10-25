import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as MusicPlayerStore from '../store/MusicPlayer';
import ReactPlayer from 'react-player/lazy'

type MusicPlayerProps =
  MusicPlayerStore.MusicPlayerState // ... state we've requested from the Redux store
  & typeof MusicPlayerStore.actionCreators // ... plus action creators we've requested

function MusicPlayerEngine(props: MusicPlayerProps) {

  const handleOnProgress = (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number; }) => {
    if (!props.isSeeking && props.isPlaying) {
      props.updateTimeProgress(state.played, state.playedSeconds);
    }
  }

  const handleDuration = (duration: number) => {
    props.setDuration(duration);
  }
  const handleOnReady = (player: ReactPlayer) => {
  }
  const handleOnStart = () => {
    var currentMedia = props.tracksQueue[props.tracksQueuePosition];
  }

  const handleOnEnded = () => {
    if (props.tracksQueuePosition < props.tracksQueue.length - 1) {
      props.next();
    }
    else
      props.pause();
  }
  if (props.tracksQueue.length > 0) {
    return (
      <ReactPlayer
        url={props.tracksQueueURL}
        ref={r => props.setPlayer(r)}
        playing={props.isPlaying && props.tracksQueue.length > 0}
        loop={props.isRepeat}
        volume={props.volume}
        onDuration={handleDuration}
        onProgress={handleOnProgress}
        onReady={handleOnReady}
        onStart={handleOnStart}
        onEnded={handleOnEnded}
        width={80}
        progressInterval={250}
        height={80}
        config={{
          youtube: {
            playerVars: { showinfo: 0, disablekb: 1, modestbranding: 1, controls: 0 }
          }
        }}
      />);
  }
  return "";

}
export default connect(
  (state: ApplicationState) => state.musicPlayer,
  MusicPlayerStore.actionCreators)(MusicPlayerEngine as any);
