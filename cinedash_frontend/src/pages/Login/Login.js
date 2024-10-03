import React, { useState, useEffect } from "react";
import "./Login.css";  // Add CSS for styling
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";  // Import axios for HTTP requests

const Login = () => {
  
  const [backgroundImage, setBackgroundImage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // To navigate after login

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

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Start loading

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      // Assuming the response contains user data
      localStorage.setItem('user', JSON.stringify(response.data)); // Save user data to local storage
      setLoading(false); // Stop loading
      navigate("/account"); // Redirect to user account page
    } catch (err) {
      setError(err.response?.data?.message || "Login failed!"); // Set error message
      setLoading(false); // Stop loading
    }
  };
  return (
    <div className="loginPage" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="loginContainer">
        <h3>Login</h3>
        {error && <div className="error">{error}</div>} {/* Error message */}
        <form className="loginForm" onSubmit={handleLogin}>
          <div className="inputGroup">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              required
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'} {/* Conditional button text */}
            </button>
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