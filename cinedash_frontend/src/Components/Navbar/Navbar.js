import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import { getLoginStatus } from '../../utils/api';


const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const loginStatus = await getLoginStatus();
                setIsLoggedIn(loginStatus.is_auth);
            } catch (error) {
                console.error('Error fetching login status: ', error);
            }
        };

        checkLoginStatus();
    }, []);

    const handleLogout = () => {
        axios.post('http://localhost:8000/logout/', {})
            .then(response => {
                console.log('Logout POST response status: ', response.status)
                setIsLoggedIn(false);
            })
            .catch(error => {
                console.error('Error handling logout: ', error);
            });
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
                    <a href="http://localhost:8000/login/" style={{textDecoration: "none"}}>
                        <span>Sign In</span>
                    </a>
                )}
            </div>
        </div>
    );
};

export default Navbar;