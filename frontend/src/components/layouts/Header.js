import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
            <img width="40px" src="/images/logo.png" alt="logo" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <button className="btn" id="login_btn">
          Login
        </button>

        <span id="cart" className="ml-3">
          Cart
        </span>
        <span className="ml-1" id="cart_count">
          2
        </span>
      </div>
    </nav>
  );
}
