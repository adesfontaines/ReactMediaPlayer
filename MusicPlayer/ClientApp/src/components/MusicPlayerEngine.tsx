import * as React from 'react';
import ReactHowler from 'react-howler';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as MusicPlayerStore from '../store/MusicPlayer';

type MusicPlayerProps =
  MusicPlayerStore.MusicPlayerState // ... state we've requested from the Redux store
  & typeof MusicPlayerStore.actionCreators // ... plus action creators we've requested
  & RouteComponentProps<{ folderPath: string }>; // ... plus incoming routing parameters

class MusicPlayerEngine extends React.PureComponent<MusicPlayerProps> {
  public player: ReactHowler | undefined;
  constructor(props: any) {
    super(props);

    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.handleOnEnd = this.handleOnEnd.bind(this);
    this.handleOnPlay = this.handleOnPlay.bind(this);
    this.step = this.step.bind(this);
  } 

  render() {
    return (
      <ReactHowler
        ref={(player: any) => {
            this.player = player
        }}
        src={this.props.tracksQueue.length > 0 ? this.props.tracksQueue[this.props.tracksQueuePosition] : ""}
        playing={this.props.isPlaying}
        loop={this.props.isRepeat}
        volume={this.props.volume}
        html5={false}
        onLoad={this.handleOnLoad}
        onEnd={this.handleOnEnd}
        onPlay={this.handleOnPlay}
    />);
  }
  step() {
    // If the sound is still playing, continue stepping.
    if (this.player !== undefined && this.props.isPlaying) {
      this.props.updateTimeProgression(this.player.seek());
      requestAnimationFrame(this.step);
    }
  }

  componentDidUpdate(prevProps: MusicPlayerProps) {
    if (this.player !== undefined && prevProps.requestTime !== this.props.requestTime) {
      this.player.seek(this.props.requestTime);
    }
  }

  public handleOnPlay() {
    this.step();
  }

  public handleOnLoad() {
    if (this.player !== undefined) {
      console.log(this.player);
      console.log("Loaded: track duration : ", this.player.duration());
      this.props.afterload(this.player.duration());
    }
  }
  public handleOnEnd() {
    console.log("finished track, position: ", this.props.tracksQueuePosition, " tracks length: ", this.props.tracksQueue.length);
    if (this.props.tracksQueuePosition < this.props.tracksQueue.length - 1) {
      this.props.next();
    }
    else
      this.props.pause();
  }
}
export default connect(
  (state: ApplicationState) => state.musicPlayer,
  MusicPlayerStore.actionCreators)(MusicPlayerEngine as any);
