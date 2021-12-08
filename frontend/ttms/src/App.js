import "./App.css";
import Home from "./components/Home";
import Classes from "./components/Classes";
import Navbar from "./components/Navbar";
// import Login from "./components/Login";
// import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      {/* <Login></Login> */}
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/classes" element={<Classes />}></Route>
          <Route path="/profile" element={<Home />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
