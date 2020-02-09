import React, { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserContextProvider = props => {
  
  const [users, setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [message, setMessage] = useState(``);
  const [loading, setLoading] = useState(false);

  const getAllUsers = () => {
    setLoading(true);
    axios
      .get(`http://localhost:54637/api/admin/users`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(response => {
        setLoading(false);
        setUsers(response.data.filter(user => user.role !== "Admin"));
        setUsersCount(response.data.length);
      })
      .catch(error => {
        setLoading(false);
        setMessage(error.response.data);
      });
  };

  const deleteUserById = userId => {
    setLoading(true);
    axios
      .post(`http://localhost:54637/api/admin/delete/?userId=${userId}`, null, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(response => {
        setLoading(false);
        setUsersCount(usersCount - 1);
        setMessage(response.data);
      })
      .catch(error => {
        setLoading(false);
        setMessage(error.response.data);
      });
  };

  const clearMessage = () => setMessage(``);

  return (
    <UserContext.Provider
      value={{
        getAllUsers,
        deleteUserById,
        users,
        usersCount,
        message,
        clearMessage,
        loading
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
