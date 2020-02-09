import React, { useState } from "react";
import styles from "./Register.module.css";
import axios from "axios";

const Register = () => {
  const [firstName, setFirstName] = useState(``);
  const [lastName, setLastName] = useState(``);
  const [username, setUsername] = useState(``);
  const [password, setPassword] = useState(``);
  const [confirmPassword, setConfirmPassword] = useState(``);
  const [email, setEmail] = useState(``);
  const [response, setResponse] = useState(``);
  const [loading, setLoading] = useState(false);

  const hasEmptyFields = async object => {
    return new Promise(resolve => {
      let count = 0;

      for (const property in object) {
        if (object[property] === ``) {
          count++;
        }
      }

      let result = count > 0 ? true : false;
      resolve(result);
    });
  };

  const emailIsValid = async email => {
    return new Promise(resolve =>
      resolve(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    );
  };

  const clearForm = () => {
    setFirstName(``);
    setLastName(``);
    setUsername(``);
    setPassword(``);
    setConfirmPassword(``);
    setEmail(``);
  };

  const registerUser = async e => {
    e.preventDefault();

    const user = {
      FirstName: firstName,
      LastName: lastName,
      Username: username,
      Password: password,
      ConfirmPassword: confirmPassword,
      Email: email,
      Role: "User"
    };

    const checkFields = await hasEmptyFields(user);
    const checkMail = await emailIsValid(user.Email);

    if (checkFields === false && checkMail === true) {
      setResponse(``);
      setLoading(true);
      return axios
        .post(`http://localhost:54637/api/user/register`, user)
        .then(response => {
          setLoading(false);
          setResponse(response.data);
          clearForm();
        })
        .catch(error => {
          setLoading(false);
          setResponse(error.response.data);
        });
    }

    if (checkMail === false && checkFields === false) {
      return setResponse(`Your email is in invalid format.`);
    } else {
      return setResponse(`Don't leave empty fields.`);
    }
  };

  return (
    <div className="container-fluid">
      <br />
      <br />
      <h3 className="text-center">REGISTRATION</h3>
      <br />
      <div className="row">
        <div className="offset-2 col-8 offset-sm-3 col-sm-6 offset-md-3 col-md-6 offset-xl-4 col-xl-4">
          <form className={styles.Register}>
            <div className="form-group">
              <label>FIRST NAME</label>
              <input
                type="text"
                className="form-control"
                onChange={event => setFirstName(event.target.value)}
              />
              <label>LAST NAME</label>
              <input
                type="text"
                className="form-control"
                onChange={event => setLastName(event.target.value)}
              />
              <label>USERNAME</label>
              <input
                type="text"
                className="form-control"
                onChange={event => setUsername(event.target.value)}
              />
              <label>PASSWORD</label>
              <input
                type="password"
                className="form-control"
                onChange={event => setPassword(event.target.value)}
              />
              <label>CONFIRM PASSWORD</label>
              <input
                type="password"
                className="form-control"
                onChange={event => setConfirmPassword(event.target.value)}
              />
              <label>EMAIL</label>
              <input
                type="text"
                className="form-control"
                onChange={event => setEmail(event.target.value)}
              />
            </div>
            <br />
            <div className="text-center">
              <button
                type="submit"
                className={styles.Submit}
                onClick={registerUser}
              >
                REGISTER
              </button>
            </div>
          </form>
          <br />
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
      <br />
      <h3 className={response ? styles.Result : "d-none"}>{response}</h3>
    </div>
  );
};

export default Register;
