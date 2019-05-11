import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Row from "react-bootstrap/Row";
import API from "../../utils/API.js";
import "./Home.css";

class Home extends Component {
    state = {
        email: "",
        password: "",
        isLoggedIn: false
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        }, () => console.log(this.state));
    }

    handleFormSubmit = event => {
        event.preventDefault();
        API.userSignup(this.state).then(response => {
            console.log(response.data);
            this.setState({ isLoggedIn: true });
        }).catch(err => {
            console.log(err);
        })
    };

    render() {

        if(this.state.isLoggedIn) {
            return <Redirect to="/members" />
        }

        return (
            <Row>
                <div className="col-md-6 col-md-offset-3">
                    <h2>Sign Up Form</h2>
                    <form className="signup">
                    <div className="form-group">
                        <label htmlFor="email-input">Email address</label>
                        <input onChange={this.handleInputChange} name="email" value={this.state.email} className="form-control" id="email-input" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password-input">Password</label>
                        <input onChange={this.handleInputChange} name="password" value={this.state.password} className="form-control" id="password-input" placeholder="Password" />
                    </div>
                    {/* <div style="display: none" id="alert" className="alert alert-danger" role="alert">
                        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                        <span className="sr-only">Error:</span> <span className="msg"></span>
                    </div> */}
                    <button onClick={this.handleFormSubmit} type="submit" className="btn btn-default">Sign Up</button>
                    </form>
                    <br />
                    <p>Or log in <a href="/login">here</a></p>
                </div>
            </Row>
            
        );
    };
};

export default Home;