import React, { useEffect, useRef } from "react";
import { connect, ConnectedProps } from "react-redux";
import flv from "flv.js";
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
    const videoRef: React.RefObject<HTMLVideoElement> = React.createRef();
    const { id } = match.params;
    const player = useRef<flv.Player | null>(null);

    useEffect(() => {
        fetchStream(id);
    }, [fetchStream, id]);

    useEffect(() => {
        if (player.current || !stream) {
            return;
        }

        player.current = flv.createPlayer({
            type: "flv",
            url: `http://localhost:8000/live/${id}.flv`,
        });

        player.current.attachMediaElement(videoRef.current!);
        player.current.load();

        return () => {
            if (player.current) {
                player.current.destroy();
                player.current = null;
            }
        };
    }, [stream, videoRef, id]);

    if (!stream) {
        return null;
    }

    return (
        <div>
            <video ref={videoRef} style={{ width: "100%" }} controls />
            <h1>{stream.title}</h1>
            <h5>{stream.description}</h5>
        </div>
    );
};

export default connector(StreamShow);
