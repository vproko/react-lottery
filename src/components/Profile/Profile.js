import React, { useState, useContext } from "react";
import styles from "./Profile.module.css";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [firstName, setFirstName] = useState(``);
  const [lastName, setLastName] = useState(``);
  const [oldPassword, setOldPassword] = useState(``);
  const [password, setPassword] = useState(``);
  const [confirmPassword, setConfirmPassword] = useState(``);
  const [email, setEmail] = useState(``);
  const [response, setResponse] = useState(``);
  const [firstNamePH, setFirstNamePH] = useState(user.firstName);
  const [lastNamePH, setLastNamePH] = useState(user.lastName);
  const [emailPH, setEmailPH] = useState(user.email);
  const [loading, setLoading] = useState(false);

  const hasFulfilledFields = object => {
    return new Promise(resolve => {
      let count = 0;

      for (const property in object) {
        if (object[property] === ``) {
          count++;
        }
      }

      resolve(count < 6 ? true : false);
    });
  };

  const emailIsValid = async email => {
    return new Promise(resolve => {
      resolve(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    });
  };

  const clearForm = () => {
    setFirstName(``);
    setLastName(``);
    setOldPassword(``);
    setPassword(``);
    setConfirmPassword(``);
    setEmail(``);
  };

  const updateUserInfo = data => {
    return new Promise(resolve => {
      setLoading(true);
      axios
        .post(`http://localhost:54637/api/user/update`, data, {
          headers: { Authorization: "Bearer " + user.token }
        })
        .then(response => {
          setLoading(false);
          setUser({ ...response.data });
          setResponse(`Your profile has been successfully updated.`);
          clearForm();
          setFirstNamePH(response.data.firstName);
          setLastNamePH(response.data.lastName);
          setEmailPH(response.data.email);
          resolve();
        })
        .catch(error => {
          setLoading(false);
          setResponse(error.response.data);
        });
    });
  };

  const updateUser = async e => {
    e.preventDefault();

    const data = {
      UserId: user.userId,
      FirstName: firstName,
      LastName: lastName,
      OldPassword: oldPassword,
      NewPassword: password,
      ConfirmedPassword: confirmPassword,
      Email: email,
      Token: user.token
    };

    const checkFields = await hasFulfilledFields(data);
    let checkMail;

    if (checkFields === true) {
      setResponse(``);
      if (email !== ``) {
        checkMail = await emailIsValid(email);
        if (checkMail !== false && checkFields === true) {
          return await updateUserInfo(data);
        } else {
          setResponse(`Your email is in invalid format.`);
        }
      }

      if (checkFields === true && email === ``) {
        return await updateUserInfo(data);
      }
    }

    if (checkFields === false) {
      setResponse(`Don't leave empty fields.`);
    }
  };
  
  return (
    <div className="container-fluid">
      <br />
      <br />
      <h3 className="text-center">PROFILE</h3>
      <br />
      <div className="row">
        <div className="offset-2 col-8 offset-sm-3 col-sm-6 offset-md-3 col-md-6 offset-xl-4 col-xl-4">
          <form className={styles.Profile}>
            <div className="form-group">
              <label htmlFor="name">FIRST NAME</label>
              <input
                className="form-control"
                type="text"
                name="first-name"
                id="first-name"
                value={firstName}
                placeholder={firstNamePH}
                onChange={event => setFirstName(event.target.value)}
              />
              <label htmlFor="last-name">LAST NAME</label>
              <input
                className="form-control"
                type="text"
                name="last-name"
                id="last-name"
                value={lastName}
                placeholder={lastNamePH}
                onChange={event => setLastName(event.target.value)}
              />
              <label htmlFor="old-password">OLD PASSWORD</label>
              <input
                className="form-control"
                type="password"
                name="old-password"
                id="old-password"
                value={oldPassword}
                placeholder="Your old password"
                onChange={event => setOldPassword(event.target.value)}
              />
              <label htmlFor="new-password">NEW PASSWORD</label>
              <input
                className="form-control"
                type="password"
                name="new-password"
                id="new-password"
                value={password}
                placeholder="Your new password"
                onChange={event => setPassword(event.target.value)}
              />
              <label htmlFor="confirm-password">CONFIRM PASSWORD</label>
              <input
                className="form-control"
                type="password"
                name="confirm-password"
                id="confirm-password"
                value={confirmPassword}
                placeholder="Confirm your new password"
                onChange={event => setConfirmPassword(event.target.value)}
              />
              <label htmlFor="email">EMAIL</label>
              <input
                className="form-control"
                type="text"
                name="email"
                id="email"
                value={email}
                placeholder={emailPH}
                onChange={event => setEmail(event.target.value)}
              />
            </div>
            <br />
            <div className="text-center">
              <button className={styles.Submit} onClick={updateUser}>
                UPDATE
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

export default Profile;
