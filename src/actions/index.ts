import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import streams from "../apis/streams";
import {
    CREATE_STREAM,
    SIGN_IN,
    SIGN_OUT,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM,
} from "./types";
import { RootState } from "../reducers";

declare global {
    type StreamForm = {
        title: string;
        description: string;
        userId: string;
    };
    type Stream = {
        id: number;
    } & StreamForm;
}

type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export const signIn = (userId: string): UserAction => {
    return { type: SIGN_IN, payload: userId };
};

export const signOut = (): UserAction => {
    return { type: SIGN_OUT };
};

export const createStream = (formValues: StreamForm): AppThunk => async (
    dispatch,
    getState
) => {
    const { userId } = getState().auth;
    const response = await streams.post("/streams", { ...formValues, userId });

    dispatch({ type: CREATE_STREAM, payload: response.data });
};

export const fetchStreams = (): AppThunk => async (dispatch) => {
    const response = await streams.get("/streams");

    dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id: string): AppThunk => async (dispatch) => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (
    id: number,
    formValues: StreamForm
): AppThunk => async (dispatch) => {
    const response = await streams.put(`/streams/${id}`, formValues);

    dispatch({ type: EDIT_STREAM, payload: response.data });
};

export const deleteStream = (id: number): AppThunk => async (dispatch) => {
    await streams.delete(`/streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: id });
};
