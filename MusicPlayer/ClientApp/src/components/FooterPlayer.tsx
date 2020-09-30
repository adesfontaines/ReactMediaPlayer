import * as React from 'react';
import { ImPrevious2, ImNext2, ImPlay3, ImPause2, ImList, ImVolumeLow, ImVolumeMedium, ImVolumeHigh, ImVolumeMute } from 'react-icons/im';
import { ImShuffle, ImLoop } from 'react-icons/im';
import MusicPlayerDriver from './MusicPlayerEngine';
import { LinearProgress, Slider, Typography, Box, Link } from '@material-ui/core';
import * as MusicPlayerStore from '../store/MusicPlayer';
import './FooterPlayer.css';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';

type MusicPlayerProps =
  MusicPlayerStore.MusicPlayerState // ... state we've requested from the Redux store
  & typeof MusicPlayerStore.actionCreators // ... plus action creators we've requested

const buttonSize = 20;

class FooterPlayer extends React.PureComponent<MusicPlayerProps>
{
  handleRequestSeekChange = (event: any, newValue: number | number[]) => {
    this.props.requestUpdateTime(Number(newValue));
    if (this.props.playerInstance) {
      this.props.playerInstance.seekTo(Number(newValue))
    }
  };
  handleSliderChange = (event: any, newValue: number | number[]) => {
    this.props.updateTimeProgression(Number(newValue));
  };

  handleVolumeChange = (event: any, newValue: number | number[]) => {
    this.props.volumeChanged(Number(newValue))
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
      <div className="page-footer">
        <Slider aria-labelledby="timeline-slider" track={false} valueLabelDisplay="off" style={{ padding: "0px", width: "100%", position: "absolute", zIndex: 3 }}
          max={this.props.trackDuration}
          value={this.props.timePosition}
          step={0.1}
          onChange={this.handleSliderChange}
          onChangeCommitted={this.handleRequestSeekChange}
        />
        <LinearProgress style={{ background: "#858585" }} variant="determinate" value={(this.props.timePosition / this.props.trackDuration) * 100} />

        <footer className="footer-player bg-dark">
          <Box
            display="flex"
            flexWrap="wrap"
            p={1}
          >
            <Box flexGrow={1}>
              <div
                className="media-infos-container"
                style={{ display: "flex", flexBasis: "100%" }}
              >
                <div style={{ minWidth: "90px", height: "90px", position: "relative" }}>
                  <img alt="album cover" src="https://via.placeholder.com/90" style={{ position: "absolute" }} />
                  <MusicPlayerDriver />
                </div>
                <div className="media-infos-content no-wrap">
                  <Typography variant="h6" className="media-title">My Title Name</Typography>
                  <Typography variant="subtitle1">
                    <Link href="#" className="flat-link" underline="none">Album Name</Link> / <Link className="flat-link" href="#" underline="none">Artist Name</Link>
                  </Typography>
                  <button className="flat-button">
                    <Typography variant="overline">
                      {(this.props.trackDuration !== undefined)
                        ? this.formatTimeLabel(this.props.timePosition) + " / " + this.formatTimeLabel(this.props.trackDuration)
                        : "--/--"}
                    </Typography>
                  </button>
                </div>
              </div>
            </Box>
            <Box display="flex" alignItems="center" className="no-wrap" flexGrow={1}>
              <Box>
                <button className="btn media-btn"><ImShuffle size={buttonSize} /></button>
                <button className="btn media-btn" onClick={this.props.back}><ImPrevious2 size={buttonSize} /></button>
                <button className="btn media-btn" onClick={this.props.isPlaying ? this.props.pause : this.props.play}> {this.props.isPlaying ? <ImPause2 size={buttonSize * 1.5} /> : <ImPlay3 size={buttonSize * 1.5} />}</button>
                <button className="btn media-btn" onClick={this.props.next} ><ImNext2 size={buttonSize} /></button>
                <button className="btn media-btn"><ImLoop onClick={this.props.togglerepeat} color={this.props.isRepeat ? "#3D5AFE" : ""} size={buttonSize} /></button>
              </Box>

              <Box
                className="no-wrap" style={{ whiteSpace: "nowrap", marginLeft: "30px" }}
              >
                <button className="btn media-btn">X</button>
                <button className="btn media-btn">Y</button>
                <button className="btn media-btn disabled">
                  <ImList size={buttonSize} /></button>
              </Box>

              <Box
                style={{ whiteSpace: "nowrap", marginLeft: "30px" }}
              >
                <button className="btn media-btn disabled">{this.volumeIcon()}</button>
                <Slider aria-labelledby="volume-slider" className="volumeSlider" valueLabelDisplay="auto"
                  valueLabelFormat={(x) => Math.trunc(x * 100)} max={1} min={0} step={0.01} value={this.props.volume} orientation="vertical"
                  onChange={this.handleVolumeChange}
                  style={{ height: "80px", lineHeight: "3rem" }} />
              </Box>
            </Box>
          </Box>

        </footer>
      </div >
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
