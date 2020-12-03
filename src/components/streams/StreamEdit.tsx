import _ from "lodash";
import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { editStream, fetchStream } from "../../actions";
import { RootState } from "../../reducers";
import StreamForm from "./StreamForm";

type TParams = { id: string };

const mapStateToProps = (state: RootState, props: RouteComponentProps<TParams>) => {
    return { stream: state.streams[props.match.params.id] };
};

const connector = connect(mapStateToProps, { editStream, fetchStream });

type ComponentProps = ConnectedProps<typeof connector> & RouteComponentProps<TParams>;

const StreamEdit = ({ fetchStream, match, stream, editStream }: ComponentProps) => {
    useEffect(() => {
        fetchStream(match.params.id);
    }, [fetchStream, match.params.id]);

    const onSubmit = (formValues: StreamForm) => {
        console.log(formValues);
        editStream(match.params.id, formValues);
    };

    if (!stream) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h3>Edit a Stream</h3>
            <StreamForm
                onSubmit={onSubmit}
                initialValues={_.pick(stream, "title", "description")}
            />
        </div>
    );
};

export default connector(StreamEdit);
