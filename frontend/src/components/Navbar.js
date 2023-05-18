import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../style/navbar.css'

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="d-flex flex-grow-1">
                        <span className="w-100 d-lg-none d-block"></span>
                        <Link to="" className="navbar-brand d-none d-lg-inline-block"> RefBoard </Link>
                    </div>
                </div>
                <div className="collapse navbar-collapse flex-grow-1 text-right" id="navbar">
                    <ul className="navbar-nav ms-auto flex-nowrap">
                        <li className="nav-item">
                            <Link to="/user/login" className="nav-link m-2 menu-item"> Log In </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
