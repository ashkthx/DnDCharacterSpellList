import React from "react";
import "./Nav.css";

function Nav(props) {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
            <div className="navbar-header">
                <a className="navbar-brand" href="/logout">
                Logout
                </a>
            </div>
            </div>
        </nav>
    );
};

export default Nav;