import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import NavigationBar from "./Components/shared/NavigationBar/NavigationBar";
import ScrollToTop from "./Components/shared/ScrollToTop/ScrollToTop";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Footer from "./Components/shared/Footer/Footer";
import { useAuth } from "./hooks/auth_hook";
import { AuthContext } from "./context/auth_context";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile/Profile";
import UploadVideo from "./Pages/UploadVideo/UploadVideo";

const App = () => {
  const {token, userId, login, logout} = useAuth();
  const [profile, setProfile] = useState("Information"); // Set your initial value here

  const handleProfileChange = (value) => {
    setProfile(value);
  };

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/home" exact element={<Home profile={profile}/>} />
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/uploadVideo" exact element={<UploadVideo />}/>
        <Route path="*" element={<Navigate replace exact to="/home" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/CNIT581-048-Milestone3" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="*" element={<Navigate replace exact to="/CNIT581-048-Milestone3" />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <ScrollToTop />
        <NavigationBar onProfileToggle={handleProfileChange}/>
        <div style={{ minHeight: 'calc(100vh - 110px)'}}>{routes}</div>
        <Footer />
      </Router>
    </AuthContext.Provider>

  );
};

export default App;
