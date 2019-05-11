import React, { Component } from "react";
import "./Home.css";

class Home extends Component {
    state = {
        email: "",
        password: ""
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        }, () => console.log(this.state));
    }

    render() {
        return (
            <div className="container">
                <div className="row">
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
                        <button type="submit" className="btn btn-default">Sign Up</button>
                        </form>
                        <br />
                        <p>Or log in <a href="/login">here</a></p>
                    </div>
                </div>
            </div>
        );
    };
};

export default Home;