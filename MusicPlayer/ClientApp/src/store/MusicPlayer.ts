import ReactPlayer from 'react-player/lazy';
import { Action, Reducer } from 'redux';
import MediaUtils from '../MediaUtils';
import MusicTrack from './Entities/MusicTrack';

export interface MusicPlayerState {
  isPlaying: boolean;
  isRepeat: boolean;
  isShuffle: boolean;
  isSeeking: boolean;
  volume: number;
  timePosition: number;
  timePositionSeconds: number;
  timeProgressBarValue: number;
  timeLabelMode: number;
  tracksQueue: MusicTrack[];
  tracksQueueURL: string[];
  tracksQueuePosition: number;
  trackDuration: number,
  playerInstance: ReactPlayer | null,
}

export enum TimeLabelMode {
  "TIME_PROGRESSION",
  "REMAINING_TIME"
}
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
interface MusicPlayAction { type: "MEDIA_PLAY" }
interface MusicPauseAction { type: "MEDIA_PAUSE" }
interface MusicNextAction { type: "MEDIA_NEXT" }
interface MusicBackAction { type: "MEDIA_BACK" }
interface MusicToggleRepeat { type: "MEDIA_TOGGLE_REPEAT" }
interface MediaToggleShuffle { type: "MEDIA_TOGGLE_SHUFFLE" }
interface MediaToggleSeek { type: "MEDIA_TOGGLE_SEEK", seeking: boolean }
interface MusicVolumeChanged {
  type: "VOLUME_CHANGE";
  volume: number;
}

interface MediaHandleDuration { type: "MEDIA_SET_DURATION", trackDuration: number }

interface MediaSetPlayer { type: "SET_PLAYER", player: ReactPlayer | null }
interface MediaSetTimeLabelMode { type: "MEDIA_TIMELABEL_MODE", timeLabelMode: TimeLabelMode }

interface MediaAddToQueue { type: "MEDIA_PUSH_QUEUE", track: MusicTrack }
interface MediaSetQueue { type: "MEDIA_SET_QUEUE", tracks: MusicTrack[] }

interface MediaSeekChange {
  type: "MEDIA_SEEK_CHANGE";
  newTime: number;
}
interface MediaUpdateProgress {
  type: "MEDIA_UPDATE_PROGRESS";
  progressSeconds: number;
}
interface MusicTimeProgressionUpdate {
  type: "UPDATE_TIME_PROGRESSION";
  positionPercentage: number;
  positionSeconds: number;
}


// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = MusicPlayAction | MusicPauseAction | MusicBackAction | MusicNextAction | MediaAddToQueue | MediaToggleShuffle |
  MediaToggleSeek | MediaSeekChange | MusicTimeProgressionUpdate | MusicToggleRepeat | MediaHandleDuration | MusicVolumeChanged |
  MediaSetPlayer | MediaUpdateProgress | MediaAddToQueue | MediaSetTimeLabelMode | MediaSetQueue;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {

  play: () => ({ type: "MEDIA_PLAY" } as MusicPlayAction),
  pause: () => ({ type: "MEDIA_PAUSE" } as MusicPauseAction),
  back: () => ({ type: "MEDIA_BACK" } as MusicBackAction),
  next: () => ({ type: "MEDIA_NEXT" } as MusicNextAction),

  toggleRepeat: () => ({ type: "MEDIA_TOGGLE_REPEAT" } as MusicToggleRepeat),
  toggleShuffle: () => ({ type: "MEDIA_TOGGLE_SHUFFLE" } as MediaToggleShuffle),
  toggleSeek: (isSeeking: boolean) => ({ type: "MEDIA_TOGGLE_SEEK", seeking: isSeeking } as MediaToggleSeek),
  setDuration: (duration: number) => ({ type: "MEDIA_SET_DURATION", trackDuration: duration } as MediaHandleDuration),
  requestUpdateTime: (newPosition: number) => ({ type: "MEDIA_SEEK_CHANGE", newTime: newPosition } as MediaSeekChange),
  updateTimeProgress: (newPositionPercentage: number, newPositionSeconds: number) => ({ type: "UPDATE_TIME_PROGRESSION", positionPercentage: newPositionPercentage, positionSeconds: newPositionSeconds } as MusicTimeProgressionUpdate),
  setProgressBarTime: (newPosition: number) => ({ type: "MEDIA_UPDATE_PROGRESS", progressSeconds: newPosition } as MediaUpdateProgress),
  setTimeLabelMode: (mode: TimeLabelMode) => ({ type: "MEDIA_TIMELABEL_MODE", timeLabelMode: mode } as MediaSetTimeLabelMode),

  volumeChanged: (newVolume: number) => ({ type: "VOLUME_CHANGE", volume: newVolume } as MusicVolumeChanged),

  pushTrackToQueue: (track: MusicTrack) => ({ type: "MEDIA_PUSH_QUEUE", track: track } as MediaAddToQueue),
  setQueue: (tracks: MusicTrack[]) => ({ type: "MEDIA_SET_QUEUE", tracks: tracks } as MediaSetQueue),

  setPlayer: (player: ReactPlayer | null) => ({ type: "SET_PLAYER", player: player } as MediaSetPlayer)
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
const unloadedState: MusicPlayerState = {
  isPlaying: false,
  volume: 0.5,
  isRepeat: false,
  isShuffle: false,
  isSeeking: false,
  trackDuration: 0,
  tracksQueue: [],
  tracksQueueURL: [],
  tracksQueuePosition: 0,
  timePosition: 0,
  timePositionSeconds: 0,
  timeProgressBarValue: 0,
  timeLabelMode: TimeLabelMode.TIME_PROGRESSION,
  playerInstance: null,
};

export const reducer: Reducer<MusicPlayerState> = (state: MusicPlayerState | undefined, incomingAction: Action): MusicPlayerState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "SET_PLAYER":
      return { ...state, playerInstance: action.player };
    case "MEDIA_PUSH_QUEUE":
      state.tracksQueue.push(action.track); 
      state.tracksQueueURL.push(MediaUtils.getMusicStreamURL(action.track.id));
      return state;
    case "MEDIA_SET_QUEUE":
      return {
        ...state, tracksQueue: action.tracks, tracksQueueURL: action.tracks.map(x => (MediaUtils.getMusicStreamURL(x.id))),
        isPlaying: true,
        timePosition: 0,
        timePositionSeconds: 0,
        timeProgressBarValue: 0 };
    case "MEDIA_PLAY":
      return { ...state, isPlaying: true };
    case "MEDIA_PAUSE":
      return { ...state, isPlaying: false };
    case "MEDIA_BACK":
      if (state.tracksQueuePosition > 0) {
        console.log("play back track");
        return { ...state, tracksQueuePosition: state.tracksQueuePosition - 1 };
      }
      return state;
    case "MEDIA_NEXT":
      if (state.tracksQueuePosition < state.tracksQueue.length - 1) {
        console.log("play next track");
        return { ...state, tracksQueuePosition: state.tracksQueuePosition + 1 };
      }
      return state;
    case "MEDIA_TOGGLE_REPEAT":
      return { ...state, isRepeat: !state.isRepeat };
    case "MEDIA_TOGGLE_SHUFFLE":
      return { ...state, isShuffle: !state.isShuffle };
    case "UPDATE_TIME_PROGRESSION":
      return {
        ...state,
        timePosition: action.positionPercentage * 100,
        timePositionSeconds: action.positionSeconds,
        timeProgressBarValue: action.positionSeconds
      };

    case "VOLUME_CHANGE":
      return { ...state, volume: action.volume };
    case "MEDIA_SET_DURATION":
      return { ...state, trackDuration: action.trackDuration }
    case "MEDIA_TOGGLE_SEEK":
      return { ...state, isSeeking: action.seeking }
    case "MEDIA_TIMELABEL_MODE":
      return { ...state, timeLabelMode: action.timeLabelMode }
    case "MEDIA_UPDATE_PROGRESS":
      return { ...state, timeProgressBarValue: action.progressSeconds }
    default:
      return state;
  };
};
