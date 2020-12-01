import { SIGN_IN, SIGN_OUT } from "../actions/types";

type authStateMap = {
    isSignedIn: boolean;
    userId: string | null;
};

const authReducer = (
    state = {} as authStateMap,
    action: UserAction
): authStateMap => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true, userId: action.payload };
        case SIGN_OUT:
            return { ...state, isSignedIn: false, userId: null };
        default:
            return state;
    }
};

export default authReducer;
