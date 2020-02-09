import React, { useContext } from "react";
import styles from './User.module.css'
import { UserContext } from "../../../contexts/UserContext";

const User = ({ userId, username, firstName, lastName, joined, email, tickets }) => {
  const { deleteUserById } = useContext(UserContext);

  return (
    <tr className={styles.User}>
      <td>{username}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{joined.replace(/-/g, "/").slice(0, 10)}</td>
      <td>{email}</td>
      <td>{tickets}</td>
      <td className={styles.delete} onClick={() => deleteUserById(userId)}>
        &times;
      </td>
    </tr>
  );
};

export default User;
