import { SIGN_IN, SIGN_OUT } from "./actionTypes";

export function signInAction(payload) {
    return { type: SIGN_IN, payload }
};

export function signOutAction() {
    return { type: SIGN_OUT }
};