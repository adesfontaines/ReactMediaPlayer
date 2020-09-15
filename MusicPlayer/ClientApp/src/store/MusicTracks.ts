import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
export interface MusicTracksState {
    isLoading: boolean;
    folderPath?: string;
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
    type: 'REQUEST_TRACKS';
    folderPath: string;
}

interface ReceiveTracksAction {
    type: 'RECEIVE_TRACKS';
    folderPath: string,
    tracks: MusicTrack[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestTracksAction | ReceiveTracksAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestMusicTracks: (folderPath: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.musicTracks && folderPath !== appState.musicTracks.folderPath) {
            fetch(`musictracks`)
                .then(response => response.json() as Promise<MusicTrack[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_TRACKS', folderPath: folderPath, tracks: data });
                });

            dispatch({ type: 'REQUEST_TRACKS', folderPath: folderPath });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: MusicTracksState = { tracks: [], isLoading: false };

export const reducer: Reducer<MusicTracksState> = (state: MusicTracksState | undefined, incomingAction: Action): MusicTracksState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_TRACKS':
            return {
                tracks: state.tracks,
                folderPath: action.folderPath,
                isLoading: true
            };
        case 'RECEIVE_TRACKS':
            return {
                tracks: action.tracks,
                folderPath: action.folderPath,
                isLoading: false
            };
    }

    return state;

};
