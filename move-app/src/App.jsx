import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movelist from "./components/Movies/Movielist";
import MovieDetail from "./components/Movies/MovieDetail";
import Movis from "./components/Movies/Movis";
import Navbar from "./components/Navbar/Nav";
import Auth from "./components/auth/auth";
import SingeUp from "./components/auth/SingeUp";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Movelist />} />
        <Route path="/movies" element={<Movis/>} />
        <Route path="/Login" element={<Auth/>} />        
        <Route path="/SigneUp" element={<SingeUp/>} />
        <Route path="/movies/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
};

export default App;
