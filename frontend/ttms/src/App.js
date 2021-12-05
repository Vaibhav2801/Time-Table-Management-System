import "./App.css";
import Classes from "./components/Classes";
import Navbar from "./components/Navbar";
// import Login from "./components/Login";
// import Home from "./components/Home";
function App() {
  return (
    <div className="App">
      {/* <Login></Login> */}

      <Navbar></Navbar>
      {/* <Home></Home> */}
      <Classes></Classes>
    </div>
  );
}

export default App;
