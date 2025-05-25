import "./App.css";
import Home from "./components/Home";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProductDetail from "./components/product/ProductDetail";
import ProductSearch from "./components/product/ProductSearch";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { useEffect } from "react";
import store from "./store";
import { loadUser } from "./actions/userAction";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute ";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";

function App() {

  useEffect(()=>{
    store.dispatch(loadUser)
  })

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <ToastContainer theme="dark" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<ProductSearch />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/myprofile" element={<ProtectedRoute><Profile/></ProtectedRoute> } />
            <Route path="/myprofile/update" element={<ProtectedRoute><UpdateProfile/></ProtectedRoute> } />
            <Route path="/myprofile/update/password" element={<ProtectedRoute><UpdatePassword/></ProtectedRoute> } />
            <Route path="/password/forgot" element={<ForgotPassword/> } />
            <Route path="/password/reset/:token" element={<ResetPassword/> } />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
