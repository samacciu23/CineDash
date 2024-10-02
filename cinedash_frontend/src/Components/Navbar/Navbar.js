import React from "react"
import "./Navbar.css"
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbarLeft">
                <Link to="/" style={{textDecoration: "none"}}><span className="text">CineDash</span></Link>
                <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
            </div>
            <div className="navbarRight">
                <Link to="/Login" style={{textDecoration: "none"}}><span>Sign In</span></Link>
                <Link to="/signup" style={{textDecoration: "none"}}><span>Sign Up</span></Link>
            </div>
        </div>
    )
}

export default Navbar