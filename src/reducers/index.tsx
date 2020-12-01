import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import streamsReducer from "./streamsReducer";

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    streams: streamsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
