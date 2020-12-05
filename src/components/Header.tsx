import React from "react";
import { Link } from "react-router-dom";
import GoogleAuthentication from "./GoogleAuthentication";

const Header = () => {
    return (
        <div className="ui secondary menu" style={{ padding: "20px 0 10px 0" }}>
            <Link to="/" className="item">
                Streamy
            </Link>
            <div className="right menu">
                <Link to="/" className="item">
                    All Streams
                </Link>
                <GoogleAuthentication />
            </div>
        </div>
    );
};

export default Header;
