import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../style/login.css';

export default class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            usernameError: "",
            passwordError: "",
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
    
        const userData = {
          username: this.state.username,
          password: this.state.password,
        };
    
        axios.post('http://localhost:8000/user/login', userData)
        .then(res => {
            this.setState({ 
                usernameError: "",
                passwordError: "", 
            });
            localStorage.setItem('token', res.data.token);
            window.location.href = '/';
        })
        .catch(err => {
            if (err.response.data.errors.username) {
                this.setState({ usernameError: err.response.data.errors.username });
            }
            else {
                this.setState({ usernameError: "" });
            }

            if (err.response.data.errors.password) {
                this.setState({ passwordError: err.response.data.errors.password });
            }  
            else {
                this.setState({ passwordError: "" });
            }  
        });
    };

    render() {
        return (
            <div className="Auth-form-container">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Welcome Back!</h3>
                        <div className="form-group mt-3">
                            <label>Username</label>
                            <input
                                type="text" 
                                className="form-control mt-1" 
                                id="username" 
                                placeholder="Enter username" 
                                onChange={(event) => {
                                    this.setState({ username: event.target.value });
                                }} 
                            />
                            { this.state.usernameError && 
                                <p className="error text-right mt-1">{ this.state.usernameError }</p> 
                            }
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password" 
                                className="form-control mt-1" 
                                id="password" 
                                placeholder="Enter password" 
                                onChange={(event) => {
                                    this.setState({ password: event.target.value });
                                }}
                            />
                            { this.state.passwordError && 
                                <p className="error text-right mt-1">{ this.state.passwordError }</p> 
                            }
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button 
                                type="submit" 
                                className="btn btn-primary" 
                                onClick={this.handleSubmit}
                            >
                                Login
                            </button>
                        </div>
                        <p className="signup text-right mt-2"><Link to="/user/signup">New user?</Link></p>
                    </div>
                </form>
            </div>
        );
    }
}