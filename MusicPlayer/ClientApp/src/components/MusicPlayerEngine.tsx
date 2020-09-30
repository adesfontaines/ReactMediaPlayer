import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as MusicPlayerStore from '../store/MusicPlayer';
import ReactPlayer from 'react-player/lazy'

type MusicPlayerProps =
  MusicPlayerStore.MusicPlayerState // ... state we've requested from the Redux store
  & typeof MusicPlayerStore.actionCreators // ... plus action creators we've requested
  & RouteComponentProps<{ folderPath: string }>; // ... plus incoming routing parameters

function MusicPlayerEngine(props: MusicPlayerProps) {
  const handleOnPause = () => { props.pause(); }
  const handleOnPlay = () => { props.play(); }


  const handleOnProgress = (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number; }) => {
    if (!props.isSeeking) {
      props.updateTimeProgression(state.played);
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
      url={props.tracksQueue.length > 0 ? props.tracksQueue[props.tracksQueuePosition] : ""}
      ref={r => props.setPlayer(r)}
      playing={props.isPlaying}
      loop={props.isRepeat}
      volume={props.volume}
      onDuration={handleDuration}
      onProgress={handleOnProgress}
      onReady={handleOnReady}
      onPause={handleOnPause}
      onPlay={handleOnPlay}
      onEnded={handleOnEnded}
      width={90}
      height={90}
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
