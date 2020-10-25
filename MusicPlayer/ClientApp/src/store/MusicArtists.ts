import { Action, Reducer } from "redux";
import { AppThunkAction } from ".";
import MusicArtist from "./Entities/MusicArtist";
import MediaUtils from "../MediaUtils";
// -----------------
// STATE - This defines the type of data maintained in the Redux store.
export interface MusicArtistsState {
  isLoadingList: boolean;
  isLoadingDetails: boolean;
  isFirstRequest: boolean;
  searchQuery?: string;
  previousSearchQuery?: string;
  artists: MusicArtist[];
  selectedArtist?: MusicArtist;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestArtistsAction {
  type: "REQUEST_ARTISTS_LIST";
  searchQuery?: string;
}
interface ReceiveArtistsAction {
  type: "RECEIVE_ARTISTS_LIST";
  searchQuery?: string;
  artists: MusicArtist[];
}
interface RequestArtistByIdAction {
  type: "REQUEST_ARTIST_ID";
  artistId: string;
}
interface ReceiveArtistByIdAction {
  type: "RECEIVE_ARTIST_ID";
  artist: MusicArtist;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestArtistsAction | ReceiveArtistsAction | RequestArtistByIdAction | ReceiveArtistByIdAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {

  requestMusicArtists: (searchQuery: string | undefined): AppThunkAction<KnownAction> => async (dispatch, getState) => {

    dispatch({ type: "REQUEST_ARTISTS_LIST", searchQuery: searchQuery } as RequestArtistsAction);

    fetch(MediaUtils.applicationBaseUri + '/api/artists/get')
      .then(responses => responses.json() as Promise<MusicArtist[]>)
      .then(data => dispatch({ type: "RECEIVE_ARTISTS_LIST", artists: data, searchQuery: searchQuery } as ReceiveArtistsAction))
      .catch(error => console.log("MusicTracks fetch failed : " + error));

  },
  getAlbumById: (artistId: string): AppThunkAction<KnownAction> => async (dispatch, getState) => {

    dispatch({ type: "REQUEST_ARTIST_ID", artistId: artistId } as RequestArtistByIdAction);

    const url = MediaUtils.applicationBaseUri + '/api/artists/id';
    const response = await fetch(url);
    const artist = await response.json();

    dispatch({ type: "RECEIVE_ARTIST_ID", artist: artist } as ReceiveArtistByIdAction);
  }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: MusicArtistsState = { artists: [], selectedArtist: undefined, isLoadingList: false, isLoadingDetails: false, isFirstRequest: true, searchQuery: undefined, previousSearchQuery: undefined };

export const reducer: Reducer<MusicArtistsState> = (state: MusicArtistsState | undefined, incomingAction: Action): MusicArtistsState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "REQUEST_ARTISTS_LIST":
      return { ...state, searchQuery: action.searchQuery, isLoadingList: true };
    case "RECEIVE_ARTISTS_LIST":
      if (state.searchQuery == action.searchQuery) {
        return { ...state, artists: action.artists, isLoadingList: false, isFirstRequest: false };
      }
    case "REQUEST_ARTIST_ID":
      return { ...state, isLoadingList: true };
    case "RECEIVE_ARTIST_ID":
      return { ...state, selectedArtist: action.artist, isLoadingDetails: false };
    default:
      return state;
  }

};
