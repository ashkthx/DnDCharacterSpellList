import React, { Component } from "react";
import "./Members.css";

class Members extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <h2>Welcome <span className="member-name"></span></h2>
                </div>
                </div>
            </div>
        );
    };
};

export default Members;