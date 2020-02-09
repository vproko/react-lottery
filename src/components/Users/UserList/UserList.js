import React, { useContext } from "react";
import styles from "./UserList.module.css";
import User from "../User/User";
import { UserContext } from "../../../contexts/UserContext";

const UserList = () => {
  const { users } = useContext(UserContext);
  return (
    <div className={styles.UserList}>
      <table>
        <thead>
          <tr>
            <th>USERNAME</th>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>JOINED</th>
            <th>EMAIL</th>
            <th>TICKETS</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users ? (
            users.map(user => {
              return (
                <User
                  key={user.userId}
                  userId={user.userId}
                  username={user.username}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  joined={user.joined}
                  email={user.email}
                  tickets={user.tickets.length}
                />
              );
            })
          ) : (
            <tr className={styles.UserList} colSpan="6">
              <td>There are no users.</td>
            </tr>
          )}
        </tbody>
      </table>
      <br />
    </div>
  );
};

export default UserList;
