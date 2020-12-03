import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { createStream } from "../../actions";
import { RouteComponentProps } from "react-router-dom";
import StreamForm from "./StreamForm";

const connector = connect(null, { createStream });

type PropsFromReduxAndForm = ConnectedProps<typeof connector> & RouteComponentProps;

const StreamCreate = (props: PropsFromReduxAndForm) => {
    const onSubmit = (formValues: StreamForm) => {
        props.createStream(formValues);
    };

    return (
        <div>
            <h3>Create a Stream</h3>
            <StreamForm onSubmit={onSubmit} />
        </div>
    );
};

export default connector(StreamCreate);
