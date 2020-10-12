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
    console.log("Loaded: track duration : ", player.getDuration());
  }

  const handleOnEnded = () => {
    console.log("finished track, position: ", props.tracksQueuePosition, " tracks length: ", props.tracksQueue.length);
    if (props.tracksQueuePosition < props.tracksQueue.length - 1) {
      props.next();
    }
    else
      props.pause();
  }

  return (
    <ReactPlayer
      // url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
      url='https://localhost:5001/api/musictracks/Stream/1'
      //url={props.tracksQueue.length > 0 ? props.tracksQueue[props.tracksQueuePosition] : ""}
      ref={r => props.setPlayer(r)}
      playing={props.isPlaying && props.tracksQueue.length > 0}
      loop={props.isRepeat}
      volume={props.volume}
      onDuration={handleDuration}
      onProgress={handleOnProgress}
      onReady={handleOnReady}
      onEnded={handleOnEnded}
      width={80}
      height={80}
      config={{
        youtube: {
          playerVars: { showinfo: 0, disablekb: 1, modestbranding: 1, controls: 0 }
        }
      }}
    />);
}
export default connect(
  (state: ApplicationState) => state.musicPlayer,
  MusicPlayerStore.actionCreators)(MusicPlayerEngine as any);
