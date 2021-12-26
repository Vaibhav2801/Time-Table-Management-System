import "./App.css";
import Home from "./components/Home";
import Classes from "./components/Classes";
import Navbar from "./components/Navbar";
import ScheduleClass from "./components/ScheduleClass";
import Background from "./components/Background";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Background></Background>
        <Navbar></Navbar>
        <Routes>
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
