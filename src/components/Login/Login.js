import React, { useState, useContext } from "react";
import styles from "./Login.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import { SessionContext } from "../../contexts/SessionContext";
import { PrizeContext } from "../../contexts/PrizeContext";
import axios from "axios";

const Login = () => {
  const { setUserAndRole } = useContext(AuthContext);
  const { checkActiveSession } = useContext(SessionContext);
  const { getAllPrizes } = useContext(PrizeContext);

  const [username, setUsername] = useState(``);
  const [password, setPassword] = useState(``);
  const [authResponse, setAuthResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const hasEmptyFields = object => {
    let count = 0;

    for (const property in object) {
      if (object[property] === ``) {
        count++;
      }
    }

    let result = count > 0 ? true : false;
    return result;
  };

  const logInEvent = async e => {
    e.preventDefault();
    setAuthResponse(``);

    const user = {
      Username: username,
      Password: password
    };

    const checkForEmptyFields = hasEmptyFields(user);

    if (checkForEmptyFields === true) {
      return setAuthResponse(`Don't leave empty fields.`);
    }

    if (checkForEmptyFields === false) {
      
      await checkActiveSession();
      setLoading(true);
      await axios
        .post(`http://localhost:54637/api/user/authenticate`, user)
        .then(response => {
          setLoading(false);
          setUserAndRole(response)
          if (response.data.role === "Admin") {
            getAllPrizes();
          }
        })
        .catch(error => {
          setLoading(false);
          setAuthResponse(error.response.data);
        });
    }
  };

  return (
    <div className={styles.LoginForm + " container-fluid"}>
      <br />
      <br />
      <h3 className="text-center">LOGIN</h3>
      <br></br>
      <div className="row">
        <div className="mx-auto col-10 col-sm-6 col-md-4 col-lg-4">
          <form>
            <div className="form-group">
              <label>USERNAME</label>
              <input
                className="form-control"
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={event => setUsername(event.target.value)}
              />
              <label>PASSWORD</label>
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </div>
            <br />
            <div className="text-center">
              <button className={styles.Login} onClick={logInEvent}>
                LOGIN
              </button>
            </div>
            <br />
            <h2 className={authResponse ? styles.Result : "d-none"}>
              {authResponse}
            </h2>
          </form>
          {loading ? (
            <div className={styles.Roller}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Login;
