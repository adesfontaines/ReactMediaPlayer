import { Box, LinearProgress, Link, Slider, Typography } from '@material-ui/core';
import * as React from 'react';
import { ImLoop, ImNext2, ImPause2, ImPlay3, ImPrevious2, ImShuffle, ImVolumeHigh, ImVolumeLow, ImVolumeMedium, ImVolumeMute } from 'react-icons/im';
import { MdQueueMusic } from 'react-icons/md';
import { connect } from 'react-redux';
import { Tooltip } from 'reactstrap';
import { ApplicationState } from '../store';
import * as MusicPlayerStore from '../store/MusicPlayer';
import './FooterPlayer.css';
import MusicPlayerDriver from './MusicPlayerEngine';
import formatTimeLabel from '../MediaUtils';
import MediaUtils from '../MediaUtils';
type MusicPlayerProps =
  MusicPlayerStore.MusicPlayerState // ... state we've requested from the Redux store
  & typeof MusicPlayerStore.actionCreators // ... plus action creators we've requested

const buttonSize = 20;
interface ValueLabelProps {
  children: React.ReactElement;
  open: boolean;
  value: number;
}
function ValueLabelComponent(props: ValueLabelProps) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" target="none" arrow>
      {children}
    </Tooltip>
  );
}


class FooterPlayer extends React.PureComponent<MusicPlayerProps>
{
  handleRequestSeekChange = (event: any, newValue: number | number[]) => {
    if (this.props.playerInstance) {
      this.props.toggleSeek(false);
      this.props.requestUpdateTime(Number(newValue));
      this.props.playerInstance.seekTo(Number(newValue))
    }
  };
  handleSliderChange = (event: any, newValue: number | number[]) => {
    if (!this.props.isSeeking) {
      this.props.toggleSeek(true);
    }
    this.props.setProgressBarTime(Number(newValue));
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

  timeLabel() {
    if (this.props.trackDuration !== undefined && this.props.timePositionSeconds !== undefined) {
      switch (this.props.timeLabelMode) {
        case MusicPlayerStore.TimeLabelMode.TIME_PROGRESSION:
          return MediaUtils.formatTimeLabel(this.props.timePositionSeconds) + "/" + MediaUtils.formatTimeLabel(this.props.trackDuration);
        case MusicPlayerStore.TimeLabelMode.REMAINING_TIME:
          return "-" + MediaUtils.formatTimeLabel(this.props.trackDuration - this.props.timePositionSeconds) + "/" + MediaUtils.formatTimeLabel(this.props.trackDuration);
      }
    }
    else {
      return "--/--";
    }
  }
  public render() {
    const haveAnyTrack = this.props.tracksQueue && this.props.tracksQueue.length > 0;
    const currentTrack = haveAnyTrack ? this.props.tracksQueue && this.props.tracksQueue[this.props.tracksQueuePosition] : null;
    return (
      <div className="page-footer">
        <Slider aria-labelledby="timeline-slider"
          track={false} style={{ padding: "0px", width: "100%", position: "absolute", zIndex: 3 }}
          max={this.props.trackDuration}
          value={this.props.timeProgressBarValue}
          step={0.1}
          onChange={this.handleSliderChange}
          onChangeCommitted={this.handleRequestSeekChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(x) => MediaUtils.formatTimeLabel(Math.trunc(x))}
        />
        <LinearProgress style={{ background: "#858585" }} variant="determinate" value={this.props.timePosition} />

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
                <div style={{ position: "relative" }}>
                  <img className="media-cover" alt="media cover" src="https://via.placeholder.com/80" style={{ position: "absolute" }} />
                  <MusicPlayerDriver />
                </div>
                <div className="media-infos-content no-wrap">
                  <Typography className="media-title">{currentTrack?.title}</Typography>
                  <Typography variant="subtitle2">
                    <Link href="#" className="flat-link" underline="none">{currentTrack?.album}</Link> / <Link className="flat-link" href="#" underline="none">{currentTrack?.artist}</Link>
                  </Typography>
                  <button className="flat-button" style={{ color: "grey" }} onClick={() => this.props.setTimeLabelMode(this.props.timeLabelMode == 0 ? 1 : 0)}>
                    <Typography variant="overline">
                      {this.timeLabel()}
                    </Typography>
                  </button>
                </div>
              </div>
            </Box>
            <Box display="flex" alignItems="center" className="no-wrap" flexGrow={1}>
              <Box>
                <button className="btn media-btn"><ImShuffle onClick={this.props.toggleShuffle} color={this.props.isShuffle ? "#3D5AFE" : ""} size={buttonSize} /></button>
                <button className="btn media-btn" onClick={this.props.back}><ImPrevious2 size={buttonSize} /></button>
                <button className="btn media-btn" onClick={this.props.isPlaying ? this.props.pause : this.props.play}> {this.props.isPlaying ? <ImPause2 size={buttonSize * 1.5} /> : <ImPlay3 size={buttonSize * 1.5} />}</button>
                <button className="btn media-btn" onClick={this.props.next} ><ImNext2 size={buttonSize} /></button>
                <button className="btn media-btn"><ImLoop onClick={this.props.toggleRepeat} color={this.props.isRepeat ? "#3D5AFE" : ""} size={buttonSize} /></button>
              </Box>

              <Box
                className="no-wrap" style={{ whiteSpace: "nowrap", marginLeft: "30px" }}
              >
                <button className="btn media-btn">X</button>
                <button className="btn media-btn">Y</button>
                <button className="btn media-btn disabled">
                  <MdQueueMusic size={buttonSize} /></button>
              </Box>

              <Box
                style={{ whiteSpace: "nowrap", marginLeft: "30px" }}
              >
                <button className="btn media-btn disabled">{this.volumeIcon()}</button>
                <Slider aria-labelledby="volume-slider" className="volumeSlider"
                  max={1} min={0} step={0.01} value={this.props.volume} orientation="horizontal"
                  onChange={this.handleVolumeChange}
                  style={{ width: "50px", height:buttonSize }} />
              </Box>
            </Box>
          </Box>

        </footer>
      </div >
    );
  }
};

export default connect(
  (state: ApplicationState) => state.musicPlayer,
  MusicPlayerStore.actionCreators
)(FooterPlayer as any);
