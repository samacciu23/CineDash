import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/home/home';
import MovieList from './Components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="movie/:id" element={<Movie />} />
        <Route path="movies/:type" element={<MovieList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<h1>Error Page: Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
