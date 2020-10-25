import { Action, Reducer } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
export interface NavigationState {
  isMobileOpen: boolean;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestToggleMobileDrawer {
  type: 'REQUEST_TOGGLE_DRAWER';
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestToggleMobileDrawer

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
  toggleMobileDrawer: () => ({ type: 'REQUEST_TOGGLE_DRAWER' } as RequestToggleMobileDrawer),
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: NavigationState = { isMobileOpen: false };

export const reducer: Reducer<NavigationState> = (state: NavigationState | undefined, incomingAction: Action): NavigationState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case 'REQUEST_TOGGLE_DRAWER':
      return { ...state, isMobileOpen: !state.isMobileOpen };
    default:
      return state;
  }
};
