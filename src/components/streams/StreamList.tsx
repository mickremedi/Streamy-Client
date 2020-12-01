import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { fetchStreams } from "../../actions/index";
import { RootState } from "../../reducers";

const mapStateToProps = ({ streams, auth }: RootState) => {
    return { streams: Object.values(streams), currentUserId: auth.userId };
};

const connector = connect(mapStateToProps, { fetchStreams });

type PropsFromRedux = ConnectedProps<typeof connector>;

const StreamList = ({ fetchStreams, streams }: PropsFromRedux) => {
    const renderList = () => {
        return streams.map((stream: Stream) => {
            return (
                <div className="item" key={stream.id}>
                    <i className="large middle aligned icon camera"></i>
                    <div className="content">
                        {stream.title}
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            );
        });
    };

    useEffect(() => {
        fetchStreams();
    }, [fetchStreams]);

    console.log(streams);
    return (
        <div>
            <h2>Streams</h2>
            <div className="ui celled list">{renderList()}</div>
        </div>
    );
};

export default connector(StreamList);
