import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";


function Navbar({isLoggedIn, setIsLoggedIn, handleLogout}) {
    return (
        <div className="navbar">
            <div className="navbarLeft">
                <Link to="/" style={{textDecoration: "none"}}>
                    <span className="text">CineDash</span>
                </Link>
            </div>
            <div className="navbarRight">
                {isLoggedIn ? (
                    <button onClick={handleLogout(setIsLoggedIn)} className="logoutBtn">Logout</button>
                ) : (
                    <a href="http://localhost:8000/login/" style={{textDecoration: "none"}}>
                        <span>Sign In</span>
                    </a>
                )}
            </div>
        </div>
    );
};

export default Navbar;