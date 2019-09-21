import { SIGN_IN, SIGN_OUT, LOAD_EVENTS, ADD_EVENT } from "./actionTypes";

export function signInAction(payload) {
    return { type: SIGN_IN, payload }
};

export function signOutAction() {
    return { type: SIGN_OUT }
};

export function loadEventsAction(payload) {
    return { type: LOAD_EVENTS, payload }
};

export function addEventAction(payload) {
    return { type: ADD_EVENT, payload }
};