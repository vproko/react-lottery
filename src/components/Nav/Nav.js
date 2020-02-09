import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./Nav.module.css"

const Nav = () => {
  const { auth, admin, logOut } = useContext(AuthContext);

  return (
    <div className={styles.Nav}>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <span className="navbar-brand" id="logo">
          <Link to="/">LOTTERY</Link>
        </span>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          {auth ? (
            <ul className="navbar-nav ml-auto">
              {admin ? (
                <React.Fragment>
                  <li className="nav-item">
                    <span className="nav-link">
                      <Link to="/users" className="text-light">USERS</Link>
                    </span>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link">
                      <Link to="/session" className="text-light">SESSION</Link>
                    </span>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link">
                      <Link to="/draw" className="text-light">DRAW</Link>
                    </span>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link">
                      <Link to="/prizes" className="text-light">PRIZES</Link>
                    </span>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link">
                      <Link to="/admin/register" className="text-light">REGISTER</Link>
                    </span>
                  </li>
                </React.Fragment>
              ) : (
                <li className="nav-item">
                  <span className="nav-link">
                    <Link to="/ticket" className="text-light">TICKET</Link>
                  </span>
                </li>
              )}
              <React.Fragment>
                <li className="nav-item">
                  <span className="nav-link">
                    <Link to="/profile" className="text-light">PROFILE</Link>
                  </span>
                </li>
                <li className="nav-item" onClick={logOut}>
                  <span id="logout" className="nav-link">
                    <Link to="/" className="text-light">LOGOUT</Link>
                  </span>
                </li>
              </React.Fragment>
            </ul>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <span className="nav-link">
                  <Link to="/register" className="text-light">REGISTER</Link>
                </span>
              </li>
              <li className="nav-item">
                <span className="nav-link">
                  <Link to="/login" className="text-light">LOGIN</Link>
                </span>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Nav;
