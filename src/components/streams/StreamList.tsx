import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { fetchStreams } from "../../actions";
import { RootState } from "../../reducers";

const mapStateToProps = ({ streams, auth }: RootState) => {
    return {
        streams: Object.values(streams),
        currentUserId: auth.userId,
        isSignedIn: auth.isSignedIn,
    };
};

const connector = connect(mapStateToProps, { fetchStreams });

type PropsFromRedux = ConnectedProps<typeof connector> & RouteComponentProps;

const StreamList = ({ fetchStreams, streams, currentUserId, isSignedIn }: PropsFromRedux) => {
    useEffect(() => {
        fetchStreams();
    }, [fetchStreams]);

    const renderStreamControls = (stream: Stream) => {
        if (currentUserId && stream.userId === currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
                        Edit
                    </Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
                        Delete
                    </Link>
                </div>
            );
        }
    };

    const renderList = (streams: Stream[]) => {
        return streams.map((stream: Stream) => {
            return (
                <div className="item" key={stream.id}>
                    {renderStreamControls(stream)}
                    <i className="large middle aligned icon camera"></i>
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header">
                            {stream.title}
                        </Link>
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            );
        });
    };

    const renderCreate = () => {
        if (isSignedIn) {
            return (
                <div style={{ textAlign: "right" }}>
                    <Link to="/streams/new" className="ui button primary">
                        Create Stream
                    </Link>
                </div>
            );
        }
    };

    if (!isSignedIn) {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{renderList(streams)}</div>
            </div>
        );
    }

    const myStreams = streams.filter((stream) => stream.userId === currentUserId);
    const otherStreams = streams.filter((stream) => stream.userId !== currentUserId);
    return (
        <div>
            <h2>My Streams</h2>
            <div className="ui celled list">{renderList(myStreams)}</div>
            {renderCreate()}

            <h2>Other Streams</h2>
            <div className="ui celled list">{renderList(otherStreams)}</div>
        </div>
    );
};

export default connector(StreamList);
