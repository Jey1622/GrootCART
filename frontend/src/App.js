import "./App.css";
import Home from "./components/Home";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <ToastContainer theme="dark"/>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
