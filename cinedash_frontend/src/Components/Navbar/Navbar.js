import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Simulate user login state from local storage (for now)
    useEffect(() => {
        const userLoggedIn = localStorage.getItem('isLoggedIn');
        if (userLoggedIn) {
            setIsLoggedIn(true); // User is logged in
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn'); // Remove login state
        setIsLoggedIn(false); // Set login state to false
    };

    return (
        <div className="navbar">
            <div className="navbarLeft">
                <Link to="/" style={{textDecoration: "none"}}>
                    <span className="text">CineDash</span>
                </Link>
            </div>
            <div className="navbarRight">
                {isLoggedIn ? (
                    <button onClick={handleLogout} className="logoutBtn">Logout</button>
                ) : (
                    <Link to="/login" style={{textDecoration: "none"}}>
                        <span>Sign In</span>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;