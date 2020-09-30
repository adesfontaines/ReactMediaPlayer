import { Action, Reducer } from "redux";
import { log } from "util";
import { AppThunkAction } from ".";
import { MusicAlbumsActionType } from "./ActionTypes/MusicAlbumsActionType";

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
export interface MusicAlbumsState {
  isLoading: boolean;
  isFirstRequest: boolean;
  searchQuery?: string;
  previousSearchQuery?: string;
  Albums: MusicAlbum[];
}

export interface MusicAlbum {
  title: string;
  artists: string;
  year: number;
  coverSource: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestAlbumsAction {
  type: MusicAlbumsActionType.REQUEST_ALBUMS;
  searchQuery?: string;
}

interface ReceiveAlbumsAction {
  type: MusicAlbumsActionType.RECEIVE_ALBUMS;
  Albums: MusicAlbum[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestAlbumsAction | ReceiveAlbumsAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {

  requestMusicAlbums: (searchQuery: string | undefined): AppThunkAction<KnownAction> => async (dispatch, getState) => {

    dispatch({ type: MusicAlbumsActionType.REQUEST_ALBUMS, searchQuery: searchQuery } as RequestAlbumsAction);

    const AlbumsState = getState().musicAlbums;

    if (!AlbumsState || (searchQuery === AlbumsState.searchQuery && !AlbumsState.isFirstRequest)) {
      log("Request canceled");
      return;
    }

    const url = `api/musicalbums/`;
    const response = await fetch(url);
    const Albums = await response.json();

    dispatch({ type: MusicAlbumsActionType.RECEIVE_ALBUMS, Albums: Albums } as ReceiveAlbumsAction);
  }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: MusicAlbumsState = { Albums: [], isLoading: false, isFirstRequest: true, searchQuery: undefined, previousSearchQuery: undefined };

export const reducer: Reducer<MusicAlbumsState> = (state: MusicAlbumsState | undefined, incomingAction: Action): MusicAlbumsState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case MusicAlbumsActionType.REQUEST_ALBUMS:
      return { ...state, searchQuery: action.searchQuery, isLoading: true};
    case MusicAlbumsActionType.RECEIVE_ALBUMS:
      return { ...state, Albums: action.Albums, isLoading: false, isFirstRequest: false };
  }

  return state;
};
