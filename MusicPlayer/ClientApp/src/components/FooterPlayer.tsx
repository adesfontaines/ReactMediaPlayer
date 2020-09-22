import * as React from 'react';
import { ImPrevious2, ImNext2, ImPlay3, ImPause2, ImList, ImVolumeLow, ImVolumeMedium, ImVolumeHigh, ImVolumeMute } from 'react-icons/im';
import { ImShuffle, ImLoop } from 'react-icons/im';
import { RouteComponentProps } from 'react-router';
import { LinearProgress, Slider } from '@material-ui/core';
import * as MusicPlayerStore from '../store/MusicPlayer';
import './FooterPlayer.css';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';

type MusicPlayerProps =
  MusicPlayerStore.MusicPlayerState // ... state we've requested from the Redux store
  & typeof MusicPlayerStore.actionCreators // ... plus action creators we've requested
  & RouteComponentProps<{ folderPath: string }>; // ... plus incoming routing parameters

const buttonSize = 26;

class FooterPlayer extends React.PureComponent<MusicPlayerProps>
{
  handleVolumeChange = (event: any, newValue: number | number[]) => {
    this.props.volumeChanged(Number(newValue))
  };

  handleRequestTimeUpdateChange = (event: any, newValue: number | number[]) => {
    this.props.requestUpdateTime(newValue);
  };
  handleUpdateTimeProgression = (event: any, newValue: number | number[]) => {
    this.props.updateTimeProgression(newValue);
  };
  volumeIcon() {
    let volumeIcon = <ImVolumeMute className="media-btn" size={buttonSize} />;

    if (this.props.volume > 0 && this.props.volume < 0.33)
      volumeIcon = <ImVolumeLow className="media-btn" size={buttonSize} />;
    else if (this.props.volume >= 0.33 && this.props.volume < 0.66)
      volumeIcon = <ImVolumeMedium className="media-btn" size={buttonSize} />;
    else if (this.props.volume >= 0.66)
      volumeIcon = <ImVolumeHigh className="media-btn" size={buttonSize} />;

    return volumeIcon;
  } 

  public render() {
    return (
      <div className="page-footer fixed-bottom">
        <Slider aria-labelledby="timeline-slider" track={false} valueLabelDisplay="off" style={{ padding: "0px", width: "100%", position: "absolute", zIndex: 3 }}
          max={this.props.trackDuration} value={this.props.timePosition} step={0.1}
          onChange={this.handleUpdateTimeProgression}
          onChangeCommitted={this.handleRequestTimeUpdateChange}
        />
        <LinearProgress style={{ background: "#858585" }} variant="determinate" value={(this.props.timePosition / this.props.trackDuration) * 100} />

        <footer className="bg-dark footer-player">
          <div className="col left-media-buttons disabled">
            <button className="btn media-btn"><ImList size={buttonSize} /></button>
          </div>

          <div className="col main-media-buttons">
            <button className="btn media-btn"><ImShuffle size={buttonSize} /></button>
            <button className="btn media-btn" onClick={this.props.back}><ImPrevious2 size={buttonSize} /></button>
            <button className="btn media-btn" onClick={this.props.isPlaying ? this.props.pause : this.props.play}> {this.props.isPlaying ? <ImPause2 size={buttonSize * 1.5} /> : <ImPlay3 size={buttonSize * 1.5} />}</button>
            <button className="btn media-btn" onClick={this.props.next} ><ImNext2 size={buttonSize} /></button>
            <button className="btn media-btn"><ImLoop onClick={this.props.togglerepeat} color={this.props.isRepeat ? "#3D5AFE" : ""} size={buttonSize} /></button>
          </div>

          <div className="col right-media-buttons disabled d-flex align-items-stretch">
            <Slider aria-labelledby="volume-slider" className="volumeSlider" valueLabelDisplay="auto"
              valueLabelFormat={(x) => Math.trunc(x * 100)} max={1} min={0} step={0.01} value={this.props.volume}
              onChange={this.handleVolumeChange}
              style={{ width: "140px", lineHeight: "3rem" }} />

            {this.volumeIcon()}

            <button className="btn media-btn disabled"><ImList size={buttonSize} /></button>

            <span className="text-muted">
              {(this.props.trackDuration !== undefined)
                ? this.formatTimeLabel(this.props.timePosition) + " / " + this.formatTimeLabel(this.props.trackDuration)
                : "--/--"}
            </span>
          </div>
        </footer>
      </div>
    );
  }
  formatTimeLabel(given_seconds: number): string {

    given_seconds = Math.trunc(given_seconds);
    const hours = Math.floor(given_seconds / 3600);
    const minutes = Math.floor((given_seconds - (hours * 3600)) / 60);
    const seconds = given_seconds - (hours * 3600) - (minutes * 60);

    return minutes.toString().padStart(1, '0') + ':' +
      seconds.toString().padStart(2, '0');

  }
};

export default connect(
  (state: ApplicationState) => state.musicPlayer,
  MusicPlayerStore.actionCreators
)(FooterPlayer as any);
