import React, { useEffect } from "react";
import { signIn, signOut } from "../actions";
import { connect } from "react-redux";

const GoogleAuthentication = ({
    isSignedIn,
    signIn,
    signOut,
}: {
    isSignedIn: boolean;
    signIn: (userId: string) => void;
    signOut: () => void;
}) => {
    useEffect(() => {
        const onAuthChange = (isSignedIn: boolean) => {
            if (isSignedIn) {
                signIn(gapi.auth2.getAuthInstance().currentUser.get().getId());
            } else {
                signOut();
            }
        };

        gapi.load("client:auth2", () => {
            gapi.client
                .init({
                    clientId:
                        "627085820321-mi5n8ml4sjk4ha59agnvo7q676d1na65.apps.googleusercontent.com",
                    scope: "email",
                })
                .then(() => {
                    onAuthChange(gapi.auth2.getAuthInstance().isSignedIn.get());
                    gapi.auth2
                        .getAuthInstance()
                        .isSignedIn.listen(onAuthChange);
                });
        });
    }, [signIn, signOut]);

    const onSignInClick = () => {
        gapi.auth2.getAuthInstance().signIn();
    };

    const onSignOutClick = () => {
        gapi.auth2.getAuthInstance().signOut();
    };

    const renderAuthButton = () => {
        if (isSignedIn === null) {
            return null;
        } else if (isSignedIn) {
            return (
                <button
                    className="ui red google button"
                    onClick={onSignOutClick}
                >
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button
                    className="ui red google button"
                    onClick={onSignInClick}
                >
                    <i className="google icon" />
                    Sign In With Google
                </button>
            );
        }
    };

    return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = (state: any): { isSignedIn: boolean } => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(
    GoogleAuthentication
);
