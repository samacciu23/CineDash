import React, { useState, useEffect } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/signup", {
        name,
        email,
        password,
      });

      setPasswordError(null);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    fetchMovieBackground();
  }, []);

  const fetchMovieBackground = async () => {
    const apiKey = '4e44d9029b1270a757cddc766a1bcb63'; //TMDB API Key
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
      const data = await response.json();
      const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
      const imagePath = `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`;
      
      setBackgroundImage(imagePath);
      setLoading(false); // Stop loading
    } catch (error) {
      console.error("Error fetching backdrop:", error);
      setLoading(false); // Stop loading even if there's an error
    }
  };

  return (
    <div className="signupPage" style={{ backgroundImage: loading ? "none" : `url(${backgroundImage})` }}>
      {loading && <div className="loading">Loading background...</div>} {/* Loading indicator */}
      <div className="signupContainer">
        <h3>Sign Up</h3>
        <form className="signupForm" onSubmit={handleSignup}>
          <div className="inputGroup">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="off"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="off"
              placeholder="Confirm your Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {passwordError && <div className="error">{passwordError}</div>}
          <button type="submit" className="btn btn-success">
            Sign Up
          </button>
        </form>
        {error && <div className="error">{error}</div>}
        <div className="loginPrompt">
          <p>Already have an Account?</p>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
