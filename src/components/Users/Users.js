import React, { useContext, useEffect } from "react";
import styles from "./Users.module.css";
import UserList from "./UserList/UserList";
import { UserContext } from "../../contexts/UserContext";

const Users = () => {
  const { getAllUsers, usersCount, message, clearMessage, loading } = useContext(UserContext);
  
  useEffect(getAllUsers, [usersCount]);
  useEffect(clearMessage, []);
  return (
    <div className={styles.Users + " container-fluid"}>
      <br />
      <br />
      <h2>USERS</h2>
      <br />
      {usersCount === 0 ? <h3>There are no users</h3> : <UserList />}
      <br />
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
      <h1 className={message ? styles.Result : "d-none"}>{message}</h1>
    </div>
  );
};

export default Users;
