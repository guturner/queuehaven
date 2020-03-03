import {SIGN_IN, SIGN_OUT, LOAD_EVENTS, ADD_EVENT, LOAD_GAMES, ADD_GAME} from '../actions/actionTypes';

const initialState = {
    jwt: '',
    events: [],
    games: [],
    user: ''
};

function rootReducer(state = initialState, action) {
    if (action.type === SIGN_IN) {
        return {...state, jwt: action.user.jwt, user: action.user.user};
    } else if (action.type === SIGN_OUT) {
        return {...state, jwt: '', user: '', redirect: true, redirectPath: '/'};
    } else if (action.type === LOAD_EVENTS) {
        return {...state, events: action.events}
    } else if (action.type === ADD_EVENT) {
        const existingEvents = state.events;
        return {...state, events: [...existingEvents, action.newEvent]}
    } else if (action.type === LOAD_GAMES) {
        return {...state, games: action.games}
    } else if (action.type === ADD_GAME) {
        const existingGames = state.games;
        return {...state, games: [...existingGames, action.newGame]}
    }

    return state;
};

export default rootReducer;