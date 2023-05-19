import React, { Component } from "react";
import { Link } from "react-router-dom";
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
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Email Address</label>
                            <input 
                                type="email" 
                                className="form-control mt-1" 
                                placeholder="Enter email" 
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input 
                                type="password" 
                                className="form-control mt-1" 
                                placeholder="Enter password" 
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password Confirmation</label>
                            <input 
                                type="password" 
                                className="form-control mt-1" 
                                placeholder="Enter password again" 
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button 
                                type="submit" 
                                className="btn btn-primary"
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