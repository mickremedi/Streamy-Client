import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { fetchStream } from "../../actions";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../reducers";

type TParams = { id: string };

const mapStateToProps = (state: RootState, props: RouteComponentProps<TParams>) => {
    return { stream: state.streams[props.match.params.id] };
};

const connector = connect(mapStateToProps, { fetchStream });

type ComponentProps = RouteComponentProps<TParams> & ConnectedProps<typeof connector>;

const StreamShow = ({ fetchStream, match, stream }: ComponentProps) => {
    useEffect(() => {
        fetchStream(match.params.id);
    }, [fetchStream, match.params.id]);

    if (!stream) {
        return null;
    }
    console.log(stream);

    return (
        <div>
            <h1>{stream.title}</h1>
            <h5>{stream.description}</h5>
        </div>
    );
};

export default connector(StreamShow);
