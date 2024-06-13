import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Home from "./Components/Home.jsx";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import PrivateRoute from "./Components/PrivateRoute";
import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);                  //is used two places 1)for deciding which button to display 2)for displaying dashboard screen
  return (
    <div className="w-screen h-screen bg-richblack-900 flex flex-col ">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    //we have 4 windows to be displayed in homescreen
      <Routes>                          //////All the paths to be displayed on main screen are written here in navbar section we have linked thesw route like linked login button with /login
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<Signup setIsLoggedIn={setIsLoggedIn} />}
        />
        <PrivateRoute isLoggedIn={isLoggedIn}>         // making it private because on typing /dashboard we should not be reaching dashboard if we have not logged in
          //one more point when we type '/dashboard' or anything on url then html page loads once again...
            //so even if we have logged in ,if we agin click on home and then type '/dashboard' then html page will load again and hence we would be logged out...


                                                            //ERROR
            // it is showing error that we cannot use PrivateRoute inside Route              ?????????????

            
            <Route path="/dashboard" element={<Dashboard />} />
        </PrivateRoute>
      </Routes>
    </div>
  );
}

export default App;
