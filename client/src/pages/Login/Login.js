// Dependencies
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../../utils/API.js";
import Row from "react-bootstrap/Row";
import "./Login.css";

class Login extends Component {
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
        API.userLogin(this.state).then(response => {
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
                <h2>Login Form</h2>
                <form className="login">
                  <div className="form-group">
                    <label htmlFor="email-input">Email address</label>
                    <input onChange={this.handleInputChange} name="email" type="email" value={this.state.email} className="form-control" id="email-input" placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password-input">Password</label>
                    <input onChange={this.handleInputChange} name="password" type="password" value={this.state.password} className="form-control" id="password-input" placeholder="Password" />
                  </div>
                  <button onClick={this.handleFormSubmit}type="submit" className="btn btn-default">Login</button>
                </form>
                <br />
                <p>Or sign up <a href="/">here</a></p>
              </div>
            </Row>
        );
    };
};

// Export
export default Login;