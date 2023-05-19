import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../style/login.css';

export default class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            usernameError: "",
            emailError: "",
            passwordError: "",
            passwordConfirmationError: "",
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
    
        const userData = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.passwordConfirmation,
        };
    
        axios.post('http://localhost:8000/user/signup', userData)
        .then(() => {
            this.setState({ 
                usernameError: "",
                emailError: "",
                passwordError: "",
                passwordConfirmationError: "", 
            });
            window.location.href = '/user/login';
        })
        .catch(err => {
            if (err.response.data.errors.username) {
                this.setState({ usernameError: err.response.data.errors.username });
            }
            else {
                this.setState({ usernameError: "" });
            }

            if (err.response.data.errors.email) {
                this.setState({ passwordError: err.response.data.errors.email });
            }  
            else {
                this.setState({ emailError: "" })
            }

            if (err.response.data.errors.password) {
                this.setState({ passwordError: err.response.data.errors.password });
            }  
            else {
                this.setState({ passwordError: "" });
            }  

            if (err.response.data.errors.password_confirmation) {
                this.setState({ passwordConfirmationError: err.response.data.errors.password_confirmation });
            }  
            else {
                this.setState({ passwordConfirmationError: "" });
            }  
        });
    };

    render() {
        return (
            <div className="Auth-form-container">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Welcome!</h3>
                        <div className="form-group mt-3">
                            <label>Username</label>
                            <input 
                                type="text" 
                                className="form-control mt-1" 
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
                            <label>Email Address</label>
                            <input 
                                type="email" 
                                className="form-control mt-1" 
                                placeholder="Enter email" 
                                onChange={(event) => {
                                    this.setState({ email: event.target.value });
                                }} 
                            />
                            { this.state.emailError && 
                                <p className="error text-right mt-1">{ this.state.emailError }</p> 
                            }
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input 
                                type="password" 
                                className="form-control mt-1" 
                                placeholder="Enter password" 
                                onChange={(event) => {
                                    this.setState({ password: event.target.value });
                                }} 
                            />
                            { this.state.passwordError && 
                                <p className="error text-right mt-1">{ this.state.passwordError }</p> 
                            }
                        </div>
                        <div className="form-group mt-3">
                            <label>Password Confirmation</label>
                            <input 
                                type="password" 
                                className="form-control mt-1" 
                                placeholder="Enter password again" 
                                onChange={(event) => {
                                    this.setState({ passwordConfirmation: event.target.value });
                                }} 
                            />
                            { this.state.passwordConfirmationError && 
                                <p className="error text-right mt-1">{ this.state.passwordConfirmationError }</p> 
                            }
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                onClick={this.handleSubmit}
                            >
                                Signup
                            </button>
                        </div>
                        <p className="signup text-right mt-2"><Link to="/user/login">Already have an account?</Link></p>
                    </div>
                </form>
            </div>
        );
    }
}