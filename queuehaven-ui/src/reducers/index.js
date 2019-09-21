import { SIGN_IN, SIGN_OUT, LOAD_EVENTS, ADD_EVENT } from "../actions/actionTypes";

const initialState = {
    jwt: '',
    user: '',
    events: []
};

function rootReducer(state = initialState, action) {
    if (action.type === SIGN_IN) {
        return { ...state, jwt: action.payload.jwt, user: action.payload.user };
    }
    else if (action.type === SIGN_OUT) {
        return { ...state, jwt: '', user: '' };
    }
    else if (action.type === LOAD_EVENTS) {
        return { ...state, events: action.payload }
    }
    else if (action.type === ADD_EVENT) {
        const existingEvents = state.events;
        return { ...state, events: [ ...existingEvents, action.payload ] }
    }

    return state;
};

export default rootReducer;