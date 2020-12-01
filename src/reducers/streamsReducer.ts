import _ from "lodash";

import {
    FETCH_STREAM,
    FETCH_STREAMS,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM,
} from "../actions/types";

type StreamState = {
    [key: number]: Stream;
};

const streamReducer = (state = {}, action: UserAction): StreamState => {
    switch (action.type) {
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case FETCH_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, "id") };
        case DELETE_STREAM:
            return _.omit(state, action.payload);
        default:
            return state;
    }
};

export default streamReducer;
