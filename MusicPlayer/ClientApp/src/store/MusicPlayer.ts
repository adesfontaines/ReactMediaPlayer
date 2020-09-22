import { Action, Reducer } from 'redux';
import MusicPlayerEngine from '../components/MusicPlayerEngine';
import { MusicPlayerActionType } from './ActionTypes/MusicPlayerActionType'

export interface MusicPlayerState {
  isPlaying: boolean;
  isRepeat: boolean;
  volume: number;
  timePosition: number | Array<number>;
  requestTime: number;
  tracksQueue: string[];
  tracksQueuePosition: number;
  trackDuration: number,
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
interface MusicPlayAction { type: MusicPlayerActionType.MEDIA_PLAY }
interface MusicPauseAction { type: MusicPlayerActionType.MEDIA_PAUSE }

interface MusicToggleRepeat { type: MusicPlayerActionType.MEDIA_TOGGLE_REPEAT }

interface MusicNextAction { type: MusicPlayerActionType.MEDIA_NEXT }
interface MusicBackAction { type: MusicPlayerActionType.MEDIA_BACK }

interface MusicAddTrack { type: MusicPlayerActionType.MEDIA_ADD_TRACK }

interface MusicVolumeChanged {
  type: MusicPlayerActionType.VOLUME_CHANGE;
  volume: number;
}

interface MusicTimeChangeRequest {
  type: MusicPlayerActionType.MEDIA_TIME_CHANGE;
  newTime: number;
}
interface MusicTimeProgressionUpdate {
  type: MusicPlayerActionType.UPDATE_TIME_PROGRESSION;
  position: number;
}

interface MusicEventLoaded { type: MusicPlayerActionType.HANDLE_TRACK_LOADED, trackDuration: number }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = MusicPlayAction | MusicPauseAction | MusicBackAction | MusicNextAction | MusicAddTrack |
  MusicTimeChangeRequest | MusicTimeProgressionUpdate | MusicToggleRepeat | MusicEventLoaded | MusicVolumeChanged;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {

  play: () => ({ type: MusicPlayerActionType.MEDIA_PLAY } as MusicPlayAction),
  pause: () => ({ type: MusicPlayerActionType.MEDIA_PAUSE } as MusicPauseAction),
  back: () => ({ type: MusicPlayerActionType.MEDIA_BACK } as MusicBackAction),
  next: () => ({ type: MusicPlayerActionType.MEDIA_NEXT } as MusicNextAction),

  togglerepeat: () => ({ type: MusicPlayerActionType.MEDIA_TOGGLE_REPEAT } as MusicToggleRepeat),
  bindposition: () => ({ type: MusicPlayerActionType.MEDIA_TOGGLE_REPEAT } as MusicToggleRepeat),
  afterload: (duration: number) => ({ type: MusicPlayerActionType.HANDLE_TRACK_LOADED, trackDuration: duration } as MusicEventLoaded),
  requestUpdateTime: (newPosition: number) => ({ type: MusicPlayerActionType.MEDIA_TIME_CHANGE, newTime: newPosition } as MusicTimeChangeRequest),
  updateTimeProgression: (newPosition: number) => ({ type: MusicPlayerActionType.UPDATE_TIME_PROGRESSION, position: newPosition } as MusicTimeProgressionUpdate),
  volumeChanged: (newVolume: number) => ({ type: MusicPlayerActionType.VOLUME_CHANGE, volume: newVolume } as MusicVolumeChanged)
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
const unloadedState: MusicPlayerState = {
  isPlaying: false,
  requestTime: 0,
  volume: 0.5,
  isRepeat: false,
  trackDuration: 0,
  tracksQueue: ["https://goldfirestudios.com/proj/howlerjs/sound.ogg", "https://upload.wikimedia.org/wikipedia/commons/c/c0/Fingerstyle_Bass_line_over_an_Am_chord_progression.ogg"],
  tracksQueuePosition: 0,
  timePosition: 0,
};

export const reducer: Reducer<MusicPlayerState> = (state: MusicPlayerState | undefined, incomingAction: Action): MusicPlayerState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case MusicPlayerActionType.MEDIA_PLAY:
      return { ...state, isPlaying: true };

    case MusicPlayerActionType.MEDIA_PAUSE:
      return { ...state, isPlaying: false };

    case MusicPlayerActionType.MEDIA_BACK:
      if (state.tracksQueuePosition > 0) {
        console.log("play back track");
        return { ...state, tracksQueuePosition: state.tracksQueuePosition - 1 };
      }
      return state;

    case MusicPlayerActionType.MEDIA_NEXT:
      if (state.tracksQueuePosition < state.tracksQueue.length - 1) {
        console.log("play next track");
        return { ...state, tracksQueuePosition: state.tracksQueuePosition + 1 };
      }
      return state;

    case MusicPlayerActionType.MEDIA_TIME_CHANGE:
      return { ...state, requestTime: action.newTime, timePosition: action.newTime };

    case MusicPlayerActionType.MEDIA_TOGGLE_REPEAT:
      return { ...state, isRepeat: !state.isRepeat };

    case MusicPlayerActionType.UPDATE_TIME_PROGRESSION:
      return { ...state, timePosition: action.position };

    case MusicPlayerActionType.VOLUME_CHANGE:
      return { ...state, volume: action.volume };

    case MusicPlayerActionType.HANDLE_TRACK_LOADED:
      return { ...state, trackDuration: action.trackDuration }
    default:
      return state;
  };
};
