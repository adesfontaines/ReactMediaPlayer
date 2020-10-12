import { Action, Reducer } from "redux";
import { AppThunkAction } from ".";

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
export interface MusicTracksState {
    isLoading: boolean;
    searchQuery?: string;
    previousSearchQuery?: string;
    tracks: MusicTrack[];
}

export interface MusicTrack {
    id: string;
    title: string;
    album: string;
    artist: string;
    duration: number;
    notation: number;
    samplerate: number;
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

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestTracksAction | ReceiveTracksSuccessAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {

    requestMusicTracks: (searchQuery: string | undefined): AppThunkAction<KnownAction> => (dispatch, getState) => {

        console.log("request tracks action creator");
        dispatch({ type: "REQUEST_TRACKS", searchQuery: searchQuery } as RequestTracksAction);

        fetch('api/musictracks/')
            .then(responses => responses.json() as Promise<MusicTrack[]>)
            .then(data => dispatch({ type: "RECEIVE_TRACKS_SUCCESS", tracks: data, searchQuery: searchQuery } as ReceiveTracksSuccessAction))
            .catch(error => console.log("MusicTracks fetch failed : " + error));

    }
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
        case "RECEIVE_TRACKS_SUCCESS":
            console.log("state.searchQuery: " + state.searchQuery + " action.searchQuery: " + action.searchQuery)
            if (state.searchQuery == action.searchQuery) {
                console.log("Receive tracks: " + action.tracks)
                return { ...state, tracks: action.tracks, isLoading: false };
            }
        default:
            return state;
    }
};
