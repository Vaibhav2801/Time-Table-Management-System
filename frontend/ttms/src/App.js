import "./App.css";
import Home from "./components/Home";
import Classes from "./components/Classes";
import Navbar from "./components/Navbar";
import ScheduleClass from "./components/ScheduleClass";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/classes" element={<Classes />}></Route>
          <Route path="/profile" element={<Home />}></Route>
          <Route path="/schedule" element={<ScheduleClass />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
