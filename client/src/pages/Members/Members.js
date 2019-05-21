// Dependencies
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";
import Row from "react-bootstrap/Row";
import "./Members.css";


class Members extends Component {
    state = {
        email: "",
        id: "",
        isLoggedIn: true
    };

    componentWillMount() {
        API.userInfo().then(response => {
            if(response.data.email) {
                this.setState(response.data)
            }
            else {
                this.setState({ isLoggedIn: false });
            };
        });
    };

    render() {

        if(!this.state.isLoggedIn) {
            return <Redirect to="/" />
        }

        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <h2>Welcome {this.state.email}</h2>
                </div>
            </div>
        );
    };
};

// Export
export default Members;