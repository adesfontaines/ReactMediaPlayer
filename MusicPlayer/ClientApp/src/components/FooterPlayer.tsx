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
import MediaUtils from '../MediaUtils';
import MuiStyles from '../MuiStyles';

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

function FooterPlayer(props: MusicPlayerProps) {

  const classes = MuiStyles();
  const handleRequestSeekChange = (event: any, newValue: number | number[]) => {
    if (props.playerInstance) {
      props.toggleSeek(false);
      props.requestUpdateTime(Number(newValue));
      props.playerInstance.seekTo(Number(newValue))
    }
  };
  const handleSliderChange = (event: any, newValue: number | number[]) => {
    if (!props.isSeeking) {
      props.toggleSeek(true);
    }
    props.setProgressBarTime(Number(newValue));
  };

  const handleVolumeChange = (event: any, newValue: number | number[]) => {
    props.volumeChanged(Number(newValue))
  };
  const volumeIcon = () => {
    let volumeIcon = <ImVolumeMute className={classes.mediaButton} size={buttonSize} />;

    if (props.volume > 0 && props.volume < 0.33)
      volumeIcon = <ImVolumeLow className={classes.mediaButton} size={buttonSize} />;
    else if (props.volume >= 0.33 && props.volume < 0.66)
      volumeIcon = <ImVolumeMedium className={classes.mediaButton} size={buttonSize} />;
    else if (props.volume >= 0.66)
      volumeIcon = <ImVolumeHigh className={classes.mediaButton} size={buttonSize} />;

    return volumeIcon;
  }

  const timeLabel = () => {
    if (props.trackDuration !== undefined && props.timePositionSeconds !== undefined) {
      switch (props.timeLabelMode) {
        case MusicPlayerStore.TimeLabelMode.TIME_PROGRESSION:
          return  MediaUtils.formatTimeLabel(props.timePositionSeconds) + "/" + MediaUtils.formatTimeLabel(props.trackDuration);
        case MusicPlayerStore.TimeLabelMode.REMAINING_TIME:
          return "-" + MediaUtils.formatTimeLabel(props.trackDuration - props.timePositionSeconds) + "/" + MediaUtils.formatTimeLabel(props.trackDuration);
      }
    }
    else {
      return "--/--";
    }
  }

  const haveAnyTrack = props.tracksQueue && props.tracksQueue.length > 0;
  const currentTrack = haveAnyTrack ? props.tracksQueue && props.tracksQueue[props.tracksQueuePosition] : null;

  if (currentTrack == null)
    return "";

  document.title = currentTrack.artist + " - " + currentTrack.title;

  return (
    <div className="page-footer">
      <Slider aria-labelledby="timeline-slider"
        track={false} style={{ padding: "0px", width: "100%", position: "absolute", zIndex: 3 }}
        max={props.trackDuration}
        value={props.timeProgressBarValue}
        step={0.1}
        onChange={handleSliderChange}
        onChangeCommitted={handleRequestSeekChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(x) => MediaUtils.formatTimeLabel(Math.trunc(x))}
      />
      <LinearProgress style={{ background: "rgba(35,36,38,.8)" }} variant="determinate" value={props.timePosition} />

      <footer className={classes.footer}>
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
                <Typography className="media-title">{currentTrack.title}</Typography>
                <Typography variant="subtitle2">
                  <Link href="#" className="flat-link" underline="none">{currentTrack.album}</Link> / <Link className="flat-link" href="#" underline="none">{currentTrack.artist}</Link>
                </Typography>
                <button className="flat-button" style={{ color: "grey" }} onClick={() => props.setTimeLabelMode(props.timeLabelMode == 0 ? 1 : 0)}>
                  <Typography variant="overline">
                    {timeLabel()}
                  </Typography>
                </button>
              </div>
            </div>
          </Box>
          <Box display="flex" alignItems="center" className="no-wrap" flexGrow={1}>
            <Box>
              <button className={classes.mediaButton}><ImShuffle onClick={props.toggleShuffle} color={props.isShuffle ? "#3D5AFE" : ""} size={buttonSize} /></button>
              <button className={classes.mediaButton} onClick={props.back}><ImPrevious2 size={buttonSize} /></button>
              <button className={classes.mediaButton} onClick={props.isPlaying ? props.pause : props.play}> {props.isPlaying ? <ImPause2 size={buttonSize * 1.2} /> : <ImPlay3 size={buttonSize * 1.2} />}</button>
              <button className={classes.mediaButton} onClick={props.next} ><ImNext2 size={buttonSize} /></button>
              <button className={classes.mediaButton}><ImLoop onClick={props.toggleRepeat} color={props.isRepeat ? "#3D5AFE" : ""} size={buttonSize} /></button>
            </Box>

            <Box
              className="no-wrap" style={{ whiteSpace: "nowrap", marginLeft: "30px" }}
            >
              <button className={classes.mediaButton}>
                <MdQueueMusic size={buttonSize} />
              </button>
            </Box>

            <Box
              style={{ whiteSpace: "nowrap", marginLeft: "30px" }}
            >
              <button className={classes.mediaButton}>{volumeIcon()}</button>
              <Slider aria-labelledby="volume-slider" className="volumeSlider"
                max={1} min={0} step={0.01} value={props.volume} orientation="horizontal"
                onChange={handleVolumeChange}
                style={{ width: "80px", height: buttonSize }} />
            </Box>
          </Box>
        </Box>

      </footer>
    </div >
  );
};

export default connect(
  (state: ApplicationState) => state.musicPlayer,
  MusicPlayerStore.actionCreators
)(FooterPlayer as any);
