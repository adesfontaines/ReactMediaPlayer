import { Action, Reducer } from "redux";
import { log } from "util";
import { AppThunkAction } from ".";
import { MusicTracksActionType } from "./ActionTypes/MusicTracksActionType";

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
export interface MusicTracksState {
  isLoading: boolean;
  isFirstRequest: boolean;
  searchQuery?: string;
  previousSearchQuery?: string;
  tracks: MusicTrack[];
}

export interface MusicTrack {
  name: string;
  album: string;
  artist: string;
  duration: number;
  notation: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestTracksAction {
  type: MusicTracksActionType.REQUEST_TRACKS;
  searchQuery?: string;
}

interface ReceiveTracksAction {
  type: MusicTracksActionType.RECEIVE_TRACKS;
  tracks: MusicTrack[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestTracksAction | ReceiveTracksAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {

  requestMusicTracks: (searchQuery: string | undefined): AppThunkAction<KnownAction> => async (dispatch, getState) => {

    dispatch({ type: MusicTracksActionType.REQUEST_TRACKS, searchQuery: searchQuery } as RequestTracksAction);

    const tracksState = getState().musicTracks;

    if (!tracksState || (searchQuery === tracksState.searchQuery && !tracksState.isFirstRequest)) {
      log("Request canceled");
      return;
    }

    const url = `api/musictracks/`;
    const response = await fetch(url);
    const tracks = await response.json();

    dispatch({ type: MusicTracksActionType.RECEIVE_TRACKS, tracks: tracks } as ReceiveTracksAction);
  }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: MusicTracksState = { tracks: [], isLoading: false, isFirstRequest: true, searchQuery: undefined, previousSearchQuery: undefined };

export const reducer: Reducer<MusicTracksState> = (state: MusicTracksState | undefined, incomingAction: Action): MusicTracksState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case MusicTracksActionType.REQUEST_TRACKS:
      return { ...state, searchQuery: action.searchQuery, isLoading: true};
    case MusicTracksActionType.RECEIVE_TRACKS:
      return { ...state, tracks: action.tracks, isLoading: false, isFirstRequest: false };
  }

  return state;
};
