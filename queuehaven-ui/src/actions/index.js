import {SIGN_IN, SIGN_OUT, LOAD_EVENTS, ADD_EVENT, LOAD_GAMES, ADD_GAME} from './actionTypes';

export function signInAction(user) {
    return {type: SIGN_IN, user}
};

export function signOutAction() {
    return {type: SIGN_OUT}
};

export function loadEventsAction(events) {
    return {type: LOAD_EVENTS, events}
};

export function addEventAction(newEvent) {
    return {type: ADD_EVENT, newEvent}
};

export function loadGamesAction(games) {
    return {type: LOAD_GAMES, games}
};

export function addGameAction(newGame) {
    return {type: ADD_GAME, newGame}
};