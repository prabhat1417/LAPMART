import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

 

  return (
    <>
      <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{ backgroundColor: "black" }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              <h1
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#00b3e6",
                }}
              >
                💻 LapMart
              </h1>
            </Link>

            <ul
              style={{ marginRight: "50px" }}
              className="navbar-nav ms-auto mb-2 mb-lg-0"
            >
              <SearchInput />
              <li style={{ marginRight: "30px", marginLeft: "30px" }} className="nav-item">
                <NavLink to="/" className="nav-link" style={{ color: "#00b3e6" }}>
                  Home
                </NavLink>
              </li>
              <li style={{ marginRight: "30px" }} className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                  style={{ color: "#00b3e6" }}
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"} style={{ color: "#00b3e6" }}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                        style={{ color: "#00b3e6" }}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth?.user ? (
                <>
                  <li style={{ marginRight: "30px" }} className="nav-item">
                    <NavLink to="/register" className="nav-link" style={{ color: "#00b3e6" }}>
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link" style={{ color: "#00b3e6" }}>
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li style={{ marginRight: "30px" }} className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none",color: "#00b3e6" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                          className="dropdown-item"
                          style={{ color: "#00b3e6" }}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li style={{ marginRight: "30px" }}>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                          style={{ color: "#00b3e6" }}
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li style={{ marginRight: "30px" }} className="nav-item">
                <NavLink to="/cart" className="nav-link" >
                  <Badge count={cart?.length} offset={[10, -5]}>
                    <h6 style={{color:"#00b3e6"}}>Cart</h6>
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
