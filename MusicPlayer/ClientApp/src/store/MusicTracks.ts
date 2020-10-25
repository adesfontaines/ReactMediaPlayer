import { Action, Reducer } from "redux";
import { AppThunkAction } from ".";
import MusicTrack from "./Entities/MusicTrack";
import MediaUtils from "../MediaUtils";

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
export interface MusicTracksState {
  isLoading: boolean;
  searchQuery?: string;
  previousSearchQuery?: string;
  tracks: MusicTrack[];
  currentTrack: MusicTrack;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effect  s; they just describe something that is going to happen.

interface RequestTracksAction {
  type: "REQUEST_TRACKS";
  searchQuery?: string;
}

interface ReceiveTracksSuccessAction {
  type: "RECEIVE_TRACKS_SUCCESS";
  searchQuery?: string;
  tracks: MusicTrack[];
}
interface ImportTracksFiles {
  type: "IMPORT_TRACKS_FILES";
  files: string[];
}
interface ImportTracksDirectory {
  type: "IMPORT_TRACKS_DIRECTORY";
  directoryPath: string;
}
// Imported
interface MediaSetQueue { type: "MEDIA_SET_QUEUE", tracks: MusicTrack[] }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestTracksAction | ReceiveTracksSuccessAction | ImportTracksFiles | ImportTracksDirectory;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {

  requestMusicTracks: (searchQuery: string | undefined): AppThunkAction<KnownAction> => (dispatch, getState) => {

    console.log("request tracks action creator");
    console.log(MediaUtils.applicationBaseUri + '/api/tracks/get');
    dispatch({ type: "REQUEST_TRACKS", searchQuery: searchQuery } as RequestTracksAction);

    fetch(MediaUtils.applicationBaseUri + '/api/tracks/get')
      .then(responses => responses.json() as Promise<MusicTrack[]>)
      .then(data => dispatch({ type: "RECEIVE_TRACKS_SUCCESS", tracks: data, searchQuery: searchQuery } as ReceiveTracksSuccessAction))
      .catch(error => console.log("MusicTracks fetch failed : " + error));

  },
  importTracksFiles: (files: string[]): AppThunkAction<KnownAction> => (dispatch) => {

    console.log("import tracks directory...");
    var data = new FormData();
    data.append("files", JSON.stringify(files));
    fetch(MediaUtils.applicationBaseUri + '/api/tracks/import', { method: "POST", body: data })
      .then(responses => console.log("importracks respnse:", responses.json()));
  },
  setQueue: (tracks: MusicTrack[]) => ({ type: 'MEDIA_SET_QUEUE', tracks:tracks } as MediaSetQueue), 
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: MusicTracksState = { tracks: [], isLoading: false, searchQuery: undefined, previousSearchQuery: undefined };

export const reducer: Reducer<MusicTracksState> = (state: MusicTracksState | undefined, incomingAction: Action): MusicTracksState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "REQUEST_TRACKS":
      return { ...state, searchQuery: action.searchQuery, isLoading: true };
    case "RECEIVE_TRACKS_SUCCESS": {
      if (state.searchQuery == action.searchQuery) {
        return { ...state, tracks: action.tracks, isLoading: false };
      }
      return state;
    }
    case "IMPORT_TRACKS_FILES":
      console.log(action.files);
      return state;
    case "IMPORT_TRACKS_DIRECTORY":
      return state;
    default:
      return state;
  }
};
