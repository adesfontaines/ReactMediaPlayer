import { Action, Reducer } from "redux";
import { AppThunkAction } from ".";
import MusicAlbum from "./Entities/MusicAlbum";
import MediaUtils from "../MediaUtils";

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
export interface MusicAlbumsState {
  isLoadingList: boolean;
  isLoadingDetails: boolean;
  isFirstRequest: boolean;
  searchQuery?: string;
  previousSearchQuery?: string;
  albums: MusicAlbum[];
  selectedAlbum?: MusicAlbum;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestAlbumsAction {
  type: "REQUEST_ALBUMS_LIST";
  searchQuery?: string;
}
interface ReceiveAlbumsAction {
  type: "RECEIVE_ALBUMS_LIST";
  searchQuery?: string;
  Albums: MusicAlbum[];
}
interface RequestAlbumsByIdAction {
  type: "REQUEST_ALBUM_ID";
  albumId: string;
}
interface ReceiveAlbumByIdAction {
  type: "RECEIVE_ALBUM_ID";
  Album: MusicAlbum;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestAlbumsAction | ReceiveAlbumsAction | RequestAlbumsByIdAction | ReceiveAlbumByIdAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {

  requestMusicAlbums: (searchQuery: string | undefined): AppThunkAction<KnownAction> => async (dispatch, getState) => {

    dispatch({ type: "REQUEST_ALBUMS_LIST", searchQuery: searchQuery } as RequestAlbumsAction);

    fetch(MediaUtils.applicationBaseUri + '/api/albums/get')
      .then(responses => responses.json() as Promise<MusicAlbum[]>)
      .then(data => dispatch({ type: "RECEIVE_ALBUMS_LIST", Albums: data, searchQuery: searchQuery } as ReceiveAlbumsAction))
      .catch(error => console.log("MusicTracks fetch failed : " + error));

  },
  getAlbumById: (albumId: string): AppThunkAction<KnownAction> => async (dispatch, getState) => {

    dispatch({ type: "REQUEST_ALBUM_ID", albumId: albumId } as RequestAlbumsByIdAction);

    const url = MediaUtils.applicationBaseUri + '/api/albums/id/' + albumId;
    console.log(url);
    const response = await fetch(url);
    const Album = await response.json();

    dispatch({ type: "RECEIVE_ALBUM_ID", Album: Album } as ReceiveAlbumByIdAction);
  }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: MusicAlbumsState = { albums: [], selectedAlbum: undefined, isLoadingList: false, isLoadingDetails: false, isFirstRequest: true, searchQuery: undefined, previousSearchQuery: undefined };

export const reducer: Reducer<MusicAlbumsState> = (state: MusicAlbumsState | undefined, incomingAction: Action): MusicAlbumsState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "REQUEST_ALBUMS_LIST":
      return { ...state, searchQuery: action.searchQuery, isLoadingList: true };
    case "RECEIVE_ALBUMS_LIST":
      if (state.searchQuery == action.searchQuery) {
        return { ...state, albums: action.Albums, isLoadingList: false, isFirstRequest: false };
      }
    case "REQUEST_ALBUM_ID":
      return { ...state, isLoadingList: true };
    case "RECEIVE_ALBUM_ID":
      return { ...state, selectedAlbum: action.Album, isLoadingDetails: false };
    default:
      return state;
  }

};
