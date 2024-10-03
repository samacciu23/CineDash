import React, { useState, useEffect } from "react";
import "./Login.css";  // Add CSS for styling
import { Link } from "react-router-dom";

const Login = () => {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    fetchMovieBackground();
  }, []);

  const fetchMovieBackground = async () => {
    const apiKey = '4e44d9029b1270a757cddc766a1bcb63'; //TMDB API Key
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
    const data = await response.json();
    
    // Get a random movie's backdrop path
    const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
    const imagePath = `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`;
    
    setBackgroundImage(imagePath);
  };

  return (
    <div className="loginPage" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="loginContainer">
        <h3>Login</h3>
        <form className="loginForm">
          <div className="inputGroup">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              placeholder="Enter your Email"
            />
            <label htmlFor="Password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              placeholder="Enter Password"
            />
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
        <div className="signupPrompt">
          <p>Don't have an account?</p>
          <Link to="/signup" className="btn btn-success">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;