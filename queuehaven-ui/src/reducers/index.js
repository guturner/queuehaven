import { SIGN_IN, SIGN_OUT } from "../actions/actionTypes";

const initialState = {
    jwt: '',
    user: ''
};

function rootReducer(state = initialState, action) {
     if (action.type === SIGN_IN) {
        return { ...state, jwt: action.payload.jwt, user: action.payload.user };
    }
    else if (action.type === SIGN_OUT) {
        return { ...state, jwt: '', user: '' };
    }

    return state;
};

export default rootReducer;