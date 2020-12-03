import React, { Fragment, useEffect } from "react";
import Modal from "../Modal";
import { Button } from "semantic-ui-react";
import history from "../../history";
import { Link, RouteComponentProps } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers";
import { fetchStream, deleteStream } from "../../actions";

type TParams = { id: string };

const mapStateToProps = (state: RootState, props: RouteComponentProps<TParams>) => {
    return { stream: state.streams[props.match.params.id] };
};

const connector = connect(mapStateToProps, { fetchStream, deleteStream });

type ComponentProps = ConnectedProps<typeof connector> & RouteComponentProps<TParams>;

const StreamDelete = ({ fetchStream, deleteStream, match, stream }: ComponentProps) => {
    const { id } = match.params;

    useEffect(() => {
        fetchStream(id);
    }, [id, fetchStream]);

    const actions = (
        <Fragment>
            <Button onClick={() => deleteStream(id)} negative>
                Delete
            </Button>
            <Button as={Link} to="/">
                Cancel
            </Button>
        </Fragment>
    );

    const renderContent = () => {
        if (!stream) {
            return "Are you sure you want to delete this stream?";
        }

        return `Are you sure you want to delete the stream with title ${stream.title}`;
    };

    return (
        <Modal
            title="Delete Stream"
            content={renderContent()}
            actions={actions}
            onDismiss={() => history.push("/")}
        />
    );
};

export default connector(StreamDelete);
