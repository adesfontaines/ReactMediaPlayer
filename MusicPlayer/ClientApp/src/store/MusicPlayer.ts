import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import ReactHowler from 'react-howler';
import MusicPlayerDriver from '../components/MusicPlayerDriver';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
export interface MusicPlayerState {
  isPlaying: boolean;
  isRepeat: boolean;
  volume: number;
  timePosition: number;
  requestTime: number;
  tracksQueue: string[];
  tracksQueuePosition: number;
  trackDuration: number,
  musicFileName: string,
  player: typeof MusicPlayerDriver,
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
interface MusicSetPlayer {
  type: 'HANDLE_SET_PLAYER';
  player: typeof MusicPlayerDriver | undefined;
}

interface MusicPlayAction { type: 'REQUEST_MEDIA_PLAY' }
interface MusicPauseAction { type: 'REQUEST_MEDIA_PAUSE' }

interface MusicToggleRepeat { type: 'REQUEST_MEDIA_TOGGLE_REPEAT' }

interface MusicNextAction { type: 'REQUEST_MEDIA_NEXT' }
interface MusicBackAction { type: 'REQUEST_MEDIA_BACK' }

interface MusicVolumeChanged {
  type: 'REQUEST_VOLUME_CHANGE';
  volume: number;
}

interface MusicAddTrack { type: 'REQUEST_MEDIA_ADD_TRACK' }

interface MusicTimeChangeRequest {
  type: 'REQUEST_MEDIA_TIME_CHANGE';
  newTime: number;
}
interface MusicTimeProgressionUpdate {
  type: 'UPDATE_TIME_PROGRESSION';
  position: number;
}

interface MusicEventLoaded { type: 'HANDLE_TRACK_LOADED', trackDuration: number }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = MusicPlayAction | MusicPauseAction | MusicBackAction | MusicNextAction | MusicAddTrack |
  MusicTimeChangeRequest | MusicTimeProgressionUpdate | MusicToggleRepeat | MusicEventLoaded | MusicVolumeChanged | MusicSetPlayer;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
  setplayer: (newPlayer: typeof MusicPlayerDriver) => ({ type: 'HANDLE_SET_PLAYER', player: newPlayer } as MusicSetPlayer),
  play: () => ({ type: 'REQUEST_MEDIA_PLAY' } as MusicPlayAction),
  pause: () => ({ type: 'REQUEST_MEDIA_PAUSE' } as MusicPauseAction),
  back: () => ({ type: 'REQUEST_MEDIA_BACK' } as MusicBackAction),
  next: () => ({ type: 'REQUEST_MEDIA_NEXT' } as MusicNextAction),
  togglerepeat: () => ({ type: 'REQUEST_MEDIA_TOGGLE_REPEAT' } as MusicToggleRepeat),
  bindposition: () => ({ type: 'REQUEST_MEDIA_TOGGLE_REPEAT' } as MusicToggleRepeat),
  afterload: (duration: number) => ({ type: 'HANDLE_TRACK_LOADED', trackDuration: duration } as MusicEventLoaded),
  requestUpdateTime: (newPosition: number) => ({ type: 'REQUEST_MEDIA_TIME_CHANGE', newTime: newPosition } as MusicTimeChangeRequest),
  updateTimeProgression: (newPosition: number) => ({ type: 'UPDATE_TIME_PROGRESSION', position: newPosition } as MusicTimeProgressionUpdate),
  volumeChanged: (newVolume: number) => ({ type: 'REQUEST_VOLUME_CHANGE', volume: newVolume } as MusicVolumeChanged),
  //addToQueue: (track: string ) => ({ type: 'REQUEST_MEDIA_NEXT' } as MusicAddTrack),
  playTrack: (track: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
    // Only load data if it's something we don't already have (and are not already loading)
    //const appState = getState();
    //if (appState && appState.musicPlayer && appState.musicPlayer.currentTrack != track)
    //    dispatch({ type: isPlaying ? 'REQUEST_MEDIA_PLAY' : 'REQUEST_MEDIA_PAUSE' });
    //}
  }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: MusicPlayerState = {
  isPlaying: false, player: undefined, requestTime: 0, volume: 0.5, isRepeat: false, trackDuration: 0, tracksQueue: ["https://goldfirestudios.com/proj/howlerjs/sound.ogg", "https://upload.wikimedia.org/wikipedia/commons/c/c0/Fingerstyle_Bass_line_over_an_Am_chord_progression.ogg"], tracksQueuePosition: 0, timePosition: 0, musicFileName: ""
};

export const reducer: Reducer<MusicPlayerState> = (state: MusicPlayerState | undefined, incomingAction: Action): MusicPlayerState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case 'HANDLE_SET_PLAYER':
      console.log("setting player ", action.player);
      return { ...state, player: action.player }
    case 'REQUEST_MEDIA_PLAY':
      return { ...state, isPlaying: true };
    case 'REQUEST_MEDIA_PAUSE':
      return { ...state, isPlaying: false };
    case "REQUEST_MEDIA_BACK":
      if (state.tracksQueuePosition > 0) {
        console.log("play back track");
        return { ...state, tracksQueuePosition: state.tracksQueuePosition - 1 };
      }
      return state;
    case "REQUEST_MEDIA_NEXT":
      if (state.tracksQueuePosition < state.tracksQueue.length - 1) {
        console.log("play next track");
        return { ...state, tracksQueuePosition: state.tracksQueuePosition + 1 };
      }
      return state;
    case "REQUEST_MEDIA_TIME_CHANGE":
      return { ...state, requestTime: action.newTime, timePosition: action.newTime };
    case 'REQUEST_MEDIA_TOGGLE_REPEAT':
      return { ...state, isRepeat: !state.isRepeat };
    case "UPDATE_TIME_PROGRESSION":
      return { ...state, timePosition: action.position };
    case 'REQUEST_VOLUME_CHANGE':
      return { ...state, volume: action.volume };
    case 'HANDLE_TRACK_LOADED':
      return { ...state, trackDuration: action.trackDuration }
    default:
      return state;
  };
};
