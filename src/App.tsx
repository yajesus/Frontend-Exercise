import React from "react";
import SignupScreen from "./components/Signup";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import UserProfile from "./components/UserProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Define the User type
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

function App() {
  // Dummy user data for testing
  const userData: User = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route
          path="/home"
          element={<HomeScreen />} // Pass userData as props to HomeScreen
        />
        <Route
          path="/user"
          element={<UserProfile />} // Pass userData as props to UserProfile
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
